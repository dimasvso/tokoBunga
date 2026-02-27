from django.shortcuts import render
from rest_framework import viewsets
from .models import Category
from .serializers import CategorySerializer
from apps.accounts.permissions import IsAdmin

# Create your views here.

class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes=[IsAdmin]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer