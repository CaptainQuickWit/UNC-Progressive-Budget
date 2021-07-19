/*!!!!BOILER CODE ONLY!!!! */
let dataBase;
let atable;

// Create a new db request for a "budget" database.
const request = indexedDB.open('atabel', atable || 21);

request.onupgradeneeded = function (e) {
  console.log('Upgrade needed in IndexDB');

  const { oldVersion } = e;
  const newVersion = e.newVersion || db.version;

  db = e.target.result;


  if (dataBase.objectStoreNames.length === 0) {
    dataBase.createObjectStore('BudgetStore', { autoIncrement: true });
  }
}

//check database
function checkDatabase() {

  let transaction = db.transaction(['BudgetStore'], 'readwrite');








  const store = transaction.objectStore('BudgetStore');

  // retrieves all records
  const getAll = store.getAll();

  // If the request was successful
  getAll.onsuccess = function () {

    if (getAll.result.length > 0) {

      fetch('/api/transaction/bulk', {

        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },

      })
        .then((response) => response.json())
        .then((res) => {
 
          if (res.length !== 0) {

            transaction = db.transaction(['BudgetStore'], 'readwrite');


            const currentStore = transaction.objectStore('BudgetStore');


            currentStore.clear();

            console.log('done');
          }
        });


  };
}

/**
 * when online do
 * @param {event} e 
 */
request.onsuccess = function (e) {
  console.log('success');
  db = e.target.result;


  if (navigator.onLine) {
    console.log('your router started working again');
    checkDatabase();
  }


};
/*
const saveRecord = (record) => {
  console.log('Save record invoked');

  //add a bunch of code here
  console.log('Save record invoked');
  // Create a transaction on the BudgetStore db with readwrite access
  const transaction = db.transaction(['BudgetStore'], 'readwrite');

  // Access your BudgetStore object store
  const store = transaction.objectStore('BudgetStore');

  // Add record to your store with add method.
  store.add(record);
  
  store.add(record);
};

// Listen for app coming back online
window.addEventListener('online', checkDatabase);*/
