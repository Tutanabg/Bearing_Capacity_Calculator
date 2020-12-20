from django.db import models
from django.core.serializers import serialize

class capacity(models.Model): 
	
	Cohesion = models.IntegerField(default=0)
	Shear_Strength = models.IntegerField(default=0)
	Length = models.IntegerField(default=0)
	Depth = models.IntegerField(default=0)
	Width = models.IntegerField(default=0)
	Inclination = models.IntegerField(default=0)
	Water_Unit_Weight = models.DecimalField(max_digits = 5, decimal_places = 2)
	Ground_Water_Depth = models.IntegerField(default=0)
	Dry_Soil_Unit_Weight = models.IntegerField(default=0)
	Saturated_Soil_Unit_Weight = models.IntegerField(default=0)
	Unit_Weight_Below_Foundation = models.IntegerField(default=0)
	Factor_of_Safety = models.IntegerField(default=3)
	def serialize(self):
		return {
		"id": self.id,
		"Cohesion": self.Cohesion,
		"Shear_Strength": self.Shear_Strength,
		"Length": self.Length,
		"Depth": self.Depth,
		"Width": self.Width,
		"Inclination": self.Inclination,
		"Water_Unit_Weight": self.Water_Unit_Weight,
		"Ground_Water_Depth": self.Ground_Water_Depth,
		"Dry_Soil_Unit_Weight": self.Dry_Soil_Unit_Weight,
		"Saturated_Soil_Unit_Weight": self.Saturated_Soil_Unit_Weight,
		"Unit_Weight_Below_Foundation": self.Unit_Weight_Below_Foundation,
		"Factor_of_Safety": self.Factor_of_Safety,
		}
        
        
        
class capacity_rock(models.Model): 
	UCS = models.IntegerField(default=0)
	Shear_Strength = models.IntegerField(default=0)
	Factor_of_Safety = models.IntegerField(default=5)
	def serialize(self):
		return {
		"id": self.id,
		"UCS": self.UCS,
		"Shear_Strength": self.Shear_Strength,
		"Factor_of_Safety": self.Factor_of_Safety,
 }  
    

