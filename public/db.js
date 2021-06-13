/*!!!!BOILER CODE ONLY!!!! */
let db;
let atable;

// Create a new db request for a "budget" database.
const request = indexedDB.open('atabel', atable || 21);

//check database
function checkDatabase() {

  // If the request was successful
  getAll.onsuccess = function () {
  };
}

request.onsuccess = function (e) {
  console.log('success');
  db = e.target.result;

  // Check if app is online before reading from db
  //here ===>
};

const saveRecord = (record) => {
  console.log('Save record invoked');

  //add a bunch of code here
  
  store.add(record);
};

// Listen for app coming back online
window.addEventListener('online', checkDatabase);
