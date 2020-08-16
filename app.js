const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element and render
function renderCafe(doc) {
  let listCafe = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let deleteEle = document.createElement('div');

  listCafe.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  deleteEle.textContent = 'X';

  listCafe.appendChild(name);
  listCafe.appendChild(city);
  listCafe.appendChild(deleteEle);

  cafeList.appendChild(listCafe);

  // Delete data
  deleteEle.addEventListener('click', e => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');

    // find data and delete
    db.collection('cafes').doc(id).delete();
  });
}

// Get data from firebase
// db.collection('cafes')
// .where('city', '==', 'Marioland')
// .orderBy('name')
// .get()
// .then(snapshot => {
//   snapshot.docs.forEach(doc => {
//     renderCafe(doc);
//   });
// });

// DB Snapshot (realtime listener, when something has changed)
// We're going to fire this function
db.collection('cafes')
  .orderBy('city')
  .onSnapshot(snapshot => {
    let changed = snapshot.docChanges();
    changed.forEach(change => {
      if (change.type == 'added') {
        renderCafe(change.doc);
      } else if (change.type == 'removed') {
        let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
        cafeList.removeChild(li);
      }
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
