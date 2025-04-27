from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth import get_user_model  

# Custom User Model
class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = [
        ('donor', 'Donor'),
        ('organization', 'Organization'),
    ]
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='donor')

    def __str__(self):
        return f"{self.username} - {self.user_type}"

# Food Donation Model
class FoodDonation(models.Model):
    donor = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='donations')
    organization = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='received_donations')
    name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    is_organization = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.quantity} units"
