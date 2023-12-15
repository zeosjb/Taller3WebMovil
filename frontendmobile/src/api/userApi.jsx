import axios from "axios";

const baseURL = "http://192.168.6.2:9000/";

const userApi = axios.create({baseURL});

export default userApi