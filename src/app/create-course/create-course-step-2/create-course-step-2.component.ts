import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { createPromotionRangeValidator } from '../../validator/date-range-validator';


@Component({
  selector: 'create-course-step-2',
  templateUrl: 'create-course-step-2.component.html',
  styleUrls: ['create-course-step-2.component.scss']
})
export class CreateCourseStep2Component implements OnInit {

  form = this.fb.group({
    courseType: ['Premium', [Validators.required]],
    price: [null, [
      Validators.required,
      Validators.min(1),
      Validators.max(9999),
      Validators.pattern("[0-9]+")

    ]],
    thumbnail: [null],
    promoteStartAt:[null],
    promoteEndAt:[null]
  }, {
    validators: [createPromotionRangeValidator()],
    // updateOn: "blur"
  })


  constructor(private fb: FormBuilder){
  }


  ngOnInit() {
    this.form.valueChanges.subscribe(val => {
      const priceControl = this.form.controls["price"];
      console.log(val.courseType);
      if(val.courseType == 'Free' && priceControl.enabled){
        priceControl.disable({emitEvent: false});
      }

      if(val.courseType == 'Premium' && priceControl.disabled){
        priceControl.enable({emitEvent: false});
      }

    })


  }


}
