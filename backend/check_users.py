import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.accounts.models import User
from django.contrib.auth import authenticate

# Check existing users
users = User.objects.all()
print("Existing users:")
for user in users:
    print(f"  Username: {user.username}, Email: {user.email}")

# Test authentication
print("\nTesting authentication:")
test_user = authenticate(username='admin', password='admin123')
print(f"admin/admin123 authentication: {test_user is not None}")

test_user2 = authenticate(username='admin@example.com', password='admin123')
print(f"admin@example.com/admin123 authentication: {test_user2 is not None}")

# Create admin user if doesn't exist
if not User.objects.filter(username='admin').exists():
    print("\nCreating admin user...")
    User.objects.create_superuser(
        username='admin',
        email='admin@example.com',
        password='admin123'
    )
    print("Admin user created!")
else:
    print("\nAdmin user already exists")