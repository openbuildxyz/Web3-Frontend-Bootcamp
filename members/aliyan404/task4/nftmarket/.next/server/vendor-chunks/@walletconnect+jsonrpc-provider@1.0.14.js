"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@walletconnect+jsonrpc-provider@1.0.14";
exports.ids = ["vendor-chunks/@walletconnect+jsonrpc-provider@1.0.14"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@walletconnect+jsonrpc-provider@1.0.14/node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@walletconnect+jsonrpc-provider@1.0.14/node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   JsonRpcProvider: () => (/* binding */ o),\n/* harmony export */   \"default\": () => (/* binding */ o)\n/* harmony export */ });\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ \"events\");\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _walletconnect_jsonrpc_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @walletconnect/jsonrpc-utils */ \"(ssr)/./node_modules/.pnpm/@walletconnect+jsonrpc-utils@1.0.8/node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js\");\nclass o extends _walletconnect_jsonrpc_utils__WEBPACK_IMPORTED_MODULE_1__.IJsonRpcProvider{constructor(t){super(t),this.events=new events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter,this.hasRegisteredEventListeners=!1,this.connection=this.setConnection(t),this.connection.connected&&this.registerEventListeners()}async connect(t=this.connection){await this.open(t)}async disconnect(){await this.close()}on(t,e){this.events.on(t,e)}once(t,e){this.events.once(t,e)}off(t,e){this.events.off(t,e)}removeListener(t,e){this.events.removeListener(t,e)}async request(t,e){return this.requestStrict((0,_walletconnect_jsonrpc_utils__WEBPACK_IMPORTED_MODULE_1__.formatJsonRpcRequest)(t.method,t.params||[],t.id||(0,_walletconnect_jsonrpc_utils__WEBPACK_IMPORTED_MODULE_1__.getBigIntRpcId)().toString()),e)}async requestStrict(t,e){return new Promise(async(i,s)=>{if(!this.connection.connected)try{await this.open()}catch(n){s(n)}this.events.on(`${t.id}`,n=>{(0,_walletconnect_jsonrpc_utils__WEBPACK_IMPORTED_MODULE_1__.isJsonRpcError)(n)?s(n.error):i(n.result)});try{await this.connection.send(t,e)}catch(n){s(n)}})}setConnection(t=this.connection){return t}onPayload(t){this.events.emit(\"payload\",t),(0,_walletconnect_jsonrpc_utils__WEBPACK_IMPORTED_MODULE_1__.isJsonRpcResponse)(t)?this.events.emit(`${t.id}`,t):this.events.emit(\"message\",{type:t.method,data:t.params})}onClose(t){t&&t.code===3e3&&this.events.emit(\"error\",new Error(`WebSocket connection closed abnormally with code: ${t.code} ${t.reason?`(${t.reason})`:\"\"}`)),this.events.emit(\"disconnect\")}async open(t=this.connection){this.connection===t&&this.connection.connected||(this.connection.connected&&this.close(),typeof t==\"string\"&&(await this.connection.open(t),t=this.connection),this.connection=this.setConnection(t),await this.connection.open(),this.registerEventListeners(),this.events.emit(\"connect\"))}async close(){await this.connection.close()}registerEventListeners(){this.hasRegisteredEventListeners||(this.connection.on(\"payload\",t=>this.onPayload(t)),this.connection.on(\"close\",t=>this.onClose(t)),this.connection.on(\"error\",t=>this.events.emit(\"error\",t)),this.connection.on(\"register_error\",t=>this.onClose()),this.hasRegisteredEventListeners=!0)}}\n//# sourceMappingURL=index.es.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHdhbGxldGNvbm5lY3QranNvbnJwYy1wcm92aWRlckAxLjAuMTQvbm9kZV9tb2R1bGVzL0B3YWxsZXRjb25uZWN0L2pzb25ycGMtcHJvdmlkZXIvZGlzdC9pbmRleC5lcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUErTCxnQkFBZ0IsMEVBQUMsQ0FBQyxlQUFlLHlCQUF5QixnREFBQyxvSUFBb0ksaUNBQWlDLG1CQUFtQixtQkFBbUIsbUJBQW1CLFFBQVEsb0JBQW9CLFVBQVUsc0JBQXNCLFNBQVMscUJBQXFCLG9CQUFvQixnQ0FBZ0MsbUJBQW1CLDBCQUEwQixrRkFBQyw2QkFBNkIsNEVBQUMsa0JBQWtCLHlCQUF5QixnQ0FBZ0Msa0NBQWtDLGtCQUFrQixTQUFTLEtBQUssa0JBQWtCLEtBQUssTUFBTSw0RUFBQywyQkFBMkIsRUFBRSxJQUFJLGdDQUFnQyxTQUFTLE1BQU0sRUFBRSxpQ0FBaUMsU0FBUyxhQUFhLDhCQUE4QiwrRUFBQyx3QkFBd0IsS0FBSyxpQ0FBaUMsNEJBQTRCLEVBQUUsV0FBVyx5R0FBeUcsUUFBUSxFQUFFLGFBQWEsU0FBUyxNQUFNLG1DQUFtQyw4QkFBOEIsNlJBQTZSLGNBQWMsOEJBQThCLHlCQUF5Qiw2UkFBdVU7QUFDcitEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmZ0bWFya2V0Ly4vbm9kZV9tb2R1bGVzLy5wbnBtL0B3YWxsZXRjb25uZWN0K2pzb25ycGMtcHJvdmlkZXJAMS4wLjE0L25vZGVfbW9kdWxlcy9Ad2FsbGV0Y29ubmVjdC9qc29ucnBjLXByb3ZpZGVyL2Rpc3QvaW5kZXguZXMuanM/ZDdmNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnR7RXZlbnRFbWl0dGVyIGFzIGN9ZnJvbVwiZXZlbnRzXCI7aW1wb3J0e0lKc29uUnBjUHJvdmlkZXIgYXMgcixmb3JtYXRKc29uUnBjUmVxdWVzdCBhcyBoLGdldEJpZ0ludFJwY0lkIGFzIGEsaXNKc29uUnBjRXJyb3IgYXMgZCxpc0pzb25ScGNSZXNwb25zZSBhcyB2fWZyb21cIkB3YWxsZXRjb25uZWN0L2pzb25ycGMtdXRpbHNcIjtjbGFzcyBvIGV4dGVuZHMgcntjb25zdHJ1Y3Rvcih0KXtzdXBlcih0KSx0aGlzLmV2ZW50cz1uZXcgYyx0aGlzLmhhc1JlZ2lzdGVyZWRFdmVudExpc3RlbmVycz0hMSx0aGlzLmNvbm5lY3Rpb249dGhpcy5zZXRDb25uZWN0aW9uKHQpLHRoaXMuY29ubmVjdGlvbi5jb25uZWN0ZWQmJnRoaXMucmVnaXN0ZXJFdmVudExpc3RlbmVycygpfWFzeW5jIGNvbm5lY3QodD10aGlzLmNvbm5lY3Rpb24pe2F3YWl0IHRoaXMub3Blbih0KX1hc3luYyBkaXNjb25uZWN0KCl7YXdhaXQgdGhpcy5jbG9zZSgpfW9uKHQsZSl7dGhpcy5ldmVudHMub24odCxlKX1vbmNlKHQsZSl7dGhpcy5ldmVudHMub25jZSh0LGUpfW9mZih0LGUpe3RoaXMuZXZlbnRzLm9mZih0LGUpfXJlbW92ZUxpc3RlbmVyKHQsZSl7dGhpcy5ldmVudHMucmVtb3ZlTGlzdGVuZXIodCxlKX1hc3luYyByZXF1ZXN0KHQsZSl7cmV0dXJuIHRoaXMucmVxdWVzdFN0cmljdChoKHQubWV0aG9kLHQucGFyYW1zfHxbXSx0LmlkfHxhKCkudG9TdHJpbmcoKSksZSl9YXN5bmMgcmVxdWVzdFN0cmljdCh0LGUpe3JldHVybiBuZXcgUHJvbWlzZShhc3luYyhpLHMpPT57aWYoIXRoaXMuY29ubmVjdGlvbi5jb25uZWN0ZWQpdHJ5e2F3YWl0IHRoaXMub3BlbigpfWNhdGNoKG4pe3Mobil9dGhpcy5ldmVudHMub24oYCR7dC5pZH1gLG49PntkKG4pP3Mobi5lcnJvcik6aShuLnJlc3VsdCl9KTt0cnl7YXdhaXQgdGhpcy5jb25uZWN0aW9uLnNlbmQodCxlKX1jYXRjaChuKXtzKG4pfX0pfXNldENvbm5lY3Rpb24odD10aGlzLmNvbm5lY3Rpb24pe3JldHVybiB0fW9uUGF5bG9hZCh0KXt0aGlzLmV2ZW50cy5lbWl0KFwicGF5bG9hZFwiLHQpLHYodCk/dGhpcy5ldmVudHMuZW1pdChgJHt0LmlkfWAsdCk6dGhpcy5ldmVudHMuZW1pdChcIm1lc3NhZ2VcIix7dHlwZTp0Lm1ldGhvZCxkYXRhOnQucGFyYW1zfSl9b25DbG9zZSh0KXt0JiZ0LmNvZGU9PT0zZTMmJnRoaXMuZXZlbnRzLmVtaXQoXCJlcnJvclwiLG5ldyBFcnJvcihgV2ViU29ja2V0IGNvbm5lY3Rpb24gY2xvc2VkIGFibm9ybWFsbHkgd2l0aCBjb2RlOiAke3QuY29kZX0gJHt0LnJlYXNvbj9gKCR7dC5yZWFzb259KWA6XCJcIn1gKSksdGhpcy5ldmVudHMuZW1pdChcImRpc2Nvbm5lY3RcIil9YXN5bmMgb3Blbih0PXRoaXMuY29ubmVjdGlvbil7dGhpcy5jb25uZWN0aW9uPT09dCYmdGhpcy5jb25uZWN0aW9uLmNvbm5lY3RlZHx8KHRoaXMuY29ubmVjdGlvbi5jb25uZWN0ZWQmJnRoaXMuY2xvc2UoKSx0eXBlb2YgdD09XCJzdHJpbmdcIiYmKGF3YWl0IHRoaXMuY29ubmVjdGlvbi5vcGVuKHQpLHQ9dGhpcy5jb25uZWN0aW9uKSx0aGlzLmNvbm5lY3Rpb249dGhpcy5zZXRDb25uZWN0aW9uKHQpLGF3YWl0IHRoaXMuY29ubmVjdGlvbi5vcGVuKCksdGhpcy5yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCksdGhpcy5ldmVudHMuZW1pdChcImNvbm5lY3RcIikpfWFzeW5jIGNsb3NlKCl7YXdhaXQgdGhpcy5jb25uZWN0aW9uLmNsb3NlKCl9cmVnaXN0ZXJFdmVudExpc3RlbmVycygpe3RoaXMuaGFzUmVnaXN0ZXJlZEV2ZW50TGlzdGVuZXJzfHwodGhpcy5jb25uZWN0aW9uLm9uKFwicGF5bG9hZFwiLHQ9PnRoaXMub25QYXlsb2FkKHQpKSx0aGlzLmNvbm5lY3Rpb24ub24oXCJjbG9zZVwiLHQ9PnRoaXMub25DbG9zZSh0KSksdGhpcy5jb25uZWN0aW9uLm9uKFwiZXJyb3JcIix0PT50aGlzLmV2ZW50cy5lbWl0KFwiZXJyb3JcIix0KSksdGhpcy5jb25uZWN0aW9uLm9uKFwicmVnaXN0ZXJfZXJyb3JcIix0PT50aGlzLm9uQ2xvc2UoKSksdGhpcy5oYXNSZWdpc3RlcmVkRXZlbnRMaXN0ZW5lcnM9ITApfX1leHBvcnR7byBhcyBKc29uUnBjUHJvdmlkZXIsbyBhcyBkZWZhdWx0fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzLmpzLm1hcFxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@walletconnect+jsonrpc-provider@1.0.14/node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js\n");

/***/ })

};
;