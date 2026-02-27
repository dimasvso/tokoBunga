from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from .models import Account

User = get_user_model()

@receiver(post_save, sender=User)
def create_account_and_assign_group(sender, instance, created, **kwargs):
    if created:
        # buat account
        Account.objects.create(user=instance)

        # assign default group
        group, _ = Group.objects.get_or_create(name="customer")
        instance.groups.add(group)