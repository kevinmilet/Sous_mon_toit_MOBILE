import { instanceAxios } from "./Interceptor"

// Liste de tous les clients
export const getAllCustomers = () =>{
    return instanceAxios.get(`/customer/s`)
    .then(response => response)
}

// Récuperer un client
export const getOneCustomer = (id) =>{
    return instanceAxios.get(`/customer/s/${id}`)
    .then(response => response)
}
export const getAllCustomer = (id) =>{
    return instanceAxios.get(`/customer/s/`)
    .then(response => response)
}

// Récupérer les types de clients (acheteur, vendeur....)
export const getCustomersTypes = () =>{
    return instanceAxios.get(`/customer_type`)
    .then(response => response)
}

// Récuperer les biens recherchés par le client
export const getCustomerSearch = (id) =>{
    return instanceAxios.get(`/customer_search/s/${id}`)
    .then(response => response)
}

export const getCustomerDescribe = (id) =>{
    return instanceAxios.get(`/describe_customer_type/joinCustomer/${id}`)
    .then(response => response)
}

// Chercher des clients
export const searchCustomers = (value) => {
    return instanceAxios.get(`/customer/s/search/${value}`)
        .then(response => response);
}