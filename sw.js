
const CACHE_NAME = "Cache_PWA_IBARRA";

urlsToCache = [
    './',
    './index.html',
    './assets/css/fnd.png',
    './assets/css/style.css',
    './assets/css/style.min.css',
    './assets/js/github.js',
    './assets/js/main.js',
    './assets/vendor/jquery/jquery.min.js',
    './assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
    './assets/vendor/jquery.easing/jquery.easing.min.js',
    './assets/vendor/php-email-form/validate.js',
    './assets/vendor/waypoints/jquery.waypoints.min.js',
    './assets/vendor/counterup/counterup.min.js',
    './assets/vendor/isotope-layout/isotope.pkgd.min.js',
    './assets/vendor/venobox/venobox.min.js',
    './assets/vendor/owl.carousel/owl.carousel.min.js',
    './assets/vendor/typed.js/typed.min.js',
    './assets/vendor/aos/aos.js',
    './assets/vendor/bootstrap/css/bootstrap.min.css',
    './assets/vendor/icofont/icofont.min.css',
    './assets/vendor/boxicons/css/boxicons.min.css',
    './assets/vendor/venobox/venobox.css',
    './assets/assets/vendor/owl.carousel/assets/owl.carousel.min.css',
    './assets/assets/vendor/aos/aos.css',
    './tilt.jquery.js',
    './jquery.preloadinator.min.js',
    './images/favicon1.png',
    './images/h1.webp',
    './images/logo128.png',
    './images/logo192.png',
    './images/logo512.png',
];

//Funcion de instalacion
//almacena el nombre y los archivos que van a ir guardados en cache

self.addEventListener('install', e =>{
    e.waitUntil( //le decimos que detenga el evento hasta que se ejecute lo siguiente
        caches.open(CACHE_NAME)
        .then(cache =>{
            return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting)
        })

    )
})

self.addEventListener('activate', e =>{
    const listaBlancaCache = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
        .then(nombresCache => {
            return Promise.all(
                nombresCache.map(nombresCache =>{
                    if(listaBlancaCache.indexOf(nombresCache) === -1){
                        return caches.delete(nombresCache)
                    }
                })
            )
        })
        //activamos la cache actualizada
        .then(()=> self.clients.claim())
    )

})


self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res =>{
            if(res)
            {
                return res
            }
            return fetch(e.request)
        })
    )
})