import $api, { TOVARS_URL } from "../http";


export default class TovarsService{

    static async getSneakers(sizes: number[], brands: number[], idcompanys: number[], colors: object, name: string, price:number) {
        let brandsStr = brands.join(',');

        const sizesStr = sizes.join(',');
        let CompanysStr = idcompanys.join(',');
        if (idcompanys[0] === -1){
            CompanysStr = [];
        }
        if (brands[0] === 0 || Number.isNaN(brands[0])){
            brandsStr = ''
        }
        
        return $api.get(`${TOVARS_URL}/sneakers?name=${name}&sizes=${sizesStr}&brands=${brandsStr}&idcompanys=${CompanysStr}&colors=${colors}&price=${price}`);
    }
    static async getOneSneaker(idTovar:number){
        return $api.post(`${TOVARS_URL}/sneakerOne`, {idTovar:idTovar})
    }
    static async getCompanySneakers(idCompany:number){
        return $api.post(`${TOVARS_URL}/getCompanySneaker`, [idCompany])
    }
    static async getSizes( ){
        return $api.get(`${TOVARS_URL}/sizes`)
    }
    static async getBrands( ){
        return $api.get(`${TOVARS_URL}/brands`)
    }
    static async getColors( ){
        return $api.get(`${TOVARS_URL}/sizes`)
    }
    static async createTovars(tovar:object){
        return $api.post(`${TOVARS_URL}/createSneaker`,tovar)
    }
    static async updateTovars(tovar:object){
        return $api.post(`${TOVARS_URL}/updateSneaker`,tovar)
    }
    static async deleteTovars(idTovar:number){
        return $api.post(`${TOVARS_URL}/deleteSneaker`,{idTovar:idTovar})
    }
}

