import axios from "axios";

const baseURL = "http://192.168.6.2:5000/auth/user";

const userApi = axios.create({baseURL});

export default userApi