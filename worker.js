const J=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:{'content-type':'application/json','cache-control':'no-store'}});
const sha=async s=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))].map(x=>x.toString(16).padStart(2,'0')).join('');
async function lst(env){const r=await env.BAK.list({prefix:'b:'});return r.keys.map(k=>({key:k.name,t:k.metadata&&k.metadata.t,size:k.metadata&&k.metadata.size})).sort((a,b)=>b.key.localeCompare(a.key))}
export default{async fetch(req,env){const u=new URL(req.url);if(!u.pathname.startsWith('/api/'))return env.ASSETS.fetch(req);
 const tok=(req.headers.get('authorization')||'').replace(/^Bearer /,'');if(!/^[0-9a-f]{64}$/.test(tok))return J({e:'auth'},401);
 const h=await sha(tok),own=await env.BAK.get('owner');if(own&&own!==h)return J({e:'forbidden'},403);
 if(u.pathname=='/api/backups'&&req.method=='GET')return J({list:own?await lst(env):[]});
 if(u.pathname=='/api/backup'&&req.method=='GET'){if(!own)return J({e:'empty'},404);const l=await lst(env),k=u.searchParams.get('key')||(l[0]&&l[0].key);if(!k||!k.startsWith('b:'))return J({e:'yox'},404);const v=await env.BAK.get(k);return v?new Response(v,{headers:{'content-type':'application/json','cache-control':'no-store'}}):J({e:'yox'},404)}
 if(u.pathname=='/api/backup'&&req.method=='PUT'){const b=await req.text();if(b.length>24e6)return J({e:'size'},413);if(!b.startsWith('{"v":1'))return J({e:'format'},400);if(!own)await env.BAK.put('owner',h);const t=Date.now(),k='b:'+String(t).padStart(15,'0');await env.BAK.put(k,b,{metadata:{t,size:b.length}});const l=await lst(env);for(const x of l.slice(5))await env.BAK.delete(x.key);return J({ok:1,t,size:b.length})}
 return J({e:'yox'},404)}};
