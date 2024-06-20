/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@walletconnect+relay-auth@1.0.4";
exports.ids = ["vendor-chunks/@walletconnect+relay-auth@1.0.4"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/api.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/api.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateKeyPair: () => (/* binding */ generateKeyPair),\n/* harmony export */   signJWT: () => (/* binding */ signJWT),\n/* harmony export */   verifyJWT: () => (/* binding */ verifyJWT)\n/* harmony export */ });\n/* harmony import */ var _stablelib_ed25519__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stablelib/ed25519 */ \"(ssr)/./node_modules/.pnpm/@stablelib+ed25519@1.0.3/node_modules/@stablelib/ed25519/lib/ed25519.js\");\n/* harmony import */ var _stablelib_random__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @stablelib/random */ \"(ssr)/./node_modules/.pnpm/@stablelib+random@1.0.2/node_modules/@stablelib/random/lib/random.js\");\n/* harmony import */ var _walletconnect_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @walletconnect/time */ \"(ssr)/./node_modules/.pnpm/@walletconnect+time@1.0.2/node_modules/@walletconnect/time/dist/cjs/index.js\");\n/* harmony import */ var _walletconnect_time__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_walletconnect_time__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ \"(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/constants.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ \"(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/utils.js\");\n\n\n\n\n\nfunction generateKeyPair(seed = (0,_stablelib_random__WEBPACK_IMPORTED_MODULE_1__.randomBytes)(_constants__WEBPACK_IMPORTED_MODULE_3__.KEY_PAIR_SEED_LENGTH)) {\n    return _stablelib_ed25519__WEBPACK_IMPORTED_MODULE_0__.generateKeyPairFromSeed(seed);\n}\nasync function signJWT(sub, aud, ttl, keyPair, iat = (0,_walletconnect_time__WEBPACK_IMPORTED_MODULE_2__.fromMiliseconds)(Date.now())) {\n    const header = { alg: _constants__WEBPACK_IMPORTED_MODULE_3__.JWT_IRIDIUM_ALG, typ: _constants__WEBPACK_IMPORTED_MODULE_3__.JWT_IRIDIUM_TYP };\n    const iss = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.encodeIss)(keyPair.publicKey);\n    const exp = iat + ttl;\n    const payload = { iss, sub, aud, iat, exp };\n    const data = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.encodeData)({ header, payload });\n    const signature = _stablelib_ed25519__WEBPACK_IMPORTED_MODULE_0__.sign(keyPair.secretKey, data);\n    return (0,_utils__WEBPACK_IMPORTED_MODULE_4__.encodeJWT)({ header, payload, signature });\n}\nasync function verifyJWT(jwt) {\n    const { header, payload, data, signature } = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.decodeJWT)(jwt);\n    if (header.alg !== _constants__WEBPACK_IMPORTED_MODULE_3__.JWT_IRIDIUM_ALG || header.typ !== _constants__WEBPACK_IMPORTED_MODULE_3__.JWT_IRIDIUM_TYP) {\n        throw new Error(\"JWT must use EdDSA algorithm\");\n    }\n    const publicKey = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.decodeIss)(payload.iss);\n    return _stablelib_ed25519__WEBPACK_IMPORTED_MODULE_0__.verify(publicKey, data, signature);\n}\n//# sourceMappingURL=api.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHdhbGxldGNvbm5lY3QrcmVsYXktYXV0aEAxLjAuNC9ub2RlX21vZHVsZXMvQHdhbGxldGNvbm5lY3QvcmVsYXktYXV0aC9kaXN0L2VzbS9hcGkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQThDO0FBQ0U7QUFDTTtBQUNnQztBQUNKO0FBQzNFLGdDQUFnQyw4REFBVyxDQUFDLDREQUFvQjtBQUN2RSxXQUFXLHVFQUErQjtBQUMxQztBQUNPLHFEQUFxRCxvRUFBZTtBQUMzRSxxQkFBcUIsS0FBSyx1REFBZSxPQUFPLHVEQUFlO0FBQy9ELGdCQUFnQixpREFBUztBQUN6QjtBQUNBLHNCQUFzQjtBQUN0QixpQkFBaUIsa0RBQVUsR0FBRyxpQkFBaUI7QUFDL0Msc0JBQXNCLG9EQUFZO0FBQ2xDLFdBQVcsaURBQVMsR0FBRyw0QkFBNEI7QUFDbkQ7QUFDTztBQUNQLFlBQVksbUNBQW1DLEVBQUUsaURBQVM7QUFDMUQsdUJBQXVCLHVEQUFlLG1CQUFtQix1REFBZTtBQUN4RTtBQUNBO0FBQ0Esc0JBQXNCLGlEQUFTO0FBQy9CLFdBQVcsc0RBQWM7QUFDekI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25mdG1hcmtldC8uL25vZGVfbW9kdWxlcy8ucG5wbS9Ad2FsbGV0Y29ubmVjdCtyZWxheS1hdXRoQDEuMC40L25vZGVfbW9kdWxlcy9Ad2FsbGV0Y29ubmVjdC9yZWxheS1hdXRoL2Rpc3QvZXNtL2FwaS5qcz83ZDJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGVkMjU1MTkgZnJvbSBcIkBzdGFibGVsaWIvZWQyNTUxOVwiO1xuaW1wb3J0IHsgcmFuZG9tQnl0ZXMgfSBmcm9tIFwiQHN0YWJsZWxpYi9yYW5kb21cIjtcbmltcG9ydCB7IGZyb21NaWxpc2Vjb25kcyB9IGZyb20gXCJAd2FsbGV0Y29ubmVjdC90aW1lXCI7XG5pbXBvcnQgeyBKV1RfSVJJRElVTV9BTEcsIEpXVF9JUklESVVNX1RZUCwgS0VZX1BBSVJfU0VFRF9MRU5HVEgsIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBkZWNvZGVJc3MsIGRlY29kZUpXVCwgZW5jb2RlRGF0YSwgZW5jb2RlSXNzLCBlbmNvZGVKV1QsIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUtleVBhaXIoc2VlZCA9IHJhbmRvbUJ5dGVzKEtFWV9QQUlSX1NFRURfTEVOR1RIKSkge1xuICAgIHJldHVybiBlZDI1NTE5LmdlbmVyYXRlS2V5UGFpckZyb21TZWVkKHNlZWQpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNpZ25KV1Qoc3ViLCBhdWQsIHR0bCwga2V5UGFpciwgaWF0ID0gZnJvbU1pbGlzZWNvbmRzKERhdGUubm93KCkpKSB7XG4gICAgY29uc3QgaGVhZGVyID0geyBhbGc6IEpXVF9JUklESVVNX0FMRywgdHlwOiBKV1RfSVJJRElVTV9UWVAgfTtcbiAgICBjb25zdCBpc3MgPSBlbmNvZGVJc3Moa2V5UGFpci5wdWJsaWNLZXkpO1xuICAgIGNvbnN0IGV4cCA9IGlhdCArIHR0bDtcbiAgICBjb25zdCBwYXlsb2FkID0geyBpc3MsIHN1YiwgYXVkLCBpYXQsIGV4cCB9O1xuICAgIGNvbnN0IGRhdGEgPSBlbmNvZGVEYXRhKHsgaGVhZGVyLCBwYXlsb2FkIH0pO1xuICAgIGNvbnN0IHNpZ25hdHVyZSA9IGVkMjU1MTkuc2lnbihrZXlQYWlyLnNlY3JldEtleSwgZGF0YSk7XG4gICAgcmV0dXJuIGVuY29kZUpXVCh7IGhlYWRlciwgcGF5bG9hZCwgc2lnbmF0dXJlIH0pO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZlcmlmeUpXVChqd3QpIHtcbiAgICBjb25zdCB7IGhlYWRlciwgcGF5bG9hZCwgZGF0YSwgc2lnbmF0dXJlIH0gPSBkZWNvZGVKV1Qoand0KTtcbiAgICBpZiAoaGVhZGVyLmFsZyAhPT0gSldUX0lSSURJVU1fQUxHIHx8IGhlYWRlci50eXAgIT09IEpXVF9JUklESVVNX1RZUCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJKV1QgbXVzdCB1c2UgRWREU0EgYWxnb3JpdGhtXCIpO1xuICAgIH1cbiAgICBjb25zdCBwdWJsaWNLZXkgPSBkZWNvZGVJc3MocGF5bG9hZC5pc3MpO1xuICAgIHJldHVybiBlZDI1NTE5LnZlcmlmeShwdWJsaWNLZXksIGRhdGEsIHNpZ25hdHVyZSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcGkuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/api.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/constants.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/constants.js ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DATA_ENCODING: () => (/* binding */ DATA_ENCODING),\n/* harmony export */   DID_DELIMITER: () => (/* binding */ DID_DELIMITER),\n/* harmony export */   DID_METHOD: () => (/* binding */ DID_METHOD),\n/* harmony export */   DID_PREFIX: () => (/* binding */ DID_PREFIX),\n/* harmony export */   JSON_ENCODING: () => (/* binding */ JSON_ENCODING),\n/* harmony export */   JWT_DELIMITER: () => (/* binding */ JWT_DELIMITER),\n/* harmony export */   JWT_ENCODING: () => (/* binding */ JWT_ENCODING),\n/* harmony export */   JWT_IRIDIUM_ALG: () => (/* binding */ JWT_IRIDIUM_ALG),\n/* harmony export */   JWT_IRIDIUM_TYP: () => (/* binding */ JWT_IRIDIUM_TYP),\n/* harmony export */   KEY_PAIR_SEED_LENGTH: () => (/* binding */ KEY_PAIR_SEED_LENGTH),\n/* harmony export */   MULTICODEC_ED25519_BASE: () => (/* binding */ MULTICODEC_ED25519_BASE),\n/* harmony export */   MULTICODEC_ED25519_ENCODING: () => (/* binding */ MULTICODEC_ED25519_ENCODING),\n/* harmony export */   MULTICODEC_ED25519_HEADER: () => (/* binding */ MULTICODEC_ED25519_HEADER),\n/* harmony export */   MULTICODEC_ED25519_LENGTH: () => (/* binding */ MULTICODEC_ED25519_LENGTH)\n/* harmony export */ });\nconst JWT_IRIDIUM_ALG = \"EdDSA\";\nconst JWT_IRIDIUM_TYP = \"JWT\";\nconst JWT_DELIMITER = \".\";\nconst JWT_ENCODING = \"base64url\";\nconst JSON_ENCODING = \"utf8\";\nconst DATA_ENCODING = \"utf8\";\nconst DID_DELIMITER = \":\";\nconst DID_PREFIX = \"did\";\nconst DID_METHOD = \"key\";\nconst MULTICODEC_ED25519_ENCODING = \"base58btc\";\nconst MULTICODEC_ED25519_BASE = \"z\";\nconst MULTICODEC_ED25519_HEADER = \"K36\";\nconst MULTICODEC_ED25519_LENGTH = 32;\nconst KEY_PAIR_SEED_LENGTH = 32;\n//# sourceMappingURL=constants.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHdhbGxldGNvbm5lY3QrcmVsYXktYXV0aEAxLjAuNC9ub2RlX21vZHVsZXMvQHdhbGxldGNvbm5lY3QvcmVsYXktYXV0aC9kaXN0L2VzbS9jb25zdGFudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1AiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZnRtYXJrZXQvLi9ub2RlX21vZHVsZXMvLnBucG0vQHdhbGxldGNvbm5lY3QrcmVsYXktYXV0aEAxLjAuNC9ub2RlX21vZHVsZXMvQHdhbGxldGNvbm5lY3QvcmVsYXktYXV0aC9kaXN0L2VzbS9jb25zdGFudHMuanM/MjFiYyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgSldUX0lSSURJVU1fQUxHID0gXCJFZERTQVwiO1xuZXhwb3J0IGNvbnN0IEpXVF9JUklESVVNX1RZUCA9IFwiSldUXCI7XG5leHBvcnQgY29uc3QgSldUX0RFTElNSVRFUiA9IFwiLlwiO1xuZXhwb3J0IGNvbnN0IEpXVF9FTkNPRElORyA9IFwiYmFzZTY0dXJsXCI7XG5leHBvcnQgY29uc3QgSlNPTl9FTkNPRElORyA9IFwidXRmOFwiO1xuZXhwb3J0IGNvbnN0IERBVEFfRU5DT0RJTkcgPSBcInV0ZjhcIjtcbmV4cG9ydCBjb25zdCBESURfREVMSU1JVEVSID0gXCI6XCI7XG5leHBvcnQgY29uc3QgRElEX1BSRUZJWCA9IFwiZGlkXCI7XG5leHBvcnQgY29uc3QgRElEX01FVEhPRCA9IFwia2V5XCI7XG5leHBvcnQgY29uc3QgTVVMVElDT0RFQ19FRDI1NTE5X0VOQ09ESU5HID0gXCJiYXNlNThidGNcIjtcbmV4cG9ydCBjb25zdCBNVUxUSUNPREVDX0VEMjU1MTlfQkFTRSA9IFwielwiO1xuZXhwb3J0IGNvbnN0IE1VTFRJQ09ERUNfRUQyNTUxOV9IRUFERVIgPSBcIkszNlwiO1xuZXhwb3J0IGNvbnN0IE1VTFRJQ09ERUNfRUQyNTUxOV9MRU5HVEggPSAzMjtcbmV4cG9ydCBjb25zdCBLRVlfUEFJUl9TRUVEX0xFTkdUSCA9IDMyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/constants.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/index.js":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/index.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DATA_ENCODING: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.DATA_ENCODING),\n/* harmony export */   DID_DELIMITER: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.DID_DELIMITER),\n/* harmony export */   DID_METHOD: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.DID_METHOD),\n/* harmony export */   DID_PREFIX: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.DID_PREFIX),\n/* harmony export */   JSON_ENCODING: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.JSON_ENCODING),\n/* harmony export */   JWT_DELIMITER: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.JWT_DELIMITER),\n/* harmony export */   JWT_ENCODING: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.JWT_ENCODING),\n/* harmony export */   JWT_IRIDIUM_ALG: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.JWT_IRIDIUM_ALG),\n/* harmony export */   JWT_IRIDIUM_TYP: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.JWT_IRIDIUM_TYP),\n/* harmony export */   KEY_PAIR_SEED_LENGTH: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.KEY_PAIR_SEED_LENGTH),\n/* harmony export */   MULTICODEC_ED25519_BASE: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.MULTICODEC_ED25519_BASE),\n/* harmony export */   MULTICODEC_ED25519_ENCODING: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.MULTICODEC_ED25519_ENCODING),\n/* harmony export */   MULTICODEC_ED25519_HEADER: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.MULTICODEC_ED25519_HEADER),\n/* harmony export */   MULTICODEC_ED25519_LENGTH: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.MULTICODEC_ED25519_LENGTH),\n/* harmony export */   decodeData: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.decodeData),\n/* harmony export */   decodeIss: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.decodeIss),\n/* harmony export */   decodeJSON: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.decodeJSON),\n/* harmony export */   decodeJWT: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.decodeJWT),\n/* harmony export */   decodeSig: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.decodeSig),\n/* harmony export */   encodeData: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.encodeData),\n/* harmony export */   encodeIss: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.encodeIss),\n/* harmony export */   encodeJSON: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.encodeJSON),\n/* harmony export */   encodeJWT: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.encodeJWT),\n/* harmony export */   encodeSig: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.encodeSig),\n/* harmony export */   generateKeyPair: () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_0__.generateKeyPair),\n/* harmony export */   signJWT: () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_0__.signJWT),\n/* harmony export */   verifyJWT: () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_0__.verifyJWT)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/api.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/constants.js\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ \"(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/types.js\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_2__) if([\"default\",\"generateKeyPair\",\"signJWT\",\"verifyJWT\",\"DATA_ENCODING\",\"DID_DELIMITER\",\"DID_METHOD\",\"DID_PREFIX\",\"JSON_ENCODING\",\"JWT_DELIMITER\",\"JWT_ENCODING\",\"JWT_IRIDIUM_ALG\",\"JWT_IRIDIUM_TYP\",\"KEY_PAIR_SEED_LENGTH\",\"MULTICODEC_ED25519_BASE\",\"MULTICODEC_ED25519_ENCODING\",\"MULTICODEC_ED25519_HEADER\",\"MULTICODEC_ED25519_LENGTH\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _types__WEBPACK_IMPORTED_MODULE_2__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ \"(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/utils.js\");\n\n\n\n\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHdhbGxldGNvbm5lY3QrcmVsYXktYXV0aEAxLjAuNC9ub2RlX21vZHVsZXMvQHdhbGxldGNvbm5lY3QvcmVsYXktYXV0aC9kaXN0L2VzbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFzQjtBQUNNO0FBQ0o7QUFDQTtBQUN4QiIsInNvdXJjZXMiOlsid2VicGFjazovL25mdG1hcmtldC8uL25vZGVfbW9kdWxlcy8ucG5wbS9Ad2FsbGV0Y29ubmVjdCtyZWxheS1hdXRoQDEuMC40L25vZGVfbW9kdWxlcy9Ad2FsbGV0Y29ubmVjdC9yZWxheS1hdXRoL2Rpc3QvZXNtL2luZGV4LmpzPzgwYmQiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSBcIi4vYXBpXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3R5cGVzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi91dGlsc1wiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/types.js":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/types.js ***!
  \*********************************************************************************************************************/
/***/ (() => {

eval("//# sourceMappingURL=types.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHdhbGxldGNvbm5lY3QrcmVsYXktYXV0aEAxLjAuNC9ub2RlX21vZHVsZXMvQHdhbGxldGNvbm5lY3QvcmVsYXktYXV0aC9kaXN0L2VzbS90eXBlcy5qcyIsIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL25mdG1hcmtldC8uL25vZGVfbW9kdWxlcy8ucG5wbS9Ad2FsbGV0Y29ubmVjdCtyZWxheS1hdXRoQDEuMC40L25vZGVfbW9kdWxlcy9Ad2FsbGV0Y29ubmVjdC9yZWxheS1hdXRoL2Rpc3QvZXNtL3R5cGVzLmpzP2Y2ODUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/types.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/utils.js":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/utils.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   decodeData: () => (/* binding */ decodeData),\n/* harmony export */   decodeIss: () => (/* binding */ decodeIss),\n/* harmony export */   decodeJSON: () => (/* binding */ decodeJSON),\n/* harmony export */   decodeJWT: () => (/* binding */ decodeJWT),\n/* harmony export */   decodeSig: () => (/* binding */ decodeSig),\n/* harmony export */   encodeData: () => (/* binding */ encodeData),\n/* harmony export */   encodeIss: () => (/* binding */ encodeIss),\n/* harmony export */   encodeJSON: () => (/* binding */ encodeJSON),\n/* harmony export */   encodeJWT: () => (/* binding */ encodeJWT),\n/* harmony export */   encodeSig: () => (/* binding */ encodeSig)\n/* harmony export */ });\n/* harmony import */ var uint8arrays_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uint8arrays/concat */ \"(ssr)/./node_modules/.pnpm/uint8arrays@3.1.0/node_modules/uint8arrays/esm/src/concat.js\");\n/* harmony import */ var uint8arrays_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uint8arrays/to-string */ \"(ssr)/./node_modules/.pnpm/uint8arrays@3.1.0/node_modules/uint8arrays/esm/src/to-string.js\");\n/* harmony import */ var uint8arrays_from_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uint8arrays/from-string */ \"(ssr)/./node_modules/.pnpm/uint8arrays@3.1.0/node_modules/uint8arrays/esm/src/from-string.js\");\n/* harmony import */ var _walletconnect_safe_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @walletconnect/safe-json */ \"(ssr)/./node_modules/.pnpm/@walletconnect+safe-json@1.0.2/node_modules/@walletconnect/safe-json/dist/esm/index.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ \"(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/constants.js\");\n\n\n\n\n\nfunction decodeJSON(str) {\n    return (0,_walletconnect_safe_json__WEBPACK_IMPORTED_MODULE_3__.safeJsonParse)((0,uint8arrays_to_string__WEBPACK_IMPORTED_MODULE_1__.toString)((0,uint8arrays_from_string__WEBPACK_IMPORTED_MODULE_2__.fromString)(str, _constants__WEBPACK_IMPORTED_MODULE_4__.JWT_ENCODING), _constants__WEBPACK_IMPORTED_MODULE_4__.JSON_ENCODING));\n}\nfunction encodeJSON(val) {\n    return (0,uint8arrays_to_string__WEBPACK_IMPORTED_MODULE_1__.toString)((0,uint8arrays_from_string__WEBPACK_IMPORTED_MODULE_2__.fromString)((0,_walletconnect_safe_json__WEBPACK_IMPORTED_MODULE_3__.safeJsonStringify)(val), _constants__WEBPACK_IMPORTED_MODULE_4__.JSON_ENCODING), _constants__WEBPACK_IMPORTED_MODULE_4__.JWT_ENCODING);\n}\nfunction encodeIss(publicKey) {\n    const header = (0,uint8arrays_from_string__WEBPACK_IMPORTED_MODULE_2__.fromString)(_constants__WEBPACK_IMPORTED_MODULE_4__.MULTICODEC_ED25519_HEADER, _constants__WEBPACK_IMPORTED_MODULE_4__.MULTICODEC_ED25519_ENCODING);\n    const multicodec = _constants__WEBPACK_IMPORTED_MODULE_4__.MULTICODEC_ED25519_BASE +\n        (0,uint8arrays_to_string__WEBPACK_IMPORTED_MODULE_1__.toString)((0,uint8arrays_concat__WEBPACK_IMPORTED_MODULE_0__.concat)([header, publicKey]), _constants__WEBPACK_IMPORTED_MODULE_4__.MULTICODEC_ED25519_ENCODING);\n    return [_constants__WEBPACK_IMPORTED_MODULE_4__.DID_PREFIX, _constants__WEBPACK_IMPORTED_MODULE_4__.DID_METHOD, multicodec].join(_constants__WEBPACK_IMPORTED_MODULE_4__.DID_DELIMITER);\n}\nfunction decodeIss(issuer) {\n    const [prefix, method, multicodec] = issuer.split(_constants__WEBPACK_IMPORTED_MODULE_4__.DID_DELIMITER);\n    if (prefix !== _constants__WEBPACK_IMPORTED_MODULE_4__.DID_PREFIX || method !== _constants__WEBPACK_IMPORTED_MODULE_4__.DID_METHOD) {\n        throw new Error(`Issuer must be a DID with method \"key\"`);\n    }\n    const base = multicodec.slice(0, 1);\n    if (base !== _constants__WEBPACK_IMPORTED_MODULE_4__.MULTICODEC_ED25519_BASE) {\n        throw new Error(`Issuer must be a key in mulicodec format`);\n    }\n    const bytes = (0,uint8arrays_from_string__WEBPACK_IMPORTED_MODULE_2__.fromString)(multicodec.slice(1), _constants__WEBPACK_IMPORTED_MODULE_4__.MULTICODEC_ED25519_ENCODING);\n    const type = (0,uint8arrays_to_string__WEBPACK_IMPORTED_MODULE_1__.toString)(bytes.slice(0, 2), _constants__WEBPACK_IMPORTED_MODULE_4__.MULTICODEC_ED25519_ENCODING);\n    if (type !== _constants__WEBPACK_IMPORTED_MODULE_4__.MULTICODEC_ED25519_HEADER) {\n        throw new Error(`Issuer must be a public key with type \"Ed25519\"`);\n    }\n    const publicKey = bytes.slice(2);\n    if (publicKey.length !== _constants__WEBPACK_IMPORTED_MODULE_4__.MULTICODEC_ED25519_LENGTH) {\n        throw new Error(`Issuer must be a public key with length 32 bytes`);\n    }\n    return publicKey;\n}\nfunction encodeSig(bytes) {\n    return (0,uint8arrays_to_string__WEBPACK_IMPORTED_MODULE_1__.toString)(bytes, _constants__WEBPACK_IMPORTED_MODULE_4__.JWT_ENCODING);\n}\nfunction decodeSig(encoded) {\n    return (0,uint8arrays_from_string__WEBPACK_IMPORTED_MODULE_2__.fromString)(encoded, _constants__WEBPACK_IMPORTED_MODULE_4__.JWT_ENCODING);\n}\nfunction encodeData(params) {\n    return (0,uint8arrays_from_string__WEBPACK_IMPORTED_MODULE_2__.fromString)([encodeJSON(params.header), encodeJSON(params.payload)].join(_constants__WEBPACK_IMPORTED_MODULE_4__.JWT_DELIMITER), _constants__WEBPACK_IMPORTED_MODULE_4__.DATA_ENCODING);\n}\nfunction decodeData(data) {\n    const params = (0,uint8arrays_to_string__WEBPACK_IMPORTED_MODULE_1__.toString)(data, _constants__WEBPACK_IMPORTED_MODULE_4__.DATA_ENCODING).split(_constants__WEBPACK_IMPORTED_MODULE_4__.JWT_DELIMITER);\n    const header = decodeJSON(params[0]);\n    const payload = decodeJSON(params[1]);\n    return { header, payload };\n}\nfunction encodeJWT(params) {\n    return [\n        encodeJSON(params.header),\n        encodeJSON(params.payload),\n        encodeSig(params.signature),\n    ].join(_constants__WEBPACK_IMPORTED_MODULE_4__.JWT_DELIMITER);\n}\nfunction decodeJWT(jwt) {\n    const params = jwt.split(_constants__WEBPACK_IMPORTED_MODULE_4__.JWT_DELIMITER);\n    const header = decodeJSON(params[0]);\n    const payload = decodeJSON(params[1]);\n    const signature = decodeSig(params[2]);\n    const data = (0,uint8arrays_from_string__WEBPACK_IMPORTED_MODULE_2__.fromString)(params.slice(0, 2).join(_constants__WEBPACK_IMPORTED_MODULE_4__.JWT_DELIMITER), _constants__WEBPACK_IMPORTED_MODULE_4__.DATA_ENCODING);\n    return { header, payload, signature, data };\n}\n//# sourceMappingURL=utils.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHdhbGxldGNvbm5lY3QrcmVsYXktYXV0aEAxLjAuNC9ub2RlX21vZHVsZXMvQHdhbGxldGNvbm5lY3QvcmVsYXktYXV0aC9kaXN0L2VzbS91dGlscy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBNEM7QUFDSztBQUNJO0FBQ3VCO0FBQ2dLO0FBQ3JPO0FBQ1AsV0FBVyx1RUFBYSxDQUFDLCtEQUFRLENBQUMsbUVBQVUsTUFBTSxvREFBWSxHQUFHLHFEQUFhO0FBQzlFO0FBQ087QUFDUCxXQUFXLCtEQUFRLENBQUMsbUVBQVUsQ0FBQywyRUFBaUIsT0FBTyxxREFBYSxHQUFHLG9EQUFZO0FBQ25GO0FBQ087QUFDUCxtQkFBbUIsbUVBQVUsQ0FBQyxpRUFBeUIsRUFBRSxtRUFBMkI7QUFDcEYsdUJBQXVCLCtEQUF1QjtBQUM5QyxRQUFRLCtEQUFRLENBQUMsMERBQU0sdUJBQXVCLG1FQUEyQjtBQUN6RSxZQUFZLGtEQUFVLEVBQUUsa0RBQVUsbUJBQW1CLHFEQUFhO0FBQ2xFO0FBQ087QUFDUCxzREFBc0QscURBQWE7QUFDbkUsbUJBQW1CLGtEQUFVLGVBQWUsa0RBQVU7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLCtEQUF1QjtBQUN4QztBQUNBO0FBQ0Esa0JBQWtCLG1FQUFVLHNCQUFzQixtRUFBMkI7QUFDN0UsaUJBQWlCLCtEQUFRLG9CQUFvQixtRUFBMkI7QUFDeEUsaUJBQWlCLGlFQUF5QjtBQUMxQztBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsaUVBQXlCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxXQUFXLCtEQUFRLFFBQVEsb0RBQVk7QUFDdkM7QUFDTztBQUNQLFdBQVcsbUVBQVUsVUFBVSxvREFBWTtBQUMzQztBQUNPO0FBQ1AsV0FBVyxtRUFBVSw4REFBOEQscURBQWEsR0FBRyxxREFBYTtBQUNoSDtBQUNPO0FBQ1AsbUJBQW1CLCtEQUFRLE9BQU8scURBQWEsUUFBUSxxREFBYTtBQUNwRTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscURBQWE7QUFDeEI7QUFDTztBQUNQLDZCQUE2QixxREFBYTtBQUMxQztBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsbUVBQVUseUJBQXlCLHFEQUFhLEdBQUcscURBQWE7QUFDakYsYUFBYTtBQUNiO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZnRtYXJrZXQvLi9ub2RlX21vZHVsZXMvLnBucG0vQHdhbGxldGNvbm5lY3QrcmVsYXktYXV0aEAxLjAuNC9ub2RlX21vZHVsZXMvQHdhbGxldGNvbm5lY3QvcmVsYXktYXV0aC9kaXN0L2VzbS91dGlscy5qcz9mMzI0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmNhdCB9IGZyb20gXCJ1aW50OGFycmF5cy9jb25jYXRcIjtcbmltcG9ydCB7IHRvU3RyaW5nIH0gZnJvbSBcInVpbnQ4YXJyYXlzL3RvLXN0cmluZ1wiO1xuaW1wb3J0IHsgZnJvbVN0cmluZyB9IGZyb20gXCJ1aW50OGFycmF5cy9mcm9tLXN0cmluZ1wiO1xuaW1wb3J0IHsgc2FmZUpzb25QYXJzZSwgc2FmZUpzb25TdHJpbmdpZnkgfSBmcm9tIFwiQHdhbGxldGNvbm5lY3Qvc2FmZS1qc29uXCI7XG5pbXBvcnQgeyBEQVRBX0VOQ09ESU5HLCBESURfREVMSU1JVEVSLCBESURfTUVUSE9ELCBESURfUFJFRklYLCBKU09OX0VOQ09ESU5HLCBKV1RfREVMSU1JVEVSLCBKV1RfRU5DT0RJTkcsIE1VTFRJQ09ERUNfRUQyNTUxOV9CQVNFLCBNVUxUSUNPREVDX0VEMjU1MTlfRU5DT0RJTkcsIE1VTFRJQ09ERUNfRUQyNTUxOV9IRUFERVIsIE1VTFRJQ09ERUNfRUQyNTUxOV9MRU5HVEgsIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlSlNPTihzdHIpIHtcbiAgICByZXR1cm4gc2FmZUpzb25QYXJzZSh0b1N0cmluZyhmcm9tU3RyaW5nKHN0ciwgSldUX0VOQ09ESU5HKSwgSlNPTl9FTkNPRElORykpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZUpTT04odmFsKSB7XG4gICAgcmV0dXJuIHRvU3RyaW5nKGZyb21TdHJpbmcoc2FmZUpzb25TdHJpbmdpZnkodmFsKSwgSlNPTl9FTkNPRElORyksIEpXVF9FTkNPRElORyk7XG59XG5leHBvcnQgZnVuY3Rpb24gZW5jb2RlSXNzKHB1YmxpY0tleSkge1xuICAgIGNvbnN0IGhlYWRlciA9IGZyb21TdHJpbmcoTVVMVElDT0RFQ19FRDI1NTE5X0hFQURFUiwgTVVMVElDT0RFQ19FRDI1NTE5X0VOQ09ESU5HKTtcbiAgICBjb25zdCBtdWx0aWNvZGVjID0gTVVMVElDT0RFQ19FRDI1NTE5X0JBU0UgK1xuICAgICAgICB0b1N0cmluZyhjb25jYXQoW2hlYWRlciwgcHVibGljS2V5XSksIE1VTFRJQ09ERUNfRUQyNTUxOV9FTkNPRElORyk7XG4gICAgcmV0dXJuIFtESURfUFJFRklYLCBESURfTUVUSE9ELCBtdWx0aWNvZGVjXS5qb2luKERJRF9ERUxJTUlURVIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZUlzcyhpc3N1ZXIpIHtcbiAgICBjb25zdCBbcHJlZml4LCBtZXRob2QsIG11bHRpY29kZWNdID0gaXNzdWVyLnNwbGl0KERJRF9ERUxJTUlURVIpO1xuICAgIGlmIChwcmVmaXggIT09IERJRF9QUkVGSVggfHwgbWV0aG9kICE9PSBESURfTUVUSE9EKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSXNzdWVyIG11c3QgYmUgYSBESUQgd2l0aCBtZXRob2QgXCJrZXlcImApO1xuICAgIH1cbiAgICBjb25zdCBiYXNlID0gbXVsdGljb2RlYy5zbGljZSgwLCAxKTtcbiAgICBpZiAoYmFzZSAhPT0gTVVMVElDT0RFQ19FRDI1NTE5X0JBU0UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJc3N1ZXIgbXVzdCBiZSBhIGtleSBpbiBtdWxpY29kZWMgZm9ybWF0YCk7XG4gICAgfVxuICAgIGNvbnN0IGJ5dGVzID0gZnJvbVN0cmluZyhtdWx0aWNvZGVjLnNsaWNlKDEpLCBNVUxUSUNPREVDX0VEMjU1MTlfRU5DT0RJTkcpO1xuICAgIGNvbnN0IHR5cGUgPSB0b1N0cmluZyhieXRlcy5zbGljZSgwLCAyKSwgTVVMVElDT0RFQ19FRDI1NTE5X0VOQ09ESU5HKTtcbiAgICBpZiAodHlwZSAhPT0gTVVMVElDT0RFQ19FRDI1NTE5X0hFQURFUikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYElzc3VlciBtdXN0IGJlIGEgcHVibGljIGtleSB3aXRoIHR5cGUgXCJFZDI1NTE5XCJgKTtcbiAgICB9XG4gICAgY29uc3QgcHVibGljS2V5ID0gYnl0ZXMuc2xpY2UoMik7XG4gICAgaWYgKHB1YmxpY0tleS5sZW5ndGggIT09IE1VTFRJQ09ERUNfRUQyNTUxOV9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJc3N1ZXIgbXVzdCBiZSBhIHB1YmxpYyBrZXkgd2l0aCBsZW5ndGggMzIgYnl0ZXNgKTtcbiAgICB9XG4gICAgcmV0dXJuIHB1YmxpY0tleTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBlbmNvZGVTaWcoYnl0ZXMpIHtcbiAgICByZXR1cm4gdG9TdHJpbmcoYnl0ZXMsIEpXVF9FTkNPRElORyk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlU2lnKGVuY29kZWQpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyhlbmNvZGVkLCBKV1RfRU5DT0RJTkcpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZURhdGEocGFyYW1zKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcoW2VuY29kZUpTT04ocGFyYW1zLmhlYWRlciksIGVuY29kZUpTT04ocGFyYW1zLnBheWxvYWQpXS5qb2luKEpXVF9ERUxJTUlURVIpLCBEQVRBX0VOQ09ESU5HKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkZWNvZGVEYXRhKGRhdGEpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB0b1N0cmluZyhkYXRhLCBEQVRBX0VOQ09ESU5HKS5zcGxpdChKV1RfREVMSU1JVEVSKTtcbiAgICBjb25zdCBoZWFkZXIgPSBkZWNvZGVKU09OKHBhcmFtc1swXSk7XG4gICAgY29uc3QgcGF5bG9hZCA9IGRlY29kZUpTT04ocGFyYW1zWzFdKTtcbiAgICByZXR1cm4geyBoZWFkZXIsIHBheWxvYWQgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBlbmNvZGVKV1QocGFyYW1zKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgZW5jb2RlSlNPTihwYXJhbXMuaGVhZGVyKSxcbiAgICAgICAgZW5jb2RlSlNPTihwYXJhbXMucGF5bG9hZCksXG4gICAgICAgIGVuY29kZVNpZyhwYXJhbXMuc2lnbmF0dXJlKSxcbiAgICBdLmpvaW4oSldUX0RFTElNSVRFUik7XG59XG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlSldUKGp3dCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IGp3dC5zcGxpdChKV1RfREVMSU1JVEVSKTtcbiAgICBjb25zdCBoZWFkZXIgPSBkZWNvZGVKU09OKHBhcmFtc1swXSk7XG4gICAgY29uc3QgcGF5bG9hZCA9IGRlY29kZUpTT04ocGFyYW1zWzFdKTtcbiAgICBjb25zdCBzaWduYXR1cmUgPSBkZWNvZGVTaWcocGFyYW1zWzJdKTtcbiAgICBjb25zdCBkYXRhID0gZnJvbVN0cmluZyhwYXJhbXMuc2xpY2UoMCwgMikuam9pbihKV1RfREVMSU1JVEVSKSwgREFUQV9FTkNPRElORyk7XG4gICAgcmV0dXJuIHsgaGVhZGVyLCBwYXlsb2FkLCBzaWduYXR1cmUsIGRhdGEgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWxzLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@walletconnect+relay-auth@1.0.4/node_modules/@walletconnect/relay-auth/dist/esm/utils.js\n");

/***/ })

};
;