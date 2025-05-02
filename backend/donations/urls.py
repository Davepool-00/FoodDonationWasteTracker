from django.urls import path
from . import views

urlpatterns = [
    path('', views.DonationListCreateView.as_view(), name='donation-list-create'),  # List and Create donations
]
