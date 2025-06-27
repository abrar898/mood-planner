from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MoodEntryViewSet,
    TaskViewSet,
    RegisterUserAPIView,
    chat_stream,
    mood_ai_suggestions,
    register_user,
    user_stats
)

router = DefaultRouter()
router.register(r'moods', MoodEntryViewSet, basename='mood')
router.register(r'tasks', TaskViewSet, basename='task')  # ✅ Use ViewSet here

urlpatterns = [
    path('', include(router.urls)),  # ✅ Includes /moods/, /tasks/, etc.
    path('register/', register_user, name='register-user'),  # ✅ Function-based registration
    path('register1/', RegisterUserAPIView.as_view(), name='register-user-api'),  # Optional
    path('stats/', user_stats, name='user-stats'),
    path('chat-stream/',chat_stream, name='chat-stream'),
    path('analyze/', mood_ai_suggestions, name='mood-ai-suggestions'),
]
