

# serializers.py
from rest_framework import serializers

from .models import Team

class TeamSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Team
        fields = ('name', 'url')
