from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import FoodDonation, CustomUser, Organization
from .serializers import (
    FoodDonationSerializer,
    CustomUserSerializer,
    LoginSerializer,
    OrganizationSerializer
)
from .permissions import IsAdminOrReadOnly, IsOrganizationOrAdmin, IsDonorOrAdmin
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
# --- FoodDonation CRUD API ---
class FoodDonationViewSet(viewsets.ModelViewSet):
    queryset = FoodDonation.objects.all()
    serializer_class = FoodDonationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == 'create':
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
                "message": "User created successfully!",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
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

# --- List Organizations ---
# class OrganizationListView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         orgs = Organization.objects.all()
#         serializer = OrganizationSerializer(orgs, many=True)
#         return Response(serializer.data)
class OrganizationListView(APIView):
    permission_classes = [permissions.AllowAny]  # Allow public access

    def get(self, request):
        orgs = Organization.objects.all()
        serializer = OrganizationSerializer(orgs, many=True)
        return Response(serializer.data)
# --- Get Current User Info ---
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user  # This is your CustomUser model
    return Response({
        "username": user.username,
        "email": user.email,
        "user_type": user.user_type,  # Directly access user_type
    })

# --- User Detail (Info) View ---
class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Corrected this line to directly access the CustomUser instance
        serializer = CustomUserSerializer(request.user)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Only authenticated users can access
def user_profile(request):
    user = request.user
    return Response({
        'username': user.username,
        'user_type': user.user_type,
    })