from django.utils import timezone
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from .models import MoodEntry, Task
from .serializers import MoodEntrySerializer, TaskSerializer
from django.db.models import Avg
from rest_framework.permissions import IsAuthenticated
from .utils import full_learning_support
from django.http import StreamingHttpResponse


def chat_stream(request):
    import json
    user_msg = json.loads(request.body).get("message")

    def generate():
        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant."},
                {"role": "user", "content": user_msg}
            ],
            stream=True,
        )
        for chunk in response:
            if "choices" in chunk and chunk["choices"][0].get("delta", {}).get("content"):
                yield chunk["choices"][0]["delta"]["content"]

    return StreamingHttpResponse(generate(), content_type='text/plain')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mood_ai_suggestions(request):
    note = request.data.get("note", "")
    if not note:
        return Response({"error": "Note is required."}, status=400)

    try:
        result = full_learning_support(note)
        return Response({"ai_output": result})
    except Exception as e:
        return Response({"error": f"AI Error: {str(e)}"}, status=500)
    
def suggest_action(mood_score):
    if mood_score in [1, 2]:  # Very Sad or Sad
        return "Try listening to relaxing music or reading a motivational book."
    elif mood_score == 3:  # Neutral
        return "Take a short walk or do a breathing exercise."
    elif mood_score == 4:  # Happy
        return "Keep up the good work! Maybe share your joy with someone."
    elif mood_score == 5:  # Very Happy
        return "Celebrate with a hobby you enjoy!"
    return "Take care of yourself!"
# ✅ Registration using APIView (optional: can remove if using only function-based view)
class RegisterUserAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=400)

        user = User.objects.create_user(username=username, password=password)
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

# ✅ Registration using function-based view (you can use only one of the two)
@api_view(['POST'])
@permission_classes([AllowAny])  
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)

    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

# ✅ Mood Entry ViewSet
# from .utils import full_mood_support  # ⬅️ Uncomment this later when AI is readyfrom .utils import full_learning_support  # make sure it's in the same app

class MoodEntryViewSet(viewsets.ModelViewSet):
    serializer_class = MoodEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return MoodEntry.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        note = serializer.validated_data.get('mood_note', '')
        suggestion = full_learning_support(note) if note else ""

        serializer.save(user=self.request.user, suggestion=suggestion)

# ✅ Task ViewSet
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    

        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_task(request):
    title = request.data.get('title')
    description = request.data.get('description')
    date = request.data.get('date')

    if not title or not description or not date:
        return Response({'error': 'All fields are required'}, status=400)

    task = Task.objects.create(
        user=request.user,
        title=title,
        description=description,
        date=date
    )

    return Response({
        'message': 'Task created successfully',
        'task': {
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'date': task.date,
            'completed': task.completed
        }
    }, status=status.HTTP_201_CREATED)

# ✅ User Stats View (Dashboard API)
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_stats(request):
    user = request.user
    today = timezone.now().date()
    week_ago = today - timezone.timedelta(days=7)

    moods = MoodEntry.objects.filter(user=user, date__range=[week_ago, today])
    avg_mood = moods.aggregate(Avg('mood_score'))['mood_score__avg'] or 0

    total_tasks = Task.objects.filter(user=user, date__range=[week_ago, today]).count()
    completed_tasks = Task.objects.filter(user=user, completed=True, date__range=[week_ago, today]).count()

    return Response({
        'average_mood_score': round(avg_mood, 2),
        'total_tasks': total_tasks,
        'completed_tasks': completed_tasks
    })
