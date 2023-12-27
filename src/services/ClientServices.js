import axios from "axios";

const api = "http://localhost:5148/api/";



export const getClients = async () => {
    return await axios({
        method:"get",
        url:api + "clients",
        headers: {"Content-Type":"application/json"},

    }).then(function(response){
        console.log(response)
        return response;
    });
};


export const getProjects = async () => {
    return await axios({
        method:"get",
        url:api + "projects",
        headers: {"Content-Type":"application/json"},

    }).then(function(response){
        console.log(response)
        return response;
    });
};


export const getCompanies = async () => {
    return await axios({
        method:"get",
        url:api + "companies",
        headers: {"Content-Type":"application/json"},

    }).then(function(response){
        console.log(response)
        return response;
    });
};