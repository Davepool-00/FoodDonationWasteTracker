from django.urls import path
from .views import (
    DonationListCreateView,
    ReceivedDonationsView,
    PendingDonationsView,
    MarkDonationAsReceived,  # ← add this import
)

urlpatterns = [
    path('', DonationListCreateView.as_view(), name='donation-list-create'),
    path('api/received-donations/', ReceivedDonationsView.as_view(), name='received-donations'),
    path('api/pending-donations/', PendingDonationsView.as_view(), name='pending-donations'),
    path('api/mark-received/<int:pk>/', MarkDonationAsReceived.as_view(), name='mark-donation-received'),
]
