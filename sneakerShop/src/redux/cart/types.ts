export type CartItem = {
  idtovar: string;
  name: string;
  image: string;
  colors: string[];
  sizes: number[];
  price: number;
  count: number;
  };
  
  export interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
    count:number;
  }
    