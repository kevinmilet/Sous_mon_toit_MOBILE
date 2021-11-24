import axios from 'axios';
import ApiRoutes from '../utils/const/ApiRoutes';

const API_URL = ApiRoutes.api_url;

// Liste de tous les clients
export async function getAllCustomers() {
    const url = API_URL + ApiRoutes.customer;
    return await axios.get(url);
}

// Récuperer un client
export async function getOneCustomer(id) {
    const url = `${API_URL + ApiRoutes.customer}/${id}`;
    return await axios.get(url);
}

// Récupérer les types de clients (acheteur, vendeur....)
export async function getCustomersTypes() {
    const url = API_URL + ApiRoutes.customers_types;
    return await axios.get(url);
}