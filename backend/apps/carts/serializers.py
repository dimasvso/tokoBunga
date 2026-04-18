from rest_framework import serializers
from apps.products.models import Product
from .models import Cart, CartItem


# ── 1. Product summary (buat ditampilkan di dalam CartItem) ──
class CartProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "price"]


# ── 2. CartItem serializer ──
class CartItemSerializer(serializers.ModelSerializer):
    product = CartProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source="product",
        write_only=True
    )
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id", "product", "product_id", "quantity", "subtotal"]

    def get_subtotal(self, obj):
        return obj.subtotal

    def validate_quantity(self, value):
        if value < 1:
            raise serializers.ValidationError("Quantity minimal 1.")
        return value


# ── 3. Cart serializer ──
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "total_price", "items", "created_at", "updated_at"]

    def get_total_price(self, obj):
        return obj.total_price