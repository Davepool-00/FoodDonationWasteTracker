# users/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FoodDonationViewSet

router = DefaultRouter()
router.register(r'food-donations', FoodDonationViewSet)  # Register the viewset

urlpatterns = [
    path('api/', include(router.urls)),  # Include the API routes
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
]
