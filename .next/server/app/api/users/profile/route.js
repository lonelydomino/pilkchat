"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/users/profile/route";
exports.ids = ["app/api/users/profile/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "./action-async-storage.external?8dda":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "./request-async-storage.external?3d59":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "./static-generation-async-storage.external?16bc":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fusers%2Fprofile%2Froute&page=%2Fapi%2Fusers%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2Fprofile%2Froute.ts&appDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fusers%2Fprofile%2Froute&page=%2Fapi%2Fusers%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2Fprofile%2Froute.ts&appDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_michaelmartinez_My_Stuff_Software_Development_BlueSky_Clone_app_api_users_profile_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/users/profile/route.ts */ \"(rsc)/./app/api/users/profile/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/users/profile/route\",\n        pathname: \"/api/users/profile\",\n        filename: \"route\",\n        bundlePath: \"app/api/users/profile/route\"\n    },\n    resolvedPagePath: \"/Users/michaelmartinez/My Stuff/Software Development/BlueSky Clone/app/api/users/profile/route.ts\",\n    nextConfigOutput,\n    userland: _Users_michaelmartinez_My_Stuff_Software_Development_BlueSky_Clone_app_api_users_profile_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/users/profile/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VycyUyRnByb2ZpbGUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnVzZXJzJTJGcHJvZmlsZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnVzZXJzJTJGcHJvZmlsZSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm1pY2hhZWxtYXJ0aW5leiUyRk15JTIwU3R1ZmYlMkZTb2Z0d2FyZSUyMERldmVsb3BtZW50JTJGQmx1ZVNreSUyMENsb25lJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm1pY2hhZWxtYXJ0aW5leiUyRk15JTIwU3R1ZmYlMkZTb2Z0d2FyZSUyMERldmVsb3BtZW50JTJGQmx1ZVNreSUyMENsb25lJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ2lEO0FBQzlIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUdBQXVHO0FBQy9HO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDNko7O0FBRTdKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmx1ZXNreS1jbG9uZS8/NjU2ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvbWljaGFlbG1hcnRpbmV6L015IFN0dWZmL1NvZnR3YXJlIERldmVsb3BtZW50L0JsdWVTa3kgQ2xvbmUvYXBwL2FwaS91c2Vycy9wcm9maWxlL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS91c2Vycy9wcm9maWxlL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdXNlcnMvcHJvZmlsZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXNlcnMvcHJvZmlsZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9taWNoYWVsbWFydGluZXovTXkgU3R1ZmYvU29mdHdhcmUgRGV2ZWxvcG1lbnQvQmx1ZVNreSBDbG9uZS9hcHAvYXBpL3VzZXJzL3Byb2ZpbGUvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0IH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvdXNlcnMvcHJvZmlsZS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fusers%2Fprofile%2Froute&page=%2Fapi%2Fusers%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2Fprofile%2Froute.ts&appDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/users/profile/route.ts":
/*!****************************************!*\
  !*** ./app/api/users/profile/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/auth */ \"(rsc)/./auth.ts\");\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_1__.PrismaClient();\nasync function GET(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_auth__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session?.user?.id) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const user = await prisma.user.findUnique({\n            where: {\n                id: session.user.id\n            },\n            select: {\n                id: true,\n                name: true,\n                username: true,\n                email: true,\n                bio: true,\n                location: true,\n                website: true,\n                image: true,\n                createdAt: true\n            }\n        });\n        if (!user) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"User not found\"\n            }, {\n                status: 404\n            });\n        }\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json(user);\n    } catch (error) {\n        console.error(\"Error fetching user profile:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"Failed to fetch user profile\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function PUT(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_auth__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session?.user?.id) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const { name, username, bio, location, website } = await request.json();\n        // Validate required fields\n        if (!name || !username) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Name and username are required\"\n            }, {\n                status: 400\n            });\n        }\n        // Check if username is already taken by another user\n        const existingUser = await prisma.user.findFirst({\n            where: {\n                username,\n                id: {\n                    not: session.user.id\n                }\n            }\n        });\n        if (existingUser) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Username is already taken\"\n            }, {\n                status: 400\n            });\n        }\n        // Update user profile\n        const updatedUser = await prisma.user.update({\n            where: {\n                id: session.user.id\n            },\n            data: {\n                name,\n                username,\n                bio: bio || null,\n                location: location || null,\n                website: website || null\n            },\n            select: {\n                id: true,\n                name: true,\n                username: true,\n                email: true,\n                bio: true,\n                location: true,\n                website: true,\n                image: true,\n                createdAt: true\n            }\n        });\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json(updatedUser);\n    } catch (error) {\n        console.error(\"Error updating user profile:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"Failed to update user profile\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVM7Z0JBQ1RDLE9BQU87Z0JBQ1BDLFdBQVc7WUFDYjtRQUNGO1FBRUEsT0FBT3ZCLGtGQUFZQSxDQUFDVSxJQUFJLENBQUNtQjtJQUMzQixFQUFFLE9BQU9sQixPQUFPO1FBQ2RhLFFBQVFiLEtBQUssQ0FBQyxnQ0FBZ0NBO1FBQzlDLE9BQU9YLGtGQUFZQSxDQUFDVSxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBZ0MsR0FDekM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibHVlc2t5LWNsb25lLy4vYXBwL2FwaS91c2Vycy9wcm9maWxlL3JvdXRlLnRzPzQ1ZGUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoJ1xuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tICdAL2F1dGgnXG5cbmNvbnN0IHByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpXG4gICAgXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LFxuICAgICAgICB7IHN0YXR1czogNDAxIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogc2Vzc2lvbi51c2VyLmlkIH0sXG4gICAgICBzZWxlY3Q6IHtcbiAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgIHVzZXJuYW1lOiB0cnVlLFxuICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgICAgYmlvOiB0cnVlLFxuICAgICAgICBsb2NhdGlvbjogdHJ1ZSxcbiAgICAgICAgd2Vic2l0ZTogdHJ1ZSxcbiAgICAgICAgaW1hZ2U6IHRydWUsXG4gICAgICAgIGNyZWF0ZWRBdDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIGlmICghdXNlcikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnVXNlciBub3QgZm91bmQnIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDQgfVxuICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih1c2VyKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHVzZXIgcHJvZmlsZTonLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIHVzZXIgcHJvZmlsZScgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUFVUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpXG4gICAgXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LFxuICAgICAgICB7IHN0YXR1czogNDAxIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCB7IG5hbWUsIHVzZXJuYW1lLCBiaW8sIGxvY2F0aW9uLCB3ZWJzaXRlIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuXG4gICAgLy8gVmFsaWRhdGUgcmVxdWlyZWQgZmllbGRzXG4gICAgaWYgKCFuYW1lIHx8ICF1c2VybmFtZSkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnTmFtZSBhbmQgdXNlcm5hbWUgYXJlIHJlcXVpcmVkJyB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiB1c2VybmFtZSBpcyBhbHJlYWR5IHRha2VuIGJ5IGFub3RoZXIgdXNlclxuICAgIGNvbnN0IGV4aXN0aW5nVXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRGaXJzdCh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgaWQ6IHsgbm90OiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIGlmIChleGlzdGluZ1VzZXIpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ1VzZXJuYW1lIGlzIGFscmVhZHkgdGFrZW4nIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIFVwZGF0ZSB1c2VyIHByb2ZpbGVcbiAgICBjb25zdCB1cGRhdGVkVXNlciA9IGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICB3aGVyZTogeyBpZDogc2Vzc2lvbi51c2VyLmlkIH0sXG4gICAgICBkYXRhOiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIHVzZXJuYW1lLFxuICAgICAgICBiaW86IGJpbyB8fCBudWxsLFxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24gfHwgbnVsbCxcbiAgICAgICAgd2Vic2l0ZTogd2Vic2l0ZSB8fCBudWxsLFxuICAgICAgfSxcbiAgICAgIHNlbGVjdDoge1xuICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgdXNlcm5hbWU6IHRydWUsXG4gICAgICAgIGVtYWlsOiB0cnVlLFxuICAgICAgICBiaW86IHRydWUsXG4gICAgICAgIGxvY2F0aW9uOiB0cnVlLFxuICAgICAgICB3ZWJzaXRlOiB0cnVlLFxuICAgICAgICBpbWFnZTogdHJ1ZSxcbiAgICAgICAgY3JlYXRlZEF0OiB0cnVlLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHVwZGF0ZWRVc2VyKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHVwZGF0aW5nIHVzZXIgcHJvZmlsZTonLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnRmFpbGVkIHRvIHVwZGF0ZSB1c2VyIHByb2ZpbGUnIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApXG4gIH1cbn0gIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIlByaXNtYUNsaWVudCIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsInByaXNtYSIsIkdFVCIsInJlcXVlc3QiLCJzZXNzaW9uIiwidXNlciIsImlkIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwic2VsZWN0IiwibmFtZSIsInVzZXJuYW1lIiwiZW1haWwiLCJiaW8iLCJsb2NhdGlvbiIsIndlYnNpdGUiLCJpbWFnZSIsImNyZWF0ZWRBdCIsImNvbnNvbGUiLCJQVVQiLCJleGlzdGluZ1VzZXIiLCJmaW5kRmlyc3QiLCJub3QiLCJ1cGRhdGVkVXNlciIsInVwZGF0ZSIsImRhdGEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/users/profile/route.ts\n");

/***/ }),

/***/ "(rsc)/./auth.ts":
/*!*****************!*\
  !*** ./auth.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth/prisma-adapter */ \"(rsc)/./node_modules/@auth/prisma-adapter/index.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_2__.PrismaClient();\nconst authOptions = {\n    adapter: (0,_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(prisma),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                const user = await prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user || !user.password) {\n                    return null;\n                }\n                const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_4___default().compare(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    return null;\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    username: user.username\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60,\n        updateAge: 24 * 60 * 60\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.username = user.username;\n            // Don't store image in JWT to avoid token size issues\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.sub;\n                session.user.username = token.username;\n            // Don't include image in session to avoid token size issues\n            // Image will be fetched from database when needed\n            }\n            return session;\n        },\n        async redirect ({ url, baseUrl }) {\n            // Allows relative callback URLs\n            if (url.startsWith(\"/\")) return `${baseUrl}${url}`;\n            else if (new URL(url).origin === baseUrl) return url;\n            return baseUrl;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        signUp: \"/signup\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hdXRoLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBZ0M7QUFDb0I7QUFDUDtBQUNvQjtBQUNwQztBQUU3QixNQUFNSyxTQUFTLElBQUlILHdEQUFZQTtBQUV4QixNQUFNSSxjQUFjO0lBQ3pCQyxTQUFTTixtRUFBYUEsQ0FBQ0k7SUFDdkJHLFdBQVc7UUFDVEwsMkVBQW1CQSxDQUFDO1lBQ2xCTSxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQ2pELE9BQU87Z0JBQ1Q7Z0JBRUEsTUFBTUUsT0FBTyxNQUFNWCxPQUFPVyxJQUFJLENBQUNDLFVBQVUsQ0FBQztvQkFDeENDLE9BQU87d0JBQ0xQLE9BQU9ELFlBQVlDLEtBQUs7b0JBQzFCO2dCQUNGO2dCQUVBLElBQUksQ0FBQ0ssUUFBUSxDQUFDQSxLQUFLRixRQUFRLEVBQUU7b0JBQzNCLE9BQU87Z0JBQ1Q7Z0JBRUEsTUFBTUssa0JBQWtCLE1BQU1mLHVEQUFjLENBQzFDTSxZQUFZSSxRQUFRLEVBQ3BCRSxLQUFLRixRQUFRO2dCQUdmLElBQUksQ0FBQ0ssaUJBQWlCO29CQUNwQixPQUFPO2dCQUNUO2dCQUVBLE9BQU87b0JBQ0xFLElBQUlMLEtBQUtLLEVBQUU7b0JBQ1hWLE9BQU9LLEtBQUtMLEtBQUs7b0JBQ2pCRixNQUFNTyxLQUFLUCxJQUFJO29CQUNmYSxVQUFVTixLQUFLTSxRQUFRO2dCQUV6QjtZQUNGO1FBQ0Y7S0FDRDtJQUNEQyxTQUFTO1FBQ1BDLFVBQVU7UUFDVkMsUUFBUSxLQUFLLEtBQUssS0FBSztRQUN2QkMsV0FBVyxLQUFLLEtBQUs7SUFDdkI7SUFDQUMsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFYixJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUmEsTUFBTVAsUUFBUSxHQUFHTixLQUFLTSxRQUFRO1lBQzlCLHNEQUFzRDtZQUN4RDtZQUNBLE9BQU9PO1FBQ1Q7UUFDQSxNQUFNTixTQUFRLEVBQUVBLE9BQU8sRUFBRU0sS0FBSyxFQUFFO1lBQzlCLElBQUlBLE9BQU87Z0JBQ1ROLFFBQVFQLElBQUksQ0FBQ0ssRUFBRSxHQUFHUSxNQUFNQyxHQUFHO2dCQUMzQlAsUUFBUVAsSUFBSSxDQUFDTSxRQUFRLEdBQUdPLE1BQU1QLFFBQVE7WUFDdEMsNERBQTREO1lBQzVELGtEQUFrRDtZQUNwRDtZQUNBLE9BQU9DO1FBQ1Q7UUFDQSxNQUFNUSxVQUFTLEVBQUVDLEdBQUcsRUFBRUMsT0FBTyxFQUFFO1lBQzdCLGdDQUFnQztZQUNoQyxJQUFJRCxJQUFJRSxVQUFVLENBQUMsTUFBTSxPQUFPLENBQUMsRUFBRUQsUUFBUSxFQUFFRCxJQUFJLENBQUM7aUJBRTdDLElBQUksSUFBSUcsSUFBSUgsS0FBS0ksTUFBTSxLQUFLSCxTQUFTLE9BQU9EO1lBQ2pELE9BQU9DO1FBQ1Q7SUFDRjtJQUNBSSxPQUFPO1FBQ0xDLFFBQVE7UUFDUkMsUUFBUTtJQUNWO0lBQ0FDLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZTtBQUNyQyxFQUFDO0FBRUQsaUVBQWUzQyxnREFBUUEsQ0FBQ00sWUFBWUEsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JsdWVza3ktY2xvbmUvLi9hdXRoLnRzPzkyMzgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIlxuaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gXCJAYXV0aC9wcmlzbWEtYWRhcHRlclwiXG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIlxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIlxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIlxuXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KClcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zID0ge1xuICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSksXG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogXCJjcmVkZW50aWFsc1wiLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9XG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHMuZW1haWxcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCF1c2VyIHx8ICF1c2VyLnBhc3N3b3JkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzUGFzc3dvcmRWYWxpZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKFxuICAgICAgICAgIGNyZWRlbnRpYWxzLnBhc3N3b3JkLFxuICAgICAgICAgIHVzZXIucGFzc3dvcmRcbiAgICAgICAgKVxuXG4gICAgICAgIGlmICghaXNQYXNzd29yZFZhbGlkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxuICAgICAgICAgIC8vIERvbid0IGluY2x1ZGUgaW1hZ2UgaW4gSldUIHRvIGF2b2lkIHRva2VuIHNpemUgaXNzdWVzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICBdLFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6IFwiand0XCIsXG4gICAgbWF4QWdlOiAzMCAqIDI0ICogNjAgKiA2MCwgLy8gMzAgZGF5c1xuICAgIHVwZGF0ZUFnZTogMjQgKiA2MCAqIDYwLCAvLyAyNCBob3Vyc1xuICB9LFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi51c2VybmFtZSA9IHVzZXIudXNlcm5hbWVcbiAgICAgICAgLy8gRG9uJ3Qgc3RvcmUgaW1hZ2UgaW4gSldUIHRvIGF2b2lkIHRva2VuIHNpemUgaXNzdWVzXG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW5cbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uc3ViIVxuICAgICAgICBzZXNzaW9uLnVzZXIudXNlcm5hbWUgPSB0b2tlbi51c2VybmFtZSBhcyBzdHJpbmdcbiAgICAgICAgLy8gRG9uJ3QgaW5jbHVkZSBpbWFnZSBpbiBzZXNzaW9uIHRvIGF2b2lkIHRva2VuIHNpemUgaXNzdWVzXG4gICAgICAgIC8vIEltYWdlIHdpbGwgYmUgZmV0Y2hlZCBmcm9tIGRhdGFiYXNlIHdoZW4gbmVlZGVkXG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvblxuICAgIH0sXG4gICAgYXN5bmMgcmVkaXJlY3QoeyB1cmwsIGJhc2VVcmwgfSkge1xuICAgICAgLy8gQWxsb3dzIHJlbGF0aXZlIGNhbGxiYWNrIFVSTHNcbiAgICAgIGlmICh1cmwuc3RhcnRzV2l0aChcIi9cIikpIHJldHVybiBgJHtiYXNlVXJsfSR7dXJsfWBcbiAgICAgIC8vIEFsbG93cyBjYWxsYmFjayBVUkxzIG9uIHRoZSBzYW1lIG9yaWdpblxuICAgICAgZWxzZSBpZiAobmV3IFVSTCh1cmwpLm9yaWdpbiA9PT0gYmFzZVVybCkgcmV0dXJuIHVybFxuICAgICAgcmV0dXJuIGJhc2VVcmxcbiAgICB9XG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiAnL2xvZ2luJyxcbiAgICBzaWduVXA6ICcvc2lnbnVwJyxcbiAgfSxcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXG59XG5cbmV4cG9ydCBkZWZhdWx0IE5leHRBdXRoKGF1dGhPcHRpb25zKSAiXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJQcmlzbWFBZGFwdGVyIiwiUHJpc21hQ2xpZW50IiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImJjcnlwdCIsInByaXNtYSIsImF1dGhPcHRpb25zIiwiYWRhcHRlciIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaXNQYXNzd29yZFZhbGlkIiwiY29tcGFyZSIsImlkIiwidXNlcm5hbWUiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJ1cGRhdGVBZ2UiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInN1YiIsInJlZGlyZWN0IiwidXJsIiwiYmFzZVVybCIsInN0YXJ0c1dpdGgiLCJVUkwiLCJvcmlnaW4iLCJwYWdlcyIsInNpZ25JbiIsInNpZ25VcCIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./auth.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/@auth","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fusers%2Fprofile%2Froute&page=%2Fapi%2Fusers%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2Fprofile%2Froute.ts&appDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();