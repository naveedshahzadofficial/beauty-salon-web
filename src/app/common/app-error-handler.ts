import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler { 
  handleError(error: any) {
   /* if(error.status === 404){
        //this.form.setErrors(error.json());
        alert("This category has already been deleted.");
      }
      */
    alert('An unexpected error occurred.');
    console.log(error);
  }
}
