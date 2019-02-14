export interface CreditAppFieldResponse {
  partnerID: string;
  r1DLRID?: null;
  partnerDLRID?: null;
  transactionId: string;
  dealers: Dealers;
  financeSources: FinanceSources;
  ancillaryServices: AncillaryServices;
}
export interface Dealers {
  dealer?: (DealerEntity)[] | null;
}
export interface DealerEntity {
  r1DLRID: string;
  partnerDLRID?: null;
  associatedFinanceSources: AssociatedFinanceSources;
}
export interface AssociatedFinanceSources {
  fsid?: (string)[] | null;
}
export interface FinanceSources {
  financeSource?: (FinanceSourceEntity)[] | null;
}
export interface FinanceSourceEntity {
  name: string;
  address: string;
  address2?: null;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  countryCode: string;
  services: Services;
  fields?: (FieldsEntity)[] | null;
  fsid: string;
}
export interface Services {
  service?: (ServiceEntity)[] | null;
}
export interface ServiceEntity {
  serviceName: string;
  options?: OptionsOrServiceOptions | null;
}
export interface OptionsOrServiceOptions {
  option?: (OptionEntity)[] | null;
}
export interface OptionEntity {
  value: string;
  type: string;
}
export interface FieldsEntity {
  field?: (FieldEntity)[] | null;
  transactionType: string;
}
export interface FieldEntity {
  fieldName: string;
  fieldNumber: number;
  fieldOptions?: null;
  maxlength?: null;
  fsspecific?: null;
}
export interface AncillaryServices {
  service?: (ServiceEntity1)[] | null;
}
export interface ServiceEntity1 {
  serviceName: string;
  financeSources: FinanceSources1;
}
export interface FinanceSources1 {
  financeSource?: (FinanceSourceEntity1)[] | null;
}
export interface FinanceSourceEntity1 {
  name: string;
  serviceOptions: OptionsOrServiceOptions1;
  address?: null;
  address2?: null;
  city?: null;
  stateOrProvince?: null;
  postalCode?: null;
  countryCode?: null;
  fsid: string;
}
export interface OptionsOrServiceOptions1 {
  option?: (OptionEntity)[] | null;
}
