//obtengo contenedor de search form
const searchContainer = document.getElementById('custom__search-filter');

//window Width and mobile display
const windowWidth = window.innerWidth;
const $form = document.querySelector('#cs__advanced-filter');
const showfilterBtn = document.querySelector('#cs__filtros-mobile');
const isMobile = windowWidth < 901;

if (isMobile) {
  $form.classList.add('cs_mobile-hidden');
}

showfilterBtn.addEventListener('click', showFilterMobile);

function showFilterMobile() {
  $form.classList.toggle('cs_mobile-hidden');
}

//defino categorias para filtros: features, type, guests, check-in-out
const propertyBedrooms = [1, 2, 3, 4, 5, 6, 7, 8];
const propertyFeatures = [
  { name: 'Aire Acondicionado', slug: 'aire-acondicionado' },
  { name: 'Alarma', slug: 'alarma' },
  { name: 'Apto grupos de jóvenes', slug: 'apto-grupos-de-jovenes' },
  { name: 'Apto mascotas', slug: 'apto-mascotas' },
  { name: 'Casa independiente', slug: 'casa-independiente' },
  { name: 'Cerro Catedral', slug: 'cerro-catedral' },
  { name: 'Cochera opcional (con cargo)', slug: 'cochera-opcional-con-cargo' },
  { name: 'Cochera techada', slug: 'cochera-techada' },
  { name: 'Costa del lago', slug: 'costa-del-lago' },
  { name: 'Departamento / PH / Complejo', slug: 'departamento-ph-complejo' },
  { name: 'Dina Huapi', slug: 'dina-huapi' },
  {
    name: 'Estacionamiento al aire libre',
    slug: 'estacionamiento-al-aire-libre',
  },
  { name: 'Hogar a leña', slug: 'hogar-a-lena' },
  { name: 'Lavarropas', slug: 'lavarropas' },
  { name: 'Parrilla', slug: 'parrilla' },
  { name: 'Patio / jardín', slug: 'patio-jardin' },
  { name: 'Pileta / Jacuzzu interior', slug: 'jacuzzi-interior' },
  { name: 'Piscina / Jacuzzi exterior', slug: 'piscina-jacuzzi-exterior' },
  { name: 'Quincho', slug: 'quincho' },
  {
    name: 'Servicio de limpieza incluido',
    slug: 'servicio-de-limpieza-incluido',
  },
  { name: 'Vista al lago', slug: 'vista-al-lago' },
];

const propertyValues = [
  'Sin especificar',
  10000,
  20000,
  30000,
  40000,
  50000,
  100000,
  150000,
  200000,
  250000,
  300000,
  350000,
  400000,
  450000,
  500000,
];

const propertyGuests = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const propertyBathrooms = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const propertyLocations = [
  {
    name: 'Bariloche',
    slug: 'bariloche',
  },
  {
    name: 'San Martín de los Andes',
    slug: 'san-martin-de-los-andes',
  },
  {
    name: 'Villa La Angostura',
    slug: 'villa-la-angostura',
  },
  /* {
    name: 'El Bolsón',
    slug: 'el-bolson',
  }, */
];

//defino variable para contenido de filtros
let body = '';
let body2 = '';

//lista de features
for (let feature of propertyFeatures) {
  let { name } = feature;
  let { slug } = feature;
  //console.log(slug)

  body += `
                <div>${name}</div>
            `;
}

///////////////////////
const initialSelectedValues = window.location.href;
const initualQuerys = new URLSearchParams(window.location.search);

console.log(initualQuerys.toString());

let newUrl = new URL(initialSelectedValues).searchParams.forEach((x, y) =>
  document
    .getElementsByName(y)
    .forEach((p) =>
      p.type === 'checkbox' ? (p.checked = x === 'true') : (p.value = x)
    )
);

const checkboxes = document.querySelector('.checkboxes');
let checkboxesContent = '';

for (let feature of propertyFeatures) {
  let { name, slug } = feature;
  checkboxesContent += `
                <label><input type="checkbox" name="features" value=${slug} id=${slug}>${name}</label>
            `;
}
checkboxes.innerHTML = checkboxesContent;

// for(const [key,val] of initualQuerys) {
//     if(key.includes("features") && document.getElementById(val)) {
//         console.log(key, val);
//         document.getElementById(val).checked = true
//     }
// }

///////////////selects
const selectMaxPrice = document.getElementById('cs__max-price');
let optionsPropertyValues = '';

for (let priceValue of propertyValues) {
  let value, name;
  if (isNaN(priceValue)) {
    value = null;
    name = priceValue;
  } else {
    value = priceValue;
    name = `$${priceValue.toLocaleString()}`;
  }
  optionsPropertyValues += `
                <option name="max-price" id=${value} value=${value}>${name}</option>
            `;
}
selectMaxPrice.innerHTML = optionsPropertyValues;

const selectGuests = document.getElementById('cs__guests');
let optionsGuests = '';
for (let guests of propertyGuests) {
  optionsGuests += `
                <option name="guests" id=${guests} value=${guests}>${guests}</option>
            `;
}
selectGuests.innerHTML = optionsGuests;

const selectBathrooms = document.getElementById('cs__bathrooms');
let optionsBathrooms = '';
for (let bathrooms of propertyBathrooms) {
  optionsBathrooms += `
                <option name="Bathrooms" id=${bathrooms} value=${bathrooms}>${bathrooms}</option>
            `;
}
selectBathrooms.innerHTML = optionsBathrooms;

const selectBedrooms = document.getElementById('cs__bedrooms');
let optionsBedrooms = '';
for (let bedroom of propertyBedrooms) {
  optionsBedrooms += `
                <option name="bedrooms" id=${bedroom} value=${bedroom}>${bedroom}</option>
            `;
}
selectBedrooms.innerHTML = optionsBedrooms;

const selectLocations = document.getElementById('cs__location');
let optionsLocations = '';
for (let location of propertyLocations) {
  let { name, slug } = location;
  optionsLocations += `
                <option name="location" id=${slug} value=${slug}>${name}</option>
            `;
}
selectLocations.innerHTML = optionsLocations;

for (const [key, val] of initualQuerys) {
  if (key.includes('features') && document.getElementById(val)) {
    console.log(key, val);
    document.getElementById(val).checked = true;
  }
  if (key.includes('max-price') && document.getElementById(val)) {
    selectMaxPrice.value = val;
  }
  if (key.includes('guests') && document.getElementById(val)) {
    selectGuests.value = val;
  }
  if (key.includes('bathrooms') && document.getElementById(val)) {
    selectBathrooms.value = val;
  }
  if (key.includes('bedrooms') && document.getElementById(val)) {
    selectBedrooms.value = val;
  }
  if (key.includes('location') && document.getElementById(val)) {
    selectLocations.value = val;
  }
}

//dropdown, only mobile

$form.addEventListener('submit', (event) => {
  event.preventDefault();
  let data = {};
  const formData = new FormData($form);
  let urlParams = new URLSearchParams(formData);

  //console.log(formData)
  let url = 'https:%2F%2Fbari-rent.prowebsite.shop/rentals-search/?guests=5';
  let queryParams = new URLSearchParams(
    urlParams
  ).toString(); /* .toString().replaceAll("features", "features%5B%5D") */

  if (queryParams.includes('features')) {
    queryParams = queryParams.replaceAll('features', 'features%5B%5D');
  }

  if (queryParams.includes('type')) {
    queryParams = queryParams.replaceAll('type', 'type%5B%5D');
  }

  if (queryParams.includes('location')) {
    queryParams = queryParams.replaceAll('location', 'location%5B%5D');
  }

  /*  if (queryParams.includes("bedrooms")) {
                console.log("funciona")
            } */
  //queryParams.set("myParam", "myValue");

  //history.replaceState(null, null, "?"+ queryParams.toString().replaceAll("features", "features%5B%5D"));

  /* formData.forEach((value, key) => {
                queryParams = `${queryParams}&${key}=${value}`
                //queryParams.set(key, value)
            }); */

  console.log('query params:', queryParams);
  window.location.search = queryParams;
});
