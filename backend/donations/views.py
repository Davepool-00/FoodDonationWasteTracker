from rest_framework import generics
from .models import FoodDonation
from .serializers import FoodDonationSerializer
from rest_framework.permissions import IsAuthenticated

class DonationListCreateView(generics.ListCreateAPIView):
    queryset = FoodDonation.objects.all()
    serializer_class = FoodDonationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Automatically associate the logged-in user as the donor
        serializer.save(donor=self.request.user)
