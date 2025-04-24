import { getToken } from "./token";

class Api {
  constructor({ baseUrl, headers, makeRequest }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._makeRequest = makeRequest;
  }

  _getHeaders() {
    const token = getToken();
    return {
      ...this._headers,
      authorization: token ? `Bearer ${token}` : "",
    };
  }

  _handleServerResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(
          res.status === 403
            ? "Você não tem permissão para excluir um card que não criou."
            : `Lamentamos, mas infelizmente não podemos seguir com o solicitado: ${res.status}`
        );
  }

  getUserInfo() {
    return this._makeRequest(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._handleServerResponse);
  }

  getCardsInfo() {
    return this._makeRequest(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    }).then(this._handleServerResponse);
  }

  setUserInfo(inputNameValue, inputAboutValue) {
    return this._makeRequest(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: inputNameValue,
        about: inputAboutValue,
      }),
    }).then(this._handleServerResponse);
  }

  addNewCard(inputTitleValue, inputLinkValue) {
    return this._makeRequest(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: inputTitleValue,
        link: inputLinkValue,
      }),
    }).then(this._handleServerResponse);
  }

  updateLikeState(cardId, isLiked) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._getHeaders(),
    }).then(this._handleServerResponse);
  }

  deleteCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._handleServerResponse);
  }

  changeProfileImage(data) {
    return this._makeRequest(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._handleServerResponse);
  }
}

// Configuração para API
const apiConfig = {
  baseUrl: "https://api.around-full.mooo.com",
  headers: {
    "Content-Type": "application/json",
  },
  makeRequest: (...args) => fetch(...args),
};

// Instância para o Api
export const api = new Api(apiConfig);
