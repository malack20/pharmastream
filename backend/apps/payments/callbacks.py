from rest_framework.views import APIView
from rest_framework.response import Response
from apps.orders.models import Order
from apps.payments.models import Payment
import logging

logger = logging.getLogger(__name__)

class MpesaCallbackView(APIView):
    permission_classes = []
    
    def post(self, request):
        data = request.data
        stk_callback = data.get('Body', {}).get('stkCallback', {})
        result_code = stk_callback.get('ResultCode')
        merchant_request_id = stk_callback.get('MerchantRequestID')
        checkout_request_id = stk_callback.get('CheckoutRequestID')
        
        if result_code == 0:
            # Payment Successful
            items = stk_callback.get('CallbackMetadata', {}).get('Item', [])
            amount = next((i['Value'] for i in items if i['Name'] == 'Amount'), 0)
            receipt = next((i['Value'] for i in items if i['Name'] == 'MpesaReceiptNumber'), '')
            phone = next((i['Value'] for i in items if i['Name'] == 'PhoneNumber'), '')
            
            # Find order by reference (checkout_request_id stored during initiation)
            try:
                payment = Payment.objects.get(transaction_id=checkout_request_id)
                payment.status = 'completed'
                payment.transaction_id = receipt
                payment.save()
                
                order = payment.order
                order.status = 'paid'
                order.transaction_id = receipt
                order.save()
                
                # TODO: Trigger PDF generation
                logger.info(f"Payment successful for Order {order.id}")
            except Payment.DoesNotExist:
                logger.error(f"Payment record not found for {checkout_request_id}")
                
        return Response({"ResultCode": 0, "ResultDesc": "Success"})
