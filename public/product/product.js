// Ont determine l'adresse URL via le '_id' de l'API
let url = new URL(window.location.href);

let search_params = url.searchParams.get('camera');

fetch(`http://localhost:3000/api/cameras/${search_params}`)
    .then(function(response){
        return response.json();
    })
    .then(function(camera){
        //Ont défini une variable qui représente notre <Section> HTML
        const productTarget = document.getElementById("product-target")
        
        //On Défini à quoi correspond la variable "Lenses" avec les donnée de l'API
        const lenses = camera.lenses;
        
        //Ont Défini une variable vide pour ajouter les "Données des Lentilles" avec interpolation
        let text = "";

        //Ont Crée une boucle For EACH pour itéré un nouveau texte pour chaque donnée reçus de l'API (Différente Lentilles)
        lenses.forEach((l,index) => {
            text = text + `<option value="${l}">${l}</option>`  
        });
        
        //On insère le code HTML dans le fichier HTML avec les Interpolation des données de L'API
        productTarget.innerHTML = 
            `<div class="card mt-3 mb-3 w-75 p-3">
                <div class="row g-0 align-items-center">
                    <div class="col-md-4 ">
                            <img src="${camera.imageUrl}" class="img-fluid img-thumbnail rounded-start" alt="...">                        
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${camera.name}</h5>
                            <p class="card-text">${camera.description}</p>
                            <select class="form-select" aria-label="Options Lentilles :">
                                ${text}
                            </select>
                            <p class="card-text mt-3"><small class="text-muted fs-6">${'Prix : ' + (camera.price / 100) + '€'}</small></p>
                            <button class="btn bg-orinoco btn-lg addShop" type="button">Ajouter au panier</button>
                            
                        </div>
                        <a href="../index/index.html"><button type="button" class="btn btn-primary mt-4">Continuer mes Achats</button></a>
                    </div>
                </div>
                </div>`


                //Bouton(addShop) + Fonction qui ajoute le produit dans le "LocalStorage"//
                    //Ont va chercher le Bouton sur lequel ont doit "cliquer" pour ajouter au panier//
                let addShop = document.querySelector('.addShop');

                    //Ont verifie que le bouton s'affiche bien dans la console
                    //console.log(addShop);

                    //Ont défnie un evement ('click') sur le bouton 
                    addShop.addEventListener('click', () => {

                        //AJOUT DU PRODUIT EN LocalStorage + conversion JSON)
                        //localStorage.setItem(camera.name, JSON.stringify(camera))

                        //ETAPE 1 = es-ce qu'il existe au sein du LocalStorage
                        //un Item ayant pour nom "panier" ?
                        let prodBuyJSON = localStorage.getItem('panier')

                        //ETAPE 2 = Si existe pas ont le crée (valeur = array vide)
                        if(!prodBuyJSON){
                            localStorage.setItem('panier', JSON.stringify([]))
                            
                            prodBuyJSON = localStorage.getItem('panier')
                            
                        }
                        //ETAPE 3 = Ajouter (avec .push) une valeur supplémentaire à l'Array
                        let prodBuy = JSON.parse(prodBuyJSON)
                        //Permet de chercher et de trouver l'index du produit qui répond à la condition à l'intérieur
                        //(Ont regarde si un element au sein de prodBuy à le même _ID que camera._id)
                        let prodIndex = prodBuy.findIndex(function(element){
                            return element._id == camera._id;
                        })
                        //Condition d'ajout avec le bouton + du panierShop
                        if(prodIndex == -1){
                            camera.quantity = 1;
                            prodBuy.push(camera)
                        }else{
                            prodBuy[prodIndex].quantity++;
                        }
                        

                        //ETAPE 4 = Set à nouveau le nouvelle ITEM (panier) dans le LocalStorage
                        localStorage.setItem('panier', JSON.stringify(prodBuy))

                        //ETAPE 5 = Actualisé la page pour mettre à jour le panier

                        window.location.reload();

                    })       
    })
    .catch(function(error) { 
        console.error(error)
    });
