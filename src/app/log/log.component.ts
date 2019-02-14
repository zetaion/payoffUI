import {Component, Input, OnInit} from '@angular/core';
import {
    AccountEntity, NextPaymentAmountOrBalloonAmountOrNetPayoffAmountOrPerDiemOrGrossPayoffAmount,
    PayoffQuoteResponse, Quote, Vehicle
} from "../model/PayoffQuoteResponse";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PayoffService} from "../services/payoffService/payoff.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DomSanitizer} from "@angular/platform-browser";
import {saveAs as importedSaveAs} from "file-saver";

declare var $:any;

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

    @Input() payoffQuoteResponse: PayoffQuoteResponse;

    logData: FormGroup;
    account: AccountEntity;
    deliveryType: string = '';
    submitted = false;
    fileUrl;

    constructor(private payOffService: PayoffService, private spinner: NgxSpinnerService,
                private formBuilder: FormBuilder, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.submitted = false;

        if (!this.payoffQuoteResponse || !this.payoffQuoteResponse.account) {
            this.account = {} as AccountEntity;
            this.account.vehicle = {} as Vehicle;
            this.account.quote = {} as Quote;
            this.account.quote.netPayoffAmount = {} as NextPaymentAmountOrBalloonAmountOrNetPayoffAmountOrPerDiemOrGrossPayoffAmount;
            this.account.quote.perDiem = {} as NextPaymentAmountOrBalloonAmountOrNetPayoffAmountOrPerDiemOrGrossPayoffAmount;

        } else {
            this.account = this.payoffQuoteResponse.account[0];
        }

        this.logData = this.formBuilder.group ({
            claimNumber: new FormControl('', Validators.required),
            policyNumber: new FormControl('', Validators.required),
            insurer: new FormControl('', Validators.required),
            lienHolder: new FormControl('', Validators.required),
            customer: new FormControl('', Validators.required),
            accountNumber: new FormControl('', Validators.required),
            lossDate: new FormControl('', Validators.required),
            mileage: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
            lossType: new FormControl('', Validators.required),
            deductible: new FormControl('', Validators.required),
            vehicleMake: new FormControl('', Validators.required),
            vehicleModel: new FormControl('', Validators.required),
            vehicleYear: new FormControl('', Validators.required),
            vehicleVin: new FormControl('', Validators.required),
            actualValue: new FormControl('', Validators.required),
            deliveryMode: new FormControl('', Validators.required),
            faxNumber: new FormControl(),
            emailAddress: new FormControl(),
            payoffValue: new FormControl('', Validators.required),
            perDiem: new FormControl('', Validators.required),
            goodThruDate: new FormControl('', Validators.required),
        });
    }

    deliveryTypeChangeEvent(deliveryType: string) {this.deliveryType = deliveryType;}

    get f() {return this.logData.controls;}

    sendLOG() {
        this.submitted = true;

        if (this.logData.invalid) {
            return;
        }

        this.spinner.show();

        this.payOffService.generateLog(this.logData.get('vehicleMake').value,
            this.logData.get('vehicleModel').value, this.logData.get('vehicleVin').value,
            this.logData.get('vehicleYear').value, this.logData.get('insurer').value,
            this.logData.get('lienHolder').value, this.logData.get('customer').value,
            this.logData.get('accountNumber').value, this.logData.get('lossDate').value,
            this.logData.get('goodThruDate').value, this.logData.get('mileage').value,
            this.logData.get('location').value, this.logData.get('lossType').value,
            this.logData.get('deductible').value, this.logData.get('deliveryMode').value,
            this.logData.get('emailAddress').value, this.logData.get('payoffValue').value,
            this.logData.get('actualValue').value, this.logData.get('perDiem').value,
            this.logData.get('policyNumber').value, this.logData.get('claimNumber').value)
            .subscribe(
                data => {

                    if (this.logData.get('deliveryMode').value === 'email') {
                        this.showNotification('top','center', 'success',
                            "Letter of Guarantee has been emailed to " + this.logData.get('emailAddress').value);
                    } else if (this.logData.get('deliveryMode').value === 'download') {
                        importedSaveAs(data, this.logData.get('customer').value+"_" +
                            this.logData.get('accountNumber').value + "_log.pdf");
                    } else {
                        this.displayError("Error retrieving Payoff Quote. Please try again." +
                            " If problem continues please contact technical support at +1 614 888 2227");
                    }
                    this.spinner.hide();
                },
                error => {
                    this.displayError("Error retrieving Payoff Quote. Please try again." +
                        " If problem continues please contact technical support at +1 614 888 2227");
                });
    }

    private displayError(message) {
        this.submitted = false;
        this.account = null;
        this.spinner.hide();
        this.showNotification('top', 'center', 'danger', message);
    }

    showNotification(from, align, type, message){

        $.notify({
            icon: "pe-7s-gift",
            message: message
        },{
            type: type,
            timer: 10000,
            placement: {
                from: from,
                align: align
            }
        });
    }


}
