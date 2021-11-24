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

// Récuperer tout les rdv du jour pour l'agent
export async function getTodayStaffAptmts(id) {
    const url = `${API_URL + ApiRoutes.today_s_aptmts}/${id}`;

    return await axios.get(url);
}

// Récuperer tout les rdv du jour pour le client
export async function getTodayCustomerAptmts(id) {
    const url = `${API_URL + ApiRoutes.today_c_aptmts}/${id}`;

    return await axios.get(url);
}