

from celery import shared_task
from .models import CSVData


@shared_task
def save_csv_url_to_database(urls):
    for url in urls:
        print(f"Processing saved URL: {url}")
    return len(urls)  
