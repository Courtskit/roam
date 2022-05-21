from itertools import count
from urllib import request
from rest_framework.viewsets import ModelViewSet
from .serializers import *
from .models import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from .views_auth import *
import operator
from django.db.models import Q
from functools import reduce

from django.db import models
from django.db.models.expressions import RawSQL
from rest_framework.parsers import MultiPartParser, FormParser


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['create']:
            permission_classes = [AllowAny]
        else: 
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

def get_listings_nearby_coords(lat, long, distance):
    lat_field = 'location_lat'
    lng_field = 'location_lng'

    # Great circle distance formula
    gcd_formula = f"6371 * acos(least(greatest(\
    cos(radians(%s)) * cos(radians({lat_field})) \
    * cos(radians({lng_field}) - radians(%s)) + \
    sin(radians(%s)) * sin(radians({lat_field})) \
    , -1), 1))"

    distance_raw_sql = RawSQL(
        gcd_formula
        ,(lat, long, lat)
    )

    query_selector = Listing.objects.all() \
            .annotate(distance=distance_raw_sql) \
            .order_by('distance')

    query_selector = query_selector.filter(distance__lt=distance)
    return query_selector

class ListingViewSet(ModelViewSet):
    serializer_class = ListingSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        if self.request.query_params:
            query_params = self.request.query_params;
            filtr = query_params.get('filter')
            if filtr == 'search':
                return Listing.objects.filter(reduce(operator.or_, (Q(title__icontains=query_params.get(x)) for x in list(query_params))))
            elif filtr == 'popular':
                return Listing.objects.filter(rating__gte=4)[0:10]
            elif filtr == 'park':
                park = query_params.get('park')
                return Listing.objects.filter(near_park__icontains=park)
            elif filtr == 'distance':
                lng = query_params.get('point_lng')
                lat = query_params.get('point_lat')
                distance = query_params.get('distance')
                return get_listings_nearby_coords(lat,lng,distance)
            else: 
                return Listing.objects.all()
        else: 
            return Listing.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else: 
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        request.data._mutable = True
        request.data['owner'] = request.user.id
        request.data._mutable = False
        return super().create(request, *args, **kwargs)

class AmenityViewSet(ModelViewSet):
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else: 
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

class ReviewViewSet(ModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        if self.request.query_params and 'listing_id' in self.request.query_params:
            return Review.objects.filter(listing=self.request.query_params['listing_id'])
        else:
            return Review.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else: 
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

class ReservationViewSet(ModelViewSet):
    serializer_class = ReservationSerializer

    def get_queryset(self):
        return Reservation.objects.filter(traveler = self.request.user.id)

    def get_permissions(self):
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        if 'traveler' not in request.data:
            request.data['traveler'] = request.user.id
        return super().create(request, *args, **kwargs)

class AddressViewSet(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else: 
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


