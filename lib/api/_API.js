const _API = `https://api.hub-georgia.ge/api/`;

function authorizationBearer(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

export { _API, authorizationBearer };
