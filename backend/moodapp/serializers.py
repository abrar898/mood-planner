from rest_framework import serializers
from .models import MoodEntry, Task

class MoodEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodEntry
        fields = '__all__'
        read_only_fields = ['user', 'suggestion']
# serializers.py
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'date', 'completed', 'user']
        read_only_fields = ['user']  # ✅ Don't expect 'user' from frontend

