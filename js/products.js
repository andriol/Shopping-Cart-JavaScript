import StoreAPI from './storeAPI.js';
import View from './view.js';

export default class Products {
  constructor(root) {
    this.root = root;
    this.products = [];
    this.product = {};
    this.view = new View(root, this._handlers());
    this._renderProducts();
  }

  _renderProducts() {
    StoreAPI.getProducts().then((data) => {
      if (data) {
        this._getAllProducts(data);
      }
    });
    window.addEventListener('DOMContentLoaded', this.view.getProductsList());
  }
  _getAllProducts(products) {
    this.products = products;
    this.view.getProductsList(products);
    this.view.productCount(products);
    this.view.totalValue(products);
  }
  _activeProduct(product) {
    this.product = product;
    this.view.getElement(product);
  }

  _handlers() {
    return {
      activeProduct: (id) => {
        const product = StoreAPI.getSingleProduct(id);
        this._activeProduct(product);
      },
      deleteProduct: (id) => {
        StoreAPI.deleteProduct(id);
        this._renderProducts();
      },
      editProduct: (amount) => {
        StoreAPI.updateProduct({
          id: this.product.id,
          amount,
        });
        this._renderProducts();
      },
      getTotal(products) {
        const total = products.reduce((total, product) => {
          total += product.totalPrice;
          return total;
        }, 0);

        return total;
      },
      totalAmount(products) {
        const total = products.reduce((total, amount) => {
          total += amount.amount;
          return total;
        }, 0);

        return total;
      },
      getTotalWithDelivery(products, delivery) {
        const total = products.reduce((total, product) => {
          total += product.totalPrice;
          return total;
        }, 0);
        return total + delivery;
      },
    };
  }
}
