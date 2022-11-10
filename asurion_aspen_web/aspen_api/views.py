# views.py
from rest_framework import viewsets

from .serializers import TeamSerializer
from .models import Team
from django.http import HttpResponse


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by('name')
    serializer_class = TeamSerializer


def aspen(request):
    team_list = Team.objects.all()
   #  output = ', '.join([t.name for t in team_list])
    return HttpResponse(Team.objects.all())
