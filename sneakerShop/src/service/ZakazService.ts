import $api, { ZAKAZ_URL } from "../http";


export default class ZakazService{

    static async createZakaz(zakaz:object){
        return $api.post(`${ZAKAZ_URL}/createZakaz`,zakaz)
    }
    static async getAllZakaz(id:number){
        return $api.get(`${ZAKAZ_URL}/getAllZakaz/?idCompany=${id}`)
    }
    static async deleteZakaz(id:number){
        return $api.post(`${ZAKAZ_URL}/delete`,{idzakaz:id})
    }
    static async changeStatus(id:number, status:string){
        return $api.post(`${ZAKAZ_URL}/changeStatus`,{idzakaz:id, status:status})
    }

}


