const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element and render
function renderCafe(doc) {
  let listCafe = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');

  listCafe.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;

  listCafe.appendChild(name);
  listCafe.appendChild(city);

  cafeList.appendChild(listCafe);
}

// Get data from firebase
db.collection('cafes')
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      renderCafe(doc);
    });
  });

// Saving data to firestore
form.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('cafes').add({
    name: form.name.value,
    city: form.city.value,
  });

  form.name.value = '';
  form.city.value = '';
});
