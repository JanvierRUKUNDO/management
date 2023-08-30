from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dossiers/', include('dossier_management_app.urls')),
]
