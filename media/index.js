var Tr=Object.defineProperty;var Mt=e=>{throw TypeError(e)};var Or=(e,t,r)=>t in e?Tr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var it=(e,t,r)=>Or(e,typeof t!="symbol"?t+"":t,r),Ar=(e,t,r)=>t.has(e)||Mt("Cannot "+r);var ee=(e,t,r)=>(Ar(e,t,"read from private field"),r?r.call(e):t.get(e)),He=(e,t,r)=>t.has(e)?Mt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(a){if(a.ep)return;a.ep=!0;const l=r(a);fetch(a.href,l)}})();const Pr=!1;var yt=Array.isArray,mt=Array.from,Nr=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,Gt=Object.getOwnPropertyDescriptors,Ir=Object.prototype,Mr=Array.prototype,Ke=Object.getPrototypeOf;const Lr=()=>{};function Dr(e){return e()}function ct(e){for(var t=0;t<e.length;t++)e[t]()}const F=2,Wt=4,Ie=8,xt=16,q=32,Me=64,vt=128,le=256,Ye=512,I=1024,J=2048,Le=4096,j=8192,he=16384,Rr=32768,De=65536,Fr=1<<17,qr=1<<19,Zt=1<<20,te=Symbol("$state"),Br=Symbol("legacy props"),zr=Symbol("");function Jt(e){return e===this.v}function jr(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function Xt(e){return!jr(e,this.v)}function Vr(e){throw new Error("effect_in_teardown")}function Hr(){throw new Error("effect_in_unowned_derived")}function Ur(e){throw new Error("effect_orphan")}function Kr(){throw new Error("effect_update_depth_exceeded")}function Yr(e){throw new Error("props_invalid_value")}function Gr(){throw new Error("state_descriptors_fixed")}function Wr(){throw new Error("state_prototype_fixed")}function Zr(){throw new Error("state_unsafe_local_read")}function Jr(){throw new Error("state_unsafe_mutation")}let pe=!1;function Xr(){pe=!0}function D(e){return{f:0,v:e,reactions:null,equals:Jt,version:0}}function re(e){return $r(D(e))}function Qr(e,t=!1){var n;const r=D(e);return t||(r.equals=Xt),pe&&C!==null&&C.l!==null&&((n=C.l).s??(n.s=[])).push(r),r}function $r(e){return E!==null&&E.f&F&&(V===null?bn([e]):V.push(e)),e}function T(e,t){return E!==null&&et()&&E.f&(F|xt)&&(V===null||!V.includes(e))&&Jr(),dt(e,t)}function dt(e,t){return e.equals(t)||(e.v=t,e.version=_r(),Qt(e,J),et()&&w!==null&&w.f&I&&!(w.f&q)&&(N!==null&&N.includes(e)?(U(w,J),nt(w)):Z===null?yn([e]):Z.push(e))),t}function Qt(e,t){var r=e.reactions;if(r!==null)for(var n=et(),a=r.length,l=0;l<a;l++){var s=r[l],d=s.f;d&J||!n&&s===w||(U(s,t),d&(I|le)&&(d&F?Qt(s,Le):nt(s)))}}const Et=1,kt=2,$t=4,en=8,tn=16,rn=1,nn=2,an=8,ln=1,on=2,M=Symbol();let er=!1;function z(e,t=null,r){if(typeof e!="object"||e===null||te in e)return e;const n=Ke(e);if(n!==Ir&&n!==Mr)return e;var a=new Map,l=yt(e),s=D(0);l&&a.set("length",D(e.length));var d;return new Proxy(e,{defineProperty(c,i,o){(!("value"in o)||o.configurable===!1||o.enumerable===!1||o.writable===!1)&&Gr();var f=a.get(i);return f===void 0?(f=D(o.value),a.set(i,f)):T(f,z(o.value,d)),!0},deleteProperty(c,i){var o=a.get(i);if(o===void 0)i in c&&a.set(i,D(M));else{if(l&&typeof i=="string"){var f=a.get("length"),u=Number(i);Number.isInteger(u)&&u<f.v&&T(f,u)}T(o,M),Lt(s)}return!0},get(c,i,o){var _;if(i===te)return e;var f=a.get(i),u=i in c;if(f===void 0&&(!u||(_=fe(c,i))!=null&&_.writable)&&(f=D(z(u?c[i]:M,d)),a.set(i,f)),f!==void 0){var v=p(f);return v===M?void 0:v}return Reflect.get(c,i,o)},getOwnPropertyDescriptor(c,i){var o=Reflect.getOwnPropertyDescriptor(c,i);if(o&&"value"in o){var f=a.get(i);f&&(o.value=p(f))}else if(o===void 0){var u=a.get(i),v=u==null?void 0:u.v;if(u!==void 0&&v!==M)return{enumerable:!0,configurable:!0,value:v,writable:!0}}return o},has(c,i){var v;if(i===te)return!0;var o=a.get(i),f=o!==void 0&&o.v!==M||Reflect.has(c,i);if(o!==void 0||w!==null&&(!f||(v=fe(c,i))!=null&&v.writable)){o===void 0&&(o=D(f?z(c[i],d):M),a.set(i,o));var u=p(o);if(u===M)return!1}return f},set(c,i,o,f){var m;var u=a.get(i),v=i in c;if(l&&i==="length")for(var _=o;_<u.v;_+=1){var b=a.get(_+"");b!==void 0?T(b,M):_ in c&&(b=D(M),a.set(_+"",b))}u===void 0?(!v||(m=fe(c,i))!=null&&m.writable)&&(u=D(void 0),T(u,z(o,d)),a.set(i,u)):(v=u.v!==M,T(u,z(o,d)));var h=Reflect.getOwnPropertyDescriptor(c,i);if(h!=null&&h.set&&h.set.call(f,o),!v){if(l&&typeof i=="string"){var x=a.get("length"),g=Number(i);Number.isInteger(g)&&g>=x.v&&T(x,g+1)}Lt(s)}return!0},ownKeys(c){p(s);var i=Reflect.ownKeys(c).filter(u=>{var v=a.get(u);return v===void 0||v.v!==M});for(var[o,f]of a)f.v!==M&&!(o in c)&&i.push(o);return i},setPrototypeOf(){Wr()}})}function Lt(e,t=1){T(e,e.v+t)}var Ge,tr,rr;function sn(){if(Ge===void 0){Ge=window;var e=Element.prototype,t=Node.prototype;tr=fe(t,"firstChild").get,rr=fe(t,"nextSibling").get,e.__click=void 0,e.__className="",e.__attributes=null,e.__styles=null,e.__e=void 0,Text.prototype.__t=void 0}}function Qe(e=""){return document.createTextNode(e)}function de(e){return tr.call(e)}function $e(e){return rr.call(e)}function S(e,t){return de(e)}function Ct(e,t){{var r=de(e);return r instanceof Comment&&r.data===""?$e(r):r}}function P(e,t=1,r=!1){let n=e;for(;t--;)n=$e(n);return n}function un(e){e.textContent=""}function W(e){var t=F|J;w===null?t|=le:w.f|=Zt;var r=E!==null&&E.f&F?E:null;const n={children:null,ctx:C,deps:null,equals:Jt,f:t,fn:e,reactions:null,v:null,version:0,parent:r??w};return r!==null&&(r.children??(r.children=[])).push(n),n}function fn(e){const t=W(e);return t.equals=Xt,t}function nr(e){var t=e.children;if(t!==null){e.children=null;for(var r=0;r<t.length;r+=1){var n=t[r];n.f&F?St(n):Q(n)}}}function cn(e){for(var t=e.parent;t!==null;){if(!(t.f&F))return t;t=t.parent}return null}function ar(e){var t,r=w;H(cn(e));try{nr(e),t=hr(e)}finally{H(r)}return t}function lr(e){var t=ar(e),r=(ue||e.f&le)&&e.deps!==null?Le:I;U(e,r),e.equals(t)||(e.v=t,e.version=_r())}function St(e){nr(e),Ce(e,0),U(e,he),e.v=e.children=e.deps=e.ctx=e.reactions=null}function ir(e){w===null&&E===null&&Ur(),E!==null&&E.f&le&&Hr(),Nt&&Vr()}function vn(e,t){var r=t.last;r===null?t.last=t.first=e:(r.next=e,e.prev=r,t.last=e)}function ge(e,t,r,n=!0){var a=(e&Me)!==0,l=w,s={ctx:C,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:e|J,first:null,fn:t,last:null,next:null,parent:a?null:l,prev:null,teardown:null,transitions:null,version:0};if(r){var d=ce;try{Dt(!0),rt(s),s.f|=Rr}catch(o){throw Q(s),o}finally{Dt(d)}}else t!==null&&nt(s);var c=r&&s.deps===null&&s.first===null&&s.nodes_start===null&&s.teardown===null&&(s.f&Zt)===0;if(!c&&!a&&n&&(l!==null&&vn(s,l),E!==null&&E.f&F)){var i=E;(i.children??(i.children=[])).push(s)}return s}function dn(e){const t=ge(Ie,null,!1);return U(t,I),t.teardown=e,t}function _t(e){ir();var t=w!==null&&(w.f&q)!==0&&C!==null&&!C.m;if(t){var r=C;(r.e??(r.e=[])).push({fn:e,effect:w,reaction:E})}else{var n=Tt(e);return n}}function _n(e){return ir(),Ot(e)}function hn(e){const t=ge(Me,e,!0);return()=>{Q(t)}}function Tt(e){return ge(Wt,e,!1)}function Ot(e){return ge(Ie,e,!0)}function ne(e){return Re(e)}function Re(e,t=0){return ge(Ie|xt|t,e,!0)}function ae(e,t=!0){return ge(Ie|q,e,!0,t)}function or(e){var t=e.teardown;if(t!==null){const r=Nt,n=E;Rt(!0),X(null);try{t.call(null)}finally{Rt(r),X(n)}}}function sr(e){var t=e.deriveds;if(t!==null){e.deriveds=null;for(var r=0;r<t.length;r+=1)St(t[r])}}function ur(e,t=!1){var r=e.first;for(e.first=e.last=null;r!==null;){var n=r.next;Q(r,t),r=n}}function pn(e){for(var t=e.first;t!==null;){var r=t.next;t.f&q||Q(t),t=r}}function Q(e,t=!0){var r=!1;if((t||e.f&qr)&&e.nodes_start!==null){for(var n=e.nodes_start,a=e.nodes_end;n!==null;){var l=n===a?null:$e(n);n.remove(),n=l}r=!0}ur(e,t&&!r),sr(e),Ce(e,0),U(e,he);var s=e.transitions;if(s!==null)for(const c of s)c.stop();or(e);var d=e.parent;d!==null&&d.first!==null&&fr(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes_start=e.nodes_end=null}function fr(e){var t=e.parent,r=e.prev,n=e.next;r!==null&&(r.next=n),n!==null&&(n.prev=r),t!==null&&(t.first===e&&(t.first=n),t.last===e&&(t.last=r))}function We(e,t){var r=[];At(e,r,!0),cr(r,()=>{Q(e),t&&t()})}function cr(e,t){var r=e.length;if(r>0){var n=()=>--r||t();for(var a of e)a.out(n)}else t()}function At(e,t,r){if(!(e.f&j)){if(e.f^=j,e.transitions!==null)for(const s of e.transitions)(s.is_global||r)&&t.push(s);for(var n=e.first;n!==null;){var a=n.next,l=(n.f&De)!==0||(n.f&q)!==0;At(n,t,l?r:!1),n=a}}}function Ze(e){vr(e,!0)}function vr(e,t){if(e.f&j){Fe(e)&&rt(e),e.f^=j;for(var r=e.first;r!==null;){var n=r.next,a=(r.f&De)!==0||(r.f&q)!==0;vr(r,a?t:!1),r=n}if(e.transitions!==null)for(const l of e.transitions)(l.is_global||t)&&l.in()}}let ht=!1,pt=[];function gn(){ht=!1;const e=pt.slice();pt=[],ct(e)}function Pt(e){ht||(ht=!0,queueMicrotask(gn)),pt.push(e)}function wn(e){throw new Error("lifecycle_outside_component")}let Ue=!1,Je=!1,Xe=null,ce=!1,Nt=!1;function Dt(e){ce=e}function Rt(e){Nt=e}let gt=[],ke=0;let E=null;function X(e){E=e}let w=null;function H(e){w=e}let V=null;function bn(e){V=e}let N=null,L=0,Z=null;function yn(e){Z=e}let dr=0,ue=!1,C=null;function _r(){return++dr}function et(){return!pe||C!==null&&C.l===null}function Fe(e){var s,d;var t=e.f;if(t&J)return!0;if(t&Le){var r=e.deps,n=(t&le)!==0;if(r!==null){var a;if(t&Ye){for(a=0;a<r.length;a++)((s=r[a]).reactions??(s.reactions=[])).push(e);e.f^=Ye}for(a=0;a<r.length;a++){var l=r[a];if(Fe(l)&&lr(l),n&&w!==null&&!ue&&!((d=l==null?void 0:l.reactions)!=null&&d.includes(e))&&(l.reactions??(l.reactions=[])).push(e),l.version>e.version)return!0}}n||U(e,I)}return!1}function mn(e,t){for(var r=t;r!==null;){if(r.f&vt)try{r.fn(e);return}catch{r.f^=vt}r=r.parent}throw Ue=!1,e}function xn(e){return(e.f&he)===0&&(e.parent===null||(e.parent.f&vt)===0)}function tt(e,t,r,n){if(Ue){if(r===null&&(Ue=!1),xn(t))throw e;return}r!==null&&(Ue=!0);{mn(e,t);return}}function hr(e){var u;var t=N,r=L,n=Z,a=E,l=ue,s=V,d=C,c=e.f;N=null,L=0,Z=null,E=c&(q|Me)?null:e,ue=!ce&&(c&le)!==0,V=null,C=e.ctx;try{var i=(0,e.fn)(),o=e.deps;if(N!==null){var f;if(Ce(e,L),o!==null&&L>0)for(o.length=L+N.length,f=0;f<N.length;f++)o[L+f]=N[f];else e.deps=o=N;if(!ue)for(f=L;f<o.length;f++)((u=o[f]).reactions??(u.reactions=[])).push(e)}else o!==null&&L<o.length&&(Ce(e,L),o.length=L);return i}finally{N=t,L=r,Z=n,E=a,ue=l,V=s,C=d}}function En(e,t){let r=t.reactions;if(r!==null){var n=r.indexOf(e);if(n!==-1){var a=r.length-1;a===0?r=t.reactions=null:(r[n]=r[a],r.pop())}}r===null&&t.f&F&&(N===null||!N.includes(t))&&(U(t,Le),t.f&(le|Ye)||(t.f^=Ye),Ce(t,0))}function Ce(e,t){var r=e.deps;if(r!==null)for(var n=t;n<r.length;n++)En(e,r[n])}function rt(e){var t=e.f;if(!(t&he)){U(e,I);var r=w,n=C;w=e;try{t&xt?pn(e):ur(e),sr(e),or(e);var a=hr(e);e.teardown=typeof a=="function"?a:null,e.version=dr}catch(l){tt(l,e,r,n||e.ctx)}finally{w=r}}}function kn(){if(ke>1e3){ke=0;try{Kr()}catch(e){if(Xe!==null)tt(e,Xe,null);else throw e}}ke++}function Cn(e){var t=e.length;if(t!==0){kn();var r=ce;ce=!0;try{for(var n=0;n<t;n++){var a=e[n];a.f&I||(a.f^=I);var l=[];pr(a,l),Sn(l)}}finally{ce=r}}}function Sn(e){var t=e.length;if(t!==0)for(var r=0;r<t;r++){var n=e[r];if(!(n.f&(he|j)))try{Fe(n)&&(rt(n),n.deps===null&&n.first===null&&n.nodes_start===null&&(n.teardown===null?fr(n):n.fn=null))}catch(a){tt(a,n,null,n.ctx)}}}function Tn(){if(Je=!1,ke>1001)return;const e=gt;gt=[],Cn(e),Je||(ke=0,Xe=null)}function nt(e){Je||(Je=!0,queueMicrotask(Tn)),Xe=e;for(var t=e;t.parent!==null;){t=t.parent;var r=t.f;if(r&(Me|q)){if(!(r&I))return;t.f^=I}}gt.push(t)}function pr(e,t){var r=e.first,n=[];e:for(;r!==null;){var a=r.f,l=(a&q)!==0,s=l&&(a&I)!==0,d=r.next;if(!s&&!(a&j))if(a&Ie){if(l)r.f^=I;else try{Fe(r)&&rt(r)}catch(f){tt(f,r,null,r.ctx)}var c=r.first;if(c!==null){r=c;continue}}else a&Wt&&n.push(r);if(d===null){let f=r.parent;for(;f!==null;){if(e===f)break e;var i=f.next;if(i!==null){r=i;continue e}f=f.parent}}r=d}for(var o=0;o<n.length;o++)c=n[o],t.push(c),pr(c,t)}function p(e){var o;var t=e.f,r=(t&F)!==0;if(r&&t&he){var n=ar(e);return St(e),n}if(E!==null){V!==null&&V.includes(e)&&Zr();var a=E.deps;N===null&&a!==null&&a[L]===e?L++:N===null?N=[e]:N.push(e),Z!==null&&w!==null&&w.f&I&&!(w.f&q)&&Z.includes(e)&&(U(w,J),nt(w))}else if(r&&e.deps===null)for(var l=e,s=l.parent,d=l;s!==null;)if(s.f&F){var c=s;d=c,s=c.parent}else{var i=s;(o=i.deriveds)!=null&&o.includes(d)||(i.deriveds??(i.deriveds=[])).push(d);break}return r&&(l=e,Fe(l)&&lr(l)),e.v}function at(e){const t=E;try{return E=null,e()}finally{E=t}}const On=~(J|Le|I);function U(e,t){e.f=e.f&On|t}function K(e,t=!1,r){C={p:C,c:null,e:null,m:!1,s:e,x:null,l:null},pe&&!t&&(C.l={s:null,u:null,r1:[],r2:D(!1)})}function Y(e){const t=C;if(t!==null){const s=t.e;if(s!==null){var r=w,n=E;t.e=null;try{for(var a=0;a<s.length;a++){var l=s[a];H(l.effect),X(l.reaction),Tt(l.fn)}}finally{H(r),X(n)}}C=t.p,t.m=!0}return{}}function An(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(te in e)wt(e);else if(!Array.isArray(e))for(let t in e){const r=e[t];typeof r=="object"&&r&&te in r&&wt(r)}}}function wt(e,t=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let n in e)try{wt(e[n],t)}catch{}const r=Ke(e);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const n=Gt(r);for(let a in n){const l=n[a].get;if(l)try{l.call(e)}catch{}}}}}let Ft=!1;function Pn(){Ft||(Ft=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const r of e.target.elements)(t=r.__on_r)==null||t.call(r)})},{capture:!0}))}function gr(e){var t=E,r=w;X(null),H(null);try{return e()}finally{X(t),H(r)}}function Nn(e,t,r,n=r){e.addEventListener(t,()=>gr(r));const a=e.__on_r;a?e.__on_r=()=>{a(),n(!0)}:e.__on_r=()=>n(!0),Pn()}const wr=new Set,bt=new Set;function In(e,t,r,n){function a(l){if(n.capture||Ee.call(t,l),!l.cancelBubble)return gr(()=>r.call(this,l))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?Pt(()=>{t.addEventListener(e,a,n)}):t.addEventListener(e,a,n),a}function qt(e,t,r,n,a){var l={capture:n,passive:a},s=In(e,t,r,l);(t===document.body||t===window||t===document)&&dn(()=>{t.removeEventListener(e,s,l)})}function qe(e){for(var t=0;t<e.length;t++)wr.add(e[t]);for(var r of bt)r(e)}function Ee(e){var g;var t=this,r=t.ownerDocument,n=e.type,a=((g=e.composedPath)==null?void 0:g.call(e))||[],l=a[0]||e.target,s=0,d=e.__root;if(d){var c=a.indexOf(d);if(c!==-1&&(t===document||t===window)){e.__root=t;return}var i=a.indexOf(t);if(i===-1)return;c<=i&&(s=c)}if(l=a[s]||e.target,l!==t){Nr(e,"currentTarget",{configurable:!0,get(){return l||r}});var o=E,f=w;X(null),H(null);try{for(var u,v=[];l!==null;){var _=l.assignedSlot||l.parentNode||l.host||null;try{var b=l["__"+n];if(b!==void 0&&!l.disabled)if(yt(b)){var[h,...x]=b;h.apply(l,[e,...x])}else b.call(l,e)}catch(m){u?v.push(m):u=m}if(e.cancelBubble||_===t||_===null)break;l=_}if(u){for(let m of v)queueMicrotask(()=>{throw m});throw u}}finally{e.__root=t,delete e.currentTarget,X(o),H(f)}}}function br(e){var t=document.createElement("template");return t.innerHTML=e,t.content}function Se(e,t){var r=w;r.nodes_start===null&&(r.nodes_start=e,r.nodes_end=t)}function R(e,t){var r=(t&ln)!==0,n=(t&on)!==0,a,l=!e.startsWith("<!>");return()=>{a===void 0&&(a=br(l?e:"<!>"+e),r||(a=de(a)));var s=n?document.importNode(a,!0):a.cloneNode(!0);if(r){var d=de(s),c=s.lastChild;Se(d,c)}else Se(s,s);return s}}function we(e,t,r="svg"){var n=!e.startsWith("<!>"),a=`<${r}>${n?e:"<!>"+e}</${r}>`,l;return()=>{if(!l){var s=br(a),d=de(s);l=de(d)}var c=l.cloneNode(!0);return Se(c,c),c}}function ot(e=""){{var t=Qe(e+"");return Se(t,t),t}}function Mn(){var e=document.createDocumentFragment(),t=document.createComment(""),r=Qe();return e.append(t,r),Se(t,r),e}function O(e,t){e!==null&&e.before(t)}const Ln=["touchstart","touchmove"];function Dn(e){return Ln.includes(e)}function _e(e,t){var r=t==null?"":typeof t=="object"?t+"":t;r!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=r,e.nodeValue=r==null?"":r+"")}function Rn(e,t){return Fn(e,t)}const se=new Map;function Fn(e,{target:t,anchor:r,props:n={},events:a,context:l,intro:s=!0}){sn();var d=new Set,c=f=>{for(var u=0;u<f.length;u++){var v=f[u];if(!d.has(v)){d.add(v);var _=Dn(v);t.addEventListener(v,Ee,{passive:_});var b=se.get(v);b===void 0?(document.addEventListener(v,Ee,{passive:_}),se.set(v,1)):se.set(v,b+1)}}};c(mt(wr)),bt.add(c);var i=void 0,o=hn(()=>{var f=r??t.appendChild(Qe());return ae(()=>{if(l){K({});var u=C;u.c=l}a&&(n.$$events=a),i=e(f,n)||{},l&&Y()}),()=>{var _;for(var u of d){t.removeEventListener(u,Ee);var v=se.get(u);--v===0?(document.removeEventListener(u,Ee),se.delete(u)):se.set(u,v)}bt.delete(c),Bt.delete(i),f!==r&&((_=f.parentNode)==null||_.removeChild(f))}});return Bt.set(i,o),i}let Bt=new WeakMap;function ve(e,t,r=!1){var n=e,a=null,l=null,s=null,d=r?De:0,c=!1;const i=(f,u=!0)=>{c=!0,o(u,f)},o=(f,u)=>{s!==(s=f)&&(s?(a?Ze(a):u&&(a=ae(()=>u(n))),l&&We(l,()=>{l=null})):(l?Ze(l):u&&(l=ae(()=>u(n))),a&&We(a,()=>{a=null})))};Re(()=>{c=!1,t(i),c||o(null,null)},d)}function Te(e,t){return t}function qn(e,t,r,n){for(var a=[],l=t.length,s=0;s<l;s++)At(t[s].e,a,!0);var d=l>0&&a.length===0&&r!==null;if(d){var c=r.parentNode;un(c),c.append(r),n.clear(),G(e,t[0].prev,t[l-1].next)}cr(a,()=>{for(var i=0;i<l;i++){var o=t[i];d||(n.delete(o.k),G(e,o.prev,o.next)),Q(o.e,!d)}})}function Oe(e,t,r,n,a,l=null){var s=e,d={flags:t,items:new Map,first:null},c=(t&$t)!==0;if(c){var i=e;s=i.appendChild(Qe())}var o=null,f=!1;Re(()=>{var u=r(),v=yt(u)?u:u==null?[]:mt(u),_=v.length;if(!(f&&_===0)){f=_===0;{var b=E;Bn(v,d,s,a,t,(b.f&j)!==0,n)}l!==null&&(_===0?o?Ze(o):o=ae(()=>l(s)):o!==null&&We(o,()=>{o=null})),r()}})}function Bn(e,t,r,n,a,l,s){var xe,Be,ze,je;var d=(a&en)!==0,c=(a&(Et|kt))!==0,i=e.length,o=t.items,f=t.first,u=f,v,_=null,b,h=[],x=[],g,m,y,k;if(d)for(k=0;k<i;k+=1)g=e[k],m=s(g,k),y=o.get(m),y!==void 0&&((xe=y.a)==null||xe.measure(),(b??(b=new Set)).add(y));for(k=0;k<i;k+=1){if(g=e[k],m=s(g,k),y=o.get(m),y===void 0){var ie=u?u.e.nodes_start:r;_=jn(ie,t,_,_===null?t.first:_.next,g,m,k,n,a),o.set(m,_),h=[],x=[],u=_.next;continue}if(c&&zn(y,g,k,a),y.e.f&j&&(Ze(y.e),d&&((Be=y.a)==null||Be.unfix(),(b??(b=new Set)).delete(y))),y!==u){if(v!==void 0&&v.has(y)){if(h.length<x.length){var oe=x[0],B;_=oe.prev;var be=h[0],ye=h[h.length-1];for(B=0;B<h.length;B+=1)zt(h[B],oe,r);for(B=0;B<x.length;B+=1)v.delete(x[B]);G(t,be.prev,ye.next),G(t,_,be),G(t,ye,oe),u=oe,_=ye,k-=1,h=[],x=[]}else v.delete(y),zt(y,u,r),G(t,y.prev,y.next),G(t,y,_===null?t.first:_.next),G(t,_,y),_=y;continue}for(h=[],x=[];u!==null&&u.k!==m;)(l||!(u.e.f&j))&&(v??(v=new Set)).add(u),x.push(u),u=u.next;if(u===null)continue;y=u}h.push(y),_=y,u=y.next}if(u!==null||v!==void 0){for(var $=v===void 0?[]:mt(v);u!==null;)(l||!(u.e.f&j))&&$.push(u),u=u.next;var me=$.length;if(me>0){var lt=a&$t&&i===0?r:null;if(d){for(k=0;k<me;k+=1)(ze=$[k].a)==null||ze.measure();for(k=0;k<me;k+=1)(je=$[k].a)==null||je.fix()}qn(t,$,lt,o)}}d&&Pt(()=>{var Ve;if(b!==void 0)for(y of b)(Ve=y.a)==null||Ve.apply()}),w.first=t.first&&t.first.e,w.last=_&&_.e}function zn(e,t,r,n){n&Et&&dt(e.v,t),n&kt?dt(e.i,r):e.i=r}function jn(e,t,r,n,a,l,s,d,c){var i=(c&Et)!==0,o=(c&tn)===0,f=i?o?Qr(a):D(a):a,u=c&kt?D(s):s,v={i:u,v:f,k:l,a:null,e:null,prev:r,next:n};try{return v.e=ae(()=>d(e,f,u),er),v.e.prev=r&&r.e,v.e.next=n&&n.e,r===null?t.first=v:(r.next=v,r.e.next=v.e),n!==null&&(n.prev=v,n.e.prev=v.e),v}finally{}}function zt(e,t,r){for(var n=e.next?e.next.e.nodes_start:r,a=t?t.e.nodes_start:r,l=e.e.nodes_start;l!==n;){var s=$e(l);a.before(l),l=s}}function G(e,t,r){t===null?e.first=r:(t.next=r,t.e.next=r&&r.e),r!==null&&(r.prev=t,r.e.prev=t&&t.e)}function Vn(e,t,...r){var n=e,a=Lr,l;Re(()=>{a!==(a=t())&&(l&&(Q(l),l=null),l=ae(()=>a(n,...r)))},De)}function Hn(e,t,r){var n=e,a,l;Re(()=>{a!==(a=t())&&(l&&(We(l),l=null),a&&(l=ae(()=>r(n,a))))},De)}function jt(e,t,r,n){var a=e.__attributes??(e.__attributes={});a[t]!==(a[t]=r)&&(t==="style"&&"__styles"in e&&(e.__styles={}),t==="loading"&&(e[zr]=r),r==null?e.removeAttribute(t):typeof r!="string"&&Un(e).includes(t)?e[t]=r:e.setAttribute(t,r))}var Vt=new Map;function Un(e){var t=Vt.get(e.nodeName);if(t)return t;Vt.set(e.nodeName,t=[]);for(var r,n=Ke(e),a=Element.prototype;a!==n;){r=Gt(n);for(var l in r)r[l].set&&t.push(l);n=Ke(n)}return t}function yr(e,t){var r=e.__className,n=Kn(t);(r!==n||er)&&(t==null?e.removeAttribute("class"):e.className=n,e.__className=n)}function Kn(e){return e??""}function It(e,t,r){if(r){if(e.classList.contains(t))return;e.classList.add(t)}else{if(!e.classList.contains(t))return;e.classList.remove(t)}}function Yn(e,t,r=t){var n=et();Nn(e,"input",a=>{var l=a?e.defaultValue:e.value;l=st(e)?ut(l):l,r(l),n&&l!==(l=t())&&(e.value=l??"")}),at(t)==null&&e.value&&r(st(e)?ut(e.value):e.value),Ot(()=>{var a=t();st(e)&&a===ut(e.value)||e.type==="date"&&!a&&!e.value||a!==e.value&&(e.value=a??"")})}function st(e){var t=e.type;return t==="number"||t==="range"}function ut(e){return e===""?null:+e}function Ht(e,t){return e===t||(e==null?void 0:e[te])===t}function Gn(e={},t,r,n){return Tt(()=>{var a,l;return Ot(()=>{a=l,l=[],at(()=>{e!==r(...l)&&(t(e,...l),a&&Ht(r(...a),e)&&t(null,...a))})}),()=>{Pt(()=>{l&&Ht(r(...l),e)&&t(null,...l)})}}),e}function mr(e=!1){const t=C,r=t.l.u;if(!r)return;let n=()=>An(t.s);if(e){let a=0,l={};const s=W(()=>{let d=!1;const c=t.s;for(const i in c)c[i]!==l[i]&&(l[i]=c[i],d=!0);return d&&a++,a});n=()=>p(s)}r.b.length&&_n(()=>{Ut(t,n),ct(r.b)}),_t(()=>{const a=at(()=>r.m.map(Dr));return()=>{for(const l of a)typeof l=="function"&&l()}}),r.a.length&&_t(()=>{Ut(t,n),ct(r.a)})}function Ut(e,t){if(e.l.s)for(const r of e.l.s)p(r);t()}function Wn(e){for(var t=w,r=w;t!==null&&!(t.f&(q|Me));)t=t.parent;try{return H(t),e()}finally{H(r)}}function Kt(e,t,r,n){var b;var a=(r&rn)!==0,l=!pe||(r&nn)!==0,s=(r&an)!==0,d;d=e[t];var c=te in e||Br in e,i=((b=fe(e,t))==null?void 0:b.set)??(c&&s&&t in e?h=>e[t]=h:void 0),o=n,f=!0,u=()=>(f&&(f=!1,o=n),o);d===void 0&&n!==void 0&&(i&&l&&Yr(),d=u(),i&&i(d));var v;if(l)v=()=>{var h=e[t];return h===void 0?u():(f=!0,h)};else{var _=Wn(()=>(a?W:fn)(()=>e[t]));_.f|=Fr,v=()=>{var h=p(_);return h!==void 0&&(o=void 0),h===void 0?o:h}}return v}function Zn(e){C===null&&wn(),pe&&C.l!==null?Jn(C).m.push(e):_t(()=>{const t=at(e);if(typeof t=="function")return t})}function Jn(e){var t=e.l;return t.u??(t.u={a:[],b:[],m:[]})}const Xn="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Xn);Xr();class Qn{constructor(){it(this,"_vscode",acquireVsCodeApi())}sendOnloadEvent(){this._vscode.postMessage({type:"loaded"})}sendChangePageEvent(t){this._vscode.postMessage({type:"change-page-filter",data:t})}}const xr=new Qn;var Ae,Pe,Ne;class $n{constructor(){He(this,Ae,re());He(this,Pe,re([]));He(this,Ne,re(!1))}get data(){return p(ee(this,Ae))}set data(t){T(ee(this,Ae),t)}get filter(){return p(ee(this,Pe))}set filter(t){T(ee(this,Pe),t)}get modeOrderStrict(){return p(ee(this,Ne))}set modeOrderStrict(t){T(ee(this,Ne),t)}filterTable(t){var n;this.filter=t;const r={filter:[...t],page:1,size:((n=this.data)==null?void 0:n.size)||10,modeOrderStrict:this.modeOrderStrict};this.publishChangeTableEvent(r)}nextPage(){var r,n;const t={page:(((r=this.data)==null?void 0:r.page)||0)+1,size:((n=this.data)==null?void 0:n.size)||10,filter:[...this.filter],modeOrderStrict:this.modeOrderStrict};this.publishChangeTableEvent(t)}prevPage(){var r,n;const t={page:(((r=this.data)==null?void 0:r.page)||0)-1,size:((n=this.data)==null?void 0:n.size)||10,filter:[...this.filter],modeOrderStrict:this.modeOrderStrict};this.publishChangeTableEvent(t)}changePage(t){var n;const r={page:t,size:((n=this.data)==null?void 0:n.size)||10,filter:[...this.filter],modeOrderStrict:this.modeOrderStrict};this.publishChangeTableEvent(r)}publishChangeTableEvent(t){xr.sendChangePageEvent(t)}}Ae=new WeakMap,Pe=new WeakMap,Ne=new WeakMap;const A=new $n;var ea=(e,t)=>t.onclick&&t.onclick(),ta=R(`<button class="min-w-9
      rounded-md
      border
      border-slate-300
      py-2
      px-3
      text-center
      text-sm
      transition-all
      shadow-sm
      hover:shadow-lg
      cursor-pointer
      hover:bg-blue-500
      hover:border-slate-800
      active:border-slate-800
      active:text-white
      active:bg-blue-500
      disabled:pointer-events-none
      disabled:opacity-50
      disabled:shadow-none
      disabled:cursor-not-allowed
      select-none
      ml-2"><!></button>`);function ft(e,t){K(t,!0);let r=Kt(t,"active",3,!1),n=Kt(t,"disabled",3,!1);var a=ta();a.__click=[ea,t];var l=S(a);Vn(l,()=>t.children),ne(()=>{a.disabled=n(),It(a,"bg-blue-500",r())}),O(e,a),Y()}qe(["click"]);var ra=R('<div class="flex items-center justify-center"><div class="flex space-x-1"><!> <div class="flex justify-center min-w-96"></div> <!></div></div>');function na(e,t){K(t,!0);const r=W(()=>{const o=[];if(A.data===void 0)return o;const f=A.data.page,u=A.data.totalPages;if(u<=5)for(let v=1;v<=u;v++)o.push(v);else f<=3?o.push(1,2,3,"...",u):f>u-3?o.push(1,"...",u-2,u-1,u):o.push(1,"...",f-1,f,f+1,"...",u);return o});var n=ra(),a=S(n),l=S(a),s=W(()=>{var o;return((o=A==null?void 0:A.data)==null?void 0:o.page)===1});ft(l,{get disabled(){return p(s)},get onclick(){return t.onPrevPage},children:(o,f)=>{var u=ot("Prev");O(o,u)},$$slots:{default:!0}});var d=P(l,2);Oe(d,21,()=>p(r),Te,(o,f)=>{var u=W(()=>{var _;return p(f)===((_=A==null?void 0:A.data)==null?void 0:_.page)}),v=W(()=>p(f)==="...");ft(o,{get active(){return p(u)},get disabled(){return p(v)},onclick:()=>t.onChangePage(p(f)),children:(_,b)=>{var h=ot();ne(()=>_e(h,p(f))),O(_,h)},$$slots:{default:!0}})});var c=P(d,2),i=W(()=>{var o,f;return((o=A==null?void 0:A.data)==null?void 0:o.page)===((f=A==null?void 0:A.data)==null?void 0:f.totalPages)});ft(c,{get disabled(){return p(i)},get onclick(){return t.onNextPage},children:(o,f)=>{var u=ot("Next");O(o,u)},$$slots:{default:!0}}),O(e,n),Y()}var aa=we('<svg class="text-gray-300 animate-spin absolute left-2 top-2" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"></path></svg>');function la(e){var t=aa();O(e,t)}var ia=we('<svg width="20" height="20" fill="currentColor" class="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path></svg>');function oa(e){var t=ia();O(e,t)}var sa=(e,t)=>{var r;return(r=t.onRemove)==null?void 0:r.call(t,t.index)},ua=R('<button type="button" class="shrink-0 size-4 inline-flex items-center justify-center rounded-full focus:outline-none focus:text-blue-500 hover:bg-white hover:text-slate-500 cursor-pointer" aria-label="Close"><svg class="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>'),fa=R('<span class="mr-2 px-2.5 py-0.5 rounded bg-gray-700 text-gray-300 select-none"> <!></span>');function Er(e,t){K(t,!0);var r=fa(),n=S(r),a=P(n);{var l=s=>{var d=ua();d.__click=[sa,t],O(s,d)};ve(a,s=>{t.onRemove&&s(l)})}ne(()=>{It(r,"cursor-pointer",!t.onRemove),_e(n,`${t.text??""} `)}),O(e,r),Y()}qe(["click"]);var ca=R('<div><input type="checkbox" value="" class="w-5 h-5 appearance-none border cursor-pointer"> <label class="ml-1 font-norma cursor-pointer no-select"> </label></div>');function Yt(e,t){K(t,!0);const r=n();function n(){let c="",i;return i=Math.round(Math.random()*4294967295).toString(16),c+=i+"00000000".slice(i.length)+"-",i=Math.round(Math.random()*65535).toString(16),c+=i+"0000".slice(i.length)+"-4",i=Math.round(Math.random()*4095).toString(16),c+=i+"000".slice(i.length)+"-",i=Math.round(Math.random()*16383+32768).toString(16),c+=i+"-",i=Math.round(Math.random()*0xffffffffffff).toString(16),c+=i+"000000000000".slice(i.length),c.toLowerCase()}var a=ca(),l=S(a);jt(l,"id",`checkbox-${r??""}`);var s=P(l,2);jt(s,"for",`checkbox-${r??""}`);var d=S(s);ne(()=>{yr(a,`flex items-center mb-4 ${t.class??""}`),_e(d,t.label)}),O(e,a),Y()}var va=(e,t)=>{var r;return e.key==="Enter"&&t((r=e==null?void 0:e.target)==null?void 0:r.value,!0)},da=R(`<div class="flex"><div class="flex-auto rounded-md ring-1 relative mb-4 py-2 pl-10"><!> <div class="flex"></div> <input class="
      flex-auto
      leading-6
      placeholder-slate-400
      !outline-none
      shadow-sm" type="text" aria-label="Filter properties" placeholder="Filter properties..."></div> <!> <!></div>`);function _a(e,t){K(t,!0);let r,n=re(""),a=re(!1),l=z([]);const s=()=>{var g;p(n)&&(l.push(p(n)),T(n,""),(g=t.onSearch)==null||g.call(t,l))},d=g=>{var m;l.splice(g,1),(m=t.onSearch)==null||m.call(t,l)},c=(g,m=!1)=>{T(a,!0),clearTimeout(r),m?(s(),T(a,!1)):r=setTimeout(()=>{s(),T(a,!1)},1e3)};var i=da(),o=S(i),f=S(o);{var u=g=>{la(g)},v=g=>{oa(g)};ve(f,g=>{p(a)?g(u):g(v,!1)})}var _=P(f,2);Oe(_,21,()=>l,Te,(g,m,y)=>{Er(g,{index:y,get text(){return p(m)},onRemove:d})});var b=P(_,2);b.__keydown=[va,c];var h=P(o,2);Yt(h,{class:"ml-4",label:"Strict"});var x=P(h,2);Yt(x,{class:"ml-4",label:"Not Implemented"}),Yn(b,()=>p(n),g=>T(n,g)),O(e,i),Y()}qe(["keydown"]);var ha=we('<svg class="size-5" viewBox="0 0 24 24" fill="none" version="1.1" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M 3.8,12.963 2,18 6.8,17.37 18.11,6.58 A 2.6121555,2.6121555 0 0 0 14.509,2.795 Z"></path></svg>');function kr(e){var t=ha();O(e,t)}var pa=we('<svg class="size-5" viewBox="0 0 24 24" fill="none" version="1.1" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>');function ga(e){var t=pa();O(e,t)}var wa=R('<tr class="flex w-full py-2 hover:bg-white/10 svelte-zivicw"><td class="w-6/12 pl-2"></td><td class="w-1/12 flex justify-center"><span> </span></td><td class="w-3/12 flex"><div class="truncate"><span> </span></div></td><td class="w-2/12 flex justify-center"><div class="cursor-pointer"><!></div> <div class="cursor-pointer ml-2"><!></div></td></tr>'),ba=R('<table class="text-left w-full border-1 border-slate-100 mb-5 rounded"><thead class="bg-blue-500 flex text-white w-full"><tr class="flex w-full"><th class="p-4 w-6/12 text-center uppercase">properties</th><th class="p-4 w-1/12 text-center uppercase">type</th><th class="p-4 w-3/12 text-center uppercase">value</th><th class="p-4 w-2/12 text-center uppercase">actions</th></tr></thead><tbody class="flex flex-col bg-grey-light overflow-y-auto w-full" style="height: calc( 100vh - 250px );"><!></tbody></table>');function ya(e,t){K(t,!0);let r,n=re(-1);const s={ArrowDown:()=>{var _,b;!((((b=(_=t.page)==null?void 0:_.data)==null?void 0:b.length)||0)>p(n)+1)||p(n)===-1?T(n,0):T(n,p(n)+1)},ArrowUp:()=>{var v,_;p(n)===0||p(n)===-1?T(n,(((_=(v=t.page)==null?void 0:v.data)==null?void 0:_.length)||0)-1):T(n,p(n)-1)}},d=v=>{const _=s[v.key];_&&_()},c=v=>{r.contains(v.target)||T(n,-1)};var i=ba();qt("keydown",Ge,d),qt("click",Ge,c);var o=P(S(i)),f=S(o);{var u=v=>{var _=Mn(),b=Ct(_);Oe(b,17,()=>t.page.data,Te,(h,x,g)=>{var m=wa();m.__click=()=>T(n,z(g));var y=S(m);Oe(y,21,()=>p(x).path,Te,(Ve,Cr,Sr)=>{Er(Ve,{index:Sr,get text(){return p(Cr)}})});var ie=P(y),oe=S(ie),B=S(oe);ne(()=>_e(B,Array.isArray(p(x).value)?"array":typeof p(x).value));var be=P(ie),ye=S(be),$=S(ye),me=S($),lt=P(be),xe=S(lt),Be=S(xe);kr(Be);var ze=P(xe,2),je=S(ze);ga(je),ne(()=>{It(m,"row-selected",p(n)===g),_e(me,p(x).value)}),O(h,m)}),O(v,_)};ve(f,v=>{t.page&&v(u)})}Gn(i,v=>r=v,()=>r),O(e,i),Y()}qe(["click"]);var ma=R("<!> <!> <!>",1);function xa(e,t){K(t,!1),mr();var r=ma(),n=Ct(r);_a(n,{onSearch:s=>A.filterTable(s)});var a=P(n,2);ya(a,{get page(){return A.data}});var l=P(a,2);na(l,{onChangePage:s=>{A.changePage(s)},onNextPage:()=>A.nextPage(),onPrevPage:()=>A.prevPage()}),O(e,r),Y()}var Ea=we('<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" class="size-5" version="1.1" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.721 8.453c-.27-.087-.658-.324-1.135-.921-.595-.745-1.211-1.21-1.852-1.414a2.434 2.434 0 00-1.743.094c-.472.206-.842.522-1.095.778a5.881 5.881 0 00-.382.427l-.025.029-.024.029a.75.75 0 001.064 1.057 3.3 3.3 0 00.2-.229c.065-.078.143-.166.233-.257.185-.188.399-.359.627-.458a.936.936 0 01.69-.04c.27.086.658.323 1.135.92.595.745 1.211 1.21 1.852 1.414a2.434 2.434 0 001.743-.094c.472-.206.841-.522 1.095-.778.129-.13.235-.252.313-.344l.069-.082a4.562 4.562 0 01.05-.059.75.75 0 00-1.065-1.057 3.292 3.292 0 00-.2.229 4.393 4.393 0 01-.233.257 2.102 2.102 0 01-.627.458.936.936 0 01-.69.04z"></path></svg>');function ka(e){var t=Ea();O(e,t)}var Ca=we('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>');function Sa(e){var t=Ca();O(e,t)}var Ta=(e,t,r)=>t(p(r)),Oa=R("<button><!> </button>"),Aa=R("<div>changes</div>"),Pa=R("<div>settings</div>"),Na=R('<div><div class="mt-4"><nav class="ml-4 flex gap-6" aria-label="Tabs"></nav></div></div> <div class="m-4"><!> <!> <!></div>',1);function Ia(e,t){K(t,!0);const r=z([{type:"EDITOR",label:"Editor",component:kr},{type:"CHANGES",label:"Changes",component:ka},{type:"SETTINGS",label:"Settings",component:Sa}]);let n=re(z(r[0]));const a=h=>{T(n,z(h))};var l=Na(),s=Ct(l),d=S(s),c=S(d);Oe(c,21,()=>r,Te,(h,x)=>{var g=Oa();g.__click=[Ta,a,x];var m=S(g);Hn(m,()=>p(x).component,(k,ie)=>{ie(k,{})});var y=P(m);ne(()=>{yr(g,`
          inline-flex
          shrink-0
          items-center
          gap-2
          border-b-2
          px-4
          pb-2
          font-medium
          hover:border-blue-500
          hover:text-blue-500
          cursor-pointer
          select-none
          ${(p(x).type===p(n).type?"text-blue-500 border-blue-500":"text-gray-500 border-transparent")??""}`),_e(y,` ${p(x).label??""}`)}),O(h,g)});var i=P(s,2),o=S(i);{var f=h=>{var x=Aa();O(h,x)};ve(o,h=>{p(n).type==="CHANGES"&&h(f)})}var u=P(o,2);{var v=h=>{xa(h,{})};ve(u,h=>{p(n).type==="EDITOR"&&h(v)})}var _=P(u,2);{var b=h=>{var x=Pa();O(h,x)};ve(_,h=>{p(n).type==="SETTINGS"&&h(b)})}O(e,l),Y()}qe(["click"]);class Ma{constructor(){it(this,"_events",{"refresh-table":this.updateDataTable.bind(this)})}listeningEvents(){window.addEventListener("message",t=>{const r=t.data,n=this._events[r.command];if(!n)throw new Error("command not found");n&&n(r.data)})}updateDataTable(t){A.data=t}}const La=new Ma;function Da(e,t){K(t,!1),Zn(()=>{La.listeningEvents(),xr.sendOnloadEvent()}),mr(),Ia(e,{}),Y()}Rn(Da,{target:document.getElementById("app")});
