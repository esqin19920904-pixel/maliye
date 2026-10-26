const C='maliye-v2',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const nf=(r,c)=>new Promise(res=>{let d=0;const t=setTimeout(()=>{c.match(r,{ignoreSearch:true}).then(m=>{if(m&&!d){d=1;res(m)}})},3500);
fetch(r,{cache:'no-cache'}).then(x=>{clearTimeout(t);if(x.ok)c.put(r,x.clone());if(!d){d=1;res(x)}}).catch(()=>{clearTimeout(t);c.match(r,{ignoreSearch:true}).then(m=>{if(!d){d=1;res(m||Response.error())}})})});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!='GET'||u.origin!=location.origin)return;
e.respondWith(caches.open(C).then(c=>(r.mode=='navigate'||/(\/|index\.html)$/.test(u.pathname))?nf(r,c):c.match(r,{ignoreSearch:true}).then(m=>{const f=fetch(r).then(x=>{if(x.ok)c.put(r,x.clone());return x}).catch(()=>m);return m||f})))});
