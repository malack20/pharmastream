import requests
url = 'http://127.0.0.1:8000/api/auth/registration/'
payload = {
  'username': 'tryuser2',
  'email': 'tryuser2@example.com',
  'first_name': 'Try',
  'last_name': 'User',
  'password1': 'Str0ngPass!23',
  'password2': 'Str0ngPass!23'
}
res = requests.post(url, json=payload)
print('status', res.status_code)
print(res.text)
