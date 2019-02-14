export interface PayoffQuoteResponse {
  payoffQuoteReferenceID: string;
  requestDate: string;
  account?: (AccountEntity)[] | null;
  error?: null;
}
export interface AccountEntity {
  accountNumber: string;
  productType: string;
  payment: Payment;
  vehicle: Vehicle;
  customer?: null;
  quote: Quote;
  consumerPayoffInstruction: string;
  comments?: (string)[] | null;
}
export interface Payment {
  nextPaymentAmount: NextPaymentAmountOrBalloonAmountOrNetPayoffAmountOrPerDiemOrGrossPayoffAmount;
  nextPaymentDate?: null;
  paymentsRemaining: number;
  term: Term;
  balloonAmount: NextPaymentAmountOrBalloonAmountOrNetPayoffAmountOrPerDiemOrGrossPayoffAmount;
}
export interface NextPaymentAmountOrBalloonAmountOrNetPayoffAmountOrPerDiemOrGrossPayoffAmount {
  value: number;
  currency?: null;
}
export interface Term {
  value: number;
  length?: null;
}
export interface Vehicle {
  vin: string;
  year: string;
  make: string;
  model: string;
  residualValue?: null;
}
export interface Quote {
  netPayoffAmount: NextPaymentAmountOrBalloonAmountOrNetPayoffAmountOrPerDiemOrGrossPayoffAmount;
  goodThroughDate?: null;
  perDiem: NextPaymentAmountOrBalloonAmountOrNetPayoffAmountOrPerDiemOrGrossPayoffAmount;
  grossPayoffAmount: NextPaymentAmountOrBalloonAmountOrNetPayoffAmountOrPerDiemOrGrossPayoffAmount;
  securityDepositAmount?: null;
}
