import axios from 'axios';
import ApiRoutes from '../utils/const/ApiRoutes';

const API_URL = ApiRoutes.api_url;

// Récuperer tous les rdvs de l'agent
export async function getAllStaffAptmt(id) {
    const url = `${API_URL + ApiRoutes.staff_aptmt}/${id}`;

    return await axios.get(url);
}

// Récuperer les rdvs d'un client
export async function getAllCustomerAptmt(id) {
    const url = `${API_URL + ApiRoutes.customer_aptmt}/${id}`;

    return await axios.get(url);
}

// Ajouter un rdv
export async function createAptmt(values) {
    const url = API_URL + ApiRoutes.create_aptmt;

    return await axios.post(url, values);
}

// Editer un rdv
export async function updateAptmt(id, values) {
    const url = `${API_URL + ApiRoutes.update_aptmt}/${id}`;

    return await axios.put(url, values);
}

// Supprimer un rdv
export async function deleteAptmt(id) {
    const url = `${API_URL + ApiRoutes.delete_aptmt}/${id}`;

    return await axios.post(url);
}