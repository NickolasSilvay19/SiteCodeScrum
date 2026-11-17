const products = [
  {id:1,name:"Caderno Universitário 10 Matérias",category:"Cadernos",icon:"📓",price:45.90,old:59.90,tag:"Mais vendido"},
  {id:2,name:"Lápis de Cor 24 Cores Premium",category:"Arte",icon:"🖍️",price:32.50,old:39.90,tag:"Oferta"},
  {id:3,name:"Kit Estudante – Fundamental I",category:"Kits",icon:"🎒",price:249.90,tag:"Kit completo"},
  {id:10,name:"Kit Estudante – Fundamental II",category:"Kits",icon:"📚",price:329.90,tag:"Mais disciplinas"},
  {id:11,name:"Kit Estudante – Ensino Médio",category:"Kits",icon:"🎓",price:399.90,tag:"Completo"},
  {id:4,name:"Mochila Ergonômica Pro",category:"Mochilas",icon:"🎒",price:219.90},
  {id:5,name:"Kit Canetas Esferográficas (4 un)",category:"Escrita",icon:"🖊️",price:14.90},
  {id:6,name:"Estojo Triplo Escolar",category:"Estojos",icon:"🧰",price:49.90},
  {id:7,name:"Régua 30cm Transparente",category:"Acessórios",icon:"📏",price:7.90},
  {id:8,name:"Marca-texto Pastel (6 un)",category:"Escrita",icon:"🖍️",price:24.90},
  {id:9,name:"Pasta Organizadora A4",category:"Acessórios",icon:"📁",price:18.90}
];

const kits = [
  {
    id:101, name:"Kit Estudante – Fundamental I", level:"1º ao 5º ano", icon:"🎒",
    desc:"Materiais para alfabetização, atividades de escrita, desenho, pintura e organização diária.",
    price:249.90, highlight:"Ideal para os primeiros anos",
    groups:[
      {title:"Cadernos e organização",items:[["Caderno brochura 96 folhas",2],["Caderno de desenho 48 folhas",1],["Pasta plástica com elástico",1],["Estojo escolar",1]]},
      {title:"Escrita",items:[["Lápis grafite nº 2",4],["Caneta azul",2],["Borracha branca",2],["Apontador com depósito",1]]},
      {title:"Arte e atividades",items:[["Caixa de lápis de cor (12 cores)",1],["Caixa de giz de cera (12 cores)",1],["Tesoura sem ponta",1],["Cola bastão",2]]},
      {title:"Acessórios",items:[["Régua de 30 cm",1],["Folhas de papel sulfite A4 (100 folhas)",1]]}
    ],
    usage:"Para copiar atividades, aprender a escrever, desenhar, colorir, recortar, colar e guardar tarefas. Nos anos iniciais, o lápis grafite continua sendo o principal material de escrita."
  },
  {
    id:102, name:"Kit Estudante – Fundamental II", level:"6º ao 9º ano", icon:"📚",
    desc:"Mais espaço para várias disciplinas, anotações, trabalhos, cálculos e atividades de geometria.",
    price:329.90, highlight:"Mais recursos para várias matérias",
    groups:[
      {title:"Cadernos e organização",items:[["Caderno universitário 10 matérias",1],["Caderno universitário 96 folhas",2],["Fichário",1],["Divisórias para fichário",10],["Pasta catálogo ou sanfonada",1],["Estojo",1]]},
      {title:"Escrita e marcação",items:[["Caneta azul",5],["Caneta preta",2],["Caneta vermelha",1],["Lápis grafite nº 2",3],["Borracha",2],["Apontador",1],["Marca-texto",3]]},
      {title:"Matemática e geometria",items:[["Régua de 30 cm",1],["Jogo de esquadros",1],["Transferidor 180°",1],["Compasso escolar",1],["Calculadora básica",1]]},
      {title:"Apoio",items:[["Bloco de notas adesivas",1],["Folhas de papel sulfite A4 (100 folhas)",1]]}
    ],
    usage:"Para acompanhar várias matérias, organizar anotações por disciplina, destacar conteúdos importantes e fazer construções geométricas e cálculos."
  },
  {
    id:103, name:"Kit Estudante – Ensino Médio", level:"1º ao 3º ano", icon:"🎓",
    desc:"Um conjunto reforçado para rotina intensa de estudos, revisão, exercícios, provas e trabalhos.",
    price:399.90, highlight:"Completo para estudos e provas",
    groups:[
      {title:"Cadernos e organização",items:[["Caderno universitário 15 matérias",1],["Caderno universitário 96 folhas",2],["Fichário com argolas",1],["Divisórias para fichário",12],["Pasta sanfonada",1],["Estojo",1]]},
      {title:"Escrita e revisão",items:[["Caneta azul",5],["Caneta preta",2],["Caneta vermelha",2],["Lápis grafite nº 2",2],["Borracha",1],["Apontador",1],["Marca-texto",4],["Bloco de notas adesivas",1]]},
      {title:"Matemática e ciências",items:[["Calculadora científica",1],["Régua de 30 cm",1],["Jogo de esquadros",1],["Transferidor 180°",1],["Compasso escolar",1]]},
      {title:"Trabalhos e atividades",items:[["Folhas de papel sulfite A4 (100 folhas)",1],["Caneta permanente",1]]}
    ],
    usage:"Para registrar conteúdos de várias disciplinas, resolver exercícios de matemática e ciências, revisar para provas, montar trabalhos e manter folhas e anotações organizadas."
  }
];

let cart = [];
try {
  cart = JSON.parse(localStorage.getItem("codescrum-cart") || "[]");
  if (!Array.isArray(cart)) cart = [];
  // Atualiza preços de kits que já estavam salvos no carrinho em versões anteriores.
  const currentKitPrices = {101:249.90, 102:329.90, 103:399.90};
  cart = cart.map(item => currentKitPrices[item.id]
    ? {...item, price:currentKitPrices[item.id]}
    : item);
} catch (error) {
  cart = [];
}
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
  document.querySelector("#kitGrid").innerHTML = kits.map(k => {
    const totalItems = k.groups.reduce((sum, group) =>
      sum + group.items.reduce((groupSum, item) => groupSum + item[1], 0), 0);

    return `
      <article class="kit">
        <div class="kit-topline">
          <span class="kit-level">${k.level}</span>
          <span class="kit-count">${totalItems} itens no kit</span>
        </div>
        <div class="kit-img" aria-hidden="true">${k.icon}</div>
        <h3>${k.name}</h3>
        <p class="kit-description">${k.desc}</p>
        <div class="kit-includes-title">O que vem no kit</div>
        <div class="kit-groups">
          ${k.groups.map(group => `
            <section class="kit-group">
              <h4>${group.title}</h4>
              <ul>${group.items.map(item => `
                <li><span>${item[0]}</span><strong>${item[1]} ${item[1] === 1 ? "unidade" : "unidades"}</strong></li>
              `).join("")}</ul>
            </section>
          `).join("")}
        </div>
        <div class="kit-usage"><strong>Como será usado:</strong> ${k.usage}</div>
        <div class="kit-bottom">
          <div class="kit-price-wrap"><span class="kit-price-label">Preço do kit</span><span class="kit-price">${money(k.price)}</span></div>
          <button class="btn primary" onclick="addKit(${k.id})">Adicionar ao carrinho</button>
        </div>
      </article>`;
  }).join("");
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
    menu.querySelectorAll("a").forEach(link => link.addEventListener("click",()=>{
      menu.style.display="none";
    }, {once:true}));
  }
});

renderProducts();
renderKits();
renderCart();
