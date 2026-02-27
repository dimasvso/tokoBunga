from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
from rest_framework.permissions import IsAuthenticated


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def Getme(request):
    user = request.user

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "groups": list(user.groups.values_list("name", flat=True)),
        "is_admin": user.groups.filter(name__iexact="admin").exists()
    })

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def UpdatePassword(request):
    user = request.user
    data = request.data

    old_password = data.get("old_password")
    new_password = data.get("new_password")

    if not user.check_password(old_password):
        return Response(
            {"error": "password lama salah"}, status=status.HTTP_400_BAD_REQUEST
        )

    user.set_password(new_password)
    user.save()

    return Response(
        {"Message": "Password berhasil di ganti"}, status=status.HTTP_200_OK
    )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def UpdateUser(request):
    user = request.user
    account = user.account
    data = request.data
    files = request.FILES

    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)
    user.save()

    account.address = data.get("address", account.address)

    if "avatar" in files:
        account.avatar = files["avatar"]

    account.save()

    return Response(
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "address": account.address,
            "avatar": account.avatar.url if account.avatar else None,
        }
    )


@api_view(["POST"])
def register_api(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Register berhasil"}, status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login_api(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if not user:
        return Response(
            {"message": "password atau username salah"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username,
        }
    )
