from rest_framework.viewsets import ModelViewSet
from .models import Product
from .serializers import ProductSerializers
from apps.accounts.permissions import IsAdminGroup
from rest_framework.permissions import AllowAny


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def get_serializer_class(self):
        return ProductSerializers

    def get_permissions(self):
        if self.request.method in ["POST", "PUT", "DELETE"]:
            return [IsAdminGroup()]
        return []

    def perform_create(self, serializer):
        product = serializer.save()
        images = self.request.FILES.getlist("images")
        from .models import ProductImage

        for img in images:
            ProductImage.objects.create(product=product, image=img)

    def perform_update(self, serializer):
        product = serializer.save()
        images = self.request.FILES.getlist("images")
        from .models import ProductImage

        if images:
            # Optional: hapus gambar lama jika ingin replace
            # ProductImage.objects.filter(product=product).delete()
            for img in images:
                ProductImage.objects.create(product=product, image=img)
