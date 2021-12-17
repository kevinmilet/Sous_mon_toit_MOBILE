import { instanceAxios } from "./Interceptor"

// Methode de connexion
export const login = (values) => {
    return instanceAxios.post(`/login/staff`, values)
        .then(response => response.data)
}

// Récuperer l'user courant (connecté)
export const getCurrentUser = (id) => {
    return instanceAxios.get(`/staff/${id}`)
        .then(response => response)
}

// Déconnexion user
export const logout = () => {
    return instanceAxios.post('/logout')
        .then(response => response)
}