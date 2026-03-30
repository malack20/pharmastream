import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.sites.models import Site
from allauth.socialaccount.models import SocialApp
from django.conf import settings

def setup_google_auth():
    # 1. Setup Site
    site, created = Site.objects.get_or_create(id=1, defaults={'domain': 'localhost:8000', 'name': 'PharmaStream'})
    if not created:
        site.domain = 'localhost:8000'
        site.name = 'PharmaStream'
        site.save()
    
    # 2. Setup SocialApp
    client_id = os.environ.get('GOOGLE_CLIENT_ID')
    secret = os.environ.get('GOOGLE_CLIENT_SECRET')
    
    if not client_id or not secret:
        print("Error: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not found in environment.")
        return

    app, created = SocialApp.objects.get_or_create(
        provider='google',
        defaults={
            'name': 'Google Login',
            'client_id': client_id,
            'secret': secret,
        }
    )
    
    if not created:
        app.client_id = client_id
        app.secret = secret
        app.save()
        
    app.sites.add(site)
    print(f"Successfully configured Google SocialApp for site {site.domain}")

if __name__ == "__main__":
    setup_google_auth()
