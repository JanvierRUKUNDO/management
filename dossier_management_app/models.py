from django.db import models

class Dossier(models.Model):
    reference_number = models.CharField(max_length=100, unique=True)
    location_name = models.CharField(max_length=200)
    box_container = models.CharField(max_length=100)

    def __str__(self):
        return self.reference_number
