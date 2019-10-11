import axios from "axios";

const url = "http://localhost:3001/api";
const responseType = { responseType: "json" };

export default {
  user: {
    login: async credentials => {
      try {
        const user = await axios.post(
          `${url}/auth/login`,
          credentials,
          responseType
        );
        return user;
      } catch (error) {
        console.log("error api", error);
        throw error;
      }
    }
  }
};
