"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@walletconnect+window-getters@1.0.1";
exports.ids = ["vendor-chunks/@walletconnect+window-getters@1.0.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@walletconnect+window-getters@1.0.1/node_modules/@walletconnect/window-getters/dist/cjs/index.js":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@walletconnect+window-getters@1.0.1/node_modules/@walletconnect/window-getters/dist/cjs/index.js ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getLocalStorage = exports.getLocalStorageOrThrow = exports.getCrypto = exports.getCryptoOrThrow = exports.getLocation = exports.getLocationOrThrow = exports.getNavigator = exports.getNavigatorOrThrow = exports.getDocument = exports.getDocumentOrThrow = exports.getFromWindowOrThrow = exports.getFromWindow = void 0;\nfunction getFromWindow(name) {\n    let res = undefined;\n    if (typeof window !== \"undefined\" && typeof window[name] !== \"undefined\") {\n        res = window[name];\n    }\n    return res;\n}\nexports.getFromWindow = getFromWindow;\nfunction getFromWindowOrThrow(name) {\n    const res = getFromWindow(name);\n    if (!res) {\n        throw new Error(`${name} is not defined in Window`);\n    }\n    return res;\n}\nexports.getFromWindowOrThrow = getFromWindowOrThrow;\nfunction getDocumentOrThrow() {\n    return getFromWindowOrThrow(\"document\");\n}\nexports.getDocumentOrThrow = getDocumentOrThrow;\nfunction getDocument() {\n    return getFromWindow(\"document\");\n}\nexports.getDocument = getDocument;\nfunction getNavigatorOrThrow() {\n    return getFromWindowOrThrow(\"navigator\");\n}\nexports.getNavigatorOrThrow = getNavigatorOrThrow;\nfunction getNavigator() {\n    return getFromWindow(\"navigator\");\n}\nexports.getNavigator = getNavigator;\nfunction getLocationOrThrow() {\n    return getFromWindowOrThrow(\"location\");\n}\nexports.getLocationOrThrow = getLocationOrThrow;\nfunction getLocation() {\n    return getFromWindow(\"location\");\n}\nexports.getLocation = getLocation;\nfunction getCryptoOrThrow() {\n    return getFromWindowOrThrow(\"crypto\");\n}\nexports.getCryptoOrThrow = getCryptoOrThrow;\nfunction getCrypto() {\n    return getFromWindow(\"crypto\");\n}\nexports.getCrypto = getCrypto;\nfunction getLocalStorageOrThrow() {\n    return getFromWindowOrThrow(\"localStorage\");\n}\nexports.getLocalStorageOrThrow = getLocalStorageOrThrow;\nfunction getLocalStorage() {\n    return getFromWindow(\"localStorage\");\n}\nexports.getLocalStorage = getLocalStorage;\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHdhbGxldGNvbm5lY3Qrd2luZG93LWdldHRlcnNAMS4wLjEvbm9kZV9tb2R1bGVzL0B3YWxsZXRjb25uZWN0L3dpbmRvdy1nZXR0ZXJzL2Rpc3QvY2pzL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHVCQUF1QixHQUFHLDhCQUE4QixHQUFHLGlCQUFpQixHQUFHLHdCQUF3QixHQUFHLG1CQUFtQixHQUFHLDBCQUEwQixHQUFHLG9CQUFvQixHQUFHLDJCQUEyQixHQUFHLG1CQUFtQixHQUFHLDBCQUEwQixHQUFHLDRCQUE0QixHQUFHLHFCQUFxQjtBQUN6VDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsTUFBTTtBQUNqQztBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmZ0bWFya2V0Ly4vbm9kZV9tb2R1bGVzLy5wbnBtL0B3YWxsZXRjb25uZWN0K3dpbmRvdy1nZXR0ZXJzQDEuMC4xL25vZGVfbW9kdWxlcy9Ad2FsbGV0Y29ubmVjdC93aW5kb3ctZ2V0dGVycy9kaXN0L2Nqcy9pbmRleC5qcz8wZDkxIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRMb2NhbFN0b3JhZ2UgPSBleHBvcnRzLmdldExvY2FsU3RvcmFnZU9yVGhyb3cgPSBleHBvcnRzLmdldENyeXB0byA9IGV4cG9ydHMuZ2V0Q3J5cHRvT3JUaHJvdyA9IGV4cG9ydHMuZ2V0TG9jYXRpb24gPSBleHBvcnRzLmdldExvY2F0aW9uT3JUaHJvdyA9IGV4cG9ydHMuZ2V0TmF2aWdhdG9yID0gZXhwb3J0cy5nZXROYXZpZ2F0b3JPclRocm93ID0gZXhwb3J0cy5nZXREb2N1bWVudCA9IGV4cG9ydHMuZ2V0RG9jdW1lbnRPclRocm93ID0gZXhwb3J0cy5nZXRGcm9tV2luZG93T3JUaHJvdyA9IGV4cG9ydHMuZ2V0RnJvbVdpbmRvdyA9IHZvaWQgMDtcbmZ1bmN0aW9uIGdldEZyb21XaW5kb3cobmFtZSkge1xuICAgIGxldCByZXMgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHdpbmRvd1tuYW1lXSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXMgPSB3aW5kb3dbbmFtZV07XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5leHBvcnRzLmdldEZyb21XaW5kb3cgPSBnZXRGcm9tV2luZG93O1xuZnVuY3Rpb24gZ2V0RnJvbVdpbmRvd09yVGhyb3cobmFtZSkge1xuICAgIGNvbnN0IHJlcyA9IGdldEZyb21XaW5kb3cobmFtZSk7XG4gICAgaWYgKCFyZXMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke25hbWV9IGlzIG5vdCBkZWZpbmVkIGluIFdpbmRvd2ApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuZXhwb3J0cy5nZXRGcm9tV2luZG93T3JUaHJvdyA9IGdldEZyb21XaW5kb3dPclRocm93O1xuZnVuY3Rpb24gZ2V0RG9jdW1lbnRPclRocm93KCkge1xuICAgIHJldHVybiBnZXRGcm9tV2luZG93T3JUaHJvdyhcImRvY3VtZW50XCIpO1xufVxuZXhwb3J0cy5nZXREb2N1bWVudE9yVGhyb3cgPSBnZXREb2N1bWVudE9yVGhyb3c7XG5mdW5jdGlvbiBnZXREb2N1bWVudCgpIHtcbiAgICByZXR1cm4gZ2V0RnJvbVdpbmRvdyhcImRvY3VtZW50XCIpO1xufVxuZXhwb3J0cy5nZXREb2N1bWVudCA9IGdldERvY3VtZW50O1xuZnVuY3Rpb24gZ2V0TmF2aWdhdG9yT3JUaHJvdygpIHtcbiAgICByZXR1cm4gZ2V0RnJvbVdpbmRvd09yVGhyb3coXCJuYXZpZ2F0b3JcIik7XG59XG5leHBvcnRzLmdldE5hdmlnYXRvck9yVGhyb3cgPSBnZXROYXZpZ2F0b3JPclRocm93O1xuZnVuY3Rpb24gZ2V0TmF2aWdhdG9yKCkge1xuICAgIHJldHVybiBnZXRGcm9tV2luZG93KFwibmF2aWdhdG9yXCIpO1xufVxuZXhwb3J0cy5nZXROYXZpZ2F0b3IgPSBnZXROYXZpZ2F0b3I7XG5mdW5jdGlvbiBnZXRMb2NhdGlvbk9yVGhyb3coKSB7XG4gICAgcmV0dXJuIGdldEZyb21XaW5kb3dPclRocm93KFwibG9jYXRpb25cIik7XG59XG5leHBvcnRzLmdldExvY2F0aW9uT3JUaHJvdyA9IGdldExvY2F0aW9uT3JUaHJvdztcbmZ1bmN0aW9uIGdldExvY2F0aW9uKCkge1xuICAgIHJldHVybiBnZXRGcm9tV2luZG93KFwibG9jYXRpb25cIik7XG59XG5leHBvcnRzLmdldExvY2F0aW9uID0gZ2V0TG9jYXRpb247XG5mdW5jdGlvbiBnZXRDcnlwdG9PclRocm93KCkge1xuICAgIHJldHVybiBnZXRGcm9tV2luZG93T3JUaHJvdyhcImNyeXB0b1wiKTtcbn1cbmV4cG9ydHMuZ2V0Q3J5cHRvT3JUaHJvdyA9IGdldENyeXB0b09yVGhyb3c7XG5mdW5jdGlvbiBnZXRDcnlwdG8oKSB7XG4gICAgcmV0dXJuIGdldEZyb21XaW5kb3coXCJjcnlwdG9cIik7XG59XG5leHBvcnRzLmdldENyeXB0byA9IGdldENyeXB0bztcbmZ1bmN0aW9uIGdldExvY2FsU3RvcmFnZU9yVGhyb3coKSB7XG4gICAgcmV0dXJuIGdldEZyb21XaW5kb3dPclRocm93KFwibG9jYWxTdG9yYWdlXCIpO1xufVxuZXhwb3J0cy5nZXRMb2NhbFN0b3JhZ2VPclRocm93ID0gZ2V0TG9jYWxTdG9yYWdlT3JUaHJvdztcbmZ1bmN0aW9uIGdldExvY2FsU3RvcmFnZSgpIHtcbiAgICByZXR1cm4gZ2V0RnJvbVdpbmRvdyhcImxvY2FsU3RvcmFnZVwiKTtcbn1cbmV4cG9ydHMuZ2V0TG9jYWxTdG9yYWdlID0gZ2V0TG9jYWxTdG9yYWdlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@walletconnect+window-getters@1.0.1/node_modules/@walletconnect/window-getters/dist/cjs/index.js\n");

/***/ })

};
;