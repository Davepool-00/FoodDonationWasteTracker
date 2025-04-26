from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    is_organization = models.BooleanField(default=False)

class FoodDonation(models.Model):
    name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    date = models.DateField()

    def __str__(self):
        return self.name