const properties = [
  {title:"Villa moderne avec piscine",type:"Maison",deal:"Vente",location:"Cocody, Abidjan",price:185000000,rooms:"5 pièces",area:"320 m²",image:"https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80"},
  {title:"Appartement haut standing",type:"Appartement",deal:"Location",location:"Riviera 4, Abidjan",price:1200000,rooms:"3 pièces",area:"145 m²",image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80"},
  {title:"Terrain résidentiel",type:"Terrain",deal:"Vente",location:"Bingerville",price:65000000,rooms:"—",area:"600 m²",image:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80"},
  {title:"Maison familiale",type:"Maison",deal:"Vente",location:"Deux-Plateaux, Abidjan",price:145000000,rooms:"6 pièces",area:"280 m²",image:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80"},
  {title:"Bureau lumineux",type:"Bureau",deal:"Location",location:"Plateau, Abidjan",price:2500000,rooms:"8 bureaux",area:"210 m²",image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"},
  {title:"Appartement 2 chambres",type:"Appartement",deal:"Location",location:"Marcory, Abidjan",price:650000,rooms:"3 pièces",area:"95 m²",image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80"}
];

let currentDeal = "Vente";
const grid = document.getElementById("propertyGrid");

function money(n){ return new Intl.NumberFormat("fr-FR").format(n) + " FCFA"; }

function render(list){
  grid.innerHTML = list.map(p => `
    <article class="property">
      <div class="property-img" style="background-image:url('${p.image}')"><span class="badge">${p.deal}</span></div>
      <div class="property-body">
        <h3>${p.title}</h3>
        <p class="location">${p.location}</p>
        <div class="price">${money(p.price)}${p.deal==="Location" ? " / mois" : ""}</div>
        <div class="meta"><span>⌂ ${p.rooms}</span><span>□ ${p.area}</span></div>
      </div>
    </article>`).join("");
  document.getElementById("resultsInfo").textContent = `${list.length} annonce${list.length>1?"s":""} affichée${list.length>1?"s":""}`;
}
render(properties);

document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  tab.classList.add("active"); currentDeal = tab.dataset.type;
}));

document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  const type = document.getElementById("propertyType").value;
  const loc = document.getElementById("location").value.toLowerCase().trim();
  const budget = Number(document.getElementById("budget").value);
  const results = properties.filter(p =>
    p.deal===currentDeal &&
    (type==="Tous" || p.type===type) &&
    (!loc || p.location.toLowerCase().includes(loc)) &&
    (!budget || p.price<=budget)
  );
  render(results);
  document.getElementById("annonces").scrollIntoView({behavior:"smooth"});
});

document.getElementById("resetFilters").addEventListener("click", () => {
  document.getElementById("propertyType").value="Tous";
  document.getElementById("location").value="";
  document.getElementById("budget").value="";
  render(properties);
});

document.querySelector(".menu-btn").addEventListener("click", () => document.querySelector(".nav-links").classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav-links").classList.remove("open")));

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("contactMessage").textContent="Merci ! Votre message a bien été préparé. Connectez ce formulaire à votre email ou CRM pour recevoir les demandes.";
  e.target.reset();
});
document.getElementById("year").textContent = new Date().getFullYear();
