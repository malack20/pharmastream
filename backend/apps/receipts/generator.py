from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from django.conf import settings
import os

class ReceiptGenerator:
    def __init__(self, order):
        self.order = order
        self.filename = f"receipt_{order.id}.pdf"
        self.filepath = os.path.join(settings.MEDIA_ROOT, 'receipts', self.filename)
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(self.filepath), exist_ok=True)

    def generate(self):
        doc = SimpleDocTemplate(self.filepath, pagesize=letter)
        styles = getSampleStyleSheet()
        elements = []

        # Header
        elements.append(Paragraph("<b>PharmaStream</b>", styles['Title']))
        elements.append(Paragraph("Nairobi, Kenya", styles['Normal']))
        elements.append(Paragraph(f"Date: {self.order.created_at.strftime('%Y-%m-%d %H:%M')}", styles['Normal']))
        elements.append(Paragraph(f"Receipt No: {self.order.transaction_id or self.order.id}", styles['Normal']))
        elements.append(Spacer(1, 20))

        # Items Table
        data = [['Item', 'Qty', 'Unit Price', 'Total']]
        for item in self.order.items.all():
            data.append([
                item.product.name,
                str(item.quantity),
                f"KES {item.price}",
                f"KES {item.quantity * item.price}"
            ])
        
        data.append(['', '', '<b>Total</b>', f"<b>KES {self.order.total_price}</b>"])

        table = Table(data, colWidths=[300, 50, 100, 100])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.navy),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ]))
        elements.append(table)
        elements.append(Spacer(1, 30))

        # Footer
        elements.append(Paragraph(f"Payment Method: {self.order.get_payment_method_display()}", styles['Normal']))
        elements.append(Paragraph(f"Transaction ID: {self.order.transaction_id}", styles['Normal']))
        elements.append(Spacer(1, 10))
        elements.append(Paragraph("<b>Verified by Pharmacist</b>", styles['Normal']))
        elements.append(Paragraph("Thank you for choosing PharmaStream!", styles['Italic']))

        doc.build(elements)
        return self.filepath
