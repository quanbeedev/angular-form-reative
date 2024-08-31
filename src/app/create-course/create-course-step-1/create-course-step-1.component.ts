import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NonNullableFormBuilder, Validators} from '@angular/forms';
import {CoursesService} from '../../services/courses.service';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import { courseTitleValidator } from '../../validator/course-title.validator';
import { Course } from '../../model/course';

interface CourseCategory{
  code: string,
  description: string,
}

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss']
})
export class CreateCourseStep1Component implements OnInit {


  form = this.fb.group({
    title: ['',
      {
        validators:[Validators.required, Validators.minLength(5), Validators.maxLength(60)],
        asyncValidators: [courseTitleValidator(this.courses)],
        updateOn: 'blur'
      }
    ],
    releaseDateAt: [new Date(), 
      {
        validators: [Validators.required]
      }
    ],
    downloadAllow: [false, 
      {
        validators: [Validators.requiredTrue]
      }
    ],
    category:['BEGINNER', [Validators.required]],
    description: [
      '',
      [Validators.required, Validators.minLength(3)]
    ],
    address:[null, Validators.required]
  })

  CourseCategorys$: Observable<CourseCategory[]>;

  constructor(private fb: NonNullableFormBuilder, private courses: CoursesService){

  }

  ngOnInit() {
    this.CourseCategorys$ = this.courses.findCourseCategories();

    const draf = localStorage.getItem("STEP_1");

    if ( draf ) {
      this.form.setValue(JSON.parse(draf))
    }


    this.form.valueChanges
    .pipe(
      filter(() => this.form.valid)
    )
    .subscribe(val => 
       localStorage.setItem("STEP_1", JSON.stringify(val))
    )
  }

  get courseTitle() {
    return this.form.controls['title'];
  }

}
