import axios from 'axios';
import ApiRoutes from '../utils/const/ApiRoutes';

const API_URL = ApiRoutes.api_url;

// Methode de connexion
export async function login(values) {
    const url = API_URL + ApiRoutes.login;

    return await axios.post(url, values);
}

// Methode de test pour récupérer l'avatar -- NE PAS GARDER EN L'ETAT!!!
export async function getStaffPicture(id) {
    const url = `${API_URL + ApiRoutes.staff}/${id}`;

    return await axios.get(url);
        
}

export const AVATAR_BASE_URL = 'http://api-sousmontoit.am.manusien-ecolelamanu.fr/storage/app/public/pictures/avatars/';