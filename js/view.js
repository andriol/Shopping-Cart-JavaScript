export default class View {
  constructor(
    root,
    { activeProduct, deleteProduct, editProduct, getTotal, totalAmount } = {}
  ) {
    this.root = root;
    this.activeProduct = activeProduct;
    this.deleteProduct = deleteProduct;
    this.editProduct = editProduct;
    this.getTotal = getTotal;
    this.totalAmount = totalAmount;
    this.products = [];
    this.root.innerHTML = `
    <div class="body">
    <div class="card">
      <div class="row">
        <div class="col-md-8 cart">
          <div class="title">
            <div class="row">
              <div class="col">
                <h4><b>Shopping Cart</b></h4>
              </div>
              <div class="col align-self-center text-right text-muted">
               
              </div>
            </div>
          </div>
          <div class="row border-top border-bottom" id="scrollable">
         
          </div>
          <div class="back-to-shop">
            <a href="#">&leftarrow;</a
            ><span class="text-muted">Back to shop</span>
          </div>
        </div>
        <div class="col-md-4 summary">
          <div>
            <h5><b>Summary</b></h5>
          </div>
          <hr />
          <div class="row">
            <div class="col count" style="padding-left: 0"></div>
            <div class="col total text-right"> </div>
          </div>
          <form>
            <p>SHIPPING</p>
            <select>
              <option class="text-muted">Standard-Delivery- &euro;5.00</option>
            </select>
            <p>GIVE CODE</p>
            <input id="code" placeholder="Enter your code" />
          </form>
          <div
            class="row"
            style="border-top: 1px solid rgba(0, 0, 0, 0.1); padding: 2vh 0"
          >
            <div class="col">TOTAL PRICE</div>
            <div class="col total-price text-right">&euro;</div>
          </div>
          <button class="btn">CHECKOUT</button>
        </div>
      </div>
    </div>
    </div>`;
  }

  _renderProductsHTML(
    image,
    title,
    description,
    amount,
    id,
    price,
    totalPrice
  ) {
    return ` <div class="row main align-items-center" data-id=${id}>
         <div class="col-2"><img class="img-fluid" src=${image} alt='product title'/></div>
            <div class="col">
                <div class="row text-muted">${title}</div>
                    <div class="row">${description}</div>
                        </div>
                    <div class="col" >
                <a class='decrease'>-</a><input class="numberstyle"  min="1" step="1" type='number' value="${amount}"><a class='increase'>+<a/>
            </div>
          <div class="col">&euro; <span class='price'>${totalPrice}</span> <span class="close">&#10005;</span></div>
        </div>`;
  }

  getProductsList() {
    const productsList = this.root.querySelector('.border-bottom');
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    productsList.innerHTML = '';
    for (const product of products) {
      const html = this._renderProductsHTML(
        product.image,
        product.title,
        product.description,
        product.amount,
        product.id,
        product.price,
        product.totalPrice
      );

      productsList.insertAdjacentHTML('beforeend', html);
    }
    const increases = this.root.querySelectorAll('.increase');
    const decreases = this.root.querySelectorAll('.decrease');
    const prices = this.root.querySelectorAll('.price');

    decreases.forEach((decrease) => {
      decrease.addEventListener('click', (e) => {
        if (e.target.nextElementSibling.value > 1) {
          prices.forEach((price) => {
            console.log(e, price);
            if (
              price.parentElement.parentElement.parentElement.dataset.id ===
              e.path[2].attributes[1].value
            ) {
              e.target.nextElementSibling.value--;
              this.activeProduct(e.path[2].attributes[1].value);
              this.editProduct(e.target.nextElementSibling.value--);
              price.innerHTML = this.product;
            }
          });
        } else {
          this.deleteProduct(e.path[2].dataset.id);
        }
      });
    });
    increases.forEach((increase) => {
      increase.addEventListener('click', (e) => {
        prices.forEach((price) => {
          if (
            price.parentElement.parentElement.parentElement.dataset.id ===
            e.path[2].attributes[1].value
          ) {
            this.activeProduct(e.path[2].attributes[1].value);
            this.editProduct(e.target.previousElementSibling.value++ + 1);
            price.innerHTML = this.product;
          }
        });
      });
    });
  }
  getElement(product) {
    this.price = product.price;
  }
  productCount(products) {
    this.products = products;
    const productsLength = this.root.querySelector('.text-muted');
    const prductsCount = this.root.querySelector('.count');
    const amount = this.totalAmount(products);

    productsLength.innerHTML = `${products.length} Items`;

    prductsCount.innerHTML = `ITEMS ${amount}`;
  }
  totalValue(products) {
    const totalAmount = this.root.querySelector('.total');
    const totalPrice = this.root.querySelector('.total-price');
    const total = this.getTotal(products);

    totalAmount.innerHTML = `&euro; ${total
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    totalPrice.innerHTML = `&euro; ${(total + 5)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }
}
