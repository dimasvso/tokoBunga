from django.core.management.base import BaseCommand
from django.db import transaction
from decimal import Decimal
from apps.products.models import Product
from apps.category.models import Category


class Command(BaseCommand):
    help = "Seed 12 products (Buket & Tangkai)"

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding products...")

        buket_category, _ = Category.objects.get_or_create(name="Buket Bunga")
        tangkai_category, _ = Category.objects.get_or_create(name="Bunga Tangkai")

        products = [
            # ===== BUKET (6) =====
            {
                "name": "Buket Mawar Merah Premium",
                "price": Decimal("350000.00"),
                "description": "24 tangkai mawar merah premium dengan wrapping elegan",
                "stock": 8,
                "category": buket_category,
            },
            {
                "name": "Buket Mawar Pink Romantic",
                "price": Decimal("280000.00"),
                "description": "Buket mawar pink isi 18 tangkai",
                "stock": 12,
                "category": buket_category,
            },
            {
                "name": "Buket Lily & Baby Breath",
                "price": Decimal("320000.00"),
                "description": "Perpaduan lily putih dan baby breath",
                "stock": 6,
                "category": buket_category,
            },
            {
                "name": "Buket Mix Pastel Sweet",
                "price": Decimal("300000.00"),
                "description": "Campuran bunga warna pastel lembut",
                "stock": 7,
                "category": buket_category,
            },
            {
                "name": "Buket Tulip Fresh",
                "price": Decimal("400000.00"),
                "description": "20 tangkai tulip import warna mix",
                "stock": 5,
                "category": buket_category,
            },
            {
                "name": "Buket Graduation Special",
                "price": Decimal("275000.00"),
                "description": "Buket spesial untuk wisuda dengan kartu ucapan",
                "stock": 10,
                "category": buket_category,
            },

            # ===== TANGKAI (6) =====
            {
                "name": "Mawar Merah Tangkai",
                "price": Decimal("20000.00"),
                "description": "1 tangkai mawar merah segar",
                "stock": 120,
                "category": tangkai_category,
            },
            {
                "name": "Mawar Putih Tangkai",
                "price": Decimal("20000.00"),
                "description": "1 tangkai mawar putih segar",
                "stock": 90,
                "category": tangkai_category,
            },
            {
                "name": "Lily Putih Tangkai",
                "price": Decimal("35000.00"),
                "description": "1 tangkai lily putih premium",
                "stock": 60,
                "category": tangkai_category,
            },
            {
                "name": "Tulip Pink Tangkai",
                "price": Decimal("30000.00"),
                "description": "1 tangkai tulip pink import",
                "stock": 75,
                "category": tangkai_category,
            },
            {
                "name": "Baby Breath Tangkai",
                "price": Decimal("15000.00"),
                "description": "1 tangkai baby breath segar",
                "stock": 150,
                "category": tangkai_category,
            },
            {
                "name": "Gerbera Orange Tangkai",
                "price": Decimal("18000.00"),
                "description": "1 tangkai gerbera warna orange",
                "stock": 80,
                "category": tangkai_category,
            },
        ]

        for data in products:
            Product.objects.get_or_create(
                name=data["name"],
                defaults=data
            )

        self.stdout.write(self.style.SUCCESS("Seeding 12 products completed!"))