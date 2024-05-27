import $api, { ZAKAZ_URL } from "../http";

export default class ManagerService {
    static async getAllZakaz(date: string, status: string, idCompany: string, idzakaz: string){
        if (idCompany === "0"){
            idCompany = "";
        }
        return $api.get(`${ZAKAZ_URL}/getAllZakaz/?status=${status}&idCompany=${idCompany}&dateRange=${date}&idzakaz=${idzakaz}`);
    }
}
