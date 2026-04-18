from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get_or_create_cart(self, user):
        # Cart otomatis dibuat kalau belum ada
        cart, _ = Cart.objects.get_or_create(user=user)
        return cart

    # GET /api/cart/ → ambil isi cart user
    def get(self, request):
        cart = self.get_or_create_cart(request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    # POST /api/cart/ → tambah item ke cart
    def post(self, request):
        cart = self.get_or_create_cart(request.user)
        serializer = CartItemSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        product = serializer.validated_data["product"]
        quantity = serializer.validated_data["quantity"]

        # Cek stock
        if quantity > product.stock:
            return Response(
                {"error": f"Stock tidak cukup. Tersedia: {product.stock}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Kalau produk sudah ada di cart → update quantity
        # Kalau belum → buat baru
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={"quantity": quantity}
        )

        if not created:
            cart_item.quantity += quantity
            # Cek lagi total quantity tidak melebihi stock
            if cart_item.quantity > product.stock:
                return Response(
                    {"error": f"Total quantity melebihi stock. Tersedia: {product.stock}"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            cart_item.save()

        cart_serializer = CartSerializer(cart)
        return Response(cart_serializer.data, status=status.HTTP_200_OK)


class CartItemView(APIView):
    permission_classes = [IsAuthenticated]

    # PATCH /api/cart/items/<id>/ → update quantity
    def patch(self, request, item_id):
        try:
            item = CartItem.objects.get(id=item_id, cart__user=request.user)
        except CartItem.DoesNotExist:
            return Response({"error": "Item tidak ditemukan."}, status=status.HTTP_404_NOT_FOUND)

        quantity = request.data.get("quantity")
        if not quantity or int(quantity) < 1:
            return Response({"error": "Quantity minimal 1."}, status=status.HTTP_400_BAD_REQUEST)

        if int(quantity) > item.product.stock:
            return Response(
                {"error": f"Stock tidak cukup. Tersedia: {item.product.stock}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        item.quantity = int(quantity)
        item.save()
        return Response(CartItemSerializer(item).data)

    # DELETE /api/cart/items/<id>/ → hapus item dari cart
    def delete(self, request, item_id):
        try:
            item = CartItem.objects.get(id=item_id, cart__user=request.user)
        except CartItem.DoesNotExist:
            return Response({"error": "Item tidak ditemukan."}, status=status.HTTP_404_NOT_FOUND)

        item.delete()
        return Response({"message": "Item berhasil dihapus."}, status=status.HTTP_204_NO_CONTENT)