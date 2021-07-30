let url = new URL(window.location.href);

let search_params = url.searchParams.get('camera');

fetch(`http://localhost:3000/api/cameras/${search_params}`)
    .then(function(response){
        return response.json();
    })
    .then(function(camera){
        console.log(camera);

        const productTarget = document.getElementById("product-target")

        const lenses = camera.lenses;
        lenses.forEach(lense => {
            
        });

        productTarget.innerHTML = 
            `<div class="card mt-3 mb-3 size-47">
                <div class="row g-0 align-items-center">
                    <div class="col-md-4 ">
                            <img src="${camera.imageUrl}" class="img-fluid rounded-start" alt="...">                        
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${camera.name}</h5>
                            <p class="card-text">${camera.description}</p>
                            <div class="dropdown">
                                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown link
                                </a>

                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                            <p class="card-text"><small class="text-muted fs-6">${'Prix : ' + (camera.price / 100) + '€'}</small></p>
                        </div>
                    </div>
                </div>
            </div>`
    })