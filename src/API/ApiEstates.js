import { API_URL } from '@env';
import axios from 'axios';

// Récupérer tout les biens
export async function getAllEstates() {
    const url = `${API_URL}/estates`;
    return await axios.get(url);
}

// Récupérer un bien
export async function getOneEstate(id) {
    const url = `${API_URL}/estates/${id}`;
    return await axios.get(url);
}

// Récuperer les types biens pour la recherche
export async function getEstatesTypes() {
    const url = `${API_URL}/estates_types`;
    return await axios.get(url);
}

// Recherche
export async function search(values) {
    const url = `${API_URL}/search`;
    return await axios.post(url, values)
}

// Images d'un bien
export async function getEstatePictures(id) {
    const url = `${API_URL}/estates_pictures/${id}`
    return await axios.get(url);
}

// Cover d'un bien
export async function getEstateCover(id) {
    const url = `${API_URL}/estates_pictures/cover/${id}`;
    return await axios.get(url);
}