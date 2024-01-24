# Generated by Django 4.2.7 on 2024-01-08 02:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_review_created_at'),
    ]

    operations = [
        migrations.CreateModel(
            name='DiscountStatusCode',
            fields=[
                ('discount_status_code', models.IntegerField(blank=True, null=True)),
                ('discount_status_name', models.CharField(blank=True, max_length=100, null=True)),
                ('discount_amount', models.DecimalField(decimal_places=2, max_digits=4)),
                ('comments', models.CharField(blank=True, max_length=200, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='discount_status_code',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
