"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/motion@10.16.2";
exports.ids = ["vendor-chunks/motion@10.16.2"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/motion@10.16.2/node_modules/motion/dist/animate.es.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/.pnpm/motion@10.16.2/node_modules/motion/dist/animate.es.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   animate: () => (/* binding */ animate),\n/* harmony export */   animateProgress: () => (/* binding */ animateProgress)\n/* harmony export */ });\n/* harmony import */ var _motionone_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/dom */ \"(ssr)/./node_modules/.pnpm/@motionone+dom@10.18.0/node_modules/@motionone/dom/dist/animate/utils/controls.es.js\");\n/* harmony import */ var _motionone_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @motionone/dom */ \"(ssr)/./node_modules/.pnpm/@motionone+dom@10.18.0/node_modules/@motionone/dom/dist/animate/index.es.js\");\n/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @motionone/utils */ \"(ssr)/./node_modules/.pnpm/@motionone+utils@10.18.0/node_modules/@motionone/utils/dist/is-function.es.js\");\n/* harmony import */ var _motionone_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @motionone/animation */ \"(ssr)/./node_modules/.pnpm/@motionone+animation@10.18.0/node_modules/@motionone/animation/dist/Animation.es.js\");\n\n\n\n\nfunction animateProgress(target, options = {}) {\n    return (0,_motionone_dom__WEBPACK_IMPORTED_MODULE_0__.withControls)([\n        () => {\n            const animation = new _motionone_animation__WEBPACK_IMPORTED_MODULE_1__.Animation(target, [0, 1], options);\n            animation.finished.catch(() => { });\n            return animation;\n        },\n    ], options, options.duration);\n}\nfunction animate(target, keyframesOrOptions, options) {\n    const factory = (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_2__.isFunction)(target) ? animateProgress : _motionone_dom__WEBPACK_IMPORTED_MODULE_3__.animate;\n    return factory(target, keyframesOrOptions, options);\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vbW90aW9uQDEwLjE2LjIvbm9kZV9tb2R1bGVzL21vdGlvbi9kaXN0L2FuaW1hdGUuZXMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQW9FO0FBQ3RCO0FBQ0c7O0FBRWpELDZDQUE2QztBQUM3QyxXQUFXLDREQUFZO0FBQ3ZCO0FBQ0Esa0NBQWtDLDJEQUFTO0FBQzNDLDhDQUE4QztBQUM5QztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNERBQVUsNkJBQTZCLG1EQUFTO0FBQ3BFO0FBQ0E7O0FBRW9DIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmZ0bWFya2V0Ly4vbm9kZV9tb2R1bGVzLy5wbnBtL21vdGlvbkAxMC4xNi4yL25vZGVfbW9kdWxlcy9tb3Rpb24vZGlzdC9hbmltYXRlLmVzLmpzPzk2YWEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSBhcyBhbmltYXRlJDEsIHdpdGhDb250cm9scyB9IGZyb20gJ0Btb3Rpb25vbmUvZG9tJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICdAbW90aW9ub25lL3V0aWxzJztcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gJ0Btb3Rpb25vbmUvYW5pbWF0aW9uJztcblxuZnVuY3Rpb24gYW5pbWF0ZVByb2dyZXNzKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIHdpdGhDb250cm9scyhbXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24odGFyZ2V0LCBbMCwgMV0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgYW5pbWF0aW9uLmZpbmlzaGVkLmNhdGNoKCgpID0+IHsgfSk7XG4gICAgICAgICAgICByZXR1cm4gYW5pbWF0aW9uO1xuICAgICAgICB9LFxuICAgIF0sIG9wdGlvbnMsIG9wdGlvbnMuZHVyYXRpb24pO1xufVxuZnVuY3Rpb24gYW5pbWF0ZSh0YXJnZXQsIGtleWZyYW1lc09yT3B0aW9ucywgb3B0aW9ucykge1xuICAgIGNvbnN0IGZhY3RvcnkgPSBpc0Z1bmN0aW9uKHRhcmdldCkgPyBhbmltYXRlUHJvZ3Jlc3MgOiBhbmltYXRlJDE7XG4gICAgcmV0dXJuIGZhY3RvcnkodGFyZ2V0LCBrZXlmcmFtZXNPck9wdGlvbnMsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgeyBhbmltYXRlLCBhbmltYXRlUHJvZ3Jlc3MgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/motion@10.16.2/node_modules/motion/dist/animate.es.js\n");

/***/ })

};
;