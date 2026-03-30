from django.db import models

class FAQ(models.Model):
    category = models.CharField(max_length=100, default='General')
    question = models.CharField(max_length=500)
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question
