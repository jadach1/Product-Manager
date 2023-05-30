import { Injectable, inject, Inject } from '@angular/core';
import { messageCenterComponent } from '../Forms/Messages/message-pop-up-tab.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private __snackbar: MatSnackBar) { }

  sendMessage(myData: string[]) {
    this.__snackbar.openFromComponent(messageCenterComponent, {
      data: myData,
    })
  }

}
