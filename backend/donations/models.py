from django.db import models
from django.utils import timezone
from users.models import CustomUser, Organization

class FoodDonation(models.Model):
    donor = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    food_name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    expiration_date = models.DateField()
    pickup_location = models.CharField(max_length=255)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    is_claimed = models.BooleanField(default=False)
    is_expired = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # Automatically mark as expired if the expiration date has passed
        if self.expiration_date < timezone.now().date():
            self.is_expired = True
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.food_name} - {self.donor.username}"
