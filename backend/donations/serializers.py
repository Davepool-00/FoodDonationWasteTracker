from rest_framework import serializers
from .models import FoodDonation

class FoodDonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodDonation
        fields = '__all__'
        read_only_fields = ['donor', 'organization']  # Prevent users from modifying these fields
