import { Component, OnInit } from '@angular/core';
import {PayoffService} from "../services/payoffService/payoff.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CreditAppFieldResponse} from "../model/CreditAppFieldResponse";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PayoffQuoteResponse} from "../model/PayoffQuoteResponse";

declare var $:any;

let genenrateTransactionId = function () {
    var date = new Date();
    var components = [
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ];

    var id = 'ABSI_' + components.join("");
    return id;
};

@Component({
    selector: 'app-payoffQuote',
    templateUrl: './payoff.component.html',
    styleUrls: ['./payoff.component.css']
})
export class PayoffComponent implements OnInit {

    creditAppFields: CreditAppFieldResponse;
    payoffDetails: PayoffQuoteResponse;
    transactionTypes: string[];
    identifier: string[];
    showChildren: boolean;
    submitted = false;

    payOffDetailForm: FormGroup;

    constructor(private payOffService: PayoffService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.submitted = false;
        this.creditAppFields = null;
        this.payoffDetails = null;
        this.transactionTypes = null;
        this.showChildren =false;
        this.identifier = null;
        this.payOffDetailForm = this.formBuilder.group ({
            policyNumber: new FormControl('', Validators.required),
            claimNumber: new FormControl('', Validators.required),
            inquiryKey: new FormControl('', Validators.required),
            inquiryType: new FormControl('', Validators.required),
            customerConsent: new FormControl('', Validators.required),
            financeSourceId: new FormControl('', Validators.required),
            productType: new FormControl('', Validators.required),
        });

        this.spinner.show();
        this.payOffService.getCreditApplicationField(genenrateTransactionId())
            .subscribe(
                data => {
                    this.creditAppFields = data;
                    this.spinner.hide();
                },
                error => {
                    this.showNotification('top','center', 'danger',
                        "Error retrieving finance source details. Please try again. " +
                        "If problem continues please contact technical support at +1 614 888 2227");
                    this.spinner.hide();
                });
    }

    get f() {return this.payOffDetailForm.controls;}

    populateDropDownFields(fsid: string) {

        this.transactionTypes = [];
        this.identifier = [];

        this.creditAppFields.financeSources.financeSource.forEach( source => {

            if (source.fsid === fsid) {
                this.transactionTypes = [];
                this.identifier = [];

                source.services.service.forEach(service => {

                    if (service.options !== null || service.options != null) {
                        service.options.option.forEach(option => {
                            if (option.type === 'InquiryType') {
                                this.identifier.push(option.value);
                            }
                        });
                    }
                });

                source.fields.forEach(field => {
                    if (field.transactionType) {
                        this.transactionTypes.push(field.transactionType);
                    }
                })
            }
        });
    }

    retrievePayoffQuote() {

        this.submitted = true;

        if (this.payOffDetailForm.invalid) {
            return;
        }

        this.spinner.show();
        this.payOffService.getPayoffQuote(genenrateTransactionId(), this.payOffDetailForm.get('inquiryKey').value,
            this.payOffDetailForm.get('financeSourceId').value,
            this.payOffDetailForm.get('customerConsent').value, this.payOffDetailForm.get('productType').value,
            this.payOffDetailForm.get('inquiryType').value,
            this.payOffDetailForm.get('policyNumber').value,
            this.payOffDetailForm.get('claimNumber').value)
            .subscribe(
                data => {
                    if (data.error){
                        this.displayError(data.error);
                    } else {
                        this.payoffDetails = data;
                        this.spinner.hide();
                    }
                },
                error => {
                    this.displayError("Error retrieving Payoff Quote. Please try again. If problem continues please contact technical support at +1 614 888 2227");
                });

    }

    private displayError(message) {
        this.payoffDetails = null;
        this.showNotification('top', 'center', 'danger', message);
        this.spinner.hide()
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

    displayLOG(){
        this.showChildren = true;
    }
}
