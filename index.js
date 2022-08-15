
        //obtengo contenedor de search form
        const searchContainer = document.getElementById("custom__search-filter");
        
        //defino categorias para filtros: features, type, guests, check-in-out
        const propertyTypes = ["casa", "departamento"];
        const propertyFeatures = [
            {name: "Aire Acondicionado", slug: "aire-acondicionado"},
            {name: "Alarma", slug: "alarma"},
            {name: "Apto grupos de jóvenes", slug: "apto-grupos-de-jovenes"},
            {name: "Apto mascotas", slug: "apto-mascotas"},
            {name: "Casa independiente", slug: "casa-independiente"},
            {name: "Cerro Catedral", slug: "cerro-catedral"},
            {name: "Cochera opcional (con cargo)", slug: "cochera-opcional-con-cargo"},
            {name: "Cochera techada", slug: "cochera-techada"},
            {name: "Costa del lago", slug: "costa-del-lago"},
            {name: "Departamento / PH / Complejo", slug: "departamento-ph-complejo"},
            {name: "Dina Huapi", slug: "dina-huapi"},
            {name: "Estacionamiento al aire libre", slug: "estacionamiento-al-aire-libre"},
            {name: "Hogar a leña", slug: "hogar-a-lena"},
            {name: "Lavarropas", slug: "lavarropas"},
            {name: "Parrilla", slug: "parrilla"},
            {name: "Patio / jardín", slug: "patio-jardin"},
            {name: "Pileta / Jacuzzu interior", slug: "jacuzzi-interior"},
            {name: "Piscina / Jacuzzi exterior", slug: "piscina-jacuzzi-exterior"},
            {name: "Quincho", slug: "quincho"},
            {name: "Servicio de limpieza incluido", slug: "servicio-de-limpieza-incluido"},
            {name: "Vista al lago", slug: "vista-al-lago"}
        ]

        const propertyValues = [
            "Sin especificar", 10000, 20000, 30000, 40000, 50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000
        ]

        const propertyGuests = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

        const propertyBathrooms = [1,2,3,4,5,6,7,8,9,10]

        //defino variable para contenido de filtros
        let body = "";
        let body2 = ""

        //lista de features
        for (let feature of propertyFeatures) {
            let {name} = feature;
            let {slug} = feature
            //console.log(slug)

            body += `
                <div>${name}</div>
            `
        }


        ///////////////////////
        const $form = document.querySelector('#cs__advanced-filter');
        const initialSelectedValues = window.location.href;
        const initualQuerys = new URLSearchParams(window.location.search)

        console.log(initualQuerys.toString())


           

        let newUrl = (new URL(initialSelectedValues)).searchParams.forEach((x, y) =>
        document.getElementsByName(y).forEach(p => p.type === "checkbox" ? p.checked = (x === "true") : p.value = x));
        
        
        const checkboxes = document.querySelector(".checkboxes");
        let checkboxesContent = "";

        for (let feature of propertyFeatures) {
            let {name, slug} = feature;
            checkboxesContent += `
                <label><input type="checkbox" name="features" value=${slug} id=${slug}>${name}</label>
            `
        }
        checkboxes.innerHTML = checkboxesContent 

        // for(const [key,val] of initualQuerys) {
        //     if(key.includes("features") && document.getElementById(val)) {
        //         console.log(key, val);
        //         document.getElementById(val).checked = true 
        //     }            
        // }

        ///////////////selects
        const selectMaxPrice = document.getElementById("cs__max-price");
        let optionsPropertyValues = ""

        for (let priceValue of propertyValues) {
            let value, name
            if (isNaN(priceValue)) {
                value = null;
                name = priceValue
            } else {
                value = priceValue;
                name = `$${priceValue.toLocaleString()}`
            }
            optionsPropertyValues += `
                <option name="max-price" id=${value} value=${value}>${name}</option>
            `
        }
        selectMaxPrice.innerHTML = optionsPropertyValues;

        const selectGuests = document.getElementById("cs__guests");
        let optionsGuests = ""
        for (let guests of propertyGuests) {
            optionsGuests += `
                <option name="guests" id=${guests} value=${guests}>${guests}</option>
            `
        }
        selectGuests.innerHTML = optionsGuests;

        const selectBathrooms = document.getElementById("cs__bathrooms");
        let optionsBathrooms = ""
        for (let bathrooms of propertyBathrooms) {
            optionsBathrooms += `
                <option name="Bathrooms" id=${bathrooms} value=${bathrooms}>${bathrooms}</option>
            `
        }
        selectBathrooms.innerHTML = optionsBathrooms;

        const selectType = document.getElementById("cs__type");
        let optionsType = ""
        for (let type of propertyTypes) {
            let nameType = type.charAt(0).toUpperCase() + type.slice(1);
            optionsType += `
                <option name="Type" id=${type} value=${type}>${nameType}</option>
            `
        }
        selectType.innerHTML = optionsType;



        for(const [key,val] of initualQuerys) {
            if(key.includes("features") && document.getElementById(val)) {
                console.log(key, val);
                document.getElementById(val).checked = true 
            }   
            if (key.includes("max-price") && document.getElementById(val)) {
                selectMaxPrice.value = val
            }     
            if (key.includes("guests") && document.getElementById(val)) {
                selectGuests.value = val
            } 
            if (key.includes("bathrooms") && document.getElementById(val)) {
                selectBathrooms.value = val
            }  
            if (key.includes("type") && document.getElementById(val)) {
                selectType.value = val
            }  
        }
        



        $form.addEventListener('submit', (event) => {
            event.preventDefault();
            let data = {};
            const formData = new FormData($form);
            let urlParams = new URLSearchParams(formData)

            //console.log(formData)
            let url = "https:%2F%2Fbari-rent.prowebsite.shop/rentals-search/?guests=5"
            let queryParams = new URLSearchParams(urlParams).toString()/* .toString().replaceAll("features", "features%5B%5D") */;

            if (queryParams.includes("features")) {
                queryParams = queryParams.replaceAll("features", "features%5B%5D")
                console.log("incluye")
            }

            if (queryParams.includes("type")) {
                queryParams = queryParams.replaceAll("type", "type%5B%5D")
            }
            //queryParams.set("myParam", "myValue");

            //history.replaceState(null, null, "?"+ queryParams.toString().replaceAll("features", "features%5B%5D"));


            
            /* formData.forEach((value, key) => {
                queryParams = `${queryParams}&${key}=${value}`
                //queryParams.set(key, value)
            }); */

            console.log("query params:", queryParams)
            window.location.search = queryParams
            
        });


