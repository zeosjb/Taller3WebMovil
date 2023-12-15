import axios from "axios";

import { API_URL } from "@env";

const baseURL = API_URL;

const userApi = axios.create({baseURL});

export default userApi