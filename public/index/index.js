fetch("http://localhost:3000/api/cameras")
    .then(function(response){
        return response.json();
    })
    .then(function(listCameras){
        const listProducts = document.getElementById("list-products")

        let text = "";


        for (let index = 0; index < listCameras.length; index++) {
            //Recuperation de chaque elements de la liste de cameras//
            const camera = listCameras[index];
            //Preparation du texte à ajoute dans le DOM
            text = text + `<div class="card mt-3 mb-3 size-47">
            <div class="row g-0 align-items-center">
                <div class="col-md-4 ">
                    <a href="../product/product.html?camera=${camera._id}">
                        <img src="${camera.imageUrl}" class="img-fluid rounded-start" alt="...">
                    </a>
                    
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${camera.name}</h5>
                        <p class="card-text">${camera.description}</p>
                        <p class="card-text"><small class="text-muted fs-6">${'Prix : ' + (camera.price / 100) + '€'}</small></p>
                    </div>
                </div>
                </div>
            </div>`;    
        }
        //Ajout du TEXT dans le index.html

        listProducts.innerHTML = text;

    })
