import { Directive } from "@angular/core";
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from "@angular/forms";
import { createPassWordStrengthValidator } from "../validator/password-stength.validator";

@Directive({
    selector: "[passwordStrength]",
    providers: [{
        provide: NG_VALIDATORS, 
        useExisting: PasswordStrengthDirective,
        multi: true
    }]
})
export class PasswordStrengthDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        return createPassWordStrengthValidator()(control);
    }
}