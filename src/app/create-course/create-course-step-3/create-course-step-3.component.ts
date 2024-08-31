import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'create-course-step-3',
  templateUrl: 'create-course-step-3.component.html',
  styleUrls: ['create-course-step-3.component.scss']
})
export class CreateCourseStep3Component {

  form = this.fb.group({
    lessons: this.fb.array([])
  });


  constructor( private fb: FormBuilder ){

  }

  addLesson(){
    const lessonsForm = this.fb.group({
      title: ['', Validators.required],
      level: ['beginner', Validators.required]
    })

    this.lessons.push(lessonsForm);
  }

  get lessons(){
    return this.form.controls["lessons"] as FormArray
  }

  deleteLesson( lessionIndex: number){
    this.lessons.removeAt(lessionIndex)
  }

}
