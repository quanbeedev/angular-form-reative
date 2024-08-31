import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder, FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {noop, Subscription} from 'rxjs';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddressFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AddressFormComponent
    }
  ]
})
export class AddressFormComponent implements ControlValueAccessor,OnInit , OnDestroy {

    @Input()
    legend:string;

    form: FormGroup = this.fb.group({
        addressLine1: [null, [Validators.required]],
        addressLine2: [null, [Validators.required]],
        zipCode: [null, [Validators.required]],
        city: [null, [Validators.required]]
    });

    onChangeSub: Subscription;
    private onValidatorChange: () => void;


    constructor(private fb: FormBuilder) {

    }

    ngOnInit() {
      this.onChangeSub = this.form.valueChanges.subscribe(() => {
        if (this.onValidatorChange) {
          this.onValidatorChange();
        }
      });
    }
    
    registerOnChange(onChange: any) {
      this.onChangeSub = this.form.valueChanges.subscribe(onChange);
    }

    ngOnDestroy(): void {
      this.onChangeSub.unsubscribe();
    }

    onTouched = () => {}

    writeValue(value: any): void {
      if ( value ) {
        this.form.setValue(value);
      }
    }

    registerOnTouched(onTouched: any): void {
      this.onTouched = onTouched;
    }

    setDisabledState(disabled: boolean): void {
      if ( disabled ){
        this.form.disable();
      }else{
        this.form.enable();
      }
    }


  // Validator implementation
  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { invalidForm: { valid: false, message: 'Form is invalid' } };
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }
}



