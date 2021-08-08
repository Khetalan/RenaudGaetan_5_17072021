/*const addShop = () => {
    let listShop = document.getElementById('shop-list')
    let product = localStorage.getItem('produit')

    if(produit == null){
        shop-listShop.innerHTML = `
        Votre panier est vide !`;
    }
}*/

JSON.parse(localStorage.getItem("panier"))
console.log(JSON.parse(localStorage.getItem("panier"))
);
fetch("http://localhost:3000/api/cameras")
    .then(function(response){
        return response.json();
    })
    //Ici je crée et recup le LocalStorage avec PARSE sur mon Items "Panier" (array de product)
    const panierShop = JSON.parse(localStorage.getItem("panier"));

    //Je crée une constante pour définir la section HTML "Shop-list"
    const shopList = document.getElementById("shop-list")
    
    //Boucle FOR pour itéré chaque éléments de mon Panier(const panierShop)
    for (let index = 0; index < panierShop.length; index++) {
        
        //Je défini chaque([index]) ITEM ou produit (buying) du panier (panierShop)
        const buying = panierShop[index];

        console.log(buying)

        
        const textShop = "";
            //On Inject le HTML pour afficher sur le site + Interpolation pour afficher chaque produits différents
            // + Ajout des petit bouton + et - pour modifier la quantité du produit
            shopList.innerHTML += 
            `<div id="camera${index}" class="card mt-3 mb-3 w-100 p-3">
                <div class="row g-0 align-items-center">
                    <div class="col-md-2">
                        <div class="card-body">
                            <p class="card-text">ID article : ${panierShop[index]._id}</p>
                        </div>
                    </div>
                    <div class="col-md-3 ">
                            <img src="${panierShop[index].imageUrl}" class="img-fluid img-thumbnail rounded-start" alt="...">                        
                    </div>
                    <div class="col-md-3">
                        <div class="card-body">
                            <h5 class="card-title">${panierShop[index].name}</h5>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class=" d-flex align-items-center">
                            <button id="add${index}" class="btn btn-primary btn-sm rounded-circle size-25 d-flex justify-content-center align-items-center p-0" type="button">+</button>
                            <p id="quantity${index}"class="card-text mb-0">${panierShop[index].quantity}</p>
                            <button id="remove${index}" class="btn btn-primary btn-sm rounded-circle size-25 d-flex justify-content-center align-items-center p-0" type="button">-</button>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div>
                            <p class="card-text">${'Total : ' + (panierShop[index].price / 100) + '€'}</p>
                        </div>
                    </div>
                </div>
            </div>`;

            //Ont défini un LET pour le bouton ADD de CHAQUE ITEMS
            let addBtn = document.getElementById(`add${index}`)
            //Ont défini un LET pour le bouton REMOVE de CHAQUE ITEMS
            let removeBtn = document.getElementById(`remove${index}`)

            //Ajout d'un regard d'évenement sur le clique du bouton (+) ET modification du HTML en consequence
            addBtn.addEventListener('click', (event) => {
                    panierShop[index].quantity++;
                    window.localStorage.setItem("panier", JSON.stringify(panierShop))
                    document.getElementById(`quantity${index}`).innerHTML = panierShop[index].quantity;
                }
            )

            //Ajout d'un regard d'évenement sur le clique du bouton (-)
            //Condition IF/ELSE pour supprimée un élement du panier "si passage de 2 vers 1   OU    1 vers 0"
            removeBtn.addEventListener('click', (event) => {
                    if(panierShop[index].quantity > 1){

                        panierShop[index].quantity--;

                        document.getElementById(`quantity${index}`).innerHTML = panierShop[index].quantity;

                    }else{
                        //METHODE -- SPLICE -- pour modifier le contenu d'un tableau avec ajout ou retrait d'un items
                        //(possible de vider ou remplacer une parti d'un tableau) 
                        panierShop.splice(index, 1)
                        let cameraIndex = document.getElementById(`camera${index}`)
                        cameraIndex.parentNode.removeChild(cameraIndex)
                    }
                    //Affichage du panier sur la page après avoir réduit la quantité ou suprimée un ITEMS
                    window.localStorage.setItem("panier", JSON.stringify(panierShop))
                }
            )
        }

