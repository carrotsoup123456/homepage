(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}var t={},n=[],r=()=>{},i=()=>!1,a=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),o=e=>e.startsWith(`onUpdate:`),s=Object.assign,c=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},l=Object.prototype.hasOwnProperty,u=(e,t)=>l.call(e,t),d=Array.isArray,f=e=>x(e)===`[object Map]`,p=e=>x(e)===`[object Set]`,m=e=>x(e)===`[object Date]`,h=e=>typeof e==`function`,g=e=>typeof e==`string`,_=e=>typeof e==`symbol`,v=e=>typeof e==`object`&&!!e,y=e=>(v(e)||h(e))&&h(e.then)&&h(e.catch),b=Object.prototype.toString,x=e=>b.call(e),S=e=>x(e).slice(8,-1),C=e=>x(e)===`[object Object]`,w=e=>g(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,ee=e(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`),T=e=>{let t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},te=/-\w/g,E=T(e=>e.replace(te,e=>e.slice(1).toUpperCase())),ne=/\B([A-Z])/g,re=T(e=>e.replace(ne,`-$1`).toLowerCase()),ie=T(e=>e.charAt(0).toUpperCase()+e.slice(1)),ae=T(e=>e?`on${ie(e)}`:``),D=(e,t)=>!Object.is(e,t),oe=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},O=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},se=e=>{let t=parseFloat(e);return isNaN(t)?e:t},ce=e=>{let t=g(e)?Number(e):NaN;return isNaN(t)?e:t},le,ue=()=>le||=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{};function k(e){if(d(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=g(r)?me(r):k(r);if(i)for(let e in i)t[e]=i[e]}return t}if(g(e)||v(e))return e}var de=/;(?![^(]*\))/g,fe=/:([^]+)/,pe=/\/\*[^]*?\*\//g;function me(e){let t={};return e.replace(pe,``).split(de).forEach(e=>{if(e){let n=e.split(fe);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function A(e){let t=``;if(g(e))t=e;else if(d(e))for(let n=0;n<e.length;n++){let r=A(e[n]);r&&(t+=r+` `)}else if(v(e))for(let n in e)e[n]&&(t+=n+` `);return t.trim()}var he=`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`,ge=e(he);he+``;function _e(e){return!!e||e===``}function ve(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=be(e[r],t[r]);return n}function ye(e,t){if(e.size!==t.size)return!1;let n=Array.from(t),r=new Uint8Array(n.length);for(let t of e){let e=-1;for(let i=0;i<n.length;i++)if(!r[i]&&be(t,n[i])){e=i;break}if(e<0)return!1;r[e]=1}return!0}function be(e,t){if(e===t)return!0;let n=m(e),r=m(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=_(e),r=_(t),n||r)return e===t;if(n=d(e),r=d(t),n||r)return n&&r?ve(e,t):!1;if(n=v(e),r=v(t),n||r){if(!n||!r)return!1;if(n=f(e),r=f(t),n||r||(n=p(e),r=p(t),n||r))return n&&r?ye(e,t):!1;if(Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e){let r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!be(e[n],t[n]))return!1}}return String(e)===String(t)}var xe=e=>!!(e&&e.__v_isRef===!0),j=e=>g(e)?e:e==null?``:d(e)||v(e)&&(e.toString===b||!h(e.toString))?xe(e)?j(e.value):JSON.stringify(e,Se,2):String(e),Se=(e,t)=>xe(t)?Se(e,t.value):f(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[Ce(t,r)+` =>`]=n,e),{})}:p(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Ce(e))}:_(t)?Ce(t):v(t)&&!d(t)&&!C(t)?String(t):t,Ce=(e,t=``)=>_(e)?`Symbol(${e.description??t})`:e,M,we=class{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&M&&(M.active?(this.parent=M,this.index=(M.scopes||(M.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes){let n=this.scopes.slice();for(e=0,t=n.length;e<t;e++)n[e].pause()}for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes){let n=this.scopes.slice();for(e=0,t=n.length;e<t;e++)n[e].resume()}let n=this.effects.slice();for(e=0,t=n.length;e<t;e++)n[e].resume()}}run(e){if(this._active){let t=M;try{return M=this,e()}finally{M=t}}}on(){++this._on===1&&(this.prevScope=M,M=this)}off(){if(this._on>0&&--this._on===0){if(M===this)M=this.prevScope;else{let e=M;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){let e=this.scopes.slice();for(t=0,n=e.length;t<n;t++)e[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}};function Te(){return M}var N,Ee=new WeakSet,De=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,M&&(M.active?M.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ee.has(this)&&(Ee.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||je(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,We(this),Pe(this);let e=N,t=Be;N=this,Be=!0;try{return this.fn()}finally{Fe(this),N=e,Be=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Re(e);this.deps=this.depsTail=void 0,We(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ee.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ie(this)&&this.run()}get dirty(){return Ie(this)}},Oe=0,ke,Ae;function je(e,t=!1){if(e.flags|=8,t){e.next=Ae,Ae=e;return}e.next=ke,ke=e}function Me(){Oe++}function Ne(){if(--Oe>0)return;if(Ae){let e=Ae;for(Ae=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;ke;){let t=ke;for(ke=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function Pe(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Fe(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Re(r),ze(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function Ie(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Le(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Le(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Ge)||(e.globalVersion=Ge,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Ie(e))))return;e.flags|=2;let t=e.dep,n=N,r=Be;N=e,Be=!0;try{Pe(e);let n=e.fn(e._value);(t.version===0||D(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{N=n,Be=r,Fe(e),e.flags&=-3}}function Re(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Re(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function ze(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}var Be=!0,Ve=[];function He(){Ve.push(Be),Be=!1}function Ue(){let e=Ve.pop();Be=e===void 0||e}function We(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=N;N=void 0;try{t()}finally{N=e}}}var Ge=0,Ke=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},qe=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!N||!Be||N===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==N)t=this.activeLink=new Ke(N,this),N.deps?(t.prevDep=N.depsTail,N.depsTail.nextDep=t,N.depsTail=t):N.deps=N.depsTail=t,Je(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=N.depsTail,t.nextDep=void 0,N.depsTail.nextDep=t,N.depsTail=t,N.deps===t&&(N.deps=e)}return t}trigger(e){this.version++,Ge++,this.notify(e)}notify(e){Me();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Ne()}}};function Je(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)Je(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Ye=new WeakMap,Xe=Symbol(``),Ze=Symbol(``),Qe=Symbol(``);function $e(e,t,n){if(Be&&N){let t=Ye.get(e);t||Ye.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new qe),r.map=t,r.key=n),r.track()}}function et(e,t,n,r,i,a){let o=Ye.get(e);if(!o){Ge++;return}let s=e=>{e&&e.trigger()};if(Me(),t===`clear`)o.forEach(s);else{let i=d(e),a=i&&w(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===Qe||!_(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(Qe)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(Xe)),f(e)&&s(o.get(Ze)));break;case`delete`:i||(s(o.get(Xe)),f(e)&&s(o.get(Ze)));break;case`set`:f(e)&&s(o.get(Xe))}}Ne()}function tt(e){let t=P(e);return t===e?t:($e(t,`iterate`,Qe),Bt(e)?t:t.map(Ut))}function nt(e){return $e(e=P(e),`iterate`,Qe),e}function rt(e,t){return zt(e)?Wt(Rt(e)?Ut(t):t):Ut(t)}var it={__proto__:null,[Symbol.iterator](){return at(this,Symbol.iterator,e=>rt(this,e))},concat(...e){return tt(this).concat(...e.map(e=>d(e)?tt(e):e))},entries(){return at(this,`entries`,e=>(e[1]=rt(this,e[1]),e))},every(e,t){return st(this,`every`,e,t,void 0,arguments)},filter(e,t){return st(this,`filter`,e,t,e=>e.map(e=>rt(this,e)),arguments)},find(e,t){return st(this,`find`,e,t,e=>rt(this,e),arguments)},findIndex(e,t){return st(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return st(this,`findLast`,e,t,e=>rt(this,e),arguments)},findLastIndex(e,t){return st(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return st(this,`forEach`,e,t,void 0,arguments)},includes(...e){return lt(this,`includes`,e)},indexOf(...e){return lt(this,`indexOf`,e)},join(e){return tt(this).join(e)},lastIndexOf(...e){return lt(this,`lastIndexOf`,e)},map(e,t){return st(this,`map`,e,t,void 0,arguments)},pop(){return ut(this,`pop`)},push(...e){return ut(this,`push`,e)},reduce(e,...t){return ct(this,`reduce`,e,t)},reduceRight(e,...t){return ct(this,`reduceRight`,e,t)},shift(){return ut(this,`shift`)},some(e,t){return st(this,`some`,e,t,void 0,arguments)},splice(...e){return ut(this,`splice`,e)},toReversed(){return tt(this).toReversed()},toSorted(e){return tt(this).toSorted(e)},toSpliced(...e){return tt(this).toSpliced(...e)},unshift(...e){return ut(this,`unshift`,e)},values(){return at(this,`values`,e=>rt(this,e))}};function at(e,t,n){let r=nt(e),i=r[t]();return r!==e&&!Bt(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}var ot=Array.prototype;function st(e,t,n,r,i,a){let o=nt(e),s=o!==e&&!Bt(e),c=o[t];if(c!==ot[t]){let t=c.apply(e,a);return s?Ut(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,rt(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function ct(e,t,n,r){let i=nt(e),a=i!==e&&!Bt(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=rt(e,t)),n.call(this,t,rt(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?rt(e,c):c}function lt(e,t,n){let r=P(e);$e(r,`iterate`,Qe);let i=r[t](...n);return(i===-1||i===!1)&&Vt(n[0])?(n[0]=P(n[0]),r[t](...n)):i}function ut(e,t,n=[]){He(),Me();let r=P(e)[t].apply(e,n);return Ne(),Ue(),r}var dt=e(`__proto__,__v_isRef,__isVue`),ft=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(_));function pt(e){_(e)||(e=String(e));let t=P(this);return $e(t,`has`,e),t.hasOwnProperty(e)}var mt=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?Mt:jt:i?At:kt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=d(e);if(!r){let e;if(a&&(e=it[t]))return e;if(t===`hasOwnProperty`)return pt}let o=Reflect.get(e,t,Gt(e)?e:n);if((_(t)?ft.has(t):dt(t))||(r||$e(e,`get`,t),i))return o;if(Gt(o)){let e=a&&w(t)?o:o.value;return r&&v(e)?It(e):e}return v(o)?r?It(o):Pt(o):o}},ht=class extends mt{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=d(e)&&w(t);if(!this._isShallow){let e=zt(i);if(!Bt(n)&&!zt(n)&&(i=P(i),n=P(n)),!a&&Gt(i)&&!Gt(n))return e||(i.value=n),!0}let o=a?Number(t)<e.length:u(e,t),s=Reflect.set(e,t,n,Gt(e)?e:r);return e===P(r)&&s&&(o?D(n,i)&&et(e,`set`,t,n,i):et(e,`add`,t,n)),s}deleteProperty(e,t){let n=u(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&et(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return(!_(t)||!ft.has(t))&&$e(e,`has`,t),n}ownKeys(e){return $e(e,`iterate`,d(e)?`length`:Xe),Reflect.ownKeys(e)}},gt=class extends mt{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}},_t=new ht,vt=new gt,yt=new ht(!0),bt=e=>e,xt=e=>Reflect.getPrototypeOf(e);function St(e,t,n){return function(...r){let i=this.__v_raw,a=P(i),o=f(a),c=e===`entries`||e===Symbol.iterator&&o,l=e===`keys`&&o,u=i[e](...r),d=n?bt:t?Wt:Ut;return!t&&$e(a,`iterate`,l?Ze:Xe),s(Object.create(u),{next(){let{value:e,done:t}=u.next();return t?{value:e,done:t}:{value:c?[d(e[0]),d(e[1])]:d(e),done:t}}})}}function Ct(e){return function(...t){return e===`delete`?!1:e===`clear`?void 0:this}}function wt(e,t){let n={get(n){let r=this.__v_raw,i=P(r),a=P(n);e||(D(n,a)&&$e(i,`get`,n),$e(i,`get`,a));let{has:o}=xt(i),s=t?bt:e?Wt:Ut;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&$e(P(t),`iterate`,Xe),t.size},has(t){let n=this.__v_raw,r=P(n),i=P(t);return e||(D(t,i)&&$e(r,`has`,t),$e(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=P(a),s=t?bt:e?Wt:Ut;return!e&&$e(o,`iterate`,Xe),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return s(n,e?{add:Ct(`add`),set:Ct(`set`),delete:Ct(`delete`),clear:Ct(`clear`)}:{add(e){let n=P(this),r=xt(n),i=P(e),a=!t&&!Bt(e)&&!zt(e)?i:e;return r.has.call(n,a)||D(e,a)&&r.has.call(n,e)||D(i,a)&&r.has.call(n,i)||(n.add(a),et(n,`add`,a,a)),this},set(e,n){!t&&!Bt(n)&&!zt(n)&&(n=P(n));let r=P(this),{has:i,get:a}=xt(r),o=i.call(r,e);o||=(e=P(e),i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?D(n,s)&&et(r,`set`,e,n,s):et(r,`add`,e,n),this},delete(e){let t=P(this),{has:n,get:r}=xt(t),i=n.call(t,e);i||=(e=P(e),n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&et(t,`delete`,e,void 0,a),o},clear(){let e=P(this),t=e.size!==0,n=e.clear();return t&&et(e,`clear`,void 0,void 0,void 0),n}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=St(r,e,t)}),n}function Tt(e,t){let n=wt(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(u(n,r)&&r in t?n:t,r,i)}var Et={get:Tt(!1,!1)},Dt={get:Tt(!1,!0)},Ot={get:Tt(!0,!1)},kt=new WeakMap,At=new WeakMap,jt=new WeakMap,Mt=new WeakMap;function Nt(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function Pt(e){return zt(e)?e:Lt(e,!1,_t,Et,kt)}function Ft(e){return Lt(e,!1,yt,Dt,At)}function It(e){return Lt(e,!0,vt,Ot,jt)}function Lt(e,t,n,r,i){if(!v(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;let a=i.get(e);if(a)return a;let o=Nt(S(e));if(o===0)return e;let s=new Proxy(e,o===2?r:n);return i.set(e,s),s}function Rt(e){return zt(e)?Rt(e.__v_raw):!!(e&&e.__v_isReactive)}function zt(e){return!!(e&&e.__v_isReadonly)}function Bt(e){return!!(e&&e.__v_isShallow)}function Vt(e){return e?!!e.__v_raw:!1}function P(e){let t=e&&e.__v_raw;return t?P(t):e}function Ht(e){return!u(e,`__v_skip`)&&Object.isExtensible(e)&&O(e,`__v_skip`,!0),e}var Ut=e=>v(e)?Pt(e):e,Wt=e=>v(e)?It(e):e;function Gt(e){return e?e.__v_isRef===!0:!1}function F(e){return qt(e,!1)}function Kt(e){return qt(e,!0)}function qt(e,t){return Gt(e)?e:new Jt(e,t)}var Jt=class{constructor(e,t){this.dep=new qe,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:P(e),this._value=t?e:Ut(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||Bt(e)||zt(e);e=n?e:P(e),D(e,t)&&(this._rawValue=e,this._value=n?e:Ut(e),this.dep.trigger())}};function I(e){return Gt(e)?e.value:e}var Yt={get:(e,t,n)=>t===`__v_raw`?e:I(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return Gt(i)&&!Gt(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Xt(e){return Rt(e)?e:new Proxy(e,Yt)}var Zt=class{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new qe(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Ge-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&N!==this)return je(this,!0),!0}get value(){let e=this.dep.track();return Le(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}};function Qt(e,t,n=!1){let r,i;return h(e)?r=e:(r=e.get,i=e.set),new Zt(r,i,n)}var $t={},en=new WeakMap,tn=void 0;function nn(e,t=!1,n=tn){if(n){let t=en.get(n);t||en.set(n,t=[]),t.push(e)}}function rn(e,n,i=t){let{immediate:a,deep:o,once:s,scheduler:l,augmentJob:u,call:f}=i,p=e=>o?e:Bt(e)||o===!1||o===0?an(e,1):an(e),m,g,_,v,y=!1,b=!1;if(Gt(e)?(g=()=>e.value,y=Bt(e)):Rt(e)?(g=()=>p(e),y=!0):d(e)?(b=!0,y=e.some(e=>Rt(e)||Bt(e)),g=()=>e.map(e=>{if(Gt(e))return e.value;if(Rt(e))return p(e);if(h(e))return f?f(e,2):e()})):g=h(e)?n?f?()=>f(e,2):e:()=>{if(_){He();try{_()}finally{Ue()}}let t=tn;tn=m;try{return f?f(e,3,[v]):e(v)}finally{tn=t}}:r,n&&o){let e=g,t=o===!0?1/0:o;g=()=>an(e(),t)}let x=Te(),S=()=>{m.stop(),x&&x.active&&c(x.effects,m)};if(s&&n){let e=n;n=(...t)=>{let n=e(...t);return S(),n}}let C=b?Array(e.length).fill($t):$t,w=e=>{if(m.flags&1&&(m.dirty||e)){if(n){let t=m.run();if(e||o||y||(b?t.some((e,t)=>D(e,C[t])):D(t,C))){_&&_();let e=tn;tn=m;try{let e=[t,C===$t?void 0:b&&C[0]===$t?[]:C,v];C=t,f?f(n,3,e):n(...e)}finally{tn=e}}}else m.run()}};return u&&u(w),m=new De(g),m.scheduler=l?()=>l(w,!1):w,v=e=>nn(e,!1,m),_=m.onStop=()=>{let e=en.get(m);if(e){if(f)f(e,4);else for(let t of e)t();en.delete(m)}},n?a?w(!0):C=m.run():l?l(w.bind(null,!0),!0):m.run(),S.pause=m.pause.bind(m),S.resume=m.resume.bind(m),S.stop=S,S}function an(e,t=1/0,n){if(t<=0||!v(e)||e.__v_skip||(n||=new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,Gt(e))an(e.value,t,n);else if(d(e))for(let r=0;r<e.length;r++)an(e[r],t,n);else if(p(e)||f(e))e.forEach(e=>{an(e,t,n)});else if(C(e)){for(let r in e)an(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&an(e[r],t,n)}return e}function on(e,t,n,r){try{return r?e(...r):e()}catch(e){cn(e,t,n)}}function sn(e,t,n,r){if(h(e)){let i=on(e,t,n,r);return i&&y(i)&&i.catch(e=>{cn(e,t,n)}),i}if(d(e)){let i=[];for(let a=0;a<e.length;a++)i.push(sn(e[a],t,n,r));return i}}function cn(e,n,r,i=!0){let a=n?n.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:s}=n&&n.appContext.config||t;if(n){let t=n.parent,i=n.proxy,a=`https://vuejs.org/error-reference/#runtime-${r}`;for(;t;){let n=t.ec;if(n){for(let t=0;t<n.length;t++)if(n[t](e,i,a)===!1)return}t=t.parent}if(o){He(),on(o,null,10,[e,i,a]),Ue();return}}ln(e,r,a,i,s)}function ln(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}var un=[],dn=-1,fn=[],pn=null,mn=0,hn=Promise.resolve(),gn=null;function _n(e){let t=gn||hn;return e?t.then(this?e.bind(this):e):t}function vn(e){let t=dn+1,n=un.length;for(;t<n;){let r=t+n>>>1,i=un[r],a=wn(i);a<e||a===e&&i.flags&2?t=r+1:n=r}return t}function yn(e){if(!(e.flags&1)){let t=wn(e),n=un[un.length-1];!n||!(e.flags&2)&&t>=wn(n)?un.push(e):un.splice(vn(t),0,e),e.flags|=1,bn()}}function bn(){gn||=hn.then(Tn)}function xn(e){if(!d(e))pn&&e.id===-1?pn.splice(mn+1,0,e):e.flags&1||(fn.push(e),e.flags|=1);else for(let t=0;t<e.length;t++)fn.push(e[t]);bn()}function Sn(e,t,n=dn+1){for(;n<un.length;n++){let t=un[n];if(t&&t.flags&2){if(e&&t.id!==e.uid)continue;un.splice(n,1),n--,t.flags&4&&(t.flags&=-2),t(),t.flags&4||(t.flags&=-2)}}}function Cn(e){if(fn.length){let e=[...new Set(fn)].sort((e,t)=>wn(e)-wn(t));if(fn.length=0,pn){for(let t=0;t<e.length;t++)pn.push(e[t]);return}for(pn=e,mn=0;mn<pn.length;mn++){let e=pn[mn];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}pn=null,mn=0}}var wn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Tn(e){try{for(dn=0;dn<un.length;dn++){let e=un[dn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),on(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;dn<un.length;dn++){let e=un[dn];e&&(e.flags&=-2)}dn=-1,un.length=0,Cn(e),gn=null,(un.length||fn.length)&&Tn(e)}}var En=null,Dn=null;function On(e){let t=En;return En=e,Dn=e&&e.type.__scopeId||null,t}function L(e,t=En,n){if(!t||e._n)return e;let r=(...n)=>{r._d&&$i(-1);let i=On(t),a=Yi.length,o;try{o=e(...n)}finally{for(let e=Yi.length;e>a;e--)Zi();On(i),r._d&&$i(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function R(e,n){if(En===null)return e;let r=Ma(En),i=e.dirs||=[];for(let e=0;e<n.length;e++){let[a,o,s,c=t]=n[e];a&&(h(a)&&(a={mounted:a,updated:a}),a.deep&&an(o),i.push({dir:a,instance:r,value:o,oldValue:void 0,arg:s,modifiers:c}))}return e}function kn(e,t,n,r){let i=e.dirs,a=t&&t.dirs;for(let o=0;o<i.length;o++){let s=i[o];a&&(s.oldValue=a[o].value);let c=s.dir[r];c&&(He(),sn(c,n,8,[e.el,s,e,t]),Ue())}}function An(e,t){if(va){let n=va.provides,r=va.parent&&va.parent.provides;r===n&&(n=va.provides=Object.create(r)),n[e]=t}}function jn(e,t,n=!1){let r=ya();if(r||ni){let i=ni?ni._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&h(t)?t.call(r&&r.proxy):t}}var Mn=Symbol.for(`v-scx`),Nn=()=>jn(Mn);function Pn(e,t,n){return Fn(e,t,n)}function Fn(e,n,i=t){let{immediate:a,deep:o,flush:c,once:l}=i,u=s({},i),d=n&&a||!n&&c!==`post`,f;if(Ta){if(c===`sync`){let e=Nn();f=e.__watcherHandles||=[]}else if(!d){let e=()=>{};return e.stop=r,e.resume=r,e.pause=r,e}}let p=va;u.call=(e,t,n)=>sn(e,p,t,n);let m=!1;c===`post`?u.scheduler=e=>{Ni(e,p&&p.suspense)}:c!==`sync`&&(m=!0,u.scheduler=(e,t)=>{t?e():yn(e)}),u.augmentJob=e=>{n&&(e.flags|=4),m&&(e.flags|=2,p&&(e.id=p.uid,e.i=p))};let h=rn(e,n,u);return Ta&&(f?f.push(h):d&&h()),h}function In(e,t,n){let r=this.proxy,i=g(e)?e.includes(`.`)?Ln(r,e):()=>r[e]:e.bind(r,r),a;h(t)?a=t:(a=t.handler,n=t);let o=Sa(this),s=Fn(i,a.bind(r),n);return o(),s}function Ln(e,t){let n=t.split(`.`);return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}var Rn=Symbol(`_vte`),zn=e=>e.__isTeleport,Bn=Symbol(`_leaveCb`),Vn=Symbol(`_enterCb`);function Hn(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return gr(()=>{e.isMounted=!0}),yr(()=>{e.isUnmounting=!0}),e}var Un=[Function,Array],Wn={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Un,onEnter:Un,onAfterEnter:Un,onEnterCancelled:Un,onBeforeLeave:Un,onLeave:Un,onAfterLeave:Un,onLeaveCancelled:Un,onBeforeAppear:Un,onAppear:Un,onAfterAppear:Un,onAppearCancelled:Un},Gn=e=>{let t=e.subTree;return t.component?Gn(t.component):t},Kn={name:`BaseTransition`,props:Wn,setup(e,{slots:t}){let n=ya(),r=Hn();return()=>{let i=t.default&&er(t.default(),!0),a=i&&i.length?qn(i):n.subTree?K():void 0;if(!a)return;let o=P(e),{mode:s}=o;if(r.isLeaving)return Zn(a);let c=Qn(a);if(!c)return Zn(a);let l=Xn(c,o,r,n,e=>l=e);c.type!==qi&&$n(c,l);let u=n.subTree&&Qn(n.subTree);if(u&&u.type!==qi&&!ra(u,c)&&Gn(n).type!==qi){let e=Xn(u,o,r,n);if($n(u,e),s===`out-in`&&c.type!==qi)return r.isLeaving=!0,e.afterLeave=()=>{r.isLeaving=!1,n.job.flags&8||n.update(),delete e.afterLeave,u=void 0},Zn(a);s===`in-out`&&c.type!==qi?e.delayLeave=(e,t,n)=>{let i=Yn(r,u);i[String(u.key)]=u,e[Bn]=()=>{t(),e[Bn]=void 0,delete l.delayedLeave,u=void 0},l.delayedLeave=()=>{n(),delete l.delayedLeave,u=void 0}}:u=void 0}else u&&=void 0;return a}}};function qn(e){let t=e[0];if(e.length>1){for(let n of e)if(n.type!==qi){t=n;break}}return t}var Jn=Kn;function Yn(e,t){let{leavingVNodes:n}=e,r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function Xn(e,t,n,r,i){let{appear:a,mode:o,persisted:s=!1,onBeforeEnter:c,onEnter:l,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:p,onLeave:m,onAfterLeave:h,onLeaveCancelled:g,onBeforeAppear:_,onAppear:v,onAfterAppear:y,onAppearCancelled:b}=t,x=String(e.key),S=Yn(n,e),C=(e,t)=>{e&&sn(e,r,9,t)},w=(e,t)=>{let n=t[1];C(e,t),d(e)?e.every(e=>e.length<=1)&&n():e.length<=1&&n()},ee={mode:o,persisted:s,beforeEnter(t){let r=c;if(!n.isMounted){if(a)r=_||c;else return}t[Bn]&&t[Bn](!0);let i=S[x];i&&ra(e,i)&&i.el[Bn]&&i.el[Bn](),C(r,[t])},enter(t){if(S[x]===e)return;let r=l,i=u,o=f;if(!n.isMounted){if(a)r=v||l,i=y||u,o=b||f;else return}let s=!1;t[Vn]=e=>{s||(s=!0,C(e?o:i,[t]),ee.delayedLeave&&ee.delayedLeave(),t[Vn]=void 0)};let c=t[Vn].bind(null,!1);r?w(r,[t,c]):c()},leave(t,r){let i=String(e.key);if(t[Vn]&&t[Vn](!0),n.isUnmounting)return r();C(p,[t]);let a=!1;t[Bn]=n=>{a||(a=!0,r(),C(n?g:h,[t]),t[Bn]=void 0,S[i]===e&&delete S[i])};let o=t[Bn].bind(null,!1);S[i]=e,m?w(m,[t,o]):o()},clone(e){let a=Xn(e,t,n,r,i);return i&&i(a),a}};return ee}function Zn(e){if(cr(e))return e=ca(e),e.children=null,e}function Qn(e){if(!cr(e))return zn(e.type)&&e.children?qn(e.children):e;if(e.component)return e.component.subTree;let{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&h(n.default))return n.default()}}function $n(e,t){if(e.shapeFlag&6&&e.component){e.transition=t;let n=e.component.subTree;$n(zn(n.type)&&Qn(n)||n,t)}else e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function er(e,t=!1,n){let r=[],i=0;for(let a=0;a<e.length;a++){let o=e[a],s=n==null?o.key:String(n)+String(o.key==null?a:o.key);o.type===B?(o.patchFlag&128&&i++,r=r.concat(er(o.children,t,s))):(t||o.type!==qi)&&r.push(s==null?o:ca(o,{key:s}))}if(i>1)for(let e=0;e<r.length;e++)r[e].patchFlag=-2;return r}function tr(e,t){return h(e)?s({name:e.name},t,{setup:e}):e}function nr(e){e.ids=[e.ids[0]+e.ids[2]+++`-`,0,0]}function rr(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var ir=new WeakMap;function ar(e,n,r,a,o=!1){if(d(e)){e.forEach((e,t)=>ar(e,n&&(d(n)?n[t]:n),r,a,o));return}if(sr(a)&&!o){a.shapeFlag&512&&a.type.__asyncResolved&&a.component.subTree.component&&ar(e,n,r,a.component.subTree);return}let s=a.shapeFlag&4?Ma(a.component):a.el,l=o?null:s,{i:f,r:p}=e,m=n&&n.r,_=f.refs===t?f.refs={}:f.refs,v=f.setupState,y=P(v),b=v===t?i:e=>!rr(_,e)&&u(y,e),x=(e,t)=>!(t&&rr(_,t));if(m!=null&&m!==p){if(or(n),g(m))_[m]=null,b(m)&&(v[m]=null);else if(Gt(m)){let e=n;x(m,e.k)&&(m.value=null),e.k&&(_[e.k]=null)}}if(h(p))on(p,f,12,[l,_]);else{let t=g(p),n=Gt(p);if(t||n){let i=()=>{if(e.f){let n=t?b(p)?v[p]:_[p]:x(p)||!e.k?p.value:_[e.k];if(o)d(n)&&c(n,s);else if(d(n))n.includes(s)||n.push(s);else if(t)_[p]=[s],b(p)&&(v[p]=_[p]);else{let t=[s];x(p,e.k)&&(p.value=t),e.k&&(_[e.k]=t)}}else t?(_[p]=l,b(p)&&(v[p]=l)):n&&(x(p,e.k)&&(p.value=l),e.k&&(_[e.k]=l))};if(l){let t=()=>{i(),ir.delete(e)};t.id=-1,ir.set(e,t),Ni(t,r)}else or(e),i()}}}function or(e){let t=ir.get(e);t&&(t.flags|=8,ir.delete(e))}ue().requestIdleCallback,ue().cancelIdleCallback;var sr=e=>!!e.type.__asyncLoader,cr=e=>e.type.__isKeepAlive;function lr(e,t){dr(e,`a`,t)}function ur(e,t){dr(e,`da`,t)}function dr(e,t,n=va){let r=e.__wdc||=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()};if(pr(t,r,n),n){let e=n.parent;for(;e&&e.parent;)cr(e.parent.vnode)&&fr(r,t,n,e),e=e.parent}}function fr(e,t,n,r){let i=pr(t,e,r,!0);br(()=>{c(r[t],i)},n)}function pr(e,t,n=va,r=!1){if(n){let i=n[e]||(n[e]=[]),a=t.__weh||=(...r)=>{He();let i=Sa(n),a=sn(t,n,e,r);return i(),Ue(),a};return r?i.unshift(a):i.push(a),a}}var mr=e=>(t,n=va)=>{(!Ta||e===`sp`)&&pr(e,(...e)=>t(...e),n)},hr=mr(`bm`),gr=mr(`m`),_r=mr(`bu`),vr=mr(`u`),yr=mr(`bum`),br=mr(`um`),xr=mr(`sp`),Sr=mr(`rtg`),Cr=mr(`rtc`);function wr(e,t=va){pr(`ec`,e,t)}var Tr=`components`,Er=`directives`;function Dr(e,t){return jr(Tr,e,!0,t)||e}var Or=Symbol.for(`v-ndc`);function kr(e){return g(e)?jr(Tr,e,!1)||e:e||Or}function Ar(e){return jr(Er,e)}function jr(e,t,n=!0,r=!1){let i=En||va;if(i){let n=i.type;if(e===Tr){let e=Na(n,!1);if(e&&(e===t||e===E(t)||e===ie(E(t))))return n}let a=Mr(i[e]||n[e],t)||Mr(i.appContext[e],t);return!a&&r?n:a}}function Mr(e,t){return e&&(e[t]||e[E(t)]||e[ie(E(t))])}function z(e,t,n,r){let i,a=n&&n[r],o=d(e);if(o||g(e)){let n=o&&Rt(e),r=!1,s=!1;n&&(r=!Bt(e),s=zt(e),e=nt(e)),i=Array(e.length);for(let n=0,o=e.length;n<o;n++)i[n]=t(r?s?Wt(Ut(e[n])):Ut(e[n]):e[n],n,void 0,a&&a[n])}else if(typeof e==`number`){i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,a&&a[n])}else if(v(e)){if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,a&&a[n]));else{let n=Object.keys(e);i=Array(n.length);for(let r=0,o=n.length;r<o;r++){let o=n[r];i[r]=t(e[o],o,r,a&&a[r])}}}else i=[];return n&&(n[r]=i),i}var Nr=e=>e?wa(e)?Ma(e):Nr(e.parent):null,Pr=s(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Nr(e.parent),$root:e=>Nr(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Ur(e),$forceUpdate:e=>e.f||=()=>{yn(e.update)},$nextTick:e=>e.n||=_n.bind(e.proxy),$watch:e=>In.bind(e)}),Fr=(e,n)=>e!==t&&!e.__isScriptSetup&&u(e,n),Ir={get({_:e},n){if(n===`__v_skip`)return!0;let{ctx:r,setupState:i,data:a,props:o,accessCache:s,type:c,appContext:l}=e;if(n[0]!==`$`){let e=s[n];if(e!==void 0)switch(e){case 1:return i[n];case 2:return a[n];case 4:return r[n];case 3:return o[n]}else if(Fr(i,n))return s[n]=1,i[n];else if(a!==t&&u(a,n))return s[n]=2,a[n];else if(u(o,n))return s[n]=3,o[n];else if(r!==t&&u(r,n))return s[n]=4,r[n];else Rr&&(s[n]=0)}let d=Pr[n],f,p;if(d)return n===`$attrs`&&$e(e.attrs,`get`,``),d(e);if((f=c.__cssModules)&&(f=f[n]))return f;if(r!==t&&u(r,n))return s[n]=4,r[n];if(p=l.config.globalProperties,u(p,n))return p[n]},set({_:e},n,r){let{data:i,setupState:a,ctx:o}=e;return Fr(a,n)?(a[n]=r,!0):i!==t&&u(i,n)?(i[n]=r,!0):u(e.props,n)||n[0]===`$`&&n.slice(1)in e?!1:(o[n]=r,!0)},has({_:{data:e,setupState:n,accessCache:r,ctx:i,appContext:a,props:o,type:s}},c){let l;return!!(r[c]||e!==t&&c[0]!==`$`&&u(e,c)||Fr(n,c)||u(o,c)||u(i,c)||u(Pr,c)||u(a.config.globalProperties,c)||(l=s.__cssModules)&&l[c])},defineProperty(e,t,n){return n.get==null?u(n,`value`)&&this.set(e,t,n.value,null):e._.accessCache[t]=0,Reflect.defineProperty(e,t,n)}};function Lr(e){return d(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}var Rr=!0;function zr(e){let t=Ur(e),n=e.proxy,i=e.ctx;Rr=!1,t.beforeCreate&&Vr(t.beforeCreate,e,`bc`);let{data:a,computed:o,methods:s,watch:c,provide:l,inject:u,created:f,beforeMount:p,mounted:m,beforeUpdate:g,updated:_,activated:y,deactivated:b,beforeDestroy:x,beforeUnmount:S,destroyed:C,unmounted:w,render:ee,renderTracked:T,renderTriggered:te,errorCaptured:E,serverPrefetch:ne,expose:re,inheritAttrs:ie,components:ae,directives:D,filters:oe}=t;if(u&&Br(u,i,null),s)for(let e in s){let t=s[e];h(t)&&(i[e]=t.bind(n))}if(a){let t=a.call(n,n);v(t)&&(e.data=Pt(t))}if(Rr=!0,o)for(let e in o){let t=o[e],a=q({get:h(t)?t.bind(n,n):h(t.get)?t.get.bind(n,n):r,set:!h(t)&&h(t.set)?t.set.bind(n):r});Object.defineProperty(i,e,{enumerable:!0,configurable:!0,get:()=>a.value,set:e=>a.value=e})}if(c)for(let e in c)Hr(c[e],i,n,e);if(l){let e=h(l)?l.call(n):l;Reflect.ownKeys(e).forEach(t=>{An(t,e[t])})}f&&Vr(f,e,`c`);function O(e,t){d(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(O(hr,p),O(gr,m),O(_r,g),O(vr,_),O(lr,y),O(ur,b),O(wr,E),O(Cr,T),O(Sr,te),O(yr,S),O(br,w),O(xr,ne),d(re)){if(re.length){let t=e.exposed||={};re.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||={}}ee&&e.render===r&&(e.render=ee),ie!=null&&(e.inheritAttrs=ie),ae&&(e.components=ae),D&&(e.directives=D),ne&&nr(e)}function Br(e,t,n=r){d(e)&&(e=Jr(e));for(let n in e){let r=e[n],i;i=v(r)?`default`in r?jn(r.from||n,r.default,!0):jn(r.from||n):jn(r),Gt(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e}):t[n]=i}}function Vr(e,t,n){sn(d(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function Hr(e,t,n,r){let i=r.includes(`.`)?Ln(n,r):()=>n[r];if(g(e)){let n=t[e];h(n)&&Pn(i,n)}else if(h(e))Pn(i,e.bind(n));else if(v(e)){if(d(e))e.forEach(e=>Hr(e,t,n,r));else{let r=h(e.handler)?e.handler.bind(n):t[e.handler];h(r)&&Pn(i,r,e)}}}function Ur(e){let t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:a,config:{optionMergeStrategies:o}}=e.appContext,s=a.get(t),c;return s?c=s:!i.length&&!n&&!r?c=t:(c={},i.length&&i.forEach(e=>Wr(c,e,o,!0)),Wr(c,t,o)),v(t)&&a.set(t,c),c}function Wr(e,t,n,r=!1){let{mixins:i,extends:a}=t;a&&Wr(e,a,n,!0),i&&i.forEach(t=>Wr(e,t,n,!0));for(let i in t)if(!(r&&i===`expose`)){let r=Gr[i]||n&&n[i];e[i]=r?r(e[i],t[i]):t[i]}return e}var Gr={data:Kr,props:Zr,emits:Zr,methods:Xr,computed:Xr,beforeCreate:Yr,created:Yr,beforeMount:Yr,mounted:Yr,beforeUpdate:Yr,updated:Yr,beforeDestroy:Yr,beforeUnmount:Yr,destroyed:Yr,unmounted:Yr,activated:Yr,deactivated:Yr,errorCaptured:Yr,serverPrefetch:Yr,components:Xr,directives:Xr,watch:Qr,provide:Kr,inject:qr};function Kr(e,t){return t?e?function(){return s(h(e)?e.call(this,this):e,h(t)?t.call(this,this):t)}:t:e}function qr(e,t){return Xr(Jr(e),Jr(t))}function Jr(e){if(d(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Yr(e,t){return e?[...new Set([].concat(e,t))]:t}function Xr(e,t){return e?s(Object.create(null),e,t):t}function Zr(e,t){return e?d(e)&&d(t)?[...new Set([...e,...t])]:s(Object.create(null),Lr(e),Lr(t??{})):t}function Qr(e,t){if(!e)return t;if(!t)return e;let n=s(Object.create(null),e);for(let r in t)n[r]=Yr(e[r],t[r]);return n}function $r(){return{app:null,config:{isNativeTag:i,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var ei=0;function ti(e,t){return function(n,r=null){h(n)||(n=s({},n)),r!=null&&!v(r)&&(r=null);let i=$r(),a=new WeakSet,o=[],c=!1,l=i.app={_uid:ei++,_component:n,_props:r,_container:null,_context:i,_instance:null,version:Ia,get config(){return i.config},set config(e){},use(e,...t){return a.has(e)||(e&&h(e.install)?(a.add(e),e.install(l,...t)):h(e)&&(a.add(e),e(l,...t))),l},mixin(e){return i.mixins.includes(e)||i.mixins.push(e),l},component(e,t){return t?(i.components[e]=t,l):i.components[e]},directive(e,t){return t?(i.directives[e]=t,l):i.directives[e]},mount(a,o,s){if(!c){let u=l._ceVNode||W(n,r);return u.appContext=i,s===!0?s=`svg`:s===!1&&(s=void 0),o&&t?t(u,a):e(u,a,s),c=!0,l._container=a,a.__vue_app__=l,Ma(u.component)}},onUnmount(e){o.push(e)},unmount(){c&&(sn(o,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(e,t){return i.provides[e]=t,l},runWithContext(e){let t=ni;ni=l;try{return e()}finally{ni=t}}};return l}}var ni=null,ri=(e,t)=>t===`modelValue`||t===`model-value`?e.modelModifiers:e[`${t}Modifiers`]||e[`${E(t)}Modifiers`]||e[`${re(t)}Modifiers`];function ii(e,n,...r){if(e.isUnmounted)return;let i=e.vnode.props||t,a=r,o=n.startsWith(`update:`),s=o&&ri(i,n.slice(7));s&&(s.trim&&(a=r.map(e=>g(e)?e.trim():e)),s.number&&(a=a.map(se)));let c,l=i[c=ae(n)]||i[c=ae(E(n))];!l&&o&&(l=i[c=ae(re(n))]),l&&sn(l,e,6,a);let u=i[c+`Once`];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,sn(u,e,6,a)}}var ai=new WeakMap;function oi(e,t,n=!1){let r=n?ai:t.emitsCache,i=r.get(e);if(i!==void 0)return i;let a=e.emits,o={},c=!1;if(!h(e)){let r=e=>{let n=oi(e,t,!0);n&&(c=!0,s(o,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return!a&&!c?(v(e)&&r.set(e,null),null):(d(a)?a.forEach(e=>o[e]=null):s(o,a),v(e)&&r.set(e,o),o)}function si(e,t){return!e||!a(t)?!1:(t=t.slice(2),t=t===`Once`?t:t.replace(/Once$/,``),u(e,t[0].toLowerCase()+t.slice(1))||u(e,re(t))||u(e,t))}function ci(e){let{type:t,vnode:n,proxy:r,withProxy:i,propsOptions:[a],slots:s,attrs:c,emit:l,render:u,renderCache:d,props:f,data:p,setupState:m,ctx:h,inheritAttrs:g}=e,_=On(e),v,y;try{if(n.shapeFlag&4){let e=i||r,t=e;v=ua(u.call(t,e,d,f,m,p,h)),y=c}else{let e=t;v=ua(e.length>1?e(f,{attrs:c,slots:s,emit:l}):e(f,null)),y=t.props?c:li(c)}}catch(t){Yi.length=0,cn(t,e,1),v=W(qi)}let b=v;if(y&&g!==!1){let e=Object.keys(y),{shapeFlag:t}=b;e.length&&t&7&&(a&&e.some(o)&&(y=ui(y,a)),b=ca(b,y,!1,!0))}return n.dirs&&(b=ca(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&$n(zn(b.type)&&Qn(b)||b,n.transition),v=b,On(_),v}var li=e=>{let t;for(let n in e)(n===`class`||n===`style`||a(n))&&((t||={})[n]=e[n]);return t},ui=(e,t)=>{let n={};for(let r in e)(!o(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function di(e,t,n){let{props:r,children:i,component:a}=e,{props:o,children:s,patchFlag:c}=t,l=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?fi(r,o,l):!!o;if(c&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(pi(o,r,n)&&!si(l,n))return!0}}}else return(i||s)&&(!s||!s.$stable)?!0:r===o?!1:r?!o||fi(r,o,l):!!o;return!1}function fi(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){let a=r[i];if(pi(t,e,a)&&!si(n,a))return!0}return!1}function pi(e,t,n){let r=e[n],i=t[n];return n===`style`&&v(r)&&v(i)?!be(r,i):r!==i}function mi({vnode:e,parent:t,suspense:n},r){for(;t;){let n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.suspense.vnode.el=n.el=r,e=n),n===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}var hi={},gi=()=>Object.create(hi),_i=e=>Object.getPrototypeOf(e)===hi;function vi(e,t,n,r=!1){let i={},a=gi();e.propsDefaults=Object.create(null),bi(e,t,i,a);for(let t in e.propsOptions[0])t in i||(i[t]=void 0);e.props=n?r?i:Ft(i):e.type.props?i:a,e.attrs=a}function yi(e,t,n,r){let{props:i,attrs:a,vnode:{patchFlag:o}}=e,s=P(i),[c]=e.propsOptions,l=!1;if((r||o>0)&&!(o&16)){if(o&8){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let o=n[r];if(si(e.emitsOptions,o))continue;let d=t[o];if(c){if(u(a,o))d!==a[o]&&(a[o]=d,l=!0);else{let t=E(o);i[t]=xi(c,s,t,d,e,!1)}}else d!==a[o]&&(a[o]=d,l=!0)}}}else{bi(e,t,i,a)&&(l=!0);let r;for(let a in s)(!t||!u(t,a)&&((r=re(a))===a||!u(t,r)))&&(c?n&&(n[a]!==void 0||n[r]!==void 0)&&(i[a]=xi(c,s,a,void 0,e,!0)):delete i[a]);if(a!==s)for(let e in a)(!t||!u(t,e))&&(delete a[e],l=!0)}l&&et(e.attrs,`set`,``)}function bi(e,n,r,i){let[a,o]=e.propsOptions,s=!1,c;if(n)for(let t in n){if(ee(t))continue;let l=n[t],d;a&&u(a,d=E(t))?!o||!o.includes(d)?r[d]=l:(c||={})[d]=l:si(e.emitsOptions,t)||(!(t in i)||l!==i[t])&&(i[t]=l,s=!0)}if(o){let n=P(r),i=c||t;for(let t=0;t<o.length;t++){let s=o[t];r[s]=xi(a,n,s,i[s],e,!u(i,s))}}return s}function xi(e,t,n,r,i,a){let o=e[n];if(o!=null){let e=u(o,`default`);if(e&&r===void 0){let e=o.default;if(o.type!==Function&&!o.skipFactory&&h(e)){let{propsDefaults:a}=i;if(n in a)r=a[n];else{let o=Sa(i);r=a[n]=e.call(null,t),o()}}else r=e;i.ce&&i.ce._setProp(n,r)}o[0]&&(a&&!e?r=!1:o[1]&&(r===``||r===re(n))&&(r=!0))}return r}var Si=new WeakMap;function Ci(e,r,i=!1){let a=i?Si:r.propsCache,o=a.get(e);if(o)return o;let c=e.props,l={},f=[],p=!1;if(!h(e)){let t=e=>{p=!0;let[t,n]=Ci(e,r,!0);s(l,t),n&&f.push(...n)};!i&&r.mixins.length&&r.mixins.forEach(t),e.extends&&t(e.extends),e.mixins&&e.mixins.forEach(t)}if(!c&&!p)return v(e)&&a.set(e,n),n;if(d(c))for(let e=0;e<c.length;e++){let n=E(c[e]);wi(n)&&(l[n]=t)}else if(c)for(let e in c){let t=E(e);if(wi(t)){let n=c[e],r=l[t]=d(n)||h(n)?{type:n}:s({},n),i=r.type,a=!1,o=!0;if(d(i))for(let e=0;e<i.length;++e){let t=i[e],n=h(t)&&t.name;if(n===`Boolean`){a=!0;break}n===`String`&&(o=!1)}else a=h(i)&&i.name===`Boolean`;r[0]=a,r[1]=o,(a||u(r,`default`))&&f.push(t)}}let m=[l,f];return v(e)&&a.set(e,m),m}function wi(e){return e[0]!==`$`&&!ee(e)}var Ti=e=>e===`_`||e===`_ctx`||e===`$stable`,Ei=e=>d(e)?e.map(ua):[ua(e)],Di=(e,t,n)=>{if(t._n)return t;let r=L((...e)=>Ei(t(...e)),n);return r._c=!1,r},Oi=(e,t,n)=>{let r=e._ctx;for(let n in e){if(Ti(n))continue;let i=e[n];if(h(i))t[n]=Di(n,i,r);else if(i!=null){let e=Ei(i);t[n]=()=>e}}},ki=(e,t)=>{let n=Ei(t);e.slots.default=()=>n},Ai=(e,t,n)=>{for(let r in t)(n||!Ti(r))&&(e[r]=t[r])},ji=(e,t,n)=>{let r=e.slots=gi();if(e.vnode.shapeFlag&32){let e=t._;e?(Ai(r,t,n),n&&O(r,`_`,e,!0)):Oi(t,r)}else t&&ki(e,t)},Mi=(e,n,r)=>{let{vnode:i,slots:a}=e,o=!0,s=t;if(i.shapeFlag&32){let e=n._;e?r&&e===1?o=!1:Ai(a,n,r):(o=!n.$stable,Oi(n,a)),s=n}else n&&(ki(e,n),s={default:1});if(o)for(let e in a)!Ti(e)&&s[e]==null&&delete a[e]},Ni=Gi;function Pi(e){return Fi(e)}function Fi(e,i){let a=ue();a.__VUE__=!0;let{insert:o,remove:s,patchProp:c,createElement:l,createText:u,createComment:d,setText:f,setElementText:p,parentNode:m,nextSibling:h,setScopeId:g=r,insertStaticContent:_}=e,v=(e,t,n,r=null,i=null,a=null,o=void 0,s=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!ra(e,t)&&(r=ve(e),me(e,i,a,!0),e=null),t.patchFlag===-2&&(c=!1,t.dynamicChildren=null);let{type:l,ref:u,shapeFlag:d}=t;switch(l){case Ki:y(e,t,n,r);break;case qi:b(e,t,n,r);break;case Ji:e??x(t,n,r,o);break;case B:ae(e,t,n,r,i,a,o,s,c);break;default:d&1?w(e,t,n,r,i,a,o,s,c):d&6?D(e,t,n,r,i,a,o,s,c):(d&64||d&128)&&l.process(e,t,n,r,i,a,o,s,c,xe)}u!=null&&i?ar(u,e&&e.ref,a,t||e,!t):u==null&&e&&e.ref!=null&&ar(e.ref,null,a,e,!0)},y=(e,t,n,r)=>{if(e==null)o(t.el=u(t.children),n,r);else{let n=t.el=e.el;t.children!==e.children&&f(n,t.children)}},b=(e,t,n,r)=>{e==null?o(t.el=d(t.children||``),n,r):t.el=e.el},x=(e,t,n,r)=>{[e.el,e.anchor]=_(e.children,t,n,r,e.el,e.anchor)},S=({el:e,anchor:t},n,r)=>{let i;for(;e&&e!==t;)i=h(e),o(e,n,r),e=i;o(t,n,r)},C=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=h(e),s(e),e=n;s(t)},w=(e,t,n,r,i,a,o,s,c)=>{if(t.type===`svg`?o=`svg`:t.type===`math`&&(o=`mathml`),e==null)T(t,n,r,i,a,o,s,c);else{let n=e.el&&e.el._isVueCE?e.el:null;try{n&&n._beginPatch(),ne(e,t,i,a,o,s,c)}finally{n&&n._endPatch()}}},T=(e,t,n,r,i,a,s,u)=>{let d,f,{props:m,shapeFlag:h,transition:g,dirs:_}=e;if(d=e.el=l(e.type,a,m&&m.is,m),h&8?p(d,e.children):h&16&&E(e.children,d,null,r,i,Ii(e,a),s,u),_&&kn(e,null,r,`created`),te(d,e,e.scopeId,s,r),m){for(let e in m)e!==`value`&&!ee(e)&&c(d,e,null,m[e],a,r);`value`in m&&c(d,`value`,null,m.value,a),(f=m.onVnodeBeforeMount)&&ma(f,r,e)}_&&kn(e,null,r,`beforeMount`);let v=Ri(i,g);v&&g.beforeEnter(d),o(d,t,n),((f=m&&m.onVnodeMounted)||v||_)&&Ni(()=>{try{f&&ma(f,r,e),v&&g.enter(d),_&&kn(e,null,r,`mounted`)}finally{}},i)},te=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||Wi(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;te(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},E=(e,t,n,r,i,a,o,s,c=0)=>{for(let l=c;l<e.length;l++){let c=e[l]=s?da(e[l]):ua(e[l]);v(null,c,t,n,r,i,a,o,s)}},ne=(e,n,r,i,a,o,s)=>{let l=n.el=e.el,{patchFlag:u,dynamicChildren:d,dirs:f}=n;u|=e.patchFlag&16;let m=e.props||t,h=n.props||t,g;if(r&&Li(r,!1),(g=h.onVnodeBeforeUpdate)&&ma(g,r,n,e),f&&kn(n,e,r,`beforeUpdate`),r&&Li(r,!0),d&&(!e.dynamicChildren||e.dynamicChildren.length!==d.length)&&(u=0,s=!1,d=null),(m.innerHTML&&h.innerHTML==null||m.textContent&&h.textContent==null)&&p(l,``),d?re(e.dynamicChildren,d,l,r,i,Ii(n,a),o):s||k(e,n,l,null,r,i,Ii(n,a),o,!1),u>0){if(u&16)ie(l,m,h,r,a);else if(u&2&&m.class!==h.class&&c(l,`class`,null,h.class,a),u&4&&c(l,`style`,m.style,h.style,a),u&8){let e=n.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t],i=m[n],o=h[n];(o!==i||n===`value`)&&c(l,n,i,o,a,r)}}u&1&&e.children!==n.children&&p(l,n.children)}else!s&&d==null&&ie(l,m,h,r,a);((g=h.onVnodeUpdated)||f)&&Ni(()=>{g&&ma(g,r,n,e),f&&kn(n,e,r,`updated`)},i)},re=(e,t,n,r,i,a,o)=>{for(let s=0;s<t.length;s++){let c=e[s],l=t[s],u=c.el&&(c.type===B||!ra(c,l)||c.shapeFlag&198)?m(c.el):n;v(c,l,u,null,r,i,a,o,!0)}},ie=(e,n,r,i,a)=>{if(n!==r){if(n!==t)for(let t in n)!ee(t)&&!(t in r)&&c(e,t,n[t],null,a,i);for(let t in r){if(ee(t))continue;let o=r[t],s=n[t];o!==s&&t!==`value`&&c(e,t,s,o,a,i)}`value`in r&&c(e,`value`,n.value,r.value,a)}},ae=(e,t,n,r,i,a,s,c,l)=>{let d=t.el=e?e.el:u(``),f=t.anchor=e?e.anchor:u(``),{patchFlag:p,dynamicChildren:m,slotScopeIds:h}=t;h&&(c=c?c.concat(h):h),e==null?(o(d,n,r),o(f,n,r),E(t.children||[],n,f,i,a,s,c,l)):p>0&&p&64&&m&&e.dynamicChildren&&e.dynamicChildren.length===m.length?(re(e.dynamicChildren,m,n,i,a,s,c),(t.key!=null||i&&t===i.subTree)&&zi(e,t,!0)):k(e,t,n,f,i,a,s,c,l)},D=(e,t,n,r,i,a,o,s,c)=>{t.slotScopeIds=s,e==null?t.shapeFlag&512?i.ctx.activate(t,n,r,o,c):O(t,n,r,i,a,o,c):se(e,t,c)},O=(e,t,n,r,i,a,o)=>{let s=e.component=_a(e,r,i);if(cr(e)&&(s.ctx.renderer=xe),Ea(s,!1,o),s.asyncDep){if(i&&i.registerDep(s,ce,o),!e.el){let r=s.subTree=W(qi);b(null,r,t,n),e.placeholder=r.el}}else ce(s,e,t,n,i,a,o)},se=(e,t,n)=>{let r=t.component=e.component;if(di(e,t,n)){if(r.asyncDep&&!r.asyncResolved){le(r,t,n);return}r.next=t,r.update()}else t.el=e.el,r.vnode=t},ce=(e,t,n,r,i,a,o)=>{let s=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:c}=e;{let n=Vi(e);if(n){t&&(t.el=c.el,le(e,t,o)),n.asyncDep.then(()=>{Ni(()=>{e.isUnmounted||l()},i)});return}}let u=t,d;Li(e,!1),t?(t.el=c.el,le(e,t,o)):t=c,n&&oe(n),(d=t.props&&t.props.onVnodeBeforeUpdate)&&ma(d,s,t,c),Li(e,!0);let f=ci(e),p=e.subTree;e.subTree=f,v(p,f,m(p.el),ve(p),e,i,a),t.el=f.el,u===null&&mi(e,f.el),r&&Ni(r,i),(d=t.props&&t.props.onVnodeUpdated)&&Ni(()=>ma(d,s,t,c),i)}else{let o,{el:s,props:c}=t,{bm:l,m:u,parent:d,root:f,type:p}=e,m=sr(t);if(Li(e,!1),l&&oe(l),!m&&(o=c&&c.onVnodeBeforeMount)&&ma(o,d,t),Li(e,!0),s&&Se){let t=()=>{e.subTree=ci(e),Se(s,e.subTree,e,i,null)};m&&p.__asyncHydrate?p.__asyncHydrate(s,e,t):t()}else{f.ce&&f.ce._hasShadowRoot()&&f.ce._injectChildStyle(p,e.parent?e.parent.type:void 0);let o=e.subTree=ci(e);v(null,o,n,r,e,i,a),t.el=o.el}if(u&&Ni(u,i),!m&&(o=c&&c.onVnodeMounted)){let e=t;Ni(()=>ma(o,d,e),i)}(t.shapeFlag&256||d&&sr(d.vnode)&&d.vnode.shapeFlag&256)&&e.a&&Ni(e.a,i),e.isMounted=!0,t=n=r=null}};e.scope.on();let c=e.effect=new De(s);e.scope.off();let l=e.update=c.run.bind(c),u=e.job=c.runIfDirty.bind(c);u.i=e,u.id=e.uid,c.scheduler=()=>yn(u),Li(e,!0),l()},le=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,yi(e,t.props,r,n),Mi(e,t.children,n),He(),Sn(e),Ue()},k=(e,t,n,r,i,a,o,s,c=!1)=>{let l=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:m}=t;if(f>0){if(f&128){fe(l,d,n,r,i,a,o,s,c);return}if(f&256){de(l,d,n,r,i,a,o,s,c);return}}m&8?(u&16&&_e(l,i,a),d!==l&&p(n,d)):u&16?m&16?fe(l,d,n,r,i,a,o,s,c):_e(l,i,a,!0):(u&8&&p(n,``),m&16&&E(d,n,r,i,a,o,s,c))},de=(e,t,r,i,a,o,s,c,l)=>{e||=n,t||=n;let u=e.length,d=t.length,f=Math.min(u,d),p=0;for(;p<f;p++){let n=t[p]=l?da(t[p]):ua(t[p]);v(e[p],n,r,null,a,o,s,c,l)}u>d?_e(e,a,o,!0,!1,f):E(t,r,i,a,o,s,c,l,f)},fe=(e,t,r,i,a,o,s,c,l)=>{let u=0,d=t.length,f=e.length-1,p=d-1;for(;u<=f&&u<=p;){let n=e[u],i=t[u]=l?da(t[u]):ua(t[u]);if(ra(n,i))v(n,i,r,null,a,o,s,c,l);else break;u++}for(;u<=f&&u<=p;){let n=e[f],i=t[p]=l?da(t[p]):ua(t[p]);if(ra(n,i))v(n,i,r,null,a,o,s,c,l);else break;f--,p--}if(u>f){if(u<=p){let e=p+1,n=e<d?t[e].el:i;for(;u<=p;)v(null,t[u]=l?da(t[u]):ua(t[u]),r,n,a,o,s,c,l),u++}}else if(u>p)for(;u<=f;)me(e[u],a,o,!0),u++;else{let m=u,h=u,g=new Map;for(u=h;u<=p;u++){let e=t[u]=l?da(t[u]):ua(t[u]);e.key!=null&&g.set(e.key,u)}let _,y=0,b=p-h+1,x=!1,S=0,C=Array(b);for(u=0;u<b;u++)C[u]=0;for(u=m;u<=f;u++){let n=e[u];if(y>=b){me(n,a,o,!0);continue}let i;if(n.key!=null)i=g.get(n.key);else for(_=h;_<=p;_++)if(C[_-h]===0&&ra(n,t[_])){i=_;break}i===void 0?me(n,a,o,!0):(C[i-h]=u+1,i>=S?S=i:x=!0,v(n,t[i],r,null,a,o,s,c,l),y++)}let w=x?Bi(C):n;for(_=w.length-1,u=b-1;u>=0;u--){let e=h+u,n=t[e],f=t[e+1],p=e+1<d?f.el||Ui(f):i;C[u]===0?v(null,n,r,p,a,o,s,c,l):x&&(_<0||u!==w[_]?pe(n,r,p,2):_--)}}},pe=(e,t,n,r,i=null)=>{let{el:a,type:c,transition:l,children:u,shapeFlag:d}=e;if(d&6){pe(e.component.subTree,t,n,r);return}if(d&128){e.suspense.move(t,n,r);return}if(d&64){c.move(e,t,n,xe);return}if(c===B){o(a,t,n);for(let e=0;e<u.length;e++)pe(u[e],t,n,r);o(e.anchor,t,n);return}if(c===Ji){S(e,t,n);return}if(r!==2&&d&1&&l){if(r===0)l.persisted&&!a[Bn]?o(a,t,n):(l.beforeEnter(a),o(a,t,n),Ni(()=>l.enter(a),i));else{let{leave:r,delayLeave:i,afterLeave:c}=l,u=()=>{e.ctx.isUnmounted?s(a):o(a,t,n)},d=()=>{let e=a._isLeaving||!!a[Bn];a._isLeaving&&a[Bn](!0),l.persisted&&!e?u():r(a,()=>{u(),c&&c()})};i?i(a,u,d):d()}}else o(a,t,n)},me=(e,t,n,r=!1,i=!1)=>{let{type:a,props:o,ref:s,children:c,dynamicChildren:l,shapeFlag:u,patchFlag:d,dirs:f,cacheIndex:p,memo:m}=e;if(d===-2&&(i=!1),s!=null&&(He(),ar(s,null,n,e,!0),Ue()),p!=null&&(t.renderCache[p]=void 0),u&256){t.ctx.deactivate(e);return}let h=u&1&&f,g=!sr(e),_;if(g&&(_=o&&o.onVnodeBeforeUnmount)&&ma(_,t,e),u&6)ge(e.component,n,r);else{if(u&128){e.suspense.unmount(n,r);return}h&&kn(e,null,t,`beforeUnmount`),u&64?e.type.remove(e,t,n,xe,r):l&&!l.hasOnce&&(a!==B||d>0&&d&64)?_e(l,t,n,!1,!0):(a===B&&d&384||!i&&u&16)&&_e(c,t,n),r&&A(e)}let v=m!=null&&p==null;(g&&(_=o&&o.onVnodeUnmounted)||h||v)&&Ni(()=>{_&&ma(_,t,e),h&&kn(e,null,t,`unmounted`),v&&(e.el=null)},n)},A=e=>{let{type:t,el:n,anchor:r,transition:i}=e;if(t===B){he(n,r);return}if(t===Ji){C(e);return}let a=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(e.shapeFlag&1&&i&&!i.persisted){let{leave:t,delayLeave:r}=i,o=()=>t(n,a);r?r(e.el,a,o):o()}else a()},he=(e,t)=>{let n;for(;e!==t;)n=h(e),s(e),e=n;s(t)},ge=(e,t,n)=>{let{bum:r,scope:i,job:a,subTree:o,um:s,m:c,a:l}=e;Hi(c),Hi(l),r&&oe(r),i.stop(),a&&(a.flags|=8,me(o,e,t,n)),s&&Ni(s,t),Ni(()=>{e.isUnmounted=!0},t)},_e=(e,t,n,r=!1,i=!1,a=0)=>{for(let o=a;o<e.length;o++)me(e[o],t,n,r,i)},ve=e=>{if(e.shapeFlag&6)return ve(e.component.subTree);if(e.shapeFlag&128)return e.suspense.next();let t=h(e.anchor||e.el),n=t&&t[Rn];return n?h(n):t},ye=!1,be=(e,t,n)=>{let r;e==null?t._vnode&&(me(t._vnode,null,null,!0),r=t._vnode.component):v(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ye||=(ye=!0,Sn(r),Cn(),!1)},xe={p:v,um:me,m:pe,r:A,mt:O,mc:E,pc:k,pbc:re,n:ve,o:e},j,Se;return i&&([j,Se]=i(xe)),{render:be,hydrate:j,createApp:ti(be,j)}}function Ii({type:e,props:t},n){return n===`svg`&&e===`foreignObject`||n===`mathml`&&e===`annotation-xml`&&t&&t.encoding&&t.encoding.includes(`html`)?void 0:n}function Li({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Ri(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function zi(e,t,n=!1){let r=e.children,i=t.children;if(d(r)&&d(i))for(let e=0;e<r.length;e++){let t=r[e],a=i[e];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[e]=da(i[e]),a.el=t.el),!n&&a.patchFlag!==-2&&zi(t,a)),a.type===Ki&&(a.patchFlag===-1&&(a=i[e]=da(a)),a.el=t.el),a.type===qi&&!a.el&&(a.el=t.el)}}function Bi(e){let t=e.slice(),n=[0],r,i,a,o,s,c=e.length;for(r=0;r<c;r++){let c=e[r];if(c!==0){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}for(a=0,o=n.length-1;a<o;)s=a+o>>1,e[n[s]]<c?a=s+1:o=s;c<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,o=n[a-1];a-->0;)n[a]=o,o=t[o];return n}function Vi(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Vi(t)}function Hi(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function Ui(e){if(e.placeholder)return e.placeholder;let t=e.component;return t?Ui(t.subTree):null}var Wi=e=>e.__isSuspense;function Gi(e,t){t&&t.pendingBranch?d(e)?t.effects.push(...e):t.effects.push(e):xn(e)}var B=Symbol.for(`v-fgt`),Ki=Symbol.for(`v-txt`),qi=Symbol.for(`v-cmt`),Ji=Symbol.for(`v-stc`),Yi=[],Xi=null;function V(e=!1){Yi.push(Xi=e?null:[])}function Zi(){Yi.pop(),Xi=Yi[Yi.length-1]||null}var Qi=1;function $i(e,t=!1){Qi+=e,e<0&&Xi&&t&&(Xi.hasOnce=!0)}function ea(e){return e.dynamicChildren=Qi>0?Xi||n:null,Zi(),Qi>0&&Xi&&Xi.push(e),e}function H(e,t,n,r,i,a){return ea(U(e,t,n,r,i,a,!0))}function ta(e,t,n,r,i){return ea(W(e,t,n,r,i,!0))}function na(e){return e?e.__v_isVNode===!0:!1}function ra(e,t){return e.type===t.type&&e.key===t.key}var ia=({key:e})=>e??null,aa=({ref:e,ref_key:t,ref_for:n})=>(typeof e==`number`&&(e=``+e),e==null?null:g(e)||Gt(e)||h(e)?{i:En,r:e,k:t,f:!!n}:e);function U(e,t=null,n=null,r=0,i=null,a=e===B?0:1,o=!1,s=!1){let c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&ia(t),ref:t&&aa(t),scopeId:Dn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:En};return s?(fa(c,n),a&128&&e.normalize(c)):n&&(c.shapeFlag|=g(n)?8:16),Qi>0&&!o&&Xi&&(c.patchFlag>0||a&6)&&c.patchFlag!==32&&Xi.push(c),c}var W=oa;function oa(e,t=null,n=null,r=0,i=null,a=!1){if((!e||e===Or)&&(e=qi),na(e)){let r=ca(e,t,!0);return n&&fa(r,n),Qi>0&&!a&&Xi&&(r.shapeFlag&6?Xi[Xi.indexOf(e)]=r:Xi.push(r)),r.patchFlag=-2,r}if(Pa(e)&&(e=e.__vccOpts),t){t=sa(t);let{class:e,style:n}=t;e&&!g(e)&&(t.class=A(e)),v(n)&&(Vt(n)&&!d(n)&&(n=s({},n)),t.style=k(n))}let o=g(e)?1:Wi(e)?128:zn(e)?64:v(e)?4:h(e)?2:0;return U(e,t,n,r,i,o,a,!0)}function sa(e){return e?Vt(e)||_i(e)?s({},e):e:null}function ca(e,t,n=!1,r=!1){let{props:i,ref:a,patchFlag:o,children:s,transition:c}=e,l=t?pa(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&ia(l),ref:t&&t.ref?n&&a?d(a)?a.concat(aa(t)):[a,aa(t)]:aa(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==B?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&ca(e.ssContent),ssFallback:e.ssFallback&&ca(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&$n(u,c.clone(u)),u}function G(e=` `,t=0){return W(Ki,null,e,t)}function la(e,t){let n=W(Ji,null,e);return n.staticCount=t,n}function K(e=``,t=!1){return t?(V(),ta(qi,null,e)):W(qi,null,e)}function ua(e){return e==null||typeof e==`boolean`?W(qi):d(e)?W(B,null,e.slice()):na(e)?da(e):W(Ki,null,String(e))}function da(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:ca(e)}function fa(e,t){let n=0,{shapeFlag:r}=e;if(t==null)t=null;else if(d(t))n=16;else if(typeof t==`object`){if(r&65){let n=t.default;n&&(n._c&&(n._d=!1),fa(e,n()),n._c&&(n._d=!0));return}{n=32;let r=t._;!r&&!_i(t)?t._ctx=En:r===3&&En&&(En.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}}else if(h(t)){if(r&65){fa(e,{default:t});return}t={default:t,_ctx:En},n=32}else t=String(t),r&64?(n=16,t=[G(t)]):n=8;e.children=t,e.shapeFlag|=n}function pa(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if(e===`class`)t.class!==r.class&&(t.class=A([t.class,r.class]));else if(e===`style`)t.style=k([t.style,r.style]);else if(a(e)){let n=t[e],i=r[e];i&&n!==i&&!(d(n)&&n.includes(i))?t[e]=n?[].concat(n,i):i:i==null&&n==null&&!o(e)&&(t[e]=i)}else e!==``&&(t[e]=r[e])}return t}function ma(e,t,n,r=null){sn(e,t,7,[n,r])}var ha=$r(),ga=0;function _a(e,n,r){let i=e.type,a=(n?n.appContext:e.appContext)||ha,o={uid:ga++,vnode:e,type:i,parent:n,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new we(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(a.provides),ids:n?n.ids:[``,0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Ci(i,a),emitsOptions:oi(i,a),emit:null,emitted:null,propsDefaults:t,inheritAttrs:i.inheritAttrs,ctx:t,data:t,props:t,attrs:t,slots:t,refs:t,setupState:t,setupContext:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=n?n.root:o,o.emit=ii.bind(null,o),e.ce&&e.ce(o),o}var va=null,ya=()=>va||En,ba,xa;{let e=ue(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};ba=t(`__VUE_INSTANCE_SETTERS__`,e=>va=e),xa=t(`__VUE_SSR_SETTERS__`,e=>Ta=e)}var Sa=e=>{let t=va;return ba(e),e.scope.on(),()=>{e.scope.off(),ba(t)}},Ca=()=>{va&&va.scope.off(),ba(null)};function wa(e){return e.vnode.shapeFlag&4}var Ta=!1;function Ea(e,t=!1,n=!1){t&&xa(t);let{props:r,children:i}=e.vnode,a=wa(e);vi(e,r,a,t),ji(e,i,n||t);let o=a?Da(e,t):void 0;return t&&xa(!1),o}function Da(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Ir);let{setup:r}=n;if(r){He();let n=e.setupContext=r.length>1?ja(e):null,i=Sa(e),a=on(r,e,0,[e.props,n]),o=y(a);if(Ue(),i(),(o||e.sp)&&!sr(e)&&nr(e),o){if(a.then(Ca,Ca),t)return a.then(n=>{xa(!0);try{Oa(e,n,t)}finally{xa(!1)}}).catch(t=>{cn(t,e,0)});e.asyncDep=a}else Oa(e,a,t)}else ka(e,t)}function Oa(e,t,n){h(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:v(t)&&(e.setupState=Xt(t)),ka(e,n)}function ka(e,t,n){let i=e.type;e.render||=i.render||r;{let t=Sa(e);He();try{zr(e)}finally{Ue(),t()}}}var Aa={get(e,t){return $e(e,`get`,``),e[t]}};function ja(e){return{attrs:new Proxy(e.attrs,Aa),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function Ma(e){return e.exposed?e.exposeProxy||=new Proxy(Xt(Ht(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Pr)return Pr[n](e)},has(e,t){return t in e||t in Pr}}):e.proxy}function Na(e,t=!0){return h(e)?e.displayName||e.name:e.name||t&&e.__name}function Pa(e){return h(e)&&`__vccOpts`in e}var q=(e,t)=>Qt(e,t,Ta);function Fa(e,t,n){try{$i(-1);let r=arguments.length;return r===2?v(t)&&!d(t)?na(t)?W(e,null,[t]):W(e,t):W(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&na(n)&&(n=[n]),W(e,t,n))}finally{$i(1)}}var Ia=`3.5.42`,La=void 0,Ra=typeof window<`u`&&window.trustedTypes;if(Ra)try{La=Ra.createPolicy(`vue`,{createHTML:e=>e})}catch{}var za=La?e=>La.createHTML(e):e=>e,Ba=`http://www.w3.org/2000/svg`,Va=`http://www.w3.org/1998/Math/MathML`,Ha=typeof document<`u`?document:null,Ua=Ha&&Ha.createElement(`template`),Wa={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i=t===`svg`?Ha.createElementNS(Ba,e):t===`mathml`?Ha.createElementNS(Va,e):n?Ha.createElement(e,{is:n}):Ha.createElement(e);return e===`select`&&r&&r.multiple!=null&&i.setAttribute(`multiple`,r.multiple),i},createText:e=>Ha.createTextNode(e),createComment:e=>Ha.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Ha.querySelector(e),setScopeId(e,t){e.setAttribute(t,``)},insertStaticContent(e,t,n,r,i,a){let o=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),i!==a&&(i=i.nextSibling););else{Ua.innerHTML=za(r===`svg`?`<svg>${e}</svg>`:r===`mathml`?`<math>${e}</math>`:e);let i=Ua.content;if(r===`svg`||r===`mathml`){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Ga=`transition`,Ka=`animation`,qa=Symbol(`_vtc`),Ja={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Ya=s({},Wn,Ja),Xa=(e=>(e.displayName=`Transition`,e.props=Ya,e))((e,{slots:t})=>Fa(Jn,$a(e),t)),Za=(e,t=[])=>{d(e)?e.forEach(e=>e(...t)):e&&e(...t)},Qa=e=>e?d(e)?e.some(e=>e.length>1):e.length>1:!1;function $a(e){let t={};for(let n in e)n in Ja||(t[n]=e[n]);if(e.css===!1)return t;let{name:n=`v`,type:r,duration:i,enterFromClass:a=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:c=`${n}-enter-to`,appearFromClass:l=a,appearActiveClass:u=o,appearToClass:d=c,leaveFromClass:f=`${n}-leave-from`,leaveActiveClass:p=`${n}-leave-active`,leaveToClass:m=`${n}-leave-to`}=e,h=eo(i),g=h&&h[0],_=h&&h[1],{onBeforeEnter:v,onEnter:y,onEnterCancelled:b,onLeave:x,onLeaveCancelled:S,onBeforeAppear:C=v,onAppear:w=y,onAppearCancelled:ee=b}=t,T=(e,t,n,r)=>{e._enterCancelled=r,ro(e,t?d:c),ro(e,t?u:o),n&&n()},te=(e,t)=>{e._isLeaving=!1,ro(e,f),ro(e,m),ro(e,p),t&&t()},E=e=>(t,n)=>{let i=e?w:y,o=()=>T(t,e,n);Za(i,[t,o]),io(()=>{ro(t,e?l:a),no(t,e?d:c),Qa(i)||oo(t,r,g,o)})};return s(t,{onBeforeEnter(e){Za(v,[e]),no(e,a),no(e,o)},onBeforeAppear(e){Za(C,[e]),no(e,l),no(e,u)},onEnter:E(!1),onAppear:E(!0),onLeave(e,t){e._isLeaving=!0;let n=()=>te(e,t);no(e,f),e._enterCancelled?(no(e,p),uo(e)):(uo(e),no(e,p)),io(()=>{e._isLeaving&&(ro(e,f),no(e,m),Qa(x)||oo(e,r,_,n))}),Za(x,[e,n])},onEnterCancelled(e){T(e,!1,void 0,!0),Za(b,[e])},onAppearCancelled(e){T(e,!0,void 0,!0),Za(ee,[e])},onLeaveCancelled(e){te(e),Za(S,[e])}})}function eo(e){if(e==null)return null;if(v(e))return[to(e.enter),to(e.leave)];{let t=to(e);return[t,t]}}function to(e){return ce(e)}function no(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e[qa]||(e[qa]=new Set)).add(t)}function ro(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.remove(t));let n=e[qa];n&&(n.delete(t),n.size||(e[qa]=void 0))}function io(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}var ao=0;function oo(e,t,n,r){let i=e._endId=++ao,a=()=>{i===e._endId&&r()};if(n!=null)return setTimeout(a,n);let{type:o,timeout:s,propCount:c}=so(e,t);if(!o)return r();let l=o+`end`,u=0,d=()=>{e.removeEventListener(l,f),a()},f=t=>{t.target===e&&++u>=c&&d()};setTimeout(()=>{u<c&&d()},s+1),e.addEventListener(l,f)}function so(e,t){let n=window.getComputedStyle(e),r=e=>(n[e]||``).split(`, `),i=r(`${Ga}Delay`),a=r(`${Ga}Duration`),o=co(i,a),s=r(`${Ka}Delay`),c=r(`${Ka}Duration`),l=co(s,c),u=null,d=0,f=0;t===Ga?o>0&&(u=Ga,d=o,f=a.length):t===Ka?l>0&&(u=Ka,d=l,f=c.length):(d=Math.max(o,l),u=d>0?o>l?Ga:Ka:null,f=u?u===Ga?a.length:c.length:0);let p=u===Ga&&/\b(?:transform|all)(?:,|$)/.test(r(`${Ga}Property`).toString());return{type:u,timeout:d,propCount:f,hasTransform:p}}function co(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((t,n)=>lo(t)+lo(e[n])))}function lo(e){return e===`auto`?0:Number(e.slice(0,-1).replace(`,`,`.`))*1e3}function uo(e){return(e?e.ownerDocument:document).body.offsetHeight}function fo(e,t,n){let r=e[qa];r&&(t=(t?[t,...r]:[...r]).join(` `)),t==null?e.removeAttribute(`class`):n?e.setAttribute(`class`,t):e.className=t}var po=Symbol(`_vod`),mo=Symbol(`_vsh`),ho={name:`show`,beforeMount(e,{value:t},{transition:n}){e[po]=e.style.display===`none`?``:e.style.display,n&&t?n.beforeEnter(e):go(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:r}){!t!=!n&&(r?t?(r.beforeEnter(e),go(e,!0),r.enter(e)):r.leave(e,()=>{go(e,!1)}):go(e,t))},beforeUnmount(e,{value:t}){go(e,t)}};function go(e,t){e.style.display=t?e[po]:`none`,e[mo]=!t}var _o=Symbol(``),vo=/(?:^|;)\s*display\s*:/;function yo(e,t,n){let r=e.style,i=g(n),a=!1;if(n&&!i){if(t){if(g(t))for(let e of t.split(`;`)){let t=e.slice(0,e.indexOf(`:`)).trim();n[t]??xo(r,t,``)}else for(let e in t)n[e]??xo(r,e,``)}for(let i in n){i===`display`&&(a=!0);let o=n[i];o==null?xo(r,i,``):To(e,i,!g(t)&&t?t[i]:void 0,o)||xo(r,i,o)}}else if(i){if(t!==n){let e=r[_o];e&&(n+=`;`+e),r.cssText=n,a=vo.test(n)}}else t&&e.removeAttribute(`style`);po in e&&(e[po]=a?r.display:``,e[mo]&&(r.display=`none`))}var bo=/\s*!important$/;function xo(e,t,n){if(d(n))n.forEach(n=>xo(e,t,n));else if(n??=``,t.startsWith(`--`))bo.test(n)?e.setProperty(t,n.replace(bo,``),`important`):e.setProperty(t,n);else{let r=wo(e,t);bo.test(n)?e.setProperty(re(r),n.replace(bo,``),`important`):e[r]=n}}var So=[`Webkit`,`Moz`,`ms`],Co={};function wo(e,t){let n=Co[t];if(n)return n;let r=E(t);if(r!==`filter`&&r in e)return Co[t]=r;r=ie(r);for(let n=0;n<So.length;n++){let i=So[n]+r;if(i in e)return Co[t]=i}return t}function To(e,t,n,r){return e.tagName===`TEXTAREA`&&(t===`width`||t===`height`)&&g(r)&&n===r}var Eo=`http://www.w3.org/1999/xlink`;function Do(e,t,n,r,i,a=ge(t)){r&&t.startsWith(`xlink:`)?n==null?e.removeAttributeNS(Eo,t.slice(6,t.length)):e.setAttributeNS(Eo,t,n):n==null||a&&!_e(n)?e.removeAttribute(t):e.setAttribute(t,a?``:_(n)?String(n):n)}function Oo(e,t,n,r,i){if(t===`innerHTML`||t===`textContent`){n!=null&&(e[t]=t===`innerHTML`?za(n):n);return}let a=e.tagName;if(t===`value`&&a!==`PROGRESS`&&!a.includes(`-`)){let r=a===`OPTION`?e.getAttribute(`value`)||``:e.value,i=n==null?e.type===`checkbox`?`on`:``:String(n);(r!==i||!(`_value`in e))&&(e.value=i),n??e.removeAttribute(t),e._value=n;return}let o=!1;if(n===``||n==null){let r=typeof e[t];r===`boolean`?n=_e(n):n==null&&r===`string`?(n=``,o=!0):r===`number`&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function ko(e,t,n,r){e.addEventListener(t,n,r)}function Ao(e,t,n,r){e.removeEventListener(t,n,r)}var jo=Symbol(`_vei`);function Mo(e,t,n,r,i=null){let a=e[jo]||(e[jo]={}),o=a[t];if(r&&o)o.value=r;else{let[n,s]=Fo(t);r?ko(e,n,a[t]=zo(r,i),s):o&&(Ao(e,n,o,s),a[t]=void 0)}}var No=/(Once|Passive|Capture)$/,Po=/^on:?(?:Once|Passive|Capture)$/;function Fo(e){let t,n;for(;(n=e.match(No))&&!Po.test(e);)t||={},e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===`:`?e.slice(3):re(e.slice(2)),t]}var Io=0,Lo=Promise.resolve(),Ro=()=>Io||=(Lo.then(()=>Io=0),Date.now());function zo(e,t){let n=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=n.attached)return;let r=n.value;if(d(r)){let n=e.stopImmediatePropagation;e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0};let i=r.slice(),a=[e];for(let n=0;n<i.length&&!e._stopped;n++){let e=i[n];e&&sn(e,t,5,a)}}else sn(r,t,5,[e])};return n.value=e,n.attached=Ro(),n}var Bo=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Vo=(e,t,n,r,i,s)=>{let c=i===`svg`;t===`class`?fo(e,r,c):t===`style`?yo(e,n,r):a(t)?o(t)||Mo(e,t,n,r,s):(t[0]===`.`?(t=t.slice(1),1):t[0]===`^`?(t=t.slice(1),0):Ho(e,t,r,c))?(Oo(e,t,r),!e.tagName.includes(`-`)&&(t===`value`||t===`checked`||t===`selected`)&&Do(e,t,r,c,s,t!==`value`)):e._isVueCE&&(Uo(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!g(r)))?Oo(e,E(t),r,s,t):(t===`true-value`?e._trueValue=r:t===`false-value`&&(e._falseValue=r),Do(e,t,r,c))};function Ho(e,t,n,r){if(r)return!!(t===`innerHTML`||t===`textContent`||t in e&&Bo(t)&&h(n));if(t===`spellcheck`||t===`draggable`||t===`translate`||t===`autocorrect`||t===`sandbox`&&e.tagName===`IFRAME`||t===`form`||t===`list`&&e.tagName===`INPUT`||t===`type`&&e.tagName===`TEXTAREA`)return!1;if(t===`width`||t===`height`){let t=e.tagName;if(t===`IMG`||t===`VIDEO`||t===`CANVAS`||t===`SOURCE`)return!1}return Bo(t)&&g(n)?!1:t in e}function Uo(e,t){let n=e._def.props;if(!n)return!1;let r=E(t);return Array.isArray(n)?n.some(e=>E(e)===r):Object.keys(n).some(e=>E(e)===r)}var Wo=e=>{let t=e.props[`onUpdate:modelValue`]||!1;return d(t)?e=>oe(t,e):t};function Go(e){e.target.composing=!0}function Ko(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event(`input`)))}var qo=Symbol(`_assign`),Jo=Symbol(`_initialValue`);function Yo(e,t,n){return t&&(e=e.trim()),n&&(e=se(e)),e}var Xo={created(e,{modifiers:{lazy:t,trim:n,number:r}},i){e.parentNode&&(e.type===`text`?e[Jo]=e.defaultValue.replace(/[\r\n]/g,``):e.type===`textarea`&&(e[Jo]=e.defaultValue.replace(/\r\n?/g,`
`))),e[qo]=Wo(i);let a=r||i.props&&i.props.type===`number`;ko(e,t?`change`:`input`,t=>{t.target.composing||e[qo](Yo(e.value,n,a))}),(n||a)&&ko(e,`change`,()=>{e.value=Yo(e.value,n,a)}),t||(ko(e,`compositionstart`,Go),ko(e,`compositionend`,Ko),ko(e,`change`,Ko))},mounted(e,{value:t,modifiers:{trim:n,number:r}}){let i=t??``,a=e[Jo];delete e[Jo],a!==void 0&&(e.type===`text`||e.type===`textarea`)&&e.value!==a?e[qo](Yo(e.value,n,r)):e.value=i},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:i,number:a}},o){if(e[qo]=Wo(o),e.composing)return;let s=(a||e.type===`number`)&&!/^0\d/.test(e.value)?se(e.value):e.value,c=t??``;if(s===c)return;let l=e.getRootNode();(l instanceof Document||l instanceof ShadowRoot)&&l.activeElement===e&&e.type!==`range`&&(r&&t===n||i&&e.value.trim()===c)||(e.value=c)}},Zo=[`ctrl`,`shift`,`alt`,`meta`],Qo={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>`button`in e&&e.button!==0,middle:e=>`button`in e&&e.button!==1,right:e=>`button`in e&&e.button!==2,exact:(e,t)=>Zo.some(n=>e[`${n}Key`]&&!t.includes(n))},$o=(e,t)=>{if(!e)return e;let n=e._withMods||={},r=t.join(`.`);return n[r]||(n[r]=((n,...r)=>{for(let e=0;e<t.length;e++){let r=Qo[t[e]];if(r&&r(n,t))return}return e(n,...r)}))},es={esc:`escape`,space:` `,up:`arrow-up`,left:`arrow-left`,right:`arrow-right`,down:`arrow-down`,delete:`backspace`},ts=(e,t)=>{let n=e._withKeys||={},r=t.join(`.`);return n[r]||(n[r]=(n=>{if(!(`key`in n))return;let r=re(n.key);if(t.some(e=>e===r||es[e]===r))return e(n)}))},ns=s({patchProp:Vo},Wa),rs;function is(){return rs||=Pi(ns)}var as=((...e)=>{let t=is().createApp(...e),{mount:n}=t;return t.mount=e=>{let r=ss(e);if(!r)return;let i=t._component;!h(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent=``);let a=n(r,!1,os(r));return r instanceof Element&&(r.removeAttribute(`v-cloak`),r.setAttribute(`data-v-app`,``)),a},t});function os(e){if(e instanceof SVGElement)return`svg`;if(typeof MathMLElement==`function`&&e instanceof MathMLElement)return`mathml`}function ss(e){return g(e)?document.querySelector(e):e}var cs=typeof document<`u`;function ls(e){return typeof e==`object`||`displayName`in e||`props`in e||`__vccOpts`in e}function us(e){return e.__esModule||e[Symbol.toStringTag]===`Module`||e.default&&ls(e.default)}var J=Object.assign;function ds(e,t){let n={};for(let r in t){let i=t[r];n[r]=ps(i)?i.map(e):e(i)}return n}var fs=()=>{},ps=Array.isArray;function ms(e,t){let n={};for(let r in e)n[r]=r in t?t[r]:e[r];return n}var hs=/#/g,gs=/&/g,_s=/\//g,vs=/=/g,ys=/\?/g,bs=/\+/g,xs=/%5B/g,Ss=/%5D/g,Cs=/%5E/g,ws=/%60/g,Ts=/%7B/g,Es=/%7C/g,Ds=/%7D/g,Os=/%20/g;function ks(e){return e==null?``:encodeURI(``+e).replace(Es,`|`).replace(xs,`[`).replace(Ss,`]`)}function As(e){return ks(e).replace(Ts,`{`).replace(Ds,`}`).replace(Cs,`^`)}function js(e){return ks(e).replace(bs,`%2B`).replace(Os,`+`).replace(hs,`%23`).replace(gs,`%26`).replace(ws,"`").replace(Ts,`{`).replace(Ds,`}`).replace(Cs,`^`)}function Ms(e){return js(e).replace(vs,`%3D`)}function Ns(e){return ks(e).replace(hs,`%23`).replace(ys,`%3F`)}function Ps(e){return Ns(e).replace(_s,`%2F`)}function Fs(e){if(e==null)return null;try{return decodeURIComponent(``+e)}catch{}return``+e}var Is=/\/$/,Ls=e=>e.replace(Is,``);function Rs(e,t,n=`/`){let r,i={},a=``,o=``,s=t.indexOf(`#`),c=t.indexOf(`?`);return c=s>=0&&c>s?-1:c,c>=0&&(r=t.slice(0,c),a=t.slice(c,s>0?s:t.length),i=e(a.slice(1))),s>=0&&(r||=t.slice(0,s),o=t.slice(s,t.length)),r=Ks(r??t,n),{fullPath:r+a+o,path:r,query:i,hash:Fs(o)}}function zs(e,t){let n=t.query?e(t.query):``;return t.path+(n&&`?`)+n+(t.hash||``)}function Bs(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||`/`}function Vs(e,t,n){let r=t.matched.length-1,i=n.matched.length-1;return r>-1&&r===i&&Hs(t.matched[r],n.matched[i])&&Us(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function Hs(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Us(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(var n in e)if(!Ws(e[n],t[n]))return!1;return!0}function Ws(e,t){return ps(e)?Gs(e,t):ps(t)?Gs(t,e):e?.valueOf()===t?.valueOf()}function Gs(e,t){return ps(t)?e.length===t.length&&e.every((e,n)=>e===t[n]):e.length===1&&e[0]===t}function Ks(e,t){if(e.startsWith(`/`))return e;if(!e)return t;let n=t.split(`/`),r=e.split(`/`),i=r[r.length-1];(i===`..`||i===`.`)&&r.push(``);let a=n.length-1,o,s;for(o=0;o<r.length;o++)if(s=r[o],s!==`.`){if(s===`..`)a>1&&a--;else break}return n.slice(0,a).join(`/`)+`/`+r.slice(o).join(`/`)}var qs={path:`/`,name:void 0,params:{},query:{},hash:``,fullPath:`/`,matched:[],meta:{},redirectedFrom:void 0},Js=function(e){return e.pop=`pop`,e.push=`push`,e}({}),Ys=function(e){return e.back=`back`,e.forward=`forward`,e.unknown=``,e}({});function Xs(e){if(!e){if(cs){let t=document.querySelector(`base`);e=t&&t.getAttribute(`href`)||`/`,e=e.replace(/^\w+:\/\/[^\/]+/,``)}else e=`/`}return e[0]!==`/`&&e[0]!==`#`&&(e=`/`+e),Ls(e)}var Zs=/^[^#]+#/;function Qs(e,t){return e.replace(Zs,`#`)+t}function $s(e,t){let n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}var ec=()=>({left:window.scrollX,top:window.scrollY});function tc(e){let t;if(`el`in e){let n=e.el,r=typeof n==`string`&&n.startsWith(`#`),i=typeof n==`string`?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!i)return;t=$s(i,e)}else t=e;`scrollBehavior`in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left==null?window.scrollX:t.left,t.top==null?window.scrollY:t.top)}function nc(e,t){return(history.state?history.state.position-t:-1)+e}var rc=new Map;function ic(e,t){rc.set(e,t)}function ac(e){let t=rc.get(e);return rc.delete(e),t}function oc(e){return typeof e==`string`||e&&typeof e==`object`}function sc(e){return typeof e==`string`||typeof e==`symbol`}var Y=function(e){return e[e.MATCHER_NOT_FOUND=1]=`MATCHER_NOT_FOUND`,e[e.NAVIGATION_GUARD_REDIRECT=2]=`NAVIGATION_GUARD_REDIRECT`,e[e.NAVIGATION_ABORTED=4]=`NAVIGATION_ABORTED`,e[e.NAVIGATION_CANCELLED=8]=`NAVIGATION_CANCELLED`,e[e.NAVIGATION_DUPLICATED=16]=`NAVIGATION_DUPLICATED`,e}({}),cc=Symbol(``);Y.MATCHER_NOT_FOUND,Y.NAVIGATION_GUARD_REDIRECT,Y.NAVIGATION_ABORTED,Y.NAVIGATION_CANCELLED,Y.NAVIGATION_DUPLICATED;function lc(e,t){return J(Error(),{type:e,[cc]:!0},t)}function uc(e,t){return e instanceof Error&&cc in e&&(t==null||!!(e.type&t))}function dc(e){let t={};if(e===``||e===`?`)return t;let n=(e[0]===`?`?e.slice(1):e).split(`&`);for(let e=0;e<n.length;++e){let r=n[e].replace(bs,` `),i=r.indexOf(`=`),a=Fs(i<0?r:r.slice(0,i)),o=i<0?null:Fs(r.slice(i+1));if(a in t){let e=t[a];ps(e)||(e=t[a]=[e]),e.push(o)}else t[a]=o}return t}function fc(e){let t=``;for(let n in e){let r=e[n];if(n=Ms(n),r==null){r!==void 0&&(t+=(t.length?`&`:``)+n);continue}(ps(r)?r.map(e=>e&&js(e)):[r&&js(r)]).forEach(e=>{e!==void 0&&(t+=(t.length?`&`:``)+n,e!=null&&(t+=`=`+e))})}return t}function pc(e){let t={};for(let n in e){let r=e[n];r!==void 0&&(t[n]=ps(r)?r.map(e=>e==null?null:``+e):r==null?r:``+r)}return t}var mc=Symbol(``),hc=Symbol(``),gc=Symbol(``),_c=Symbol(``),vc=Symbol(``);function yc(){let e=[];function t(t){return e.push(t),()=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function bc(e,t,n,r,i,a=e=>e()){let o=r&&(r.enterCallbacks[i]=r.enterCallbacks[i]||[]);return()=>new Promise((s,c)=>{let l=e=>{e===!1?c(lc(Y.NAVIGATION_ABORTED,{from:n,to:t})):e instanceof Error?c(e):oc(e)?c(lc(Y.NAVIGATION_GUARD_REDIRECT,{from:t,to:e})):(o&&r.enterCallbacks[i]===o&&typeof e==`function`&&o.push(e),s())},u=a(()=>e.call(r&&r.instances[i],t,n,l)),d=Promise.resolve(u);e.length<3&&(d=d.then(l)),d.catch(e=>c(e))})}function xc(e,t,n,r,i=e=>e()){let a=[];for(let o of e)for(let e in o.components){let s=o.components[e];if(t===`beforeRouteEnter`||o.instances[e]){if(ls(s)){let c=(s.__vccOpts||s)[t];c&&a.push(bc(c,n,r,o,e,i))}else{let c=s();a.push(()=>c.then(a=>{if(!a)throw Error(`Couldn't resolve component "${e}" at "${o.path}"`);let s=us(a)?a.default:a;o.mods[e]=a,o.components[e]=s;let c=(s.__vccOpts||s)[t];return c&&bc(c,n,r,o,e,i)()}))}}}return a}function Sc(e,t){let n=[],r=[],i=[],a=Math.max(t.matched.length,e.matched.length);for(let o=0;o<a;o++){let a=t.matched[o];a&&(e.matched.find(e=>Hs(e,a))?r.push(a):n.push(a));let s=e.matched[o];s&&(t.matched.find(e=>Hs(e,s))||i.push(s))}return[n,r,i]}var Cc=()=>location.protocol+`//`+location.host;function wc(e,t){let{pathname:n,search:r,hash:i}=t,a=e.indexOf(`#`);if(a>-1){let t=i.includes(e.slice(a))?e.slice(a).length:1,n=i.slice(t);return n[0]!==`/`&&(n=`/`+n),Bs(n,``)}return Bs(n,e)+r+i}function Tc(e,t,n,r){let i=[],a=[],o=null,s=({state:a})=>{let s=wc(e,location),c=n.value,l=t.value,u=0;if(a){if(n.value=s,t.value=a,o&&o===c){o=null;return}u=l?a.position-l.position:0}else r(s);i.forEach(e=>{e(n.value,c,{delta:u,type:Js.pop,direction:u?u>0?Ys.forward:Ys.back:Ys.unknown})})};function c(){o=n.value}function l(e){i.push(e);let t=()=>{let t=i.indexOf(e);t>-1&&i.splice(t,1)};return a.push(t),t}function u(){if(document.visibilityState===`hidden`){let{history:e}=window;if(!e.state)return;e.replaceState(J({},e.state,{scroll:ec()}),``)}}function d(){for(let e of a)e();a=[],window.removeEventListener(`popstate`,s),window.removeEventListener(`pagehide`,u),document.removeEventListener(`visibilitychange`,u)}return window.addEventListener(`popstate`,s),window.addEventListener(`pagehide`,u),document.addEventListener(`visibilitychange`,u),{pauseListeners:c,listen:l,destroy:d}}function Ec(e,t,n,r=!1,i=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:i?ec():null}}function Dc(e){let{history:t,location:n}=window,r={value:wc(e,n)},i={value:t.state};i.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function a(r,a,o){let s=e.indexOf(`#`),c=s>-1?(n.host&&document.querySelector(`base`)?e:e.slice(s))+r:Cc()+e+r;try{t[o?`replaceState`:`pushState`](a,``,c),i.value=a}catch(e){console.error(e),n[o?`replace`:`assign`](c)}}function o(e,n){a(e,J({},t.state,Ec(i.value.back,e,i.value.forward,!0),n,{position:i.value.position}),!0),r.value=e}function s(e,n){let o=J({},i.value,t.state,{forward:e,scroll:ec()});a(o.current,o,!0),a(e,J({},Ec(r.value,e,null),{position:o.position+1},n),!1),r.value=e}return{location:r,state:i,push:s,replace:o}}function Oc(e){e=Xs(e);let t=Dc(e),n=Tc(e,t.state,t.location,t.replace);function r(e,t=!0){t||n.pauseListeners(),history.go(e)}let i=J({location:``,base:e,go:r,createHref:Qs.bind(null,e)},t,n);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>t.state.value}),i}function kc(e){return e=location.host?e||location.pathname+location.search:``,e.includes(`#`)||(e+=`#`),Oc(e)}var Ac=function(e){return e[e.Static=0]=`Static`,e[e.Param=1]=`Param`,e[e.Group=2]=`Group`,e}({}),X=function(e){return e[e.Static=0]=`Static`,e[e.Param=1]=`Param`,e[e.ParamRegExp=2]=`ParamRegExp`,e[e.ParamRegExpEnd=3]=`ParamRegExpEnd`,e[e.EscapeNext=4]=`EscapeNext`,e}(X||{}),jc={type:Ac.Static,value:``},Mc=/[a-zA-Z0-9_]/;function Nc(e){if(!e)return[[]];if(e===`/`)return[[jc]];if(!e.startsWith(`/`))throw Error(`Invalid path "${e}"`);function t(e){throw Error(`ERR (${n})/"${l}": ${e}`)}let n=X.Static,r=n,i=[],a;function o(){a&&i.push(a),a=[]}let s=0,c,l=``,u=``;function d(){l&&=(n===X.Static?a.push({type:Ac.Static,value:l}):n===X.Param||n===X.ParamRegExp||n===X.ParamRegExpEnd?(a.length>1&&(c===`*`||c===`+`)&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),a.push({type:Ac.Param,value:l,regexp:u,repeatable:c===`*`||c===`+`,optional:c===`*`||c===`?`})):t(`Invalid state to consume buffer`),``)}function f(){l+=c}for(;s<e.length;){if(c=e[s++],c===`\\`&&n!==X.ParamRegExp){r=n,n=X.EscapeNext;continue}switch(n){case X.Static:c===`/`?(l&&d(),o()):c===`:`?(d(),n=X.Param):f();break;case X.EscapeNext:f(),n=r;break;case X.Param:c===`(`?n=X.ParamRegExp:Mc.test(c)?f():(d(),n=X.Static,c!==`*`&&c!==`?`&&c!==`+`&&s--);break;case X.ParamRegExp:c===`)`?u[u.length-1]==`\\`?u=u.slice(0,-1)+c:n=X.ParamRegExpEnd:u+=c;break;case X.ParamRegExpEnd:d(),n=X.Static,c!==`*`&&c!==`?`&&c!==`+`&&s--,u=``;break;default:t(`Unknown state`)}}return n===X.ParamRegExp&&t(`Unfinished custom RegExp for param "${l}"`),d(),o(),i}var Pc=`[^/]+?`,Fc={sensitive:!1,strict:!1,start:!0,end:!0},Ic=function(e){return e[e._multiplier=10]=`_multiplier`,e[e.Root=90]=`Root`,e[e.Segment=40]=`Segment`,e[e.SubSegment=30]=`SubSegment`,e[e.Static=40]=`Static`,e[e.Dynamic=20]=`Dynamic`,e[e.BonusCustomRegExp=10]=`BonusCustomRegExp`,e[e.BonusWildcard=-50]=`BonusWildcard`,e[e.BonusRepeatable=-20]=`BonusRepeatable`,e[e.BonusOptional=-8]=`BonusOptional`,e[e.BonusStrict=.7000000000000001]=`BonusStrict`,e[e.BonusCaseSensitive=.25]=`BonusCaseSensitive`,e}(Ic||{}),Lc=/[.+*?^${}()[\]/\\]/g;function Rc(e,t){let n=J({},Fc,t),r=[],i=n.start?`^`:``,a=[];for(let t of e){let e=t.length?[]:[Ic.Root];n.strict&&!t.length&&(i+=`/`);for(let r=0;r<t.length;r++){let o=t[r],s=Ic.Segment+(n.sensitive?Ic.BonusCaseSensitive:0);if(o.type===Ac.Static)r||(i+=`/`),i+=o.value.replace(Lc,`\\$&`),s+=Ic.Static;else if(o.type===Ac.Param){let{value:e,repeatable:n,optional:c,regexp:l}=o;a.push({name:e,repeatable:n,optional:c});let u=l||Pc;if(u!==Pc){s+=Ic.BonusCustomRegExp;try{`${u}`}catch(t){throw Error(`Invalid custom RegExp for param "${e}" (${u}): `+t.message)}}let d=n?`((?:${u})(?:/(?:${u}))*)`:`(${u})`;r||(d=c&&t.length<2?`(?:/${d})`:`/`+d),c&&(d+=`?`),i+=d,s+=Ic.Dynamic,c&&(s+=Ic.BonusOptional),n&&(s+=Ic.BonusRepeatable),u===`.*`&&(s+=Ic.BonusWildcard)}e.push(s)}r.push(e)}if(n.strict&&n.end){let e=r.length-1;r[e][r[e].length-1]+=Ic.BonusStrict}n.strict||(i+=`/?`),n.end?i+=`$`:n.strict&&!i.endsWith(`/`)&&(i+=`(?:/|$)`);let o=new RegExp(i,n.sensitive?``:`i`);function s(e){let t=e.match(o),n={};if(!t)return null;for(let e=1;e<t.length;e++){let r=t[e]||``,i=a[e-1];n[i.name]=r&&i.repeatable?r.split(`/`):r}return n}function c(t){let n=``,r=!1;for(let i of e){(!r||!n.endsWith(`/`))&&(n+=`/`),r=!1;for(let e of i)if(e.type===Ac.Static)n+=e.value;else if(e.type===Ac.Param){let{value:a,repeatable:o,optional:s}=e,c=a in t?t[a]:``;if(ps(c)&&!o)throw Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);let l=ps(c)?c.join(`/`):c;if(!l){if(s)i.length<2&&(n.endsWith(`/`)?n=n.slice(0,-1):r=!0);else throw Error(`Missing required param "${a}"`)}n+=l}}return n||`/`}return{re:o,score:r,keys:a,parse:s,stringify:c}}function zc(e,t){let n=0;for(;n<e.length&&n<t.length;){let r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===Ic.Static+Ic.Segment?-1:1:e.length>t.length?t.length===1&&t[0]===Ic.Static+Ic.Segment?1:-1:0}function Bc(e,t){let n=0,r=e.score,i=t.score;for(;n<r.length&&n<i.length;){let e=zc(r[n],i[n]);if(e)return e;n++}if(Math.abs(i.length-r.length)===1){if(Vc(r))return 1;if(Vc(i))return-1}return i.length-r.length}function Vc(e){let t=e[e.length-1];return e.length>0&&t[t.length-1]<0}var Hc={strict:!1,end:!0,sensitive:!1};function Uc(e,t,n){let r=J(Rc(Nc(e.path),n),{record:e,parent:t,children:[],alias:[]});return t&&!r.record.aliasOf==!t.record.aliasOf&&t.children.push(r),r}function Wc(e,t){let n=[],r=new Map;t=ms(Hc,t);function i(e){return r.get(e)}function a(e,n,r){let i=!r,s=Kc(e);s.aliasOf=r&&r.record;let l=ms(t,e),u=[s];if(`alias`in e){let t=typeof e.alias==`string`?[e.alias]:e.alias;for(let e of t)u.push(Kc(J({},s,{components:r?r.record.components:s.components,path:e,aliasOf:r?r.record:s})))}let d,f;for(let t of u){let{path:u}=t;if(n&&u[0]!==`/`){let e=n.record.path,r=e[e.length-1]===`/`?``:`/`;t.path=n.record.path+(u&&r+u)}if(d=Uc(t,n,l),r?r.alias.push(d):(f||=d,f!==d&&f.alias.push(d),i&&e.name&&!Jc(d)&&o(e.name)),Qc(d)&&c(d),s.children){let e=s.children;for(let t=0;t<e.length;t++)a(e[t],d,r&&r.children[t])}r||=d}return f?()=>{o(f)}:fs}function o(e){if(sc(e)){let t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(o),t.alias.forEach(o))}else{let t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(o),e.alias.forEach(o))}}function s(){return n}function c(e){let t=Xc(e,n);n.splice(t,0,e),e.record.name&&!Jc(e)&&r.set(e.record.name,e)}function l(e,t){let i,a={},o,s;if(`name`in e&&e.name){if(i=r.get(e.name),!i)throw lc(Y.MATCHER_NOT_FOUND,{location:e});s=i.record.name,a=J(Gc(t.params,i.keys.filter(e=>!e.optional).concat(i.parent?i.parent.keys.filter(e=>e.optional):[]).map(e=>e.name)),e.params&&Gc(e.params,i.keys.map(e=>e.name))),o=i.stringify(a)}else if(e.path!=null)o=e.path,i=n.find(e=>e.re.test(o)),i&&(a=i.parse(o),s=i.record.name);else{if(i=t.name?r.get(t.name):n.find(e=>e.re.test(t.path)),!i)throw lc(Y.MATCHER_NOT_FOUND,{location:e,currentLocation:t});s=i.record.name,a=J({},t.params,e.params),o=i.stringify(a)}let c=[],l=i;for(;l;)c.unshift(l.record),l=l.parent;return{name:s,path:o,params:a,matched:c,meta:Yc(c)}}e.forEach(e=>a(e));function u(){n.length=0,r.clear()}return{addRoute:a,resolve:l,removeRoute:o,clearRoutes:u,getRoutes:s,getRecordMatcher:i}}function Gc(e,t){let n={};for(let r of t)r in e&&(n[r]=e[r]);return n}function Kc(e){let t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:qc(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:`components`in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function qc(e){let t={},n=e.props||!1;if(`component`in e)t.default=n;else for(let r in e.components)t[r]=typeof n==`object`?n[r]:n;return t}function Jc(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Yc(e){return e.reduce((e,t)=>J(e,t.meta),{})}function Xc(e,t){let n=0,r=t.length;for(;n!==r;){let i=n+r>>1;Bc(e,t[i])<0?r=i:n=i+1}let i=Zc(e);return i&&(r=t.lastIndexOf(i,r-1)),r}function Zc(e){let t=e;for(;t=t.parent;)if(Qc(t)&&Bc(e,t)===0)return t}function Qc({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function $c(e){let t=jn(gc),n=jn(_c),r=q(()=>{let n=I(e.to);return t.resolve(n)}),i=q(()=>{let{matched:e}=r.value,{length:t}=e,i=e[t-1],a=n.matched;if(!i||!a.length)return-1;let o=a.findIndex(Hs.bind(null,i));if(o>-1)return o;let s=il(e[t-2]);return t>1&&il(i)===s&&a[a.length-1].path!==s?a.findIndex(Hs.bind(null,e[t-2])):o}),a=q(()=>i.value>-1&&rl(n.params,r.value.params)),o=q(()=>i.value>-1&&i.value===n.matched.length-1&&Us(n.params,r.value.params));function s(n={}){if(nl(n)){let n=t[I(e.replace)?`replace`:`push`](I(e.to)).catch(fs);return e.viewTransition&&typeof document<`u`&&`startViewTransition`in document&&document.startViewTransition(()=>n),n}return Promise.resolve()}return{route:r,href:q(()=>r.value.href),isActive:a,isExactActive:o,navigate:s}}function el(e){return e.length===1?e[0]:e}var tl=tr({name:`RouterLink`,compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:`page`},viewTransition:Boolean},useLink:$c,setup(e,{slots:t}){let n=Pt($c(e)),{options:r}=jn(gc),i=q(()=>({[al(e.activeClass,r.linkActiveClass,`router-link-active`)]:n.isActive,[al(e.exactActiveClass,r.linkExactActiveClass,`router-link-exact-active`)]:n.isExactActive}));return()=>{let r=t.default&&el(t.default(n));return e.custom?r:Fa(`a`,{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:i.value},r)}}});function nl(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&(e.button===void 0||e.button===0)){if(e.currentTarget&&e.currentTarget.getAttribute){let t=e.currentTarget.getAttribute(`target`);if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function rl(e,t){for(let n in t){let r=t[n],i=e[n];if(typeof r==`string`){if(r!==i)return!1}else if(!ps(i)||i.length!==r.length||r.some((e,t)=>e.valueOf()!==i[t].valueOf()))return!1}return!0}function il(e){return e?e.aliasOf?e.aliasOf.path:e.path:``}var al=(e,t,n)=>e??t??n,ol=tr({name:`RouterView`,inheritAttrs:!1,props:{name:{type:String,default:`default`},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){let r=jn(vc),i=q(()=>e.route||r.value),a=jn(hc,0),o=q(()=>{let e=I(a),{matched:t}=i.value,n;for(;(n=t[e])&&!n.components;)e++;return e}),s=q(()=>i.value.matched[o.value]);An(hc,q(()=>o.value+1)),An(mc,s),An(vc,i);let c=F();return Pn(()=>[c.value,s.value,e.name],([e,t,n],[r,i,a])=>{t&&(t.instances[n]=e,i&&i!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=i.leaveGuards),t.updateGuards.size||(t.updateGuards=i.updateGuards))),e&&t&&(!i||!Hs(t,i)||!r)&&(t.enterCallbacks[n]||[]).forEach(t=>t(e))},{flush:`post`}),()=>{let r=i.value,a=e.name,o=s.value,l=o&&o.components[a];if(!l)return sl(n.default,{Component:l,route:r});let u=o.props[a],d=Fa(l,J({},u?u===!0?r.params:typeof u==`function`?u(r):u:null,t,{onVnodeUnmounted:e=>{e.component.isUnmounted&&(o.instances[a]=null)},ref:c}));return sl(n.default,{Component:d,route:r})||d}}});function sl(e,t){if(!e)return null;let n=e(t);return n.length===1?n[0]:n}var cl=ol;function ll(e){let t=Wc(e.routes,e),n=e.parseQuery||dc,r=e.stringifyQuery||fc,i=e.history,a=yc(),o=yc(),s=yc(),c=Kt(qs),l=qs;cs&&e.scrollBehavior&&`scrollRestoration`in history&&(history.scrollRestoration=`manual`);let u=ds.bind(null,e=>``+e),d=ds.bind(null,Ps),f=ds.bind(null,Fs);function p(e,n){let r,i;return sc(e)?(r=t.getRecordMatcher(e),i=n):i=e,t.addRoute(i,r)}function m(e){let n=t.getRecordMatcher(e);n&&t.removeRoute(n)}function h(){return t.getRoutes().map(e=>e.record)}function g(e){return!!t.getRecordMatcher(e)}function _(e,a){if(a=J({},a||c.value),typeof e==`string`){let r=Rs(n,e,a.path),o=t.resolve({path:r.path},a),s=i.createHref(r.fullPath);return J(r,o,{params:f(o.params),hash:Fs(r.hash),redirectedFrom:void 0,href:s})}let o;if(e.path!=null)o=J({},e,{path:Rs(n,e.path,a.path).path});else{let t=J({},e.params);for(let e in t)t[e]??delete t[e];o=J({},e,{params:d(t)}),a.params=d(a.params)}let s=t.resolve(o,a),l=e.hash||``;s.params=u(f(s.params));let p=zs(r,J({},e,{hash:As(l),path:s.path})),m=i.createHref(p);return J({fullPath:p,hash:l,query:r===fc?pc(e.query):e.query||{}},s,{redirectedFrom:void 0,href:m})}function v(e){return typeof e==`string`?Rs(n,e,c.value.path):J({},e)}function y(e,t){if(l!==e)return lc(Y.NAVIGATION_CANCELLED,{from:t,to:e})}function b(e){return C(e)}function x(e){return b(J(v(e),{replace:!0}))}function S(e,t){let n=e.matched[e.matched.length-1];if(n&&n.redirect){let{redirect:r}=n,i=typeof r==`function`?r(e,t):r;return typeof i==`string`&&(i=i.includes(`?`)||i.includes(`#`)?i=v(i):{path:i},i.params={}),J({query:e.query,hash:e.hash,params:i.path==null?e.params:{}},i)}}function C(e,t){let n=l=_(e),i=c.value,a=e.state,o=e.force,s=e.replace===!0,u=S(n,i);if(u)return C(J(v(u),{state:typeof u==`object`?J({},a,u.state):a,force:o,replace:s}),t||n);let d=n;d.redirectedFrom=t;let f;return!o&&Vs(r,i,n)&&(f=lc(Y.NAVIGATION_DUPLICATED,{to:d,from:i}),ce(i,i,!0,!1)),(f?Promise.resolve(f):T(d,i)).catch(e=>uc(e)?uc(e,Y.NAVIGATION_GUARD_REDIRECT)?e:se(e):oe(e,d,i)).then(e=>{if(e){if(uc(e,Y.NAVIGATION_GUARD_REDIRECT))return C(J({replace:s},v(e.to),{state:typeof e.to==`object`?J({},a,e.to.state):a,force:o}),t||d)}else e=E(d,i,!0,s,a);return te(d,i,e),e})}function w(e,t){let n=y(e,t);return n?Promise.reject(n):Promise.resolve()}function ee(e){let t=k.values().next().value;return t&&typeof t.runWithContext==`function`?t.runWithContext(e):e()}function T(e,t){let n,[r,i,s]=Sc(e,t);n=xc(r.reverse(),`beforeRouteLeave`,e,t);for(let i of r)i.leaveGuards.forEach(r=>{n.push(bc(r,e,t))});let c=w.bind(null,e,t);return n.push(c),fe(n).then(()=>{n=[];for(let r of a.list())n.push(bc(r,e,t));return n.push(c),fe(n)}).then(()=>{n=xc(i,`beforeRouteUpdate`,e,t);for(let r of i)r.updateGuards.forEach(r=>{n.push(bc(r,e,t))});return n.push(c),fe(n)}).then(()=>{n=[];for(let r of s)if(r.beforeEnter){if(ps(r.beforeEnter))for(let i of r.beforeEnter)n.push(bc(i,e,t));else n.push(bc(r.beforeEnter,e,t))}return n.push(c),fe(n)}).then(()=>(e.matched.forEach(e=>e.enterCallbacks={}),n=xc(s,`beforeRouteEnter`,e,t,ee),n.push(c),fe(n))).then(()=>{n=[];for(let r of o.list())n.push(bc(r,e,t));return n.push(c),fe(n)}).catch(e=>uc(e,Y.NAVIGATION_CANCELLED)?e:Promise.reject(e))}function te(e,t,n){s.list().forEach(r=>ee(()=>r(e,t,n)))}function E(e,t,n,r,a){let o=y(e,t);if(o)return o;let s=t===qs,l=cs?history.state:{};n&&(r||s?i.replace(e.fullPath,J({scroll:s&&l&&l.scroll},a)):i.push(e.fullPath,a)),c.value=e,ce(e,t,n,s),se()}let ne;function re(){ne||=i.listen((e,t,n)=>{if(!de.listening)return;let r=_(e),a=S(r,de.currentRoute.value);if(a){C(J(a,{replace:!0,force:!0}),r).catch(fs);return}l=r;let o=c.value;cs&&ic(nc(o.fullPath,n.delta),ec()),T(r,o).catch(e=>uc(e,Y.NAVIGATION_ABORTED|Y.NAVIGATION_CANCELLED)?e:uc(e,Y.NAVIGATION_GUARD_REDIRECT)?(C(J(v(e.to),{force:!0}),r).then(e=>{uc(e,Y.NAVIGATION_ABORTED|Y.NAVIGATION_DUPLICATED)&&!n.delta&&n.type===Js.pop&&i.go(-1,!1)}).catch(fs),Promise.reject()):(n.delta&&i.go(-n.delta,!1),oe(e,r,o))).then(e=>{e||=E(r,o,!1),e&&(n.delta&&!uc(e,Y.NAVIGATION_CANCELLED)?i.go(-n.delta,!1):n.type===Js.pop&&uc(e,Y.NAVIGATION_ABORTED|Y.NAVIGATION_DUPLICATED)&&i.go(-1,!1)),te(r,o,e)}).catch(fs)})}let ie=yc(),ae=yc(),D;function oe(e,t,n){se(e);let r=ae.list();return r.length?r.forEach(r=>r(e,t,n)):console.error(e),Promise.reject(e)}function O(){return D&&c.value!==qs?Promise.resolve():new Promise((e,t)=>{ie.add([e,t])})}function se(e){return D||(D=!e,re(),ie.list().forEach(([t,n])=>e?n(e):t()),ie.reset()),e}function ce(t,n,r,i){let{scrollBehavior:a}=e;if(!cs||!a)return Promise.resolve();let o=!r&&ac(nc(t.fullPath,0))||(i||!r)&&history.state&&history.state.scroll||null;return _n().then(()=>a(t,n,o)).then(e=>e&&tc(e)).catch(e=>oe(e,t,n))}let le=e=>i.go(e),ue,k=new Set,de={currentRoute:c,listening:!0,addRoute:p,removeRoute:m,clearRoutes:t.clearRoutes,hasRoute:g,getRoutes:h,resolve:_,options:e,push:b,replace:x,go:le,back:()=>le(-1),forward:()=>le(1),beforeEach:a.add,beforeResolve:o.add,afterEach:s.add,onError:ae.add,isReady:O,install(e){e.component(`RouterLink`,tl),e.component(`RouterView`,cl),e.config.globalProperties.$router=de,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>I(c)}),cs&&!ue&&c.value===qs&&(ue=!0,b(i.location).catch(e=>{}));let t={};for(let e in qs)Object.defineProperty(t,e,{get:()=>c.value[e],enumerable:!0});e.provide(gc,de),e.provide(_c,Ft(t)),e.provide(vc,c);let n=e.unmount;k.add(e),e.unmount=function(){k.delete(e),k.size<1&&(l=qs,ne&&ne(),ne=null,c.value=qs,ue=!1,D=!1),n()}}};function fe(e){return e.reduce((e,t)=>e.then(()=>ee(t)),Promise.resolve())}return de}function ul(){return jn(gc)}function dl(e){return jn(_c)}var fl=`homepage-music-volume`,pl=`homepage-bgm-muted`,ml=F(null),hl=F(!1),gl=F(!0),_l=F(.55),vl=F(0),yl=F(0),bl=F(0);function xl(){let e=ml.value;if(!e)return;let t=e.play?.();t&&typeof t.catch==`function`&&t.catch(()=>hl.value=!1)}function Sl(){if(hl.value){gl.value=!1,ml.value?.pause();try{sessionStorage.setItem(pl,`1`)}catch{}}else{gl.value=!0;try{sessionStorage.removeItem(pl)}catch{}xl()}}function Cl(e){_l.value=e,ml.value&&(ml.value.volume=e);try{localStorage.setItem(fl,String(e))}catch{}}function wl(){let e=ml.value;e&&e.duration>0&&(vl.value=e.currentTime/e.duration*100),yl.value=e?.currentTime||0,bl.value=e?.duration||0}function Tl(){hl.value&&ml.value?.pause()}function El(){gl.value&&!hl.value&&xl()}function Dl(){gl.value&&!hl.value&&xl(),setTimeout(()=>{hl.value&&(window.removeEventListener(`pointerdown`,Dl,!0),window.removeEventListener(`keydown`,Dl,!0),window.removeEventListener(`touchstart`,Dl,!0))},200)}function Ol(e){if(!e)return;ml.value=e,e.loop=!0,e.addEventListener(`playing`,()=>hl.value=!0),e.addEventListener(`pause`,()=>hl.value=!1);let t=NaN;try{t=parseFloat(localStorage.getItem(fl)||``)}catch{}Number.isNaN(t)||(_l.value=t),e.volume=_l.value;let n=!1;try{n=sessionStorage.getItem(pl)===`1`}catch{}n?gl.value=!1:(gl.value=!0,xl(),window.addEventListener(`pointerdown`,Dl,!0),window.addEventListener(`keydown`,Dl,!0),window.addEventListener(`touchstart`,Dl,!0))}function kl(){return{playing:hl,wantPlay:gl,volume:_l,progress:vl,timeCur:yl,timeDur:bl,attach:Ol,togglePlay:Sl,setVolume:Cl,onTimeUpdate:wl,videoYield:Tl,videoResume:El}}var Al=(e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n},jl={class:`container nav`},Ml=[`aria-expanded`,`aria-label`],Nl=[`aria-current`,`onClick`],Pl={class:`nav-ico`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"aria-hidden":`true`},Fl=[`d`],Il=[`aria-label`,`aria-pressed`],Ll=[`aria-label`,`aria-pressed`],Rl={key:0,class:`nav-ico`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"aria-hidden":`true`},zl=[`d`],Bl={key:1,class:`nav-ico`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"aria-hidden":`true`},Vl=[`d`],Hl={class:`nav-ico`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"aria-hidden":`true`},Ul=[`d`],Wl=[`aria-label`,`aria-pressed`,`title`],Gl=[`aria-label`,`aria-pressed`],Kl={key:0,class:`nav-ico`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"aria-hidden":`true`},ql=[`d`],Jl={key:1,class:`nav-ico`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"aria-hidden":`true`},Yl=[`d`],Xl=Al({__name:`SiteHeader`,setup(e){let t=F(!1),n=F(null),r=dl(),i=ul(),a=F(!1),o=null,s=F(0),c=F(null),l=F([]);function u(e){a.value=e.matches}gr(()=>{typeof window.matchMedia==`function`&&(o=window.matchMedia(`(max-width: 768px)`),a.value=o.matches,o.addEventListener?.(`change`,u))}),yr(()=>{o?.removeEventListener?.(`change`,u),f&&cancelAnimationFrame(f)}),Pn(t,async e=>{if(!e||!a.value)return;await _n();let t=b.findIndex(e=>x(e));t>=0&&d(t,!1)});function d(e,t=!0){let n=l.value[e],r=c.value;n&&r&&(r.scrollTo({left:n.offsetLeft+n.offsetWidth/2-r.clientWidth/2,behavior:t?`smooth`:`auto`}),s.value=e)}let f=0;function p(){f||=requestAnimationFrame(()=>{f=0;let e=c.value;if(!e)return;let t=e.scrollLeft+e.clientWidth/2,n=0,r=1/0;l.value.forEach((e,i)=>{if(!e)return;let a=Math.abs(e.offsetLeft+e.offsetWidth/2-t);a<r&&(r=a,n=i)}),s.value=n})}function m(e,n){s.value===e?(t.value=!1,i.push(n.to)):d(e)}let h=jn(`theme`),g=jn(`toggleTheme`),{playing:_,togglePlay:v}=kl(),y={home:[`M4 11.5 L12 4.5 L20 11.5`,`M6.5 10 V19.5 H17.5 V10`,`M10 19.5 V14.5 H14 V19.5`],card:[`M4.5 5.5 H19.5 A1.5 1.5 0 0 1 21 7 V17 A1.5 1.5 0 0 1 19.5 18.5 H4.5 A1.5 1.5 0 0 1 3 17 V7 A1.5 1.5 0 0 1 4.5 5.5 Z`,`M10.1 9.2 A1.9 1.9 0 1 1 6.3 9.2 A1.9 1.9 0 1 1 10.1 9.2`,`M5.5 16.4 C5.5 14.2 6.8 13.2 8.2 13.2 C9.6 13.2 10.9 14.2 10.9 16.4`,`M13.5 9 H18.3 M13.5 12 H16.6`],book:[`M12 6.4 C10.2 4.9 7.4 4.3 4.2 4.3 V19 C7.4 19 10.2 19.6 12 21 C13.8 19.6 16.6 19 19.8 19 V4.3 C16.6 4.3 13.8 4.9 12 6.4 V21`],note:[`M9.5 17.5 V4.5 L19 3 V15.5`,`M9.5 17.5 A2.8 2.8 0 1 1 6.7 14.7 A2.8 2.8 0 1 1 9.5 17.5`,`M19 15.5 A2.8 2.8 0 1 1 16.2 12.7 A2.8 2.8 0 1 1 19 15.5`],game:[`M7.5 8 H16.5 C19 8 21 10 21 12.5 C21 15 19 17 16.5 17 H7.5 C5 17 3 15 3 12.5 C3 10 5 8 7.5 8 Z`,`M8 10.5 V14.5 M6 12.5 H10`],mail:[`M4 6.5 H20 V17.5 H4 Z`,`M4.5 8 L12 13.5 L19.5 8`],sun:[`M12 8 A4 4 0 1 0 12 16 A4 4 0 1 0 12 8`,`M12 3 V5 M12 19 V21 M3 12 H5 M19 12 H21 M5.6 5.6 L7 7 M17 17 L18.4 18.4 M18.4 5.6 L17 7 M7 17 L5.6 18.4`],moon:[`M20 14.5 A8 8 0 1 1 10.5 4 A6.5 6.5 0 0 0 20 14.5 Z`]},b=[{label:`首页`,to:`/`,exact:!0,icon:y.home},{label:`关于`,to:`/about`,icon:y.card},{label:`知识库`,to:`/knowledge`,icon:y.book},{label:`音乐`,to:`/music`,icon:y.note},{label:`试玩`,to:`/play`,icon:y.game},{label:`联系`,to:`/contact`,icon:y.mail}];function x(e){return e.exact?r.path===e.to:r.path.startsWith(e.to)}function S(e){e.key===`Escape`&&t.value&&(t.value=!1,n.value?.focus())}return Pn(()=>r.fullPath,()=>{t.value=!1}),(e,r)=>(V(),H(`header`,{class:`site-header`,onKeydown:S},[U(`div`,jl,[W(I(tl),{to:`/`,class:`nav-brand`},{default:L(()=>[...r[5]||=[G(j(`刘博康`),-1)]]),_:1}),r[8]||=U(`span`,{class:`nav-hint`,"aria-hidden":`true`},`点此处可以了解更多信息 →`,-1),U(`button`,{ref_key:`toggleBtn`,ref:n,class:`nav-toggle`,type:`button`,"aria-expanded":t.value,"aria-controls":`primary-nav`,"aria-label":t.value?`收起导航菜单`:`展开导航菜单`,onClick:r[0]||=e=>t.value=!t.value},` ☰ `,8,Ml),a.value?(V(),H(`ul`,{key:0,id:`primary-nav`,ref_key:`wheelEl`,ref:c,class:A([`nav-wheel`,{open:t.value}]),onScrollPassive:p},[(V(),H(B,null,z(b,(e,t)=>U(`li`,{key:e.to,ref_for:!0,ref:e=>l.value[t]=e,class:A([`wheel-item`,{center:s.value===t}])},[U(`button`,{type:`button`,class:`wheel-btn`,"aria-current":s.value===t?`true`:void 0,onClick:n=>m(t,e)},[(V(),H(`svg`,Pl,[(V(!0),H(B,null,z(e.icon,(e,t)=>(V(),H(`path`,{key:t,d:e},null,8,Fl))),128))])),U(`span`,null,j(e.label),1)],8,Nl)],2)),64))],34)):K(``,!0),a.value?(V(),H(`div`,{key:1,class:A([`wheel-extras`,{open:t.value}])},[U(`button`,{type:`button`,class:A([`bgm-toggle`,{"is-playing":I(_)}]),"data-testid":`bgm-toggle`,onClick:r[1]||=(...e)=>I(v)&&I(v)(...e),"aria-label":I(_)?`暂停背景音乐`:`播放背景音乐`,"aria-pressed":I(_)},[...r[6]||=[U(`svg`,{viewBox:`0 0 24 24`,width:`18`,height:`18`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"aria-hidden":`true`},[U(`path`,{d:`M9 18V5l12-2v13`}),U(`circle`,{cx:`6`,cy:`18`,r:`3`}),U(`circle`,{cx:`18`,cy:`16`,r:`3`})],-1)]],10,Il),U(`button`,{class:`theme-toggle`,type:`button`,"data-testid":`theme-toggle`,onClick:r[2]||=(...e)=>I(g)&&I(g)(...e),"aria-label":I(h)===`dark`?`切换为浅色模式`:`切换为深色模式`,"aria-pressed":I(h)===`dark`},[I(h)===`dark`?(V(),H(`svg`,Rl,[(V(!0),H(B,null,z(y.sun,(e,t)=>(V(),H(`path`,{key:t,d:e},null,8,zl))),128))])):(V(),H(`svg`,Bl,[(V(!0),H(B,null,z(y.moon,(e,t)=>(V(),H(`path`,{key:t,d:e},null,8,Vl))),128))]))],8,Ll)],2)):(V(),H(`ul`,{key:2,id:`primary-nav`,class:A([`nav-links`,{open:t.value}])},[(V(),H(B,null,z(b,e=>U(`li`,{key:e.to},[W(I(tl),{to:e.to,class:A({active:x(e)}),"aria-current":x(e)?`page`:void 0},{default:L(()=>[(V(),H(`svg`,Hl,[(V(!0),H(B,null,z(e.icon,(e,t)=>(V(),H(`path`,{key:t,d:e},null,8,Ul))),128))])),U(`span`,null,j(e.label),1)]),_:2},1032,[`to`,`class`,`aria-current`])])),64)),U(`li`,null,[U(`button`,{type:`button`,class:A([`bgm-toggle`,{"is-playing":I(_)}]),"data-testid":`bgm-toggle`,onClick:r[3]||=(...e)=>I(v)&&I(v)(...e),"aria-label":I(_)?`暂停背景音乐（雨中森林）`:`播放背景音乐（雨中森林）`,"aria-pressed":I(_),title:I(_)?`暂停背景音乐`:`播放背景音乐`},[...r[7]||=[U(`svg`,{viewBox:`0 0 24 24`,width:`18`,height:`18`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"aria-hidden":`true`},[U(`path`,{d:`M9 18V5l12-2v13`}),U(`circle`,{cx:`6`,cy:`18`,r:`3`}),U(`circle`,{cx:`18`,cy:`16`,r:`3`})],-1)]],10,Wl),U(`button`,{class:`theme-toggle`,type:`button`,"data-testid":`theme-toggle`,onClick:r[4]||=(...e)=>I(g)&&I(g)(...e),"aria-label":I(h)===`dark`?`切换为浅色模式`:`切换为深色模式`,"aria-pressed":I(h)===`dark`},[I(h)===`dark`?(V(),H(`svg`,Kl,[(V(!0),H(B,null,z(y.sun,(e,t)=>(V(),H(`path`,{key:t,d:e},null,8,ql))),128))])):(V(),H(`svg`,Jl,[U(`path`,{d:y.moon[0]},null,8,Yl)]))],8,Gl)])],2))])],32))}},[[`__scopeId`,`data-v-bd19f83a`]]),Zl={class:`site-footer`},Ql={class:`visit-count`},$l=Al({__name:`SiteFooter`,setup(e){let t=F(!1);function n(){t.value=window.scrollY>400}gr(()=>{window.addEventListener(`scroll`,n,{passive:!0}),i()});let r=F(!1);function i(){let e=document.createElement(`script`);e.src=`https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js`,e.async=!0,e.onload=()=>{let e=setInterval(()=>{let t=document.getElementById(`busuanzi_value_site_uv`);t&&/^\d+$/.test(t.textContent.trim())&&(r.value=!0,clearInterval(e))},300);setTimeout(()=>clearInterval(e),8e3)},document.head.appendChild(e)}br(()=>window.removeEventListener(`scroll`,n));function a(){try{window.scrollTo({top:0,behavior:`smooth`})}catch{window.scrollTo(0,0)}}return(e,n)=>(V(),H(`footer`,Zl,[n[1]||=la(`<svg class="footer-carrots" viewBox="0 0 1200 44" preserveAspectRatio="none" aria-hidden="true" data-v-941a4a49><g transform="translate(42.0,0) rotate(2.9,0,44) scale(1.02)" data-v-941a4a49><ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26" data-v-941a4a49></ellipse><ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114" data-v-941a4a49></ellipse><path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e" data-v-941a4a49></path><path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-0.5,30.5 C-1.5,25 -3.5,21 -7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74" data-v-941a4a49></path><path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a" data-v-941a4a49></path><path d="M1,31 C3,26 5.5,22.5 8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74" data-v-941a4a49></path><circle cx="15.6" cy="43.2" r="1.1" fill="#4a3b26" data-v-941a4a49></circle><circle cx="-15.6" cy="43.5" r="1.3" fill="#4a3b26" data-v-941a4a49></circle></g><g transform="translate(154.9,0) rotate(-1.0,0,44) scale(0.92)" data-v-941a4a49><ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26" data-v-941a4a49></ellipse><ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114" data-v-941a4a49></ellipse><path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e" data-v-941a4a49></path><path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-0.5,30.5 C-1.5,25 -3.5,21 7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74" data-v-941a4a49></path><path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a" data-v-941a4a49></path><path d="M1,31 C3,26 5.5,22.5 -8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74" data-v-941a4a49></path><circle cx="12.4" cy="43.2" r="1.7" fill="#4a3b26" data-v-941a4a49></circle><circle cx="-13.4" cy="43.5" r="1.1" fill="#4a3b26" data-v-941a4a49></circle></g><g transform="translate(243.1,0) rotate(-1.0,0,44) scale(0.86)" data-v-941a4a49><ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26" data-v-941a4a49></ellipse><ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114" data-v-941a4a49></ellipse><path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e" data-v-941a4a49></path><path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-0.5,30.5 C-1.5,25 -3.5,21 7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74" data-v-941a4a49></path><path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a" data-v-941a4a49></path><path d="M1,31 C3,26 5.5,22.5 -8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74" data-v-941a4a49></path><circle cx="16.0" cy="43.2" r="1.5" fill="#4a3b26" data-v-941a4a49></circle><circle cx="-13.8" cy="43.5" r="1.6" fill="#4a3b26" data-v-941a4a49></circle></g><g transform="translate(353.9,0) rotate(0.5,0,44) scale(0.94)" data-v-941a4a49><ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26" data-v-941a4a49></ellipse><ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114" data-v-941a4a49></ellipse><path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e" data-v-941a4a49></path><path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-0.5,30.5 C-1.5,25 -3.5,21 7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74" data-v-941a4a49></path><path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a" data-v-941a4a49></path><path d="M1,31 C3,26 5.5,22.5 -8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74" data-v-941a4a49></path><circle cx="15.0" cy="43.2" r="1.3" fill="#4a3b26" data-v-941a4a49></circle><circle cx="-17.2" cy="43.5" r="1.4" fill="#4a3b26" data-v-941a4a49></circle></g><g transform="translate(452.9,0) rotate(-3.6,0,44) scale(0.99)" data-v-941a4a49><ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26" data-v-941a4a49></ellipse><ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114" data-v-941a4a49></ellipse><path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e" data-v-941a4a49></path><path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-0.5,30.5 C-1.5,25 -3.5,21 -7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74" data-v-941a4a49></path><path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a" data-v-941a4a49></path><path d="M1,31 C3,26 5.5,22.5 8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74" data-v-941a4a49></path><circle cx="13.1" cy="43.2" r="1.0" fill="#4a3b26" data-v-941a4a49></circle><circle cx="-13.8" cy="43.5" r="0.9" fill="#4a3b26" data-v-941a4a49></circle></g><g transform="translate(566.9,0) rotate(0.9,0,44) scale(0.95)" data-v-941a4a49><ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26" data-v-941a4a49></ellipse><ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114" data-v-941a4a49></ellipse><path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e" data-v-941a4a49></path><path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-0.5,30.5 C-1.5,25 -3.5,21 7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74" data-v-941a4a49></path><path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a" data-v-941a4a49></path><path d="M1,31 C3,26 5.5,22.5 -8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74" data-v-941a4a49></path><circle cx="11.5" cy="43.2" r="1.4" fill="#4a3b26" data-v-941a4a49></circle><circle cx="-15.6" cy="43.5" r="0.9" fill="#4a3b26" data-v-941a4a49></circle></g><g transform="translate(664.5,0) rotate(0.0,0,44) scale(0.93)" data-v-941a4a49><ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26" data-v-941a4a49></ellipse><ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114" data-v-941a4a49></ellipse><path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e" data-v-941a4a49></path><path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-0.5,30.5 C-1.5,25 -3.5,21 7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74" data-v-941a4a49></path><path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a" data-v-941a4a49></path><path d="M1,31 C3,26 5.5,22.5 -8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74" data-v-941a4a49></path><circle cx="13.2" cy="43.2" r="1.7" fill="#4a3b26" data-v-941a4a49></circle><circle cx="-17.9" cy="43.5" r="1.0" fill="#4a3b26" data-v-941a4a49></circle></g><g transform="translate(769.4,0) rotate(-2.1,0,44) scale(0.90)" data-v-941a4a49><ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26" data-v-941a4a49></ellipse><ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114" data-v-941a4a49></ellipse><path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e" data-v-941a4a49></path><path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-0.5,30.5 C-1.5,25 -3.5,21 -7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74" data-v-941a4a49></path><path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a" data-v-941a4a49></path><path d="M1,31 C3,26 5.5,22.5 8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74" data-v-941a4a49></path><circle cx="14.2" cy="43.2" r="1.0" fill="#4a3b26" data-v-941a4a49></circle><circle cx="-15.7" cy="43.5" r="1.5" fill="#4a3b26" data-v-941a4a49></circle></g><g transform="translate(880.5,0) rotate(0.4,0,44) scale(1.08)" data-v-941a4a49><ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26" data-v-941a4a49></ellipse><ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114" data-v-941a4a49></ellipse><path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e" data-v-941a4a49></path><path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-0.5,30.5 C-1.5,25 -3.5,21 -7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74" data-v-941a4a49></path><path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a" data-v-941a4a49></path><path d="M1,31 C3,26 5.5,22.5 8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74" data-v-941a4a49></path><circle cx="15.4" cy="43.2" r="1.1" fill="#4a3b26" data-v-941a4a49></circle><circle cx="-16.9" cy="43.5" r="1.5" fill="#4a3b26" data-v-941a4a49></circle></g><g transform="translate(992.1,0) rotate(-1.9,0,44) scale(1.05)" data-v-941a4a49><ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26" data-v-941a4a49></ellipse><ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114" data-v-941a4a49></ellipse><path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e" data-v-941a4a49></path><path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-0.5,30.5 C-1.5,25 -3.5,21 7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74" data-v-941a4a49></path><path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a" data-v-941a4a49></path><path d="M1,31 C3,26 5.5,22.5 -8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74" data-v-941a4a49></path><circle cx="16.3" cy="43.2" r="0.9" fill="#4a3b26" data-v-941a4a49></circle><circle cx="-13.2" cy="43.5" r="1.1" fill="#4a3b26" data-v-941a4a49></circle></g><g transform="translate(1099.2,0) rotate(4.7,0,44) scale(1.01)" data-v-941a4a49><ellipse cx="0" cy="43.6" rx="13.5" ry="4.4" fill="#4a3b26" data-v-941a4a49></ellipse><ellipse cx="0" cy="44" rx="10.5" ry="3.1" fill="#2c2114" data-v-941a4a49></ellipse><path d="M-6.5,44 C-6.5,37 -5.5,31.5 -2.5,29.5 C-1,29 1,29 2.5,29.5 C5.5,31.5 6.5,37 6.5,44 Z" fill="#e07a2e" data-v-941a4a49></path><path d="M-4.6,36.5 C-1.5,35.4 1.5,35.4 4.6,36.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-5.6,40.5 C-1.8,39.4 1.8,39.4 5.6,40.5" stroke="#c05f1a" stroke-width="0.9" fill="none" stroke-linecap="round" data-v-941a4a49></path><path d="M-0.5,30.5 C-1.5,25 -3.5,21 7.2,17.5 C-4,21.5 -2.8,25.5 -1.8,30.8 Z" fill="#8fbf74" data-v-941a4a49></path><path d="M0,30.5 C-0.3,24 -0.8,19.5 -1,15.5 C0.9,19.5 1.3,24.5 1.7,30.5 Z" fill="#a4cf8a" data-v-941a4a49></path><path d="M1,31 C3,26 5.5,22.5 -8.5,19.5 C5.2,24 3.8,27.5 2.8,31.5 Z" fill="#8fbf74" data-v-941a4a49></path><circle cx="16.9" cy="43.2" r="1.3" fill="#4a3b26" data-v-941a4a49></circle><circle cx="-15.5" cy="43.5" r="1.3" fill="#4a3b26" data-v-941a4a49></circle></g></svg><p data-v-941a4a49>© 2026 刘博康 · 个人主页 V3</p>`,2),R(U(`p`,Ql,[...n[0]||=[G(` 👣 第 `,-1),U(`span`,{id:`busuanzi_value_site_uv`},null,-1),G(` 位访客 · 累计 `,-1),U(`span`,{id:`busuanzi_value_site_pv`},null,-1),G(` 次访问 `,-1)]],512),[[ho,r.value]]),W(Xa,{name:`fade`},{default:L(()=>[t.value?(V(),H(`button`,{key:0,class:`back-to-top`,"aria-label":`返回顶部`,onClick:a},` ↑ `)):K(``,!0)]),_:1})]))}},[[`__scopeId`,`data-v-941a4a49`]]);function eu(e){return String(e||``).toLowerCase().replace(/[\s　]+/g,``).replace(/[，。！？、；：""''（）【】《》〈〉…—·~,.!?;:'"()<>[\]{}@#$%^&*+=|/\\-]/g,``)}function tu(e){return[...e.keys||[],...e.also||[]]}function nu(e,t,n){let r=t.length;if(e.length<r)return!1;for(let i=0;i<=e.length-r;i++){let a=0;for(let o=0;o<r&&!(e[i+o]!==t[o]&&(a++,a>n));o++);if(a<=n)return!0}return!1}function ru(e,t){let n=0;for(let r of tu(t)){let t=eu(r);t&&(e.includes(t)?n+=t.length*2:t.length>=4&&nu(e,t,1)?n+=t.length:e.length>=2&&t.length>=3&&t.includes(e)&&(n+=e.length*.5))}return n}function iu(e){let t=e.match(/^第?([一二三四五1-5])(个|项|条|篇)?/);return t?{一:0,二:1,三:2,四:3,五:4,1:0,2:1,3:2,4:3,5:4}[t[1]]:/^(下一个|再下一个|下个|然后呢|还有呢|继续)/.test(e)?`next`:/^上一个/.test(e)?`prev`:null}var au=[`怎么`,`什么`,`为什么`,`请问`,`一下`,`可以`,`能不能`,`有没有`,`是不是`,`的`,`了`,`吗`,`呢`,`吧`,`啊`];function ou(e){let t=e;for(let e of au)t=t.split(e).join(``);return t}function su(e,t){if(e.length<2)return 0;let n=tu(t).map(eu).join(``),r=0;for(let t=0;t<e.length-1;t++)n.includes(e.slice(t,t+2))&&r++;return r}function cu(e,t,n=3){let r=ou(e);return t.map(e=>({e,s:su(r,e)})).filter(e=>e.s>0).sort((e,t)=>t.s-e.s).slice(0,n).map(e=>e.e)}function lu(e,t,n={}){let r=eu(e);if(!r)return{kind:`empty`};let i=iu(r);if(i!==null&&n.type===`projects`&&Array.isArray(n.projectIds)){let e=n.projectIds,r=i===`next`?(n.idx??0)+1:i===`prev`?(n.idx??0)-1:i;if(r>=0&&r<e.length){let n=t.find(t=>t.id===e[r]);if(n)return{kind:`answer`,entry:n,contextUpdate:{type:`projects`,idx:r}}}return{kind:`out-of-range`,total:e.length}}let a=null,o=0,s=null,c=0;for(let e of t){let t=ru(r,e);t>o?(s=a,c=o,a=e,o=t):t>c&&(s=e,c=t)}if(o>=4){let e={kind:`answer`,entry:a};return s&&c>=4&&s.id!==a.id&&(e.also=s),e.contextUpdate=a.context===`projects`?{type:`projects`,idx:0}:{type:`topic`},e}return o>=2&&a?{kind:`did-you-mean`,candidates:[a,s].filter(Boolean)}:{kind:`fallback`,candidates:cu(r,t)}}var uu=`小康分身`,du=[`proj-carrot`,`proj-carbon`,`proj-stock`,`proj-weiguan`,`proj-todo`],fu=[{id:`greeting`,q:`你好！`,keys:[`你好`,`hi`,`hello`,`嗨`,`在吗`,`在么`],a:`你好呀！我是刘博康的数字分身「小康分身」。关于他的项目、技能、经历，或者这个网站本身，都可以问我。`,suggest:[`他做过哪些项目？`,`有什么可以在线试玩的？`,`怎么联系他？`]},{id:`who-are-you`,q:`你是谁？`,keys:[`你是谁`,`自我介绍`,`介绍一下自己`,`你是干嘛的`],also:[`自我简介`],a:`我是刘博康的数字分身「小康分身」，计算机科学与技术大一在读。我负责回答关于他的项目、技能和经历的问题——想知道什么尽管问。`,suggest:[`他做过哪些项目？`,`你怎么工作的？`]},{id:`who-is-liubokang`,q:`刘博康是谁？`,keys:[`博康是谁`,`刘博康`,`站长是谁`,`博主是谁`,`作者是谁`],also:[`站主`,`up主`],a:`刘博康，天津大学深圳学院计算机科学与技术大一学生（2026 级），初高中就读中山市中山纪念中学。喜欢把学到的东西立刻做成项目——这个网站上的 5 个项目都是他在入学前后做的。`,links:[{label:`去「关于」页看完整介绍`,to:`/about`}]},{id:`thanks`,q:`谢谢！`,keys:[`谢谢`,`感谢`,`谢了`,`thank`],a:`不客气！能帮到你就好。还有想问的随时说，没有的话——去「试玩」栏目当一把县令也不错 😄`},{id:`bye`,q:`再见！`,keys:[`再见`,`拜拜`,`走了`,`拜`],a:`再见！觉得网站不错的话，底部 👍 按钮点一下就是对他最大的鼓励。`},{id:`busy`,q:`他最近在忙什么？`,keys:[`最近在忙`,`忙什么`,`近况`,`最近怎么样`],a:`从主页的更新看，最近在给这个网站加互动功能：上线了《为官一方》试玩栏目、访客计数、还有我（这个分身）。项目层面，几个项目都在持续完善，更新了会同步到主页。`,links:[{label:`去试玩栏目`,to:`/play`}]},{id:`projects-overview`,q:`他做过哪些项目？`,keys:[`哪些项目`,`做过什么`,`作品`,`几个项目`,`项目有哪些`,`成果`,`项目`],also:[`作品集`,`做过的项目`,`有什么项目`],a:`一共 5 个，按展示顺序：① carrot agent（设计并做出自己的 Agent 软件——从改装 Claude Code 到复现 Codex 再到自研融合）② Carbon Brain（DAC 材料吸附预测，团队项目他任组长）③ 股票量化软件（LightGBM，28 因子）④《为官一方》县令治理游戏（可在线试玩！）⑤ TO-DO Panel 桌面面板定制。想先听哪个？直接说「第二个」就行。`,suggest:[`第一个`,`第二个`,`第四个`],context:`projects`},{id:`proj-carrot`,q:`第一个：carrot agent 是什么？`,keys:[`carrot`,`agent`,`第一个项目`,`agent软件`,`agent 软件`],also:[`二开`,`claudecode`,`改装`,`简易 codex`,`codex`],a:`他设计并做出了自己的 agent 软件「carrot」：第一步把一款第三方 Claude Code 桌面应用改装到能日用（30 轮改造，修掉流式丢块缺陷）；第二步对照开源 Codex 搭了简易复现，验证记忆注入和自动提取；第三步把两边融合成自己的 carrot agent——带人格记忆系统、浏览器能力（MCP 配置仓库接入）、上下文管理、手机远程操控（手机遥控电脑干活），fork 漂移管理保住我的定制不被上游更新冲掉，现在每天在用。边界说得很清楚：底座是第三方开源壳 + 官方 SDK，他的工作是吃透、改装、融合。`,links:[{label:`看项目详情`,to:`/project/carrot-agent`}],suggest:[`踩过什么坑？`,`下一个`]},{id:`proj-carbon`,q:`第二个：Carbon Brain 是什么？`,keys:[`carbon`,`dac`,`碳`,`吸附`,`材料预测`,`第二个项目`],also:[`碳捕集`,`直接空气捕集`,`brain`,`r2为负`],a:`Carbon Brain 是团队项目（他任组长）：用 XGBoost 估算 DAC 吸附材料的饱和度，让装置按需切换吸附/再生。流程已打通，但他如实标注了局限——按日期切分的测试集上 R² 为负，模型还不能上线。`,links:[{label:`看项目详情`,to:`/project/carbon-brain`}],suggest:[`R² 为负是什么意思？`,`他当组长做什么？`,`下一个`]},{id:`proj-stock`,q:`第三个：股票量化软件是什么？`,keys:[`股票量化`,`量化软件`,`量化交易`,`lightgbm`,`选股`,`第三个项目`],also:[`炒股`,`股票`,`量化`,`a股`],a:`基于 LightGBM 的 A 股量化流程：28 个因子、分类/回归双线。回测区间（2025-01 至 2026-08）机器学习策略总收益 112.74%、超额 66.17%——但注意口径：这是单次回测、未实盘、有幸存者偏差，不能当未来预期。`,links:[{label:`看项目详情`,to:`/project/stock-quant`}],suggest:[`回测数字该怎么读？`,`实盘了吗？`,`下一个`]},{id:`proj-weiguan`,q:`第四个：《为官一方》是什么？`,keys:[`为官一方`,`游戏`,`县令`,`第四个项目`],also:[`当官游戏`,`县官`,`治理游戏`,`青阳县`],a:`《为官一方》是他单人全栈做的古风县令治理模拟游戏：你当青阳县令，三年里平衡银库、粮仓、民心、治安、官声、人口六项指标。本站就能玩——点导航栏「试玩」，网页版无需下载。`,links:[{label:`在线试玩`,to:`/play`},{label:`看项目详情`,to:`/project/weiguan-yifang`}],suggest:[`游戏内容有多少？`,`下一个`]},{id:`proj-todo`,q:`第五个：TO-DO Panel 是什么？`,keys:[`todo`,`待办`,`面板`,`课程表`,`第五个项目`],also:[`todopanel`,`todo面板`,`桌面面板`],a:`TO-DO Panel 是 xiaopu-ai 的开源桌面面板（MIT 许可），他在本机做了深度二次开发：先加 HTTP 写入通道解决数据被回写冲掉的问题，然后自己连做了五个版本——日历页、学期课表导入（规则 JSON 按周展开、幂等覆盖）、首页改版成「今日课程+未来七天」、三档截止提醒（提前两天/一天/12 小时）、还修了输入法候选条被置顶层盖住的真 bug。上游是他人的，这些定制是他做的。`,links:[{label:`看项目详情`,to:`/project/todo-panel`}],suggest:[`回写问题怎么解决的？`]},{id:`hardest`,q:`哪个项目最难 / 印象最深？`,keys:[`最难`,`最有挑战`,`印象最深`,`最有价值`,`最得意`],also:[`挑战性`,`最难的项目`],a:`他自己说印象最深的是给 Claude Code 桌面应用修「流式输出丢块」的缺陷：要看懂别人的代码、定位到消息 id 撞车的根因，还要用探针数据证明修对了（修前 9 条 vs 17 条对不上，修后两边一致）。`,links:[{label:`看这个项目`,to:`/project/carrot-agent`}]},{id:`carbon-r2`,q:`R² 为负是什么意思？`,keys:[`r²`,`r2`,`为负`,`决定系数`],also:[`模型失败`,`泛化`],a:`R² 是衡量模型预测力的指标，负数说明模型在新数据上还不如直接猜平均值。Carbon Brain 用「按日期切分」的测试集评估时 R² 为负，意味着模型没学会泛化到没见过的实验日——他把这一点如实写在了项目详情里，没有藏。`},{id:`carbon-role`,q:`他当组长具体做什么？`,keys:[`组长`,`职责`,`分工`,`统筹`],also:[`负责人`],a:`在 Carbon Brain 里他任组长：统筹进度与分工，同时亲自负责数据清洗、特征工程与模型训练，还设计了吸附/再生的自动切换阈值并参与装置联调。`},{id:`carbon-data`,q:`DAC 项目的数据和特征是怎样的？`,keys:[`传感器`,`特征工程`,`18维`,`训练数据`,`3万行`],also:[`数据集`,`特征`],a:`数据是装置采回的传感器原始数据（时间戳、温湿度、进出口 CO₂ 浓度、流量），单文件最大 2.5 万行；用理想气体定律做物理换算得到饱和度，再构造原始量+滚动统计共 18 维特征，约 3 万行样本训练 XGBoost。`},{id:`stock-factors`,q:`28 个因子都是什么？`,keys:[`因子`,`28个`,`特征有哪些`],also:[`选股因子`],a:`20 个日线因子 + 8 个日内因子，包括市值代理、波动率、动量、量比、量价相关性等。用 LightGBM 的特征重要性反查哪些因子真正起作用——这是他从数据里学东西的方式。`},{id:`stock-backtest-reading`,q:`回测数字 112.74% 该怎么读？`,keys:[`回测口径`,`过拟合`,`幸存者偏差`,`112`,`收益怎么读`,`能赚钱吗`],also:[`收益率`,`超额收益`,`回撤`],a:`口径是：LightGBM 回归（调优）策略、选股 50 只、每 5 个交易日调仓、区间 2025-01 至 2026-08。但模型一直在迭代、未实盘、有 survivor bias——他专门写了篇知识库笔记《回测数字的陷阱：112.74% 应该怎么读》讲透这个。`,links:[{label:`去知识库看这篇`,to:`/knowledge`}]},{id:`stock-rule-vs-ml`,q:`规则策略和机器学习策略差多少？`,keys:[`规则策略`,`小市值`,`传统策略`,`对比`],a:`同样的区间里，传统规则策略（小市值+低波+反转）收益 16.85%，而基准 44.93%——超额是 -28.08%，没跑赢大盘。对比之下机器学习策略超额 +66.17%。这个对照组是他特意留着自省的。`},{id:`stock-live`,q:`量化策略实盘了吗？`,keys:[`实盘`,`模拟盘`,`真钱`,`真实交易`],a:`没有。模拟盘接口接上了，但尚未产生真实交易，净值停在初始值——也就是说目前没有任何实盘验证。这条局限他写在项目详情页，没有回避。`},{id:`claude-bug`,q:`流式丢块缺陷是怎么修的？`,keys:[`丢块`,`缺陷`,`bug`,`消息id`,`撞车`,`流式`],also:[`丢字`,`修复`],a:`现象是流式输出时消息块丢失、底部又重复渲染。他定位到根因：上游 SDK 复用同一个消息 id，导致多个块「键撞车」互相覆盖，兜底逻辑又把重复内容渲染了一遍。改法是按消息 id 排队对账，让每个块落到正确位置。`},{id:`claude-proof`,q:`怎么证明缺陷真的修好了？`,keys:[`探针`,`对账`,`证明`,`9条`,`17条`],also:[`验证`,`数据对照`],a:`不看感觉看数字：起隔离实例挂调试协议探针，分别统计「运行中显示的消息条数」和「会话存档条数」。修前两边对不上（9 vs 17），修完一致。这套「修改前后数据对照」的习惯贯穿他所有项目。`},{id:`claude-tools`,q:`配套的自研小工具是什么？`,keys:[`中转服务`,`菜单栏`,`切换工具`,`api配置`,`swift工具`],also:[`自研工具`,`小工具`],a:`为在两套自有 API 配置间切换，他写了一条本机工具链：Node 本地中转服务（请求先过它，换配置不动客户端）+ Swift 菜单栏开关（当前用哪套一眼可见，点一下就切）+ 启动脚本。这部分完全自研，与上游应用无关，展示时分开标注。`},{id:`weiguan-play`,q:`怎么试玩《为官一方》？`,keys:[`试玩`,`怎么玩`,`在哪玩`,`玩一下`,`入口`],also:[`想玩`,`能玩吗`,`玩游戏`],a:`点顶部导航的「试玩」栏目，或点下面的按钮。游戏约 9MB，慢网稍等加载；进度存在你自己浏览器里，不用注册。`,links:[{label:`在线试玩`,to:`/play`}]},{id:`weiguan-content`,q:`游戏内容有多少？`,keys:[`内容量`,`事件`,`政令`,`断案`,`出身`,`难度`,`人格`],also:[`多少内容`,`玩法`],a:`20 条核心事件、12 项政令（带冷却与前置）、3 则完整断案剧本；6 维数值 + 2 条人格轴（仁政↔严刑、清廉↔钻营）、3 种出身（进士/举人/捐官）、3 档难度。`,links:[{label:`在线试玩`,to:`/play`}]},{id:`weiguan-tech`,q:`游戏用什么技术做的？`,keys:[`cocos`,`游戏技术`,`游戏怎么做的`,`引擎`,`typescript游戏`],a:`Cocos Creator 3.8 + TypeScript。最值钱的决定是把核心逻辑写成零引擎依赖的纯 TS（可脱离引擎跑 18 项自动化断言），事件和政令全部 JSON 配置驱动、带 Schema 校验，还自研 4 个 Node 工具做整局模拟。`},{id:`weiguan-mac`,q:`游戏有 macOS 版吗？`,keys:[`macos`,`mac版`,`安装包`,`双击运行`,`打包`],a:`有。核心逻辑复用成单文件网页后，再用 Swift + WebKit 包成可双击运行的 macOS 应用并生成了安装包。三种方式都能跑：单文件网页、网页构建版、macOS 应用。本站「试玩」栏目用的就是单文件网页版。`,links:[{label:`网页版试玩`,to:`/play`}]},{id:`weiguan-next`,q:`游戏下一步做什么？`,keys:[`下一步`,`游戏计划`,`数值平衡`,`美术`],also:[`更新计划`],a:`他自己写的计划：数值平衡校准 + 美术替换（目前场景是程序生成的 SVG 占位画面）。更新后本站试玩版会同步换新。`},{id:`weiguan-origin`,q:`为什么做《为官一方》？`,keys:[`设身处地`,`为什么做这个游戏`,`灵感`,`对标`],a:`选题来自对爆款《设身处地》的拆解：舞台从现代城市换成古代县城，身份换成七品知县，并补上断案审判、官场考课、士绅博弈、天灾应对四套玩法。世界观用架空朝代（大衍朝），规避真实朝代影射。`},{id:`todo-channel`,q:`回写被冲掉的问题怎么解决的？`,keys:[`回写`,`写入通道`,`http通道`,`冲掉`],also:[`ipc`],a:`面板渲染层每 2 秒把整份数据回写一次，脚本直接改文件必然被冲。他加了一条 HTTP 写入通道：主进程收请求、经 IPC 交给渲染层、让渲染层自己落盘，从根上绕开冲突。现在一条命令就能把课表和待办批量灌进去。`},{id:`todo-resign`,q:`Electron 重签是什么坑？`,keys:[`重签`,`签名`,`entitlements`,`打不开`],a:`Electron 应用改完代码必须重新签名，且要由内到外逐层签、带 entitlements，只签外层会让 macOS 直接拒绝加载。后来他明白了更省事的办法：只改 JavaScript 资源根本不用重签——坑就这么绕过去了。`},{id:`todo-update`,q:`面板自动更新会怎样？`,keys:[`自动更新`,`覆盖`,`重打补丁`],a:`上游面板自动更新会覆盖本地改动，所以每次更新后要按固定流程把补丁重打一遍：备份→改→语法检查→测试→重签→重启验证。流程已固化成可复用的技能，重打成本很低。`},{id:`skills`,q:`他会什么技术？`,keys:[`技术栈`,`会什么`,`技能`,`语言`,`python`,`vue`,`typescript`,`前端`],also:[`技术`,`编程语言`,`会哪些`],a:`主要三条线：Python（数据处理/机器学习，XGBoost/LightGBM）、前端（Vue 3 + Vite，本站就是）、TypeScript（游戏逻辑）。另外用 AI 协作开发是他的日常姿势——这个网站从设计到部署都是人机协作完成的。`,links:[{label:`去「关于」页看技能详情`,to:`/about`}]},{id:`python-use`,q:`Python 都用它做过什么？`,keys:[`pandas`,`sklearn`,`scikit`,`flask`,`numpy`,`数据处理`],a:`pandas/numpy 清洗实验室传感器数据（单文件最多 2.5 万行）；scikit-learn 搭机器学习流水线；LightGBM 输出特征重要性反查有效因子；写 Flask 接口把模型接到前端页面做成能点的界面。`},{id:`ai-workflow`,q:`他怎么用 AI 协作？`,keys:[`ai协作`,`工作流`,`规矩`,`怎么用ai`,`vibe`],also:[`人机协作`,`ai辅助`],a:`他把 AI 当工程伙伴而不只是问答工具：给重复工作写「技能」和子 agent 固化流程；做受控对照实验（同一任务开关某技能，对比代码行数与 token 消耗）；还定了硬规矩——改前备份、小步提交、测试当护栏、卡住就换路子。`,suggest:[`知识库有相关笔记吗？`]},{id:`learning-method`,q:`他的学习方法是什么？`,keys:[`怎么学`,`学习方法`,`经验`,`建议`,`项目制`],also:[`学习方式`,`入门建议`],a:`「项目制学习」：学一个东西立刻做成项目，先跑起来再打磨，过程全部写下来。知识库里《项目制学习：先跑起来，再打磨》这篇讲得很细。`,links:[{label:`去知识库看`,to:`/knowledge`}]},{id:`drums`,q:`架子鼓是什么水平？`,keys:[`架子鼓`,`鼓`,`打鼓`,`10级`,`十级`],also:[`爵士鼓`],a:`架子鼓 10 级，从高中校管乐团、弦乐团鼓手一路打到现在。他说练鼓教会他的事：复杂节奏要拆成小节反复练——复杂项目也一样要拆成小步。`},{id:`band-awards`,q:`乐团拿过什么奖？`,keys:[`乐团`,`获奖`,`展演`,`管乐团`,`弦乐团`,`lalaland`],also:[`比赛获奖`,`艺术展演`],a:`代表学校参加中山市第六届中小学生艺术展演：管乐团《La La Land》获三等奖、弦乐团《il vento d’oro》获二等奖。证书照片在「关于」页的经历画廊里。`,links:[{label:`去看经历画廊`,to:`/about`}]},{id:`business-comp`,q:`商赛是什么经历？`,keys:[`商赛`,`商业比赛`,`青年商赛`],a:`参加多校联办青年商赛并担任组长，带队拿了二等奖。带队的统筹经验后来也用在了 Carbon Brain 的组长角色上。`},{id:`mun`,q:`模联是什么经历？`,keys:[`模联`,`模拟联合国`,`mun`,`德国代表`],a:`第六届星云模拟联合国大会·2015 叙利亚局势会议，他任德意志联邦共和国代表：签署多份对德贸易合作，还带欧盟建立了难民工厂项目安置叙利亚难民。`},{id:`hobbies`,q:`他有什么兴趣爱好？`,keys:[`爱好`,`兴趣`,`喜欢什么`,`业余时间`],a:`主页简介写的三样：研究股票、架子鼓演奏、阅读。前两个都做出了名堂——股票研究变成了量化项目，架子鼓打到了 10 级。最近还常逛画展、听音乐会、看科技展。`,suggest:[`架子鼓什么水平？`,`量化收益怎么样？`]},{id:`life-cost`,q:`一个月生活费多少？`,keys:[`生活费`,`零花钱`,`开销`,`够花吗`,`一个月花多少`],also:[`一个月多少钱`,`花钱多吗`],a:`绰绰有余——具体数字是个秘密 😄 主要花在日常生活，再加上逛画展、听音乐会、看科技展这些。`,suggest:[`他有什么兴趣爱好？`]},{id:`societies`,q:`他加了什么社团？`,keys:[`社团`,`参加社团`,`加社团`,`学生组织`,`兴趣小组`],also:[`社团活动`,`大学社团`],a:`学校还很新，社团还没办起来，所以目前一个都没加。等以后有了，音乐类社团他应该会很有兴趣——毕竟架子鼓 10 级。`,suggest:[`架子鼓什么水平？`]},{id:`love-status`,q:`他现在有对象吗？`,keys:[`对象`,`女朋友`,`谈恋爱`,`有对象`,`脱单`],also:[`男朋友`,`单身`,`恋爱`],a:`目前没有。他还挺欢迎志同道合的女同志来联系他 😄 至于理想型是什么，往下问。`,suggest:[`你喜欢什么类型的？`]},{id:`love-type`,q:`你喜欢什么类型的？`,keys:[`什么类型的`,`理想型`,`择偶`,`对象标准`],also:[`标准`,`另一半`,`喜欢什么样的`],a:`灵魂和身体都健全的女生，最好跟他有共同的兴趣爱好，也有自己专注的事业。他眼里，恋爱和婚姻不是谁照顾谁，而是两个健全的灵魂在人生路上互相帮扶、一起往前走。`,suggest:[`他现在有对象吗？`]},{id:`reading`,q:`他喜欢读什么书？`,keys:[`阅读`,`看书`,`什么书`,`书单`],a:`思想启蒙是《价值心法》——乍一看像营销书、成功学，但里面其实藏着很多别样的思考方法，帮他重新看待人生和学习。之后又读了查理·芒格的《穷查理宝典》和《纳瓦尔宝典》、塔勒布的《反脆弱》这些。每本书他都有自己的见解，会陆续整理进知识库。`,suggest:[`知识库有什么？`]},{id:`education-now`,q:`他在哪上学？大几？`,keys:[`大学`,`大几`,`学校`,`天津大学`,`年级`],also:[`在哪上学`,`哪个大学`,`深圳学院`],a:`天津大学深圳学院，计算机科学与技术专业，2026 年 9 月入学，现在大一在读。学院第一年招本科生，全校目前只有我们这一届；不过园区里还有港中文（深圳）、哈工深、北大深研院的同学，学术氛围不缺。`},{id:`school-new`,q:`为什么学校这么新？全校只有一届？`,keys:[`学校新`,`这么新`,`新学校`,`第一年`,`第一届`,`只有一届`,`全校`,`园区`],also:[`新校区`,`几个学校`,`学长学姐`,`校园`],a:`学院今年第一次招本科生，全校现在就我们这一届——所以暂时没有社团、没有学长学姐（等学弟学妹来了我们就是学长 😄）。不过校园是共享园区：港中文（深圳）、哈工深、北大深研院的学生都在，讲座、图书馆这些资源一点都不缺。`,suggest:[`他加了什么社团？`,`他未来有什么打算？`]},{id:`english-classes`,q:`大学课程难吗？`,keys:[`课程难`,`哪门课`,`英文授课`,`英语授课`,`吃力`],also:[`全英文`,`上课难`,`挂过科`],a:`大一到现在，还没有哪门课让他特别吃力。要说普遍的难点，大概是英文授课——不少课程是全英文上的。不过这也让他提前适应了英语环境，去国外读研正好用得上。`,suggest:[`你打算考研吗？`]},{id:`highschool`,q:`他高中是哪的？`,keys:[`高中`,`中学`,`纪中`,`纪念中学`,`初中`],also:[`中山纪念`],a:`中山市中山纪念中学，初中加高中一共六年（2020.09–2026.06）。在校期间是校管乐团和弦乐团的鼓手。`},{id:`why-cs`,q:`为什么学计算机？`,keys:[`为什么学计算机`,`选专业`,`为什么选`,`初衷`],a:`主页没写什么大道理。但从他做的事能看出来：他喜欢把想法做成「别人能双击打开」的东西——游戏、面板、这个网站都是。计算机大概就是他手里最顺手的工具。`},{id:`future`,q:`他未来有什么打算？`,keys:[`未来`,`打算`,`规划`,`目标`,`以后`,`考研`,`读研`,`研究生`,`出国`,`留学`,`保研`,`深造`],also:[`职业规划`,`申研`,`申请研究生`,`国外读研`],a:`目标挺明确的：继续读研，主攻国外——大学期间已经把英语环境适应下来了，出去衔接更顺，而且国外硕士学制更短；国内也会做双重准备，所以绩点是眼下正在拉的重点。读完研具体往哪走还没公开，等他定了会更新在主页。`,suggest:[`绩点多少？`]},{id:`age`,q:`他多大了？`,keys:[`多大`,`几岁`,`年龄`,`生日`],a:`2026 级大一新生，具体生日主页没公开——这个我也不替他说。`},{id:`impressive`,q:`他最厉害的是什么？`,keys:[`最厉害`,`最强`,`牛在哪`,`亮点`],a:`让他本人答会显得自夸，我只摆可核查的事：架子鼓 10 级、商赛二等奖、入学前后做出 5 个能跑的项目、量化策略回测超额 66.17%（口径见项目详情）。厉害不厉害，你说了算 😄`},{id:`course`,q:`这个网站是课程作业吗？`,keys:[`课程`,`作业`,`学分`,`project-based`],also:[`课程项目`,`期末`],a:`是。这是《Project-Based CST&AI Foundations》课程的 Vibe Coding 项目：用 AI 原生方式开发个人主页并持续迭代，评审看的是真实迭代过程、证据链和 AI 合规记录。`},{id:`site-tech`,q:`这个网站怎么做的？`,keys:[`网站怎么做`,`网站技术`,`怎么建的`,`用什么做的`,`源码`],also:[`建站`,`开发这个网站`],a:`Vue 3 + Vite 构建，原生 CSS 双主题（画廊/森林夜），GitHub Pages 托管，Vitest 自动化测试 60+ 条断言。从 V1 到 V3 全部迭代过程留痕在 GitHub 公开仓库，AI 协作记录也整理归档了。`,links:[{label:`知识库里有迭代复盘`,to:`/knowledge`}]},{id:`site-darkmode`,q:`深色模式怎么开？`,keys:[`深色`,`暗色`,`黑夜`,`主题`,`dark`],also:[`夜间模式`,`黑色背景`],a:`点右上角导航栏的主题按钮（🌙/☀️）就能切换，选择会存在你本机，下次来还是你选的样子。`},{id:`site-deploy`,q:`网站有服务器吗？怎么部署的？`,keys:[`部署`,`服务器`,`github pages`,`托管`,`上线`],also:[`发布`,`怎么上线`],a:`没有自己的服务器——静态站点托管在 GitHub Pages，构建产物推到 gh-pages 分支就上线。知识库里《Vite 构建与 GitHub Pages 部署》讲了「一条命令背后的四件事」。`},{id:`site-tests`,q:`网站有测试吗？`,keys:[`测试`,`断言`,`vitest`,`自动化测试`],a:"有，Vitest 一套：内容管线、站点数据、路由表、表单出口、反馈组件、还有我（分身匹配引擎）都有断言，总共 60+ 条，`npm test` 一键跑完。"},{id:`site-feedback`,q:`怎么给网站提意见？`,keys:[`反馈`,`提意见`,`建议反馈`,`bug反馈`,`按钮`],a:`每个页面底部都有 👍 有用 / 🤔 还需改进 按钮，还能留一句选填说明，提交后真实发送到站长邮箱（FormSubmit 通道）。他收集到反馈会真的改——这个网站的响应式改造就来自真实试用反馈。`,links:[{label:`去联系页留言`,to:`/contact`}]},{id:`site-visits`,q:`访客计数是真的吗？`,keys:[`访客`,`计数`,`访问量`,`多少人访问`,`足迹`],a:`真的，页脚那个「第 N 位访客」是不蒜子计数服务，从嵌入那天起累计。数字小别笑——真实数据比假大数有底气。`},{id:`notes-overview`,q:`知识库里有什么？`,keys:[`知识库`,`笔记`,`文章`,`博客`,`写了什么`],also:[`有哪些笔记`,`博文`],a:`10 篇真实笔记，都是他做项目时写的第一手总结，大致四类：AI 协作方法（卡死自查、迭代复盘）、量化与机器学习（回测陷阱、监督学习入门）、前端与部署（Vue 组合式 API、Vite 部署）、项目架构（为官一方、二次开发边界）。支持搜索和标签筛选。`,links:[{label:`去知识库`,to:`/knowledge`}]},{id:`notes-ai`,q:`AI 协作方面的笔记有哪几篇？`,keys:[`卡死`,`迭代复盘`,`ai笔记`,`协作笔记`],a:`两篇：《卡死自查协议》讲跟 AI 协作时怎么避免「无声地耗死」——改前备份、小步提交、卡住换路；《个人主页迭代复盘》记录这个网站 V1→V3 每一版改了什么、为什么。`,links:[{label:`去知识库看`,to:`/knowledge`}]},{id:`notes-quant`,q:`量化方面的笔记有哪几篇？`,keys:[`量化笔记`,`监督学习`,`机器学习笔记`,`回测陷阱`],a:`两篇：《监督学习入门》从「预测」一路讲到 LightGBM 量化模型；《回测数字的陷阱》讲 112.74% 这种数字该怎么读才不上当。想看量化项目本身也可以问我。`,links:[{label:`去知识库看`,to:`/knowledge`}],suggest:[`回测数字该怎么读？`]},{id:`notes-frontend`,q:`前端方面的笔记有哪几篇？`,keys:[`vue`,`vite`,`前端笔记`,`组合式`],a:`两篇：《Vue 3 组合式 API》讲为什么逻辑要按「关注点」组织；《Vite 构建与 GitHub Pages 部署》讲这个网站从构建到上线的完整链路。`,links:[{label:`去知识库看`,to:`/knowledge`}]},{id:`notes-game`,q:`游戏架构笔记讲了什么？`,keys:[`架构笔记`,`引擎依赖`,`配置驱动`,`游戏笔记`],a:`《为官一方架构笔记》讲两个核心决定：核心逻辑零引擎依赖（纯 TypeScript，可脱离引擎跑测试）+ 内容配置驱动（事件政令全 JSON、带 Schema 校验，改内容不碰代码）。`,links:[{label:`去知识库看`,to:`/knowledge`}]},{id:`notes-modding`,q:`二次开发边界那篇讲了什么？`,keys:[`边界`,`改别人的软件`,`二开笔记`,`侵权`],a:`《二次开发的边界》讲改别人软件的规矩：什么能做（补丁式增强、本机定制）、什么不能做（冒充原创、动上游源码），以及为什么所有展示都要标明上游归属。`,links:[{label:`去知识库看`,to:`/knowledge`}]},{id:`contact`,q:`怎么联系他本人？`,keys:[`联系`,`邮箱`,`微信`,`电话`,`qq`,`怎么找`,`联系他`],also:[`email`,`邮件`,`联系方式`,`手机`],a:`邮箱 carrotsoup@qq.com；电话/微信/QQ 都是 13420089540。也可以去「联系」页用表单留言，会真实发送到他的邮箱。`,links:[{label:`去联系页`,to:`/contact`}]},{id:`bot-how`,q:`你是怎么工作的？`,keys:[`你是ai吗`,`你是真人吗`,`数字分身`,`分身是什么`,`你怎么工作的`,`机器人`],also:[`人工智能`,`聊天机器人`],a:`我是检索式问答程序：把你说的和预设问答库（70 条左右）做关键词匹配，支持同义词、错别字容错和「第二个/下一个」追问。我不联网、不调大模型、不上传你的输入——所有匹配都在你自己的浏览器里完成。匹配不上时我会老实说不知道，并猜几个你可能想问的。`},{id:`bot-privacy`,q:`我们的对话会被保存吗？`,keys:[`隐私`,`数据`,`记录`,`保存`,`上传`],also:[`聊天记录`,`安全吗`],a:`不会。对话只发生在你浏览器里，关掉就没了——我不存、也不上传任何东西。站长收集反馈只用页面底部的按钮（走 FormSubmit 到他邮箱，你主动点才会发）。`},{id:`bot-limits`,q:`你不会什么？`,keys:[`你不会什么`,`缺点`,`局限`,`做不到`],a:`老实说：我只能答预设库里的内容（项目、技能、经历、本站），不会即兴创作、不会算命、答不了太私人或未公开的事。你问倒我的每个问题，都会变成扩充问答库的素材。`},{id:`ask-me`,q:`我可以问你什么问题？`,keys:[`可以问什么`,`能问什么`,`什么都能问`,`该问什么`,`问什么好`,`不知道问什么`],also:[`从哪问起`,`怎么开始聊`],a:`我了解他的三块：
① 项目：5 个作品（量化软件、AI 桌面面板、古风游戏、TO-DO 面板……），想听哪个都行，还能按「第二个」「下一个」挨个介绍；
② 学习与经历：技能、课程、未来规划（考研出国）、读过的书；
③ 这个网站：怎么做出来的、测了什么、知识库 10 篇笔记。

生活八卦也聊一点：生活费、社团、爱好、对象、理想型 😄

不能答的：住址、家庭、联系方式、具体成绩——这些是隐私，他没授权我公开。`,suggest:[`他做过哪些项目？`,`他有什么兴趣爱好？`,`他未来有什么打算？`]},{id:`guide-detail`,q:`能详细说说吗？`,keys:[`详细说说`,`展开讲讲`,`多讲点`,`具体点`,`详细点`],a:`想深入了解哪个？直接告诉我项目名（比如「为官一方」「量化」），或者去对应的详情页看完整版——那里比我说得全。`,suggest:[`他做过哪些项目？`,`去知识库看看`]},{id:`guide-nav`,q:`这个网站怎么逛？`,keys:[`怎么逛`,`导航`,`页面`,`有哪些页面`,`功能区`],a:`顶部导航五个入口：首页（项目总览）、关于（技能+经历+教育）、知识库（10 篇笔记）、试玩（《为官一方》在线玩）、联系（表单直达邮箱）。右下角还有我 😄`,suggest:[`有什么可以试玩的？`,`知识库有什么？`]},{id:`bound-money`,q:`能借钱吗 / 要密码吗？`,keys:[`借钱`,`密码`,`账号`,`验证码`,`转账`],a:`这个我可不会答——分身只聊项目、学习和这个网站。涉及钱和账号的事，请一律视为诈骗预防线，谁问都别给 😄`},{id:`bound-private`,q:`他住哪 / 家庭情况 / 联系方式？`,keys:[`住址`,`住哪`,`家庭`,`宿舍`,`家里人`,`联系方式`],also:[`家里`,`父母`,`亲戚`,`老家`,`手机号`],a:`私人问题超纲了——分身只聊公开的项目、学习和网站内容。真有要事请走邮箱联系他本人。`},{id:`bound-score`,q:`他成绩怎么样？`,keys:[`成绩`,`gpa`,`排名`,`分数`,`绩点`],a:`具体分数没公开，他也不在主页晒成绩。不过眼下有件事是真的：为了申研，绩点是他正在往上拉的东西。要不看看他的项目？`,suggest:[`你打算考研吗？`,`他做过哪些项目？`]}],pu={a:`这个我还没学会答……不过你可能想问这些：`,suggest:[`他做过哪些项目？`,`有什么可以试玩的？`,`怎么联系他？`]},mu=`你是想问这个吗？`,hu={a:`你好，我是刘博康的数字分身「小康分身」👋 关于他的项目、技能、经历，或者这个网站本身，都可以问我。`,suggest:[`他做过哪些项目？`,`有什么可以在线试玩的？`,`怎么联系他？`]},gu=[`aria-expanded`,`aria-label`],_u={"aria-hidden":`true`},vu={key:0,class:`bot-fab-dot`,"aria-hidden":`true`},yu={key:0,class:`bot-tip`,role:`status`},bu=[`aria-label`],xu={class:`bot-head`},Su={class:`bot-name`},Cu={class:`bot-bubble`},wu={key:0,class:`bot-caret`,"aria-hidden":`true`},Tu={key:0,class:`bot-links`},Eu={class:`bot-link-icon`,"aria-hidden":`true`},Du={key:1,class:`bot-suggest`},Ou=[`onClick`],ku={key:2,class:`bot-suggest`},Au=[`onClick`],ju={class:`bot-quick-wrap`},Mu=[`disabled`],Nu=[`disabled`,`onClick`],Pu=[`disabled`],Fu=`homepage-bot-seen`,Iu=Al({__name:`ChatBot`,setup(e){let t=[{re:/Carbon Brain/i,to:`/project/carbon-brain`,icon:`🧠`,label:`Carbon Brain`},{re:/股票量化/,to:`/project/stock-quant`,icon:`📈`,label:`股票量化项目`},{re:/\bcarrot\b|agent 软件|二次开发/,to:`/project/carrot-agent`,icon:`🥕`,label:`自己的 Agent 软件`},{re:/为官一方/,to:`/project/weiguan-yifang`,icon:`🏯`,label:`《为官一方》`},{re:/TO-DO Panel/i,to:`/project/todo-panel`,icon:`📌`,label:`TO-DO Panel`}];function n(e){return t.filter(t=>t.re.test(e)).map(({re:e,...t})=>t)}let r=F(!1),i=F(``),a=F(null),o=F(null),s=F(!1),c=F(localStorage.getItem(Fu)===`1`),l=F(!0),u=F(!1),d=null,f=q(()=>!r.value&&!c.value&&(l.value||u.value)),p=q(()=>!r.value&&!c.value),m=[`我可以问什么问题？`,`他做过哪些项目？`,`有什么可以试玩的？`,`他未来有什么打算？`,`他有什么兴趣爱好？`,`他有对象吗？`,`你喜欢什么类型的？`],h=F(null),g=F(!1),_=F(!1),v=F(!1);function y(){let e=h.value;if(!e)return;let t=e.scrollWidth-e.clientWidth;g.value=t>2,_.value=e.scrollLeft>2,v.value=e.scrollLeft<t-2}function b(){y()}function x(e){let t=h.value;t&&(t.scrollWidth-t.clientWidth<=0||(e.preventDefault(),t.scrollLeft+=e.deltaY||e.deltaX,y()))}function S(e){let t=h.value;if(!t)return;let n=Math.max(160,Math.round(t.clientWidth*.8));t.scrollBy({left:e*n,behavior:`smooth`})}let C=F({type:`none`,idx:0,projectIds:du}),w=F([{from:`bot`,text:hu.a,suggest:hu.suggest}]),ee=typeof window<`u`&&window.matchMedia&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,T=null;function te(){T&&=(clearInterval(T),null),s.value=!1}function E(e,t){let n=typeof document<`u`&&document.hidden;if(ee||n){e.text=e.fullText,ne(e),t?.();return}s.value=!0;let r=0;T=setInterval(()=>{r+=2,r>=e.fullText.length?(e.text=e.fullText,te(),ne(e),t?.()):(e.text=e.fullText.slice(0,r),O())},24)}function ne(e){e.ready=!0,O()}function re(e){let t=lu(e,fu,C.value);if(t.contextUpdate&&(C.value={...C.value,...t.contextUpdate}),t.kind===`empty`)return;if(t.kind===`answer`){let e=[...t.entry.suggest||[]];t.also&&e.push(t.also.q);let r=t.entry.links||[],i=new Set(r.map(e=>e.to)),a=[...r,...n(t.entry.a).filter(e=>!i.has(e.to))],o={from:`bot`,text:``,fullText:t.entry.a,suggest:e.length?e:void 0,links:a.length?a:void 0,ready:!1};w.value.push(o),O(),E(o);return}if(t.kind===`out-of-range`){let e={from:`bot`,text:``,fullText:`一共就 ${t.total} 个项目，都介绍完啦。想再听哪个，说序号或名字都行。`,suggest:[`第一个`,`第三个`,`哪个项目最难？`],ready:!1};w.value.push(e),O(),E(e);return}if(t.kind===`did-you-mean`){let e={from:`bot`,text:``,fullText:mu,candidates:t.candidates.map(e=>e.q),ready:!1};w.value.push(e),O(),E(e);return}let r=(t.candidates||[]).map(e=>e.q),i={from:`bot`,text:``,fullText:t.candidates?.length?pu.a:`这个我还没学会答……换个说法，或者试试这些：`,candidates:r.length?r:pu.suggest,ready:!1};w.value.push(i),O(),E(i)}function ie(){D(i.value)}function ae(e){D(e)}function D(e){let t=e.trim();t&&!s.value&&(te(),w.value.push({from:`me`,text:t}),i.value=``,O(),setTimeout(()=>re(t),300))}function oe(e){if(s.value)return;te();let t=e.replace(/^第[一二三四五1-5]个[:：]/,``);w.value.push({from:`me`,text:e}),O(),setTimeout(()=>re(t),300)}async function O(){await _n(),o.value&&(o.value.scrollTop=o.value.scrollHeight)}async function se(){if(r.value=!r.value,!c.value){c.value=!0;try{localStorage.setItem(Fu,`1`)}catch{}}r.value?(await _n(),y(),a.value?.focus()):te()}function ce(e){e.key===`Escape`&&r.value&&(r.value=!1)}return gr(()=>{document.addEventListener(`keydown`,ce),d=setTimeout(()=>{l.value=!1},8e3)}),yr(()=>{clearTimeout(d),document.removeEventListener(`keydown`,ce),te()}),(e,t)=>{let n=Dr(`RouterLink`);return V(),H(B,null,[U(`button`,{type:`button`,class:`bot-fab`,"aria-expanded":r.value,"aria-controls":`bot-panel`,"aria-label":r.value?`关闭数字分身对话`:`和数字分身聊聊`,onClick:se,onMouseenter:t[0]||=e=>u.value=!0,onMouseleave:t[1]||=e=>u.value=!1,onFocus:t[2]||=e=>u.value=!0,onBlur:t[3]||=e=>u.value=!1},[U(`span`,_u,j(r.value?`✕`:`💬`),1),p.value?(V(),H(`span`,vu)):K(``,!0)],40,gu),W(Xa,{name:`bot-tip`},{default:L(()=>[f.value?(V(),H(`div`,yu,[...t[8]||=[G(` 点我聊聊数字分身 🥕 `,-1),U(`span`,{class:`bot-tip-arrow`,"aria-hidden":`true`},null,-1)]])):K(``,!0)]),_:1}),W(Xa,{name:`bot-pop`},{default:L(()=>[r.value?(V(),H(`section`,{key:0,id:`bot-panel`,class:`bot-panel`,role:`dialog`,"aria-label":`与${I(uu)}对话`},[U(`header`,xu,[t[10]||=U(`span`,{class:`bot-avatar`,"aria-hidden":`true`},`🥕`,-1),U(`div`,null,[U(`p`,Su,j(I(uu)),1),t[9]||=U(`p`,{class:`bot-tag`},`检索式分身 · 对话不上传`,-1)])]),U(`div`,{ref_key:`listEl`,ref:o,class:`bot-list`,"aria-live":`polite`},[(V(!0),H(B,null,z(w.value,(e,i)=>(V(),H(`div`,{key:i,class:A([`bot-msg`,e.from===`me`?`from-me`:`from-bot`])},[U(`p`,Cu,[G(j(e.text),1),e.fullText&&!e.ready?(V(),H(`span`,wu,`▍`)):K(``,!0)]),e.ready&&e.links&&e.links.length?(V(),H(`div`,Tu,[(V(!0),H(B,null,z(e.links,e=>(V(),ta(n,{key:e.to,to:e.to,class:`bot-link-btn`,onClick:t[4]||=e=>r.value=!1},{default:L(()=>[U(`span`,Eu,j(e.icon||`🔗`),1),G(j(e.label),1),t[11]||=U(`span`,{class:`bot-link-arrow`,"aria-hidden":`true`},`→`,-1)]),_:2},1032,[`to`]))),128))])):K(``,!0),e.ready&&e.suggest&&e.suggest.length?(V(),H(`div`,Du,[(V(!0),H(B,null,z(e.suggest,e=>(V(),H(`button`,{key:e,type:`button`,class:`bot-chip`,onClick:t=>oe(e)},j(e),9,Ou))),128))])):K(``,!0),e.ready&&e.candidates&&e.candidates.length?(V(),H(`div`,ku,[(V(!0),H(B,null,z(e.candidates,e=>(V(),H(`button`,{key:e,type:`button`,class:`bot-chip`,onClick:t=>oe(e)},j(e),9,Au))),128))])):K(``,!0)],2))),128))],512),U(`div`,ju,[g.value?(V(),H(`button`,{key:0,type:`button`,class:`quick-arrow`,disabled:!_.value,"aria-label":`向左滚动更多问题`,onClick:t[5]||=e=>S(-1)},`‹`,8,Mu)):K(``,!0),U(`div`,{ref_key:`quickRef`,ref:h,class:`bot-quick`,"aria-label":`预设问题`,role:`group`,onWheel:x,onScroll:b},[(V(),H(B,null,z(m,e=>U(`button`,{key:e,type:`button`,class:A([`bot-chip bot-quick-chip`,{"bot-quick-main":e===`我可以问什么问题？`}]),disabled:s.value,onClick:t=>ae(e)},j(e),11,Nu)),64))],544),g.value?(V(),H(`button`,{key:1,type:`button`,class:`quick-arrow`,disabled:!v.value,"aria-label":`向右滚动更多问题`,onClick:t[6]||=e=>S(1)},`›`,8,Pu)):K(``,!0)]),U(`form`,{class:`bot-input`,onSubmit:$o(ie,[`prevent`])},[R(U(`input`,{ref_key:`inputEl`,ref:a,"onUpdate:modelValue":t[7]||=e=>i.value=e,type:`text`,placeholder:`问点什么…`,"aria-label":`输入想问的问题`,maxlength:`100`},null,512),[[Xo,i.value]]),t[12]||=U(`button`,{type:`submit`,class:`bot-send`,"aria-label":`发送`},`➤`,-1)],32)],8,bu)):K(``,!0)]),_:1})],64)}}},[[`__scopeId`,`data-v-564fdb6d`]]),Lu=18,Ru=14,zu=280,Bu=220,Vu=190,Hu=96,Uu=.4,Wu=.22,Gu=11,Ku=6,qu=120,Ju=Al({__name:`PixelWave`,setup(e){let t=()=>Math.min(window.innerWidth,window.innerHeight)<560,n=[{off:0,amp:1},{off:-30,amp:.55},{off:-60,amp:.28}],r=F(null),i=null,a=[],o=0,s=`#4a8a5c`;function c(e,n){let r=t();a.push({x:e,y:n,t0:performance.now(),speed:r?Vu:zu,rMax:r?Hu:Bu,peak:r?Wu:Uu}),a.length>Ku&&a.shift(),o||=requestAnimationFrame(v)}let l=null,u=0,d=0;function f(e){e.pointerType!==`touch`&&(u=e.clientX,d=e.clientY,c(u,d),clearInterval(l),l=setInterval(()=>c(u,d),qu),window.addEventListener(`pointermove`,p),window.addEventListener(`pointerup`,m),window.addEventListener(`pointercancel`,m))}function p(e){u=e.clientX,d=e.clientY}function m(){clearInterval(l),l=null,window.removeEventListener(`pointermove`,p),window.removeEventListener(`pointerup`,m),window.removeEventListener(`pointercancel`,m)}function h(e){let t=e.changedTouches[0];t&&(u=t.clientX,d=t.clientY,c(u,d),clearInterval(l),l=setInterval(()=>c(u,d),qu))}function g(e){let t=e.changedTouches[0];t&&(u=t.clientX,d=t.clientY)}function _(e){e.touches.length===0&&(clearInterval(l),l=null)}function v(){if(o=0,!i)return;let e=window.innerWidth,t=window.innerHeight;i.clearRect(0,0,e,t);let r=performance.now();if(a=a.filter(e=>(r-e.t0)/1e3*e.speed<e.rMax),a.length!==0){i.fillStyle=s;for(let e of a){let t=(r-e.t0)/1e3*e.speed,a=1-t/e.rMax;if(a<=0)continue;let o=Math.floor((e.x-t-70)/Lu),s=Math.ceil((e.x+t+70)/Lu),c=Math.floor((e.y-t-70)/Lu),l=Math.ceil((e.y+t+70)/Lu);for(let r=o;r<=s;r++){let o=r*Lu+Lu/2,s=o-e.x;for(let r=c;r<=l;r++){let c=r*Lu+Lu/2,l=c-e.y,u=Math.sqrt(s*s+l*l),d=0;for(let e of n){let n=(u-(t+e.off))/Gu;d+=e.amp*Math.exp(-n*n)}d*=e.peak*a,!(d<.015)&&(i.globalAlpha=d,i.fillRect(o-Ru/2,c-Ru/2,Ru,Ru))}}}i.globalAlpha=1,o=requestAnimationFrame(v)}}function y(){if(!r.value)return;let e=Math.min(window.devicePixelRatio||1,2);r.value.width=window.innerWidth*e,r.value.height=window.innerHeight*e,i=r.value.getContext(`2d`),i&&i.setTransform(e,0,0,e,0,0)}return gr(()=>{window.matchMedia(`(prefers-reduced-motion: reduce)`).matches||(y(),i&&(s=getComputedStyle(document.documentElement).getPropertyValue(`--wave-color`).trim()||s,window.addEventListener(`resize`,y),window.addEventListener(`pointerdown`,f),window.addEventListener(`touchstart`,h,{passive:!0}),window.addEventListener(`touchmove`,g,{passive:!0}),window.addEventListener(`touchend`,_,{passive:!0})))}),br(()=>{o&&cancelAnimationFrame(o),m(),clearInterval(l),window.removeEventListener(`resize`,y),window.removeEventListener(`pointerdown`,f),window.removeEventListener(`touchstart`,h),window.removeEventListener(`touchmove`,g),window.removeEventListener(`touchend`,_)}),(e,t)=>(V(),H(`canvas`,{ref_key:`cv`,ref:r,class:`pixel-wave`,"aria-hidden":`true`},null,512))}},[[`__scopeId`,`data-v-3bad7c16`]]),Yu=`homepage-intro-done`,Xu=Al({__name:`SiteIntro`,setup(e){let t=`/homepage/`,n=`url(${t}intro/cloud.webp)`,r=`url(${t}intro/canopy.webp)`,i=`url(${t}art/hero-forest.webp)`,a=F(!1),o=F(`cloud`);gr(()=>{try{if(sessionStorage.getItem(Yu)===`1`)return}catch{}typeof window.matchMedia==`function`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches||(a.value=!0)});function s(){o.value===`cloud`&&(o.value=`dive`,setTimeout(()=>{o.value=`settle`},1500),setTimeout(()=>{o.value=`fade`},3100),setTimeout(()=>{o.value=`done`,a.value=!1;try{sessionStorage.setItem(Yu,`1`)}catch{}},4e3))}return(e,t)=>a.value?(V(),H(`div`,{key:0,class:A([`site-intro`,`intro-${o.value}`]),role:`button`,tabindex:`0`,"aria-label":`点击进入个人主页（进入后播放背景音乐）`,onClick:s,onKeydown:ts(s,[`enter`])},[U(`div`,{class:`intro-layer intro-cloud`,style:k({backgroundImage:n}),"aria-hidden":`true`},null,4),U(`div`,{class:`intro-layer intro-canopy`,style:k({backgroundImage:r}),"aria-hidden":`true`},null,4),U(`div`,{class:`intro-layer intro-forest`,style:k({backgroundImage:i}),"aria-hidden":`true`},null,4),t[0]||=U(`div`,{class:`intro-cta`,"aria-hidden":`true`},[U(`span`,{class:`cta-text`},`点击进入`),U(`span`,{class:`cta-sub`},`进入后将播放背景音乐`)],-1)],34)):K(``,!0)}},[[`__scopeId`,`data-v-948ebacc`]]),Zu=`__wb`,Qu=2200;function $u(){let e=!1,t=!1,n=0,r=null,i=null,a=()=>typeof navigator<`u`&&/MicroMessenger/i.test(navigator.userAgent);function o(){try{r||(r=document.createElement(`div`),r.className=`wechat-exit-toast`,r.setAttribute(`role`,`status`),r.textContent=`再滑一次退出网页`,document.body.appendChild(r)),r.classList.add(`show`),clearTimeout(i),i=setTimeout(()=>r?.classList.remove(`show`),2e3)}catch{}}function s(){try{history.pushState({...history.state,[Zu]:2},``,location.href)}catch{}}function c(e){if(!e.state||e.state[Zu]!==1)return;let t=Date.now();if(t-n<Qu){try{window.WeixinJSBridge?.call?.(`closeWindow`)}catch{}return}n=t,s(),o()}function l(){if(!e&&a()){e=!0;try{history.replaceState({...history.state,[Zu]:1},``,location.href),s(),window.addEventListener(`popstate`,c),t=!0}catch{}}}gr(()=>{try{document.addEventListener(`WeixinJSBridgeReady`,l,{once:!0})}catch{}setTimeout(l,800)}),br(()=>{t&&window.removeEventListener(`popstate`,c)})}var ed=`刘博康`,td=`https://carrotsoup123456.github.io/homepage/`,nd=`刘博康 – 个人主页`;function rd(e=`/`){let t=e.replace(/^\//,``);return t?`${td}#/${t}`:td}function id(e,t){if(typeof document>`u`)return;let n=document.head.querySelector(e);n||(n=document.createElement(e.startsWith(`link`)?`link`:`meta`),document.head.appendChild(n));for(let[e,r]of Object.entries(t))n.setAttribute(e,r);return n}function ad({title:e,desc:t,path:n}={}){if(typeof document>`u`)return;let r=e?`${e} · ${ed}`:nd,i=t||`刘博康的个人主页 · 计算机科学与技术 · 项目、知识库与联系方式`,a=rd(n);document.title=r,id(`meta[name="description"]`,{name:`description`,content:i}),id(`link[rel="canonical"]`,{rel:`canonical`,href:a}),id(`meta[property="og:title"]`,{property:`og:title`,content:r}),id(`meta[property="og:description"]`,{property:`og:description`,content:i}),id(`meta[property="og:url"]`,{property:`og:url`,content:a}),id(`meta[name="twitter:title"]`,{name:`twitter:title`,content:r}),id(`meta[name="twitter:description"]`,{name:`twitter:description`,content:i})}var od=e=>`/homepage/${e.replace(/^\//,``)}`,sd={id:`bgm-waltz`,title:`Victory Waltz（圆舞曲 BGM）`,artist:`Pixabay · 开放授权`,tag:`管弦 · 圆舞曲`,src:od(`music/bgm-waltz.mp3`),cover:od(`music/covers/waltz.webp`),note:`交响风格的圆舞曲，来自 Pixabay（Pixabay License：免费商用、无需署名），2 分 43 秒循环`},cd={id:`drum-cover`,title:`架子鼓训练视频`,desc:`这一段是我在演奏草东没有派对的《大石碎胸口》，视频展现的是其最后一段的高潮片段。`,src:od(`music/drum-video.mp4`),poster:od(`music/covers/drum.webp`),alt:`架子鼓训练视频：鼓手演奏《大石碎胸口》高潮片段`},ld=[{id:`libai`,title:`李白`,artist:`李荣浩`,tag:`要是能重来`,hue:12,cover:od(`music/covers/libai.webp`)},{id:`zuijia-sunyou`,title:`最佳损友`,artist:`陈奕迅`,tag:`朋友，我当你一秒朋友`,hue:210,cover:od(`music/covers/sunyou.webp`)},{id:`xin-diqiu`,title:`新地球`,artist:`林俊杰`,tag:`赛博乡愁`,hue:160,cover:od(`music/covers/diqiu.webp`)},{id:`hongchen-kezhan-dj`,title:`红尘客栈（DJ 版）`,artist:`周杰伦`,tag:`武侠舞池`,hue:340,cover:od(`music/covers/kezhan.webp`)},{id:`pengyou-de-jiu`,title:`朋友的酒`,artist:`李晓杰`,tag:`饭局 BGM`,hue:36,cover:od(`music/covers/jiu.webp`)},{id:`wangfei`,title:`王妃`,artist:`萧敬腾`,tag:`夜店摇滚`,hue:275,cover:od(`music/covers/wangfei.webp`)},{id:`qingchun-buda-yang`,title:`青春不打烊`,artist:`王梓钰`,tag:`热血夜间档`,hue:190,cover:od(`music/covers/qingchun.webp`)},{id:`pipa-xing-dj`,title:`琵琶行（DJ 版）`,artist:`传统曲目改编`,tag:`国风电音`,hue:25,cover:od(`music/covers/pipa.webp`)},{id:`gulou`,title:`鼓楼`,artist:`赵雷`,tag:`民谣散步`,hue:100,cover:od(`music/covers/gulou.webp`)}],ud={class:`reading-bar`,"aria-hidden":`true`},dd=[`src`],fd=`homepage-theme`,pd=Al({__name:`App`,setup(e){let t=dl();Pn(()=>t.fullPath,()=>{ad({title:t.meta?.title,desc:t.meta?.desc,path:t.path})},{immediate:!0});let n=F(0),r=!1;function i(){let e=document.documentElement.scrollHeight-window.innerHeight;n.value=e>0?Math.min(100,window.scrollY/e*100):0,r=!1}function a(){r||(r=!0,requestAnimationFrame(i))}let o=(()=>{try{return localStorage.getItem(fd)}catch{return null}})(),s=typeof window<`u`&&window.matchMedia&&window.matchMedia(`(prefers-color-scheme: dark)`).matches,c=F(o||(s?`dark`:`light`));function l(e,t){if(document.documentElement.dataset.theme=e,t)try{localStorage.setItem(fd,e)}catch{}}function u(){c.value=c.value===`dark`?`light`:`dark`,l(c.value,!0),f()}let d=null;function f(){document.documentElement.classList.add(`theme-transition`),clearTimeout(d),d=setTimeout(()=>document.documentElement.classList.remove(`theme-transition`),380)}gr(()=>{document.addEventListener(`gesturestart`,e=>e.preventDefault(),{passive:!1}),l(c.value,!1),window.matchMedia&&window.matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,e=>{o||(c.value=e.matches?`dark`:`light`,l(c.value,!1))}),window.addEventListener(`scroll`,a,{passive:!0}),window.addEventListener(`resize`,a,{passive:!0}),i(),m(p.value)}),An(`theme`,c),An(`toggleTheme`,u);let p=F(null),{attach:m,onTimeUpdate:h}=kl();$u();let g=F(null);function _(e){e.preventDefault(),g.value?.focus(),g.value?.scrollIntoView?.({block:`start`})}return(e,t)=>(V(),H(B,null,[U(`a`,{class:`skip-link`,href:`#main`,onClick:_},`跳到主要内容`),U(`div`,ud,[U(`span`,{style:k({width:n.value+`%`})},null,4)]),W(Xl),U(`main`,{id:`main`,ref_key:`mainEl`,ref:g,class:`app-main`,tabindex:`-1`},[W(I(cl),null,{default:L(({Component:e})=>[W(Xa,{name:`page`,mode:`out-in`},{default:L(()=>[(V(),ta(kr(e)))]),_:2},1024)]),_:1})],512),W($l),W(Iu),W(Ju),W(Xu),U(`audio`,{ref_key:`bgmAudioEl`,ref:p,src:I(sd).src,loop:``,preload:`auto`,onTimeupdate:t[0]||=(...e)=>I(h)&&I(h)(...e),"aria-label":`全站背景音乐：雨中森林`},null,40,dd)],64))}},[[`__scopeId`,`data-v-ab0ef2b9`]]),Z=e=>`/homepage/${e.replace(/^\//,``)}`,md={name:`刘博康`,tagline:`计算机科学与技术学生`,bio:`你好！我是一名计算机科学与技术的大一新生，兴趣广泛，包括但不限于研究股票、架子鼓演奏、阅读。`,avatar:Z(`avatar.webp`)},hd=[`Python`,`AI 工具应用能力`,`架子鼓（10 级）`,`工程实践能力`],gd=[{id:`python`,name:`Python`,level:`主力语言`,summary:`从数据处理到模型训练，我的所有机器学习项目都用它完成。`,points:[`用 pandas / numpy 清洗实验室原始传感器数据（单文件最多 2.5 万行）`,`用 scikit-learn 构建机器学习流水线：特征工程 → 训练 → 交叉验证 → 评估`,`用 LightGBM 处理表格数据并输出特征重要性，据此判断哪些因子真正有用`,`写 Flask 接口把训练好的模型接到前端页面上，做成能点的界面`],evidence:[`Carbon Brain 项目`,`股票量化软件`]},{id:`ai-tools`,name:`AI 工具应用能力`,level:`最常用的一项`,summary:`不止是「会用对话工具」，而是把 AI 当成工程伙伴来组织工作流。`,points:[`用一个桌面面板把课程表、作业截止日期和我负责的项目排期统一管起来`,`给重复性工作写「技能」和「子 agent」，把一次性操作固化成可复用的流程`,`用提示词做受控对照实验：同一任务开关某个技能，对比代码行数与 token 消耗`,`给 AI 协作定了硬规矩：改前先备份、小步提交、用测试当护栏、卡住了就换路子`],evidence:[`TO-DO Panel 定制`,`Claude Code 桌面版二次开发`]},{id:`engineering`,name:`工程实践能力`,level:`从想法到能跑`,summary:`能把一个想法一路做到「别人可以双击打开」的程度，而不是停在草稿。`,points:[`独立完成一款模拟游戏的策划、数值设计、代码实现与打包发布`,`用「配置文件 + 校验脚本」的思路做内容：新增事件只改 JSON，不碰代码`,`写自动化测试守住底线，并自研 Node 工具做整局模拟与数据校验`,`把 TypeScript 核心逻辑复用成单文件网页，再用原生外壳包成 macOS 应用与安装包`],evidence:[`《为官一方》`,`股票量化软件`]},{id:`drums`,name:`架子鼓（10 级）`,level:`坚持最久的事`,summary:`从高中乐团打到现在的长期爱好，也塑造了我做项目的方式。`,points:[`高中校管乐团、弦乐团鼓手，多次参与校内展演`,`代表学校参加中山市第六届中小学生艺术展演比赛，所在乐团获二等奖与三等奖`,`练鼓教会我的事：复杂节奏要拆成小节反复练，复杂项目也一样要拆成小步`],evidence:[`中山市艺术展演二等奖 / 三等奖`]}],_d=[{id:`carrot-agent`,icon:`🥕`,title:`设计并做出自己的 Agent 软件 —— carrot`,short:`从改装 Claude Code 到复现 Codex，再到融合出自己的 carrot agent——一条完整的造软件之路`,desc:`先把一款 Claude Code 桌面应用改装到能日用，再用同样思路复现了一个简易 Codex，最后把两边学到的东西合起来，做出属于自己的 agent 软件 <strong>carrot</strong>。`,tech:`Node.js / Claude Agent SDK / Electron / Playwright MCP / sqlite`,role:`独立设计与开发（起点基于第三方开源壳，详见正文）`,images:[{src:Z(`projects/carrot/ui.webp`),alt:`carrot 最终形态：对话区 + 快捷指令栏 + 技能库面板 + 上下文余量条`,anchor:`第三步`},{src:Z(`projects/carrot/phone.webp`),alt:`手机远程操控实拍：手里的 iPhone 经公网隧道连着电脑上的同一个 carrot 会话——电脑干活，手机接力`,anchor:`第三步`},{src:Z(`projects/claude-code/card.webp`),alt:`第一步改装 Claude Code：注入的技能库面板（全中文名 + 分类）`,anchor:`第一步`},{src:Z(`projects/carrot/toolbox.webp`),alt:`carrot 工具箱面板：内置工具与浏览器模组一览（MCP 可视化）`,anchor:`fork 漂移与 MCP`},{src:Z(`projects/carrot/goals.webp`),alt:`carrot 目标面板：GOALS.md 界面化，勾选即回写文件`,anchor:`第二步`},{src:Z(`projects/carrot/drift.webp`),alt:`carrot 更新防护链：实时官方日志 + fork 漂移预检`,anchor:`fork 漂移与 MCP`}],long:`> **先把边界说清楚**：这不是从零手写的软件。起点是一款别人开源的 claude-code-web 壳（Electron + Web UI）和 Anthropic 官方开源的 Claude Agent SDK——**底座非原创**，我从不主张它是。我做的是：把底座彻底吃透、一路改装、再对照开源的 Codex 补全认知，最后融合出自己的 carrot agent。三步的每一步都留了可查证的记录。

### 第一步：改装 Claude Code（弄懂 agent 的内脏）
在一款第三方 Claude Code 桌面应用上做了 **30 轮本地改造**，只补丁不动上游源码：
- **修真缺陷**：流式输出会丢消息块——根因是上游 SDK 复用同一个消息 id，多个消息块键撞车互相覆盖。改法是按消息 id 排队对账，改完用探针数数证明修对了（修前运行中 9 条 vs 存档 17 条对不上，修后两边一致）
- **补功能**：上下文超限自愈（爆 400 后自动断开重开）、卡住自愈（看门狗 30 秒一查，卡 5 分钟弹确认，最多自动重试 2 次）、会话回滚分叉（从任意一轮"回到这里"）
- **更新守门**：给"一键更新"加了 SDK 探针——官方 SDK 升级后接口对不上就自动回滚旧版，防止自己的魔改被更新冲掉
- **修到能日用**：手机 PWA + 隧道 + 永久入口、附件三入口（图片/视频/文档）、给上游社区写了卡住自愈的设计提案

### 第二步：简易 Codex（换一个开源样本，验证理解）
调研了 OpenAI 开源的 Codex（Apache-2.0，Rust 核心）并做对比分析，得出一个重要判断：**框架可以复现，"模型 × 提示词的协同调优"复现不了**——能抄来 agent 的形状（工具循环、沙箱、审批），抄不来它的手感。基于这个认知，用同样的壳 + SDK 思路搭了一个简易 Codex 实验，重点验证两件事：会话记忆怎么自动注入（systemPrompt 层面）、记忆怎么在轮次结束时自动提取回写。

### 第三步：carrot agent（把两边合起来，做自己的）
深度融合后落地的自己的软件，现在每天在用：
- **人格与记忆**：独立的 ~/.carrot/ 目录（人格、技能、MEMORY/GOALS），每轮自动注入记忆，模型打出记忆标签就自动入库（MEMORY.md 人类可读 + sqlite 结构化双写）
- **浏览器能力**：接入 Playwright MCP，22 个浏览器工具（导航/点击/截图/快照）
- **上下文管理**：余量条实时显示、自动压缩、手动 /compact 一键触发
- **目标面板 + 工具箱 + 快捷指令栏**：GOALS.md 界面化、MCP 模组可视化、六个一键技能按钮
- **手机远程操控**：出门在外也能遥控电脑上的 carrot——手机浏览器直达公网隧道入口，不用装 App。指令在手机上发、活在电脑上干，多端同时在线、会话实时同步：电脑跑着构建，我在别处用手机看它的排障汇报、接着下一条指令（项目图集里那张 iPhone 与 MacBook 同屏同一个会话的实拍就是日常工作的样子）

### fork 漂移与 MCP 仓库（让 carrot 长期活着的两条后勤线）
carrot 是 fork 深改出来的：上游在更新、我的定制在累积，这两件事不想清楚，改得越多将来越难受。
- **fork 漂移管理**：上游出新版本，最怕的就是一键跟进而自己的定制被冲掉。所以把「我的改动 vs 上游新版本」的差异当成正经事来对齐——上游改了什么、我改过哪里，两边比对着合并：上游的新能力进得来，我的定制一条不丢（图集里那张「更新防护链：实时官方日志 + fork 漂移预检」就是这条线的日常界面）
- **MCP 配置仓库**：给 carrot 接工具不写死在代码里——把社区现成的 MCP servers 收进一份集中管理的配置清单，想让 carrot 会什么，清单里加一条：浏览器的 22 个工具就是这么接进来的，以后要会新东西，也是加一条配置的事

### 一路踩的坑（挑几个真的疼的）
- **Playwright MCP 三连坑**：--browser 参数写 headless-shell 静默失效回落；--browser chromium 要的完整版 1247 没装就是起不来；macOS unix socket 路径上限 104 字节，playwright 默认目录 115 字节必挂——三个坑一个不响，全靠日志一点点挖
- **SDK 四个坑**：上下文用量只能在消息循环活着时查、连接一关再查就炸；自动压缩阈值三条配置路径全无效；SDK init 返回里根本没有窗口大小字段——**别猜字段名，实测为准**
- **记忆注入的 resume 盲区**：恢复旧会话不注入记忆（快照语义复用首请求），验证注入必须开新会话——不知道这个，会以为自己的记忆系统坏了
- **UI 审美被否史**：侧栏吉祥物连改五版全被否（渐变卡通→护目镜"太搞了"→像素大眼→……），最后才明白**只要配色不要拟物**；主题连换六版才定稿"胡萝卜园"
- **AI 生成图标被判死**：水印位置固定、圆角弧线附近必有伪影，修了 4 轮不根治——最终解是官方像素素材 + 程序合成，零修复
- **旗舰模型流式故障**：旗舰模型经代理流式输出畸形（112 段思考、1 段正文），同一链路换 Flash 一切正常——果断先用 Flash 保可用，别被旗舰绑架

### 我学到的
造 agent 软件最难的不是功能，是**每个功能都要扛住真实使用**：更新会被冲掉、会话会爆、模型会卡、手机端会被网络欺负。每修一处就留探针和记录，这些"坑账"本身就是这个项目最值钱的产出。`,highlights:[`从改装到原创的完整三步历程`,`六个真实踩坑与修法，全部留痕`,`记忆系统 / MCP 配置仓库 / 手机远程操控 / fork 漂移管理`]},{id:`carbon-brain`,icon:`🧠`,title:`Carbon Brain`,short:`用机器学习估算 DAC 材料吸附饱和度（团队项目，我任组长）`,desc:`基于 Polyam-N-Cu<sup>2+</sup> 新型 DAC 吸附材料，尝试用监督学习估算材料当前吸附饱和度，目标是让装置在「吸附」与「再生」之间**按需切换**，而不是按固定时间切换。`,tech:`Python / XGBoost`,role:`项目组长`,images:[{src:Z(`projects/carbon-brain/card.webp`),alt:`Carbon Brain 项目团队合影`}],long:`直接空气捕集（DAC）材料吸满之后必须再生才能继续工作。**与其按固定时间切换，不如让模型告诉我们「现在还剩多少容量」。** 这就是这个项目要做的事：用实验数据训练模型，估算 Polyam-N-Cu<sup>2+</sup> 材料当前的吸附饱和度。

### 技术路线
- **数据**：装置采回的传感器原始数据（时间戳、温度、湿度、进出口 CO₂ 浓度、流量），单文件最大 2.5 万行；另有 20 个循环的合成数据
- **物理换算**：用理想气体定律把流量换算成摩尔流率，再做物料衡算、对时间积分得到吸附量，最后除以饱和容量得到饱和度
- **模型**：XGBoost 回归，输入为原始量 + 滚动均值 + 滚动标准差等 **18 维特征**，约 **3 万行**样本参与训练

### 我的职责
- 项目组长，统筹进度与分工
- 负责数据清洗、特征工程与模型训练
- 设计吸附 / 再生的自动切换阈值，并参与装置联调

### 结果与局限（如实说明）
- 饱和度估算模型已训练完成，物理换算链路跑通
- 但用**按日期切分**的测试集评估时 **R² 为负**，说明模型还无法泛化到没见过的实验日，目前只能算「打通了流程」，不能算「可以上线」
- 原本计划用来触发自动切换的**突破时间预测模型并未训练成功**，所以「自动切换」目前还停留在设计与阈值阶段
- 部分物理参数（如吸附剂质量）还需要用实验真值再核对一遍`,highlights:[`团队项目 · 组长`,`物理量换算 + 特征工程`,`结果与局限如实记录`]},{id:`stock-quant`,icon:`📈`,title:`基于监督学习的股票量化软件`,short:`A 股机器学习选股流程，从数据地基到回测与可视化`,desc:`一套完整的 A 股机器学习量化流程：从原始行情整理成特征数据集，训练模型预测「未来若干天能否跑赢全市场」，再做回测与可视化界面。`,tech:`Python / LightGBM`,role:`个人项目负责人`,images:[{src:Z(`projects/stock/card.webp`),alt:`机器学习策略回测结果：收益指标与净值曲线`},{src:Z(`projects/stock/backtest.webp`),alt:`机器学习策略回测结果完整页面`},{src:Z(`projects/stock/paper.webp`),alt:`模拟盘监控界面`}],long:`目标是把「凭感觉选股」换成「按流程选股」：一份可复现的特征数据集，一个可替换的模型，一套能看结果的界面。

### 技术路线
- **数据地基**：把行情数据整理成训练集，涵盖日线与 30 分钟线两类因子
- **特征工程**：构造 20 个日线因子 + 8 个日内因子，共 **28 个因子**（含市值代理、波动率、动量、量比、量价相关性等）
- **模型**：LightGBM，既能做分类（涨 / 不涨）也能做回归（预测收益幅度），并用特征重要性反查哪些因子真正起作用
- **回测与控制台**：按固定调仓频率滚动选股，输出净值曲线、超额收益与最大回撤；另做了 Flask 网页与桌面控制台两种查看方式

### 回测口径（重要，避免误读）
截图中那条曲线是 **LightGBM 回归（调优）** 策略：选股 50 只、每 5 个交易日调仓，测试区间 2025-01-01 至 2026-08-14，区间内总收益 112.74%、相对基准超额 66.17%、最大回撤 -10.02%。

另外还跑过一个**传统规则策略**（小市值 + 低波 + 反转），它的完整结果以 JSON 落盘、可复现：区间收益 16.85%，而同期基准 44.93%，**超额为 -28.08%**——说明在同样的区间里，规则策略其实没跑赢大盘。

### 我的职责
- 独立完成：数据获取与清洗、特征构建、模型训练与调参、回测框架、界面展示

### 已知局限（如实说明）
- 112.74% 这个数字只在界面截图里留存，仓库中没有落盘成可复现的结果文件，换机器需要重新跑一次回测脚本才能重算
- 模型一直在迭代（分类版 / 回归版并行），**这条回测属于回归版**，不代表分类版的成绩
- 模拟盘已经接上但**尚未产生真实交易**，净值一直停在初始值——也就是说目前还没有任何实盘验证
- 回测数据本身有幸存者偏差与过拟合风险，**过去的高收益不能当作未来的预期**`,highlights:[`28 因子特征工程`,`分类 / 回归双线迭代`,`回测口径与局限如实记录`]},{id:`weiguan-yifang`,icon:`🏯`,title:`《为官一方》古风县令治理模拟`,short:`对标《设身处地》的原创县治模拟游戏，已有可双击运行的成品`,desc:`一款古代县令治理模拟游戏：<strong>你是青阳县令</strong>，一方百姓、一位青天，还是一身骂名——都由你的每一次抉择写成。已完成可双击运行的 macOS 版本。`,tech:`Cocos Creator 3.8 / TypeScript`,role:`单人全栈（策划 + 数值 + 程序）`,images:[{src:Z(`projects/weiguan-yifang/card.webp`),alt:`游戏核心玩法：政令抉择界面（设粥棚/修堤筑坝/巡视乡里等政令卡）`},{src:Z(`projects/weiguan-yifang/event.webp`),alt:`游戏内政令抉择界面：城中乞儿事件与三个选项`},{src:Z(`projects/weiguan-yifang/cover.webp`),alt:`《为官一方》内置试玩版封面`},{src:Z(`projects/weiguan-yifang/bg.webp`),alt:`游戏使用的传统水墨山水背景（AI 生成素材）`}],long:`一款**古代县令治理模拟**游戏。你是大衍朝青阳县的七品县令，要在**治县三载**里平衡银库、粮仓、民心、治安、官声、人口六项指标，三年后按考课结果决定前程。

选题来自对爆款《设身处地》的拆解：舞台由现代城市换成古代县城，身份由城市行政长官换成七品知县，并补上**断案审判、官场考课、士绅博弈、天灾应对**四套该系统特有的玩法。世界观用架空朝代，规避真实朝代影射。

### 已完成的量
- **20 条**核心事件、**12 项**政令（含冷却与前置条件）、**3 则**完整断案剧本
- **6 维数值** + **2 条人格轴**（仁政↔严刑、清廉↔钻营），3 种出身（进士 / 举人 / 捐官），3 档难度
- **18 项**针对政令系统的自动化断言

### 我的职责（单人全栈）
- **策划与内容**：竞品分析报告、策划书、数值系统表、核心事件表、断案剧本、UI 线框图
- **工程实现**：把核心逻辑写成**不依赖游戏引擎**的纯 TypeScript，可以脱离引擎单独测试
- **配置驱动**：事件与政令全部放在 JSON 里，配 JSON Schema 校验脚本，改内容不用碰代码
- **工具链**：自研 4 个 Node 工具做数据校验与整局模拟，避免数值平衡靠手调
- **跨端交付**：把核心逻辑复用成单文件网页，再用 Swift + WebKit 包成可双击运行的 macOS 应用并生成安装包

### 当前状态
立项文档与可玩原型都已完成，三种运行方式都能跑：单文件网页、网页构建版、macOS 应用 / 安装包。下一步是数值平衡校准与美术替换——目前的场景是程序生成的 SVG 画面，属于占位方案。`,highlights:[`单人全栈`,`配置驱动 + 数据校验`,`可双击运行的 macOS 成品`]},{id:`todo-panel`,icon:`📌`,title:`TO-DO Panel 桌面面板定制`,short:`给开源桌面面板加数据写入通道、日历页与课表导入，从 1.1 深度定制到 1.2.5（上游：xiaopu-ai/TO-DO Panel）`,desc:`TO-DO Panel 是一个常驻 macOS / Windows 屏幕顶部的本地工作台（MIT 开源）。我在自己机器上对它做了一路深度定制：先加了<strong>可靠的数据写入通道</strong>，再自己长出<strong>日历页、学期课表导入、今日课程 + 未来七天首页、三档截止提醒</strong>，把它从一个通用面板改成了自己的学业中枢。`,tech:`Electron / JavaScript`,role:`本地二次开发（上游：xiaopu-ai/TO-DO Panel，MIT 许可）`,images:[{src:Z(`projects/todo-panel/calendar.webp`),alt:`日历页：月视图 + 真实学期课表 + 右侧当天安排（均为自己加的 1.2.x 功能）`},{src:Z(`projects/todo-panel/home.webp`),alt:`首页改版：今日课程 + 未来七天 DDL（1.2.2）`},{src:Z(`projects/todo-panel/todo.webp`),alt:`待办页面：课表与作业截止统一进四个象限`},{src:Z(`projects/todo-panel/card.webp`),alt:`工作台全貌：音乐/番茄钟/随笔记等模块`}],long:`> **先说清楚边界**：TO-DO Panel 是 **xiaopu-ai 开发的开源项目**（MIT 许可），不是我原创的产品。我做的是**本机二次开发**——从 1.1 一路定制到自己的 1.2.5，下面每一项都是我加的。这一条对课程和面试都重要，所以写在最前面。

### 第一步：打通数据（解决"灌不进去"）
面板把数据存在浏览器本地存储里，**渲染层每 2 秒会把整份数据回写一次**——脚本直接改数据文件必然被冲掉。我加了一条 **HTTP 写入通道**：主进程接收请求、经 IPC 交给渲染层，让渲染层自己落盘，从根上绕开回写。现在一条命令就能把课表和待办批量灌进去，还能查询与删除。

### 第二步：长出自己的功能（1.2.0 → 1.2.5）
写入通道有了之后，围绕"把学业真正管起来"连做了五个版本：
- **日历页（1.2.0）**：月视图大格子（周一起始、相邻月淡显），年月切换 + 今天回跳，右侧"当天安排"栏聚合当天课程与截止作业
- **学期课表导入（1.2.1）**：写规则 JSON（学期周次、起止窗口、假期排除、单日特殊时段），自动按周展开成具体日期课次；重复导入幂等覆盖，手动加的课不受影响
- **首页改版（1.2.2）**：改成"今日课程 + 未来七天"——左边当天课的时间/教室/教师，右边未来 7 天 DDL 按截止时间排序；课表导入同时携带作业待办，幂等合并进提醒体系
- **三档截止提醒（1.2.3）**：从"到期前 1 小时提醒一次"改成提前两天/一天/12 小时各提醒一次，刚导入时已错过的档位自动跳过、不补发过期提醒
- **两个真 bug 修复（1.2.4/1.2.5）**：日期弹层被圆角规则误裁到滚不动；输入框打字时输入法候选条被置顶层盖住——聚焦时窗口临时降层让候选条浮上来，失焦立即恢复

### 踩过的坑（挑最疼的）
- **重签名的坑**：Electron 应用改完代码必须重新签名，而且必须**由内到外**逐层签、带 entitlements——只签外层会因内层框架身份不一致被 macOS 拒载，应用直接打不开。后来想明白了更省事的办法：只改 JavaScript 资源根本不用重签
- **窗口层级的坑**：面板常驻最高层是为了躲开菜单栏，但这个层级也会盖住系统输入法候选条——两个需求打架。解法是聚焦时临时降层、失焦恢复，"该高的时候高，该让的时候让"

### 把流程固化下来
写了「备份 → 改 → 语法检查 → 跑测试 → 重签 → 重启端到端验证」六步流程并沉淀成可复用技能；上游自动更新会覆盖本地改动，更新后按技能重打补丁，成本很低。`,highlights:[`上游为 MIT 开源项目（非原创）`,`自研 HTTP 写入通道`,`日历页 / 课表导入 / 三档提醒五个版本`]}],vd=[{period:`高中阶段`,org:`中山市中山纪念中学 校管乐团 / 弦乐团`,role:`架子鼓手`,desc:`担任校管乐团与弦乐团鼓手，在校期间多次参与展演活动（图1、2、3）。带队参加中山市第六届中小学生艺术展演活动管（弦）乐比赛，校管乐团《La La Land》获三等奖、弦乐团《il vento d’ oro》获二等奖（图4、5）。`,images:[{src:Z(`experience/band-1.webp`),alt:`架子鼓展演`},{src:Z(`experience/band-2.webp`),alt:`校管弦乐团演出`},{src:Z(`experience/band-3.webp`),alt:`舞台演出`},{src:Z(`experience/award-2.webp`),alt:`二等奖获奖证书`},{src:Z(`experience/award-3.webp`),alt:`三等奖获奖证书`}]},{period:`高中阶段`,org:`多校联办青年商赛`,role:`组长`,desc:`参与多校联办的青年商赛并担任组长，带领队伍获得比赛二等奖（图6）。`,images:[{src:Z(`experience/business.webp`),alt:`青年商赛现场`}]},{period:`高中阶段`,org:`第六届星云模拟联合国大会`,role:`德意志联邦共和国代表`,desc:`参加第六届星云模拟联合国大会—2015 叙利亚局势会议，担任德意志联邦共和国代表（图7）；签署多份对德贸易合作，带领欧盟建立难民工厂项目，妥善安置叙利亚难民。`,images:[{src:Z(`experience/mun.webp`),alt:`模拟联合国代表胸牌`}]}],yd=[{school:`天津大学深圳学院`,major:`计算机科学与技术`,period:`2026.09 - 至今`,desc:`本科在读，计算机科学与技术专业。`},{school:`中山市中山纪念中学`,major:`初中 / 高中`,period:`2020.09 - 2026.06`,desc:`初中、高中就读；期间任校管乐团与弦乐团鼓手。`}],bd=[{icon:`📧`,label:`carrotsoup@qq.com`,href:`mailto:carrotsoup@qq.com`},{icon:`📞`,label:`电话 / 微信 / QQ：13420089540`,href:`tel:13420089540`}],xd={"art/hero-forest.webp":{w:1326,h:944},"art/moss-macro.webp":{w:824,h:944},"avatar.webp":{w:828,h:1242},"card.webp":{w:1200,h:630},"experience/award-2.webp":{w:480,h:640},"experience/award-3.webp":{w:480,h:640},"experience/band-1.webp":{w:480,h:320},"experience/band-2.webp":{w:480,h:319},"experience/band-3.webp":{w:480,h:640},"experience/business.webp":{w:480,h:319},"experience/mun.webp":{w:480,h:640},"favicon.svg":{w:48,h:46},"icons.svg":{w:16,h:17},"music/covers/diqiu.webp":{w:640,h:640},"music/covers/drum.webp":{w:720,h:406},"music/covers/gulou.webp":{w:640,h:640},"music/covers/jiu.webp":{w:640,h:640},"music/covers/kezhan.webp":{w:640,h:640},"music/covers/libai.webp":{w:640,h:640},"music/covers/pipa.webp":{w:640,h:640},"music/covers/qingchun.webp":{w:640,h:640},"music/covers/rainforest.webp":{w:640,h:640},"music/covers/sunyou.webp":{w:640,h:640},"music/covers/wangfei.webp":{w:640,h:640},"play/assets-g/img-03b9d15827d6.webp":{w:828,h:552},"play/assets-g/img-1185d5ac9e82.webp":{w:828,h:552},"play/assets-g/img-1259c20d896b.webp":{w:828,h:552},"play/assets-g/img-17c7f13154c6.webp":{w:828,h:552},"play/assets-g/img-1d4f118bac4a.webp":{w:828,h:552},"play/assets-g/img-1e6d70fa1206.webp":{w:828,h:552},"play/assets-g/img-2929b6c3ecab.webp":{w:828,h:552},"play/assets-g/img-29d47572fdb3.webp":{w:828,h:552},"play/assets-g/img-2ff59831412f.webp":{w:828,h:552},"play/assets-g/img-37a37f0d34d1.webp":{w:828,h:552},"play/assets-g/img-3811a28fee8c.webp":{w:828,h:552},"play/assets-g/img-413002bef48b.webp":{w:828,h:552},"play/assets-g/img-41e04cfc7a5d.webp":{w:828,h:552},"play/assets-g/img-4893ed1b6b76.webp":{w:828,h:552},"play/assets-g/img-4b41d694a087.webp":{w:828,h:552},"play/assets-g/img-4ca9f3cad4bb.webp":{w:828,h:552},"play/assets-g/img-5312724a8cd9.webp":{w:828,h:552},"play/assets-g/img-54f34b0a37bf.webp":{w:828,h:552},"play/assets-g/img-598f0008af36.webp":{w:828,h:552},"play/assets-g/img-59eede0b9800.webp":{w:828,h:552},"play/assets-g/img-620beb600aa6.webp":{w:828,h:552},"play/assets-g/img-690f9a8450a7.webp":{w:828,h:552},"play/assets-g/img-6aaa2769448d.webp":{w:828,h:552},"play/assets-g/img-72c14820c72a.webp":{w:828,h:552},"play/assets-g/img-756ed932280a.webp":{w:828,h:552},"play/assets-g/img-7586eda3aff5.webp":{w:828,h:552},"play/assets-g/img-76b084524ceb.webp":{w:828,h:552},"play/assets-g/img-77fd24c54776.webp":{w:828,h:552},"play/assets-g/img-7921335e9a2e.webp":{w:828,h:552},"play/assets-g/img-7999b73f0773.webp":{w:828,h:552},"play/assets-g/img-7bad9aaea8f6.webp":{w:828,h:552},"play/assets-g/img-7fd714255c2b.webp":{w:828,h:552},"play/assets-g/img-9a947a7f0ae8.webp":{w:828,h:552},"play/assets-g/img-9b57a7e1d9de.webp":{w:720,h:1280},"play/assets-g/img-a006d2456cf9.webp":{w:828,h:552},"play/assets-g/img-a53365a1ad5d.webp":{w:828,h:552},"play/assets-g/img-a8b36244cb90.webp":{w:828,h:552},"play/assets-g/img-a8cd73d0586a.webp":{w:828,h:552},"play/assets-g/img-abbd1b410df8.webp":{w:828,h:552},"play/assets-g/img-acaaad293e43.webp":{w:828,h:552},"play/assets-g/img-b0eae8f38850.webp":{w:828,h:552},"play/assets-g/img-b4f24864b22a.webp":{w:828,h:552},"play/assets-g/img-b5d0ec52d770.webp":{w:828,h:552},"play/assets-g/img-b71ee2d23d1b.webp":{w:828,h:552},"play/assets-g/img-b792d24a6110.webp":{w:828,h:552},"play/assets-g/img-c4ce0e782acb.webp":{w:828,h:552},"play/assets-g/img-c8ffe9c30f58.webp":{w:828,h:552},"play/assets-g/img-d9f11b3b5a98.webp":{w:828,h:552},"play/assets-g/img-da1e604f0d95.webp":{w:828,h:552},"play/assets-g/img-da718b38b327.webp":{w:828,h:552},"play/assets-g/img-db3550005b5c.webp":{w:828,h:552},"play/assets-g/img-e40c5f6029c5.webp":{w:828,h:552},"play/assets-g/img-e7f50eeb280f.webp":{w:828,h:552},"play/assets-g/img-eaa2858196b3.webp":{w:828,h:552},"play/assets-g/img-eeeef78a5753.webp":{w:828,h:552},"play/assets-g/img-f44a0f08d734.webp":{w:828,h:552},"play/assets-g/img-f860a44e9647.webp":{w:828,h:552},"play/assets-g/img-f9cd14eb0d52.webp":{w:828,h:552},"play/assets-g/img-fef0ffcfc110.webp":{w:828,h:552},"projects/carbon-brain/card.webp":{w:1100,h:687},"projects/carrot/context.webp":{w:1280,h:720},"projects/carrot/drift.webp":{w:1280,h:720},"projects/carrot/goals.webp":{w:1280,h:720},"projects/carrot/toolbox.webp":{w:1280,h:720},"projects/carrot/phone.webp":{w:1440,h:1920},"projects/carrot/ui.webp":{w:1280,h:720},"projects/claude-code/card.webp":{w:1100,h:687},"projects/claude-code/tools.webp":{w:1200,h:749},"projects/claude-code/workspace.webp":{w:1200,h:1022},"projects/stock/backtest.webp":{w:1200,h:2062},"projects/stock/card.webp":{w:1100,h:687},"projects/stock/paper.webp":{w:1200,h:1171},"projects/todo-panel/calendar.webp":{w:1200,h:596},"projects/todo-panel/card.webp":{w:1100,h:687},"projects/todo-panel/home.webp":{w:1200,h:596},"projects/todo-panel/todo.webp":{w:1200,h:596},"projects/weiguan-yifang/bg.webp":{w:1200,h:1800},"projects/weiguan-yifang/card.webp":{w:1100,h:687},"projects/weiguan-yifang/cover.webp":{w:1200,h:2508},"projects/weiguan-yifang/event.webp":{w:1200,h:2508}};function Sd(e){if(!e)return{};let t=String(e).replace(/^https?:\/\/[^/]+/,``).split(`?`)[0].replace(/^\//,``),n=xd[t]||xd[t.replace(/^[^/]+\//,``)];return n?{width:n.w,height:n.h}:{}}var Cd=`https://formsubmit.co/ajax/carrotsoup@qq.com`;async function wd(e){let t=await fetch(Cd,{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({_subject:`来自个人主页的留言`,_captcha:`false`,_template:`table`,...e})}),n=await t.json().catch(()=>({}));return{ok:t.ok&&(n.success===!0||n.success===`true`),message:n?.message}}var Td={class:`fb`,"aria-live":`polite`},Ed={class:`fb-thanks`},Dd={class:`fb-actions`},Od={class:`fb-q`},kd={class:`fb-actions`},Ad=[`disabled`],jd=[`disabled`],Md={key:0,class:`fb-error`},Nd=Al({__name:`FeedbackWidget`,props:{page:{type:String,default:`站点`},item:{type:String,default:``}},setup(e){let t=e,n=q(()=>`homepage-feedback:${t.page}:${t.item}`),r=F(localStorage.getItem(n.value)||``),i=F(r.value?`done`:`ask`),a=F(r.value||``),o=F(``),s=F(`idle`),c=F(``);function l(e){a.value=e,i.value=`comment`}async function u(){s.value=`sending`,c.value=``;try{let{ok:e,message:r}=await wd({_subject:`个人主页 · 内容反馈`,page:t.page,item:t.item||`（整页）`,rating:a.value,comment:o.value.trim()||`（未填写）`,url:window.location.href});e?(localStorage.setItem(n.value,a.value),i.value=`done`,s.value=`idle`):(s.value=`error`,c.value=r||`提交失败，请稍后再试。`)}catch{s.value=`error`,c.value=`网络异常，请稍后再试。`}}return(e,t)=>(V(),H(`aside`,Td,[i.value===`done`?(V(),H(B,{key:0},[U(`p`,Ed,[t[3]||=U(`span`,{"aria-hidden":`true`},`✅`,-1),G(` 谢谢！你的反馈已收到（`+j(r.value||a.value)+`）。 `,1)]),t[4]||=U(`p`,{class:`fb-thanks-sub`},`我会把它记录进《用户反馈与改进记录》，并据此改进内容。`,-1)],64)):i.value===`ask`?(V(),H(B,{key:1},[t[7]||=U(`p`,{class:`fb-q`},`这部分内容对你有用吗？`,-1),U(`div`,Dd,[U(`button`,{class:`fb-btn`,onClick:t[0]||=e=>l(`有用`)},[...t[5]||=[U(`span`,{"aria-hidden":`true`},`👍`,-1),G(` 有用 `,-1)]]),U(`button`,{class:`fb-btn`,onClick:t[1]||=e=>l(`还需改进`)},[...t[6]||=[U(`span`,{"aria-hidden":`true`},`🤔`,-1),G(` 还需改进 `,-1)]])])],64)):(V(),H(B,{key:2},[U(`p`,Od,[G(` 你觉得「`+j(a.value)+`」——能再说一句为什么吗？`,1),t[8]||=U(`span`,{class:`fb-optional`},`（选填）`,-1)]),t[9]||=U(`label`,{class:`sr-only`,for:`fb-comment`},`补充说明`,-1),R(U(`textarea`,{id:`fb-comment`,"onUpdate:modelValue":t[2]||=e=>o.value=e,class:`fb-textarea`,rows:`3`,placeholder:`例如：例子太少 / 讲得很清楚 / 希望加图示…`},null,512),[[Xo,o.value]]),U(`div`,kd,[U(`button`,{class:`fb-btn primary`,disabled:s.value===`sending`,onClick:u},j(s.value===`sending`?`提交中…`:`提交反馈`),9,Ad),U(`button`,{class:`fb-btn ghost`,disabled:s.value===`sending`,onClick:u},` 跳过 `,8,jd)]),s.value===`error`?(V(),H(`p`,Md,j(c.value),1)):K(``,!0)],64))]))}},[[`__scopeId`,`data-v-d3202e95`]]),Pd={class:`hill-band`},Fd=[`aria-label`],Id={class:`seed-hint`,"aria-hidden":`true`},Ld={class:`seed-seed`,viewBox:`0 0 12 16`,"aria-hidden":`true`},Rd={class:`seed-sprout`,viewBox:`0 0 40 52`,"aria-hidden":`true`},zd={__name:`SectionBand`,props:{seed:Boolean},setup(e){let t=F(!1),n=F(!1),r=F(null),i=null,a=null;gr(()=>{!r.value||typeof IntersectionObserver>`u`||(a=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&!t.value&&(n.value=!0,a.disconnect(),i=setTimeout(()=>{t.value||(n.value=!1)},5e3))})},{threshold:.9}),a.observe(r.value))}),br(()=>{clearTimeout(i),a&&a.disconnect()});function o(){t.value=!t.value,t.value&&(clearTimeout(i),n.value=!1)}function s(){t.value||(n.value=!0)}function c(){!t.value&&i===null&&(n.value=!1)}return(i,a)=>(V(),H(`div`,Pd,[a[2]||=la(`<svg class="hill hill-back" viewBox="0 0 1200 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0,95 C180,55 360,110 600,80 C840,50 1020,105 1200,70 L1200,150 L0,150 Z"></path></svg><div class="hill-front-wrap"><svg class="hill hill-front" viewBox="0 0 1200 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0,120 C220,80 420,135 680,105 C900,80 1060,130 1200,100 L1200,150 L0,150 Z"></path></svg><svg class="hill-plants" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true"><path d="M6.0,60 C5.9,50.2 8.7,39.2 9.9,35.5 C11.8,45.3 12.2,52.6 12.8,60 Z"></path><path d="M22.8,60 C22.5,51.4 27.0,41.8 28.8,38.6 C30.4,47.1 29.6,53.6 30.3,60 Z"></path><path d="M43.4,60 C42.9,54.4 49.0,48.1 51.4,45.9 C52.9,51.6 51.2,55.8 52.1,60 Z"></path><path d="M67.2,60 C67.4,56.0 69.4,51.5 70.3,50.0 C72.8,54.0 74.0,57.0 74.8,60 Z"></path><path d="M88.2,60 C87.9,53.8 92.3,46.9 94.0,44.6 C95.6,50.8 95.0,55.4 95.7,60 Z"></path><path d="M113.9,60 C113.8,50.7 115.6,40.2 116.4,36.7 C117.7,46.0 118.0,53.0 118.4,60 Z"></path><path d="M136.8,60 C137.2,56.2 136.9,52.0 136.9,50.6 C139.0,54.4 141.1,57.2 141.5,60 Z"></path><path d="M155.0,60 C154.8,52.8 159.1,44.8 160.9,42.1 C162.8,49.3 162.4,54.6 163.3,60 Z"></path><path d="M170.7,60 C170.6,55.4 173.7,50.3 175.0,48.6 C177.2,53.2 177.6,56.6 178.3,60 Z"></path><path d="M193.5,60 C194.3,50.3 192.5,39.3 192.1,35.7 C196.0,45.4 200.4,52.7 201.2,60 Z"></path><path d="M210.6,60 C210.0,52.7 215.3,44.5 217.4,41.7 C218.4,49.0 216.7,54.5 217.4,60 Z"></path><path d="M235.4,60 C235.0,52.6 239.2,44.2 240.8,41.4 C241.5,48.9 240.1,54.4 240.6,60 Z"></path><path d="M252.1,60 C252.9,50.0 250.7,38.8 250.2,35.1 C253.8,45.0 258.1,52.5 258.8,60 Z"></path><path d="M277.1,60 C277.0,55.0 279.3,49.4 280.3,47.5 C281.5,52.5 281.4,56.3 281.9,60 Z"></path><path d="M300.6,60 C300.3,55.5 304.9,50.4 306.7,48.7 C308.1,53.2 307.1,56.6 307.8,60 Z"></path><path d="M322.4,60 C322.8,56.4 323.8,52.4 324.4,51.0 C327.8,54.6 330.4,57.3 331.3,60 Z"></path><path d="M337.6,60 C338.1,56.5 337.8,52.6 337.9,51.4 C341.4,54.8 344.6,57.4 345.4,60 Z"></path><path d="M362.4,60 C362.5,50.7 363.5,40.2 363.9,36.7 C365.6,46.0 366.6,53.0 367.0,60 Z"></path><path d="M378.6,60 C377.8,55.2 385.5,49.8 388.4,48.0 C389.5,52.8 386.6,56.4 387.4,60 Z"></path><path d="M397.2,60 C397.9,56.2 396.7,51.9 396.5,50.4 C400.7,54.2 405.2,57.1 406.0,60 Z"></path><path d="M416.5,60 C416.6,56.1 417.7,51.7 418.2,50.2 C420.3,54.1 421.7,57.1 422.3,60 Z"></path><path d="M439.1,60 C439.3,55.9 440.1,51.3 440.5,49.8 C442.7,53.9 444.3,56.9 444.9,60 Z"></path><path d="M462.5,60 C463.0,53.8 462.0,46.8 461.7,44.4 C464.0,50.7 466.7,55.3 467.1,60 Z"></path><path d="M478.8,60 C478.2,52.8 483.8,44.8 485.9,42.1 C486.4,49.2 484.1,54.6 484.6,60 Z"></path><path d="M495.0,60 C495.2,55.6 496.7,50.7 497.4,49.1 C500.0,53.5 501.5,56.7 502.3,60 Z"></path><path d="M512.0,60 C511.7,56.4 515.4,52.5 516.8,51.1 C517.7,54.7 516.7,57.3 517.2,60 Z"></path><path d="M527.6,60 C528.1,56.0 528.2,51.6 528.4,50.1 C531.5,54.0 534.4,57.0 535.1,60 Z"></path><path d="M552.1,60 C552.1,51.1 554.7,41.0 555.9,37.6 C558.4,46.6 559.4,53.3 560.2,60 Z"></path><path d="M566.3,60 C565.9,51.3 570.7,41.6 572.5,38.4 C573.6,47.0 572.3,53.5 573.0,60 Z"></path><path d="M588.7,60 C588.5,52.8 592.2,44.8 593.7,42.1 C595.3,49.3 595.0,54.6 595.7,60 Z"></path><path d="M610.8,60 C610.4,55.1 615.7,49.5 617.8,47.7 C619.4,52.6 618.2,56.3 619.0,60 Z"></path><path d="M635.3,60 C635.3,56.2 638.1,51.9 639.3,50.5 C641.4,54.3 641.8,57.1 642.6,60 Z"></path><path d="M649.6,60 C649.3,54.5 653.1,48.3 654.6,46.2 C655.7,51.7 654.8,55.9 655.3,60 Z"></path><path d="M668.7,60 C668.5,50.0 671.4,38.8 672.6,35.0 C673.5,45.0 672.8,52.5 673.3,60 Z"></path><path d="M694.6,60 C695.1,50.7 693.9,40.2 693.6,36.7 C695.9,46.0 698.6,53.0 699.0,60 Z"></path><path d="M711.8,60 C711.2,54.3 716.6,47.8 718.7,45.6 C719.0,51.4 716.5,55.7 717.0,60 Z"></path><path d="M731.4,60 C731.5,54.2 733.7,47.6 734.8,45.4 C737.2,51.2 738.3,55.6 739.1,60 Z"></path><path d="M753.5,60 C754.3,56.2 752.4,51.9 752.0,50.4 C755.3,54.3 759.3,57.1 759.9,60 Z"></path><path d="M772.4,60 C772.7,52.2 773.0,43.5 773.2,40.6 C775.5,48.4 777.5,54.2 778.1,60 Z"></path><path d="M790.6,60 C790.7,53.4 792.3,46.0 793.0,43.5 C794.5,50.1 795.1,55.1 795.5,60 Z"></path><path d="M814.5,60 C815.1,53.8 813.9,46.9 813.7,44.6 C816.9,50.8 820.4,55.4 821.0,60 Z"></path><path d="M838.9,60 C839.4,52.2 839.1,43.3 839.2,40.4 C842.2,48.2 845.0,54.1 845.7,60 Z"></path><path d="M855.4,60 C855.2,51.8 858.4,42.6 859.7,39.6 C860.9,47.7 860.4,53.9 861.0,60 Z"></path><path d="M877.8,60 C877.2,53.1 883.2,45.4 885.5,42.9 C886.1,49.7 883.5,54.9 884.2,60 Z"></path><path d="M898.2,60 C898.2,53.5 900.8,46.3 901.9,43.8 C903.8,50.3 904.2,55.2 904.9,60 Z"></path><path d="M912.4,60 C912.2,56.3 915.1,52.2 916.3,50.8 C917.4,54.5 917.0,57.2 917.5,60 Z"></path><path d="M936.9,60 C937.0,53.6 937.8,46.4 938.3,44.0 C939.9,50.4 940.9,55.2 941.4,60 Z"></path><path d="M959.9,60 C960.4,50.5 959.0,39.8 958.6,36.2 C961.1,45.7 964.2,52.9 964.6,60 Z"></path><path d="M981.3,60 C980.6,49.8 986.6,38.3 988.9,34.4 C989.6,44.7 987.2,52.3 987.8,60 Z"></path><path d="M997.5,60 C996.9,53.1 1001.9,45.4 1003.8,42.9 C1004.4,49.7 1002.5,54.9 1003.1,60 Z"></path><path d="M1011.8,60 C1011.4,51.4 1015.2,41.6 1016.6,38.4 C1017.1,47.0 1015.6,53.5 1016.1,60 Z"></path><path d="M1032.8,60 C1033.0,54.4 1033.4,48.0 1033.7,45.9 C1035.6,51.5 1037.1,55.8 1037.6,60 Z"></path><path d="M1056.6,60 C1056.7,56.0 1058.8,51.4 1059.7,49.9 C1061.9,54.0 1062.8,57.0 1063.5,60 Z"></path><path d="M1079.4,60 C1079.0,52.0 1083.5,43.0 1085.2,40.0 C1086.3,48.0 1085.1,54.0 1085.8,60 Z"></path><path d="M1096.6,60 C1096.0,51.1 1101.8,41.2 1104.1,37.8 C1104.8,46.7 1102.5,53.4 1103.1,60 Z"></path><path d="M1121.8,60 C1121.8,56.3 1123.8,52.1 1124.7,50.7 C1126.6,54.4 1127.4,57.2 1128.0,60 Z"></path><path d="M1142.2,60 C1141.6,55.9 1147.5,51.3 1149.8,49.7 C1150.9,53.8 1149.0,56.9 1149.7,60 Z"></path><path d="M1162.3,60 C1163.0,55.4 1161.8,50.2 1161.5,48.5 C1165.3,53.1 1169.4,56.6 1170.2,60 Z"></path><path d="M1178.5,60 C1177.8,55.9 1184.0,51.2 1186.4,49.7 C1187.1,53.8 1184.7,56.9 1185.4,60 Z"></path></svg></div><span class="float-leaf fl-1"></span><span class="float-leaf fl-2"></span><span class="float-leaf fl-3"></span><div class="section-divider"><span class="sd-line sd-line-l"></span><span class="sd-leaf sd-leaf-l"></span><span class="sd-gem"></span><span class="sd-leaf sd-leaf-r"></span><span class="sd-line sd-line-r"></span></div>`,6),e.seed?(V(),H(`button`,{key:0,ref_key:`seedBtnEl`,ref:r,class:A([`seed-btn`,{grown:t.value}]),type:`button`,"aria-label":t.value?`把胡萝卜苗收回土里`:`种下一颗种子，看看会长出什么`,onClick:o,onMouseenter:s,onFocus:s,onMouseleave:c,onBlur:c},[W(Xa,{name:`seed-hint`},{default:L(()=>[R(U(`span`,Id,`种点什么？`,512),[[ho,n.value]])]),_:1}),R((V(),H(`svg`,Ld,[...a[0]||=[U(`ellipse`,{cx:`6`,cy:`8`,rx:`4.6`,ry:`7`,fill:`#8a5a2b`},null,-1),U(`path`,{d:`M4 4.5 C4.5 3 6 2.2 7.5 2.8 C6.8 3.4 5.2 3.6 4 4.5 Z`,fill:`#a9743c`},null,-1)]],512)),[[ho,!t.value]]),R((V(),H(`svg`,Rd,[...a[1]||=[la(`<path d="M19.4 50 C19 40 19.2 30 19.8 22 L21.2 22 C21.6 30 21.8 40 21.4 50 Z" fill="#6da55e"></path><path d="M20 26 C16 22 12 20.5 7.5 21 C11 23 15.5 25.5 19 28.5 Z" fill="#8fbf74"></path><path d="M20.5 24 C23 19 27 16.5 32 16.5 C28.5 19.5 24.5 23 21.3 26.5 Z" fill="#a4cf8a"></path><path d="M20.5 22.5 C21.5 18 24 15 28 13.5 C25.5 17 23 20.5 21.5 23.5 Z" fill="#8fbf74"></path><ellipse cx="20.4" cy="49" rx="5" ry="3" fill="#4a3b26"></ellipse><path d="M17.5 49 C17.5 45.5 18.8 43.5 20.4 43.5 C22 43.5 23.3 45.5 23.3 49 Z" fill="#e07a2e"></path>`,6)]],512)),[[ho,t.value]])],42,Fd)):K(``,!0)]))}},Bd={class:`fireflies`,"aria-hidden":`true`},Vd={class:`container hero-inner`},Hd={class:`hero-copy`},Ud={class:`hero-title`},Wd={class:`hero-tagline-v3`},Gd={class:`hero-actions-v3`},Kd={class:`hero-portrait-wrap`},qd={class:`hero-frame`},Jd=[`src`],Yd={class:`marquee`,"aria-hidden":`true`},Xd={class:`marquee-track`},Zd={class:`section`},Qd={class:`container manifesto-inner`},$d={class:`manifesto-media`},ef={class:`frame-card`},tf={class:`manifesto-copy`},nf={class:`stat-num`},rf={class:`stat-label`},af={class:`section reading-block`},of={class:`container reading-block-inner`},sf={class:`reading-block-text`},cf={id:`projects`,class:`section section-alt`},lf={class:`container`},uf={class:`feature-body`},df={class:`feature-index`},ff={class:`feature-title`},pf=[`innerHTML`],mf={class:`feature-list`},hf={class:`frame-card`},gf=[`src`,`alt`],_f={class:`media-badge`},vf={id:`experience`,class:`section`},yf={class:`container`},bf={class:`timeline`},xf={class:`timeline-period`},Sf={class:`timeline-org`},Cf={class:`timeline-role`},wf={style:{color:`var(--color-text-muted)`}},Tf={key:0,class:`exp-gallery`},Ef=[`src`,`alt`],Df={id:`education`,class:`section section-alt`},Of={class:`container`},kf={class:`timeline`},Af={class:`timeline-period`},jf={class:`timeline-org`},Mf={class:`timeline-role`},Nf={style:{color:`var(--color-text-muted)`}},Pf={class:`section cta`},Ff={class:`container`},If={class:`hero-actions-v3`,style:{"justify-content":`center`}},Lf=[`href`],Rf=Al({__name:`HomeView`,setup(e){let t=`/homepage/`,n=`${t}art/hero-forest.webp`,r=`${t}art/moss-macro.webp`,i=[`Python`,`AI 工具应用`,`架子鼓 10 级`],a=[{num:5,label:`项目实践`},{num:10,label:`架子鼓等级`},{num:3,label:`实践经历`},{num:2026,label:`入学天大`}],o=typeof window<`u`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,s=!o&&typeof window<`u`&&window.matchMedia(`(hover: none)`).matches===!1;function c(e){if(!s)return;let t=e.currentTarget,n=t.getBoundingClientRect(),r=(e.clientX-n.left)/n.width,i=(e.clientY-n.top)/n.height;t.style.setProperty(`--rx`,`${((.5-i)*6).toFixed(2)}deg`),t.style.setProperty(`--ry`,`${((r-.5)*8).toFixed(2)}deg`)}function l(e){let t=e.currentTarget;t.style.setProperty(`--rx`,`0deg`),t.style.setProperty(`--ry`,`0deg`)}let u=F(o?a.map(e=>e.num):a.map(()=>0)),d=F(null),f=null;function p(){if(o)return;let e=a.map(e=>e.num),t=performance.now(),n=r=>{let i=Math.min((r-t)/1500,1),a=1-(1-i)**3;u.value=e.map(e=>Math.round(e*a)),i<1&&requestAnimationFrame(n)};requestAnimationFrame(n)}let m=Array.from({length:22},(e,t)=>{let n=+(4+Math.random()*5).toFixed(2);return{id:t,style:{left:`${(Math.random()*100).toFixed(2)}%`,top:`${(Math.random()*100).toFixed(2)}%`,width:`${n}px`,height:`${n}px`,"--dur":`${(7+Math.random()*8).toFixed(2)}s`,"--delay":`${(Math.random()*6).toFixed(2)}s`,"--dx":`${((Math.random()-.5)*70).toFixed(1)}px`,"--dy":`${(-(24+Math.random()*70)).toFixed(1)}px`,"--peak":`${(.7+Math.random()*.3).toFixed(2)}`}}}),h=F(null),g=!1,_=null,v=null;function y(){let e=h.value;if(e){let t=window.scrollY,n=e.offsetHeight||1,r=Math.min(t,n);e.style.setProperty(`--parallax`,`${r*.22}px`),e.style.setProperty(`--portrait-parallax`,`${r*-.07}px`)}x(),w(),g=!1}let b=[];function x(){if(o||b.length===0)return;let e=window.innerHeight/2;for(let{el:t,base:n,h:r}of b){let i=n-window.scrollY+r/2;i<-200||i>window.innerHeight+200||(t.style.transform=`translateY(${((i-e)*-.06).toFixed(1)}px)`)}}let S=[];function C(){S.length=0,document.querySelectorAll(`.timeline`).forEach(e=>{let t=e.getBoundingClientRect();t.height!==0&&S.push({el:e,top:t.top+window.scrollY,height:t.height})})}function w(){if(typeof document>`u`||S.length===0)return;let e=window.innerHeight*.72;for(let{el:t,top:n,height:r}of S){let i=(e-(n-window.scrollY))/r;t.style.setProperty(`--line-progress`,Math.min(1,Math.max(0,i)).toFixed(3))}}function ee(){g||(g=!0,requestAnimationFrame(y))}let T=null,te=!1;function E(e){T=e,te||(te=!0,requestAnimationFrame(ne))}function ne(){let e=h.value;if(e&&T){let t=e.getBoundingClientRect();e.style.setProperty(`--mx`,`${(T.clientX-t.left)/t.width*100}%`),e.style.setProperty(`--my`,`${(T.clientY-t.top)/t.height*100}%`)}te=!1}return gr(()=>{window.addEventListener(`scroll`,ee,{passive:!0}),y(),document.querySelectorAll(`.hill-front-wrap`).forEach(e=>{b.push({el:e,base:e.getBoundingClientRect().top+window.scrollY,h:e.offsetHeight})}),C(),w(),window.addEventListener(`resize`,C),typeof IntersectionObserver<`u`&&!o?(_=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`reached`),_.unobserve(e.target))})},{threshold:.6}),document.querySelectorAll(`.timeline-item`).forEach(e=>_.observe(e))):document.querySelectorAll(`.timeline-item`).forEach(e=>e.classList.add(`reached`));let e=document.querySelectorAll(`.section-divider`);typeof IntersectionObserver<`u`&&!o?(v=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`in`),v.unobserve(e.target))})},{threshold:.6}),e.forEach(e=>v.observe(e))):e.forEach(e=>e.classList.add(`in`)),d.value&&typeof IntersectionObserver<`u`?(f=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(p(),f.disconnect())})},{threshold:.4}),f.observe(d.value)):p()}),br(()=>{window.removeEventListener(`resize`,C),window.removeEventListener(`scroll`,ee),f&&f.disconnect(),_&&_.disconnect(),v&&v.disconnect()}),(e,t)=>{let o=Ar(`reveal-stagger`),s=Ar(`reveal`);return V(),H(`div`,null,[U(`section`,{id:`hero`,ref_key:`heroEl`,ref:h,class:`hero-v3`,onMousemove:E,style:k({"--hero-img":`url(${n})`})},[t[6]||=U(`div`,{class:`hero-bg`,"aria-hidden":`true`},null,-1),U(`div`,Bd,[(V(!0),H(B,null,z(I(m),e=>(V(),H(`span`,{key:e.id,style:k(e.style)},null,4))),128))]),t[7]||=U(`div`,{class:`hero-glow`,"aria-hidden":`true`},null,-1),U(`div`,Vd,[U(`div`,Hd,[t[5]||=U(`p`,{class:`hero-kicker`},`天津大学深圳学院 · 计算机科学与技术`,-1),U(`h1`,Ud,[G(j(I(md).name),1),t[0]||=U(`br`,null,null,-1),t[1]||=U(`span`,{class:`accent`},`Curious`,-1),t[2]||=G(` Builder `,-1)]),U(`p`,Wd,j(I(md).bio),1),U(`div`,Gd,[W(I(tl),{class:`btn btn-light`,to:`/about`},{default:L(()=>[...t[3]||=[G(`了解我`,-1)]]),_:1}),W(I(tl),{class:`btn btn-ghost`,to:`/contact`},{default:L(()=>[...t[4]||=[G(`联系我`,-1)]]),_:1})])]),U(`div`,Kd,[U(`div`,qd,[I(md).avatar?(V(),H(`img`,pa({key:0,src:I(md).avatar,alt:`刘博康`,fetchpriority:`high`},I(Sd)(I(md).avatar)),null,16,Jd)):K(``,!0)]),(V(),H(B,null,z(i,(e,t)=>U(`span`,{key:e,class:A([`float-tag`,`t${t+1}`])},j(e),3)),64))])]),t[8]||=U(`div`,{class:`scroll-cue`,"aria-hidden":`true`},[G(` Scroll `),U(`span`)],-1)],36),U(`div`,Yd,[U(`div`,Xd,[(V(),H(B,null,z(2,e=>(V(),H(B,{key:e},[(V(!0),H(B,null,z(I(hd),t=>(V(),H(`span`,{key:`${e}-${t}`,class:`marquee-item`},j(t),1))),128))],64))),64))])]),W(zd),R((V(),H(`section`,Zd,[U(`div`,Qd,[U(`div`,$d,[U(`div`,ef,[U(`img`,pa({src:r,alt:`苔藓与新芽的微距特写`,loading:`lazy`},I(Sd)(r)),null,16)])]),U(`div`,tf,[t[9]||=U(`p`,{class:`eyebrow`},`My Approach`,-1),t[10]||=U(`p`,{class:`manifesto-quote`},[G(` 以 `),U(`em`,null,`好奇心`),G(` 为起点，`),U(`br`),G(` 把想法一路做到「可以运行」的现实。 `)],-1),t[11]||=U(`p`,{class:`manifesto-body`},` 我相信最好的学习方式是动手：先跑起来，再打磨。从材料预测到股票量化， 我把课堂上的概念变成一个个能被点击、被验证的原型。 `,-1),R((V(),H(`div`,{class:`stat-grid`,ref_key:`statGrid`,ref:d,style:{"margin-top":`36px`}},[(V(),H(B,null,z(a,(e,t)=>U(`div`,{key:e.label,class:`stat`},[U(`div`,nf,j(u.value[t]),1),U(`div`,rf,j(e.label),1)])),64))])),[[o]])])])])),[[s]]),W(zd),R((V(),H(`section`,af,[U(`div`,of,[t[15]||=U(`p`,{class:`eyebrow`},`Beyond Code`,-1),t[16]||=U(`h2`,{class:`section-title`},`代码之外，另一半时间在书里`,-1),U(`p`,sf,[t[13]||=G(` 斯多葛哲学、阿德勒心理学、《反脆弱》《穷查理宝典》《基因组》……读完不止摘抄， 还要变成自己的——手抄过 22 条误判心理学，把《纳瓦尔宝典》抄成习惯清单， 也给人生设计过一套「自身 1.0」系统。`,-1),W(I(tl),{to:`/knowledge`},{default:L(()=>[...t[12]||=[G(`读书笔记都在知识库`,-1)]]),_:1}),t[14]||=G(`。 `,-1)])])])),[[s]]),W(zd),U(`section`,cf,[U(`div`,lf,[R((V(),H(`div`,null,[...t[17]||=[U(`span`,{class:`sec-no`,"aria-hidden":`true`},`01`,-1),U(`p`,{class:`eyebrow`},`Selected Work`,-1),U(`h2`,{class:`section-title`},`项目展示`,-1),U(`p`,{class:`section-desc`},` 从想法到原型的 6 次完整实践，包含一款可双击运行的模拟游戏。点击标题可查看详情。 `,-1)]])),[[s]]),(V(!0),H(B,null,z(I(_d),(e,n)=>R((V(),H(`div`,{key:e.id,class:A([`feature-row`,{reverse:n%2==1}])},[U(`div`,uf,[U(`div`,df,`0`+j(n+1)+` — `+j(e.tech),1),U(`h3`,ff,[W(I(tl),{to:`/project/${e.id}`,style:{color:`inherit`}},{default:L(()=>[G(j(e.title),1)]),_:2},1032,[`to`])]),U(`p`,{class:`feature-text`,innerHTML:e.desc},null,8,pf),R((V(),H(`ul`,mf,[(V(!0),H(B,null,z(e.highlights,e=>(V(),H(`li`,{key:e},j(e),1))),128))])),[[o,{step:70}]]),W(I(tl),{class:`btn btn-outline`,to:`/project/${e.id}`},{default:L(()=>[...t[18]||=[G(`查看详情 →`,-1)]]),_:1},8,[`to`])]),U(`div`,{class:`feature-media`,onMousemove:c,onMouseleave:l},[U(`div`,hf,[e.images&&e.images.length?(V(),H(`img`,pa({key:0,src:e.images[0].src,alt:e.images[0].alt,loading:`lazy`},{ref_for:!0},I(Sd)(e.images[0].src)),null,16,gf)):K(``,!0)]),U(`span`,_f,j(e.role),1)],32)],2)),[[s]])),128))])]),W(zd),U(`section`,vf,[U(`div`,yf,[R((V(),H(`div`,null,[...t[19]||=[U(`p`,{class:`eyebrow`},`Beyond Code`,-1),U(`span`,{class:`sec-no`,"aria-hidden":`true`},`02`,-1),U(`h2`,{class:`section-title`},`经历`,-1),U(`p`,{class:`section-desc`},`舞台、商赛与模拟联合国——课堂之外的成长。`,-1)]])),[[s]]),R((V(),H(`ul`,bf,[(V(!0),H(B,null,z(I(vd),e=>(V(),H(`li`,{key:e.org+e.period,class:`timeline-item`},[U(`div`,xf,j(e.period),1),U(`div`,Sf,j(e.org),1),U(`div`,Cf,j(e.role),1),U(`p`,wf,j(e.desc),1),e.images&&e.images.length?(V(),H(`div`,Tf,[(V(!0),H(B,null,z(e.images,e=>(V(),H(`img`,pa({key:e.src,src:e.src,alt:e.alt,class:`exp-img`,loading:`lazy`},{ref_for:!0},I(Sd)(e.src)),null,16,Ef))),128))])):K(``,!0)]))),128))])),[[o]])])]),W(zd),U(`section`,Df,[U(`div`,Of,[R((V(),H(`div`,null,[...t[20]||=[U(`p`,{class:`eyebrow`},`Education`,-1),U(`span`,{class:`sec-no`,"aria-hidden":`true`},`03`,-1),U(`h2`,{class:`section-title`},`教育背景`,-1)]])),[[s]]),R((V(),H(`ul`,kf,[(V(!0),H(B,null,z(I(yd),e=>(V(),H(`li`,{key:e.school,class:`timeline-item`},[U(`div`,Af,j(e.period),1),U(`div`,jf,j(e.school),1),U(`div`,Mf,j(e.major),1),U(`p`,Nf,j(e.desc),1)]))),128))])),[[o]])])]),W(zd,{seed:``}),R((V(),H(`section`,Pf,[U(`div`,Ff,[t[22]||=U(`h2`,{class:`cta-title`},`想聊聊技术、项目或音乐？`,-1),t[23]||=U(`p`,{class:`cta-text`},` 欢迎交流合作，也欢迎给我反馈。留言会直接发送到我的邮箱。 `,-1),U(`div`,If,[W(I(tl),{class:`btn btn-primary`,to:`/contact`},{default:L(()=>[...t[21]||=[G(`给我留言`,-1)]]),_:1}),(V(!0),H(B,null,z(I(bd).slice(0,1),e=>(V(),H(`a`,{key:e.label,class:`btn btn-outline`,href:e.href},j(e.icon)+` `+j(e.label),9,Lf))),128))]),W(Nd,{page:`首页`})])])),[[s]])])}}},[[`__scopeId`,`data-v-5c0274b0`]]),zf={class:`play-page`},Bf={class:`play-head container`},Vf={class:`play-sub`},Hf=[`href`],Uf={class:`play-stage`},Wf={key:0,class:`play-loading`,"aria-live":`polite`},Gf=[`src`],Kf={class:`play-foot container`},qf=Al({__name:`PlayView`,setup(e){let t=q(()=>`/homepage/play/weiguan-yifang.min.html`),n=F(!0);function r(){n.value=!1}return gr(()=>{ad({title:`在线试玩`,desc:`《为官一方》古风县令治理模拟·站内网页试玩（草稿版，持续更新中），无需下载。`})}),(e,i)=>{let a=Dr(`RouterLink`);return V(),H(`div`,zf,[U(`header`,Bf,[U(`div`,null,[i[5]||=U(`h1`,{class:`play-title`},[G(` 🏯 《为官一方》· 在线试玩 `),U(`span`,{class:`draft-badge`,title:`游戏仍在开发迭代，内容与数值可能会调整`},` 草稿版 · 持续更新 `)],-1),U(`p`,Vf,[i[1]||=G(` 你是青阳县令：平衡银库、粮仓、民心、治安、官声、人口，治县三载，考课定前程。 无需下载、点开即玩（进度存在本机浏览器）。 `,-1),i[2]||=U(`strong`,null,`当前为草稿版本`,-1),i[3]||=G(`：玩法与数值仍在迭代，欢迎玩过之后 `,-1),W(a,{to:`/contact`},{default:L(()=>[...i[0]||=[G(`反馈感受`,-1)]]),_:1}),i[4]||=G(`，帮助它变得更好。 `,-1)])]),U(`a`,{class:`btn btn-outline play-open`,href:t.value,target:`_blank`,rel:`noopener`},` 新标签页全屏玩 ↗ `,8,Hf)]),U(`div`,Uf,[n.value?(V(),H(`div`,Wf,[...i[6]||=[U(`span`,{class:`play-spinner`,"aria-hidden":`true`},null,-1),G(` 游戏加载中… `,-1)]])):K(``,!0),U(`iframe`,{class:`play-frame`,src:t.value,title:`《为官一方》网页试玩版`,allow:`autoplay`,onLoad:r},null,40,Gf)]),U(`p`,Kf,[i[8]||=G(` 想深入了解这个项目（策划、架构、数值工具链）？ `,-1),W(a,{to:`/project/weiguan-yifang`},{default:L(()=>[...i[7]||=[G(`看项目详情 →`,-1)]]),_:1})])])}}},[[`__scopeId`,`data-v-5de384ca`]]),Jf={class:`container page`},Yf={class:`about-hero`},Xf=[`src`],Zf={class:`page-title`},Qf={class:`page-subtitle`},$f={class:`page-text`},ep={class:`about-block`},tp={class:`now-grid`},np={class:`now-icon`,"aria-hidden":`true`},rp={class:`now-title`},ip={class:`now-text`},ap={class:`about-block`},op={class:`about-reading`},sp={class:`about-block`},cp={class:`skill-tags`},lp=[`aria-expanded`,`onClick`],up={class:`skill-panel-head`},dp={class:`skill-panel-title`},fp={class:`skill-level`},pp={class:`skill-panel-summary`},mp={class:`skill-points`},hp={class:`skill-evidence`},gp={class:`about-block`},_p={class:`work-list`},vp={class:`work-icon`,"aria-hidden":`true`},yp={class:`work-body`},bp={class:`work-text`},xp={class:`work-role`},Sp={class:`about-block`},Cp={class:`principle-grid`},wp={class:`principle-index`},Tp={class:`principle-title`},Ep={class:`principle-text`},Dp={class:`about-block`},Op={class:`edu-list`},kp={class:`edu-year`},Ap={class:`edu-major`},jp={class:`about-block`},Mp={class:`contact-links`},Np=[`href`,`target`],Pp={"aria-hidden":`true`},Fp=Al({__name:`AboutView`,setup(e){let t=F(null);function n(e){t.value=t.value===e?null:e}let r=[{icon:`🏯`,title:`打磨一款模拟游戏`,text:`《为官一方》的立项文档与可玩原型都已完成，正在做数值平衡校准与美术替换。`},{icon:`🧪`,title:`把实验室的数据跑通`,text:`Carbon Brain 项目负责数据清洗与模型训练，目前跨日期泛化还是难题，正在补物理参数核对。`},{icon:`🛠️`,title:`把重复劳动变成流程`,text:`给日常用到的工具写技能与子 agent：改前先备份、改完必须验证，把踩过的坑固化成步骤。`}],i=[{title:`先跑起来，再打磨`,text:`不追求一次做到最好，先做出一个能运行的最小版本，再基于真实反馈迭代。`},{title:`数字要经得起追问`,text:`写进简历的每个数字都要能说出它在什么区间、什么口径下产生。做不到或做失败的，也照实写。`},{title:`改前先备份，改后要验证`,text:`动别人的代码前留好备份，改完必须用测试或实测数据证明真的对了，不靠感觉下结论。`},{title:`卡住了就换路`,text:`同一个办法试两遍还不行就换一条完全不同的路，而不是硬耗——这是给自己定的硬规矩。`}];return(e,a)=>{let o=Dr(`RouterLink`),s=Ar(`reveal`);return V(),H(`div`,Jf,[R((V(),H(`section`,Yf,[I(md).avatar?(V(),H(`img`,{key:0,src:I(md).avatar,class:`about-avatar`,alt:`刘博康的头像`,width:`120`,height:`120`},null,8,Xf)):K(``,!0),U(`div`,null,[U(`h1`,Zf,j(I(md).name),1),U(`p`,Qf,j(I(md).tagline),1),U(`p`,$f,j(I(md).bio),1),a[0]||=U(`p`,{class:`page-text`},[G(` 我最感兴趣的是`),U(`strong`,null,`把课堂上的概念变成能跑起来、能被验证的东西`),G(`——不管是实验室里的 材料数据，还是一台只在纸上见过的模拟游戏。 `)],-1)])])),[[s]]),R((V(),H(`section`,ep,[a[1]||=U(`p`,{class:`eyebrow`},`Right Now`,-1),a[2]||=U(`h2`,{class:`section-title`},`现在在做什么`,-1),U(`div`,tp,[(V(),H(B,null,z(r,e=>U(`div`,{key:e.title,class:`now-card`},[U(`div`,np,j(e.icon),1),U(`h3`,rp,j(e.title),1),U(`p`,ip,j(e.text),1)])),64))])])),[[s]]),R((V(),H(`section`,ap,[a[5]||=U(`p`,{class:`eyebrow`},`Reading`,-1),a[6]||=U(`h2`,{class:`section-title`},`我的书桌`,-1),U(`p`,op,[a[4]||=G(` 读书是我认识世界的主要方式。留下的 12 本笔记横跨几个互不相干的领域：塔勒布教我 「保留选择权、拥抱波动」，《穷查理宝典》的误判心理学 22 条我逐条手抄了一遍；《基因组》 让我看到进化没有目的、只有权衡；斯多葛哲学与阿德勒心理学则从相差两千年的两个方向， 回答了我同一个问题——怎么面对控制不了的事。读完从来不是终点：《价值心法》读完， 我给自己设计了「自身 1.0」（五大系统、七条指导思想）；《纳瓦尔宝典》的幸福章被直接抄成 每日习惯清单；《富爸爸穷爸爸》是第一本我敢直接写在书上的书——七处红笔批注从 p63 划到 p264；写《人文经典》那篇死亡笔记时，我头一次不摘抄、纯把自己的想法写满一页， 还和同学续了一轮讨论。`,-1),W(o,{to:`/knowledge`},{default:L(()=>[...a[3]||=[G(`全部笔记都在知识库，欢迎翻。`,-1)]]),_:1})])])),[[s]]),R((V(),H(`section`,sp,[a[9]||=U(`p`,{class:`eyebrow`},`Skills`,-1),a[10]||=U(`h2`,{class:`section-title`},`专业技能`,-1),a[11]||=U(`p`,{class:`block-hint`},`点击任意一项，展开我具体拿它做过什么。`,-1),U(`div`,cp,[(V(!0),H(B,null,z(I(gd),e=>(V(),H(`button`,{key:e.id,type:`button`,class:A([`skill-tag`,{active:t.value===e.id}]),"aria-expanded":t.value===e.id?`true`:`false`,onClick:t=>n(e.id)},[U(`span`,null,j(e.name),1),a[7]||=U(`span`,{class:`skill-caret`,"aria-hidden":`true`},`＋`,-1)],10,lp))),128))]),(V(!0),H(B,null,z(I(gd),e=>R((V(),H(`div`,{key:`panel-${e.id}`,class:`skill-panel`},[U(`div`,up,[U(`h3`,dp,j(e.name),1),U(`span`,fp,j(e.level),1)]),U(`p`,pp,j(e.summary),1),U(`ul`,mp,[(V(!0),H(B,null,z(e.points,e=>(V(),H(`li`,{key:e},j(e),1))),128))]),U(`p`,hp,[a[8]||=U(`span`,{class:`evidence-label`},`可以在这些项目里看到：`,-1),(V(!0),H(B,null,z(e.evidence,e=>(V(),H(`span`,{key:e,class:`evidence-chip`},j(e),1))),128))])])),[[ho,t.value===e.id]])),128))])),[[s]]),R((V(),H(`section`,gp,[a[12]||=U(`p`,{class:`eyebrow`},`Selected Work`,-1),a[13]||=U(`h2`,{class:`section-title`},`我做过的东西`,-1),U(`ul`,_p,[(V(!0),H(B,null,z(I(_d),e=>(V(),H(`li`,{key:e.id,class:`work-item`},[U(`span`,vp,j(e.icon),1),U(`div`,yp,[W(o,{class:`work-title`,to:`/project/${e.id}`},{default:L(()=>[G(j(e.title),1)]),_:2},1032,[`to`]),U(`p`,bp,j(e.short),1)]),U(`span`,xp,j(e.role),1)]))),128))]),a[14]||=U(`p`,{class:`work-note`},[G(` 其中 TO-DO Panel 与 Claude Code 桌面版属于`),U(`strong`,null,`对他人的开源 / 成品软件做本地二次开发`),G(`， 详情页里已注明上游来源，不主张原创。 `)],-1)])),[[s]]),R((V(),H(`section`,Sp,[a[15]||=U(`p`,{class:`eyebrow`},`How I Work`,-1),a[16]||=U(`h2`,{class:`section-title`},`我的工作方式`,-1),U(`div`,Cp,[(V(),H(B,null,z(i,(e,t)=>U(`div`,{key:e.title,class:`principle-card`},[U(`span`,wp,`0`+j(t+1),1),U(`h3`,Tp,j(e.title),1),U(`p`,Ep,j(e.text),1)])),64))])])),[[s]]),R((V(),H(`section`,Dp,[a[17]||=U(`p`,{class:`eyebrow`},`Education`,-1),a[18]||=U(`h2`,{class:`section-title`},`教育经历`,-1),U(`ul`,Op,[(V(!0),H(B,null,z(I(yd),e=>(V(),H(`li`,{key:e.school},[U(`span`,kp,j(e.period),1),U(`div`,null,[U(`strong`,null,j(e.school),1),U(`span`,Ap,j(e.major),1)])]))),128))])])),[[s]]),R((V(),H(`section`,jp,[a[19]||=U(`h2`,{class:`section-title`},`联系我`,-1),U(`div`,Mp,[(V(!0),H(B,null,z(I(bd),e=>(V(),H(`a`,{key:e.label,href:e.href||`#`,target:e.href?`_blank`:`_self`,rel:`noopener`},[U(`span`,Pp,j(e.icon),1),U(`span`,null,j(e.label),1)],8,Np))),128))])])),[[s]])])}}},[[`__scopeId`,`data-v-a4e3973d`]]);function Ip(e,t=`/`){window.history.state?.back?e.back():e.push(t)}function Lp(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Rp=Lp();function zp(e){Rp=e}var Bp={exec:()=>null};function Vp(e){let t=[];return n=>{let r=Math.max(0,Math.min(3,n-1)),i=t[r];return i||(i=e(r),t[r]=i),i}}function Q(e,t=``){let n=typeof e==`string`?e:e.source,r={replace:(e,t)=>{let i=typeof t==`string`?t:t.source;return i=i.replace(Up.caret,`$1`),n=n.replace(e,i),r},getRegex:()=>new RegExp(n,t)};return r}var Hp=((e=``)=>{try{return!!RegExp(`(?<=1)(?<!1)`+e)}catch{return!1}})(),Up={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:Vp(e=>RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:Vp(e=>RegExp(`^ {0,${e}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),fencesBeginRegex:Vp(e=>RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),headingBeginRegex:Vp(e=>RegExp(`^ {0,${e}}#`)),htmlBeginRegex:Vp(e=>RegExp(`^ {0,${e}}<(?:[a-z].*>|!--)`,`i`)),blockquoteBeginRegex:Vp(e=>RegExp(`^ {0,${e}}>`))},Wp=/^(?:[ \t]*(?:\n|$))+/,Gp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Kp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,qp=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Jp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Yp=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Xp=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Zp=Q(Xp).replace(/bull/g,Yp).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,``).getRegex(),Qp=Q(Xp).replace(/bull/g,Yp).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),$p=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/,em=/^[^\n]+/,tm=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,nm=Q(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace(`label`,tm).replace(`title`,/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),rm=Q(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,Yp).getRegex(),im=`address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul`,am=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,om=Q(`^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))`,`i`).replace(`comment`,am).replace(`tag`,im).replace(`attribute`,/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),sm=e=>Q($p).replace(`hr`,qp).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,e).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,im).getRegex(),cm=sm(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),lm=sm(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/),um={blockquote:Q(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace(`paragraph`,lm).getRegex(),code:Gp,def:nm,fences:Kp,heading:Jp,hr:qp,html:om,lheading:Zp,list:rm,newline:Wp,paragraph:cm,table:Bp,text:em},dm=Q(`^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)`).replace(`hr`,qp).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`blockquote`,` {0,3}>`).replace(`code`,`(?: {4}| {0,3}	)[^\\n]`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,im).getRegex(),fm={...um,lheading:Qp,table:dm,paragraph:Q($p).replace(`hr`,qp).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`table`,dm).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,im).getRegex()},pm={...um,html:Q(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace(`comment`,am).replace(/tag/g,`(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b`).getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Bp,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Q($p).replace(`hr`,qp).replace(`heading`,` *#{1,6} *[^
]`).replace(`lheading`,Zp).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`|fences`,``).replace(`|list`,``).replace(`|html`,``).replace(`|tag`,``).getRegex()},mm=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,hm=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,gm=/^( {2,}|\\)\n(?!\s*$)/,_m=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,vm=/[\p{P}\p{S}]/u,ym=/[\s\p{P}\p{S}]/u,bm=/[^\s\p{P}\p{S}]/u,xm=Q(/^((?![*_])punctSpace)/,`u`).replace(/punctSpace/g,ym).getRegex(),Sm=/[\p{Pi}\p{Ps}"']/u,Cm=/(?!~)[\p{P}\p{S}]/u,wm=/(?!~)[\s\p{P}\p{S}]/u,Tm=/(?:[^\s\p{P}\p{S}]|~)/u,Em=Q(/link|precode-code|html/,`g`).replace(`link`,/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace(`precode-`,Hp?"(?<!`)()":"(^^|[^`])").replace(`code`,/(?<b>`+)[^`]+\k<b>(?!`)/).replace(`html`,/<(?! )[^<>]*?>/).getRegex(),Dm=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,Om=Q(Dm,`u`).replace(/punct/g,vm).getRegex(),km=Q(Dm,`u`).replace(/punct/g,Cm).getRegex(),Am=Q(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/,`u`).replace(/openQuote/g,Sm).replace(/punct/g,vm).getRegex(),jm=`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)`,Mm=Q(jm,`gu`).replace(/notPunctSpace/g,bm).replace(/punctSpace/g,ym).replace(/punct/g,vm).getRegex(),Nm=Q(jm,`gu`).replace(/notPunctSpace/g,Tm).replace(/punctSpace/g,wm).replace(/punct/g,Cm).getRegex(),Pm=Q(`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,bm).replace(/punctSpace/g,ym).replace(/punct/g,vm).getRegex(),Fm=Q(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)`,`gu`).replace(/notPunctSpace/g,bm).replace(/punctSpace/g,ym).replace(/punct/g,vm).getRegex(),Im=Q(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,bm).replace(/punctSpace/g,ym).replace(/punct/g,vm).getRegex(),Lm=Q(/^~~?(?:((?!~)punct)|[^\s~])/,`u`).replace(/punct/g,vm).getRegex(),Rm=Q(`^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,bm).replace(/punctSpace/g,ym).replace(/punct/g,vm).getRegex(),zm=Q(/\\(punct)/,`gu`).replace(/punct/g,vm).getRegex(),Bm=Q(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace(`scheme`,/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace(`email`,/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Vm=Q(am).replace(`(?:-->|$)`,`-->`).getRegex(),Hm=Q(`^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>`).replace(`comment`,Vm).replace(`attribute`,/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Um=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,Wm=Q(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace(`label`,Um).replace(`href`,/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace(`title`,/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Gm=Q(/^!?\[(label)\]\[(ref)\]/).replace(`label`,Um).replace(`ref`,tm).getRegex(),Km=Q(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,tm).getRegex(),qm=Q(`reflink|nolink(?!\\()`,`g`).replace(`reflink`,Gm).replace(`nolink`,Km).getRegex(),Jm=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ym={_backpedal:Bp,anyPunctuation:zm,autolink:Bm,blockSkip:Em,br:gm,code:hm,del:Bp,delLDelim:Bp,delRDelim:Bp,emStrongLDelim:Om,emStrongRDelimAst:Mm,emStrongRDelimUnd:Fm,escape:mm,link:Wm,nolink:Km,punctuation:xm,reflink:Gm,reflinkSearch:qm,tag:Hm,text:_m,url:Bp},Xm={...Ym,emStrongLDelim:Am,emStrongRDelimAst:Pm,emStrongRDelimUnd:Im,link:Q(/^!?\[(label)\]\((.*?)\)/).replace(`label`,Um).getRegex(),reflink:Q(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace(`label`,Um).getRegex()},Zm={...Ym,emStrongRDelimAst:Nm,emStrongLDelim:km,delLDelim:Lm,delRDelim:Rm,url:Q(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace(`protocol`,Jm).replace(`email`,/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Q(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace(`protocol`,Jm).getRegex()},Qm={...Zm,br:Q(gm).replace(`{2,}`,`*`).getRegex(),text:Q(Zm.text).replace(`\\b_`,`\\b_| {2,}\\n`).replace(/\{2,\}/g,`*`).getRegex()},$m={normal:um,gfm:fm,pedantic:pm},eh={normal:Ym,gfm:Zm,breaks:Qm,pedantic:Xm},th={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},nh=e=>th[e];function rh(e,t){if(t){if(Up.escapeTest.test(e))return e.replace(Up.escapeReplace,nh)}else if(Up.escapeTestNoEncode.test(e))return e.replace(Up.escapeReplaceNoEncode,nh);return e}function ih(e){try{e=encodeURI(e).replace(Up.percentDecode,`%`)}catch{return null}return e}function ah(e,t){let n=e.replace(Up.findPipe,(e,t,n)=>{let r=!1,i=t;for(;--i>=0&&n[i]===`\\`;)r=!r;return r?`|`:` |`}).split(Up.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t){if(n.length>t)n.splice(t);else for(;n.length<t;)n.push(``)}for(;r<n.length;r++)n[r]=n[r].trim().replace(Up.slashPipe,`|`);return n}function oh(e,t,n){let r=e.length;if(r===0)return``;let i=0;for(;i<r;){let a=e.charAt(r-i-1);if(a===t&&!n)i++;else if(a!==t&&n)i++;else break}return e.slice(0,r-i)}function sh(e){let t=e.split(`
`),n=t.length-1;for(;n>=0&&Up.blankLine.test(t[n]);)n--;return t.length-n<=2?e:t.slice(0,n+1).join(`
`)}function ch(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]===`\\`)r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function lh(e,t=0){let n=t,r=``;for(let t of e)if(t===`	`){let e=4-n%4;r+=` `.repeat(e),n+=e}else r+=t,n++;return r}function uh(e,t,n,r,i){let a=t.href,o=t.title||null,s=e[1].replace(i.other.outputLinkReplace,`$1`),c=e[0].charAt(0)===`!`;r.state.inLink=!0;let l=r.state.linkEmitted,u=r.state.inRawBlock;r.state.linkEmitted=!1;let d=r.inlineTokens(s),f=r.state.linkEmitted;if(r.state.linkEmitted=l,r.state.inLink=!1,!c){if(f){r.state.inRawBlock=u;return}r.state.linkEmitted=!0}return{type:c?`image`:`link`,raw:n,href:a,title:o,text:s,tokens:d}}function dh(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let i=r[1];return t.split(`
`).map(e=>{let t=e.match(n.other.beginningSpace);if(t===null)return e;let[r]=t;return r.length>=i.length?e.slice(i.length):e}).join(`
`)}var fh=class{options;rules;lexer;constructor(e){this.options=e||Rp}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:`space`,raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=this.options.pedantic?t[0]:sh(t[0]);return{type:`code`,raw:e,codeBlockStyle:`indented`,text:e.replace(this.rules.other.codeRemoveIndent,``)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],n=dh(e,t[3]||``,this.rules);return{type:`code`,raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,`$1`):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=oh(e,`#`);(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:`heading`,raw:oh(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:`hr`,raw:oh(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=oh(t[0],`
`).split(`
`),n=``,r=``,i=[];for(;e.length>0;){let t=!1,a=[],o=0;for(;o<e.length;o++)if(this.rules.other.blockquoteStart.test(e[o]))a.push(e[o]),t=!0;else if(!t)a.push(e[o]);else break;e=e.slice(o);let s=a.join(`
`),c=s.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,``);n=n?`${n}
${s}`:s,r=r?`${r}
${c}`:c;let l=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,i,!0),this.lexer.state.top=l,e.length===0)break;let u=i.at(-1);if(u?.type===`code`)break;if(u?.type===`blockquote`){let t=u,a=e.join(`
`),o=t.raw+`
`+a.replace(this.rules.other.blockquoteSetextReplace2,``),s=this.blockquote(o);i[i.length-1]=s,n=`${n}
${a}`,r=r.substring(0,r.length-t.text.length)+s.text;break}if(u?.type===`list`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.list(a);i[i.length-1]=o,n=n.substring(0,n.length-u.raw.length)+o.raw,r=r.substring(0,r.length-t.raw.length)+o.raw,e=a.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:`blockquote`,raw:n,tokens:i,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,i={type:`list`,raw:``,ordered:r,start:r?+n.slice(0,-1):``,loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:`[*+-]`);let a=this.rules.other.listItemRegex(n),o=!1;for(;e;){let n=!1,r=``,s=``;if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;r=t[0],e=e.substring(r.length);let c=lh(t[2].split(`
`,1)[0],t[1].length),l=e.split(`
`,1)[0],u=!c.trim(),d=0;if(this.options.pedantic?(d=2,s=c.trimStart()):u?d=t[1].length+1:(d=c.search(this.rules.other.nonSpaceChar),d=d>4?1:d,s=c.slice(d),d+=t[1].length),u&&this.rules.other.blankLine.test(l)&&(r+=l+`
`,e=e.substring(l.length+1),n=!0),!n){let t=this.rules.other.nextBulletRegex(d),n=this.rules.other.hrRegex(d),i=this.rules.other.fencesBeginRegex(d),a=this.rules.other.headingBeginRegex(d),o=this.rules.other.htmlBeginRegex(d),f=this.rules.other.blockquoteBeginRegex(d);for(;e;){let p=e.split(`
`,1)[0],m;if(l=p,this.options.pedantic?(l=l.replace(this.rules.other.listReplaceNesting,`  `),m=l):m=l.replace(this.rules.other.tabCharGlobal,`    `),i.test(l)||a.test(l)||o.test(l)||f.test(l)||t.test(l)||n.test(l))break;if(m.search(this.rules.other.nonSpaceChar)>=d||!l.trim())s+=`
`+m.slice(d);else{if(u||c.replace(this.rules.other.tabCharGlobal,`    `).search(this.rules.other.nonSpaceChar)>=4||i.test(c)||a.test(c)||n.test(c))break;s+=`
`+l}u=!l.trim(),r+=p+`
`,e=e.substring(p.length+1),c=m.slice(d)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(r)&&(o=!0)),i.items.push({type:`list_item`,raw:r,task:!!this.options.gfm&&this.rules.other.listIsTask.test(s),loose:!1,text:s,tokens:[]}),i.raw+=r}let s=i.items.at(-1);if(s)s.raw=s.raw.trimEnd(),s.text=s.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let e of i.items)if(this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]),!i.loose){let t=e.tokens.filter(e=>e.type===`space`);i.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}for(let e of i.items){let t=e.tokens[0];if(e.task&&(t?.type===`text`||t?.type===`paragraph`)){e.text=e.text.replace(this.rules.other.listReplaceTask,``),t.raw=t.raw.replace(this.rules.other.listReplaceTask,``),t.text=t.text.replace(this.rules.other.listReplaceTask,``);for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,``);break}let n=this.rules.other.listTaskCheckbox.exec(e.raw);if(n){let t={type:`checkbox`,raw:n[0]+` `,checked:n[0]!==`[ ]`};e.checked=t.checked,i.loose?e.tokens[0]&&[`paragraph`,`text`].includes(e.tokens[0].type)&&`tokens`in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=t.raw+e.tokens[0].raw,e.tokens[0].text=t.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(t)):e.tokens.unshift({type:`paragraph`,raw:t.raw,text:t.raw,tokens:[t]}):e.tokens.unshift(t)}}else e.task&&=!1}if(i.loose)for(let e of i.items){e.loose=!0;for(let t of e.tokens)t.type===`text`&&(t.type=`paragraph`)}return i}}html(e){let t=this.rules.block.html.exec(e);if(t){let e=sh(t[0]);return{type:`html`,block:!0,raw:e,pre:t[1]===`pre`||t[1]===`script`||t[1]===`style`,text:e}}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal,` `),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,`$1`).replace(this.rules.inline.anyPunctuation,`$1`):``,r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,`$1`):t[3];return{type:`def`,tag:e,raw:oh(t[0],`
`),href:n,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=ah(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,``).split(`|`),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,``).split(`
`):[],a={type:`table`,raw:oh(t[0],`
`),header:[],align:[],rows:[]};if(n.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?a.align.push(`right`):this.rules.other.tableAlignCenter.test(e)?a.align.push(`center`):this.rules.other.tableAlignLeft.test(e)?a.align.push(`left`):a.align.push(null);for(let e=0;e<n.length;e++)a.header.push({text:n[e],tokens:this.lexer.inline(n[e]),header:!0,align:a.align[e]});for(let e of i)a.rows.push(ah(e,a.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:a.align[t]})));return a}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:`heading`,raw:oh(t[0],`
`),depth:t[2].charAt(0)===`=`?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:`paragraph`,raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:`text`,raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:`escape`,raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:`html`,raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=oh(e.slice(0,-1),`\\`);if((e.length-t.length)%2==0)return}else{let e=ch(t[2],`()`);if(e===-2)return;if(e>-1){let n=(t[0].indexOf(`!`)===0?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=``}}let n=t[2],r=``;if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(n);e&&(n=e[1],r=e[3])}else r=t[3]?t[3].slice(1,-1):``;return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(n=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?n.slice(1):n.slice(1,-1)),uh(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,`$1`),title:r&&r.replace(this.rules.inline.anyPunctuation,`$1`)},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let e=t[(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal,` `).toLowerCase()];if(!e){let e=n[0].charAt(0);return{type:`text`,raw:e,text:e}}return uh(n,e,n[0],this.lexer,this.rules)}}emStrong(e,t,n=``){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||!r[1]&&!r[2]&&!r[3]&&!r[4]||r[4]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[3])||!n||this.rules.inline.punctuation.exec(n))){let i=[...r[0]].length-1,a,o,s=i,c=0,l=r[0][0],u=n===l,d=l===`*`?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+i);(r=d.exec(t))!==null;){if(a=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!a)continue;if(o=[...a].length,r[3]||r[4]){s+=o;continue}if(r[5]||r[6]){if(i%3&&!((i+o)%3)){c+=o;continue}if(u)break}if(s-=o,s>0)continue;o=Math.min(o,o+s+c);let t=[...r[0]][0].length,n=e.slice(0,i+r.index+t+o);if(Math.min(i,o)%2){let e=n.slice(1,-1);return{type:`em`,raw:n,text:e,tokens:this.lexer.inlineTokens(e)}}let l=n.slice(2,-2);return{type:`strong`,raw:n,text:l,tokens:this.lexer.inlineTokens(l)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal,` `),n=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return n&&r&&(e=e.substring(1,e.length-1)),{type:`codespan`,raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:`br`,raw:t[0]}}del(e,t,n=``){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=this.rules.inline.delRDelim;for(s.lastIndex=0,t=t.slice(-1*e.length+n);(r=s.exec(t))!==null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i||(a=[...i].length,a!==n))continue;if(r[3]||r[4]){o+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o);let t=[...r[0]][0].length,s=e.slice(0,n+r.index+t+a),c=s.slice(n,-n);return{type:`del`,raw:s,text:c,tokens:this.lexer.inlineTokens(c)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,n;return t[2]===`@`?(e=t[1],n=`mailto:`+e):(e=t[1],n=e),{type:`link`,raw:t[0],text:e,href:n,tokens:[{type:`text`,raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if(t[2]===`@`)e=t[0],n=`mailto:`+e;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??``;while(r!==t[0]);e=t[0],n=t[1]===`www.`?`http://`+t[0]:t[0]}return{type:`link`,raw:t[0],text:e,href:n,tokens:[{type:`text`,raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:`text`,raw:t[0],text:t[0],escaped:e}}}},ph=class e{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Rp,this.options.tokenizer=this.options.tokenizer||new fh,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,linkEmitted:!1,top:!0};let t={other:Up,block:$m.normal,inline:eh.normal};this.options.pedantic?(t.block=$m.pedantic,t.inline=eh.pedantic):this.options.gfm&&(t.block=$m.gfm,t.inline=this.options.breaks?eh.breaks:eh.gfm),this.tokenizer.rules=t}static get rules(){return{block:$m,inline:eh}}static lex(t,n){return new e(n).lex(t)}static lexInline(t,n){return new e(n).inlineTokens(t)}lex(e){e=e.replace(Up.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(Up.tabCharGlobal,`    `).replace(Up.spaceLine,``));let r=1/0;for(;e;){if(e.length<r)r=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}let i;if(this.options.extensions?.block?.some(n=>(i=n.call({lexer:this},e,t))?(e=e.substring(i.raw.length),t.push(i),!0):!1))continue;if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length);let n=t.at(-1);i.raw.length===1&&n!==void 0?n.raw+=`
`:t.push(i);continue}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.text,this.inlineQueue.at(-1).src=n.text):t.push(i);continue}if(i=this.tokenizer.fences(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.heading(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.hr(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.blockquote(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.list(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.html(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.raw,this.inlineQueue.at(-1).src=n.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title},t.push(i));continue}if(i=this.tokenizer.table(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.lheading(e)){e=e.substring(i.raw.length),t.push(i);continue}let a=e;if(this.options.extensions?.startBlock){let t=1/0,n=e.slice(1),r;this.options.extensions.startBlock.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(a=e.substring(0,t+1))}if(this.state.top&&(i=this.tokenizer.paragraph(a))){let r=t.at(-1);n&&r?.type===`paragraph`?(r.raw+=(r.raw.endsWith(`
`)?``:`
`)+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):t.push(i),n=a.length!==e.length,e=e.substring(i.raw.length);continue}if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(i);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}linkInText(e){if(!e.includes(`[`))return!1;let t=this.tokenizer.rules.inline.link;for(let n of e.matchAll(this.tokenizer.rules.inline.blockSkip))if(t.test(n[0])&&e.charAt(n.index-1)!==`!`)return!0;for(let t of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)){let e=t[0],n=e.lastIndexOf(`[`);if(e.charAt(0)!==`!`&&Object.hasOwn(this.tokens.links,e.slice(n+1,-1))&&!(n>1&&this.linkInText(e.slice(1,n-1))))return!0}return!1}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n=e;if(this.tokens.links&&e.includes(`[`)){let e=this.tokenizer.rules.inline.reflinkSearch,t=n=>{let r=n.lastIndexOf(`[`);if(!Object.hasOwn(this.tokens.links,n.slice(r+1,-1)))return n;if(r>1&&n.charAt(0)!==`!`){let i=n.slice(1,r-1);if(this.linkInText(i))return`[`+i.replace(e,t)+`][`+`a`.repeat(n.length-r-2)+`]`}return`[`+`a`.repeat(n.length-2)+`]`};n=n.replace(e,t)}n=n.replace(this.tokenizer.rules.inline.anyPunctuation,e=>`+`.repeat(e.length)),n=n.replace(this.tokenizer.rules.inline.blockSkip,(e,t,n)=>{let r=n?n.length:0;return e.slice(0,r)+`[`+`a`.repeat(e.length-r-2)+`]`}),n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let r=!1,i=``,a=1/0;for(;e;){if(e.length<a)a=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}r||(i=``),r=!1;let o;if(this.options.extensions?.inline?.some(n=>(o=n.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),!0):!1))continue;if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let n=t.at(-1);o.type===`text`&&n?.type===`text`?(n.raw+=o.raw,n.text+=o.text):t.push(o);continue}if(o=this.tokenizer.emStrong(e,n,i)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.del(e,n,i)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.autolink(e)){e=e.substring(o.raw.length),t.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),t.push(o);continue}let s=e;if(this.options.extensions?.startInline){let t=1/0,n=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(s=e.substring(0,t+1))}if(o=this.tokenizer.inlineText(s)){e=e.substring(o.raw.length),o.raw.slice(-1)!==`_`&&(i=o.raw.slice(-1)),r=!0;let n=t.at(-1);n?.type===`text`?(n.raw+=o.raw,n.text+=o.text):t.push(o);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){let t=`Infinite loop on byte: `+e;if(this.options.silent)console.error(t);else throw Error(t)}},mh=class{options;parser;constructor(e){this.options=e||Rp}space(e){return``}code({text:e,lang:t,escaped:n}){let r=(t||``).match(Up.notSpaceStart)?.[0],i=e.replace(Up.endingNewline,``)+`
`;return r?`<pre><code class="language-`+rh(r)+`">`+(n?i:rh(i,!0))+`</code></pre>
`:`<pre><code>`+(n?i:rh(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return``}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r=``;for(let t=0;t<e.items.length;t++){let n=e.items[t];r+=this.listitem(n)}let i=t?`ol`:`ul`,a=t&&n!==1?` start="`+n+`"`:``;return`<`+i+a+`>
`+r+`</`+i+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return`<input `+(e?`checked="" `:``)+`disabled="" type="checkbox"> `}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t=``,n=``;for(let t=0;t<e.header.length;t++)n+=this.tablecell(e.header[t]);t+=this.tablerow({text:n});let r=``;for(let t=0;t<e.rows.length;t++){let i=e.rows[t];n=``;for(let e=0;e<i.length;e++)n+=this.tablecell(i[e]);r+=this.tablerow({text:n})}return r&&=`<tbody>${r}</tbody>`,`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?`th`:`td`;return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${rh(e,!0)}</code>`}br(e){return`<br>`}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),i=ih(e);if(i===null)return r;e=i;let a=`<a href="`+e+`"`;return t&&(a+=` title="`+rh(t)+`"`),a+=`>`+r+`</a>`,a}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let i=ih(e);if(i===null)return rh(n);e=i;let a=`<img src="${e}" alt="${rh(n)}"`;return t&&(a+=` title="${rh(t)}"`),a+=`>`,a}text(e){return`tokens`in e&&e.tokens?this.parser.parseInline(e.tokens):`escaped`in e&&e.escaped?e.text:rh(e.text)}},hh=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return``+e}image({text:e}){return``+e}br(){return``}checkbox({raw:e}){return e}},gh=class e{options;renderer;textRenderer;constructor(e){this.options=e||Rp,this.options.renderer=this.options.renderer||new mh,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new hh}static parse(t,n){return new e(n).parse(t)}static parseInline(t,n){return new e(n).parseInline(t)}parse(e){this.renderer.parser=this;let t=``;for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=r,n=this.options.extensions.renderers[e.type].call({parser:this},e);if(n!==!1||![`space`,`hr`,`heading`,`code`,`table`,`blockquote`,`list`,`checkbox`,`html`,`def`,`paragraph`,`text`].includes(e.type)){t+=n||``;continue}}let i=r;switch(i.type){case`space`:t+=this.renderer.space(i);break;case`hr`:t+=this.renderer.hr(i);break;case`heading`:t+=this.renderer.heading(i);break;case`code`:t+=this.renderer.code(i);break;case`table`:t+=this.renderer.table(i);break;case`blockquote`:t+=this.renderer.blockquote(i);break;case`list`:t+=this.renderer.list(i);break;case`checkbox`:t+=this.renderer.checkbox(i);break;case`html`:t+=this.renderer.html(i);break;case`def`:t+=this.renderer.def(i);break;case`paragraph`:t+=this.renderer.paragraph(i);break;case`text`:t+=this.renderer.text(i);break;default:{let e=`Token with "`+i.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n=``;for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let e=this.options.extensions.renderers[i.type].call({parser:this},i);if(e!==!1||![`escape`,`html`,`link`,`image`,`checkbox`,`strong`,`em`,`codespan`,`br`,`del`,`text`].includes(i.type)){n+=e||``;continue}}let a=i;switch(a.type){case`escape`:n+=t.text(a);break;case`html`:n+=t.html(a);break;case`link`:n+=t.link(a);break;case`image`:n+=t.image(a);break;case`checkbox`:n+=t.checkbox(a);break;case`strong`:n+=t.strong(a);break;case`em`:n+=t.em(a);break;case`codespan`:n+=t.codespan(a);break;case`br`:n+=t.br(a);break;case`del`:n+=t.del(a);break;case`text`:n+=t.text(a);break;default:{let e=`Token with "`+a.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return n}},_h=class{options;block;constructor(e){this.options=e||Rp}static passThroughHooks=new Set([`preprocess`,`postprocess`,`processAllTokens`,`emStrongMask`]);static passThroughHooksRespectAsync=new Set([`preprocess`,`postprocess`,`processAllTokens`]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?ph.lex:ph.lexInline}provideParser(e=this.block){return e?gh.parse:gh.parseInline}},vh=new class{defaults=Lp();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=gh;Renderer=mh;TextRenderer=hh;Lexer=ph;Tokenizer=fh;Hooks=_h;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case`table`:{let e=r;for(let r of e.header)n=n.concat(this.walkTokens(r.tokens,t));for(let r of e.rows)for(let e of r)n=n.concat(this.walkTokens(e.tokens,t));break}case`list`:{let e=r;n=n.concat(this.walkTokens(e.items,t));break}default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let i=e[r].flat(1/0);n=n.concat(this.walkTokens(i,t))}):e.tokens&&(n=n.concat(this.walkTokens(e.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let n={...e};if(n.async=this.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error(`extension name required`);if(`renderer`in e){let n=t.renderers[e.name];n?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return r===!1&&(r=n.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if(`tokenizer`in e){if(!e.level||e.level!==`block`&&e.level!==`inline`)throw Error(`extension level must be 'block' or 'inline'`);let n=t[e.level];n?n.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&(e.level===`block`?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:e.level===`inline`&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}`childTokens`in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),n.extensions=t),e.renderer){let t=this.defaults.renderer||new mh(this.defaults);for(let n in e.renderer){if(!(n in t))throw Error(`renderer '${n}' does not exist`);if([`options`,`parser`].includes(n))continue;let r=n,i=e.renderer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n||``}}n.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new fh(this.defaults);for(let n in e.tokenizer){if(!(n in t))throw Error(`tokenizer '${n}' does not exist`);if([`options`,`rules`,`lexer`].includes(n))continue;let r=n,i=e.tokenizer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new _h;for(let n in e.hooks){if(!(n in t))throw Error(`hook '${n}' does not exist`);if([`options`,`block`].includes(n))continue;let r=n,i=e.hooks[r],a=t[r];t[r]=_h.passThroughHooks.has(n)?e=>{if(this.defaults.async&&_h.passThroughHooksRespectAsync.has(n))return(async()=>{let n=await i.call(t,e);return a.call(t,n)})();let r=i.call(t,e);return a.call(t,r)}:(...e)=>{if(this.defaults.async)return(async()=>{let n=await i.apply(t,e);return n===!1&&(n=await a.apply(t,e)),n})();let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;n.walkTokens=function(e){let n=[];return n.push(r.call(this,e)),t&&(n=n.concat(t.call(this,e))),n}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return ph.lex(e,t??this.defaults)}parser(e,t){return gh.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},i={...this.defaults,...r},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&r.async===!1)return a(Error(`marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.`));if(typeof t>`u`||t===null)return a(Error(`marked(): input parameter is undefined or null`));if(typeof t!=`string`)return a(Error(`marked(): input parameter is of type `+Object.prototype.toString.call(t)+`, string expected`));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let n=i.hooks?await i.hooks.preprocess(t):t,r=await(i.hooks?await i.hooks.provideLexer(e):e?ph.lex:ph.lexInline)(n,i),a=i.hooks?await i.hooks.processAllTokens(r):r;i.walkTokens&&await Promise.all(this.walkTokens(a,i.walkTokens));let o=await(i.hooks?await i.hooks.provideParser(e):e?gh.parse:gh.parseInline)(a,i);return i.hooks?await i.hooks.postprocess(o):o})().catch(a);try{i.hooks&&(t=i.hooks.preprocess(t));let n=(i.hooks?i.hooks.provideLexer(e):e?ph.lex:ph.lexInline)(t,i);i.hooks&&(n=i.hooks.processAllTokens(n)),i.walkTokens&&this.walkTokens(n,i.walkTokens);let r=(i.hooks?i.hooks.provideParser(e):e?gh.parse:gh.parseInline)(n,i);return i.hooks&&(r=i.hooks.postprocess(r)),r}catch(e){return a(e)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e=`<p>An error occurred:</p><pre>`+rh(n.message+``,!0)+`</pre>`;return t?Promise.resolve(e):e}if(t)return Promise.reject(n);throw n}}};function $(e,t){return vh.parse(e,t)}$.options=$.setOptions=function(e){return vh.setOptions(e),$.defaults=vh.defaults,zp($.defaults),$},$.getDefaults=Lp,$.defaults=Rp;function yh(...e){return vh.use(...e),$.defaults=vh.defaults,zp($.defaults),$}$.use=yh,$.walkTokens=function(e,t){return vh.walkTokens(e,t)},$.parseInline=vh.parseInline,$.Parser=gh,$.parser=gh.parse,$.Renderer=mh,$.TextRenderer=hh,$.Lexer=ph,$.lexer=ph.lex,$.Tokenizer=fh,$.Hooks=_h,$.parse=$,$.options,$.setOptions,$.walkTokens,$.parseInline,gh.parse,ph.lex;var bh={class:`back-bar`,"aria-label":`返回导航`},xh={__name:`BackBar`,props:{to:{type:String,default:`/`},label:{type:String,default:`返回上一页`}},setup(e){let t=e,n=ul();function r(){Ip(n,t.to)}return(t,n)=>(V(),H(`nav`,bh,[U(`button`,{class:`back-bar-btn`,type:`button`,onClick:r},[n[0]||=U(`span`,{class:`back-bar-arrow`,"aria-hidden":`true`},`‹`,-1),G(` `+j(e.label),1)])]))}},Sh={class:`container page nf-page`},Ch={class:`fireflies nf-flies`,"aria-hidden":`true`},wh={class:`page-subtitle`},Th={class:`nf-path`},Eh={class:`nf-links`},Dh=Al({__name:`NotFoundView`,setup(e){let t=dl(),n=[{left:`12%`,top:`28%`,size:7,dur:11,delay:0,dx:-30,dy:-52,peak:.7},{left:`82%`,top:`22%`,size:5,dur:13,delay:2.5,dx:26,dy:-40,peak:.6},{left:`70%`,top:`66%`,size:6,dur:9,delay:1.2,dx:-22,dy:-60,peak:.75},{left:`25%`,top:`74%`,size:5,dur:12,delay:4,dx:30,dy:-30,peak:.55}];return(e,r)=>(V(),H(`div`,Sh,[U(`div`,Ch,[(V(),H(B,null,z(n,(e,t)=>U(`span`,{key:t,style:k({left:e.left,top:e.top,width:e.size+`px`,height:e.size+`px`,"--dur":e.dur+`s`,"--delay":e.delay+`s`,"--dx":e.dx+`px`,"--dy":e.dy+`px`,"--peak":e.peak})},null,4)),64))]),r[5]||=U(`p`,{class:`nf-code`,"aria-hidden":`true`},`404`,-1),r[6]||=U(`h1`,{class:`page-title`},`这个页面不存在`,-1),U(`p`,wh,[r[0]||=G(` 地址 `,-1),U(`code`,Th,j(I(t).fullPath),1),r[1]||=G(` 没有对应内容，可能打错了字，或者内容已经改名。 `,-1)]),U(`ul`,Eh,[U(`li`,null,[W(I(tl),{to:`/`},{default:L(()=>[...r[2]||=[G(`← 回到首页`,-1)]]),_:1})]),U(`li`,null,[W(I(tl),{to:`/knowledge`},{default:L(()=>[...r[3]||=[G(`去看看知识库`,-1)]]),_:1})]),U(`li`,null,[W(I(tl),{to:`/about`},{default:L(()=>[...r[4]||=[G(`了解一下我`,-1)]]),_:1})])])]))}},[[`__scopeId`,`data-v-3f115b1e`]]),Oh={class:`container page`},kh={class:`detail-hero`},Ah={class:`detail-icon`},jh={class:`page-title`},Mh={class:`detail-tags`},Nh={key:0,class:`meta-tag`},Ph={key:1,class:`meta-tag meta-role`},Fh={class:`detail-body`},Ih=[`innerHTML`],Lh=[`aria-label`,`onClick`],Rh=[`src`,`alt`],zh={key:0},Bh={key:0,class:`detail-action`},Vh={key:1,class:`detail-action`},Hh=[`href`],Uh={key:2,class:`detail-gallery`},Wh={class:`gallery-grid`},Gh=[`aria-label`,`onClick`],Kh=[`src`,`alt`],qh={key:0},Jh=[`aria-label`],Yh=[`src`,`alt`],Xh={key:0,class:`lightbox-caption`},Zh={key:3,class:`detail-highlights`},Qh={class:`skill-tags`},$h=Al({__name:`ProjectDetailView`,setup(e){let t=dl(),n=ul();function r(){Ip(n,`/`)}let i=q(()=>_d.find(e=>e.id===t.params.id)),a=q(()=>i.value?$.parse(i.value.long||``).split(/(?=<h3)/).filter(e=>e.trim()).map(e=>{let t=(e.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)||[])[1]||``,n=t.replace(/<[^>]+>/g,``);return{html:e,imgs:(i.value.images||[]).filter(e=>e.anchor?t?n.includes(e.anchor):e.anchor===`intro`:!1)}}):[]),o=q(()=>{if(!i.value)return[];let e=new Set(a.value.flatMap(e=>e.imgs.map(e=>e.src)));return(i.value.images||[]).filter(t=>!e.has(t.src))});Pn(i,e=>{if(!e){ad({title:`页面不存在`,desc:`这个地址没有对应内容。`,path:t.path});return}ad({title:e.title,desc:`${e.title}：${e.role||``}${e.tech?` · `+e.tech:``}`.trim(),path:`/project/${e.id}`})},{immediate:!0,flush:`post`});let s=F(null),c=F(null),l=null;function u(e,t){l=t?.currentTarget??null,s.value=e,_n(()=>c.value?.focus())}function d(){s.value=null,l?.focus?.(),l=null}function f(e){e.key===`Escape`&&s.value&&d()}return Pn(s,e=>{typeof document>`u`||(e?document.addEventListener(`keydown`,f):document.removeEventListener(`keydown`,f))}),yr(()=>{typeof document<`u`&&document.removeEventListener(`keydown`,f)}),(e,t)=>{let n=Ar(`reveal`);return V(),H(`div`,Oh,[i.value?(V(),H(B,{key:0},[U(`button`,{type:`button`,class:`back-link`,onClick:r},`← 返回首页`),R((V(),H(`section`,kh,[U(`div`,Ah,j(i.value.icon),1),U(`div`,null,[U(`h1`,jh,j(i.value.title),1),U(`div`,Mh,[i.value.tech?(V(),H(`span`,Nh,j(i.value.tech),1)):K(``,!0),i.value.role?(V(),H(`span`,Ph,`👤 `+j(i.value.role),1)):K(``,!0)])])])),[[n]]),R((V(),H(`section`,Fh,[(V(!0),H(B,null,z(a.value,(e,t)=>(V(),H(B,{key:t},[U(`div`,{class:`markdown md-chunk`,innerHTML:e.html},null,8,Ih),e.imgs.length?(V(),H(`div`,{key:0,class:A([`chunk-gallery`,{wide:e.imgs.length>1}])},[(V(!0),H(B,null,z(e.imgs,(e,t)=>(V(),H(`figure`,{key:e.src+t,class:`gallery-item`},[U(`button`,{type:`button`,class:`gallery-btn`,"aria-label":`放大查看：${e.alt}`,onClick:t=>u(e,t)},[U(`img`,pa({src:e.src,alt:e.alt,loading:`lazy`},{ref_for:!0},I(Sd)(e.src)),null,16,Rh)],8,Lh),e.alt?(V(),H(`figcaption`,zh,j(e.alt),1)):K(``,!0)]))),128))],2)):K(``,!0)],64))),128))])),[[n]]),i.value.id===`weiguan-yifang`?R((V(),H(`section`,Bh,[W(I(tl),{to:`/play`,class:`btn btn-primary`},{default:L(()=>[...t[0]||=[G(`🏯 在线试玩（无需下载）`,-1)]]),_:1})])),[[n]]):K(``,!0),i.value.link?R((V(),H(`section`,Vh,[U(`a`,{href:i.value.link,target:`_blank`,rel:`noopener noreferrer`,class:`btn btn-primary`},` 🔗 `+j(i.value.linkText||`查看在线演示`),9,Hh)])),[[n]]):K(``,!0),o.value.length?R((V(),H(`section`,Uh,[t[1]||=U(`h2`,{class:`section-title`},`项目展示`,-1),t[2]||=U(`p`,{class:`gallery-hint`},`点击图片可查看完整大图`,-1),U(`div`,Wh,[(V(!0),H(B,null,z(o.value,(e,t)=>(V(),H(`figure`,{key:e.src+t,class:`gallery-item`},[U(`button`,{type:`button`,class:`gallery-btn`,"aria-label":`放大查看：${e.alt}`,onClick:t=>u(e,t)},[U(`img`,pa({src:e.src,alt:e.alt,loading:`lazy`},{ref_for:!0},I(Sd)(e.src)),null,16,Kh)],8,Gh),e.alt?(V(),H(`figcaption`,qh,j(e.alt),1)):K(``,!0)]))),128))])])),[[n]]):K(``,!0),W(Xa,{name:`fade`},{default:L(()=>[s.value?(V(),H(`div`,{key:0,class:`lightbox`,role:`dialog`,"aria-modal":`true`,"aria-label":s.value.alt||`查看大图`,onClick:$o(d,[`self`])},[U(`button`,{ref_key:`lightboxClose`,ref:c,class:`lightbox-close`,onClick:d,"aria-label":`关闭大图`},` ✕ `,512),U(`img`,{src:s.value.src,alt:s.value.alt,class:`lightbox-img`},null,8,Yh),s.value.alt?(V(),H(`p`,Xh,j(s.value.alt),1)):K(``,!0)],8,Jh)):K(``,!0)]),_:1}),i.value.highlights.length?R((V(),H(`section`,Zh,[t[3]||=U(`h2`,{class:`section-title`},`亮点`,-1),U(`div`,Qh,[(V(!0),H(B,null,z(i.value.highlights,e=>(V(),H(`span`,{key:e,class:`skill-tag`},j(e),1))),128))])])),[[n]]):K(``,!0),W(Nd,{page:`项目详情`,item:i.value.id},null,8,[`item`]),W(xh,{to:`/`,label:`返回上一页`})],64)):(V(),ta(Dh,{key:1}))])}}},[[`__scopeId`,`data-v-2cc2f9df`]]),eg=Object.assign({"../content/notes/agent-memory-system.md":`---
title: Agent 记忆系统：自动注入与双写落地
date: 2026-10-02
tags: [AI, 工程]
summary: carrot 的记忆系统踩过「注入失效」的坑之后才定型：每轮 systemPrompt 自动注入、模型打标签自动提取、MEMORY.md 与 sqlite 双写。关键是 resume 有盲区，验证注入必须开新会话。
---

# 记忆系统要解决两件事

agent 的记忆不是「存起来」就完了，要解决两个方向：

1. **注入**：每轮对话开始前，把该记得的东西自动塞进上下文
2. **提取**：每轮结束（或中途）把新产生的事实自动写回记忆库

两件事听起来对称，坑完全不对称。

## 注入：每轮都要走一遍

我的做法是在 systemPrompt 层面拼装：人格（怎么说话、什么风格）+ 技能清单 + MEMORY/GOALS 摘要。每轮都拼，不依赖模型的「记性」——因为模型根本没有记性，它只看得到这轮上下文里有的东西。

## 提取：让模型自己打标签

让模型在回复里输出记忆标签（比如 \`mem: 用户的股票项目回测区间是 2025-01 至 2026-08\`），应用层解析标签后入库。好处是**模型自己判断什么值得记**，不用应用层猜。

## 双写：人类可读 + 机器可查

记忆存两份：

| 存储 | 给谁看 | 特点 |
| --- | --- | --- |
| MEMORY.md | 人 | 打开就能读，能手改，git 能追踪 |
| sqlite | 程序 | 结构化、能按标签/时间查询、去重方便 |

两份由同一次提取写入，MD 是真相源（手改 MD 会被下次启动时同步回 sqlite），sqlite 是索引。

## 最大的坑：resume 盲区

我调试注入逻辑时遇到一次「以为记忆系统坏了」：恢复一个旧会话，人格和记忆都没注入，像是整段逻辑失效。查了半天发现是**快照语义**：恢复旧会话时复用的是首请求的快照，注入只发生在新请求上。

所以验证注入是否生效，**必须开新会话测**。这个坑不踩一次很难想到——「恢复会话」和「新会话」在语义上看起来都是「继续聊」。

**底层逻辑：记忆系统的一切验证都要问一句——这是新请求还是快照回放？**
`,"../content/notes/agent-software-three-steps.md":`---
title: 造一个 Agent 软件：从改装、复现到自研的三步路
date: 2026-10-02
tags: [AI, 工程, 方法论]
summary: 我做 carrot agent 走了三步：先把别人的软件改装到能日用，再对照开源 Codex 验证理解，最后融合出自己的东西。回头看，这个顺序比直接从零写省了太多弯路。
---

# 为什么不直接从零写

想做一个自己的 agent 软件，最自然的冲动是「从零开始」：搭架子、选模型、写循环。但我很快发现，agent 软件的难点根本不在架子——工具循环、审批、沙箱这些，开源世界到处都是参考。真正的难点是**每一处细节都要扛住真实使用**：会话会爆、模型会卡、更新会把你的改动冲掉、手机端会被网络欺负。

这些坑，不真用是看不见的。所以我换了个顺序：先改装，再复现，最后自研。

## 第一步：改装（在别人的软件里学会走）

我在一款第三方 Claude Code 桌面应用上做了 30 轮本地改造，只打补丁不动上游源码：

- **修真缺陷**：流式输出丢消息块，根因是上游 SDK 复用同一个消息 id，多个消息块键撞车互相覆盖。改法是按消息 id 排队对账，改完用探针数数证明修对了——修前「运行中 9 条 vs 存档 17 条」对不上，修后两边一致
- **补自愈**：上下文超限自动断开重开；看门狗 30 秒一查，卡 5 分钟弹确认，最多自动重试 2 次
- **会话回滚分叉**：从任意一轮「回到这里」
- **更新守门**：一键更新前先跑 SDK 探针，官方升级后接口对不上就自动回滚，防止魔改被冲掉

这一步最大的收获：**学会了在别人的代码里定位问题**。丢块那种 bug，没有源码级理解根本修不了。

## 第二步：复现（换一个样本验证理解）

调研了 OpenAI 开源的 Codex（Apache-2.0，Rust 核心）之后，我得到一个重要判断：

> **框架可以复现，「模型 × 提示词的协同调优」复现不了。**

能抄来 agent 的形状（工具循环、沙箱、审批），抄不来它的手感。基于这个认知，我搭了一个简易 Codex 实验，只验证两件事：会话记忆怎么在 systemPrompt 层面自动注入、轮次结束时记忆怎么自动提取回写。**验证认知，而不是复刻产品**——这一步的产出是「我知道哪些能做、哪些做不到」，不是又一款玩具。

## 第三步：自研（把两边的理解合起来）

carrot agent 才是「自己的软件」：独立人格目录（~/.carrot/）、记忆双写（MEMORY.md 人类可读 + sqlite 结构化）、Playwright MCP 浏览器能力、上下文余量条 + 自动压缩、GOALS.md 界面化、双端同步 + 手机公网入口。现在每天在用。

## 这个顺序的价值

| 直接从零写 | 改装 → 复现 → 自研 |
| --- | --- |
| 一开始就面对所有细节 | 每一步只面对一类问题 |
| 坑全要自己踩一遍 | 在别人的代码里先看一遍坑 |
| 容易做出「能跑的玩具」 | 每一步都被真实使用逼着做完 |

**底层逻辑：造软件的捷径不是少走弯路，而是先在别人的弯路上练手。**
`,"../content/notes/avoid-stuck-protocol.md":`---
title: 卡死自查协议：跟 AI 协作时，怎么避免「无声地耗死」
date: 2026-09-22
tags: [AI, 工程, 方法论]
summary: AI 干活最容易出的问题不是做错，而是卡住之后反复重试同一个无效动作。于是我给所有协作会话定了一份硬性自查规则。
---

# 问题不是「做错」，是「无声地耗死」

用 AI 做项目的过程中，我遇到最多的情况不是它做错了，而是它**卡住了却不说**：

- 一个命令跑了五分钟没动静，它还在等
- 同一个报错，同一个改法，试了第三遍
- 一个文件改不动，就反复用同样的方式再试一次

表面上它在「工作」，实际上时间全浪费了。所以我写了一份自查协议，作为所有协作会话的公共规则。

## 触发条件（满足任意一条就必须停下来）

| 条件 | 说明 |
| --- | --- |
| 单个工具调用超过 **90 秒**没返回 | 大概率是卡住了，不是「慢」 |
| 同一个工具、同一个文件**连续失败 2 次** | 说明方法本身有问题 |
| 同一种改法试了 **2 遍**都无效 | 说明需要换思路，不是再试一次 |
| 长命令跑很久没有输出 | 只是在干等 |

## 触发之后必须做三件事

1. **用一句话说清楚卡在哪。** 不是解释背景，而是「我在做 X，卡在 Y」。
2. **换一条完全不同的路。** 关键在「完全不同」——原来的方法再试一次不算换路。
3. **换不动就交出去。** 直接说「这里卡住了，我试过 A 和 B，都不行」，把决定权交回给我。

**这条规则的底层逻辑：早一点承认卡住，比晚一点承认便宜得多。**

## 已知的坑 → 备用路子（对照表）

累积下来的对照表，最有用的部分：

| 已知的坑 | 备用路子 |
| --- | --- |
| 改文件反复重试不成功 | 改成「先写补丁片段文件，再用脚本按锚点字符串拼接」 |
| 长命令（构建 / 测试）干等 | 前面套一个硬超时，超时就直接判定失败 |
| 打包工具盲等 | 后台跑 + 轮询产物文件是否出现，而不是等它退出 |
| 在错误的目录跑语法检查 | 会误报「找不到模块」，先切到项目根目录再检查，并注意文件后缀 |

## 为什么这条规则值得写下来

写代码的人都会「再试一次」，AI 也会。区别是：人会感觉烦，AI 不会——**它会很耐心地一直试下去，直到把时间烧光。**

所以我把它变成了明文规则：卡住的判断标准是**可量化的**（90 秒、2 次、2 遍），换路的动作是**必须的**，交出去的时机是**尽早的**。

## 一句话总结

**协作里最贵的不是错误，是沉默。把「什么时候该停」写成硬规则，比指望每次都判断准确靠谱得多。**
`,"../content/notes/backtest-numbers-trap.md":`---
title: 回测数字的陷阱：112.74% 应该怎么读
date: 2026-09-22
tags: [AI, 机器学习, 方法论]
summary: 一个回测收益数字，如果不说清楚区间、模型和口径，它就不是结论，只是噪音。这篇笔记用我自己项目里的两组数字说明为什么。
---

# 一个数字，两种读法

我自己的量化项目里跑出过这么一组数：

- 策略总收益 **112.74%**
- 同期基准 **46.57%**
- 超额收益 **66.17%**
- 最大回撤 **-10.02%**

如果只看第一行，结论是「策略很成功」。但加上后面三行，结论完全变了：

**基准自己就涨了 46.57%——说明这是一段整体上涨的市场。真正需要解释的不是「赚了 112%」，而是「比基准多的 66% 是从哪来的」。**

而且这段区间是 **2025-01-01 到 2026-08-14**：只有一个区间、一段行情，没有跨市场环境检验。它证明不了策略在不同行情下都成立。

## 同一个项目里，另一组数字更值得记

我还跑过一个**传统规则策略**（小市值 + 低波动 + 反转）。它的结果**以 JSON 落盘、可复现**：

| 项目 | 数值 |
| --- | --- |
| 传统规则策略收益 | 16.85% |
| 同期基准 | 44.93% |
| 超额 | **-28.08%** |

**规则策略跑输大盘 28 个百分点。**

这组「不好看」的数字比 112.74% 更有信息量：它说明这段时间**基准本身很强**，想做出超额收益并不容易。把两组数字放在一起，才不会得出「随便做个策略都能赚」的错误结论。

## 列出这个数字必须带的五个条件

1. **模型是什么**——我这里有「回归版」和「分类版」两条线并行，两个版本的成绩不能混着说
2. **选股范围**——选了多少只、怎么筛的
3. **调仓频率**——多久换一次仓，直接影响手续费与换手率
4. **回测区间**——起止日期，以及区间内基准涨了多少
5. **有没有落盘**——结果能不能被复现，还是只在截图里

## 还有四件没做完的事（不能假装做完了）

- **没有实盘验证。** 模拟盘已接上但**尚未产生真实交易**，净值一直停在初始值。
- **结果只在截图里。** 仓库里没有落盘的可复现结果文件，换机器要重跑才能重算。
- **成本没算全。** 手续费、滑点、冲击成本还没有全部计入。
- **过拟合与幸存者偏差没排除干净。** 回测阶段反复调参本身就会引入偏差。

## 为什么我要专门写这篇

因为**报一个漂亮的数字**是最容易走的捷径，也是最容易在追问下崩掉的做法。

被问到「这个 112% 是怎么来的」，正确的回答是能说清区间、模型、基准、调仓频率和局限；错误的回答是背一个数字。前者需要真的做过，后者只需要抄一次。

**一个数字如果不带口径，它就不是结论，只是噪音。**

## 一句话总结

**回测收益必须和它的反面一起出现：同期基准多少、最大回撤多少、有没有实盘。只说收益不说口径，等于什么都没说。**
`,"../content/notes/canvas-pixel-wave.md":`---
title: Canvas 像素波：一个点击反馈的诞生
date: 2026-10-02
tags: [前端, 交互]
summary: 个人主页的点击涟漪效果：Canvas 2D 网格像素波，18px 格 14px 块、三条高斯衰减带、桌面手机分档参数、pointer + passive touch 双通道。从 Three.js 简化到 2D，反而更对味。
---

# 需求：点击要「看得见」

个人主页想要一个点击反馈：点哪儿哪儿起一圈「像素波」。要求是**像素风**（配胡萝卜园主题），颜色不深、传播不快、大小适中，手机上「存在但不凸显」。

## 为什么不是 Three.js

第一版想用 Three.js 做粒子波，写下去发现：一个 2D 平面上的涟漪，用 3D 引擎是大炮打蚊子。换成 **Canvas 2D + 网格对齐的方块**：18px 一个格，格内画 14px 的方块，天然像素感，性能开销小一个量级。

## 波形：三条高斯带

一圈波不是简单描边，是**三条同心衰减带**：

- 半径偏移 \`[0, -30, -60]\`（三条带，内圈最实）
- 振幅比例 \`[1.0, 0.55, 0.28]\`（外圈渐弱）
- 每条带按高斯函数衰减（σ=11），离带心越远越透明

透明度峰值（PEAK）桌面 0.4、手机 0.22——手机上波要「存在但不凸显」。

## 参数分档：每波出生时定格

桌面/手机参数不同（波最大半径 220 vs 96、传播速度 280 vs 190），关键是**每圈波在出生那一刻定格自己的参数**——中途旋转屏幕或缩放窗口，已出生的波不变形，新波用新参数。

## 输入双通道：鼠标一套，触摸一套

这是踩过坑之后的结构：

- **鼠标**：pointer 事件，\`pointerdown\` 起、\`pointermove\` 长按连发（每 120ms 一圈，约 8 波/秒）、\`pointerup\` 停
- **触摸**：**全 passive 的 touch 事件**。一开始也用 pointer，结果移动端一滚动，浏览器 pointercancel 把波掐了——pointer 事件和滚动抢手势。改成 touchstart/touchmove/touchend 全 passive：滚动不受影响，滑动沿途照样出波
- 双通道防双发：pointer 通道里 \`pointerType === 'touch'\` 的直接忽略

## 兜底：三处「环境不对就休眠」

- \`prefers-reduced-motion\`：直接不启动（无障碍）
- jsdom 无 canvas 上下文：组件返回 null 休眠（测试环境不炸）
- 全程 \`pointer-events: none\`：波永远不挡用户点击

**底层逻辑：装饰性效果的第一原则——好看是加分项，不挡事、不打扰才是底线。**
`,"../content/notes/carbon-brain-dac.md":`---
title: Carbon Brain：用机器学习预测 DAC 材料的吸附饱和度
date: 2026-09-12
tags: [机器学习, 项目]
summary: 直接空气捕集材料「吸饱了」就要再生；把预测接进控制回路，让装置在吸附与再生之间自动切换。
---

# 问题背景

**DAC（Direct Air Capture，直接空气捕集）** 指直接从空气中捕获 CO₂。
我参与的项目使用的材料是 **Polyam-N-Cu²⁺**（双胺基铜位点材料）。

这种材料有一个死穴：**吸饱之后就不再工作了**，必须进入「再生」流程把 CO₂ 释放掉，才能重新吸附。
传统做法是按固定时间切换，问题是：

- 切早了 → 材料还没吸满，产能浪费。
- 切晚了 → 材料已饱和，白吹风。

## 我们的思路

**与其定时，不如预测。** 用监督学习模型实时预测当前材料的**饱和度**，
再由控制系统决定何时切换 —— 饱和了就进再生，再生完成就回到吸附。

\`\`\`
传感器数据 → 模型预测饱和度 → 判断是否达到阈值 → 切换吸附 / 再生
\`\`\`

这样就实现了**连续不断的吸附**，而不是「吸一阵、停一阵」。

## 我在项目里的角色

**项目组长**，具体负责：

- 统筹进度与分工，对齐各环节的输入输出
- 数据清洗与特征工程
- 模型选型与训练
- 设计「自动切换」的判定逻辑，并参与装置联调

作为组长我学到的最重要一课是：**接口比实现更早定下来更省事**。
我们把「模型的输入是什么、输出是什么格式、控制端怎么读」先写清楚，
后面两拨人才能并行干活。

## 遇到的困难

- **数据量有限。** 真实实验数据成本高，只能靠合理的数据增强和交叉验证来提升可信度。
- **实验室环境与真实环境有差异。** 模型在实验数据上很好，不代表在湿度、温度波动的现场同样好。
- **可解释性要求高。** 工程上不敢用一个「黑箱说该切换了」就切换，需要能解释模型依据了哪些特征。

## 结果与局限（如实记录）

前面写的是**设计思路**，这一段写**实际跑出来什么**——两者必须分开，否则很容易把「想做」记成「做到」。

**已经做到的：**

- 数据清洗与物理量换算链路跑通：理想气体定律换算摩尔流率 → 物料衡算 → 对时间积分得到吸附量 → 除以饱和容量得到饱和度
- 饱和度估算模型完成训练：XGBoost 回归，输入为原始量 + 滚动均值 + 滚动标准差等 **18 维特征**，约 **3 万行**样本

**还没做到的：**

| 环节 | 实际结果 |
| --- | --- |
| 饱和度模型泛化能力 | 按日期切分测试集评估时 **R² 为负**（-3.07），说明模型无法泛化到没见过的实验日 |
| 突破时间预测模型 | **从未训练成功**，直接决定了「自动切换」无法自动触发 |
| 自动切换 | 目前停留在**设计 + 阈值**阶段，未上线 |
| 部分物理参数 | 如吸附剂质量，仍需用实验真值再核对 |

**R² 为负意味着什么？** 它意味着模型的预测误差比「直接猜平均值」还大。一个 R² 为负的模型不是「效果一般」，而是**在当前数据条件下不具备预测能力**。这一步的意义在于：它把问题定住了——瓶颈不在模型选择，而在跨日期的数据分布差异。

## 我做错的地方

一开始我把「物理换算链路跑通」和「模型可用」当成了一件事。链路跑通只证明**流程没有算错**，不证明**模型能预测**。这两件事必须分开验收，否则很容易在汇报里把前者说成后者。

## 一句话总结

**把「预测」接进「控制」才是这个项目的价值，但先要诚实地知道预测到底准不准——一个 R² 为负的模型，最诚实的用法是告诉我们问题在哪，而不是拿来上线。**
`,"../content/notes/claude-agent-sdk-verify.md":`---
title: SDK 字段别猜，实测为准：Claude Agent SDK 四个坑
date: 2026-10-02
tags: [AI, 工程]
summary: 用 Claude Agent SDK 搭 carrot 时踩的四个坑：上下文用量只能在消息循环活着时查、三条压缩阈值配置路径全无效、init 返回里根本没有窗口大小字段。结论就一句——别猜字段行为，写最小探针实测。
---

# 四个坑，一个教训

## 坑一：上下文用量查询有窗口期

查「当前上下文用了多少」，只能在**消息循环活着的时候**查——连接一关再查就抛错。想在会话空闲时轮询用量做余量条，直接炸。

对策：余量数据在每轮消息往来时顺手取走缓存，UI 读缓存，不实时查。

## 坑二：压缩阈值的三条配置路径全无效

想让它在上下文快满时自动压缩，文档里有三条看起来都能配阈值的路——**全都没用**，一条都不生效。最后的行为是它自己决定什么时候压。

对策：接受默认行为，把「手动 /compact」做成一键指令兜底，自动的靠不住就手动的补。

## 坑三：SDK init 返回里没有窗口大小字段

想拿 init 返回值里的窗口大小（历史消息条数之类），**返回对象里根本没有这个字段**。按想象中的字段名写代码，拿到 undefined，还以为是时序问题。

对策：\`console.log\` 整个返回对象看真实结构，有什么用什么。

## 坑四：流式输出的消息 id 会撞车

多个消息块复用同一个 id，按 id 存消息会互相覆盖——这就是改装时期「流式丢块」bug 的根因。修法是按 id 排队对账：同 id 的块按序合并而不是覆盖。

## 教训

这四个坑的共同点：**都是按「应该这样」写代码，而不是按「实际这样」写**。

| 坑 | 想象中 | 实际 |
| --- | --- | --- |
| 用量查询 | 随时能查 | 只在循环活着时 |
| 压缩阈值 | 三条路可配 | 全无效 |
| init 字段 | 有窗口大小 | 没有 |
| 消息 id | 唯一 | 会复用 |

**底层逻辑：用不熟的 SDK，第一步永远是写最小探针把真实行为打出来，而不是读一半文档开始写。**
`,"../content/notes/electron-always-on-top.md":`---
title: 置顶窗口与输入法候选条打架：该高的时候高，该让的时候让
date: 2026-10-02
tags: [工程, macOS]
summary: TO-DO Panel 常驻屏幕顶部必须置顶躲开菜单栏，但置顶层会盖住系统输入法候选条——两个正当需求正面冲突。解法不是二选一，是聚焦时临时降层、失焦立即恢复。
---

# 两个正当需求打架

TO-DO Panel 常驻 macOS 屏幕顶部（嵌在刘海/菜单栏区域），这要求窗口**常驻最高层**——不然会被菜单栏或别的窗口盖住，面板就废了。

但用户要在面板的输入框里打中文。macOS 的输入法候选条是系统窗口，层级比普通窗口高，可**没有普通置顶层高**——面板常驻 \`always-on-top\`，候选条就被自己盖住。打「jiu xiang」，候选条看不见，只能盲选拼音。

一边是「必须置顶」（躲菜单栏），一边是「必须让位」（露出候选条）。**两个都对，冲突是真的。**

## 解法：动态层级

- 输入框**聚焦**时：窗口临时取消置顶 → 候选条浮上来
- **失焦**时：立即恢复置顶 → 面板继续躲菜单栏

「该高的时候高，该让的时候让。」窗口层级不是一个配置项，是一个**状态**。

## 顺手修的另一个层级 bug

同一批还修了日期弹层被圆角规则误裁的 bug——一条 \`border-radius\` 全局规则把弹层的可滚动区域裁到滚不动。这类「全局样式误伤局部组件」的问题，解法是给弹层显式豁免，而不是删全局规则（删了别处就崩）。

## 为什么这个坑值得记

因为它打破了「层级是静态配置」的直觉。桌面应用里凡是和**系统级东西**（菜单栏、输入法、通知、Dock）抢地盘的需求，都要按状态动态让位：

| 场景 | 系统 UI | 应用该做的 |
| --- | --- | --- |
| 全屏面板 | 菜单栏 hover 下拉 | 临时降层或移位 |
| 输入法候选条 | 候选窗 | 聚焦时让位 |
| 通知横幅 | 通知中心 | 不占屏幕右上角 |

**底层逻辑：你的窗口不是世界里唯一的窗口，和系统 UI 共存的正确姿势是动态让位，不是抢占。**
`,"../content/notes/homepage-iteration-log.md":`---
title: 个人主页迭代复盘：V1 → V2 → V3 我改了什么
date: 2026-09-20
tags: [复盘, 项目]
summary: 三个版本分别解决了什么问题——不是重做，而是每一版只针对一个最痛的点。
---

# 三个版本，三次「只解决一个问题」

## V1 · 先跑起来

目标是**能打开、能看到内容**。单页、内联样式、数据写死在模板里。

问题：想改一句自我介绍，要在 HTML 里找半天。

## V2 · 内容与表现分离

把全站文案抽到 \`src/data/site.js\`：

\`\`\`js
export const site = { name: '刘博康', tagline: '计算机科学与技术学生' }
export const projects = [ /* ... */ ]
export const experiences = [ /* ... */ ]
\`\`\`

所有页面从这一份数据里取内容。带来的变化：

- 改文案只动一个文件，不动结构。
- 新增页面不用重复抄一遍个人信息。
- 加了路由，从「一页到底」变成「首页 / 关于 / 知识库 / 联系」。

## V3 · 让它像一件作品

前两版「能用但不好看」。第三版解决的是**观感与气质**，做法是**先定令牌，再改组件**：

\`\`\`css
:root {
  --color-bg: #f2ede2;      /* 暖米白 */
  --color-primary: #3c5468; /* 石板蓝 */
  --color-green: #3e7a4e;   /* 生机绿 */
  --font-display: "Iowan Old Style", "Songti SC", serif;
  --ease: cubic-bezier(0.22, 0.61, 0.36, 1);
}
[data-theme='dark'] {
  --color-bg: #0e120d;
  --color-primary: #a9c6da; /* 深色下要换更亮的主色，否则看不清 */
}
\`\`\`

只改这一处令牌，全站配色跟着变，深色主题也顺手做出来了。

同时加了 5 项动态效果，原则是**全部不引入新依赖**：

| 效果 | 做法 |
|---|---|
| 首屏进场 | 纯 CSS \`@keyframes\` + \`animation-delay\` 错峰 |
| 萤火虫 | JS 生成 22 个 span 的随机参数，CSS 负责动画 |
| 鼠标柔光 | \`mousemove\` + \`requestAnimationFrame\` 写 CSS 变量 |
| 数字滚动 | \`IntersectionObserver\` + rAF 缓动 |
| 区块交错滑入 | 自定义指令 \`v-reveal-stagger\` |

## 我踩过的坑

- **动画选择器全站在 \`:root\` 之外写了一遍**，深色主题下萤火虫直接看不见——教训是：与颜色有关的样式必须走令牌。
- **后台标签页不出动画帧**。调试时用脚本截图，页面不在前台就一直是空白，一度以为代码写错了。
- **打包体积不是越小越好，但重复依赖一定要查**。曾装了一个调试插件，后来发现它把依赖树撑大了一圈，于是卸载并对比构建产物哈希，确认恢复原状才放心。

## 一句话总结

**迭代不是推倒重来，而是每一版只对准当前最痛的那一个问题。**
`,"../content/notes/lighthouse-reflow.md":`---
title: Lighthouse 95 分之路：消掉滚动里的强制回流
date: 2026-10-02
tags: [前端, 性能]
summary: 个人主页 Lighthouse 移动端从 92 提到 95，只做了一件事：把时间线描线动画里每帧都触发的强制回流，改成挂载时缓存一次基准、resize 才重算。
---

# 92 分卡在哪

Lighthouse 移动端跑分：性能 92，无障碍 100，SEO 100。性能项的扣分里有一条很扎眼——**滚动时反复 forced reflow（强制回流）**。

## 定位：描线动画在读布局

主页时间线有一段「描线」动画（路径随滚动逐渐显现），实现是每帧读一次元素位置再更新路径。问题在**读的那一行**：

\`\`\`js
// 每帧都在读布局 → 浏览器被迫立即重排（强制回流）
const top = el.getBoundingClientRect().top
\`\`\`

浏览器本来可以把一帧里的布局读写攒着批量处理，你在两帧之间插进一次「读」，它只能先把之前的写全部重排了再答你。**每帧一次强制回流，滚动全程都在烧性能。**

## 解法：基准缓存

元素位置在滚动中其实**不变**（变的是视口，不是文档坐标）。所以要做的很简单：

1. **挂载时**读一次各元素基准位置，存进 \`timelineBases\`
2. 滚动动画里只读缓存 + \`window.scrollY\` 做运算，不再碰 \`getBoundingClientRect\`
3. 监听 \`resize\`（含移动端地址栏伸缩），重算一次基准

\`\`\`js
// 改后：动画里零布局读取
const progress = (scrollY - base.top) / base.height
\`\`\`

## 结果

- 性能 92 → **95**
- LCP 71 → **80**
- 滚动全程不再出现 forced reflow 记录

## 怎么自己发现这类问题

Chrome DevTools → Performance → 录一段滚动 → 看主线程火焰图里的紫色 **Layout** 条：如果它们成串出现在紫色 Rendering 之间，且都由你的 JS 触发，就是强制回流。修复口诀一句话：

> **读布局的结果能缓存就缓存；一帧之内，读要放在写的前面，或者干脆别读。**
`,"../content/notes/playwright-mcp-pitfalls.md":`---
title: Playwright MCP 三连坑：静默失效、版本错位、socket 路径上限
date: 2026-10-02
tags: [AI, 工程]
summary: 给 carrot 接浏览器能力时，Playwright MCP 的三个坑一个不响全靠日志挖：headless-shell 参数静默回落、chromium 版本错位起不来、macOS unix socket 路径超过 104 字节必挂。
---

# 三个坑，三种失败方式

给 agent 接浏览器（Playwright MCP，22 个工具：导航/点击/截图/快照），本以为是一条命令的事，结果踩了三个坑——而且**失败方式各不相同**，这才是最难排查的原因。

## 坑一：参数静默失效

\`--browser\` 参数写 \`headless-shell\`，不报错、不警告，浏览器照常启动——**但不是你要的那个**。它静默回落到了默认浏览器。你以为在测 headless-shell，实际测的是 chromium。

对策：启动后主动查版本/类型，确认跑的真的是你指定的东西。**「没报错」不等于「生效了」。**

## 坑二：版本错位起不来

\`--browser chromium\` 要的是完整版 1247，机器上没装就是**起不来**。这个至少有报错，但报错信息不会直接告诉你「装 1247 就行」——要对着报错里的版本号去翻它到底要哪个。

对策：装之前先查清楚 MCP 期望的版本号，版本对齐再启动。

## 坑三：macOS unix socket 路径上限 104 字节

最隐蔽的一个。macOS 的 unix socket 路径有 **104 字节硬上限**，而 Playwright 默认的临时目录路径是 115 字节——**必挂**，且报错完全看不出和路径长度有关。

对策：显式指定一个短的 socket 目录（比如 \`~/.pw-mcp/\`），别用默认深路径。

## 为什么三个坑要一起记

| 坑 | 失败方式 | 排查手段 |
| --- | --- | --- |
| headless-shell | 静默回落，无报错 | 启动后主动验证 |
| chromium 版本 | 启动失败，报错绕弯 | 查报错里的版本号 |
| socket 路径 | 挂，报错与根因无关 | 缩短显式路径 |

单看每一个都是小坑，连着踩的时候会严重怀疑人生。**这类「环境三连坑」的通用解法只有一个：一条一条看日志，别相信「应该没问题」。**
`,"../content/notes/project-based-learning-mvp.md":`---
title: 项目制学习：先跑起来，再打磨
date: 2026-09-10
tags: [方法论, 项目]
summary: 把大目标拆成小迭代：需求 → 最小可用版本 → 真实反馈 → 改进。以及为什么一定要写下来。
---

# MVP：最小可用版本

**MVP（Minimum Viable Product）** 指能验证核心想法的最小版本 —— 不是「做一半的半成品」，而是**刻意只保留最关键的那条路径**。

以我自己的主页为例：

| 版本 | 只解决一个问题 | 结果 |
|---|---|---|
| V1 | 能看到内容 | 能打开，但改文案很痛苦 |
| V2 | 内容与结构分离 | 改一处，全站生效 |
| V3 | 观感与气质 | 像一件作品 |

如果一开始就想着「一次做到 V3」，大概率做不完，也做不好。

## 我总结的四步

1. **把想法写成一句话问题。** 不是「我要做个主页」，而是「我要让招聘方 30 秒内知道我会什么」。
2. **划出最小路径。** 达到这个目标最少需要哪几屏？其余全部砍掉。
3. **跑起来给人看。** 自己觉得好不算数，要拿给真实的人用。
4. **记录决策。** 每一次「为什么这么改」都写下来，否则三个月后自己都想不起来。

## 为什么「记录」比想象中重要

- 做复盘时，只记得结果，记不得当时的取舍依据，等于白做。
- 课程和团队协作里，**过程证据**和最终成品同样被看重。
- 把「踩过的坑」写下来，下次能直接跳过。

我现在固定维护两份记录：

- **AI 协作日志**：每次让 AI 做了什么、它哪里说得不对、我怎么改的。
- **测试与验收记录**：每轮改动之后，实际测了哪些、结果如何。

## 关于用 AI 的一条心得

AI 最擅长的是**给起点**，不是**给终点**。
它给的第一版往往「看起来对」，但边界情况、和现有代码的冲突、性能与可访问性这些地方，需要自己一项项去核对。

我的做法是：**先让它解释打算怎么做，再决定要不要让它动手。**
这样既省时间，也不会在不知不觉中接管了自己的判断。

## 一句话总结

**先跑起来，再打磨；每一步的「为什么」都要写下来——成品决定分数，过程记录决定你是不是真的会了。**
`,"../content/notes/reading-bei-taoyan.md":`---
title: 读书笔记 ·《被讨厌的勇气》：自我整合五条
date: 2024-11-19
tags: [读书笔记, 阿德勒, 心理学]
summary: 阿德勒思想入门。核心是课题分离——"这是谁的课题？"这一个问题就挡掉了一半的内耗。
category: reading
---

# 《被讨厌的勇气》：自我整合五条

> **摘要**：11 月 19 日读的阿德勒。读完提炼了"自我整合理论"五条：自我接纳、目的论、活在当下、视他人为与自我一样的个体、课题分离。影响最大的是课题分离——分清"这是谁的课题"，别人怎么评价我是别人的课题，这一条后来成了我挡内耗的第一道闸。

## 笔记原文

**11 月 19 日 读《被讨厌的勇气》——阿德勒思想**（长段感悟）

自我整合理论：
1. 自我接纳
2. 目的论
3. 活在当下
4. 视他人为与自我一样的个体
5. 课题分离思想
`,"../content/notes/reading-fancuirui.md":`---
title: 读书笔记 ·《反脆弱》：从波动中受益
date: 2025-04-23
tags: [读书笔记, 塔勒布, 思维模型, 风险]
summary: 16 条笔记：过度补偿、杠铃策略、凸性、否定法、林迪效应——读完开始有意识地"保留选择权、拥抱波动"。
category: reading
---

# 《反脆弱》：从波动中受益

> **摘要**：4 月 23 日开读塔勒布（上一本《幸福的勇气》结尾刚立过 flag 要读它）。16 条笔记里最有用的是四件事：过度补偿——小的压力和噪声让人更强；杠铃策略——80% 极稳 + 20% 极险，避开中间态；凸性——先看"错了亏多少、对了赚多少"，再看概率；否定法——好，主要是因为缺乏坏。读完开始有意识地保留选择权、主动拥抱波动。

## 笔记原文

**4 月 23 日 读《反脆弱》——纳西姆·尼古拉斯·塔勒布 Nassim Nicholas Taleb**

1. 噪声效应（speech、听众——利用好"过度补偿"机制）
2. 成功的另类启发（"我的儿子，我对你很失望……"——fatal 与过度补偿）
3. 极端斯坦 & 平均斯坦及其局限性（配两幅手绘波动曲线对比图，纵轴过程、横轴时间，标注"平均""极端"，并注"开始干预"）
4. 医源性损伤：治疗益处低于其损害的情况（分 3 小点）
5. 拖延传递的信息

6. 斯多葛主义的主旨——驯化情绪（"记账"；每天一大早假设今天最糟糕的事已经发生，then the rest of the day will be better）
7. 杠铃式解决方案——双峰策略，类似 28 法则（80% 投入稳定低风险，20% 投入高风险无限回报；配风险-回报手绘图）
8. 泰勒斯甜葡萄的选择性（idea）

（红字：上面为前三卷的内容整合）

（补注上本书《穷查理宝典》的羊群效应条目：可能会使人们的选择性变少……④ 尾部效应 ⑤ 理性选择）

9. 格兰杰原因
10. 绿色木材谬误（理论常脱于实践；eg 喷气式飞机先被创造出来，后才有相关理论；idea：学徒制的传承模式 > 理论式学习）
11. 简单，但不要过于优化（eg 机场过于优化，航班一旦延误造成连锁经济损失；反脆弱→脆弱，正凸性→反凸性）
12. 人们不是为生活而学习，只是为了学习而学习
13. 调整自己的风险敞口，是关注结果而非概率的真假之上

14. 凹凸效应（正反凸效应）与线性关系（配三幅手绘利-损坐标图：凸型"利大于弊"、凹型"弊大于利"、线型"平均"）（红字批注：炼金石 / 反炼金石）
15. 否定法 [好，主要是因为缺乏坏的缘故]（做减法）
    - ② 越活越年轻：林迪效应——i 对于会自然消亡的事物……越活越老；ii 对于不会自然消亡的事物……越活越年轻。explanation：如果一本书已发行了 40 年……
    - 启发：建议多去读那些存在了百年以上的书籍/思想，喝存在千年以上的饮品：水、葡萄酒、咖啡
    - ③ 人们将被迫重视能世代流传、能幸存下来的东西，未来大多数存在过去之中
    - ④ 新事物狂热症与"跑步机效应"
    - ⑤ 城市或政府等系统：自上而下的效应与自下而上的逐步演进（分形结构——杂乱、富含细节，但是遵循一定规律与模式）
    - ⑥ Taleb 提到草食动物与食肉动物饮食习惯的对比，作为杂食动物的人类应随机摄取蛋白质（随机进食；开启身体自我消耗模式，以防现代病；或许早餐并不能带来什么好处）

16. 预测 & 行动（心口合一）
    - ① 人们不该听信任何"专家""教授"所谓的预测，而应该去关注他们切身是如何做的，即行动
    - ② 以投资为例：不要询问任何人的意见、预测或建议，只要问他们的投资组合中有什么或者没有什么就行
    - ③ 启发：
      [1] 不要去购买/相信任何需要宣传的事，而是间接地，通过口碑相传的
      [2] 不要相信一个没有自由的人的话。而自由，不是指财富自由等，而是种生活状态；谁有自主意见，谁就是自由的……工作对他们来说是可做可不做的，更像是一种爱好
      [3] 判断人们言语的真实意图的方法：询问他人或其自己，这个人从他的论点中是否能获得任何利益。若是想的，则可以不用费神去与之辩论，因为其的话对我自己毫无价值，只是胡言乱语罢了
`,"../content/notes/reading-fubaba.md":`---
title: 读书笔记 ·《富爸爸穷爸爸》：七处书页批注
date: 2025-12
tags: [读书笔记, 财商, 批注]
summary: 第一本直接写在书上的书——从 p63 到 p264 七处红笔批注：事业 vs 职业、守财与赚钱的上下线、经验最重要。
category: reading
---

# 《富爸爸穷爸爸》：七处书页批注

> **摘要**：第一本直接在书页上写批注的书（罗伯特·清崎著，四川人民出版社财商教育版）。从 p63 的连环画阅览室到 p264 的六条心法，七处批注串起来就是我的财商启蒙：事业与职业的区分（事业=真正有思想的方向）、守财决定下线赚钱决定上线、富人与工薪族"挣钱-支出-缴税"的顺序差、以及"总之，经验最重要"。p264 那页还把芒格的双线思维和 DDL 压力都写进了同一张清单。

## 笔记原文（书页批注，按页码）

**〔书籍信息〕**《富爸爸 穷爸爸》，[美] 罗伯特·清崎 著，萧明 译，四川人民出版社，富爸爸投资理财系列·财商教育版

**p63（连环画阅览室一段：生意开张 3 个月被小流氓盯上而关张，"我们已经学会怎样让钱为我所用"）**

① 理性的果断 => 抓住机会，放手去做（短时）/ 审视的过程（长时）——（竖写：理性辨别）
② 创新：旧的模式 + 应地应时地改善
③ 看透自己"贪婪"与"恐惧"的根本原因，并跳脱"惯性的飞轮"来思考对策（comprehensive sight）
④ 跳脱 eg 连环画 => 书屋

**（章扉页，无页码）**

① 守财 => 决定个人的财富下线；赚钱 => 决定个人的财富上线

**p130-131（"冲动用贷款买新车或其他奢侈品……投资并创建自己的事业之后，迎接富人的最大秘密"）**

事业 => 真正有思想的方向；职业 => 工作

**p156（小结：拥有公司的富人 1.挣钱 2.支出 3.缴税 vs 为钱工作的人 1.挣钱 2.缴税 3.支出）**

① 会计 => 学会读财报；法律 => 学会合理使用政策
② 税收正因人性驱使而开始大肆收取中产阶层人的工资。但注意，在中国，富人们所做的偷漏税操作会带来更多的风险

**p198（"风险总是无处不在，要……而别总想回避风险"）**

① 了解市场，你要知道手上的东西的认可度是多少，即它在市场的平均价值在何区间
solution：i 切身作为消费者来了解行情 ii 找相关懂行的人来判断（要可靠）iii 在交易中不断获得基础经验
（竖写：总之，经验最重要）
② 拥有一份自信的勇气，面子皆为后话，只要判断出结果的最坏程度不会影响正常生活，那就大胆地去干

**p228-229（"我同时受到两个爸爸的影响……陈旧的教育体系应该对这一差距的加大负有重要责任"）**

① 做工作的目地，学习：i 管理员工的能力 ii 搭建完整流水线的能力 iii 销售所代表的口才能力
② 专业，但不能专业固化，你要掌握更多新能力、新视角、新经验

**p264（"财经领域的大部分人只不过像二手车推销员……找一位本领域的专家或是一本相关的书，马上开始教育自己"）**

1. 不要害怕失败 = 成功
2. 不要愤世嫉俗 Instead，运用查理·芒格的双线思维：理性/感性 双验证
3. 克服懒惰与逃避，不要以忙碌作借口，要正面解决、应对问题
4. Motivation { dream life => 理想、可望；hand-made pressure => DDL 压力等 }
5. 克服不良的作习与习惯
6. 停止自负，适当自信
`,"../content/notes/reading-how-to-read.md":`---
title: 读「如何阅读」视频：四个方法
date: 2025-05-18
tags: [读书笔记, 阅读方法, 费曼学习法]
summary: 记者式阅读、限制字数总结、综合性阅读、输出分享——四招把"读过"变成"学会"。
category: reading
---

# 读「如何阅读」视频：四个方法

> **摘要**：5 月 18 日看了一个讲如何阅读的视频，记了四招：记者式阅读（带着怀疑看书，读完查证）；用限制字数做总结（每章 40 字、一本书 140 字内）；综合性阅读（同领域多本书并行，保持兴趣、视野全面）；以及费曼式的输出——用自己的语言写下来并分享。这份笔记本身就在用第 ④ 招。

## 笔记原文

**5/18 日 读有关如何阅读的视频**

① 记者式阅读，带着怀疑去看书，并在完毕后察阅、解决（未解决的疑惑）[可以使用夸克的 AI 来搜索]

② 用限制字数来总结（eg 每章 40 字，一本书 140 字内）

③ 综合性阅读，一次开启多本同样领域/话题的书（① 保持兴趣 ② 视野更为全面）
SYN 费曼学习法（能构成自己的知识）

④ 进行输出（用自己的语言），出现分歧时（无分歧时也要），并进行分享等（积累 followers & 经验）
`,"../content/notes/reading-jiazhi-xinxinfa.md":`---
title: 读书笔记 ·《价值心法》：自身就可以成为一个公司
date: 2024-10
tags: [读书笔记, 方法论, 自我管理]
summary: 我的思想启蒙书。读完设计出"自身 1.0"——五大系统、七条指导思想、五个日常模块，外加两笔交过学费的反思记录。
category: reading
---

# 《价值心法》：自身就可以成为一个公司 1.0

> **摘要**：我的思想启蒙书。它让我第一次意识到一个人可以像经营公司一样经营自己，读完我给自己设计了一整套"公司架构"——五个系统、七条指导思想、五个日常模块，并用两次真实的"学费事件"做了第一轮复盘。之后读的纳瓦尔、阿德勒、芒格，都是在给这套系统打补丁。

## 笔记原文

**自身就可以成为一个公司 1.0**

**一、系统**

（反思系统——红笔）
1. 观想法
2. 重新识别推导
3. 寻找已有可借鉴的解决方法
4. 找对比，反思重构
5. 利用计划系统重新试验，获得反馈

（自学系统）
课内——6 步
课外——7 步
（笔记要点：利用计划系统、练习书、AI、输出讲课录音等）

（计划系统）
1. 明确目标
2. 列举方法
3. 剃刀和 KISS 原则保留主要部分
4. 二八法则挑出最关键的 20%
5. 划分时间
6. 运行
7. 定期用反思系统自查调整

（判断系统）
先不做出任何评价，保持静默 → 识别对方观点与理由 → 思考三方面问题 → 不断追问 →（经得起推敲 / 经不起推敲）→ 得出暂时评价 → 定期反思、重新推敲

（提取/收集系统）
- 思维：
- idea：

**二、指导思想**

1. IPO（Input → Process → Output）
2. KISS 和剃刀原则（如不必要勿增实体，keep it simple, stupid）
3. B=MAP（行为 = 动机 × 能力 × 提示）
4. PDCA 循环
5. OODA 循环
6. 第一性原理
7. 二八法则

**三、模块**

1. 睡觉区块：10:50 睡 6:20 起；10:30 后禁止使用电子设备；6:40 到班
2. 背单词区块：每日 30 分钟，6:40~7:10
3. 饭澡 50 分钟：吃饭 15min、洗澡 35min
4. 复习区块：每日 9:40 晚复习昨天知识点和错题；每周日晚第二节晚修复习本周错题知识点
5. 阅读运动：每日读满 20min 书；每日至少 15min 运动

**四、反思记录**

事件 ① 高二上数学建模大赛（2024.11.4）
学费：花了大量时间，几乎 80% 都是自己所写的。
反思：要学会利用 AI（杠杆）的力量。

事件 ② 纪中校庆 90 周年宣传片拍摄（2024.10.19 / 2024.11.3）
学费：浪费了大量时间精力，没有特写在宣传片（即仅为群演）。
反思：要学会去争取自己的机会，无论结果如何。
`,"../content/notes/reading-jiyinzu.md":`---
title: 读书笔记 ·《基因组·生命之书23章》：进化没有目的，只有权衡
date: 2025-03-15
tags: [读书笔记, 科普, 基因, 进化]
summary: 马特·里德利把 23 条染色体写成 23 个故事。垃圾 DNA 有用、疾病塑造基因多样性——进化不完美，全是 trade-off。
category: reading
---

# 《基因组·生命之书23章》：进化没有目的，只有权衡

> **摘要**：3 月 15 日起读的马特·里德利。最颠覆直觉的两点：一，"垃圾 DNA"并不垃圾——假基因、转座子这些"无意义片段"反过来给了我们基因指纹、亲子鉴定、HIV 追踪；二，疾病参与了自然选择——地中海贫血的基因变体是抗疟疾换来的。读完的感受：进化没有蓝图，每一处"设计"都是当时环境下的妥协方案。

## 笔记原文

**3 月 15 日 读《基因组·生命之书23章》——马特·里德利**

- 人类 23 条染色体与猿类 24 条的区别
- 2 号染色体融合
- 亨廷顿舞蹈症病因：CAG 重复、蛋白质块积累、细胞凋亡、发病提前现象

（续）
- ③ 科学是不断建立假说并检验的过程
- ④ 智商是否天生的讨论（受基因与环境影响）
- ⑤ 人类天生语言本能与"敏感期"
- ⑥ X、Y 性别拮抗基因竞争（精液蛋白、胎盘父方基因控制、果蝇实验）
- ⑦ 每种生物 DNA 中存在大量无意义片段

（续）
- 假基因、逆转录假基因、卫星序列、转座子等"垃圾 DNA"及其危害与应用（基因指纹、亲子鉴定、HIV 例）
- ⑧ 疾病导致自然选择的基因变体（ABO 血型、地中海贫血与抗疟疾）
- ⑨ 人类基因组因寄生物压力波动
- 选择基因最不相像的伴侣（腋汗味例）
`,"../content/notes/reading-nawal.md":`---
title: 读书笔记 ·《纳瓦尔宝典》：财富与幸福都是可以学的技能
date: 2024-11-06
tags: [读书笔记, 财富, 幸福, 习惯]
summary: 三天读两章：财富章记住三大杠杆和"财富是生产线"；幸福章直接抄成了习惯清单——饮食、运动、冥想、行动。
category: reading
---

# 《纳瓦尔宝典》：财富与幸福都是可以学的技能

> **摘要**：11 月 6 日到 8 日读了第一章「财富」和第二章「幸福感」。财富章记住了三大杠杆、给自己定较高时薪、"财富是生产线而非产品"；幸福章更实用——改变习惯的步骤、饮食原则、运动、冥想，直接被我抄成了行动清单。最狠的一句：一切"我要"都是借口，只有行动才是最好的证明。

## 笔记原文

**11 月 6 日 读《纳瓦尔宝典》第一章 财富 · 积累财富**

- 做什么、和谁一起做、什么时候做
- 定较高的时薪
- 财富是生产线而非产品
- 三大杠杆：劳动力杠杆、资本杠杆、复制零成本的杠杆

**11 月 7 日 读《纳瓦尔宝典》第一章 财富 · 第二节 判断力**（记了 2 条要点）

**11 月 8 日 读《纳瓦尔宝典》第二章 幸福感（学习幸福、自我救赎）**

- 改变习惯的步骤
- 饮食原则：食物加工程度越深，越少摄入
- 坚持运动
- 冥想
- 不要将以后，一切"我要"都是借口，只有行动才是最好证明
- 广泛阅读
- 掌握说服能力（演讲、销售）与数学技能

7. 他人的快乐与对自己的期望都是他们的问题，不要把压力焦虑给到自己
`,"../content/notes/reading-qiongchali.md":`---
title: 读书笔记 ·《穷查理宝典》：误判心理学 22 条
date: 2025-02-20
tags: [读书笔记, 芒格, 思维模型, 心理学]
summary: 读了三周：双轨思考、痛苦清单、能力圈，最后把误判心理学 22 条全部抄了一遍——"一个人想要什么，就会相信什么"。
category: reading
---

# 《穷查理宝典》：误判心理学 22 条

> **摘要**：2 月 20 日开始读、读到 3 月 12 日，是读得最久、抄得最多的一本。芒格的核心武器是双轨思考（第一性原理推理 + 心理误判排查）和能力圈。我把第十一讲"人类误判心理学"的 22 条倾向全抄了一遍——现在遇到自己"特别想信"什么的时刻，会先扫一遍这张清单。最喜欢的一句："别愚弄你自己，记住，你是最容易被自己愚弄的人。"

## 笔记原文

**2 月 20 日 读《穷查理宝典》——查理·芒格**

- 西塞罗 3 点
- 借东西的细节
- Lollapalooza 效应
- 双轨思考模型：第一性原则 + 心理误导误判
- "别愚弄你自己，记住，你是最容易被自己愚弄的人"
- 诚信待人
- "能力会让你到达巅峰，但只有高品德才能让你留在那里"

**3 月 5 日 续 1**

痛苦清单：
- [卡森版] 化学物质、妒忌、怨恨
- [查理版] 反复无常、只从自身吸收教训、一蹶不振、不要反向思考

- 采购防误判
- 沃尔玛策略
- 选择良好竞争环境行业（麦片、opp、航空）
- 不超过能力圈
- 删除"补偿"的思考（工伤补偿被等量瓜分分析）
- 海军赏罚制度案例（"as a result of increasing the captain's attention"）
- 创造妇孺皆知品牌：操作性条件反射、巴甫洛夫条件反射、可乐广告联想例子、保持品牌权威性、避免轻易创造新口味

**3 月 10 日 读《穷查理宝典》 误判心理学**

1. 奖励和惩罚超级反应倾向
2. 喜欢/热爱倾向（讨厌/憎恨倾向）
3. 避免长时思考倾向与压力影响倾向
4. 避免不一致性倾向与社会认可倾向（羊群效应）
5. 好奇心倾向
6. 艳羡/妒忌倾向
7. 回馈倾向
8. 受简单联想影响的倾向
9. 简单的避免痛苦的心理否认倾向
10. 自视过高的倾向
11. 过度乐观倾向（"一个人想要什么，就会相信什么"）
12. 被剥夺超级反应倾向
13. 错误对比反应倾向
14. 压力影响倾向
15. 错误衡量易得性倾向
16. 不用就忘倾向（Use it or lose it）
17. 衰老—错误影响倾向
18. 权威—错误影响倾向（权威实验、启示）
19. 废话倾向
20. 重视理由倾向
21. Lollapalooza 影响（1+1>2 的效果）
22. 自我服务偏好（like 自视过高）

**3 月 12 日 读《穷查理宝典》**

- 自怜于事无补
- "如果你想要说服别人，就要投其所好，动之以利，而非晓之以理"——本杰明·富兰克林
- 将不平等最大化
`,"../content/notes/reading-renwen-jingdian.md":`---
title: 读书笔记 ·《人文经典·人文思想卷》：关于死亡的第一次长想
date: 2024-10-31
tags: [读书笔记, 哲学, 随笔]
summary: 第一篇不摘抄、纯想问题的笔记：死亡赋予人生意义吗？写完还和同学续了一轮讨论。
category: reading
---

# 《人文经典·人文思想卷》：关于死亡的第一次长想

> **摘要**：第一篇不是摘抄、而是整段思辨的笔记。从"死亡赋予人生意义"写起，到我不相信死后的另一个世界、但认同爱因斯坦的想法，再到"我心中的'神'"与人道主义。从这时起，读书笔记对我来说开始是用来想问题的，不只是存资料。

## 笔记原文

**10 月 31 日 读《人文经典·人文思想卷》 哲学**

（长段随笔，讨论死亡如何赋予人生意义……）

[死亡的思考]

（红笔）续篇：[后续与同学所讨论……如何解释]

我不太相信，人死后会有另一个世界存在……但我十分认同爱因斯坦的想法……

[我心中的"神"]
[人道主义的思考]

> 注：两处长段随笔为手写原文，图片提取未能逐字还原，此处保留其主题、关键句与原文自带的方括号标签。
`,"../content/notes/reading-shangjie-shaonian.md":`---
title: 《商界少年》摘抄：写下来的力量
date: 2025-12-07
tags: [读书笔记, 写作, 复盘]
summary: 出问题就把经过和感受一五一十写下来，不用修改不用检查——把感性脑转化成理性脑，再回答两个问题。
category: reading
---

# 《商界少年》摘抄：写下来的力量

> **摘要**：12 月 7 日从《商界少年》7 月刊摘的一段，原出自《认知驱动》。方法很朴素：生活出了问题，就拿笔把事件经过、自己的感受、为什么会有这种感受一五一十写下来——不修改、不检查、不管语法句式。目的是把极端的感性脑转化成理性脑，写完再回答两个问题：这件事为什么会发生？我能从中汲取什么教训？这份手写笔记的存在本身，就是这条方法在起作用的证据。

## 笔记原文

**2025/12/07 商界少年 7 月刊 [写下来的力量]**

一旦你的生活出现了问题，就拿出笔和纸把事件的经过、自己的感受、为什么会有这样的感受，一五一十地写下来，过程中不用修改、不用检查，更不用管语法或句式对不对，只要放手去写就好了。

目的：将极端的感性脑转化成理性脑 [Compose yourself and find meaning]

同时要回答自己两个问题：
① 这件事为什么会发生？
② 我能从中汲取什么教训？

——摘自《认知驱动：做成一件对他人很有用的事》
`,"../content/notes/reading-siduoge.md":`---
title: 读书笔记 ·《像哲学家一样生活》：斯多葛哲学的生活艺术
date: 2025-05-16
tags: [读书笔记, 哲学, 斯多葛]
summary: 五个心理技巧（消极想象/三分法/宿命论/体验贫穷/自我反省）+ 12 条忠告——最后一条是 Do-it-yourself，形成自己的斯多葛主义。
category: reading
---

# 《像哲学家一样生活》：斯多葛哲学的生活艺术

> **摘要**：5 月 16 日读完的 William B. Irvine。最有用的是五个心理技巧：消极想象（对冲享乐适应）、三分法（完全可控/部分可控/完全不可控——配了句红笔批注"将目标由结果导向转为过程导向"）、宿命论（只对过去和现在，不对未来）、体验贫穷（自寻不适）、定期自我反省。12 条忠告的最后一条是这本书真正想说的：斯多葛主义是个工具，人人都该形成自己的版本。

## 笔记原文

**2025/5/16 读完《像哲学家一样生活·斯多葛哲学的生活艺术》William B. Irvine**

**一、stoic 哲学的历史**

希腊 → 罗马（传播脉络图）。罗马时期四大优秀斯多葛主义哲学家：塞涅卡、墨索尼亚斯·鲁弗斯、爱比克泰德、马可·奥勒留。

**二、斯多葛主义的心理技巧**

① 消极想象：时不时、定期（但不一直）地思考失去自己所拥有的事物的场景——[1] 用来保持对所拥有事物的欲望，即对冲享乐适应；[2] 用来在失去时减少痛苦。

② 三分法：将日常事物分成三种类型——[1] 自我完全可以控制的；[2] 自我可以控制但不能决定其最终结果的；[3] 自我完全不能控制的。
（红笔批注：将目标由结果导向转为自己本身可决定的过程导向）

③ 宿命论：[1] 对于过去 & 现在（此时此刻）以宿命论面对……[2] 但同时，不要对未来运用宿命论，因为未来仍是有无限可能的，需要我们积极改变。

④ 体验贫穷：不仅要进行消极想象，更要去体验那些消极，即便使坏事发生（自寻不适）。

⑤ 定期自我反省（eg 用洗澡、睡前的时间反省自我的行为）。

**三、一些忠告**

① 人的作用就是要为其他人类去做些什么，有一定的社会责任
② 在对其他人的缺点产生厌恶之情时要记住自己也毫无疑问会有各种缺点
③ 抑制自己对他人的想法
④ 当难以控制自己欲望时可以去想象构成其的本质
⑤ 任何所谓的侮辱都是自己心中的判断……以沉默或自嘲式幽默回应
⑥ 斯多葛主义者也会有悲伤、愤怒等消极情绪，但不要过度，要将悲伤最小化
⑦ 反向思考……头脑自然便会优币驱逐劣币
⑧ 在怒火真的发生且对他人造成影响时，一定要及时摆脱出来，并用"道歉"来弥补
⑨ 不要在意自己的名声
⑩ 可以拥有并享有财富与名利，但不能执着其中……当成一种工具而非目标
⑪ 三步法：[1] 尽情享受那些你完全可控的事物带来的快乐；[2] 可以享受那些不能完全可控的事，但亦要做好失去的准备；[3] 使自己拥有在简单易得事物中获得享受与快乐的能力
⑫ 最后，Do-it-yourself！斯多葛主义是一种工具，但人人都该形成自己的 stoic 主义（eg 婚姻学）
`,"../content/notes/reading-xingfu.md":`---
title: 读书笔记 ·《幸福的勇气》：先去爱，是自立的动词形态
date: 2024-11-19
tags: [读书笔记, 阿德勒, 心理学, 教育]
summary: 《被讨厌的勇气》续篇。问题行为五阶段像看人的 X 光片；"先去爱了他人才可能被爱"——爱不是运气是动作。
category: reading
---

# 《幸福的勇气》：先去爱，是自立的动词形态

> **摘要**：同一天接着读的续篇。三样东西留到了今天：问题行为五阶段（称赞的要求→引起关注→权力争斗→复仇→证明无能），像看人行为背后的 X 光片；横向关系——表扬和批评都是纵向操控；以及"爱是自立的方法"——先去爱了，他人才可能爱你，爱是动作不是运气。读完把下一本书定为《反脆弱》。

## 笔记原文

**11 月 19 日 读《幸福的勇气》——阿德勒思想**

人背后的问题五阶段：
1. 称赞的要求
2. 引起关注
3. 权力争斗
4. 复仇
5. 证明无能

- 课题分离
- 民主推举规则
- 横向关系
- 无为而治

（续页）
- 爱是自立的方法
- "先去爱了，他人才可能爱你"
- 保持单纯、"接纳自我"、"他者信赖"、"他者贡献"
`,"../content/notes/supervised-learning-lightgbm.md":`---
title: 监督学习入门：从「预测」到 LightGBM 量化模型
date: 2026-09-15
tags: [AI, 机器学习]
summary: 监督学习的本质是有标签数据上学一个映射；用它做股票预测时，真正难的不是模型，而是特征与评估。
---

# 监督学习是什么

用一句话说：**给你一堆「输入 → 正确答案」的例子，让机器学会自己给出答案。**

- **监督学习**：数据带标签。学的是映射 \`f(输入) = 输出\`。
  - 输出是类别 → 分类（垃圾邮件 / 非垃圾邮件）
  - 输出是数值 → 回归（明天涨多少）
- **无监督学习**：数据没有标签，让机器自己找结构（聚类、降维）。

我的股票量化项目属于**监督学习 + 回归/分类**。

## 项目实际做法

\`\`\`
历史行情数据
  ↓ 特征工程
技术指标、量价特征、滞后收益……
  ↓ 训练
LightGBM（梯度提升决策树）
  ↓ 输出
上涨 / 下跌 的概率
\`\`\`

选 LightGBM 的理由很朴素：

- 表格数据上表现稳定，不需要太多调参运气。
- 训练快，能反复做特征迭代。
- 自带特征重要性，能反过来检查「模型到底在看什么」。

## 真正难的地方

1. **特征比模型重要。** 换模型提升有限，换一组有信息量的特征提升明显。
2. **必须防「未来函数」。** 用到了当时还不可能知道的信息，回测会好得离谱，实盘立刻现原形。
3. **回测要分样本外。** 我只在训练集上调参，最终结果看的是没参与训练的时段。
4. **回测好 ≠ 能赚钱。** 还要算交易成本、滑点、冲击成本。

我的回测跑过 **112.74% 总收益**，但我给自己写了一条硬规矩：**这个数字必须带着口径一起出现**，否则就是误导。

## 口径修正：112.74% 到底是什么意思

这个数字第一次写下来的时候，我只写了结果，没写条件。后来把条件补全之后，它的含义才真正清楚：

| 项目 | 数值 |
| --- | --- |
| 模型 | LightGBM **回归**（调参版本） |
| 选股数量 | 50 只 |
| 调仓频率 | 每 5 个交易日 |
| 回测区间 | 2025-01-01 ~ 2026-08-14 |
| 策略总收益 | 112.74% |
| 同期基准 | 46.57% |
| 超额收益 | 66.17% |
| 最大回撤 | -10.02% |

同一套代码里还有一个**分类版本**（预测涨 / 不涨），它和这条曲线的成绩**不是一回事**，不能混着说。

更值得记下来的是另一组数字：我另外跑过一个**传统规则策略**（小市值 + 低波动 + 反转），它的完整结果以 JSON 落盘、可复现——区间收益 **16.85%**，而同期基准是 **44.93%**，**超额 -28.08%**。

也就是说：在同一个区间里，**规则策略其实跑输了大盘 28 个百分点**。这个「不好看」的数字比 112.74% 更有信息量，因为它说明基准很强，而机器学习策略的超额收益并不是随手就能拿到的。

## 这个数字不能怎么用

1. **不能说「我的策略能赚 112%」**——它是特定区间、特定口径下的回测结果。
2. **不能说「已经验证有效」**——模拟盘尚未产生真实交易，**没有任何实盘验证**。
3. **不能说「这就是模型能力」**——它只在截图里留存，仓库里没有可复现的结果文件，换个机器要重跑才能重算。
4. **过拟合与幸存者偏差都没有排除干净**，回测的高收益不能当作未来预期。

## 一句话总结

**监督学习 = 有标签数据上学映射；工程上七成精力花在特征和评估的严谨性上，模型只是最后那一步。而一个数字如果不带口径，它就不是结论，只是噪音。**
`,"../content/notes/third-party-app-modding.md":`---
title: 二次开发的边界：改别人的软件，什么能做、什么不能做
date: 2026-09-22
tags: [工程, 合规, 方法论]
summary: 我有两个项目是改别人的软件。这篇笔记把边界写清楚：哪些话能说、哪些不能，以及技术上怎么改才算负责任。
---

# 先说清楚，再动手

我手上两个项目都是在**别人的软件**上做改造：

- **TO-DO Panel**：上游是 xiaopu-ai 开发的开源项目，MIT 许可
- **Claude Code 桌面版**：上游是一款第三方的成品桌面应用

这两件事在技术上都是正当的，但**说法上必须准确**。这篇笔记就是给我自己划的线。

## 说法上的三条线

| 能说 | 不能说 |
| --- | --- |
| 「我在 X 的基础上做了本地二次开发」 | 「我开发了 X」 |
| 「我加了 Y 功能、修了 Z 的缺陷」 | 「这个应用是我做的」 |
| 「上游是某开源项目（MIT 许可）」 | 省略上游来源，让人以为原创 |

**判断标准很简单：一个不了解情况的人看完之后，会不会误以为这个软件是我从零做的？** 会，就是表述有问题。

尤其注意：**开源不等于可以随便拿去声称是自己的**。MIT 许可允许你修改和分发，但「允许使用」和「可以声称原创」是两回事。

## 技术上怎么改才算负责任

### 一、搞清楚许可

- MIT / Apache 2.0：可以改、可以分发（Apache 2.0 还要求保留声明）
- **没有许可证的代码，默认是不允许分发的**
- 只在自己机器上用，和公开发布，是完全不同的两件事

我遇到过一个情况：想改的应用在工作目录里**找不到 LICENSE 文件**。找不到就不假设，只在自己机器上用，公开场合只说「本地二次开发」。

### 二、不改上游，用补丁

我的做法是**不修改上游源码文件**，而是把改动做成可以重复施加的补丁/注入，并记录清楚改了什么。原因：

- 上游更新时，改动可以重新打一遍，而不用手工去比对几千行差异
- 想回滚的时候，直接回到上游原版
- 改动清单本身就是文档，能说清我到底做了什么

### 三、改之前先备份，改之后必须验证

这是硬规矩。改任何别人的东西之前：

1. **备份原始文件**（我习惯连文件名都带上时间戳）
2. **改完做语法检查**（至少保证不是低级错误）
3. **跑一遍测试**（有测试就跑，没有就手工走一遍主流程）
4. **做端到端验证**（不是「应该好了」，而是真的打开来看过）

### 四、遇到「必须重新签名」这类平台限制

改 macOS 应用会碰到签名问题。踩过的坑：**Electron 应用改完必须由内到外逐层重签，还要带上 entitlements**。只签外层会导致里面的框架身份不一致，系统直接拒绝加载，应用打不开——而且用「深度签名」的偷懒做法并不管用。

后来想明白了更省事的思路：**如果只改 JavaScript 资源，根本不需要重签。** 先判断「这次改动的性质是什么」，再决定要不要动签名——这比一上来就重签省事得多。

## 我学到的

改别人的软件，比写新代码更能练基本功：

- **读懂它**：先搞清楚数据存在哪、谁在写、为什么这么设计
- **定位真问题**：不是「这里看起来不对」，而是「这个值在这一点上是错的，因为……」
- **证明修对了**：不看感觉，看数据。改之前是多少，改之后是多少
- **说清楚边界**：这一点最容易被忽略，但对课程和面试都是必答题

## 一句话总结

**技术上的二次开发是正当的，但「能做」和「能说成自己的」是两件事。先查许可、再做补丁、改前备份、改后验证、表述写清上游。**
`,"../content/notes/vite-build-deploy.md":`---
title: Vite 构建与 GitHub Pages 部署：一条命令背后的四件事
date: 2026-09-17
tags: [前端, 部署, Vite]
summary: npm run build 到底做了什么；为什么部署到 /homepage/ 子路径要改 base；为什么用 hash 路由。
---

# 从源码到线上网页

## \`npm run build\` 做了什么

\`\`\`
npm run build
  ↓
dist/index.html      ← 一个几乎空的壳
dist/assets/index-<哈希>.js   ← 全部组件 + 路由 + 业务代码，打包成一个文件
dist/assets/index-<哈希>.css  ← 全部样式，打包成一个文件
dist/<public 里的所有文件>     ← 图片等静态资源原样搬过来
\`\`\`

三个关键点：

1. **\`src/\` 下的东西会被编译、合并、压缩**，最后变成带哈希的一两个文件。
2. **\`public/\` 下的东西不动，原样复制**到 \`dist/\` 根目录。
3. **文件名里的哈希**由内容算出来。内容一变，哈希就变 → 浏览器的旧缓存自动失效。

## 为什么线上路径要对不上

GitHub Pages 的项目站点地址形如：

\`\`\`
https://carrotsoup123456.github.io/homepage/
\`\`\`

注意末尾的 \`/homepage/\`——网站不在域名根目录，而在一个子目录里。
如果代码里写死 \`/assets/xxx.js\`，浏览器会去 \`.../assets/xxx.js\` 找，404。

解决办法是在 \`vite.config.js\` 里声明前缀：

\`\`\`js
export default defineConfig({
  base: process.env.VITE_BASE || '/homepage/',
  plugins: [vue()],
})
\`\`\`

代码里引用 \`public/\` 资源时，再用 \`import.meta.env.BASE_URL\` 拼出来：

\`\`\`js
const asset = (p) => \`\${import.meta.env.BASE_URL}\${p.replace(/^\\//, '')}\`
\`\`\`

## 为什么用 hash 路由（地址里的 \`#\`）

我用的路由模式是 \`createWebHashHistory()\`，地址长这样：

\`\`\`
https://carrotsoup123456.github.io/homepage/#/about
\`\`\`

\`#\` 后面的内容**浏览器不会发给服务器**。这样做的好处是：

- 服务器永远只被请求 \`index.html\`，不需要为每个路径都准备一个文件。
- 刷新 \`/about\` 不会出现 "404 Not Found"。

代价是地址里多了个 \`#\`，略微不好看。对静态托管来说，这是最省心的选择。

## 部署流程

\`\`\`bash
npm run build                 # 产出 dist/
git subtree push --prefix dist origin gh-pages
\`\`\`

把 \`dist/\` 推到 \`gh-pages\` 分支，GitHub 就会把它当成网站发布。源码留在 \`main\` 分支。

## 一句话总结

**构建 = 把上百个源文件压成两个带指纹的文件；部署 = 把 \`dist/\` 搬到服务器的子目录里，所以路径前缀必须提前声明。**

## 一句话总结

**构建 = 把上百个源文件压成两个带指纹的文件；部署 = 把 \`dist/\` 搬到服务器的子目录里，所以路径前缀必须提前声明。**

## 补：给静态站配分享卡（og:image）

链接发到微信/Twitter/Telegram，卡片图来自 \`og:image\`。实操三件事：

1. **尺寸 1200x630**——各平台通吃的安全比例，写进 meta 的 \`og:image\` 和 \`twitter:image\`
2. **图从真实页面截**：用 headless 浏览器打开线上首屏，隐藏悬浮 UI（机器人按钮、回到顶部）后截图，比设计稿更真实；压成 webp 控制在 100K 内
3. **缓存更新坑**：社交平台抓过的卡片图会缓存很久，图更新后要么换文件名（\`card-v2.webp\`），要么用各平台的缓存刷新工具，否则你以为换了图，用户看到的还是旧的

顺带发现 robots.txt 和 sitemap.xml 也在 public/ 直接托管——静态站的「基建」其实都在这一个目录里。

`,"../content/notes/vue-composition-api.md":`---
title: Vue 3 组合式 API：为什么逻辑要按「关注点」组织
date: 2026-09-18
tags: [前端, Vue]
summary: 从「选项式」到「组合式」，把同一件事的代码放在一起，而不是按 data / methods / computed 拆散。
---

# Vue 3 组合式 API

## 一句话理解

**选项式 API** 是按「代码类型」分格子：数据放 \`data\`、方法放 \`methods\`、计算放 \`computed\`。
**组合式 API** 是按「业务关注点」分格子：同一个功能相关的数据、方法、计算放在同一块。

页面一复杂，第一种写法会让人在上百行里来回跳；第二种写法则像「把同一件事装进一个盒子」。

## 三个最常用的东西

\`\`\`js
import { ref, computed, onMounted } from 'vue'

const count = ref(0) // 响应式的基本单元
const doubled = computed(() => count.value * 2) // 派生出来的值

onMounted(() => console.log('组件挂载完成'))
\`\`\`

- \`ref\`：包一个值，读写要 \`.value\`（模板里会自动解包）。
- \`computed\`：依赖变化时自动重算，并且有缓存。
- \`onMounted\` 等生命周期钩子：直接当函数调用，不用再记 \`mounted() {}\` 选项名。

## 我在个人主页里的实际用法

主题切换是典型的「一个关注点」——把它整块放进 \`App.vue\`：

\`\`\`js
const theme = ref(localStorage.getItem('homepage-theme') || 'light')

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(theme.value)
}

provide('theme', theme)
provide('toggleTheme', toggleTheme)
\`\`\`

子组件（顶部导航栏）用 \`inject\` 取用，不用一层层传 props：

\`\`\`js
const theme = inject('theme')
const toggleTheme = inject('toggleTheme')
\`\`\`

## 遇到的一个坑

\`provide\` 的值如果是 \`ref\`，\`inject\` 拿到的也是 \`ref\`，在 JS 里必须写 \`theme.value\`。
但在 \`<template>\` 里可以直接写 \`theme\`，Vue 会自动解包——这两处行为不一样，容易看错。

## 一句话总结

组合式 API 不是「新语法」，而是**换了一种组织代码的思路：按事分块，而不是按类型分块**。
`,"../content/notes/weiguan-yifang-architecture.md":`---
title: 《为官一方》架构笔记：核心逻辑零引擎依赖 + 配置驱动
date: 2026-09-22
tags: [项目, 游戏, 工程]
summary: 把游戏核心逻辑写成不依赖引擎的纯 TypeScript，再用配置文件驱动内容、用自研工具守数值——这是这个项目最值钱的三个决定。
---

# 三个决定

做《为官一方》从立项到跑通原型的过程中，有三个决定后来证明最省事。写下来给自己复盘。

## 决定一：核心逻辑不依赖游戏引擎

游戏引擎（Cocos Creator）负责画画面、收点击。但**治理规则**——银库怎么变、民心怎么涨、考课怎么算——如果写在引擎的组件里，想单独测一下就得把整个引擎跑起来。

所以我把核心逻辑抽成一个**纯 TypeScript 模块**，它不知道 Cocos 的存在：

\`\`\`
core/GameCore.ts      ← 纯逻辑：状态、事件结算、考课、存档。零引擎依赖
ui/Main.ts            ← 引擎层：把状态画出来、把点击传回去
\`\`\`

带来三个好处：

1. **能单独测试。** 不用起引擎，跑 Node 就能断言「施行施粥棚之后民心应该 +4」。
2. **能跨端复用。** 同一份逻辑既能跑在 Cocos 里，也能直接打包成单文件网页——因为网页版根本不需要引擎。
3. **能自动化模拟。** 可以写脚本让它自己玩几千局，看数值会不会崩。

**教训：把「会变的东西」和「不变的东西」分开。规则相对稳定，界面一直在改。**

## 决定二：内容放配置文件，代码不碰

游戏里有 20 条事件、12 项政令。如果每条都写一段代码，加一条事件就是一次改代码 + 一次回归测试。

所以全部放进 JSON：

\`\`\`
resources/config/events/events_core.json    ← 事件数据
resources/config/events/actions_core.json   ← 政令数据
resources/config/schema/event.schema.json   ← 结构校验规则
\`\`\`

再配一个校验脚本，用 JSON Schema 检查每一条：

- 该有的字段有没有？
- 数值是不是在合理区间？
- 引用的政令 ID 真的存在吗？

**教训：内容用数据，规则用代码。** 加一条事件只改 JSON，校验脚本会替我兜住格式错误。

## 决定三：给数值写工具，别用手调

数值平衡靠手动试是非常低效的——你改了 A，B 又崩了，而且你根本不知道崩在哪一步。

于是我写了四个 Node 工具：

| 工具 | 干什么 |
| --- | --- |
| 状态检查 | 一次性跑完 5 项健康检查（配置能不能解析、ID 有没有悬空等） |
| 事件校验 | 按 JSON Schema 逐条校验全部事件与政令 |
| 整局模拟 | 用固定随机种子自动打完整局，输出每年的六项数值 |
| 打包 | 产出单文件 HTML，供无引擎环境运行 |

**固定随机种子**是关键：它让每一次模拟都可复现。这样「改了这个参数后结局变化」才是可比较的，而不是每次都抽到不同的运气。

**教训：凡是需要反复试的东西，都值得先写个能自动跑的脚本。**

## 交付形态：一份逻辑，三种壳

\`\`\`
                    ┌─→ Cocos 项目（开发用）
GameCore.ts（纯逻辑）─┼─→ 单文件 HTML（92 KB，双击就能玩）
                    └─→ macOS 原生应用（Swift + WebKit 外壳，可打包成安装包）
\`\`\`

最后那个壳子最难的地方不是代码，而是**签名**：macOS 对应用身份有要求，壳和内容的签名必须一致，否则双击打不开。这个坑我在别的项目里也踩过，写在了另一篇笔记里。

## 一句话总结

**核心逻辑零引擎依赖 → 能测、能复用、能自动模拟；内容配置化 → 加内容不用改代码；数值工具化 → 平衡靠数据不靠手感。**
`});function tg(e){let t=e.replace(/^\uFEFF/,``),n=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(t);if(!n)return{data:{},body:t.trim()};let r={};for(let e of n[1].split(/\r?\n/)){let t=e.trim();if(!t||t.startsWith(`#`))continue;let n=t.indexOf(`:`);if(n===-1)continue;let i=t.slice(0,n).trim(),a=t.slice(n+1).trim();(a.startsWith(`"`)&&a.endsWith(`"`)||a.startsWith(`'`)&&a.endsWith(`'`))&&(a=a.slice(1,-1)),r[i]=a.startsWith(`[`)&&a.endsWith(`]`)?a.slice(1,-1).split(`,`).map(e=>e.trim().replace(/^["']|["']$/g,``)).filter(Boolean):a}return{data:r,body:t.slice(n[0].length).trim()}}function ng(e){let t=e.replace(/\s/g,``).length;return Math.max(1,Math.round(t/350))}function rg(e,t){let n=e.replace(/```[\s\S]*?```/g,` `).replace(/[#>*`\-|[\]()]/g,` `).replace(/\s+/g,` `).trim();return n.length>70?`${n.slice(0,70)}…`:n||t}function ig(e){return e.split(`/`).pop().replace(/\.md$/,``)}var ag=Object.entries(eg).map(([e,t])=>{let{data:n,body:r}=tg(t),i=ig(e),a=n.title||i,o=Array.isArray(n.tags)?n.tags:n.tags?[n.tags]:[];return{id:i,title:a,date:n.date||``,tags:o,summary:n.summary||rg(r,a),body:r,minutes:ng(r),category:n.category===`reading`?`reading`:`project`}}).sort((e,t)=>(t.date||``).localeCompare(e.date||``)),og=(()=>{let e={reading:0,project:0};for(let t of ag)e[t.category]=(e[t.category]||0)+1;return e})();function sg(e=``){let t=new Map;for(let n of ag)if(!(e&&n.category!==e))for(let e of n.tags)t.set(e,(t.get(e)||0)+1);return[...t.entries()].sort((e,t)=>t[1]-e[1]).map(([e])=>e)}sg();function cg(e=``,t=`全部`,n=``){let r=e.trim().toLowerCase();return ag.filter(e=>n&&e.category!==n||t&&t!==`全部`&&!e.tags.includes(t)?!1:!r||[e.title,e.summary,e.body,e.tags.join(` `)].join(`
`).toLowerCase().includes(r))}var lg={class:`container page`},ug={class:`kb-cats`,role:`tablist`,"aria-label":`笔记栏目`},dg=[`aria-selected`],fg={class:`kb-cat-count`},pg=[`aria-selected`],mg={class:`kb-cat-count`},hg={key:0,class:`kb-reading-intro`},gg={class:`kb-search`},_g={key:0,class:`kb-layout`},vg={class:`kb-list`},yg={class:`kb-filters`},bg=[`aria-pressed`],xg=[`aria-pressed`,`onClick`],Sg=[`onClick`],Cg={class:`kb-item-date`},wg=[`innerHTML`],Tg=[`innerHTML`],Eg={class:`kb-item-meta`},Dg={class:`kb-item-min`},Og={key:1,class:`empty`},kg=Al({__name:`KnowledgeView`,setup(e){let t=F(``),n=F(`全部`),r=F(`reading`),i=og,a=q(()=>cg(t.value,n.value,r.value)),o=q(()=>sg(r.value));function s(e){r.value!==e&&(r.value=e,t.value=``,n.value=`全部`)}dl();let c=ul();function l(e){c.push({name:`note`,params:{id:e}})}function u(){t.value=``,n.value=`全部`}function d(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}function f(e){let n=t.value.trim().split(/\s+/).filter(Boolean);if(!n.length)return e;let r=RegExp(`(${n.map(d).join(`|`)})`,`ig`);return e.replace(r,`<mark>$1</mark>`)}return(e,c)=>{let d=Ar(`reveal`);return V(),H(`div`,lg,[R((V(),H(`section`,null,[c[7]||=U(`h1`,{class:`page-title`},`知识库 · 笔记`,-1),c[8]||=U(`p`,{class:`page-subtitle`},` 读书笔记与技术复盘分两栏 —— 支持关键词搜索与标签筛选。 `,-1),U(`div`,ug,[U(`button`,{class:A([`kb-cat`,{active:r.value===`reading`}]),role:`tab`,"aria-selected":r.value===`reading`,onClick:c[0]||=e=>s(`reading`)},[c[4]||=G(` 📚 读书笔记 `,-1),U(`span`,fg,j(I(i).reading),1)],10,dg),U(`button`,{class:A([`kb-cat`,{active:r.value===`project`}]),role:`tab`,"aria-selected":r.value===`project`,onClick:c[1]||=e=>s(`project`)},[c[5]||=G(` 🛠 项目知识 `,-1),U(`span`,mg,j(I(i).project),1)],10,pg)]),r.value===`reading`?(V(),H(`p`,hg,` 这些是高二到高三的读书笔记，从手写本上一条条转录整理。《价值心法》是我的启蒙——读完把「自己」当成一家公司设计了一整套系统；之后纳瓦尔、阿德勒、芒格、里德利、塔勒布、清崎一路读下来。其间还有一段和母亲在返校路上关于「现在该读什么书」的长谈，没有争出输赢，却悄悄改变了之后书单的方向。笔记按阅读时间倒序排列。 `)):K(``,!0),U(`div`,gg,[c[6]||=U(`label`,{class:`sr-only`,for:`kb-search-input`},`搜索笔记`,-1),R(U(`input`,{id:`kb-search-input`,"onUpdate:modelValue":c[2]||=e=>t.value=e,type:`search`,class:`search-input`,placeholder:`搜索标题、正文或标签，例如：Vite、机器学习…`,autocomplete:`off`},null,512),[[Xo,t.value]]),t.value||n.value!==`全部`?(V(),H(`button`,{key:0,class:`search-clear`,onClick:u},` 清空 `)):K(``,!0)])])),[[d]]),a.value.length?R((V(),H(`div`,_g,[U(`aside`,vg,[U(`div`,yg,[U(`button`,{class:A([`filter-chip`,{active:n.value===`全部`}]),"aria-pressed":n.value===`全部`,onClick:c[3]||=e=>n.value=`全部`},` 全部 `,10,bg),(V(!0),H(B,null,z(o.value,e=>(V(),H(`button`,{key:e,class:A([`filter-chip`,{active:n.value===e}]),"aria-pressed":n.value===e,onClick:t=>n.value=e},j(e),11,xg))),128))]),U(`ul`,null,[(V(!0),H(B,null,z(a.value,e=>(V(),H(`li`,{key:e.id},[U(`button`,{class:`kb-item`,onClick:t=>l(e.id)},[U(`span`,Cg,j(e.date),1),U(`span`,{class:`kb-item-title`,innerHTML:f(e.title)},null,8,wg),U(`span`,{class:`kb-item-summary`,innerHTML:f(e.summary)},null,8,Tg),U(`span`,Eg,[(V(!0),H(B,null,z(e.tags,e=>(V(),H(`span`,{key:e,class:`kb-item-tag`},`#`+j(e),1))),128)),U(`span`,Dg,j(e.minutes)+` 分钟`,1)])],8,Sg)]))),128))])])])),[[d]]):(V(),H(`div`,Og,[c[9]||=U(`p`,{class:`empty-title`},`没有匹配的笔记`,-1),c[10]||=U(`p`,{class:`empty-desc`},`换个关键词，或者点下面的按钮看看全部内容。`,-1),U(`button`,{class:`btn btn-outline`,onClick:u},`查看全部笔记`)]))])}}},[[`__scopeId`,`data-v-cdcaf8c3`]]),Ag={"avoid-stuck-protocol":[{q:`这份自查规则是写给 AI 的还是写给人的？`,a:`形式上写给 AI（放在协作会话的开头约定里），实际上是写给我自己的——它逼我在派活时把「卡住了怎么办」提前想清楚：超时多久算卡、卡了先留什么证据、最多重试几次。`},{q:`真卡住了，第一步做什么？`,a:`先留证据再动手：把当前输出、跑了多久、重试了几次记下来，然后换一个更小的验证动作，而不是原样重跑。「原样重跑」是耗死的开始。`},{q:`这套规则在你哪个项目里救过场？`,a:`就是这个主页。有一次部署推送在网络抖动下反复失败，按协议先记录、降速、换 HTTP/1.1 再重试，而不是无脑重推，最后查清楚是网络层问题而不是仓库问题。`}],"backtest-numbers-trap":[{q:`112.74% 这个收益到底能不能信？`,a:`数字本身是真的（界面里有），但它只在「那个模型、那段区间、那套参数」下成立。换一天、换个模型版本都不一样，而且它没落盘成可复现文件——所以我把它写成「界面留存的单次结果」，而不是「策略能力」。`},{q:`那传统规则策略 -28.08% 超额说明什么？`,a:`说明在同一段时间里，「小市值+低波+反转」这种拍脑袋规则跑不赢大盘。这组数字的价值在于对照：机器学习版至少在这段区间里比土办法强，虽然两边都有过拟合风险。`},{q:`写项目展示时，怎么避免误导看的人？`,a:`三条：区间写清楚、口径写清楚（哪个模型哪套参数）、局限写清楚（没实盘、有幸存者偏差）。宁可让数字看起来没那么亮，也不能让人拿它当未来预期。`}],"carbon-brain-dac":[{q:`这个项目最核心的想法是什么？`,a:`DAC 材料吸满二氧化碳后必须再生。与其按固定时间切换「吸附/再生」，不如让模型根据传感器数据估算「现在还剩多少容量」，按需切换——省能耗，也避免提前再生浪费材料。`},{q:`R² 为负是什么意思？失败了？`,a:`意思是模型在没见过的实验日上，预测还不如直接猜平均值。所以诚实的结论是「流程打通了，但模型还不能用」。我把这条写进展页和笔记里，就是因为课程要求如实呈现局限。`},{q:`你在团队里具体做什么？`,a:`我是组长，统筹进度和分工；技术上负责数据清洗、特征工程（18 维特征）和 XGBoost 模型训练，还设计了吸附/再生的自动切换阈值并参与装置联调。`}],"homepage-iteration-log":[{q:`三个版本各自解决了什么问题？`,a:`V1 解决「有没有」：先把内容放上去；V2 解决「像不像一个作品」：统一视觉、补项目详情；V3 解决「能不能用」：响应式、性能、可访问性、反馈机制——每一版只打一个最痛的点。`},{q:`为什么不一次做到位？`,a:`做不到。「什么是最痛的点」只有上一版被真实用过才知道。比如 V3 的响应式改造，就是在手机上真用了 V2 之后才发现关于页会横向溢出。`}],"project-based-learning-mvp":[{q:`「先跑起来」不会做出很糙的东西吗？`,a:`会，而且就应该糙。最小可用版本的意义是验证方向，不是展示工艺。糙版本换来的是「提前两周知道这条路走不走得通」，比慢工细活做错方向值钱得多。`},{q:`为什么一定要写下来？`,a:`因为记性会骗人。写下来之后，「我当时为什么这么决定」就有据可查，复盘时不会把运气当实力、把实力当运气。这个主页的测试与验收记录就是这个习惯的产物。`}],"supervised-learning-lightgbm":[{q:`监督学习一句话怎么理解？`,a:`给机器一堆「题目+答案」，让它学出「题目→答案」的规律，然后拿没答案的新题目考它。股票预测里：题目是 28 个因子，答案是「未来几天涨不涨」。`},{q:`做股票预测最难的是模型吗？`,a:`不是，是特征和评估。模型用 LightGBM 几行就调起来，但「造哪些因子才有预测力」和「怎么评估才不自欺」占了八成工作量——比如必须按时间切分测试集，不能随机切。`}],"third-party-app-modding":[{q:`改别人的软件，最重要的一条边界是什么？`,a:`说清楚归属。TO-DO Panel 和 Claude Code 桌面应用都不是我原创的，我在所有展示位置都写明上游来源和许可——这是课程合规的底线，也是对原作者的基本尊重。`},{q:`技术上怎么改才算负责任？`,a:`不动上游源码，用补丁的方式做；所有改动留校验和与备份，随时能回滚；上游一更新，按固定流程把补丁重打一遍。这样改坏了能退、升级了能跟。`}],"vite-build-deploy":[{q:`为什么部署到子路径要改 base？`,a:`因为资源引用是「绝对路径 / 开头」的话，浏览器会去域名根目录找，而 GitHub Pages 项目站挂在 /homepage/ 下，找不到就 404。base 改成 /homepage/ 后，所有引用自动带上这层前缀。`},{q:`为什么用 hash 路由（网址里带 #）？`,a:`GitHub Pages 是静态托管，没有服务端路由。用 history 模式的话，刷新 /project/xxx 会让服务器找这个真实路径，直接 404；hash 模式下 # 后面的部分不发给服务器，路由全在前端完成，刷新不丢页。`}],"vue-composition-api":[{q:`组合式 API 到底比选项式好在哪？`,a:`选项式按「代码种类」分家（数据放 data、函数放 methods），做一件事要上下翻三处；组合式按「事情」分家——和「菜单开关」有关的变量、监听、清理全写在一起，读代码不用跳。`},{q:`这个主页里能举个例子吗？`,a:`返回顶部按钮：监听滚动、判断显隐、点击回顶、卸载时移除监听，四件事全在 SiteFooter.vue 的一个 <script setup> 段落里，一眼看完。`}],"weiguan-yifang-architecture":[{q:`「核心逻辑零引擎依赖」有什么好处？`,a:`游戏规则（数值、事件、政令）写成纯 TypeScript，不碰 Cocos 引擎的 API。好处是能脱离引擎单独跑测试——18 项自动化断言直接在 Node 里跑，改数值不用开引擎点半天。`},{q:`配置驱动具体指什么？`,a:`事件和政令全部写在 JSON 文件里，配 JSON Schema 校验。加一个新事件 = 加一段 JSON，不用碰代码；写错了校验脚本直接报错，不会带进游戏。`},{q:`这个游戏现在能玩吗？`,a:`能。本站就有网页试玩版（导航栏「试玩」栏目），不用下载；另外也有可双击运行的 macOS 版本。试玩版就是最新构建，内容持续在加。`}]},jg={key:0,class:`page note-page`},Mg={class:`note-crumb`},Ng={class:`note-crumb-cat`},Pg={class:`kb-body`},Fg={class:`kb-head`},Ig={class:`kb-title`},Lg={class:`kb-meta`},Rg=[`innerHTML`],zg={key:0,class:`note-qa`,"aria-label":`关于本篇的常见问题`},Bg=Al({__name:`NoteView`,props:{id:String},setup(e){let t=e,n=dl(),r=ul();function i(){Ip(r,`/knowledge`)}let a=q(()=>ag.find(e=>e.id===t.id)),o=q(()=>a.value&&Ag[a.value.id]||[]),s=q(()=>a.value?$.parse(a.value.body):``);return Pn(()=>a.value,e=>{if(!e){r.replace(`/knowledge`);return}ad({title:`${e.title} · 知识库`,desc:`笔记：${e.title}${e.tags?.length?`｜标签：`+e.tags.join(`、`):``}`})},{immediate:!0}),Pn(()=>n.query.note,e=>{typeof e==`string`&&e&&r.replace({name:`note`,params:{id:e}})},{immediate:!0}),(e,t)=>{let n=Ar(`reveal`);return a.value?R((V(),H(`div`,jg,[U(`p`,Mg,[U(`a`,{href:`#/knowledge`,class:`note-crumb-link`,onClick:$o(i,[`prevent`])},`‹ 知识库`),t[0]||=U(`span`,{class:`note-crumb-sep`,"aria-hidden":`true`},`/`,-1),U(`span`,Ng,j(a.value.category===`reading`?`读书笔记`:`项目知识`),1)]),U(`article`,Pg,[U(`header`,Fg,[U(`h2`,Ig,j(a.value.title),1),U(`p`,Lg,[G(j(a.value.date)+` `,1),(V(!0),H(B,null,z(a.value.tags,e=>(V(),H(`span`,{key:e,class:`kb-tag`},`#`+j(e),1))),128)),G(` · 约 `+j(a.value.minutes)+` 分钟阅读 `,1)])]),U(`div`,{class:`markdown`,innerHTML:s.value},null,8,Rg),o.value.length?(V(),H(`section`,zg,[t[1]||=U(`h3`,{class:`note-qa-title`},`关于这篇，你可能想问`,-1),t[2]||=U(`p`,{class:`note-qa-hint`},`以下为站长预写的常见问答；真实反馈请用底部的反馈按钮。`,-1),(V(!0),H(B,null,z(o.value,e=>(V(),H(`details`,{key:e.q,class:`note-qa-item`},[U(`summary`,null,j(e.q),1),U(`p`,null,j(e.a),1)]))),128))])):K(``,!0),W(Nd,{page:`知识库`,item:a.value.id},null,8,[`item`])]),W(xh,{to:`/knowledge`,label:`返回笔记列表`})])),[[n]]):K(``,!0)}}},[[`__scopeId`,`data-v-10221697`]]),Vg={class:`music-page`},Hg={class:`bgm-card`,"aria-label":`背景音乐播放器`},Ug=[`src`],Wg={class:`bgm-body`},Gg={class:`bgm-head`},Kg={class:`bgm-title`},qg={class:`bgm-note`},Jg={class:`bgm-controls`,role:`group`,"aria-label":`BGM 播放控制`},Yg=[`aria-label`],Xg={class:`p-progress`,"aria-hidden":`true`},Zg={class:`p-time`},Qg={class:`p-vol`},$g=[`value`,`aria-valuetext`],e_={class:`drum-section`,"aria-label":`我的架子鼓演奏`},t_={class:`drum-fig`},n_=[`src`,`poster`],r_={class:`drum-caption`},i_={class:`wish-head`},a_={class:`wish-grid`,"aria-label":`我的歌单，仅文字与原创封面展示`},o_={class:`wish-cover`},s_=[`src`,`alt`],c_={class:`wish-meta`},l_={class:`wish-title`},u_={class:`wish-artist`},d_={class:`wish-tag`},f_=Al({__name:`MusicView`,setup(e){let{playing:t,volume:n,progress:r,timeCur:i,timeDur:a,togglePlay:o,setVolume:s,videoYield:c,videoResume:l}=kl(),u=c,d=l;function f(e){if(!Number.isFinite(e))return`0:00`;let t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${String(n).padStart(2,`0`)}`}let p=q(()=>f(i.value)),m=q(()=>f(a.value));return(e,i)=>{let a=Ar(`reveal`);return V(),H(`div`,Vg,[W(zd,{seed:`playlist`,class:`music-hero-band`},{label:L(()=>[...i[5]||=[G(`音乐`,-1)]]),title:L(()=>[...i[6]||=[G(`我喜欢的歌`,-1)]]),desc:L(()=>[...i[7]||=[G(` 写代码时的循环列表，还有一段我自己的鼓。全站背景音是一首开放授权的管弦圆舞曲（本页可控制播放与音量）； 下面这九首是我的真实歌单——歌能上榜，音频和真实专辑封面不能上站，原因写在页脚。 `,-1)]]),_:1}),U(`section`,Hg,[U(`img`,{class:`bgm-cover`,src:I(sd).cover,width:`120`,height:`120`,alt:`圆舞曲插画封面：金色舞厅与水晶吊灯`,loading:`lazy`},null,8,Ug),U(`div`,Wg,[U(`div`,Gg,[i[8]||=U(`span`,{class:`bgm-kicker`},`背景音乐 · 全站常驻`,-1),U(`h2`,Kg,j(I(sd).title),1),U(`p`,qg,j(I(sd).note),1)]),U(`div`,Jg,[U(`button`,{class:`p-btn p-main`,"aria-label":I(t)?`暂停背景音乐`:`播放背景音乐`,onClick:i[0]||=(...e)=>I(o)&&I(o)(...e)},j(I(t)?`❚❚`:`▶`),9,Yg),U(`div`,Xg,[U(`div`,{class:`p-progress-fill`,style:k({width:I(r)+`%`})},null,4)]),U(`span`,Zg,j(p.value)+` / `+j(m.value),1),U(`label`,Qg,[i[9]||=U(`span`,{"aria-hidden":`true`},`🔊`,-1),U(`input`,{type:`range`,min:`0`,max:`1`,step:`0.05`,value:I(n),"aria-valuetext":`音量 ${Math.round(I(n)*100)}%`,"aria-label":`音量`,onInput:i[1]||=(...e)=>I(s)&&I(s)(...e)},null,40,$g)])])])]),U(`section`,e_,[i[10]||=U(`h2`,{class:`sec-title`},`架子鼓训练视频`,-1),U(`figure`,t_,[U(`video`,{ref:`videoEl`,class:`drum-video`,src:I(cd).src,poster:I(cd).poster,controls:``,playsinline:``,preload:`metadata`,onPlay:i[2]||=(...e)=>I(u)&&I(u)(...e),onPause:i[3]||=(...e)=>I(d)&&I(d)(...e),onEnded:i[4]||=(...e)=>I(d)&&I(d)(...e)},null,40,n_),U(`figcaption`,r_,j(I(cd).desc),1)])]),R((V(),H(`section`,i_,[...i[11]||=[U(`p`,{class:`eyebrow`},`My Playlist`,-1),U(`h2`,{class:`section-title`},`我的歌单`,-1),U(`p`,{class:`section-desc`},`九首真实在循环的歌；封面是按我对每首歌的私人意象画的原创插画，不指向任何真实专辑。`,-1)]])),[[a]]),U(`section`,a_,[(V(!0),H(B,null,z(I(ld),e=>(V(),H(`article`,{key:e.id,class:`wish-card`},[U(`div`,o_,[U(`img`,{src:e.cover,alt:`「${e.title}」的原创意象封面插画`,width:`640`,height:`640`,loading:`lazy`},null,8,s_)]),U(`div`,c_,[U(`h3`,l_,j(e.title),1),U(`p`,u_,j(e.artist),1),U(`p`,d_,`「`+j(e.tag)+`」`,1),i[12]||=U(`p`,{class:`wish-flag`,title:`音频未获得传播授权，站内不提供播放`},`未上站`,-1)])]))),128))]),i[13]||=U(`p`,{class:`music-legal`},` 关于音频与封面：流行音乐录音和官方专辑封面的公开传播权都在唱片公司手里，个人主页（尤其是课程公开链接）放不了； 歌单墙的封面是按我对每首歌的私人意象生成的原创插画，不指向任何真实专辑——喜欢歌本身请去正版平台。 背景音乐 Victory Waltz 来自 Pixabay（Pixabay License：免费商用、无需署名）；鼓视频是本人录制、音频经现场感处理。 浏览器不允许页面自动出声，所有声音都是你点了才播。 `,-1)])}}},[[`__scopeId`,`data-v-2492dec6`]]),p_={class:`container page`},m_={class:`contact-card`},h_={class:`contact-links left`},g_=[`href`,`target`],__={class:`form-card`},v_={class:`form-row`},y_={class:`form-field`},b_={class:`form-field`},x_={class:`form-field`},S_=[`disabled`],C_={key:0,class:`form-done`},w_={key:1,class:`form-error`},T_=[{path:`/`,name:`home`,component:Rf,meta:{title:``,desc:`刘博康的个人主页 · 计算机科学与技术 · 项目、知识库与联系方式`}},{path:`/about`,name:`about`,component:Fp,meta:{title:`关于我`,desc:`刘博康的个人介绍、在做什么、以及我做项目的方式。`}},{path:`/project/:id`,name:`project`,component:$h,props:!0,meta:{title:`项目详情`,desc:`项目背景、我负责的部分与运行截图。`}},{path:`/knowledge`,name:`knowledge`,component:kg,meta:{title:`知识库`,desc:`我的学习笔记与技术复盘，支持关键词搜索与标签筛选。`}},{path:`/knowledge/note/:id`,name:`note`,component:Bg,props:!0,meta:{title:`笔记`,desc:`一篇知识库笔记的完整内容。`}},{path:`/music`,name:`music`,component:f_,meta:{title:`音乐`,desc:`我喜欢的歌、雨中森林 BGM 与我的架子鼓演奏。`}},{path:`/contact`,name:`contact`,component:Al({__name:`ContactView`,setup(e){let t=F({name:``,email:``,message:``}),n=F(`idle`),r=F(``);async function i(){if(t.value.name.trim()&&t.value.message.trim()){n.value=`sending`,r.value=``;try{let{ok:e,message:i}=await wd({name:t.value.name,email:t.value.email,message:t.value.message,_replyto:t.value.email||`no-reply@example.com`,_subject:`来自个人主页的留言`});e?(n.value=`success`,r.value=`已收到你的留言！我会尽快回复。`,t.value={name:``,email:``,message:``}):(n.value=`error`,r.value=i||`提交失败，请稍后再试。`)}catch{n.value=`error`,r.value=`无法连接表单服务，请稍后再试。`}}}return(e,a)=>{let o=Ar(`reveal`);return V(),H(`div`,p_,[R((V(),H(`section`,null,[...a[3]||=[U(`h1`,{class:`page-title`},`联系我`,-1),U(`p`,{class:`page-subtitle`},`欢迎交流与合作，也可以给我反馈意见`,-1)]])),[[o]]),R((V(),H(`section`,m_,[U(`div`,h_,[(V(!0),H(B,null,z(I(bd),e=>(V(),H(`a`,{key:e.label,href:e.href||`#`,target:e.href?`_blank`:`_self`},[U(`span`,null,j(e.icon),1),U(`span`,null,j(e.label),1)],8,g_))),128))])])),[[o]]),R((V(),H(`section`,__,[a[7]||=U(`h2`,{class:`form-title`},`留言 / 反馈`,-1),U(`form`,{onSubmit:$o(i,[`prevent`])},[U(`div`,v_,[U(`div`,y_,[a[4]||=U(`label`,null,`你的称呼`,-1),R(U(`input`,{"onUpdate:modelValue":a[0]||=e=>t.value.name=e,type:`text`,required:``,placeholder:`怎么称呼你？`},null,512),[[Xo,t.value.name]])]),U(`div`,b_,[a[5]||=U(`label`,null,`邮箱（选填）`,-1),R(U(`input`,{"onUpdate:modelValue":a[1]||=e=>t.value.email=e,type:`email`,placeholder:`you@example.com`},null,512),[[Xo,t.value.email]])])]),U(`div`,x_,[a[6]||=U(`label`,null,`内容`,-1),R(U(`textarea`,{"onUpdate:modelValue":a[2]||=e=>t.value.message=e,required:``,rows:`5`,placeholder:`想对我说什么？`},null,512),[[Xo,t.value.message]])]),U(`button`,{class:`btn btn-primary`,type:`submit`,disabled:n.value===`sending`},j(n.value===`sending`?`提交中…`:`提交`),9,S_)],32),n.value===`success`?(V(),H(`p`,C_,`✅ `+j(r.value),1)):n.value===`error`?(V(),H(`p`,w_,`⚠️ `+j(r.value),1)):K(``,!0)])),[[o]])])}}},[[`__scopeId`,`data-v-aed3e465`]]),meta:{title:`联系我`,desc:`通过邮件或表单联系刘博康。`}},{path:`/play`,name:`play`,component:qf,meta:{title:`在线试玩`,desc:`《为官一方》站内网页试玩版，无需下载。`}},{path:`/:pathMatch(.*)*`,name:`not-found`,component:Dh,meta:{title:`页面不存在`,desc:`这个地址没有对应内容。`}}],E_=ll({history:kc(),routes:T_,scrollBehavior(e,t,n){return n||{top:0}}}),D_=typeof IntersectionObserver<`u`?new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`revealed`),D_.unobserve(e.target))})},{threshold:.12}):null,O_={mounted(e,t){e.classList.add(`reveal`),t.value&&(e.style.transitionDelay=`${t.value}ms`),D_?D_.observe(e):e.classList.add(`revealed`)},unmounted(e){D_&&D_.unobserve(e)}},k_={mounted(e,t){let n=t.value&&t.value.step||90,r=Array.from(e.children);r.forEach((e,t)=>{e.classList.add(`reveal`),e.style.transitionDelay=`${t*n}ms`});let i=()=>r.forEach(e=>e.classList.add(`revealed`));if(typeof IntersectionObserver>`u`){i();return}let a=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(i(),a.disconnect())})},{threshold:.12});a.observe(e),e._revealIO=a},unmounted(e){e._revealIO&&e._revealIO.disconnect()}},A_=as(pd);A_.use(E_),A_.directive(`reveal`,O_),A_.directive(`reveal-stagger`,k_),A_.mount(`#app`);