import os
SETTINGS_PATH = os.path.dirname(os.path.dirname(__file__))

TEMPLATES = [
    {
        # Template backend to be used, For example Jinja
        'BACKEND': 'django.template.backends.django.DjangoTemplates',

        # Directories for templates
        'DIRS': [os.path.join(SETTINGS_PATH, 'templates/aspen')],
        'APP_DIRS': True,
 
        # options to configure
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
  INSTALLED_APPS = [
    'fontawesomefree'
  ]