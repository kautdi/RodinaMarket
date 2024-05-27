import axios from 'axios';


export const  VITE_API_URL = `http://127.0.0.1:5050/api/`
export const TOVARS_URL = `/tovars`
export const USER_URL = `/user`
export const COMPANY_URL = `/company`
export const ZAKAZ_URL = `/zakaz`

const $api = axios.create({
    withCredentials: true,
    baseURL: VITE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

export default $api;
