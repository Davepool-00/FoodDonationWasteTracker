# users/views.py

from rest_framework import viewsets, filters, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import FoodDonation, CustomUser
from .serializers import FoodDonationSerializer, CustomUserSerializer, LoginSerializer
from .permissions import IsAdminOrReadOnly, IsOrganizationOrAdmin, IsDonorOrAdmin
from rest_framework.exceptions import PermissionDenied

# --- FoodDonation CRUD API ---


class FoodDonationViewSet(viewsets.ModelViewSet):
    queryset = FoodDonation.objects.all()
    serializer_class = FoodDonationSerializer
    permission_classes = [permissions.IsAuthenticated]  # Default permission

    def get_permissions(self):
        if self.action == 'create':
            # Ensure the user is authenticated and is either a donor or organization
            if self.request.user.is_authenticated:
                if self.request.user.customuser.user_type == 'organization':
                    return [permissions.IsAuthenticated(), IsOrganizationOrAdmin()]
                else:
                    return [permissions.IsAuthenticated(), IsDonorOrAdmin()]
            else:
                raise PermissionDenied("You must be logged in to create a donation.")
        
        return super().get_permissions()

    def perform_create(self, serializer):
        user = self.request.user
        
        # Ensure the user is authenticated before trying to access customuser
        if user.is_authenticated:
            serializer.save(user=user, is_organization=user.customuser.user_type == 'organization')
        else:
            raise PermissionDenied("You must be logged in to create a donation.")

# --- User Registration (Signup) ---
class SignUpView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': "User created successfully!",
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# --- User Login (JWT Token) ---
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
