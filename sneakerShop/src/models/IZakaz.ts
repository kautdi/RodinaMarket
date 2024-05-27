export interface IOrder {
    idzakaz: number;
    iduser: number;
    country: string;
    city: string;
    street: string;
    home: string;
    status: string;
    tovars: ITovar[];
    date:string;
  }
  
  export interface ITovar {
    idtovar: number;
    tovar_name: string;
    tovar_description: string;
    tovar_img: string;
    tovar_price: string;
    company_name: string;
    brand_name: string;
    color_name: string;
    size_value: number;
    date: string;
  }
  