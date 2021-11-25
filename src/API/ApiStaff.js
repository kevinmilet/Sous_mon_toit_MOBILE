import { API_URL } from '@env';
import axios from 'axios';

// Methode de connexion
export async function login(values) {
    const url = `${API_URL}/login/staff`;
    return await axios.post(url, values);
}

// Récuperer l'user courant (connecté)
export async function getCurrentUser(id) {
    const url = `${API_URL}/staff/${id}`;
    return await axios.get(url);
}