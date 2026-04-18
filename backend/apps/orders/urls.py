from django.urls import path
from .views import OrderListCreateView, OrderDetailView, OrderStatusUpdateView

urlpatterns = [
    path("orders/", OrderListCreateView.as_view(), name="order-list"),
    path("orders/<int:order_id>/", OrderDetailView.as_view(), name="order-detail"),
    path("orders/<int:order_id>/status/", OrderStatusUpdateView.as_view(), name="order-status"),
]