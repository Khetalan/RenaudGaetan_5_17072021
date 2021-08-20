
JSON.parse(localStorage.getItem("panier"))
//console.log(JSON.parse(localStorage.getItem("panier")));

//########################################################################
//########################################################################
//########################################################################

fetch("http://localhost:3000/api/cameras")
    .then(function(response){
        return response.json();
    })
    //Ici je crée et recup le LocalStorage avec PARSE sur mon Items "Panier" (array de product)
    const panierShop = JSON.parse(localStorage.getItem("panier"));

    //Je crée une constante pour définir la section HTML "Shop-list"
    const shopList = document.getElementById("shop-list");
    
    //Boucle FOR pour itéré chaque éléments de mon Panier(const panierShop)
    for (let index = 0; index < panierShop.length; index++) {
        
        const textShop = "";
            //On Inject le HTML pour afficher sur le site + Interpolation pour afficher chaque produits différents
            // + Ajout des petit bouton + et - pour modifier la quantité du produit
            shopList.innerHTML += 
            `<div id="camera${index}" class="card mt-3 mb-3 w-100 p-3">
                <div class="row g-0 align-items-center">
                    <div class="col-md-2">
                        <div class="card-body">
                            <p class="card-text"><strong>ID article :</strong> ${panierShop[index]._id}</p>
                        </div>
                    </div>
                    <div class="col-md-3 ">
                            <img src="${panierShop[index].imageUrl}" class="img-fluid img-thumbnail w-50 rounded-start" alt="...">                        
                    </div>
                    <div class="col-md-3">
                        <div class="card-body">
                            <h5 class="card-title">${panierShop[index].name}</h5>
                        </div>
                        <div>
                            <p class="card-text">${'Prix : ' + (panierShop[index].price / 100) + '€'}</p>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class=" d-flex align-items-center">
                            <button  class="add btn btn-primary btn-sm rounded-circle size-25 m-auto d-flex justify-content-center align-items-center p-0" type="button">+</button>
                            <p class="quantity card-text mb-0"> ${panierShop[index].quantity} </p>
                            <button  class="remove btn btn-primary btn-sm rounded-circle size-25 m-auto d-flex justify-content-center align-items-center p-0" type="button">-</button>
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

//########################################################################
//########################################################################
//########################################################################

//On Injecte la fonction pour le résulat entre le Price*Quantity dans le TEXTE du HTML(A coter du Logo Panier>(0)<)      
document.querySelector('#total').textContent = totalProductPrice();

//########################################################################
//########################################################################
//########################################################################

//Ont défini un LET pour le bouton ADD de CHAQUE ITEMS
let listAddBtn = document.querySelectorAll('.add')

//Ont défini un LET pour le bouton REMOVE de CHAQUE ITEMS
let listRemoveBtn = document.querySelectorAll('.remove')

//Ont défini un LET pour la QUANTITY
let listinfoQuantity = document.querySelectorAll('.quantity')


listAddBtn.forEach((addBtn, index) => {
    //Ajout d'un regard d'évenement sur le clique du bouton (+) ET modification du HTML en consequence
    addBtn.addEventListener('click', (event) => {
        panierShop[index].quantity++;
        window.localStorage.setItem("panier", JSON.stringify(panierShop))
        
        listinfoQuantity[index].innerHTML = panierShop[index].quantity;

        document.querySelector('.info-shop').textContent = getTotalQuantityLocalStorage();
        
        window.location.reload();

    }
)
});
//########################################################################
//########################################################################
//########################################################################

listRemoveBtn.forEach((removeBtn, index) => {
    //Ajout d'un regard d'évenement sur le clique du bouton (-)
    //Condition IF/ELSE pour supprimée un élement du panier "si passage de 2 vers 1   OU    1 vers 0"
    removeBtn.addEventListener('click', (event) => {
        if(panierShop[index].quantity > 1){

            panierShop[index].quantity--;

            listinfoQuantity[index].innerHTML = panierShop[index].quantity;

            window.location.reload();
            
        }else{
            //METHODE -- SPLICE -- pour modifier le contenu d'un tableau avec ajout ou retrait d'un items
            //(possible de vider ou remplacer une parti d'un tableau) 
            panierShop.splice(index, 1)
            let cameraIndex = document.getElementById(`camera${index}`)
            cameraIndex.parentNode.removeChild(cameraIndex)

        }
        //Affichage du panier sur la page après avoir réduit la quantité ou suprimée un ITEMS
        window.localStorage.setItem("panier", JSON.stringify(panierShop))
        document.querySelector('.info-shop').textContent = getTotalQuantityLocalStorage();
        window.location.reload();
        
    })   
});

//########################################################################
//########################################################################
//########################################################################

//----- Bouton "VALIDER LA COMMANDE" + fonction Récup Details du client -----
let sendBtn = document.querySelector('#submit-btn')

sendBtn.addEventListener('click', sendOrderCustomer)