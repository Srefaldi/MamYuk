if(!self.define){let e,i={};const n=(n,o)=>(n=new URL(n+".js",o).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(o,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let s={};const a=e=>n(e,r),d={module:{uri:r},exports:s,require:a};i[r]=Promise.all(o.map((e=>d[e]||a(e)))).then((e=>(c(...e),s)))}}define(["./workbox-94c66d79"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"app.bundle.js",revision:"974910d71acda8cc54dfce16856236b2"},{url:"app.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app.webmanifest",revision:"289b9524be6683fceddef3d394635260"},{url:"data/DATA.json",revision:"d8a3e295d37811d42c95fcb21eab6013"},{url:"icons/icon-128x128.png",revision:"5be528494c864493452db618852ea92c"},{url:"icons/icon-144x144.png",revision:"eabab75b61b2ef5ad7d4b5d6c30f011c"},{url:"icons/icon-152x152.png",revision:"f44c39feab01114761ca8002544683ae"},{url:"icons/icon-192x192.png",revision:"4dd9c84569fd8823744638fb9929af36"},{url:"icons/icon-384x384.png",revision:"cc42847e36139a94b5b22fd647b362f7"},{url:"icons/icon-48x48.png",revision:"692927c20e3636295847011909570a72"},{url:"icons/icon-512x512.png",revision:"923e4964fe924e5c776b8e017541e50b"},{url:"icons/icon-72x72.png",revision:"6110725716016f2c07ec80a2b606f1bb"},{url:"icons/icon-96x96.png",revision:"e97ca106c56c440babb9fc77465cf428"},{url:"images/heros/hero-image_4.jpg",revision:"4ea98fe648a0b853ab379c928b5fd0bf"},{url:"images/logo/logo.png",revision:"5c451c70a5541d864983c965bd6246e0"},{url:"index.html",revision:"17a925e8be46571627aa3287f77aa4d6"}],{}),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev/")),new e.StaleWhileRevalidate({cacheName:"dicoding-resto-api",plugins:[]}),"GET")}));
//# sourceMappingURL=sw.bundle.js.map
