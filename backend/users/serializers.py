from rest_framework import serializers
from .models import FoodDonation, Organization, CustomUser
from django.contrib.auth import get_user_model, authenticate

# --- Food Donation Serializer ---
class FoodDonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodDonation
        fields = ['id', 'donor', 'organization', 'name', 'quantity', 'is_organization']
        read_only_fields = ['donor', 'is_organization']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['donor'] = user
        validated_data['is_organization'] = user.user_type == 'organization'
        return super().create(validated_data)

# --- Custom User Serializer (for signup) ---
class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    user_type = serializers.ChoiceField(choices=[('donor', 'Donor'), ('organization', 'Organization')])
    name = serializers.CharField(required=False, allow_blank=True)  # Name for organization users
    location = serializers.CharField(required=False, allow_blank=True)
    description = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password', 'confirm_password', 'user_type', 'name', 'location', 'description']

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')

        user_type = validated_data['user_type']

        if user_type == 'organization':
            name = validated_data.pop('name', None)
            location = validated_data.pop('location', None)
            description = validated_data.pop('description', None)

        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type=user_type,
        )

        if user_type == 'organization':
            Organization.objects.create(
                user=user,
                name=name,
                location=location,
                description=description
            )

        return user

# --- Login Serializer ---
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Invalid credentials.')
        return {'user': user}

# --- Custom User Serializer for listing users ---
class CustomUserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'user_type']

# --- Organization Serializer ---
class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name', 'location', 'description']
