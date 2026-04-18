from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Order
from .serializers import OrderSerializer
from apps.carts.models import Cart


class OrderListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    # GET /api/orders/ → list semua order milik user
    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    # POST /api/orders/ → checkout dari cart
    def post(self, request):
        # Ambil cart user
        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response(
                {"error": "Cart tidak ditemukan."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not cart.items.exists():
            return Response(
                {"error": "Cart masih kosong."},
                status=status.HTTP_400_BAD_REQUEST
            )

        shipping_address = request.data.get("shipping_address", "")
        if not shipping_address:
            return Response(
                {"error": "Alamat pengiriman wajib diisi."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Buat order
        order = Order.objects.create(
            user=request.user,
            shipping_address=shipping_address,
            note=request.data.get("note", ""),
            total_price=cart.total_price  # ambil dari cart property
        )

        # Buat OrderItem dari CartItem — snapshot harga saat ini
        for cart_item in cart.items.select_related("product"):
            Order.objects.get(pk=order.pk)  # pastikan order tersimpan
            order.items.create(
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.product.price  # snapshot harga
            )

        # Kosongkan cart setelah checkout
        cart.items.all().delete()

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    # GET /api/orders/<id>/ → detail order
    def get(self, request, order_id):
        order = get_object_or_404(Order, id=order_id, user=request.user)
        serializer = OrderSerializer(order)
        return Response(serializer.data)


class OrderStatusUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    # PATCH /api/orders/<id>/status/ → admin update status
    def patch(self, request, order_id):
        order = get_object_or_404(Order, id=order_id)
        new_status = request.data.get("status")

        if new_status not in ["pending", "confirmed", "cancelled"]:
            return Response(
                {"error": "Status tidak valid."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            order.status = new_status
            order.save()  # ← ini yang trigger signal stok
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer = OrderSerializer(order)
        return Response(serializer.data)