import { API_URL } from '@env';
import axios from 'axios';

// Liste de tous les clients
export async function getAllCustomers() {
    const url = `${API_URL}/customer/s`;
    return await axios.get(url);
}

// Récuperer un client
export async function getOneCustomer(id) {
    const url = `${API_URL}/customer/s/${id}`;
    // const url = `${API_URL}/customer/s/2`;
    return await axios.get(url);
}

// Récupérer les types de clients (acheteur, vendeur....)
export async function getCustomersTypes() {
    const url = `${API_URL}/customer_type`;
    return await axios.get(url);
}

// Récuperer les biens recherchés par le client
export async function getCustomerSearch(id) {
    // const url = `${API_URL}/customer_search/${id}`;
    const url = `${API_URL}/customer_search/s/${id}`;
    return await axios.get(url);
}

export async function getCustomerDescribe(id) {
    // const url = `${API_URL}/customer_search/${id}`;
    const url = `${API_URL}/describe_customer_type/joinCustomer/${id}`;
    return await axios.get(url);
}