# users/views.py
from rest_framework import viewsets
from .models import FoodDonation
from .serializers import FoodDonationSerializer
from .permissions import IsAdminOrReadOnly
from rest_framework import filters
from .serializers import CustomUserSerializer, LoginSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework import status, permissions

class FoodDonationViewSet(viewsets.ModelViewSet):
    queryset = FoodDonation.objects.all()  # Get all food donations
    serializer_class = FoodDonationSerializer  # Use the serializer we created
    permission_classes = [IsAdminOrReadOnly]  # Apply custom permission
    filter_backends = (filters.SearchFilter,)
    search_fields = ['name', 'quantity']  # Allow search by name or quantity

    
# Signup View
class SignUpView(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login View
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)