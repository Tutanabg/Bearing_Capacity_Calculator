from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("inputs", views.inputs, name="inputs"),
    path("inputs_rock", views.inputs_rock, name="inputs_rock"),
    path("soil_capacity", views.soil_capacity, name="soil_capacity"),
    path("rock_capacity", views.rock_capacity, name="rock_capacity"),
        # API Routes
    path("all_capacity", views.all_capacity, name="all_capacity"),
    path("all_capacity_one/<int:id>", views.all_capacity_one, name="all_capacity_one"),
    path("rock_capacity_one/<int:id>", views.rock_capacity_one, name="rock_capacity_one"),
    path("rock_capacity_all", views.rock_capacity_all, name="rock_capacity_all"),
]
