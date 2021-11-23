// Methode de test pour récupérer l'avatar -- NE PAS GARDER EN L'ETAT!!!

import axios from "axios"

export async function getStaffPicture(id) {
    const url = 'http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/staff/' + id;

    return await axios.get(url)
        
}

export const AVATAR_BASE_URL = 'http://api-sousmontoit.am.manusien-ecolelamanu.fr/storage/app/public/pictures/avatars/';