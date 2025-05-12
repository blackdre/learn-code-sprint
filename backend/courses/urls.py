from django.urls import path
from .views import CourseListAPIView  # or course_list

urlpatterns = [
    path('', CourseListAPIView.as_view()),  # for class-based
]
