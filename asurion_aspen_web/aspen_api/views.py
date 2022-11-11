# views.py
from rest_framework import viewsets

from .serializers import TeamSerializer
from .models import Team
from django.http import HttpResponse
from django.shortcuts import render
import json
import ast
class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by('name')
    serializer_class = TeamSerializer


def aspen(request):
    team_list = Team.objects.all()
    for i in enumerate(team_list):
        index, team = i
        repos = ast.literal_eval(ast.literal_eval(team.repositories_owned))
        for r in repos:
            repo_info = r.split(',')
            repo_name = repo_info[0].split(":")[1]
            repo_url = repo_info[1].split(":")[1]
            team_list[index].repositories_owned = {repo_name: repo_url}
    context = {
        "team_list": team_list
    }
    return render(request, "aspen.html", context)
