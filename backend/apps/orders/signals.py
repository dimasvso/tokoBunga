from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Order


@receiver(pre_save, sender=Order)
def handle_stock_on_status_change(sender, instance, **kwargs):
    # Order baru (belum ada di DB) — skip
    if not instance.pk:
        return

    try:
        previous = Order.objects.get(pk=instance.pk)
    except Order.DoesNotExist:
        return

    # Confirmed → kurangi stok
    if previous.status == "pending" and instance.status == "confirmed":
        for item in instance.items.all():
            product = item.product
            if product:
                if product.stock < item.quantity:
                    raise ValueError(
                        f"Stok {product.name} tidak cukup. Tersedia: {product.stock}"
                    )
                product.stock -= item.quantity
                product.save()

    # Cancelled dari confirmed → kembalikan stok
    if previous.status == "confirmed" and instance.status == "cancelled":
        for item in instance.items.all():
            product = item.product
            if product:
                product.stock += item.quantity
                product.save()