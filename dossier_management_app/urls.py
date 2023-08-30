from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_dossier, name='create-dossier'),
    path('delete/<int:dossier_id>/', views.delete_dossier, name='delete-dossier'),
    path('list/', views.dossier_list, name='dossier-list'),
]
