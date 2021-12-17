import { instanceAxios } from "./Interceptor"

// Récuperer tous les rdvs de l'agent
export const getAllStaffAptmt = (id) =>{
    return instanceAxios.get(`/schedule/staff/${id}`)
    .then(response => response)
}

// Récuperer les rdvs d'un client
export const getAllCustomerAptmt = (id) =>{
    return instanceAxios.get(`/schedule/customer/${id}`)
    .then(response => response)
}

// Voir un rendez-vous
export const showAptmt = (id)  => {
    return instanceAxios.get(`/schedule/${id}`)
        .then(response =>response)
}

// Ajouter un rdv
export const createAptmt = (values) =>{
    return instanceAxios.post(`/schedule/createAppt`,values)
    .then(response => response)
}

// Editer un rdv
export const updateAptmt = (values, id) =>{
    return instanceAxios.put(`/schedule/update/${id}?id_appointment_type=${values.id_appointment_type}&id_customer=${values.id_customer}&id_estate=${values.id_estate}&id_staff=${values.id_staff}&notes=${values.notes}&scheduled_at=${values.scheduled_at}`)
    .then(response => response)
}

// Supprimer un rdv
export const deleteAptmt = (id) =>{
    return instanceAxios.delete(`/schedule/delete/${id}`)
    .then(response => response)
}

// Récuperer tout les rdv du jour pour l'agent
export const getTodayStaffAptmts = (id) =>{
    return instanceAxios.get(`/schedule/today_staff/${id}`)
    .then(response => response)
}

// Récuperer tout les rdv du jour pour le client
export const getTodayCustomerAptmts = (id) =>{
    return instanceAxios.get(`/schedule/today_customer/${id}`)
    .then(response => response)
}

// Récupérer les types de rdv
export const  getAptmtsTypes = () => {
    return instanceAxios.get('/schedule/appointmentsTypes')
        .then(response => response)
}
