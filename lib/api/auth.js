import _API from "./_API";
import axios from "axios";

const API = `${_API}authentication/`;

async function _login(params) {
    try {
        const response = await axios.post(`${API}login`, params);
        return response.data.result.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export { _login };
