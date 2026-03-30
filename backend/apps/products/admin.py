from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock', 'is_prescription_required')
    list_filter = ('category', 'is_prescription_required')
    search_fields = ('name', 'description')
    list_editable = ('price', 'stock', 'is_prescription_required')
