import { API_URL } from '@env';
import axios from 'axios';

// Methode de connexion
export async function login(values) {
    const url = `${API_URL}/login/staff`;
    return await axios.post(url, values);
}

// Methode de test pour récupérer l'avatar -- NE PAS GARDER EN L'ETAT!!!
export async function getStaffPicture(id) {
    const url = `${API_URL}/staff/${id}`;
    return await axios.get(url);
}

// Récuperer l'user courant (connecté)
export async function getCurrentUser() {
    const url = `${API_URL}/api/s/me`;
    return await axios.post(url);
}