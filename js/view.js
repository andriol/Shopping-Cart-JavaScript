export default class View {
  constructor(root, { activeProduct } = {}) {
    this.root = root;
    this.activeProduct = activeProduct;
    this.price = {};
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
            <div class="col" style="padding-left: 0"></div>
            <div class="col text-right">&euro;</div>
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
            <div class="col text-right">&euro;</div>
          </div>
          <button class="btn">CHECKOUT</button>
        </div>
      </div>
    </div>
    </div>`;
  }

  _renderProductsHTML(image, title, description, index, price) {
    return ` <div class="row main align-items-center" data-id=${index + 1}>
         <div class="col-2"><img class="img-fluid" src=${image} alt='product title'/></div>
            <div class="col">
                <div class="row text-muted">${title}</div>
                    <div class="row">${description}</div>
                        </div>
                    <div class="col" >
                <a class='decrease'>-</a><input class="numberstyle" min="1" step="1" type='number' value="1"><a class='increase'>+<a/>
            </div>
          <div class="col">&euro; <span class='price'>${price}</span> <span class="close">&#10005;</span></div>
        </div>`;
  }

  getProductsList(products) {
    const productsList = this.root.querySelector('.border-bottom');
    productsList.innerHTML = '';
    for (const [index, product] of products.entries()) {
      const html = this._renderProductsHTML(
        product.image,
        product.title,
        product.description,
        index,
        product.price
      );

      productsList.insertAdjacentHTML('beforeend', html);
    }
    const increases = this.root.querySelectorAll('.increase');
    const decreases = this.root.querySelectorAll('.decrease');
    const prices = this.root.querySelectorAll('.price');

    decreases.forEach((decrease) => {
      decrease.addEventListener('click', (e) => {
        if (e.target.nextElementSibling.value > 0) {
          prices.forEach((price) => {
            if (
              price.parentElement.parentElement.parentElement.dataset.id ===
              e.path[2].attributes[1].value
            ) {
              price.innerHTML = (price.innerHTML - this.price).toFixed(2);
            }
          });
          e.target.nextElementSibling.value--;
        } else {
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
            price.innerHTML = (
              this.price *
              (e.target.previousElementSibling.value++ + 1)
            ).toFixed(2);
          }
        });
      });
    });
  }
  getElement(product) {
    this.price = product.price;
  }

  async productList(products) {
    const productsLength = this.root.querySelector('.text-muted');
    this.products = await products;
    productsLength.insertAdjacentHTML(
      'beforeend',
      `${this.products.length} Items`
    );
  }
}
