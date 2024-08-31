import {  AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { CoursesService } from "../services/courses.service";
import { map } from "rxjs/operators";

//help call to backend to search title name.
export function courseTitleValidator(courses: CoursesService): AsyncValidatorFn {
    return (control: AbstractControl) => {  
        return courses.findAllCourses()
        .pipe(
            map( courses => {
                const course = courses.find(course => course.description.toLowerCase() == control.value.toLowerCase());
                const value = course  ? { titleExist: true} : null;
                console.log(value);
                return course  ? { titleExist: true} : null;
            })
        )
    }
}