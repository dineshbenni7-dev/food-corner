// Food Corner starter website. Edit the menu and WhatsApp number below before publishing.
const BUSINESS_NAME = "Food Corner";
// WhatsApp uses country code + number, with no +, spaces, or dashes.
const BUSINESS_WHATSAPP = "916281807448";

const menu = [
  {id:1,name:"Classic Veg Burger",category:"Veg",group:"Snacks",price:99,description:"A satisfying veggie patty with crisp lettuce and sauce.",image:"https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=700&q=80"},
  {id:2,name:"Chicken Burger",category:"Non-Veg",group:"Snacks",price:149,description:"Juicy chicken, fresh greens and our house-style dressing.",image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"},
  {id:3,name:"Paneer Tikka",category:"Veg",group:"Snacks",price:179,description:"Paneer bites with warming spices and a smoky finish.",image:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"Chicken Biryani",category:"Non-Veg",group:"Meals",price:220,description:"Fragrant rice, aromatic spices and tender chicken.",image:"https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=700&q=80"},
  {id:5,name:"Veg Biryani",category:"Veg",group:"Meals",price:170,description:"Basmati rice layered with vegetables and whole spices.",image:"https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80"},
  {id:6,name:"Crispy French Fries",category:"Veg",group:"Snacks",price:89,description:"Golden, crunchy fries with a pinch of seasoning.",image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80"},
  {id:7,name:"Chicken 65",category:"Non-Veg",group:"Snacks",price:190,description:"Spiced, crispy chicken bites, perfect for sharing.",image:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80"},
  {id:8,name:"Chocolate Brownie",category:"Veg",group:"Dessert",price:110,description:"A rich chocolate treat for your sweet-tooth moment.",image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80"}
];

const cart = new Map();
let activeFilter = "All";
const money = value => "₹" + value.toLocaleString("en-IN");
const $ = id => document.getElementById(id);

function renderMenu(){
  const query = $("search").value.trim().toLowerCase();
  const items = menu.filter(item => {
    const filterMatch = activeFilter === "All" || item.category === activeFilter || item.group === activeFilter;
    return filterMatch && (item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query));
  });
  $("menu-grid").innerHTML = items.length ? items.map(item => `
    <article class="food-card">
      <div class="food-photo"><img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.style.display='none'">
        <span class="food-tag"><span class="${item.category === "Veg" ? "veg-dot" : "nonveg-dot"}"></span>${item.category}</span>
      </div>
      <div class="food-info"><h3>${item.name}</h3><p>${item.description}</p>
        <div class="food-bottom"><span class="food-price">${money(item.price)}</span><button class="add-button" data-add="${item.id}" aria-label="Add ${item.name} to cart">+</button></div>
      </div>
    </article>`).join("") : '<div class="no-results">No dishes found. Try another search.</div>';
}
function cartCount(){let n=0;for(const qty of cart.values())n+=qty;return n;}
function cartTotal(){let total=0;for(const [id,qty] of cart)total+=menu.find(x=>x.id===id).price*qty;return total;}
function updateCart(){
  $("cart-count").textContent=cartCount();
  $("cart-total").textContent=money(cartTotal());
  $("checkout-total").textContent=money(cartTotal());
  if(!cart.size){$("cart-items").innerHTML='<div class="empty-cart">Your cart is waiting for something delicious.<br>Head back to the menu and add a dish.</div>';return;}
  $("cart-items").innerHTML=[...cart.entries()].map(([id,qty])=>{
    const item=menu.find(x=>x.id===id);
    return `<div class="cart-line"><div><h4>${item.name}</h4><small>${money(item.price)} each</small><div class="quantity-controls"><button data-qty="${id}" data-delta="-1" aria-label="Remove one ${item.name}">−</button><span>${qty}</span><button data-qty="${id}" data-delta="1" aria-label="Add one ${item.name}">+</button></div></div><span class="cart-line-price">${money(item.price*qty)}</span></div>`;
  }).join("");
}
function toast(message){$("toast").textContent=message;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2400);}
function openCart(){$("cart-drawer").classList.add("show");$("cart-backdrop").classList.add("show");$("cart-drawer").setAttribute("aria-hidden","false");}
function closeCart(){$("cart-drawer").classList.remove("show");$("cart-backdrop").classList.remove("show");$("cart-drawer").setAttribute("aria-hidden","true");}
function openCheckout(){
  if(!cart.size){toast("Add at least one dish before checkout.");return;}
  closeCart();$("checkout-backdrop").classList.add("show");
}
function closeCheckout(){$("checkout-backdrop").classList.remove("show");}
function toggleAddress(){
  const pickup=$('checkout-form').elements.orderType.value==="Pickup";
  $("address-label").style.display=pickup?"none":"grid";
  $('checkout-form').elements.address.required=!pickup;
}
$("filters").addEventListener("click",e=>{
  const button=e.target.closest("[data-filter]");if(!button)return;
  activeFilter=button.dataset.filter;
  document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===button));
  renderMenu();
});
$("search").addEventListener("input",renderMenu);
$("menu-grid").addEventListener("click",e=>{
  const button=e.target.closest("[data-add]");if(!button)return;
  const id=Number(button.dataset.add);cart.set(id,(cart.get(id)||0)+1);updateCart();toast("Added to your cart");
});
$("cart-items").addEventListener("click",e=>{
  const button=e.target.closest("[data-qty]");if(!button)return;
  const id=Number(button.dataset.qty),next=(cart.get(id)||0)+Number(button.dataset.delta);
  if(next<=0)cart.delete(id);else cart.set(id,next);updateCart();
});
$("open-cart").addEventListener("click",openCart);
$("close-cart").addEventListener("click",closeCart);
$("cart-backdrop").addEventListener("click",closeCart);
$("checkout-button").addEventListener("click",openCheckout);
$("close-checkout").addEventListener("click",closeCheckout);
$("checkout-backdrop").addEventListener("click",e=>{if(e.target===$("checkout-backdrop"))closeCheckout();});
$('checkout-form').elements.orderType.addEventListener("change",toggleAddress);
$("checkout-form").addEventListener("submit",e=>{
  e.preventDefault();
  if(!cart.size){toast("Your cart is empty.");closeCheckout();return;}
  const form=new FormData(e.currentTarget);
  const customerName=String(form.get("customerName")).trim();
  const customerPhone=String(form.get("customerPhone")).trim();
  const orderType=String(form.get("orderType"));
  const address=String(form.get("address")||"").trim();
  const notes=String(form.get("notes")||"").trim();
  const lines=[...cart.entries()].map(([id,qty])=>{const item=menu.find(x=>x.id===id);return `• ${item.name} x${qty} — ${money(item.price*qty)}`;});
  const orderId="FC"+Date.now().toString().slice(-6);
  let message=`🍽️ *NEW ORDER — ${BUSINESS_NAME}*%0AOrder ID: ${orderId}`;
  message=`🍽️ *NEW ORDER — ${BUSINESS_NAME}*\nOrder ID: ${orderId}\n\n${lines.join("\n")}\n\n*Subtotal: ${money(cartTotal())}*\n\nCustomer: ${customerName}\nPhone: ${customerPhone}\nOrder type: ${orderType}`;
  if(orderType==="Delivery")message+=`\nAddress: ${address}`;
  if(notes)message+=`\nInstructions: ${notes}`;
  message+="\n\nPlease confirm availability, delivery fee and estimated time.";
  const url=`https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url,"_blank","noopener,noreferrer");
  toast("WhatsApp opened. Press Send to submit the order.");
});
$("year").textContent=new Date().getFullYear();
toggleAddress();renderMenu();updateCart();
