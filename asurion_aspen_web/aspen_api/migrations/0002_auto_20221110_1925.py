# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2022-11-10 19:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aspen_api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('url', models.CharField(max_length=60)),
            ],
        ),
        migrations.DeleteModel(
            name='Hero',
        ),
    ]
