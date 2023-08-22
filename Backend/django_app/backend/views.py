from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.http import require_POST, require_GET 
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CSVDataSerializer, CsvUrlSerializer
import csv
from celery.result import AsyncResult
import pandas as pd
from rest_framework.decorators import action
import json
from django.core.exceptions import ValidationError
from .models import CSVData
from django.shortcuts import get_list_or_404
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .tasks import save_csv_url_to_database



@csrf_exempt
@require_POST
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            request.session['username'] = user.username
            print(username,password)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'message': 'Invalid credentials'})
    return JsonResponse({'message': 'Invalid request method'})



@csrf_exempt
def validate_csv(request):
    if request.method == 'POST':
        file = request.FILES.get('csv_file')
        if file:
            try:
                dialect = csv.Sniffer().sniff(file.read().decode('utf-8'))
                if dialect.delimiter != ',':
                    return JsonResponse({'error': 'Invalid CSV delimiter. Only comma-separated (,) files are supported.'}, status=400)

                csv_data = CSVData.objects.create(csv_file=file)

                return JsonResponse({'message': 'CSV file is valid.', 'url': csv_data.csv_file.url})

            except csv.Error:
                return JsonResponse({'error': 'Invalid CSV file.'}, status=400)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)



@require_POST
@csrf_exempt
def read_csv_data(request):
    if request.method == 'POST':
        if 'file' not in request.FILES:
            return JsonResponse({'error': 'No file provided'}, status=400)

        file = request.FILES['file']
        try:
            decoded_file = file.read().decode('utf-8')
            csv_data = csv.DictReader(decoded_file.splitlines(), delimiter=',')
            data = list(csv_data)
            return JsonResponse({'data': data})
        except csv.Error:
            return JsonResponse({'error': 'Error while reading CSV file'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


@login_required
@csrf_exempt
@require_POST
def save_csv_url(request):
    serializer = CsvUrlSerializer(data=request.POST)
    if serializer.is_valid():
        url = serializer.validated_data['url']
        owner = request.user
        csv_data = CSVData.objects.create(owner=owner, url=url)
        csv_file_url = csv_data.csv_file.url
        save_csv_url_to_database.delay(csv_file_url)  

        return JsonResponse({'message': 'CSV URL saved successfully.', 'url': csv_file_url})
    return JsonResponse({'error': serializer.errors}, status=400)


@csrf_exempt
def schedule_csv_url_task(request):
    if request.method == 'POST':
        urls = request.POST.getlist('urls') 
        result = save_csv_url_to_database.delay(urls)
        task_result = result.get()

        return JsonResponse({'message': 'URL processing task scheduled successfully.', 'data':task_result})

    return JsonResponse({'error': 'Invalid request method.'}, status=405)

        

