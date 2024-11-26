# urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Product URLs
    path('products/', views.ProductListCreate.as_view(), name='product-list-create'),
    path('products/<int:pk>/', views.ProductUpdate.as_view(), name='product-update'),
    path('products/delete/<int:pk>/', views.ProductDelete.as_view(), name='product-delete'),
    
    # Order URLs
    path('orders/', views.OrderListCreate.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', views.OrderUpdate.as_view(), name='order-update'),
    path('orders/delete/<int:pk>/', views.OrderDelete.as_view(), name='order-delete'),
]
