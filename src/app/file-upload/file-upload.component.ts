import {Component, Input} from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {noop, of} from 'rxjs';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input()
  requiredFileType:string;

  fileUploadError = false;

  fileName: string = '';

  uploadProgress: number;

  fileUploadSuccess = false;

  onChange = (fileName: string) => {}; 

  onTouch = () => {};

  onValidatorChange = () => {}

  onClick( fileUpload: HTMLInputElement ){
    this.onTouch();
    fileUpload.click();
  }

  disabled: boolean = false;

  constructor(private http: HttpClient){

  }

  onFileSelected(event){
    const file:File = event.target.files[0];

    this.fileName = file.name;
    console.log(this.fileName);
    const formData = new FormData();

    formData.append("thumbnail", file);

    this.http.post("/api/thumbnail-upload", formData,{
      reportProgress: true,
      observe: 'events'
    })
    .pipe(
      catchError(error => {
        this.fileUploadError = true;
        return of(error);
      }),
      finalize(() =>{
        this.uploadProgress = null;
      })
    )
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        this.uploadProgress = Math.round(100*(event.loaded / event.total))
      }else if ( event.type === HttpEventType.Response){
        this.onChange(this.fileName)
        this.fileUploadSuccess = true;
        this.onValidatorChange();
      }
    });
  }

  writeValue(value: any){
    this.fileName = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange
  }

  registerOnTouched(onTouch: any): void {
    this.onTouch = onTouch;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnValidtorChange(onValidatorChange: () => void): void{
    this.onValidatorChange = this.onValidatorChange;
  }

  validate(control: AbstractControl): ValidationErrors | null{
    if ( this.fileUploadSuccess ){
      return null;
    }

    let errors: any = {
      requiredFileType: this.requiredFileType
    }

    if ( this.fileUploadError ){
      errors.uploadFaild = false;
    }

    return errors;

  }

}
