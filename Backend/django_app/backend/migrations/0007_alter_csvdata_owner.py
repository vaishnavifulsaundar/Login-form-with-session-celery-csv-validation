# Generated by Django 4.2.3 on 2023-07-16 12:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_userprofile_alter_csvdata_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='csvdata',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.user'),
        ),
    ]