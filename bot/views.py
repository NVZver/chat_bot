from django.http import JsonResponse
from django.shortcuts import render, render_to_response
from django.views.decorators.csrf import csrf_exempt


def get_chat(request):
    if request.method == 'GET':
        return render_to_response('chat.html', {})


@csrf_exempt
def send_message(request):
    if request.method == 'POST':
        message = {
            "message": request.POST.get('message'),
            "type": request.POST.get('type'),
        }

        return JsonResponse(message)
