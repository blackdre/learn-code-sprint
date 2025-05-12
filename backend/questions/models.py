from django.db import models
from courses.models import Course  # Assuming the Course model is in courses/models.py

class Question(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='questions')  # assumes a Course model exists
    title = models.CharField(max_length=255)
    description = models.TextField()
    initial_code = models.TextField()    
    solution = models.TextField()

    def __str__(self):
        return self.title
