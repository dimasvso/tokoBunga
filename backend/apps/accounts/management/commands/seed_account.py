from django.core.management.base import BaseCommand
from apps.accounts.models import Account
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = "Seed dummy accounts"

    def handle(self, *args, **kwargs):
        accounts = [
            {
                "username": "Melati",
                "email": "melati@example.com",
                "address": "bunga kecil putih harum lembut",
                "password": "Test12345",
            },
            {
                "username": "Anggrek",
                "email": "anggrek@example.com",
                "address": "bunga eksotis cocok untuk dekorasi",
                "password": "Test12345",
            },
            {
                "username": "Mawar",
                "email": "mawar@example.com",
                "address": "wangi merah merona",
                "password": "Test12345",
            },
        ]

        for item in accounts:
            user, created = User.objects.get_or_create(
                username=item["username"],
                defaults={
                    "email": item["email"],
                },
            )
            if created:
                user.set_password(item["password"])
                user.save()
            account, acc_created = Account.objects.get_or_create(
                user=user, defaults={"address": item["address"]}
            )
            if not acc_created:
                account.address = item["address"]
                account.save()

        self.stdout.write(self.style.SUCCESS("Successfully seeded accounts"))
