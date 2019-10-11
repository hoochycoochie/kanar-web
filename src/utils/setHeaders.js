import axios from "axios";

export default async (token = null) => {
  try {
    if (token) {
      axios.defaults.headers.common.authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.authorization;
    }
  } catch (error) {
    throw error;
  }
};
