"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@motionone+types@10.17.1";
exports.ids = ["vendor-chunks/@motionone+types@10.17.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@motionone+types@10.17.1/node_modules/@motionone/types/dist/MotionValue.es.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@motionone+types@10.17.1/node_modules/@motionone/types/dist/MotionValue.es.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MotionValue: () => (/* binding */ MotionValue)\n/* harmony export */ });\n/**\n * The MotionValue tracks the state of a single animatable\n * value. Currently, updatedAt and current are unused. The\n * long term idea is to use this to minimise the number\n * of DOM reads, and to abstract the DOM interactions here.\n */\nclass MotionValue {\n    setAnimation(animation) {\n        this.animation = animation;\n        animation === null || animation === void 0 ? void 0 : animation.finished.then(() => this.clearAnimation()).catch(() => { });\n    }\n    clearAnimation() {\n        this.animation = this.generator = undefined;\n    }\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQG1vdGlvbm9uZSt0eXBlc0AxMC4xNy4xL25vZGVfbW9kdWxlcy9AbW90aW9ub25lL3R5cGVzL2Rpc3QvTW90aW9uVmFsdWUuZXMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtJQUFrSTtBQUNsSTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUV1QiIsInNvdXJjZXMiOlsid2VicGFjazovL25mdG1hcmtldC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AbW90aW9ub25lK3R5cGVzQDEwLjE3LjEvbm9kZV9tb2R1bGVzL0Btb3Rpb25vbmUvdHlwZXMvZGlzdC9Nb3Rpb25WYWx1ZS5lcy5qcz82ZmE0Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhlIE1vdGlvblZhbHVlIHRyYWNrcyB0aGUgc3RhdGUgb2YgYSBzaW5nbGUgYW5pbWF0YWJsZVxuICogdmFsdWUuIEN1cnJlbnRseSwgdXBkYXRlZEF0IGFuZCBjdXJyZW50IGFyZSB1bnVzZWQuIFRoZVxuICogbG9uZyB0ZXJtIGlkZWEgaXMgdG8gdXNlIHRoaXMgdG8gbWluaW1pc2UgdGhlIG51bWJlclxuICogb2YgRE9NIHJlYWRzLCBhbmQgdG8gYWJzdHJhY3QgdGhlIERPTSBpbnRlcmFjdGlvbnMgaGVyZS5cbiAqL1xuY2xhc3MgTW90aW9uVmFsdWUge1xuICAgIHNldEFuaW1hdGlvbihhbmltYXRpb24pIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBhbmltYXRpb247XG4gICAgICAgIGFuaW1hdGlvbiA9PT0gbnVsbCB8fCBhbmltYXRpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFuaW1hdGlvbi5maW5pc2hlZC50aGVuKCgpID0+IHRoaXMuY2xlYXJBbmltYXRpb24oKSkuY2F0Y2goKCkgPT4geyB9KTtcbiAgICB9XG4gICAgY2xlYXJBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5nZW5lcmF0b3IgPSB1bmRlZmluZWQ7XG4gICAgfVxufVxuXG5leHBvcnQgeyBNb3Rpb25WYWx1ZSB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@motionone+types@10.17.1/node_modules/@motionone/types/dist/MotionValue.es.js\n");

/***/ })

};
;