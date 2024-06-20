"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@radix-ui+react-use-layout-effect@1.0.1_@types+react@18.3.3_react@18.3.1";
exports.ids = ["vendor-chunks/@radix-ui+react-use-layout-effect@1.0.1_@types+react@18.3.3_react@18.3.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@radix-ui+react-use-layout-effect@1.0.1_@types+react@18.3.3_react@18.3.1/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+react-use-layout-effect@1.0.1_@types+react@18.3.3_react@18.3.1/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs ***!
  \*******************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useLayoutEffect: () => (/* binding */ $9f79659886946c16$export$e5c5a5f917a5871c)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/.pnpm/next@14.2.4_@babel+core@7.24.7_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n\n\n\n/**\n * On the server, React emits a warning when calling `useLayoutEffect`.\n * This is because neither `useLayoutEffect` nor `useEffect` run on the server.\n * We use this safe version which suppresses the warning by replacing it with a noop on the server.\n *\n * See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect\n */ const $9f79659886946c16$export$e5c5a5f917a5871c = Boolean(globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : ()=>{};\n\n\n\n\n\n//# sourceMappingURL=index.mjs.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJhZGl4LXVpK3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0QDEuMC4xX0B0eXBlcytyZWFjdEAxOC4zLjNfcmVhY3RAMTguMy4xL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtdXNlLWxheW91dC1lZmZlY3QvZGlzdC9pbmRleC5tanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBZ0U7OztBQUdoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2SUFBNkksa0RBQXNCOzs7OztBQUs3RjtBQUN0RSIsInNvdXJjZXMiOlsid2VicGFjazovL25mdG1hcmtldC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AcmFkaXgtdWkrcmVhY3QtdXNlLWxheW91dC1lZmZlY3RAMS4wLjFfQHR5cGVzK3JlYWN0QDE4LjMuM19yZWFjdEAxOC4zLjEvbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdC9kaXN0L2luZGV4Lm1qcz83ZWJhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dXNlTGF5b3V0RWZmZWN0IGFzICRkeGx3SCR1c2VMYXlvdXRFZmZlY3R9IGZyb20gXCJyZWFjdFwiO1xuXG5cbi8qKlxuICogT24gdGhlIHNlcnZlciwgUmVhY3QgZW1pdHMgYSB3YXJuaW5nIHdoZW4gY2FsbGluZyBgdXNlTGF5b3V0RWZmZWN0YC5cbiAqIFRoaXMgaXMgYmVjYXVzZSBuZWl0aGVyIGB1c2VMYXlvdXRFZmZlY3RgIG5vciBgdXNlRWZmZWN0YCBydW4gb24gdGhlIHNlcnZlci5cbiAqIFdlIHVzZSB0aGlzIHNhZmUgdmVyc2lvbiB3aGljaCBzdXBwcmVzc2VzIHRoZSB3YXJuaW5nIGJ5IHJlcGxhY2luZyBpdCB3aXRoIGEgbm9vcCBvbiB0aGUgc2VydmVyLlxuICpcbiAqIFNlZTogaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL2hvb2tzLXJlZmVyZW5jZS5odG1sI3VzZWxheW91dGVmZmVjdFxuICovIGNvbnN0ICQ5Zjc5NjU5ODg2OTQ2YzE2JGV4cG9ydCRlNWM1YTVmOTE3YTU4NzFjID0gQm9vbGVhbihnbG9iYWxUaGlzID09PSBudWxsIHx8IGdsb2JhbFRoaXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGdsb2JhbFRoaXMuZG9jdW1lbnQpID8gJGR4bHdIJHVzZUxheW91dEVmZmVjdCA6ICgpPT57fTtcblxuXG5cblxuZXhwb3J0IHskOWY3OTY1OTg4Njk0NmMxNiRleHBvcnQkZTVjNWE1ZjkxN2E1ODcxYyBhcyB1c2VMYXlvdXRFZmZlY3R9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@radix-ui+react-use-layout-effect@1.0.1_@types+react@18.3.3_react@18.3.1/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs\n");

/***/ })

};
;