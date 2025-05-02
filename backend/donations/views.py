from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from .models import FoodDonation
from .serializers import FoodDonationSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied
from users.models import CustomUser, Organization

class DonationListCreateView(generics.ListCreateAPIView):
    queryset = FoodDonation.objects.all()
    serializer_class = FoodDonationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        org_id = self.request.data.get("organization")
        organization = get_object_or_404(Organization, pk=org_id)
        serializer.save(donor=self.request.user, organization=organization)

class ReceivedDonationsView(generics.ListAPIView):
    serializer_class = FoodDonationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Check if the user is an authenticated organization
        if not isinstance(self.request.user, CustomUser) or not hasattr(self.request.user, 'organization'):
            raise PermissionDenied("Only organizations can view received donations.")

        return FoodDonation.objects.filter(
            organization=self.request.user.organization,
            is_claimed=True
        )

class PendingDonationsView(generics.ListAPIView):
    serializer_class = FoodDonationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Check if the user is an authenticated organization
        if not isinstance(self.request.user, CustomUser) or not hasattr(self.request.user, 'organization'):
            raise PermissionDenied("Only organizations can view pending donations.")

        return FoodDonation.objects.filter(
            organization=self.request.user.organization,
            is_claimed=False
        )

class MarkDonationAsReceived(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        # Check if the user is an authenticated organization
        if not isinstance(request.user, CustomUser) or not hasattr(request.user, 'organization'):
            raise PermissionDenied("Only organizations can mark donations as received.")

        donation = get_object_or_404(FoodDonation, pk=pk, organization=request.user.organization)
        donation.is_claimed = True
        donation.save()

        return Response({'message': 'Donation marked as received'}, status=status.HTTP_200_OK)

class DonorDonationsView(generics.ListAPIView):
    serializer_class = FoodDonationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FoodDonation.objects.filter(donor=self.request.user).order_by('-created_at')
