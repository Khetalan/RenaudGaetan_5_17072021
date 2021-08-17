//----- AJOUT DE LA QUANTITER SUR CHAQUE PRODUIT -----
function getTotalQuantityLocalStorage(){
    const panierShop = JSON.parse(window.localStorage.getItem('panier'))

    let quantity = 0;

    panierShop.forEach(product => {
        quantity += product.quantity;
    });
    return quantity;
    
}
//---Pour afficher la quantité du panier dans l'icone PANIER---

document.querySelector('.info-shop').innerHTML = getTotalQuantityLocalStorage();

//----- CALCUL DE PRIX TOTAL DU PANIER -----

function totalProductPrice(){
    const panierShop = JSON.parse(window.localStorage.getItem('panier'))

    //Crée de la variable qui commence à 0 pour la somme de tout les product
    let totalPriceProduct = 0;

    for (let index = 0; index < panierShop.length; index++) {

        const priceProduct = panierShop[index].price * panierShop[index].quantity;

        totalPriceProduct = totalPriceProduct + priceProduct
           
    }
    return totalPriceProduct / 100;
}

//----- CALCUL PRIX PRODUIT COMMANDE ----
function totalOrderProductPrice(){
    const orderShop = JSON.parse(window.sessionStorage.getItem('orderBuy'))

    //Crée de la variable qui commence à 0 pour la somme de tout les product
    let totalPriceProduct = 0;

    for (let index = 0; index < orderShop.products.length; index++) {

        const priceProduct = orderShop.products[index].price * orderShop.products[index].quantity;

        totalPriceProduct = totalPriceProduct + priceProduct
           
    }
    return totalPriceProduct / 100;
}
//----- FONCTION -FETCH POST- POUR ENVOIE FORMULAIRE + PANIER -----
function sendOrderCustomer(e){
    e.preventDefault();
    
    //On défini un LET pour chaque INPUT du FORMULAIRE
    let customerFirstName = document.querySelector("#first-name-customer").value;
    let customerLastName = document.querySelector("#last-name-customer").value;
    let customerAdress = document.querySelector("#adress-customer").value;
    let customerEmail = document.querySelector("#email-customer").value;
    let customerCity = document.querySelector("#city-customer").value;
    let customerZip = document.querySelector("#zip-customer").value;
    let btnRulesForm = document.querySelector("#invalidCheck").checked;
    // on recupere les id de produits
    let panier =JSON.parse(localStorage.getItem('panier'))
    //console.log(panier);

    let tabProductId = []

    panier.forEach(element=> tabProductId.push(element._id))
    
    //console.log(tabProductId);

    const body = {
        contact: {
            firstName: customerFirstName,
            lastName: customerLastName,
            address: customerAdress,
            city: customerCity,
            zip : customerZip,
            email: customerEmail
        },
        products: tabProductId
    }
    //console.log(body);

    fetch('http://localhost:3000/api/cameras/order', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }, 
        body: JSON.stringify(body)})

        /*.then(res => res.json())
        .then(data => console.log(data))
}*/
        .then(function(response) {
            if (btnRulesForm == true) {
                return response.json();
            }
        })
        .then(function(orderBuy) { 
            window.sessionStorage.setItem('orderBuy', JSON.stringify(orderBuy));
            //localStorage.clear();
            if (orderBuy == null) {
                alert('CECI APPARAIT  -- TES DANS LA MERDE')
            }else{
                //alert("WIIIIIIIIIIIIIIIINNNNNNNNNNNNNNNNNNNNNNNNNEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRRRRR")         
                window.location.assign("http://127.0.0.1:5500/RenaudGaetan_5_17072021/public/order/order.html");
                //window.localStorage.clear();
                console.log(orderBuy);
            }
            
        })
        .catch(function(error) { 
            console.error(error)
        });
}



