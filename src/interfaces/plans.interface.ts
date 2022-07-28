export interface IPlan {
  _id: string;
  name: string;
  description: string;
  price: number;
  spaces: number;
  code:Code
}
export type Code =  {
  paystack:string,
  flutterwave:string,
}