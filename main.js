if (document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded", ready)
} else{
    ready()
}
function ready() {
    var removeCartItemsButtons = document.getElementsByClassName("btn-remove")
    for (var i=0; i<removeCartItemsButtons.length; i++){
        var button = removeCartItemsButtons[i]
        button.addEventListener("click", removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity-input")
    for (var i=0; i<quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName("add-item-cart")
    for (var i=0; i<addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener("click", addToCartClicked)
    }

    document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked)
 }

function purchaseClicked(event){
    alert("Thank you for your purchase")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value<=0){
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName("item-title")[0].innerText
    var price = shopItem.getElementsByClassName("price")[0].innerText
    var imgSrc = shopItem.getElementsByClassName("product-img")[0].src

    addItemToCart(title, price, imgSrc)

    updateCartTotal()
}

function addItemToCart(title, price, imgSrc){
    var cartRow = document.createElement("div")
    cartRow.classList.add("cart-row")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    var cartItemsName = document.getElementsByClassName("cart-item-title")
    for (var i = 0; i < cartItemsName.length; i++){
        if (cartItemsName[i].innerText == title){
            alert("Already in the cart!!")
            return
        }
    }
    var cartRowContent = `
        <div class="cart-item cart-column">
            <img src="${imgSrc}" class="cart-item-img" alt="product image" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-item-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-remove" type="button">REMOVE</button>
        </div>`
        cartRow.innerHTML = cartRowContent
    cartItems.appendChild(cartRow)
    cartRow.getElementsByClassName("btn-remove")[0].addEventListener("click", removeCartItem)
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged)
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName("cart-items")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cart-row")
    var total = 0
    for (var i=0; i<cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        var price = parseFloat(priceElement.innerText.replace("$", ""))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("cart-total-price")[0].innerText = "$"+ total
}




const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', function(){
    this.classList.toggle('is-active');
})