# views.py
from rest_framework import viewsets

from .serializers import TeamSerializer
from .models import Team
from django.http import HttpResponse
from django.shortcuts import render

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by('name')
    serializer_class = TeamSerializer


def aspen(request):
    team_list = Team.objects.all()
    context = {
        "team_list": team_list
    }
    return render(request, "aspen.html", context)
