from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .view import send_the_homepage

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', send_the_homepage),
    path('api/', include('roam_app.urls'))
] 

if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)