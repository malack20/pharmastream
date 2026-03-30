import re

def validate_phone(phone):
    pattern = re.compile(r'^\+?254\d{9}$')
    return bool(pattern.match(phone))
