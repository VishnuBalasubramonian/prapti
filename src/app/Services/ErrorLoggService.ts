import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from '../Constants/AppConstants'
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database'
import { Observable} from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/operator/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';
//#region Handle Errors Service
@Injectable()
export class ErrorLoggService {
  online$: Observable<boolean>;


  constructor(public af: AngularFireDatabase) {
  //   merge(
  //  of(navigator.onLine),
  //  fromEvent(window, 'online').pipe(mapTo(true)),
  //  fromEvent(window, 'offline').pipe(mapTo(false))
    //)
  }

  //Log error method
  logError(error: any) {

    //Returns a date converted to a string using Universal Coordinated Time (UTC).
    const date = new Date().toUTCString();
 
    if (error instanceof HttpErrorResponse) {
      //The response body may contain clues as to what went wrong,
      console.error(date, AppConstants.httpError, error.message, 'Status code:',
        (<HttpErrorResponse>error).status);
      this.SaveLog(date.concat(AppConstants.httpError).concat(error.message).concat((<HttpErrorResponse>error).status.toString()));
    }
    else if (error instanceof TypeError) {
      console.error(date, AppConstants.typeError, error.message, error.stack);
      this.SaveLog(date.concat(AppConstants.typeError).concat(error.message).concat(error.stack));
    }
    else if (error instanceof Error) {
      console.error(date, AppConstants.generalError, error.message, error.stack);
      this.SaveLog(date.concat(AppConstants.generalError).concat(error.message).concat(error.stack));
    }
    else if (error instanceof ErrorEvent) {
      //A client-side or network error occurred. Handle it accordingly.
      console.error(date, AppConstants.generalError, error.message);
      this.SaveLog(date.concat(AppConstants.generalError).concat(error.message));
    }
    else {
      console.error(date, AppConstants.somethingHappened, error.message, error.stack);

      this.SaveLog(date.concat(AppConstants.somethingHappened).concat(error.message).concat(error.stack));
    }
  }

  SaveLog(errmsg) {
    
    var currentDateMonth = new Date().getMonth() + 1;
    var currentDateYear = new Date().getFullYear();
    const date = new Date().toUTCString();

    this.af.list('/ERRORLOG/' + currentDateYear).update(date, { value: errmsg }).then(() => {

    }).catch((ex)=>{ throw(ex)});
    
  }

  public networkStatus() {
  

    
      
    }
  
}
