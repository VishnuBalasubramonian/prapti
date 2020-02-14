import { Injectable, ErrorHandler } from '@angular/core';
import { ErrorLoggService } from '../Services/ErrorLoggService';
import { HttpErrorResponse } from '@angular/common/http';

// Global error handler for logging errors
@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  constructor(private errorLogService: ErrorLoggService) {
    //Angular provides a hook for centralized exception handling.
    //constructor ErrorHandler(): ErrorHandler
    super();
  }
 
  
  handleError(error): void {
  this.errorLogService.logError(error);
  }

 
}
