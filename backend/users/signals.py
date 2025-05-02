from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import Group
from django.conf import settings
from .models import CustomUser

@receiver(post_save, sender=CustomUser)
def assign_group_to_user(sender, instance, created, **kwargs):
    if created:
        if instance.user_type == 'donor':
            group = Group.objects.get(name='Donor')  # Make sure this group exists
        elif instance.user_type == 'organization':
            group = Group.objects.get(name='Organization')  # Make sure this group exists
        instance.groups.add(group)
