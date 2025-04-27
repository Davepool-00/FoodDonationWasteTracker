# users/permissions.py
from rest_framework import permissions

# --- Admin or Read-Only ---
class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

# --- Donor or Admin ---
class IsDonorOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.is_staff or request.user.customuser.user_type == 'donor'
        )

# --- Organization or Admin ---
class IsOrganizationOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.is_staff or request.user.customuser.user_type == 'organization'
        )
