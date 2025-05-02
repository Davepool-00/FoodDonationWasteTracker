from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrganizationListView, get_user_info, SignUpView, LoginView, FoodDonationViewSet, UserDetailView

router = DefaultRouter()
router.register(r'food-donations', FoodDonationViewSet, basename='fooddonation')  # Register the viewset

urlpatterns = [
    path('', include(router.urls)),  # Include the API routes
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('organizations/', OrganizationListView.as_view(), name='organization-list'),
    path('user/', UserDetailView.as_view(), name='user-detail'),
    path('api/user/', get_user_info),
]