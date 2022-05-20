import StoreAPI from './storeAPI.js';
import View from './view.js';

export default class Products {
  constructor(root) {
    this.root = root;
    this.products = [];
    this.product = {};
    this.view = new View(root);
    this._renderProducts();
  }
  _renderProducts() {
    StoreAPI.getProducts().then((data) => {
      this._getAllProducts(data);
    });
  }
  _getAllProducts(products) {
    this.products = products;
    this.view.getProductsList(products);
  }
}
