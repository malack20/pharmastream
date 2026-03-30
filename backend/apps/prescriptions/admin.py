from django.contrib import admin
from django.utils.html import format_html
from .models import Prescription

@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'created_at', 'view_prescription')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username', 'notes')
    actions = ['approve_prescriptions', 'reject_prescriptions']

    def view_prescription(self, obj):
        if obj.image:
            return format_html('<a href="{}" target="_blank">View Image</a>', obj.image.url)
        return "No image"
    view_prescription.short_description = 'Prescription Image'

    def approve_prescriptions(self, request, queryset):
        queryset.update(status='approved')
    approve_prescriptions.short_description = "Mark selected as Approved"

    def reject_prescriptions(self, request, queryset):
        queryset.update(status='rejected')
    reject_prescriptions.short_description = "Mark selected as Rejected"
