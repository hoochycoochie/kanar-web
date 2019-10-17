import axios from "axios";

const url = "http://localhost:3001/api";
const responseType = { responseType: "json" };
const contentType = {
  headers: {
    "Content-Type": "application/json"
  }
};
export default {
  salepoints: {
    getSalepointsByCompany: async body => {
      try {
        const salepoints = await axios.post(
          `${url}/salepoints`,
          body,
          contentType
        );
        return salepoints;
      } catch (error) {
        throw error;
      }
    }
  },
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
    },
    getUsersByCompany: async body => {
      try {
        const users = await axios.post(`${url}/members`, body, contentType);
        return users;
      } catch (error) {
        throw error;
      }
    }
  },
  categories: {
    getCategoriesByCompany: async body => {
      try {
        const cats = await axios.post(`${url}/categories`, body, contentType);
        return cats;
      } catch (error) {
        throw error;
      }
    }
  },
  products: {
    getProductBySalepoint: async data => {
      try {
        const { company_id, salepoint_id, name, skip, take } = data;
        let path = `${url}/products/salepoint/${salepoint_id}/${company_id}?`;

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
    },

    getProducts: async body => {
      try {
        const products = await axios.post(`${url}/products`, body, contentType);
        return products;
      } catch (error) {
        throw error;
      }
    }
  }
};
