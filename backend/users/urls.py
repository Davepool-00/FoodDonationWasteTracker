from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrganizationListView, get_user_info, SignUpView, LoginView, FoodDonationViewSet, UserDetailView, user_profile

router = DefaultRouter()
router.register(r'food-donations', FoodDonationViewSet, basename='fooddonation')

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('organizations/', OrganizationListView.as_view(), name='organization-list'),
    path('user/', UserDetailView.as_view(), name='user-detail'),
    path('user-info/', get_user_info),
    path('user-profile/', user_profile, name='user-profile'),
]
