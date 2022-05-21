from venv import create
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *
from statistics import mean

class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "password", "first_name", "last_name", "favorite_listings", "owned_listings"]
        extra_kwargs = {
            'password': {'write_only': True},
            'owned_listings': {'read_only': True},
        }

    # Additional functionality added: when creating users, hash the plaintext password before saving object
    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)
    
    # Additional functionality added: when updating users, hash the plaintext password before saving object
    def update(self, instance, validated_data):
        if "password" in validated_data:
            validated_data["password"] = make_password(validated_data["password"])
        return super().update(instance, validated_data)

class ListingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Listing
        fields = ["id", "title", "is_boondock", "owner", "price", "location_lng", "location_lat", "address", "amenities", "rating", "dates_booked", "description","image"]

    dates_booked = serializers.SerializerMethodField(read_only=True)
    image = Base64ImageField(
        max_length=None, use_url=True,
    )
    
    def get_dates_booked(self, instance):
        return instance.get_listing_dates_booked(instance)

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ["id", "name"]

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "traveler", "listing", "review_text", "review"]

    def create(self, validated_data):
        listing = validated_data['listing']
        listing_reviews = list(Review.objects.filter(listing=listing.id).values_list('review', flat=True))
        rate = validated_data['review']
        listing_reviews.append(rate)
        listing.rating = mean(listing_reviews)
        listing.save()
        return super().create(validated_data)

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ["id", "traveler", "listing", "date_start", "date_end", "total", "listing_name"]
    listing_name = serializers.SerializerMethodField(read_only=True)

    def get_listing_name(self, instance):
        return instance.get_listing_name(instance)

    def create(self, validated_data):
        # validates that the dates booked do not conflict with current bookings
        dates_booked = list(Reservation.objects.filter(listing=validated_data['listing'].id).values('date_start', 'date_end'))
        start = validated_data['date_start']
        end = validated_data['date_end']
        for dates in dates_booked:
            if start > dates['date_start'] and start < dates['date_end']:
                raise Exception('dates not available')
            elif end >= dates['date_start'] and end <= dates['date_end']:
                raise Exception('dates not available')
        return super().create(validated_data)

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["id", "line_1", "line_2", "city", "state", "zip", "country"]
