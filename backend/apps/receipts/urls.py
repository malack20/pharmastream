from django.urls import path
from .views import GenerateReceiptView

urlpatterns = [
    path('generate/', GenerateReceiptView.as_view(), name='generate-receipt'),
]
