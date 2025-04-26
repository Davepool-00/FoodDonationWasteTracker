from django.db import models
from accounts.models import CustomUser

class FoodDonation(models.Model):
    donor = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    food_name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    expiration_date = models.DateField()
    pickup_location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    is_claimed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.food_name} - {self.donor.username}"
