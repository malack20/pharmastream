from .models import Order, OrderItem
from apps.products.models import Product

class OrderService:
    @staticmethod
    def create_order(user, items_data, payment_method):
        total_price = 0
        order = Order.objects.create(
            user=user,
            total_price=0,
            payment_method=payment_method,
            status='pending'
        )
        
        for item in items_data:
            product = Product.objects.get(id=item['product_id'])
            quantity = item['quantity']
            price = product.price
            
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=price
            )
            total_price += price * quantity
            
        order.total_price = total_price
        order.save()
        return order
