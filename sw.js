const C='maliye-v1',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!='GET'||new URL(e.request.url).origin!=location.origin)return;
e.respondWith(caches.open(C).then(c=>c.match(e.request,{ignoreSearch:true}).then(m=>{const f=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>m);return m||f})))});
