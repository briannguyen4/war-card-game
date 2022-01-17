import http from '../http-common';

class PlayerService {
    get(id) {
        return http.get(`/players/${id}`);
    }

    getAll() {
        return http.get(`/wins`);
    }
}

export default new PlayerService();