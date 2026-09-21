const products = [
  {id:1,name:"Caderno Universitário 10 Matérias",category:"Cadernos",icon:"📓",price:45.90,old:59.90,tag:"Mais vendido"},
  {id:2,name:"Lápis de Cor 24 Cores Premium",category:"Arte",icon:"🖍️",price:32.50,old:39.90,tag:"Oferta"},
  {id:3,name:"Kit Estudante – Fundamental I",category:"Kits",icon:"🎒",price:189.00,tag:"Novo"},
  {id:4,name:"Mochila Ergonômica Pro",category:"Mochilas",icon:"🎒",price:219.90},
  {id:5,name:"Kit Canetas Esferográficas (4 un)",category:"Escrita",icon:"🖊️",price:14.90},
  {id:6,name:"Estojo Triplo Escolar",category:"Estojos",icon:"🧰",price:49.90},
  {id:7,name:"Régua 30cm Transparente",category:"Acessórios",icon:"📏",price:7.90},
  {id:8,name:"Marca-texto Pastel (6 un)",category:"Escrita",icon:"🖍️",price:24.90},
  {id:9,name:"Pasta Organizadora A4",category:"Acessórios",icon:"📁",price:18.90}
];

const kits = [
  {id:101,name:"Kit Estudante – Fundamental I",icon:"🎒",desc:"Tudo para começar o ano com praticidade e organização.",items:["24 itens","Curadoria pedagógica","Embalado por aluno"],price:189},
  {id:102,name:"Kit Estudante – Fundamental II",icon:"📚",desc:"Materiais para uma rotina escolar mais organizada.",items:["32 itens","Fichário incluso","Material de geometria"],price:245},
  {id:103,name:"Kit Estudante – Ensino Médio",icon:"🎓",desc:"Uma seleção completa para acompanhar a fase final da escola.",items:["28 itens","Calculadora científica","Acessórios premium"],price:312.50}
];

let cart = JSON.parse(localStorage.getItem("codescrum-cart") || "[]");
let selectedCategory = "Todos";

const money = value => value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

function renderProducts(){
  const query = document.querySelector("#search").value.toLowerCase().trim();
  const list = products.filter(p =>
    (selectedCategory === "Todos" || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(query)
  );
  const container = document.querySelector("#products");
  container.innerHTML = list.map(p => `
    <article class="product">
      <div class="product-img">${p.tag ? `<span class="tag">${p.tag}</span>` : ""}<span>${p.icon}</span></div>
      <div class="product-body">
        <div class="product-category">${p.category}</div>
        <h3>${p.name}</h3>
        <div class="price">${p.old ? `<span class="old">${money(p.old)}</span>` : ""}<span class="current">${money(p.price)}</span></div>
        <button class="add" onclick="addToCart(${p.id})">Adicionar ao carrinho</button>
      </div>
    </article>`).join("");
  document.querySelector("#empty").style.display = list.length ? "none" : "block";
}

function renderKits(){
  document.querySelector("#kitGrid").innerHTML = kits.map(k => `
    <article class="kit">
      <div class="kit-img">${k.icon}</div>
      <h3>${k.name}</h3>
      <p>${k.desc}</p>
      <ul>${k.items.map(i => `<li>${i}</li>`).join("")}</ul>
      <div class="kit-bottom"><span class="kit-price">${money(k.price)}</span><button class="btn primary" onclick="addKit(${k.id})">Adicionar</button></div>
    </article>`).join("");
}

function addToCart(id){
  const item = products.find(p => p.id === id);
  const existing = cart.find(p => p.id === id);
  if(existing) existing.qty++;
  else cart.push({...item,qty:1});
  saveCart(); openCart(); toast("Produto adicionado ao carrinho!");
}
function addKit(id){
  const k = kits.find(x => x.id === id);
  const existing = cart.find(p => p.id === id);
  if(existing) existing.qty++;
  else cart.push({id:k.id,name:k.name,category:"Kits",icon:k.icon,price:k.price,qty:1});
  saveCart(); openCart(); toast("Kit adicionado ao carrinho!");
}
function changeQty(id,delta){
  const item = cart.find(p => p.id === id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) cart = cart.filter(p => p.id !== id);
  saveCart();
}
function removeItem(id){ cart = cart.filter(p => p.id !== id); saveCart(); }
function saveCart(){
  localStorage.setItem("codescrum-cart",JSON.stringify(cart));
  renderCart();
}
function renderCart(){
  const count = cart.reduce((sum,p)=>sum+p.qty,0);
  const total = cart.reduce((sum,p)=>sum+p.price*p.qty,0);
  document.querySelector("#cartCount").textContent = count;
  document.querySelector("#cartTotal").textContent = money(total);
  const box = document.querySelector("#cartItems");
  box.innerHTML = cart.length ? cart.map(p => `
    <div class="cart-item">
      <div class="cart-icon">${p.icon}</div>
      <div><h4>${p.name}</h4><small>${money(p.price)}</small>
        <div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${p.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div>
      </div>
      <button class="remove" onclick="removeItem(${p.id})">remover</button>
    </div>`).join("") : `<p style="color:#687187;text-align:center;padding:40px 10px">Seu carrinho está vazio.</p>`;
}
function openCart(){
  document.querySelector("#cart").classList.add("open");
  document.querySelector("#overlay").classList.add("show");
}
function closeCart(){
  document.querySelector("#cart").classList.remove("open");
  document.querySelector("#overlay").classList.remove("show");
}
let toastTimer;
function toast(msg){
  const el=document.querySelector("#toast");
  el.textContent=msg; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove("show"),2200);
}

document.querySelectorAll(".category").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".category").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    selectedCategory=btn.dataset.category;
    renderProducts();
    document.querySelector("#produtos").scrollIntoView({behavior:"smooth"});
  });
});
document.querySelector("#search").addEventListener("input",renderProducts);
document.querySelector("#openCart").addEventListener("click",openCart);
document.querySelector("#closeCart").addEventListener("click",closeCart);
document.querySelector("#overlay").addEventListener("click",closeCart);

document.querySelector("#checkout").addEventListener("click",()=>{
  if(!cart.length) return toast("Adicione algum produto primeiro.");
  toast("Pedido de demonstração enviado! 🚀");
});

document.querySelector("#newsletterForm").addEventListener("submit",e=>{
  e.preventDefault();
  const email=document.querySelector("#email").value;
  if(email) { e.target.reset(); toast("E-mail cadastrado com sucesso!"); }
});

document.querySelector("#mobileMenu").addEventListener("click",()=>{
  const menu=document.querySelector(".menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  if(menu.style.display==="flex"){
    menu.style.position="absolute";menu.style.top="66px";menu.style.left="0";menu.style.right="0";
    menu.style.background="white";menu.style.padding="20px";menu.style.flexDirection="column";
    menu.style.borderBottom="1px solid #e7e9f0";
  }
});

renderProducts();
renderKits();
renderCart();
