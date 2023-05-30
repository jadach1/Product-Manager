import {Component,Inject,inject, OnDestroy} from '@angular/core'
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
    selector: 'messageCenter',
    templateUrl: 'message-pop-up-tab.html',
    styleUrls: ['message-pop-up-tab.css']
})

export class messageCenterComponent implements OnDestroy {
    message: string = ""
    snackBarRef = inject(MatSnackBarRef);

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
        this.changeMessage()
    }
    ngOnDestroy(): void {
        console.log('destroying messagin component')
    }

    changeMessage() {
        switch(this.data[0]){
            case "Return":
                this.message = "Return from " + this.data[2] + " Successful!"
                break;
            case "Pick":
                this.message = "Pick from " + this.data[1] + " To " + this.data[2] + " Successful!"
                break;
            case "Delivery":
                this.message = "Delivery to " + this.data[1] + " Successful!"
                break;
            case "new-product":
                this.message = "Successfully Added new Product !!!"
                break;
            case "not-found-warehouse":
                this.message = "This Product was not found in the Warehouse"
                break;
            case "not-found-project":
              this.message = "This Product was not found in the project " + this.data[1]
              break;
            case "no-products":
              this.message = "This location has no proudcts for this manufacturer";
              break;
            default:
              this.message = this.data[1]
              break;
        }
    }
}
