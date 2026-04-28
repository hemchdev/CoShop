from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import timezone


@api_view(['GET', 'POST'])
def keepAlive(request):
    """
    Lightweight endpoint to keep the Render free tier service alive.
    Prevents cold start by maintaining activity within 15-minute window.
    """
    return Response({
        'status': 'alive',
        'timestamp': timezone.now()
    })
