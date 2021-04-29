from django.contrib import admin
from .models import *
#from ..accounts import *
#from django.contrib.auth.models import User, AbstractBaseUser, PermissionsMixin, BaseUserManager
# Register your models here.
admin.site.register(User)
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)