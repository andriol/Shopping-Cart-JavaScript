export default class StoreAPI {
  static async getProducts() {
    const url = 'https://fakestoreapi.com/products';
    const products = JSON.parse(localStorage.getItem('products'));
    try {
      if (!products) {
        const response = await fetch(url);
        const data = await response.json();
        const products = data.map((item) => ({
          ...item,
          amount: 1,
          totalPrice: item.price,
        }));
        console.log();
        localStorage.setItem('products', JSON.stringify(products));

        return data;
      }
    } catch (error) {
      console.log(error);
    }
    return products;
  }

  static getSingleProduct(id) {
    const products = JSON.parse(localStorage.getItem('products' || '[]'));
    const product = products.find((product) => product.id == id);

    return product;
  }
  static deleteProduct(id) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products.filter((product) => product.id != id);
    localStorage.setItem('products', JSON.stringify(product));
  }
  static updateProduct(updatedProduct) {
    const products = JSON.parse(localStorage.getItem('products' || '[]'));
    const product = products.find((product) => product.id == updatedProduct.id);

    if (product) {
      product.amount = updatedProduct.amount;
      product.totalPrice = calculateTotal(
        updatedProduct.amount,
        product.price.toFixed(2)
      );
    }
    localStorage.setItem('products', JSON.stringify(products));
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
function calculateTotal(price, amount) {
  return price * amount;
}
