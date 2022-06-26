export default class StoreAPI {
  static async getProducts() {
    const url = 'https://fakestoreapi.com/products';
    const products = JSON.parse(localStorage.getItem('products'));
    try {
      if (!products) {
        const response = await fetch(url);
        const data = await response.json();
        const product = data.map((item) => ({
          ...item,
          amount: 1,
          totalPrice: item.price,
        }));

        localStorage.setItem('products', JSON.stringify(product));

        return product;
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
}
function calculateTotal(price, amount) {
  return price * amount;
}
