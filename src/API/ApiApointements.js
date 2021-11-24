import { API_URL } from '@env';
import axios from 'axios';

// Récuperer tous les rdvs de l'agent
export async function getAllStaffAptmt(id) {
    const url = `${API_URL}/schedule/staff/${id}`;
    return await axios.get(url);
}

// Récuperer les rdvs d'un client
export async function getAllCustomerAptmt(id) {
    const url = `${API_URL}/schedule/customer/${id}`;
    return await axios.get(url);
}

// Ajouter un rdv
export async function createAptmt(values) {
    const url = `${API_URL}/schedule/createAppt`;
    return await axios.post(url, values);
}

// Editer un rdv
export async function updateAptmt(id, values) {
    const url = `${API_URL}/schedule/update/${id}`;
    return await axios.put(url, values);
}

// Supprimer un rdv
export async function deleteAptmt(id) {
    const url = `${API_URL}/schedule/delete/${id}`;
    return await axios.post(url);
}

// Récuperer tout les rdv du jour pour l'agent
export async function getTodayStaffAptmts(id) {
    const url = `${API_URL}/schedule/today_staff/${id}`;
    return await axios.get(url);
}

// Récuperer tout les rdv du jour pour le client
export async function getTodayCustomerAptmts(id) {
    const url = `${API_URL}/schedule/today_customer/${id}`;
    return await axios.get(url);
}