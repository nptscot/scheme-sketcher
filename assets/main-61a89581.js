import{S as X,i as Y,s as x,e as D,a as $,b as ee,c as M,t as _,g as te,d as le,f as d,h as C,j as z,k as re,l as v,m as k,n as p,C as oe,o as w,p as y,q as L,r as H,u as ae,E as se,M as ie,v as ce,w as ne,G as fe,x as ue,y as pe,F as he,z as $e,L as ge,P as _e,A as me}from"./FileManager.svelte_svelte_type_style_lang-0956243a.js";function G(s,e,t){const l=s.slice();return l[3]=e[t][0],l[4]=e[t][1],l}function R(s,e,t){const l=s.slice();return l[7]=e[t][0],l[8]=e[t][1],l}function de(s){let e=s[8]+"",t;return{c(){t=H(e)},m(l,n){M(l,t,n)},p:ae,d(l){l&&C(t)}}}function U(s){let e,t;function l(){return s[1](s[3],s[7])}return e=new oe({props:{name:s[7],$$slots:{default:[de]},$$scope:{ctx:s}}}),e.$on("click",l),{c(){w(e.$$.fragment)},m(n,r){y(e,n,r),t=!0},p(n,r){s=n;const o={};r&2048&&(o.$$scope={dirty:r,ctx:s}),e.$set(o)},i(n){t||(_(e.$$.fragment,n),t=!0)},o(n){d(e.$$.fragment,n),t=!1},d(n){L(e,n)}}}function Z(s){let e,t,l,n,r,o=D(s[4]),a=[];for(let i=0;i<o.length;i+=1)a[i]=U(R(s,o,i));const c=i=>d(a[i],1,1,()=>{a[i]=null});return{c(){e=$("div"),t=$("h2"),t.textContent=`${s[3]}`,l=v();for(let i=0;i<a.length;i+=1)a[i].c();n=v(),k(e,"class","group svelte-7u8q8i")},m(i,h){M(i,e,h),p(e,t),p(e,l);for(let f=0;f<a.length;f+=1)a[f]&&a[f].m(e,null);p(e,n),r=!0},p(i,h){if(h&1){o=D(i[4]);let f;for(f=0;f<o.length;f+=1){const F=R(i,o,f);a[f]?(a[f].p(F,h),_(a[f],1)):(a[f]=U(F),a[f].c(),_(a[f],1),a[f].m(e,n))}for(te(),f=o.length;f<a.length;f+=1)c(f);le()}},i(i){if(!r){for(let h=0;h<o.length;h+=1)_(a[h]);r=!0}},o(i){a=a.filter(Boolean);for(let h=0;h<a.length;h+=1)d(a[h]);r=!1},d(i){i&&C(e),z(a,i)}}}function ve(s){let e,t,l=D(s[0]),n=[];for(let o=0;o<l.length;o+=1)n[o]=Z(G(s,l,o));const r=o=>d(n[o],1,1,()=>{n[o]=null});return{c(){e=$("div");for(let o=0;o<n.length;o+=1)n[o].c();ee(e,"columns","2")},m(o,a){M(o,e,a);for(let c=0;c<n.length;c+=1)n[c]&&n[c].m(e,null);t=!0},p(o,[a]){if(a&1){l=D(o[0]);let c;for(c=0;c<l.length;c+=1){const i=G(o,l,c);n[c]?(n[c].p(i,a),_(n[c],1)):(n[c]=Z(i),n[c].c(),_(n[c],1),n[c].m(e,null))}for(te(),c=l.length;c<n.length;c+=1)r(c);le()}},i(o){if(!t){for(let a=0;a<l.length;a+=1)_(n[a]);t=!0}},o(o){n=n.filter(Boolean);for(let a=0;a<n.length;a+=1)d(n[a]);t=!1},d(o){o&&C(e),z(n,o)}}}function be(s){let e=t();function t(){let n=new Map;for(let r=0;r<window.localStorage.length;r++){let o=window.localStorage.key(r);if(o.startsWith("npt_ss/")&&!o.endsWith("/last-opened-file"))try{let a=JSON.parse(window.localStorage.getItem(o)||""),c=re(a),[i,h,f]=o.split("/");n.has(h)||n.set(h,[]),n.get(h).push([f,c])}catch{}}for(let r of n.values())r.sort();return n}return[e,(n,r)=>window.location.href=`sketch.html?boundary=${n}&file=${r}`]}class ke extends X{constructor(e){super(),Y(this,e,be,ve,x,{})}}function K(s,e,t){const l=s.slice();return l[7]=e[t],l}function Q(s){let e,t,l=s[7]+"",n,r;return{c(){e=$("li"),t=$("a"),n=H(l),k(t,"href",r="sketch.html?boundary=LAD_"+s[7])},m(o,a){M(o,e,a),p(e,t),p(t,n)},p(o,a){a&2&&l!==(l=o[7]+"")&&ne(n,l),a&2&&r!==(r="sketch.html?boundary=LAD_"+o[7])&&k(t,"href",r)},d(o){o&&C(e)}}}function V(s){let e,t=s[6][0].properties.LAD23NM+"",l;return{c(){e=$("p"),l=H(t)},m(n,r){M(n,e,r),p(e,l)},p(n,r){r&64&&t!==(t=n[6][0].properties.LAD23NM+"")&&ne(l,t)},d(n){n&&C(e)}}}function we(s){let e,t=s[6]&&V(s);return{c(){t&&t.c(),e=me()},m(l,n){t&&t.m(l,n),M(l,e,n)},p(l,n){l[6]?t?t.p(l,n):(t=V(l),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},d(l){l&&C(e),t&&t.d(l)}}}function ye(s){let e,t;return e=new _e({props:{openOn:"hover",$$slots:{default:[we,({features:l})=>({6:l}),({features:l})=>l?64:0]},$$scope:{ctx:s}}}),{c(){w(e.$$.fragment)},m(l,n){y(e,l,n),t=!0},p(l,n){const r={};n&1088&&(r.$$scope={dirty:n,ctx:l}),e.$set(r)},i(l){t||(_(e.$$.fragment,l),t=!0)},o(l){d(e.$$.fragment,l),t=!1},d(l){L(e,l)}}}function Le(s){let e,t,l,n;return e=new he({props:{paint:{"fill-color":"rgb(200, 100, 240)","fill-outline-color":"rgb(200, 100, 240)","fill-opacity":$e(0,.5)},manageHoverState:!0,hoverCursor:"pointer",$$slots:{default:[ye]},$$scope:{ctx:s}}}),e.$on("click",Se),l=new ge({props:{paint:{"line-color":"rgb(200, 100, 240)","line-width":2.5},manageHoverState:!0}}),{c(){w(e.$$.fragment),t=v(),w(l.$$.fragment)},m(r,o){y(e,r,o),M(r,t,o),y(l,r,o),n=!0},p(r,o){const a={};o&1024&&(a.$$scope={dirty:o,ctx:r}),e.$set(a)},i(r){n||(_(e.$$.fragment,r),_(l.$$.fragment,r),n=!0)},o(r){d(e.$$.fragment,r),d(l.$$.fragment,r),n=!1},d(r){r&&C(t),L(e,r),L(l,r)}}}function Me(s){let e,t;return e=new fe({props:{data:s[0],generateId:!0,$$slots:{default:[Le]},$$scope:{ctx:s}}}),{c(){w(e.$$.fragment)},m(l,n){y(e,l,n),t=!0},p(l,n){const r={};n&1&&(r.data=l[0]),n&1024&&(r.$$scope={dirty:n,ctx:l}),e.$set(r)},i(l){t||(_(e.$$.fragment,l),t=!0)},o(l){d(e.$$.fragment,l),t=!1},d(l){L(e,l)}}}function Ce(s){let e,t,l,n,r,o,a,c,i,h,f,F,O,B,q,I,N,J,E,P,b,T;a=new se({props:{errorMessage:s[3]}});let j=D(s[1]),g=[];for(let u=0;u<j.length;u+=1)g[u]=Q(K(s,j,u));return N=new ke({}),b=new ie({props:{style:"https://api.maptiler.com/maps/uk-openzoomstack-light/style.json?key=MZEJTanw3WpxRvt7qDfo",bounds:s[2],standardControls:!0,hash:!0,$$slots:{default:[Me]},$$scope:{ctx:s}}}),b.$on("error",s[4]),{c(){e=$("div"),t=$("div"),l=$("h2"),l.textContent="NPT Scheme Sketcher",n=v(),r=$("p"),r.innerHTML=`This is an
      <a href="https://github.com/nptscot/scheme-sketcher" target="_blank">open source project</a>
      project developed by
      <a href="https://github.com/dabreegster/" target="_blank">Dustin Carlino</a>
      .`,o=v(),w(a.$$.fragment),c=v(),i=$("p"),i.textContent="Choose a boundary below or on the map to begin sketching:",h=v(),f=$("ul");for(let u=0;u<g.length;u+=1)g[u].c();F=v(),O=$("hr"),B=v(),q=$("p"),q.textContent="Or continue with a previously opened file:",I=v(),w(N.$$.fragment),J=v(),E=$("div"),P=$("div"),w(b.$$.fragment),ee(f,"columns","3"),k(t,"class","govuk-grid-column-one-half left govuk-prose svelte-d1l1fz"),k(P,"id","map"),k(P,"class","svelte-d1l1fz"),k(E,"class","govuk-grid-column-one-half"),k(e,"class","govuk-grid-row")},m(u,A){M(u,e,A),p(e,t),p(t,l),p(t,n),p(t,r),p(t,o),y(a,t,null),p(t,c),p(t,i),p(t,h),p(t,f);for(let S=0;S<g.length;S+=1)g[S]&&g[S].m(f,null);p(t,F),p(t,O),p(t,B),p(t,q),p(t,I),y(N,t,null),p(e,J),p(e,E),p(E,P),y(b,P,null),T=!0},p(u,[A]){if(A&2){j=D(u[1]);let m;for(m=0;m<j.length;m+=1){const W=K(u,j,m);g[m]?g[m].p(W,A):(g[m]=Q(W),g[m].c(),g[m].m(f,null))}for(;m<g.length;m+=1)g[m].d(1);g.length=j.length}const S={};A&1025&&(S.$$scope={dirty:A,ctx:u}),b.$set(S)},i(u){T||(_(a.$$.fragment,u),_(N.$$.fragment,u),_(b.$$.fragment,u),T=!0)},o(u){d(a.$$.fragment,u),d(N.$$.fragment,u),d(b.$$.fragment,u),T=!1},d(u){u&&C(e),L(a),z(g,u),L(N),L(b)}}}function Se(s){window.location.href=`sketch.html?boundary=LAD_${s.detail.features[0].properties.LAD23NM}`}function Ne(s,e,t){let l={type:"FeatureCollection",features:[]},n=[];ce(async()=>{ue();let i=await fetch(pe);t(0,l=await i.json()),t(1,n=l.features.map(h=>h.properties.LAD23NM)),n.sort()});let r=window.location.hash?void 0:[-8.943,54.631,-.901,59.489],a=new URLSearchParams(window.location.search).get("error")||"";return[l,n,r,a,i=>{console.log(i.detail.error)}]}class je extends X{constructor(e){super(),Y(this,e,Ne,Ce,x,{})}}document.body.className+=" js-enabled"+("noModule"in HTMLScriptElement.prototype?" govuk-frontend-supported":"");new je({target:document.getElementById("app")});
