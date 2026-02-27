from django.core.management.base import BaseCommand
from apps.products.models import Product

class Command(BaseCommand):
    help = 'Seed dummy products'

    def handle(self, *args, **kwargs):
        products = [
            {
                "name": "Melati",
                "price": "1500.00",
                "description": "bunga kecil putih harum lembut",
                "stock": 25,
            },
            {
                "name": "Anggrek",
                "price": "5000.00",
                "description": "bunga eksotis cocok untuk dekorasi",
                "stock": 12,
            },
            {
                "name": "Mawar",
                "price": "2000.00",
                "description": "wangi merah merona",
                "stock": 0,
            },
        ]

        for item in products:
            Product.objects.create(**item)

        self.stdout.write(self.style.SUCCESS('Successfully seeded products'))
