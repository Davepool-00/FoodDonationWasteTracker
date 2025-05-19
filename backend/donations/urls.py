from django.urls import path
from .views import (
    DonationListCreateView,
    ReceivedDonationsView,
    PendingDonationsView,
    MarkDonationAsReceived,
      MarkDonationAsExpired,
    DonorDonationsView,
    ExpiredDonationsView,  
)

urlpatterns = [
    path('', DonationListCreateView.as_view(), name='donation-list-create'),
    path('received-donations/', ReceivedDonationsView.as_view(), name='received-donations'),
    path('pending-donations/', PendingDonationsView.as_view(), name='pending-donations'),
     path('mark-expired/<int:pk>/', MarkDonationAsExpired.as_view(), name='mark-donation-expired'),  
    path('mark-received/<int:pk>/', MarkDonationAsReceived.as_view(), name='mark-donation-received'),
    path('my-donations/', DonorDonationsView.as_view(), name='my-donations'),
    path('expired-donations/', ExpiredDonationsView.as_view(), name='expired-donations'),
]
