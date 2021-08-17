
//Ici je recup le LocalStorage avec PARSE sur mon Items "orderBuy" (array de product)
const orderShop = JSON.parse(sessionStorage.getItem("orderBuy"));
console.log(orderShop);

//ICI Je crée une liaision avec mon HTML 
const orderCustomer = document.querySelector('#detail-customer')
console.log(orderCustomer);

//ICI j'injecte mon HTML avec les donnée de "orderBuy"
orderCustomer.innerHTML = 
    `<div id="detail-customer" class="d-flex row">
    <p>Votre commande viens d'être confirmée <span class="bg-orinoco">${orderShop.contact.firstName} ${orderShop.contact.lastName}</span> !</p>
    <p>Numéro de commande : <span class="bg-orinoco">${orderShop.orderId}</span></p>
    <p class="px-3">Adresse de Livraison :<br><span class=" card w-25 bg-orinoco">${orderShop.contact.lastName}<br>${orderShop.contact.firstName}<br>${orderShop.contact.address}<br>${orderShop.contact.zip}<br>${orderShop.contact.city}</span></p>
    </div>`
;
//----- FONCTION VALIDATION FORMULAIRE -----

// Example starter JavaScript for disabling form submissions if there are invalid fields
/*(function validDetailCustomer() {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()*/


//---------------------------------------

//----- FONCTION AFFICHAGE RESUMER COMMANDE -----

//Ici je crée et recup le LocalStorage avec PARSE sur mon Items "Panier" (array de product)
const panierShop = JSON.parse(localStorage.getItem("panier"));

//Je crée une constante pour définir la section HTML "order-buy"
const orderList = document.querySelector("#order-buy");

//Boucle FOR pour itéré chaque éléments de mon Panier(const panierShop)
for (let index = 0; index < panierShop.length; index++) {
        
    //Je défini chaque([index]) ITEM ou produit (buying) du panier (panierShop)
    //const buying = panierShop[index];

    //console.log(buying)

    
    //On Inject le HTML pour afficher sur le site + Interpolation pour afficher chaque produits différents
    
    orderList.innerHTML += 
    `<div id="camera${index}" class="card w-100">
        <div class="row g-0 align-items-center justify-content-center">
            <div class="col-md-3 ">
                <div class="card-text">
                    <h5 class="card-title">${panierShop[index].name}</h5>
                </div>                    
            </div>
            <div class="col-md-3">
                <div>
                    <p class="card-text">${'Prix : ' + (panierShop[index].price / 100) + '€'}</p>
                </div>
            </div>
            <div class="col-md-2">
                <div class=" d-flex align-items-center justify-content-center">
                    <p class="quantity card-text mb-0"> Qty : ${panierShop[index].quantity} </p>
                </div>
            </div>
            <div class="col-md-2">
                <div>
                    <p class="total card-text">${'Total : ' + (panierShop[index].price / 100) * panierShop[index].quantity + '€'}</p>
                </div>
            </div>
        </div>
    </div>`;
}
document.querySelector('#total').textContent = totalProductPrice();


//----------------------------------------------------------------------
 let indexReturn = document.querySelector('#indexReturn');
 let indexBtn = document.querySelector('#indexBtn');
 let logoBtn = document.querySelector('#logoBackIndex');
 
//-----Fonction RETOUR ACCUEIL + LOCALSTORAGE CLEAR -----
function backClearLocalStorage(){
    window.location.assign("http://127.0.0.1:5500/RenaudGaetan_5_17072021/public/index/index.html");
    window.localStorage.clear()
    window.sessionStorage.clear();
}
indexReturn.addEventListener('click', backClearLocalStorage);
indexBtn.addEventListener('click', backClearLocalStorage);
logoBtn.addEventListener('click', backClearLocalStorage);