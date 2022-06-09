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
      this._getAllProducts(data);
    });
  }
  _getAllProducts(products) {
    this.products = products;
    this.view.getProductsList(products);
    this.view.productList(products);
  }
  _activeProduct(product) {
    this.product = product;
    this.view.getElement(product);
  }
  _handlers() {
    return {
      activeProduct: (id) => {
        const product = this.products.find((product) => product.id == id);
        this._activeProduct(product);
      },
    };
  }
}
