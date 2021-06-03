!function(t){var e={};function n(o){if(e[o])return e[o].exports;var a=e[o]={i:o,l:!1,exports:{}};return t[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(o,a,function(e){return t[e]}.bind(null,a));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}n.r(e);var a=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n,a;return e=t,(n=[{key:"validate",value:function(t){this.regex=/\[?(-?[0-9]+\.[0-9]+)\s?,\s?(-?[0-9]+\.[0-9]+)\]?/gm;var e=this.regex.exec(t);if(!e)throw new Error("Неверный формат координат.");var n=e[1],o=e[2];if(parseFloat(n.replace("-",""))>90||parseFloat(o.replace("-",""))>180)throw new Error("Координаты за пределами допустимых значений.");return{latitude:n,longitude:o}}}])&&o(e.prototype,n),a&&o(e,a),t}();function r(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}(new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.storage=JSON.parse(window.localStorage.getItem("posts"))||[],this.storage.length&&(this.posts=this.storage.sort((function(t,e){return new Date(t.date)-new Date(e.date)}))),this.container=document.createElement("div"),this.container.id="container",document.body.appendChild(this.container),this.coordsValidator=new a}var e,n,o;return e=t,(n=[{key:"showPost",value:function(t){var e=document.createElement("div");e.className="post";var n=document.createElement("span");n.className="post-date",n.innerText=t.date;var o=document.createElement("p");o.className="post-text",o.innerText=t.text;var a=document.createElement("span");a.className="post-location",a.innerText="".concat(t.coords.latitude,", ").concat(t.coords.longitude),e.append(n,o,a),this.addButton.insertAdjacentElement("afterend",e)}},{key:"openModal",value:function(){var t=this;this.manualCoords=!1;var e=document.createElement("div");e.id="modal-container";var n=document.createElement("div");n.id="modal-window";var o=document.createElement("form");o.id="add-form",o.name="add-form";var a=document.createElement("textarea");a.name="post-text",a.id="post-text",a.setAttribute("required",""),a.placeholder="Write something..";var r=document.createElement("button");r.id="save-button",r.innerText="Добавить";var i=document.createElement("button");i.id="cancel-button",i.innerText="Отмена",document.body.append(e),e.append(n),n.append(o),o.append(a,r,i),i.addEventListener("click",(function(t){t.preventDefault(),document.getElementById("modal-container").remove()})),o.addEventListener("submit",(function(e){if(e.preventDefault(),t.data={text:a.value},t.manualCoords)try{t.data.coords=t.coordsValidator.validate(t.postLocation.value),t.savePost()}catch(e){"warning"===t.postLocation.nextSibling.className&&t.postLocation.nextSibling.remove(),t.postLocation.insertAdjacentHTML("afterend",'<span class="warning">'.concat(e.message,"</span>"))}else navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(e){var n=e.coords,o=n.latitude,a=n.longitude;t.data.coords={latitude:o,longitude:a},t.savePost()}),(function(){t.showCoordsField(),t.manualCoords=!0}))}))}},{key:"savePost",value:function(){this.data.date=(new Date).toLocaleString(),this.storage.push(this.data),window.localStorage.setItem("posts",JSON.stringify(this.storage)),this.showPost(this.data),document.getElementById("modal-container").remove()}},{key:"showAddButton",value:function(){var t=this;this.addButton=document.createElement("button"),this.addButton.innerText="Добавить пост +",this.addButton.id="add-button",this.addButton.addEventListener("click",(function(e){e.preventDefault(),t.openModal()})),this.container.append(this.addButton)}},{key:"showCoordsField",value:function(){this.postLocation=document.createElement("input"),this.postLocation.id="post-location",this.postLocation.name="post-location",this.postLocation.required=!0,document.getElementById("post-text").insertAdjacentHTML("afterend",'<span class="warning">Что-то пошло не так. Пожалуйста, введите координаты:</span>'),document.getElementById("save-button").insertAdjacentElement("beforebegin",this.postLocation)}},{key:"init",value:function(){var t=this;this.showAddButton(),this.posts&&this.posts.forEach((function(e){return t.showPost(e)}))}}])&&r(e.prototype,n),o&&r(e,o),t}())).init()}]);