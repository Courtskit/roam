from django.urls import path, include
from rest_framework import routers
from .views import *

r = routers.DefaultRouter()
r.register('users', UserViewSet, basename='user')
r.register('listings', ListingViewSet, basename='listing')
r.register('amenities', AmenityViewSet, basename='amenity')
r.register('reviews', ReviewViewSet, basename='review')
r.register('reservations', ReservationViewSet, basename='reservation')
r.register('addresses', AddressViewSet, basename='address')

urlpatterns = [
    path("", include(r.urls)),
    path('logout/', handle_logout),
    path('login/', handle_login),
    path('whoami/', who_am_i),
]