from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from io import BytesIO
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
import datetime
import random

class GenerateReceiptView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        print(f"Generating receipt for: {request.GET}")
        amount_str = request.GET.get('amount', '0')
        phone = request.GET.get('phone', 'N/A')
        method = request.GET.get('method', 'M-Pesa')
        
        try:
            amount = float(amount_str)
        except ValueError:
            amount = 0.0

        delivery_fee = 250.0
        subtotal = max(0, amount - delivery_fee)
        
        # Prepare context data
        data = {
            'receipt_no': f"PS-{int(datetime.datetime.now().timestamp())}",
            'date': datetime.datetime.now().strftime('%d %b %Y, %H:%M'),
            'customer_name': 'Valued Customer',
            'phone': phone,
            'method': method,
            'transaction_id': f"QW{random.randint(100000, 999999)}RTX",
            'subtotal': f"{subtotal:,.2f}",
            'delivery_fee': f"{delivery_fee:,.2f}",
            'amount': f"{amount:,.2f}",
            'items': [
                {
                    'name': 'Pharmaceutical Supplies',
                    'category': 'Prescription/General',
                    'quantity': 1,
                    'price': f"{subtotal:,.2f}",
                    'total': f"{subtotal:,.2f}"
                }
            ]
        }

        try:
            # Generate PDF
            template = get_template('receipt.html')
            html = template.render(data)
            result = BytesIO()
            pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), result)

            if not pdf.err:
                response = HttpResponse(result.getvalue(), content_type='application/pdf')
                response['Content-Disposition'] = f'attachment; filename="PharmaStream_Receipt_{data["receipt_no"]}.pdf"'
                print("Receipt generated successfully")
                return response
            
            print(f"PDF generation error: {pdf.err}")
            return HttpResponse(f'Error generating PDF receipt: {pdf.err}', status=400)
        except Exception as e:
            print(f"Internal error: {str(e)}")
            return HttpResponse(f'Internal error: {str(e)}', status=500)
