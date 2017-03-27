from django.conf.urls import url
from bot import views

urlpatterns = [
    url(r'^send/', views.send_message),
    url(r'^', views.get_chat)
]
