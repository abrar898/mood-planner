# moodplanner/backend/moodapp/models.py
from django.db import models
from django.contrib.auth.models import User

class MoodEntry(models.Model):
    MOOD_CHOICES = [
        (1, '😢 Very Sad'),
        (2, '😟 Sad'),
        (3, '😐 Neutral'),
        (4, '😊 Happy'),
        (5, '😁 Very Happy'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    mood_note = models.TextField(blank=True, null=True)
    suggestion = models.TextField(blank=True, null=True)
    mood_score = models.IntegerField(choices=MOOD_CHOICES)
   

    def __str__(self):
        return f"{self.user.username} - {self.date} - {self.mood_score}"

class Task(models.Model):
    # PRIORITY_CHOICES = [
    #     ('Low', 'Low'),
    #     ('Medium', 'Medium'),
    #     ('High', 'High'),
    # ]
    # CATEGORY_CHOICES = [
    #     ('Work', 'Work'),
    #     ('Study', 'Study'),
    #     ('Health', 'Health'),
    #     ('Personal', 'Personal'),
    # ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    date = models.DateField()
    # priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='Medium')
    # category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='Personal')
    completed = models.BooleanField(default=False)
