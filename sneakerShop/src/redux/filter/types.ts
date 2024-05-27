import Categories from "../../components/Main/Categories";

export interface FilterSliceState {
    name: string;
    sizes: number[];
    brands: number[];
    idcompanys:number[]
    colors: string[];
    brandId:number;
    price:number;
  }

export type Sort = {
    name: number;
}
export type Categories = {
  idbrand: number,
  name:string,
}

  