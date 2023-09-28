import axios from "axios";

const BASE_URL = "http://localhost:3000"

export class LivrosService{
    static getLivros(){
        return axios.get(BASE_URL+'/library/read');
    }

    static getLivro(id){
        return axios.get(`${BASE_URL}/library/read/${id}`);
    }

    static createLivro(body){
        return axios.post(`${BASE_URL}/library/create/`,body);
    }

    static updateLivro(id,body){
        return axios.put(`${BASE_URL}/library/update/${id}`,body);
    }

    static deleteLivro(id){
        return axios.delete(`${BASE_URL}/library/delete/${id}`);
    }
    
}