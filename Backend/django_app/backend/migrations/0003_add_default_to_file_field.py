# Generated by Django 4.2.3 on 2023-07-15 19:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_csvdata'),
    ]

    operations = [
        migrations.AddField(
            model_name='csvdata',
            name='file',
            field=models.FileField(default='your_default_value_here', upload_to='csv_files/'),
        ),
        migrations.AlterField(
            model_name='csvdata',
            name='url',
            field=models.CharField(max_length=200),
        ),
    ]
