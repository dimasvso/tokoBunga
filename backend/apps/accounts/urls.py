from django.urls import path
from .views import register_api, login_api,Getme, UpdateUser, UpdatePassword

urlpatterns = [
    path('me/', Getme),
    path('updatepassword/' , UpdatePassword),
    path('updateuser/', UpdateUser),
    path('register/', register_api),
    path('login/', login_api),
]
    