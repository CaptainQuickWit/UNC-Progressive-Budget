const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

const CACHE_ME = [
    "/index.html",
    "/styles.css",
    "/index.js",
    "/db.js",
    "/manifest.webmanifest"
  ];

//loads data in cashe
self.on("install", function(evt) {
    // async function. waiting. 
    evt.waitUntil(
      caches.open(DATA_CACHE_NAME).then((cache) => cache.add("/api/transaction"))
    );
  
   // pre cache all static assets
  evt.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {

      return cache.addAll(CACHE_ME);

    })
  );
  
  self.skipWaiting();
});

/**
 * took this code out of the below 'activate' function to make it cleaner
 * @param {name} name 
 * @param {dataname} dataName 
 * @param {this is the key} key 
 */
function keyCheck(name,dataName,key) {
    if (key !== name && key !== dataName) {
        
        return caches.delete(key);

    } else {
        //do nothing
    }
}

self.on("activate", function(evt) {

  evt.waitUntil(

    caches.keys().then(keyList => {

      console.log(keyList);

      return Promise.all(

        keyList.map(key => {
          keyCheck(CACHE_NAME,DATA_CACHE_NAME, key );
        })
      );
    })
  );

  self.clients.claim();
});

// fetch
self.on("fetch", function(evt) {

  // cache successful requests to the API

  if (evt.request.url.includes("/api/")) {

    evt.respondWith(

      caches.open(DATA_CACHE_NAME).then(cache => {

        return fetch(evt.request)

          .then(response => {
            
            if (response.status === 200) {

            cache.put(evt.request.url, response.clone());
            return response;
            } else {
                console.log("an error has occured");
                return response;
            }

            
          })
          .catch(err => {
            
            return cache.match(evt.request);
          });
      }).catch(err => console.log(err))
    );

    return;
  }

  evt.respondWith(

    caches.open(CACHE_NAME).then(cache => {

      return cache.match(evt.request).then(response => {

        return response || fetch(evt.request);
        
      });
    })
  );
});
