from rest_framework.viewsets import ModelViewSet
from .models import Product
from .serializers import ProductSerializers
from apps.accounts.permissions import IsAdmin


class ProductViewSet (ModelViewSet):
    permission_classes=[IsAdmin]
    queryset =  Product.objects.all()
    serializer_class = ProductSerializers