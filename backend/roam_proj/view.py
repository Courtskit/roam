from django.http import HttpResponse


def send_the_homepage(request):
    homepage = open('../frontend/build/index.html').read()
    return HttpResponse(homepage)