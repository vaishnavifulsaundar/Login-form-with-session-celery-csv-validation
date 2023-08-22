
# from celery import Celery
# from django.conf import settings

# app = Celery('django_app')
# app.config_from_object('django.conf:settings', namespace='CELERY')
# app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
# app.conf.beat_schedule = settings.CELERY_BEAT_SCHEDULE


from celery import Celery
from django.conf import settings
from datetime import timedelta


app = Celery('backend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.beat_schedule = {
    'save_csv_url_task': {
        'task': 'backend.tasks.save_csv_url_to_database',
        'schedule': timedelta(hours=1),
    },
}


