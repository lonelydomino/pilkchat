"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./middleware.ts":
/*!***********************!*\
  !*** ./middleware.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/middleware */ \"(middleware)/./node_modules/next-auth/middleware.js\");\n/* harmony import */ var next_auth_middleware__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_middleware__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_auth_middleware__WEBPACK_IMPORTED_MODULE_0__.withAuth)(function middleware(req) {\n// Add any additional middleware logic here\n}, {\n    callbacks: {\n        authorized: ({ token })=>!!token\n    },\n    pages: {\n        signIn: \"/login\"\n    }\n}));\nconst config = {\n    matcher: [\n        \"/dashboard/:path*\",\n        \"/profile/:path*\",\n        \"/settings/:path*\",\n        \"/debug/:path*\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQStDO0FBRS9DLGlFQUFlQSw4REFBUUEsQ0FDckIsU0FBU0MsV0FBV0MsR0FBRztBQUNyQiwyQ0FBMkM7QUFDN0MsR0FDQTtJQUNFQyxXQUFXO1FBQ1RDLFlBQVksQ0FBQyxFQUFFQyxLQUFLLEVBQUUsR0FBSyxDQUFDLENBQUNBO0lBQy9CO0lBQ0FDLE9BQU87UUFDTEMsUUFBUTtJQUNWO0FBQ0YsSUFDRDtBQUVNLE1BQU1DLFNBQVM7SUFDcEJDLFNBQVM7UUFDUDtRQUNBO1FBQ0E7UUFDQTtLQUNEO0FBQ0gsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9taWRkbGV3YXJlLnRzPzQyMmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgd2l0aEF1dGggfSBmcm9tIFwibmV4dC1hdXRoL21pZGRsZXdhcmVcIlxuXG5leHBvcnQgZGVmYXVsdCB3aXRoQXV0aChcbiAgZnVuY3Rpb24gbWlkZGxld2FyZShyZXEpIHtcbiAgICAvLyBBZGQgYW55IGFkZGl0aW9uYWwgbWlkZGxld2FyZSBsb2dpYyBoZXJlXG4gIH0sXG4gIHtcbiAgICBjYWxsYmFja3M6IHtcbiAgICAgIGF1dGhvcml6ZWQ6ICh7IHRva2VuIH0pID0+ICEhdG9rZW5cbiAgICB9LFxuICAgIHBhZ2VzOiB7XG4gICAgICBzaWduSW46ICcvbG9naW4nLFxuICAgIH1cbiAgfVxuKVxuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBtYXRjaGVyOiBbXG4gICAgXCIvZGFzaGJvYXJkLzpwYXRoKlwiLFxuICAgIFwiL3Byb2ZpbGUvOnBhdGgqXCIsXG4gICAgXCIvc2V0dGluZ3MvOnBhdGgqXCIsXG4gICAgXCIvZGVidWcvOnBhdGgqXCJcbiAgXVxufSAiXSwibmFtZXMiOlsid2l0aEF1dGgiLCJtaWRkbGV3YXJlIiwicmVxIiwiY2FsbGJhY2tzIiwiYXV0aG9yaXplZCIsInRva2VuIiwicGFnZXMiLCJzaWduSW4iLCJjb25maWciLCJtYXRjaGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});