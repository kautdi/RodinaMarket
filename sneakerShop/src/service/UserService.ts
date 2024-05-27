import $api, { USER_URL, ZAKAZ_URL } from "../http";


export default class UserService{

    static async login(email:string, password:string) {
        return $api.post(`${USER_URL}/login`, {email:email, password:password});
    }
    static async registration(email:string, password:string) {
        return $api.post(`${USER_URL}/registration`, {email:email, password:password});
    }
    static async refreshToken(idUser:number, token:string){
        return $api.post(`${USER_URL}/refresh`, {refreshToken:token, idUser:idUser});
    }
    static async getOneuser(iduser:number){
        return $api.post(`${USER_URL}/getOneUser`, {iduser:iduser});
    }
    static async updateUserInfo(iduser:number, firstname:string, lastname:string, email:string, password:string){
        return $api.post(`${USER_URL}/updateInfo`, {iduser:iduser, firstname:firstname, lastname:lastname, email:email, password:password});
    }
    static async updateDelivery(iduser:number, country:string, city:string, street:string, home:string){
        return $api.post(`${USER_URL}/updateDelivery`, {iduser:iduser, country:country, city:city, street:street, home:home});
    }
    static async zakazHistory(iduser:number){
        return $api.get(`${ZAKAZ_URL}/getTovarsByUserId?iduser=${iduser}`);
    }

}

