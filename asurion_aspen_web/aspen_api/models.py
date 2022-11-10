# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Team(models.Model):
    name = models.CharField(max_length=60)
    url = models.CharField(max_length=60)

    def __str__(self):
        return self.name
