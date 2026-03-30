from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    is_customer = models.BooleanField(default=True)
    is_pharmacist = models.BooleanField(default=False)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username
