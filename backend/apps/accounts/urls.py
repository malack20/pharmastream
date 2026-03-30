from django.urls import path
from .views import UserProfileView, GoogleLogin

urlpatterns = [
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('google/', GoogleLogin.as_view(), name='google_login'),
]
