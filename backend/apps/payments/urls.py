from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaymentViewSet
from .callbacks import MpesaCallbackView

router = DefaultRouter()
router.register(r'', PaymentViewSet)

urlpatterns = [
    path('mpesa/callback/', MpesaCallbackView.as_view(), name='mpesa-callback'),
    path('', include(router.urls)),
]
