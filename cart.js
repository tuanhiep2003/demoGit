// // them san pham
// const btn = document.querySelectorAll(".product-buttom button")
//  console.log(btn)
// btn.forEach(function(button,index){
//  // console.log(button,index)
//  button.addEventListener("click",function(event){{
//     var btnItem = event.target
//     var product = btnItem.parentElement
//     var productImg = product.querySelector(".product-item img").src
//     var productName = product.querySelector(".product-infor a").innerText
//     var productPrice = product.querySelector(".product-infor span").innerText
//     //console.log(productPrice,productName,productImg)
//     addcart(productPrice,productName,productImg)



// }})


// })
// function addcart(productPrice,productName,productImg) {
//     var addtr = document.createElement("tr")
//     var trcontent = "<tr><td style="display: flex; align-items: center;"><img style="width: 70px;" src="https://pos.nvncdn.net/be3159-662/ps/20230628_77ZSnWO66G.jpeg" alt="">Áo polo cổ Đức Regular Cotton 2070</td>
// <td><span class="price">349.000₫</span></td>
//     <td><input style="width: 30px; outline: none;" type="number" value="1" min="1"></td>
//     <td style="cursor: pointer;">Xóa</td>
// </tr>"
//     addtr.innerHTML = trcontent
//     var cartTable = document.querySelector("tbody")

//     cartTable.append(addtr)
// }

window.cartStore = []

function toVND(amount) {
  var formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
  return formatter.format(amount);
}

function parseVND(amount) {
  return parseFloat(amount.replace(/[^\d-]/g, ""));
}

function setTotal(amount) {
  document.getElementById('totalPrice').innerHTML = toVND(amount)
}

function updateTotal() {
  const totalPriceAmount = window.cartStore.reduce(function (accumulator, currentItem) {
    return accumulator + (currentItem.price * currentItem.amount);
  }, 0);
  setTotal(totalPriceAmount)
}


function addToCart(image, name, price) {

  const cartBody = document.getElementById('cart-body')
  const html = `
  <tr>
    <td style="display: flex; align-items: center;">
      <img style="width: 70px;" src="${image}" alt="">
      <span class="product-name">${name}</span>
    </td>
    <td>
      <span class="price">${price}</span>
    </td>
    <td>
      <input style="width: 30px; outline: none;" type="number" value="1" min="1" class="product-amount" />
    </td>
    <td class="mx-auto" style="align-items: center; text-align: center;">
      <button type="button" class="btn-primary">Xoá</button>
    </td>
  </tr>
  `
  if (window.cartStore.some((item) => item.name === name)) {
    const item = window.cartStore.find((item) => item.name === name);
    const itemIndex = window.cartStore.findIndex((item) => item.name === name)

    item.amount++
    window.cartStore[itemIndex] = item
    let listItem = cartBody.getElementsByClassName('product-name')
    for (let i of listItem) {
      if (i.innerHTML === name) {
        i.parentElement.parentElement.getElementsByClassName('product-amount')[0].value = item.amount;
        break;
      }
    }
  } else {
    window.cartStore.push({
      name: name,
      image: image,
      amount: 1,
      price: parseVND(price)
    })
    cartBody.innerHTML += html
  }

  const removeBtn = cartBody.getElementsByClassName('btn-primary')
  const amountInput = cartBody.getElementsByClassName('product-amount')
  for (const i of removeBtn) {
    i.removeEventListener('click', removeFromStore)
    setTimeout(() => i.addEventListener('click', removeFromStore), 100)
  }
  for (const i of amountInput) {
    i.removeEventListener('input', updateCartItem)
    setTimeout(() => i.addEventListener('input', updateCartItem), 100)
  }
  updateTotal()
  updateUI()
  alert('Dã thêm ' + name + ' vào giỏ hàng');

}

function updateCartItem() {
  const parent = this.parentElement.parentElement
  const name = parent.getElementsByClassName('product-name')[0].innerHTML
  const amount = this.value
  if (window.cartStore.some((item) => item.name === name)) {
    const item = window.cartStore.find((item) => item.name === name);
    item.amount = parseInt(amount, 10)
    window.cartBody = [...window.cartStore.filter((item) => item.name !== name), item]
    updateTotal()
  }
}

function removeFromStore() {
  const parent = this.parentElement.parentElement
  const name = parent.getElementsByClassName('product-name')[0].innerHTML
  window.cartStore = window.cartStore.filter((item) => item.name !== name)
  parent.remove()
  updateTotal()
  updateUI()
  return true
}

function init() {
  console.log(atob('TWV3RGV2UHJvIHdhcyBjcmVhdGVkIGl0Lg=='))

  const addBtn = document.getElementsByClassName('add-to-cart')
  for (const b of addBtn) {
    b.addEventListener('click', function () {
      const parentElement = this.parentElement.parentElement
      const image = parentElement.querySelector('.img-feature').src
      const name = parentElement.querySelector('.content').innerHTML
      const price = parentElement.querySelector('.price').innerHTML

      return addToCart(
        image, name, price
      )
    })
  }
}

function updateUI() {
  document.querySelectorAll('.count').forEach(e => e.innerHTML = window.cartStore.length)
}


window.onload = function () {
  init();
}