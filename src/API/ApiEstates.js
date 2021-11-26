import { instanceAxios } from "./Interceptor"

// Récupérer tout les biens
export const getAllEstates = () =>{
    return instanceAxios.get(`/estates`)
    .then(response => response)
}

// Récupérer un bien
export const getOneEstate = (id) =>{
    return instanceAxios.get(`/estates/${id}`)
    .then(response => response)
}

// Récuperer les types biens pour la recherche
export const getEstatesTypes = () =>{
    return instanceAxios.get(`/estates_types`)
    .then(response => response)
}

// Recherche
export const search = (values) =>{
    return instanceAxios.post(`/search`)
    .then(response => response)
}

// Images d'un bien
export const getEstatePictures = (id) =>{
    return instanceAxios.get(`/estates_pictures/${id}`)
    .then(response => response)
}

// Cover d'un bien
export const getEstateCover = (id) =>{
    return instanceAxios.get(`/estates_pictures/cover/${id}`)
    .then(response => response)
}