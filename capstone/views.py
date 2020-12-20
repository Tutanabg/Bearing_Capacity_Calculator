from django.shortcuts import render
import json
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from django.core import serializers
from django.core.serializers import serialize
from .models import *
from django.views.decorators.csrf import csrf_exempt




def index(request):
	return render(request, 'capstone/index.html')
	
def soil_capacity(request):
	one_soil = capacity.objects.all()
	return render(request, 'capstone/soil.html',{'capacity':one_soil,})
	
def rock_capacity(request):
	one_rock = capacity_rock.objects.all()
	return render(request, 'capstone/rock.html',{'capacity':one_rock,})
	
	
def all_capacity(request):
	list = capacity.objects.all()
	return JsonResponse([capacity.serialize() for capacity in list], safe=False)
	
def all_capacity_one(request, id):
	one = capacity.objects.get(id=id)
	return JsonResponse(one.serialize(), safe=False)
	

@csrf_exempt
def inputs(request):
	data = json.loads(request.body)
	a = data.get("Cohesion")     
	b = data.get("Shear_Strength")
	c = data.get("Length")
	d = data.get("Depth")
	e = data.get("Width")
	f = data.get("Inclination")
	g = data.get("Water_Unit_Weight")
	h = data.get("Ground_Water_Depth")
	i = data.get("Dry_Soil_Unit_Weight")
	j = data.get("Saturated_Soil_Unit_Weight")
	k = data.get("Unit_Weight_Below_Foundation")
	l = data.get("Factor_of_Safety")
	item = capacity(
	Cohesion = a,   
	Shear_Strength = b,
	Length = c,
	Depth = d,
	Width = e,
	Inclination = f,
	Water_Unit_Weight = g,
	Ground_Water_Depth = h,
	Dry_Soil_Unit_Weight = i,
	Saturated_Soil_Unit_Weight = j,
	Unit_Weight_Below_Foundation = k,
	Factor_of_Safety = l,
	)
	item.save()
	return JsonResponse(item.serialize(), safe=False)
	
	
@csrf_exempt
def inputs_rock(request):
	data = json.loads(request.body)
	a = data.get("UCS")     
	b = data.get("Shear_Strength")
	c = data.get("Factor_of_Safety")
	list = capacity_rock(
	UCS = a,   
	Shear_Strength = b,
	Factor_of_Safety = c,
	)
	list.save()
	return JsonResponse(list.serialize(), safe=False)
			

def rock_capacity_one(request, id):
	rock = capacity_rock.objects.get(id=id)
	return JsonResponse(rock.serialize(), safe=False)
	
	
def rock_capacity_all(request):
	item = capacity_rock.objects.all()
	return JsonResponse([capacity_rock.serialize() for capacity_rock in item], safe=False)


