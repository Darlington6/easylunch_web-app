from django.contrib import admin
from .models import Product, Order

# Simple registration
admin.site.register(Product)
admin.site.register(Order)

