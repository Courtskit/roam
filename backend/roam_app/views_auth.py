from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from .models import *
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST
)

def error_on_request(error_msg):
    return JsonResponse({ "error": error_msg }, status=400)

def bad_request():
    return error_on_request("bad request")

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def handle_login(request):
    """User login, based on username"""
    try:
        username = request.data.get("email")
        password = request.data.get("password")
        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'}, status=HTTP_400_BAD_REQUEST)
        user = authenticate(username=username, password=password)
        if user and user.is_active:
            login(request, user)
            user_serial = UserSerializer(user)
            return Response(user_serial.data)
    
    except Exception as e:
        return error_on_request(str(e))
    
    return bad_request()

@csrf_exempt
@api_view(["GET"])
@permission_classes((AllowAny,))
def who_am_i(request):
    """Helper method to persist user on reload"""
    if request.user.is_authenticated:
        user = request.user
        user_serial = UserSerializer(user)
        return Response({'user':user_serial.data})
    else:
        return JsonResponse({'user':None})


@csrf_exempt
def handle_logout(request):
    """Logout a user session"""
    try:
        if request.method == "POST":
            logout(request)
            return JsonResponse({ "status": "logged out successfully" }, status=200)
    
    except Exception as e:
        return error_on_request(str(e))
    
    return bad_request()