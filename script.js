const url = "https://fakestoreapi.com/products";

document.addEventListener("DOMContentLoaded", function () {
    fetch(url)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            console.log(data);
            data.forEach(function (veri) {
                ekranaYazdir(veri);
            })
        })
});

const row = document.querySelector(".row");
const ekranaYazdir = (veri) => {
    row.innerHTML += `
    <div class="col-4 mb-4">
                <div class="card boyut text-center">
                    <img src="${veri.image}" class="card-img-top resim" alt="...">
                    <div class="card-body">
                      <h5 class="card-title stil">${veri.title}</h5>
                      <p class="card-price pozisyon2 fs-4 fw-bold ">${veri.price}$</p>
                      <a id="addBtn" href="#" class="btn btn-primary pozisyon">Add to Cart</a>
                    </div>
                </div>
    </div>
    `
}


// ! Urunler içerisinde İsme Gore filtreleme Yaptırmak icin ; 
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let searchText = (searchInput.value).trim().toLocaleLowerCase("tr-TR");

    let cards = document.querySelectorAll(".col-4")

    cards.forEach(function (card) {
        let title = card.querySelector(".card-title");

        if (title.innerHTML.trim().toLocaleLowerCase("tr-TR").includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    })
})

// ! Sepete ekle butonuna basildiginda İcon degerinin artması icin;

row.addEventListener("click", function (e) {

    if (e.target.id.includes("addBtn")) {
        const littleBox = document.querySelector(".little-box");
        littleBox.innerHTML++;

        let parentDiv = e.target.parentElement.parentElement;

        sepeteEkle(parentDiv);
    }
});

// ! Sepet icerisindeki islemler
const sepeteEkle = (parentDiv) => {
    const li = document.querySelector(".modal-li");
    const productName = parentDiv.children[1].children[0].innerHTML;
    console.log(productName);

    const price = parentDiv.children[1].children[1].innerHTML;
    console.log(price);

    const image = parentDiv.children[0].src;

    const urunBilgisi = document.createElement("div");
    urunBilgisi.classList.add("ürün-bilgisi", "d-flex", "alight-items-center", "justify-content-around");

    urunBilgisi.innerHTML += `
    <div class="fotograf">
                            <img width="100px" height="100px" src="${image}" alt="">
                    </div>
                    <div class="baslik">${productName}</div>
                    <div class="butonlar">
                            <button id="arttir" class="btn btn-success">+</button>
                            <span class="adet">1</span>
                            <button id="azalt" class="btn btn-danger">-</button>
                        </div>
                        <div class="fiyat">${price}</div>
                    <div class="toplamFiyat">${price}</div>
                        <i id="icon" class="fa-solid fa-x fa-lg fs-3" style="color: #ff0000;"></i>
                        
    `;

    li.append(urunBilgisi);

    // ! Sepet İçerisindeki arttır ve azalt butonlari;
    const arttir = urunBilgisi.querySelector("#arttir");
    const azalt = urunBilgisi.querySelector("#azalt");
    const adet = urunBilgisi.querySelector(".adet");
    const toplamFiyat = urunBilgisi.querySelector(".toplamFiyat");

    arttir.addEventListener("click", function(){
        adet.innerHTML++;
        toplamFiyat.innerHTML = `${(adet.innerHTML * parseFloat(price)).toFixed(2)}$`
    })
    azalt.addEventListener("click", function(){
        if(adet.innerHTML !=0){
            adet.innerHTML--;
            toplamFiyat.innerHTML = `${(adet.innerHTML * parseFloat(price)).toFixed(2)}$`
        }
        if(adet.innerHTML == 0){
            urunBilgisi.remove();
        }
       const littleBox = document.querySelector(".little-box");
        if(littleBox.innerHTML != 0){
            littleBox.innerHTML--;
        }
       
       
        
    })
};

// ! Sepetteki Carpi butonuna bastigimda urunu sildirmek icin

document.addEventListener("click", function(e){
    if(e.target.className.includes("fa-solid")){
        let productElement = e.target.parentElement;
        productElement.remove();

        littleBox = document.querySelector(".little-box");
        if(littleBox.innerHTML != 0){
            littleBox.innerHTML--;
        }
        
       
    }

})


// ! Odev

// Sepet icerisindeki urun adeti 0 a dustugunde urun silinsin
// sepet icerisine eklenen her bir urunun fiyatlarının toplamı en alta yazdirilsin
// dropdown menusunde kategoriye gore tikladigim kategorideki urunler listelensin
// 17.06.2024