import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

declare var qz: any;


@Injectable()
export class QzTrayServicePrinter {

   printerList :any;

  constructor() {}

  errorHandler(error: any): Observable<any> {
    return Observable.throw(error);
  }
    
  // Get list of printers connected
  getPrinters(): Observable<string[]> {
    return Observable
      .fromPromise(qz.websocket.connect().then(() => qz.printers.find()))
      .map((printers: string[]) => printers)
      //.catch(this.errorHandler);

     
  }

  getPrintersList() {
    
      qz.websocket.connect().then(function() { this.printerList= qz.printers.find() }).catch(this.errorHandler);
      console.log("PrinterList"+ this.printerList);
  }
    
  // Get the SPECIFIC connected printer
  getPrinter(printerName: string): Observable<string> {
    return Observable
      .fromPromise(qz.websocket.connect().then(() => qz.printers.find(printerName)))
      .map((printer: string) => printer)
     // .catch(this.errorHandler);
  }

  getPrinter1(printerName: string) {
    qz.websocket.connect().then(() => qz.printers.find(printerName).then(()=>alert("Printer Found")))
      
  }
    
  // Print data to chosen printer
  printData(printer: string, data: any): Observable<any> {
    //Create a default config for the found printer
    const config = qz.configs.create(printer);
    return Observable.fromPromise(qz.print(config, data))
      .map((anything: any) => anything)
      //.catch(this.errorHandler);
  }
   
  // Disconnect QZ Tray from the browser
  removePrinter(): void {
    //  qz.websocket.disconnect();
  }
}