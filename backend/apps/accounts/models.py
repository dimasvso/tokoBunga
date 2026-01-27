from django.db import models
from django.contrib.auth.models import User


class Account(models.Model):
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("customer", "Customer"),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="account")
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="customer")
    address = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.role}"
