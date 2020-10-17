// The order is stored here
var order = [];
var max_pizzas = 5;
var orders = load_orders();
var delivery_price = 300.00;

var pizzas = [
  {name: 'Personal Pizza', price: 600.00},
  {name: 'Medium Pizza', price: 1000.00},
  {name: 'Large Pizza', price: 1400.00},
  {name: 'Extra-Large Pizza', price: 1600.00},
  
];


// Try and load orders from localStorage
function load_orders(){
  try {
    return JSON.parse(window.localStorage["orders"]);
  }
  catch (e) {
    return [];
  }
}

function save_order() {
  orders.push({pizzas: order, form: $('form').serializeArray()});

  save_orders();
}

function save_orders() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

function get_order_html(pizzas, delivery, show_delete) {
    order_html = "";

    total = 0.0;

    // Add Pizzas to the order
    for (var i = 0; i < pizzas.length; ++i) {
      pizza = pizzas[i];
      total += pizza.price;

      order_html += '<tr id="' + i + '"><th>' + pizza.name + '</th><td>$' + pizza.price.toFixed(2) + '</td>';
      if (show_delete) {
        order_html += '<td><button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove"></span></button></td>';
      }
      order_html += '</tr>';
    }

    // Add Delivery to the order
    if (delivery) {
      total += delivery_price;
      order_html += '<tr><th>Delivery</th><td>$' + delivery_price.toFixed(2) + '</td></tr>';
    }

    // Add VAT
    order_html += '<tr><th>VAT</th><th>$' + (total * 14 / 100).toFixed(2) + '</th></tr>';

    // Add price total
    order_html += '<tr><th>Total</th><th>$' + total + '</th></tr>';

    return order_html;
}