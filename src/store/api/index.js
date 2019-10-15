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
        throw error;
      }
    }
  },

  products: {
    getProductBySalepoint: async data => {
      try {
        const { salepointId, companyId, name, skip, take } = data;
        let path = `${url}/products/salepoint/${salepointId}/${companyId}?`;

        if (name && name.trim().length > 0) {
          path += `&name=${name}`;
        }
        if (skip) {
          path += `&skip=${parseInt(skip)}`;
        }
        if (take) {
          path += `&take=${parseInt(take)}`;
        }
        const products = await axios.get(path, responseType);
        return products;
      } catch (error) {
        throw error;
      }
    }
  }
};
