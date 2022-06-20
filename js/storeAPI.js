export default class StoreAPI {
  static async getProducts() {
    const url = 'https://fakestoreapi.com/products';
    const products = JSON.parse(localStorage.getItem('products'));
    try {
      if (!products) {
        const response = await fetch(url);
        const data = await response.json();
        localStorage.setItem('products', JSON.stringify(data));
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
    console.log(products);
    return products;
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
  static deleteProduct(id) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    console.log(products);
    const product = products.filter((product) => product.id != id);
    localStorage.setItem('products', JSON.stringify(product));
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
