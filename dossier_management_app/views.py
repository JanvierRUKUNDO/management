from django.shortcuts import render, redirect
from .models import Dossier
from .forms import DossierForm

def create_dossier(request):
    if request.method == 'POST':
        form = DossierForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('dossier-list')
    else:
        form = DossierForm()
    return render(request, 'create_dossier.html', {'form': form})

def delete_dossier(request, dossier_id):
    dossier = Dossier.objects.get(pk=dossier_id)
    dossier.delete()
    return redirect('dossier-list')
    
def dossier_list(request):
    reference_number = request.GET.get('reference_number')
    location_name = request.GET.get('location_name')

    dossiers = Dossier.objects.all()
    if reference_number:
        dossiers = dossiers.filter(reference_number__icontains=reference_number)
    if location_name:
        dossiers = dossiers.filter(location_name__icontains=location_name)

    return render(request, 'dossier_list.html', {'dossier_list': dossiers})
