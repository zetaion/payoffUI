import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from "rxjs/index";
import {CreditAppFieldResponse} from "../../model/CreditAppFieldResponse";
import {PayoffQuoteResponse} from "../../model/PayoffQuoteResponse";

@Injectable()
export class PayoffService {

  constructor(private http: HttpClient) {}

    getCreditApplicationField(transactionId: string): Observable<CreditAppFieldResponse> {
        const params = new HttpParams().set('txId', transactionId);
        let requestUrl = 'http://localhost:8080/creditApplication/retrieveFields';
        return this.http.get<CreditAppFieldResponse>(requestUrl, {params});
    }

  getPayoffQuote(clientTxId: string, inquiryKey:number, financeSourceID:string,
                 customerConsent:boolean, productType:string, inquiryType:string,
                 policyNumber:string, claimNumber:string ): Observable<PayoffQuoteResponse> {

      const params = new HttpParams()
          .set('clientTxId', clientTxId)
          .set('inquiryKey', inquiryKey.toString())
          .set('financeSourceID', financeSourceID.toString())
          .set('customerConsent', customerConsent.toString())
          .set('productType', productType)
          .set('inquiryType', inquiryType)
          .set('policyNumber', policyNumber)
          .set('claimNumber', claimNumber);

        let requestUrl = 'http://localhost:8080/payoffquote/retrieveQuote';
        return this.http.get<PayoffQuoteResponse>(requestUrl, {params});
    }

    generateLog(make: string, model:string, vin:string, year:number, insurer:string, lienHolder:string, customer:string,
                accountNumber:string, lossDate:string, goodThruDate:string, mileage:string, location:string, lossType:string,
                   deductible:number, deliveryType:string, email:string, payoffValue:number, actualValue:number,
                perDiem:string, policyNumber:string, claimNumber:string ): Observable<Blob> {

        const params = {
            "insurer": insurer,
            "lienHolder": lienHolder,
            "customer": customer,
            "accountNumber": accountNumber,
            "lossDate": lossDate,
            "goodThroughDate": goodThruDate,
            "mileage": mileage,
            "location": location,
            "lossType": lossType,
            "deductible": deductible,
            "deliveryType": deliveryType,
            "email": email,
            "payoffValue": payoffValue,
            "actualValue": actualValue,
            "perDiem": perDiem,
            "policyNumber": policyNumber,
            "claimNumber": claimNumber,
            "vehicle": {
                "make":  make,
                "model": model,
                "vin": vin,
                "year": year,
            }
    };

        let requestUrl = 'http://localhost:8080/log/'.concat(deliveryType);
        return this.http.post(requestUrl, params, {responseType: "blob"});
    }
}
