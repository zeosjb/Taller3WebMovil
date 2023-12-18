import axios from "axios";
/**
 * Url de la API
 */
const baseURL = "http://192.168.6.2:5000/";

/**
 * Crea la instancia de axios para las llamadas
 */
const userApi = axios.create({baseURL});

export default userApi