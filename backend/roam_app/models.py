from distutils.command.upload import upload
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models import Avg
from datetime import timedelta

class User(AbstractUser):
    #username needs to be here for django admin page functionality
    username = models.CharField(default='username', max_length=50, null=True, blank=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(verbose_name='email address',max_length=255,unique=True)
    favorite_listings = models.ManyToManyField('Listing', related_name="favorite_users", blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'username'] 

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

LNG_VALIDATOR_MSG = "Longitiude must be between -180 and 180"
LAT_VALIDATOR_MSG = "Latitude must be between -90 and 90"

class Listing(models.Model):
    title = models.CharField(max_length=255)
    is_boondock = models.BooleanField(default=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_listings', null=True, blank=True)
    price = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    location_lng = models.DecimalField(null=True, max_digits=20, decimal_places=17,validators=[MinValueValidator(-180, message=LNG_VALIDATOR_MSG), MaxValueValidator(180, message=LNG_VALIDATOR_MSG)])
    location_lat = models.DecimalField(null=True, max_digits=20, decimal_places=17,validators=[MinValueValidator(-90, message=LAT_VALIDATOR_MSG), MaxValueValidator(90, message=LAT_VALIDATOR_MSG)])
    address = models.ForeignKey("Address", on_delete=models.CASCADE, related_name='listings', null=True, blank=True)
    amenities = models.ManyToManyField("Amenity", related_name='listings', blank=True)
    description = models.TextField()
    rating = models.DecimalField(default=None, null=True, blank=True, max_digits=2, decimal_places=1)
    near_park = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to='listing_images', blank=True, null=True)

    def __str__(self):
        return f"{self.owner.first_name}'s {self.title}"

    def get_listing_dates_booked(self, instance):
        all_dates = []
        date_pairs = list(Reservation.objects.filter(listing=instance.id).values('date_start', 'date_end'))
        for pair in date_pairs:
            start = pair['date_start']
            while start <= pair['date_end']:
                all_dates.append(start)
                start = start + timedelta(days = 1)
        all_dates.sort()
        return all_dates
    
class Amenity(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}"

class Review(models.Model):
    VERYBAD = 1
    BAD = 2  
    OKAY = 3
    GOOD = 4
    EXCELLENT = 5
    RATING = (
        (VERYBAD, 'Very bad'),
        (BAD, 'Bad'),
        (OKAY, 'Okay'),
        (GOOD, 'Good'),
        (EXCELLENT, 'Excellent'),
    )
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='reviews')
    traveler = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews') #would like to set this ondelete to Null or some other value
    review_text = models.TextField()
    review = models.IntegerField(choices=RATING,default=OKAY)

    def __str__(self):
        return f"{self.id} {self.traveler.first_name} {self.listing.title} review"

#TODO:  date valation on reservations (cant be in past, end date after start date)
class Reservation(models.Model):
    traveler = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reservations')
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='reservations')
    date_start = models.DateField(auto_now=False, auto_now_add=False)
    date_end = models.DateField(auto_now=False, auto_now_add=False)
    total = models.DecimalField(max_digits=7, decimal_places=2)
    num_persons = models.IntegerField(default=1, validators=[MinValueValidator(1)])

    def __str__(self):
        return f"{self.id} {self.traveler.first_name} {self.listing.title} reservation"

    def get_listing_name(self, instance):
        return instance.listing.title

class Address(models.Model):
    line_1 = models.CharField(max_length=255)
    line_2=  models.CharField(max_length=255, blank=True, null=True)
    city =  models.CharField(max_length=255)
    state =  models.CharField(max_length=2)
    zip = models.CharField(max_length=5)
    country = models.CharField(max_length=255)

    def __str__(self):
        return f"Address {self.line_1}"







