from django.http import JsonResponse
from django.shortcuts import render, render_to_response


# Create your views here.
def chat(request):
    if request.method == 'GET':
        return render_to_response('chat.html', {})
    elif request.method == 'POST':
        return JsonResponse({"message": request.POST['message']})