export default class View {
  constructor(
    root,
    {
      activeProduct,
      deleteProduct,
      editProduct,
      getTotal,
      totalAmount,
      getTotalWithDelivery,
    } = {}
  ) {
    this.root = root;
    this.activeProduct = activeProduct;
    this.deleteProduct = deleteProduct;
    this.editProduct = editProduct;
    this.getTotal = getTotal;
    this.totalAmount = totalAmount;
    this.getTotalWithDelivery = getTotalWithDelivery;
    this.products = [];
    this.selectedDeliveryCost = 5;
    this.parentElement = '';
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
            <a href="/Shopping-Cart-JavaScript/cart.html">&leftarrow;</a
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
            <select id="deliveryOptions">
              <option class="text-muted" value='5'>Standard-Delivery- &euro;5.00</option>
              <option class="text-muted" value='15'>Express-Delivery- &euro;15.00</option>
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
          <div class="col">&euro; <span class='price'>${totalPrice}</span> <span 
      class="close">&#10005;</span></div>
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
    const deletes = this.root.querySelectorAll('.close');
    deletes.forEach((deleteButton) => {
      deleteButton.addEventListener('click', (e) => {
        const parentElement = e.target.closest('[data-id]');
        this.deleteProduct(parentElement.dataset.id);
      });
    });
    decreases.forEach((decrease) => {
      decrease.addEventListener('click', (e) => {
        const parentElement = e.target.closest('[data-id]');
        if (e.target.nextElementSibling.value > 1) {
          prices.forEach((price) => {
            if (
              price.parentElement.parentElement.parentElement.dataset.id ===
              parentElement.dataset.id
            ) {
              e.target.nextElementSibling.value--;
              this.activeProduct(parentElement.dataset.id);
              this.editProduct(e.target.nextElementSibling.value--);
            }
          });
        } else {
          this.deleteProduct(parentElement.dataset.id);
        }
      });
    });
    increases.forEach((increase) => {
      increase.addEventListener('click', (e) => {
        const parentElement = e.target.closest('[data-id]');
        prices.forEach((price) => {
          if (
            price.parentElement.parentElement.parentElement.dataset.id ===
            parentElement.dataset.id
          ) {
            this.activeProduct(parentElement.dataset.id);
            this.editProduct(e.target.previousElementSibling.value++ + 1);
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
    const selectElement = document.getElementById('deliveryOptions');

    // Function to update total price based on selected delivery option
    const updateTotalPrice = () => {
      const total = this.getTotal(products);
      const totalAndDelivery = total + this.selectedDeliveryCost;
      totalAmount.innerHTML = `&euro; ${total
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
      totalPrice.innerHTML = `&euro; ${totalAndDelivery
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    };

    // Add event listener to update selected delivery cost
    selectElement.addEventListener('change', (e) => {
      this.selectedDeliveryCost = Number(e.target.value);
      updateTotalPrice();
    });

    // Initial rendering
    updateTotalPrice();
  }
}
