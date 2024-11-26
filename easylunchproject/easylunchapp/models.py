from django.db import models

class Product(models.Model):
    product_name = models.CharField(max_length=255, unique=True)  # Ensure unique product names for lookup
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.product_name


class Order(models.Model):
    customer_name = models.CharField(max_length=255)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=15, default='customer_phone')  # Adjust max_length for valid phone numbers
    product_quantities = models.JSONField(default=dict)  # Store product names as keys and quantities as values
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    pickup_date = models.DateTimeField(auto_now_add=False,default="YYYY-MM-DD-HH:MM:SS")

    def calculate_total(self):
        """
        Calculate the total price for the order by summing the prices of products multiplied by their quantities.
        """
        total = 0
        for product_name, quantity in self.product_quantities.items():
            try:
                product = Product.objects.get(product_name=product_name)  # Get product by name
                total += product.price * quantity
            except Product.DoesNotExist:
                # Skip missing products or handle as required
                pass
        return total

    def save(self, *args, **kwargs):
        """
        Override save to calculate the total before saving.
        """
        self.total = self.calculate_total()  # Recalculate total before saving
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order {self.id} - {self.customer_name}"
