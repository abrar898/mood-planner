from django.contrib import admin
from .models import MoodEntry
from .models import Task


admin.site.register(MoodEntry)
admin.site.register(Task)
