from django.conf.urls import url
from bot import views

urlpatterns = [
    url(r'^', views.chat)
]
