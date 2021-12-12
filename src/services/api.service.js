import http from "../http-common";

class ApiService {
  getSports() {
    return http.get("/sports");
  }

  getEvents(sportId) {
    return http.get(`/sports/${sportId}`);
  }

  getOutcomes(sportId, eventId) {
    return http.get(`/sports/${sportId}/events/${eventId}`);
  }
}

export default new ApiService();
