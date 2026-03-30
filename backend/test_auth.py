import requests

url='http://127.0.0.1:8000/api/auth/login/'
print('using url', url)

data={'username':'admin','password':'admin123'}
res=requests.post(url, json=data)
print('status', res.status_code)
print('body', res.text)
