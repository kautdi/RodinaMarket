import $api, { COMPANY_URL, TOVARS_URL} from "../http";


export default class CompanyService{
    static async login(email:string, password:string) {
        return $api.post(`${COMPANY_URL}/login`, {email:email, password:password});
    }
    static async registration(email:string, password:string) {
        return $api.post(`${COMPANY_URL}/registration`, {email:email, password:password});
    }
    static async refreshToken(idcompany:number, token:string){
        return $api.post(`${COMPANY_URL}/refresh`, {refreshToken:token, idcompany:idcompany});
    }
    static async getOnecompany(idcompany:number){
        return $api.post(`${COMPANY_URL}/getOneCompany`, {idcompany:idcompany});
    }
    static async updateCompanyInfo(idcompany:number, name:string, description:string, email:string, password:string){
        return $api.post(`${COMPANY_URL}/update`, {idCompany:idcompany, name:name, description:description, email:email, password:password});
    }
    static async taxList(idcompany:number){
        return $api.get(`${COMPANY_URL}/taxs/?idcompany=${idcompany}`);
    }
    static async getCompanyTovars(idcompany:number){
        return $api.post(`${TOVARS_URL}/getCompanySneaker`, {idCompany:idcompany});
    }
    static async getAllCompanies(name:string){
        return $api.get(`${COMPANY_URL}/companies/?name=${name}`, );
    }

}
