from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('painkillers', 'Painkillers'),
        ('antibiotics', 'Antibiotics'),
        ('supplements', 'Supplements & Vitamins'),
        ('chronic', 'Chronic Medication'),
        ('first_aid', 'First Aid'),
        ('skincare', 'Skincare'),
        ('general', 'General Health'),
    ]
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default='general')
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    is_prescription_required = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
