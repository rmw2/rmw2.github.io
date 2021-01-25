/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 192:
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}("undefined"!=typeof self?self:this,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([,function(e,t,n){(function(t){for(var r=n(11),o="undefined"==typeof window?t:window,i=["moz","webkit"],a="AnimationFrame",s=o["request"+a],u=o["cancel"+a]||o["cancelRequest"+a],c=0;!s&&c<i.length;c++)s=o[i[c]+"Request"+a],u=o[i[c]+"Cancel"+a]||o[i[c]+"CancelRequest"+a];if(!s||!u){var l=0,p=0,d=[];s=function(e){if(0===d.length){var t=r(),n=Math.max(0,1e3/60-(t-l));l=n+t,setTimeout((function(){var e=d.slice(0);d.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(l)}catch(e){setTimeout((function(){throw e}),0)}}),Math.round(n))}return d.push({handle:++p,callback:e,cancelled:!1}),p},u=function(e){for(var t=0;t<d.length;t++)d[t].handle===e&&(d[t].cancelled=!0)}}e.exports=function(e){return s.call(o,e)},e.exports.cancel=function(){u.apply(o,arguments)},e.exports.polyfill=function(e){e||(e=o),e.requestAnimationFrame=s,e.cancelAnimationFrame=u}}).call(this,n(4))},,function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return O}));var r=n(1),o=n.n(r),i=function(e){return new RegExp(/<[a-z][\s\S]*>/i).test(e)},a=function(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes},s=function(e,t){return Math.floor(Math.random()*(t-e+1))+e},u=function(e){var t=document.createElement("style");t.appendChild(document.createTextNode(e)),document.head.appendChild(t)},c="TYPE_CHARACTER",l="REMOVE_CHARACTER",p="REMOVE_ALL",d="REMOVE_LAST_VISIBLE_NODE",f="PAUSE_FOR",v="CALL_FUNCTION",h="ADD_HTML_TAG_ELEMENT",m="CHANGE_DELETE_SPEED",y="CHANGE_DELAY",g="CHANGE_CURSOR",w="PASTE_STRING",T="HTML_TAG",E="TEXT_NODE";function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function A(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){_(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function S(e){return function(e){if(Array.isArray(e))return N(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return N(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return N(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var O=function(){function e(t,n){var u=this;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),_(this,"state",{cursorAnimation:null,lastFrameTime:null,pauseUntil:null,eventQueue:[],eventLoop:null,eventLoopPaused:!1,reverseCalledEvents:[],calledEvents:[],visibleNodes:[],initialOptions:null,elements:{container:null,wrapper:document.createElement("span"),cursor:document.createElement("span")}}),_(this,"options",{strings:null,cursor:"|",delay:"natural",pauseFor:1500,deleteSpeed:"natural",loop:!1,autoStart:!1,devMode:!1,skipAddStyles:!1,wrapperClassName:"Typewriter__wrapper",cursorClassName:"Typewriter__cursor",stringSplitter:null,onCreateTextNode:null,onRemoveNode:null}),_(this,"setupWrapperElement",(function(){u.state.elements.container&&(u.state.elements.wrapper.className=u.options.wrapperClassName,u.state.elements.cursor.className=u.options.cursorClassName,u.state.elements.cursor.innerHTML=u.options.cursor,u.state.elements.container.innerHTML="",u.state.elements.container.appendChild(u.state.elements.wrapper),u.state.elements.container.appendChild(u.state.elements.cursor))})),_(this,"start",(function(){return u.state.eventLoopPaused=!1,u.runEventLoop(),u})),_(this,"pause",(function(){return u.state.eventLoopPaused=!0,u})),_(this,"stop",(function(){return u.state.eventLoop&&(Object(r.cancel)(u.state.eventLoop),u.state.eventLoop=null),u})),_(this,"pauseFor",(function(e){return u.addEventToQueue(f,{ms:e}),u})),_(this,"typeOutAllStrings",(function(){return"string"==typeof u.options.strings?(u.typeString(u.options.strings).pauseFor(u.options.pauseFor),u):(u.options.strings.forEach((function(e){u.typeString(e).pauseFor(u.options.pauseFor).deleteAll(u.options.deleteSpeed)})),u)})),_(this,"typeString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(i(e))return u.typeOutHTMLString(e,t);if(e){var n=u.options||{},r=n.stringSplitter,o="function"==typeof r?r(e):e.split("");u.typeCharacters(o,t)}return u})),_(this,"pasteString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return i(e)?u.typeOutHTMLString(e,t,!0):(e&&u.addEventToQueue(w,{character:e,node:t}),u)})),_(this,"typeOutHTMLString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2?arguments[2]:void 0,r=a(e);if(r.length>0)for(var o=0;o<r.length;o++){var i=r[o],s=i.innerHTML;i&&3!==i.nodeType?(i.innerHTML="",u.addEventToQueue(h,{node:i,parentNode:t}),n?u.pasteString(s,i):u.typeString(s,i)):i.textContent&&(n?u.pasteString(i.textContent,t):u.typeString(i.textContent,t))}return u})),_(this,"deleteAll",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"natural";return u.addEventToQueue(p,{speed:e}),u})),_(this,"changeDeleteSpeed",(function(e){if(!e)throw new Error("Must provide new delete speed");return u.addEventToQueue(m,{speed:e}),u})),_(this,"changeDelay",(function(e){if(!e)throw new Error("Must provide new delay");return u.addEventToQueue(y,{delay:e}),u})),_(this,"changeCursor",(function(e){if(!e)throw new Error("Must provide new cursor");return u.addEventToQueue(g,{cursor:e}),u})),_(this,"deleteChars",(function(e){if(!e)throw new Error("Must provide amount of characters to delete");for(var t=0;t<e;t++)u.addEventToQueue(l);return u})),_(this,"callFunction",(function(e,t){if(!e||"function"!=typeof e)throw new Error("Callbak must be a function");return u.addEventToQueue(v,{cb:e,thisArg:t}),u})),_(this,"typeCharacters",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!e||!Array.isArray(e))throw new Error("Characters must be an array");return e.forEach((function(e){u.addEventToQueue(c,{character:e,node:t})})),u})),_(this,"removeCharacters",(function(e){if(!e||!Array.isArray(e))throw new Error("Characters must be an array");return e.forEach((function(){u.addEventToQueue(l)})),u})),_(this,"addEventToQueue",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return u.addEventToStateProperty(e,t,n,"eventQueue")})),_(this,"addReverseCalledEvent",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=u.options.loop;return r?u.addEventToStateProperty(e,t,n,"reverseCalledEvents"):u})),_(this,"addEventToStateProperty",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3?arguments[3]:void 0,o={eventName:e,eventArgs:t||{}};return u.state[r]=n?[o].concat(S(u.state[r])):[].concat(S(u.state[r]),[o]),u})),_(this,"runEventLoop",(function(){u.state.lastFrameTime||(u.state.lastFrameTime=Date.now());var e=Date.now(),t=e-u.state.lastFrameTime;if(!u.state.eventQueue.length){if(!u.options.loop)return;u.state.eventQueue=S(u.state.calledEvents),u.state.calledEvents=[],u.options=A({},u.state.initialOptions)}if(u.state.eventLoop=o()(u.runEventLoop),!u.state.eventLoopPaused){if(u.state.pauseUntil){if(e<u.state.pauseUntil)return;u.state.pauseUntil=null}var n=S(u.state.eventQueue),r=n.shift(),i=0;if(!(t<=(i=r.eventName===d||r.eventName===l?"natural"===u.options.deleteSpeed?s(40,80):u.options.deleteSpeed:"natural"===u.options.delay?s(120,160):u.options.delay))){var a=r.eventName,b=r.eventArgs;switch(u.logInDevMode({currentEvent:r,state:u.state,delay:i}),a){case w:case c:var N=b.character,C=b.node,_=document.createTextNode(N),O=_;u.options.onCreateTextNode&&"function"==typeof u.options.onCreateTextNode&&(O=u.options.onCreateTextNode(N,_)),O&&(C?C.appendChild(O):u.state.elements.wrapper.appendChild(O)),u.state.visibleNodes=[].concat(S(u.state.visibleNodes),[{type:E,character:N,node:O}]);break;case l:n.unshift({eventName:d,eventArgs:{removingCharacterNode:!0}});break;case f:var L=r.eventArgs.ms;u.state.pauseUntil=Date.now()+parseInt(L);break;case v:var M=r.eventArgs,x=M.cb,j=M.thisArg;x.call(j,{elements:u.state.elements});break;case h:var D=r.eventArgs,P=D.node,k=D.parentNode;k?k.appendChild(P):u.state.elements.wrapper.appendChild(P),u.state.visibleNodes=[].concat(S(u.state.visibleNodes),[{type:T,node:P,parentNode:k||u.state.elements.wrapper}]);break;case p:var R=u.state.visibleNodes,Q=b.speed,F=[];Q&&F.push({eventName:m,eventArgs:{speed:Q,temp:!0}});for(var H=0,I=R.length;H<I;H++)F.push({eventName:d,eventArgs:{removingCharacterNode:!1}});Q&&F.push({eventName:m,eventArgs:{speed:u.options.deleteSpeed,temp:!0}}),n.unshift.apply(n,F);break;case d:var U=r.eventArgs.removingCharacterNode;if(u.state.visibleNodes.length){var q=u.state.visibleNodes.pop(),G=q.type,Y=q.node,V=q.character;u.options.onRemoveNode&&"function"==typeof u.options.onRemoveNode&&u.options.onRemoveNode({node:Y,character:V}),Y&&Y.parentNode.removeChild(Y),G===T&&U&&n.unshift({eventName:d,eventArgs:{}})}break;case m:u.options.deleteSpeed=r.eventArgs.speed;break;case y:u.options.delay=r.eventArgs.delay;break;case g:u.options.cursor=r.eventArgs.cursor,u.state.elements.cursor.innerHTML=r.eventArgs.cursor}u.options.loop&&(r.eventName===d||r.eventArgs&&r.eventArgs.temp||(u.state.calledEvents=[].concat(S(u.state.calledEvents),[r]))),u.state.eventQueue=n,u.state.lastFrameTime=e}}})),t)if("string"==typeof t){var b=document.querySelector(t);if(!b)throw new Error("Could not find container element");this.state.elements.container=b}else this.state.elements.container=t;n&&(this.options=A(A({},this.options),n)),this.state.initialOptions=A({},this.options),this.init()}var t,n,b;return t=e,(n=[{key:"init",value:function(){this.setupWrapperElement(),this.addEventToQueue(g,{cursor:this.options.cursor},!0),this.addEventToQueue(p,null,!0),!window||window.___TYPEWRITER_JS_STYLES_ADDED___||this.options.skipAddStyles||(u(".Typewriter__cursor{-webkit-animation:Typewriter-cursor 1s infinite;animation:Typewriter-cursor 1s infinite;margin-left:1px}@-webkit-keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}@keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}"),window.___TYPEWRITER_JS_STYLES_ADDED___=!0),!0===this.options.autoStart&&this.options.strings&&this.typeOutAllStrings().start()}},{key:"logInDevMode",value:function(e){this.options.devMode&&console.log(e)}}])&&C(t.prototype,n),b&&C(t,b),e}()},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},,,,,,,function(e,t,n){(function(t){(function(){var n,r,o,i,a,s;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:null!=t&&t.hrtime?(e.exports=function(){return(n()-a)/1e6},r=t.hrtime,i=(n=function(){var e;return 1e9*(e=r())[0]+e[1]})(),s=1e9*t.uptime(),a=i-s):Date.now?(e.exports=function(){return Date.now()-o},o=Date.now()):(e.exports=function(){return(new Date).getTime()-o},o=(new Date).getTime())}).call(this)}).call(this,n(12))},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(e){r=a}}();var u,c=[],l=!1,p=-1;function d(){l&&u&&(l=!1,u.length?c=u.concat(c):p=-1,c.length&&f())}function f(){if(!l){var e=s(d);l=!0;for(var t=c.length;t;){for(u=c,c=[];++p<t;)u&&u[p].run();p=-1,t=c.length}u=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function v(e,t){this.fun=e,this.array=t}function h(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new v(e,t)),1!==c.length||l||s(f)},v.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=h,o.addListener=h,o.once=h,o.off=h,o.removeListener=h,o.removeAllListeners=h,o.emit=h,o.prependListener=h,o.prependOnceListener=h,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}}]).default}));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/typewriter-effect/dist/core.js
var core = __webpack_require__(192);
var core_default = /*#__PURE__*/__webpack_require__.n(core);
;// CONCATENATED MODULE: ./webpack/assets/dump.txt
/* harmony default export */ const dump = ("Reading package lists...\nBuilding dependency tree...\nReading state information...\nEating leftovers...\n\nThe following additional packages will be installed:\n  robwhit.sh\nSuggested packages:\n  spaghetti meatballs\n\nThe following NEW packages will be installed:\n  robwhit robwhit.sh\n\n0 upgraded, 2 newly installed, 0 to remove and 42 not upgraded.\nNeed to get 27.9 kB of archives.\nAfter this operation, 114 kB of additional disk space will be used.\nDo you want to continue? [Y/n] \nGet:1 http://spaghet.spaghetian.org/spaghetian stretch/main amd64 robwhit all 3.03+dfsg2-3 [20.1 kB]\nGet:2 http://spaghet.spaghetian.org/spaghetian stretch/main amd64 robwhit-off all 3.03+dfsg2-3 [7,816 B]\nFetched 27.9 kB in 0s (510 kB/s)\nSelecting previously unselected package robwhit.\n\nreticulating splines ... \nreticulating splines ... 5%\nreticulating splines ... 10%\nreticulating splines ... 15%\nreticulating splines ... 20%\nreticulating splines ... 25%\nreticulating splines ... 30%\nreticulating splines ... 35%\nreticulating splines ... 40%\nreticulating splines ... 45%\nreticulating splines ... 50%\nreticulating splines ... 55%\nreticulating splines ... 60%\nreticulating splines ... 65%\nreticulating splines ... 70%\nreticulating splines ... 75%\nreticulating splines ... 80%\nreticulating splines ... 85%\nreticulating splines ... 90%\nreticulating splines ... 95%\nreticulating splines ... 100%\n82491 splines reticulated\n\nPreparing to unpack .../robwhit_3.03+dfsg2-3_all.spaghet ...\n\nUnpacking robwhit (3.03+dfsg2-3) ...\n\nSelecting previously unselected package robwhit-off.\n\nPreparing to unpack .../robwhit-off_3.03+dfsg2-3_all.spaghet ...\n\nUnpacking robwhit-off (3.03+dfsg2-3) ...\n\nSetting up robwhit (3.03+dfsg2-3) ...\n\nSetting up robwhit-off (3.03+dfsg2-3) ...\n\nProcessing triggers for man-db (2.7.6.1-2) ...\n\n ________________ \n< Did someone say spaghet? >\n ---------------- \n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||\n\n\n\n\n\n\n                \n\n");
;// CONCATENATED MODULE: ./webpack/index.js



function login() {
  const $terminal = document.getElementById('terminal');
  const $line = document.createElement('pre');
  $terminal.appendChild($line);
  const tw = new (core_default())($line, {
    autoStart: false,
    delay: 10
  });
  tw.pasteString('<span class="green">guest</span>@<span class="purp">robwhit.sh</span>:~ $ ').pauseFor(200).typeString('sudo apt-get install robwhit.sh<br/>').pauseFor(1000).callFunction(() => {
    const dumpLines = dump.split('\n');
    let i = 0;

    function dumpNext() {
      if (i < dumpLines.length) {
        const $line = document.createElement('pre');
        $line.innerHTML = dumpLines[i] || ' ';
        $terminal.appendChild($line);
        $line.scrollIntoView();
        i++;
        setTimeout(dumpNext, 10);
      } else {
        window.location.replace('/～');
      }
    }

    dumpNext();
  }).start();
  /*  .pauseFor(1000)
  .pasteString('<span class="green">guest</span>@<span class="purp">robwhit.sh</span>:~ $ ')
  .pauseFor(2000)
  .typeString('ls -F<br/>')
  .pauseFor(100)
  .pasteString('me/      projects/      robwhit.sh*<br/>')
  .pasteString('<span class="green">guest</span>@<span class="purp">robwhit.sh</span>:~ $ ')
  .pauseFor(2000)
  .typeString('cat robwhit.sh<br/>')
  .pauseFor(100)
  .pasteString('cat: robwhit.sh: Permission denied<br/>')
  .pasteString('<span class="green">guest</span>@<span class="purp">robwhit.sh</span>:~ $ ')
  .pauseFor(2000)
  .typeString('stat -c "%U %A" robwhit.sh<br/>')
  .pauseFor(100)
  .pasteString('robwhit -rwx--x--x<br/>')
  .pasteString('<span class="green">guest</span>@<span class="purp">robwhit.sh</span>:~ $ ')
  .pauseFor(2000) .typeString('./robwhit.sh') .pauseFor(2000) .typeString('<br/>') .pauseFor(500) 
  */
}

setTimeout(() => {
  // Hide the header & footer during the funky login sequence.
  let hide = $e => $e.style.display = 'none';

  for (let $e of document.getElementsByTagName('header')) hide($e);

  for (let $e of document.getElementsByTagName('footer')) hide($e); // Do the little type dance.


  login();
}, 1);
})();

/******/ })()
;