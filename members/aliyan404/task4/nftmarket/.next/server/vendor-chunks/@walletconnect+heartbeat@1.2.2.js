"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@walletconnect+heartbeat@1.2.2";
exports.ids = ["vendor-chunks/@walletconnect+heartbeat@1.2.2"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@walletconnect+heartbeat@1.2.2/node_modules/@walletconnect/heartbeat/dist/index.es.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@walletconnect+heartbeat@1.2.2/node_modules/@walletconnect/heartbeat/dist/index.es.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HEARTBEAT_EVENTS: () => (/* binding */ r),\n/* harmony export */   HEARTBEAT_INTERVAL: () => (/* binding */ s),\n/* harmony export */   HeartBeat: () => (/* binding */ i),\n/* harmony export */   IHeartBeat: () => (/* binding */ n)\n/* harmony export */ });\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ \"events\");\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _walletconnect_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @walletconnect/time */ \"(ssr)/./node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/index.js\");\n/* harmony import */ var _walletconnect_time__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_walletconnect_time__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _walletconnect_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @walletconnect/events */ \"(ssr)/./node_modules/.pnpm/@walletconnect+events@1.0.1/node_modules/@walletconnect/events/dist/esm/index.js\");\nclass n extends _walletconnect_events__WEBPACK_IMPORTED_MODULE_2__.IEvents{constructor(e){super()}}const s=_walletconnect_time__WEBPACK_IMPORTED_MODULE_1__.FIVE_SECONDS,r={pulse:\"heartbeat_pulse\"};class i extends n{constructor(e){super(e),this.events=new events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter,this.interval=s,this.interval=e?.interval||s}static async init(e){const t=new i(e);return await t.init(),t}async init(){await this.initialize()}stop(){clearInterval(this.intervalRef)}on(e,t){this.events.on(e,t)}once(e,t){this.events.once(e,t)}off(e,t){this.events.off(e,t)}removeListener(e,t){this.events.removeListener(e,t)}async initialize(){this.intervalRef=setInterval(()=>this.pulse(),(0,_walletconnect_time__WEBPACK_IMPORTED_MODULE_1__.toMiliseconds)(this.interval))}pulse(){this.events.emit(r.pulse)}}\n//# sourceMappingURL=index.es.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHdhbGxldGNvbm5lY3QraGVhcnRiZWF0QDEuMi4yL25vZGVfbW9kdWxlcy9Ad2FsbGV0Y29ubmVjdC9oZWFydGJlYXQvZGlzdC9pbmRleC5lcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBNEosZ0JBQWdCLDBEQUFDLENBQUMsZUFBZSxTQUFTLFFBQVEsNkRBQUMsSUFBSSx5QkFBeUIsa0JBQWtCLGVBQWUseUJBQXlCLGdEQUFDLDhDQUE4QyxxQkFBcUIsaUJBQWlCLHdCQUF3QixhQUFhLHdCQUF3QixPQUFPLGdDQUFnQyxRQUFRLG9CQUFvQixVQUFVLHNCQUFzQixTQUFTLHFCQUFxQixvQkFBb0IsZ0NBQWdDLG1CQUFtQiw4Q0FBOEMsa0VBQUMsaUJBQWlCLFFBQVEsMkJBQWdIO0FBQ3h6QiIsInNvdXJjZXMiOlsid2VicGFjazovL25mdG1hcmtldC8uL25vZGVfbW9kdWxlcy8ucG5wbS9Ad2FsbGV0Y29ubmVjdCtoZWFydGJlYXRAMS4yLjIvbm9kZV9tb2R1bGVzL0B3YWxsZXRjb25uZWN0L2hlYXJ0YmVhdC9kaXN0L2luZGV4LmVzLmpzPzU2MjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0e0V2ZW50RW1pdHRlciBhcyBhfWZyb21cImV2ZW50c1wiO2ltcG9ydHtGSVZFX1NFQ09ORFMgYXMgbyx0b01pbGlzZWNvbmRzIGFzIGx9ZnJvbVwiQHdhbGxldGNvbm5lY3QvdGltZVwiO2ltcG9ydHtJRXZlbnRzIGFzIHZ9ZnJvbVwiQHdhbGxldGNvbm5lY3QvZXZlbnRzXCI7Y2xhc3MgbiBleHRlbmRzIHZ7Y29uc3RydWN0b3IoZSl7c3VwZXIoKX19Y29uc3Qgcz1vLHI9e3B1bHNlOlwiaGVhcnRiZWF0X3B1bHNlXCJ9O2NsYXNzIGkgZXh0ZW5kcyBue2NvbnN0cnVjdG9yKGUpe3N1cGVyKGUpLHRoaXMuZXZlbnRzPW5ldyBhLHRoaXMuaW50ZXJ2YWw9cyx0aGlzLmludGVydmFsPWU/LmludGVydmFsfHxzfXN0YXRpYyBhc3luYyBpbml0KGUpe2NvbnN0IHQ9bmV3IGkoZSk7cmV0dXJuIGF3YWl0IHQuaW5pdCgpLHR9YXN5bmMgaW5pdCgpe2F3YWl0IHRoaXMuaW5pdGlhbGl6ZSgpfXN0b3AoKXtjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxSZWYpfW9uKGUsdCl7dGhpcy5ldmVudHMub24oZSx0KX1vbmNlKGUsdCl7dGhpcy5ldmVudHMub25jZShlLHQpfW9mZihlLHQpe3RoaXMuZXZlbnRzLm9mZihlLHQpfXJlbW92ZUxpc3RlbmVyKGUsdCl7dGhpcy5ldmVudHMucmVtb3ZlTGlzdGVuZXIoZSx0KX1hc3luYyBpbml0aWFsaXplKCl7dGhpcy5pbnRlcnZhbFJlZj1zZXRJbnRlcnZhbCgoKT0+dGhpcy5wdWxzZSgpLGwodGhpcy5pbnRlcnZhbCkpfXB1bHNlKCl7dGhpcy5ldmVudHMuZW1pdChyLnB1bHNlKX19ZXhwb3J0e3IgYXMgSEVBUlRCRUFUX0VWRU5UUyxzIGFzIEhFQVJUQkVBVF9JTlRFUlZBTCxpIGFzIEhlYXJ0QmVhdCxuIGFzIElIZWFydEJlYXR9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguZXMuanMubWFwXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@walletconnect+heartbeat@1.2.2/node_modules/@walletconnect/heartbeat/dist/index.es.js\n");

/***/ })

};
;