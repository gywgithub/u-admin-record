const TokenKey = "token";

export function getToken() {
	localStorage.getItem(TokenKey);
}

export function setToken(token) {
	localStorage.setItem(TokenKey, token);
}

export function removeToken() {
	localStorage.removeItem(TokenKey);
}

export function tokenKey() {
	return TokenKey;
}
