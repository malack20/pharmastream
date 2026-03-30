from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Payment
from .serializers import PaymentSerializer
from .mpesa import MpesaClient
from apps.orders.services import OrderService
import logging

logger = logging.getLogger(__name__)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.AllowAny] # Allow for testing

    @action(detail=False, methods=['post'])
    def mpesa(self, request):
        phone_number = request.data.get('phone_number')
        amount = request.data.get('amount')
        items = request.data.get('items', [])
        
        if not phone_number or not amount:
            return Response(
                {"message": "Phone number and amount are required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            # 1. Create Order if items are provided
            order = None
            if items and request.user.is_authenticated:
                order = OrderService.create_order(request.user, items, 'mpesa')
            
            # 2. Initiate M-Pesa STK Push
            mpesa = MpesaClient()
            reference = f"PS-{phone_number[-4:]}"
            response = mpesa.initiate_stk_push(phone_number, amount, reference)
            
            # 3. Save payment record
            checkout_request_id = response.get('CheckoutRequestID')
            if checkout_request_id:
                payment_data = {
                    'amount': amount,
                    'method': 'mpesa',
                    'transaction_id': checkout_request_id,
                    'status': 'pending'
                }
                if order:
                    payment_data['order'] = order
                
                # We need to manually create the Payment since it's a ModelViewSet but we are in an action
                Payment.objects.create(**payment_data)
            
            return Response(response)
        except Exception as e:
            logger.error(f"Mpesa initiation error: {str(e)}")
            return Response(
                {"message": f"Failed to initiate M-Pesa payment: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
