from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    """Root API endpoint - provides API information"""
    return Response({
        'message': 'Welcome to PharmaStream API',
        'version': '1.0.0',
        'frontend_url': 'http://localhost:5173',
        'api_endpoints': {
            'admin': '/admin/',
            'authentication': '/api/auth/',
            'user_profile': '/api/accounts/profile/',
            'products': '/api/products/',
            'orders': '/api/orders/',
            'prescriptions': '/api/prescriptions/',
            'payments': '/api/payments/',
            'receipts': '/api/receipts/',
            'faq': '/api/faq/',
        },
        'note': 'This is a REST API backend. Access the frontend at http://localhost:5173'
    })
