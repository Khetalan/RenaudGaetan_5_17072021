//########################################################################
//########################################################################
//########################################################################

//----- AJOUT DE LA QUANTITER SUR CHAQUE PRODUIT -----
function getTotalQuantityLocalStorage(){
    const panierShop = JSON.parse(window.localStorage.getItem('panier'))

    let quantity = 0;
    if (panierShop == null) {
        return 0;
    }else{
        panierShop.forEach(product => {
        quantity += product.quantity;
    });
    return quantity;
    }
}

//########################################################################
//########################################################################
//########################################################################

//---Pour afficher la quantité du panier dans l'icone PANIER---

document.querySelector('.info-shop').innerHTML = getTotalQuantityLocalStorage();

//########################################################################
//########################################################################
//########################################################################

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

//########################################################################
//########################################################################
//########################################################################

//----- CALCUL PRIX PRODUIT COMMANDE ----
function totalOrderProductPrice(){
    const orderShop = JSON.parse(window.sessionStorage.getItem('orderBuy'))

    //Crée de la variable qui commence à 0 pour la somme de tout les product
    let totalPriceProduct = 0;

    for (let index = 0; index < orderShop.contact.basket.length; index++) {

        const priceProduct = orderShop.contact.basket[index].price * orderShop.contact.basket[index].quantity;

        totalPriceProduct = totalPriceProduct + priceProduct
           
    }
    return totalPriceProduct / 100;
}

//########################################################################
//########################################################################
//########################################################################

//----- FONCTION -FETCH POST- POUR ENVOIE FORMULAIRE + PANIER -----
function sendOrderCustomer(e){
    
    e.preventDefault();

    const orderForm = document.getElementById('orderForms');

    orderForm.classList.add('was-validated')

    if (!orderForm.checkValidity()) {
        alert("Vous n'avez pas fini de remplir le formulaire ou \"Accepter les Termes et conditions\" !")
        return;
    }

    //On défini un LET pour le CHECKBOX (Agree Terms) du Formulaire
    
    let btnRulesForm = document.querySelector("#invalidCheck").checked;


    // on recupere les id de produits
    let panier =JSON.parse(localStorage.getItem('panier'))
    //console.log(panier);

    let tabProductId = []

    panier.forEach(element=> tabProductId.push(element._id))

    console.log(tabProductId);

    const body = {
        contact: {
            firstName: document.querySelector("#first-name-customer").value,
            lastName: document.querySelector("#last-name-customer").value,
            address: document.querySelector("#adress-customer").value,
            city: document.querySelector("#city-customer").value,
            zip : document.querySelector("#zip-customer").value,
            email: document.querySelector("#email-customer").value,
            basket : panierShop
        },
        products: tabProductId
    }
    console.log(body);

    fetch('http://localhost:3000/api/cameras/order', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }, 
        body: JSON.stringify(body)})

        .then(function(response) {
            if (btnRulesForm == true) {
                return response.json();
            }
        })
        .then(function(orderBuy) { 
            window.sessionStorage.setItem('orderBuy', JSON.stringify(orderBuy));
            //localStorage.clear();
            if (orderBuy == null) {
                alert("Vous n'avez pas fini de remplir le formulaire !")
            }else{
                window.location.assign("http://127.0.0.1:5500/RenaudGaetan_5_17072021/public/order/order.html");
                window.localStorage.clear();
                console.log(orderBuy);
            }
        })
        .catch(function(error) { 
            console.error(error)
        });
}



