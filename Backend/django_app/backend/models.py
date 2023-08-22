from django.db import models
from django.contrib.auth.models import User


class User(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    email = models.EmailField()

    def __str__(self):
        return self.username


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class CSVData(models.Model):
    owner = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    url = models.CharField(max_length=200)
    csv_file = models.FileField(upload_to='csv_files/', default='')

    def __str__(self):
        return f"CSVData {self.id}"




