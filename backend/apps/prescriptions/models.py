from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
import os

def validate_prescription_file(value):
    """Validate that the uploaded file is either an image or PDF"""
    valid_extensions = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.bmp']
    ext = os.path.splitext(value.name)[1].lower()
    if ext not in valid_extensions:
        raise ValidationError(f'Unsupported file extension. Allowed: {", ".join(valid_extensions)}')
    
    # Check file size (max 10MB)
    if value.size > 10 * 1024 * 1024:
        raise ValidationError('File size too large. Maximum size is 10MB.')

class Prescription(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    image = models.FileField(upload_to='prescriptions/', validators=[validate_prescription_file])
    status = models.CharField(max_length=20, choices=(
        ('pending', 'Pending Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ), default='pending')
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prescription {self.id} by {self.user.username}"
