export default class StoreAPI {
  static async getProducts() {
    const url = 'https://fakestoreapi.com/products';
    try {
      const response = await fetch(url);
      console.log(response);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getSingleProduct(id) {
    const url = `https://fakestoreapi.com/products/${id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getProductsCategory() {
    const url = 'https://fakestoreapi.com/products/categories';
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getProductsByCategory(category) {
    const url = `https://fakestoreapi.com/products/category/${category}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
