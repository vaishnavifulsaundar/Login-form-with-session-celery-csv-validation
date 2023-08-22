from django.urls import path
from . import views
import os
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('api/login/', views.login_view, name='login'),
    path('api/csvdata/', views.validate_csv, name='csv_data'),
    path('api/read_csv/', views.read_csv_data, name='read_data'),
    path('api/save_csv_url/', views.save_csv_url),
    path('api/schedule_csv_url_task/', views.schedule_csv_url_task, name='schedule_csv_url_task'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)






