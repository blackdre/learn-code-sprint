from django.contrib import admin
from .models import Course

admin.site.site_header = "Courses Admin"
admin.site.site_title = "Courses Admin Portal"
admin.site.index_title = "Welcome to Courses Admin Portal"

class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'created_at')
    search_fields = ('title',)
    list_filter = ('created_at',)
    ordering = ('-created_at',)
    list_per_page = 10
    date_hierarchy = 'created_at'

admin.site.register(Course)