const cafeList = document.querySelector('#cafe-list');

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

db.collection('cafes')
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      renderCafe(doc);
    });
  });
