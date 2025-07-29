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
exports.id = "app/api/users/[username]/follow/route";
exports.ids = ["app/api/users/[username]/follow/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fusers%2F%5Busername%5D%2Ffollow%2Froute&page=%2Fapi%2Fusers%2F%5Busername%5D%2Ffollow%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2F%5Busername%5D%2Ffollow%2Froute.ts&appDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fusers%2F%5Busername%5D%2Ffollow%2Froute&page=%2Fapi%2Fusers%2F%5Busername%5D%2Ffollow%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2F%5Busername%5D%2Ffollow%2Froute.ts&appDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_michaelmartinez_My_Stuff_Software_Development_BlueSky_Clone_app_api_users_username_follow_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/users/[username]/follow/route.ts */ \"(rsc)/./app/api/users/[username]/follow/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/users/[username]/follow/route\",\n        pathname: \"/api/users/[username]/follow\",\n        filename: \"route\",\n        bundlePath: \"app/api/users/[username]/follow/route\"\n    },\n    resolvedPagePath: \"/Users/michaelmartinez/My Stuff/Software Development/BlueSky Clone/app/api/users/[username]/follow/route.ts\",\n    nextConfigOutput,\n    userland: _Users_michaelmartinez_My_Stuff_Software_Development_BlueSky_Clone_app_api_users_username_follow_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/users/[username]/follow/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VycyUyRiU1QnVzZXJuYW1lJTVEJTJGZm9sbG93JTJGcm91dGUmcGFnZT0lMkZhcGklMkZ1c2VycyUyRiU1QnVzZXJuYW1lJTVEJTJGZm9sbG93JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdXNlcnMlMkYlNUJ1c2VybmFtZSU1RCUyRmZvbGxvdyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm1pY2hhZWxtYXJ0aW5leiUyRk15JTIwU3R1ZmYlMkZTb2Z0d2FyZSUyMERldmVsb3BtZW50JTJGQmx1ZVNreSUyMENsb25lJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm1pY2hhZWxtYXJ0aW5leiUyRk15JTIwU3R1ZmYlMkZTb2Z0d2FyZSUyMERldmVsb3BtZW50JTJGQmx1ZVNreSUyMENsb25lJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQzJEO0FBQ3hJO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUdBQXVHO0FBQy9HO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDNko7O0FBRTdKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmx1ZXNreS1jbG9uZS8/YTQ2NSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvbWljaGFlbG1hcnRpbmV6L015IFN0dWZmL1NvZnR3YXJlIERldmVsb3BtZW50L0JsdWVTa3kgQ2xvbmUvYXBwL2FwaS91c2Vycy9bdXNlcm5hbWVdL2ZvbGxvdy9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdXNlcnMvW3VzZXJuYW1lXS9mb2xsb3cvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS91c2Vycy9bdXNlcm5hbWVdL2ZvbGxvd1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXNlcnMvW3VzZXJuYW1lXS9mb2xsb3cvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvbWljaGFlbG1hcnRpbmV6L015IFN0dWZmL1NvZnR3YXJlIERldmVsb3BtZW50L0JsdWVTa3kgQ2xvbmUvYXBwL2FwaS91c2Vycy9bdXNlcm5hbWVdL2ZvbGxvdy9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS91c2Vycy9bdXNlcm5hbWVdL2ZvbGxvdy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fusers%2F%5Busername%5D%2Ffollow%2Froute&page=%2Fapi%2Fusers%2F%5Busername%5D%2Ffollow%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2F%5Busername%5D%2Ffollow%2Froute.ts&appDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/users/[username]/follow/route.ts":
/*!**************************************************!*\
  !*** ./app/api/users/[username]/follow/route.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/auth */ \"(rsc)/./auth.ts\");\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_1__.PrismaClient();\nasync function POST(request, { params }) {\n    try {\n        const username = params.username;\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_auth__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session?.user?.id) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const currentUserId = session.user.id;\n        // Find user to follow/unfollow\n        const userToFollow = await prisma.user.findUnique({\n            where: {\n                username\n            }\n        });\n        if (!userToFollow) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"User not found\"\n            }, {\n                status: 404\n            });\n        }\n        // Prevent following yourself\n        if (currentUserId === userToFollow.id) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Cannot follow yourself\"\n            }, {\n                status: 400\n            });\n        }\n        // Check if already following\n        const existingFollow = await prisma.follows.findUnique({\n            where: {\n                followerId_followingId: {\n                    followerId: currentUserId,\n                    followingId: userToFollow.id\n                }\n            }\n        });\n        if (existingFollow) {\n            // Unfollow\n            await prisma.follows.delete({\n                where: {\n                    followerId_followingId: {\n                        followerId: currentUserId,\n                        followingId: userToFollow.id\n                    }\n                }\n            });\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                success: true,\n                action: \"unfollowed\",\n                message: `You unfollowed ${userToFollow.name}`\n            });\n        } else {\n            // Follow\n            await prisma.follows.create({\n                data: {\n                    followerId: currentUserId,\n                    followingId: userToFollow.id\n                }\n            });\n            // Create notification for the user being followed\n            await prisma.notification.create({\n                data: {\n                    type: \"follow\",\n                    message: `${session.user.name} started following you`,\n                    userId: userToFollow.id,\n                    relatedUserId: currentUserId\n                }\n            });\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                success: true,\n                action: \"followed\",\n                message: `You are now following ${userToFollow.name}`\n            });\n        }\n    } catch (error) {\n        console.error(\"Error following/unfollowing user:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"Failed to follow/unfollow user\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VzZXJzL1t1c2VybmFtZV0vZm9sbG93L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBdUQ7QUFDVjtBQUNEO0FBQ1I7QUFFcEMsTUFBTUksU0FBUyxJQUFJSCx3REFBWUE7QUFFeEIsZUFBZUksS0FDcEJDLE9BQW9CLEVBQ3BCLEVBQUVDLE1BQU0sRUFBb0M7SUFFNUMsSUFBSTtRQUNGLE1BQU1DLFdBQVdELE9BQU9DLFFBQVE7UUFDaEMsTUFBTUMsVUFBVSxNQUFNUCwyREFBZ0JBLENBQUNDLDhDQUFXQTtRQUVsRCxJQUFJLENBQUNNLFNBQVNDLE1BQU1DLElBQUk7WUFDdEIsT0FBT1gsa0ZBQVlBLENBQUNZLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBZSxHQUN4QjtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsTUFBTUMsZ0JBQWdCTixRQUFRQyxJQUFJLENBQUNDLEVBQUU7UUFFckMsK0JBQStCO1FBQy9CLE1BQU1LLGVBQWUsTUFBTVosT0FBT00sSUFBSSxDQUFDTyxVQUFVLENBQUM7WUFDaERDLE9BQU87Z0JBQUVWO1lBQVM7UUFDcEI7UUFFQSxJQUFJLENBQUNRLGNBQWM7WUFDakIsT0FBT2hCLGtGQUFZQSxDQUFDWSxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQWlCLEdBQzFCO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSw2QkFBNkI7UUFDN0IsSUFBSUMsa0JBQWtCQyxhQUFhTCxFQUFFLEVBQUU7WUFDckMsT0FBT1gsa0ZBQVlBLENBQUNZLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBeUIsR0FDbEM7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLDZCQUE2QjtRQUM3QixNQUFNSyxpQkFBaUIsTUFBTWYsT0FBT2dCLE9BQU8sQ0FBQ0gsVUFBVSxDQUFDO1lBQ3JEQyxPQUFPO2dCQUNMRyx3QkFBd0I7b0JBQ3RCQyxZQUFZUDtvQkFDWlEsYUFBYVAsYUFBYUwsRUFBRTtnQkFDOUI7WUFDRjtRQUNGO1FBRUEsSUFBSVEsZ0JBQWdCO1lBQ2xCLFdBQVc7WUFDWCxNQUFNZixPQUFPZ0IsT0FBTyxDQUFDSSxNQUFNLENBQUM7Z0JBQzFCTixPQUFPO29CQUNMRyx3QkFBd0I7d0JBQ3RCQyxZQUFZUDt3QkFDWlEsYUFBYVAsYUFBYUwsRUFBRTtvQkFDOUI7Z0JBQ0Y7WUFDRjtZQUVBLE9BQU9YLGtGQUFZQSxDQUFDWSxJQUFJLENBQUM7Z0JBQ3ZCYSxTQUFTO2dCQUNUQyxRQUFRO2dCQUNSQyxTQUFTLENBQUMsZUFBZSxFQUFFWCxhQUFhWSxJQUFJLENBQUMsQ0FBQztZQUNoRDtRQUNGLE9BQU87WUFDTCxTQUFTO1lBQ1QsTUFBTXhCLE9BQU9nQixPQUFPLENBQUNTLE1BQU0sQ0FBQztnQkFDMUJDLE1BQU07b0JBQ0pSLFlBQVlQO29CQUNaUSxhQUFhUCxhQUFhTCxFQUFFO2dCQUM5QjtZQUNGO1lBRUEsa0RBQWtEO1lBQ2xELE1BQU1QLE9BQU8yQixZQUFZLENBQUNGLE1BQU0sQ0FBQztnQkFDL0JDLE1BQU07b0JBQ0pFLE1BQU07b0JBQ05MLFNBQVMsQ0FBQyxFQUFFbEIsUUFBUUMsSUFBSSxDQUFDa0IsSUFBSSxDQUFDLHNCQUFzQixDQUFDO29CQUNyREssUUFBUWpCLGFBQWFMLEVBQUU7b0JBQ3ZCdUIsZUFBZW5CO2dCQUNqQjtZQUNGO1lBRUEsT0FBT2Ysa0ZBQVlBLENBQUNZLElBQUksQ0FBQztnQkFDdkJhLFNBQVM7Z0JBQ1RDLFFBQVE7Z0JBQ1JDLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRVgsYUFBYVksSUFBSSxDQUFDLENBQUM7WUFDdkQ7UUFDRjtJQUNGLEVBQUUsT0FBT2YsT0FBTztRQUNkc0IsUUFBUXRCLEtBQUssQ0FBQyxxQ0FBcUNBO1FBQ25ELE9BQU9iLGtGQUFZQSxDQUFDWSxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBaUMsR0FDMUM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibHVlc2t5LWNsb25lLy4vYXBwL2FwaS91c2Vycy9bdXNlcm5hbWVdL2ZvbGxvdy9yb3V0ZS50cz9hYmQwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50J1xuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aCdcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9hdXRoJ1xuXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KClcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QoXG4gIHJlcXVlc3Q6IE5leHRSZXF1ZXN0LFxuICB7IHBhcmFtcyB9OiB7IHBhcmFtczogeyB1c2VybmFtZTogc3RyaW5nIH0gfVxuKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXNlcm5hbWUgPSBwYXJhbXMudXNlcm5hbWVcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucylcbiAgICBcbiAgICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRVc2VySWQgPSBzZXNzaW9uLnVzZXIuaWRcblxuICAgIC8vIEZpbmQgdXNlciB0byBmb2xsb3cvdW5mb2xsb3dcbiAgICBjb25zdCB1c2VyVG9Gb2xsb3cgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IHVzZXJuYW1lIH0sXG4gICAgfSlcblxuICAgIGlmICghdXNlclRvRm9sbG93KSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6ICdVc2VyIG5vdCBmb3VuZCcgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwNCB9XG4gICAgICApXG4gICAgfVxuXG4gICAgLy8gUHJldmVudCBmb2xsb3dpbmcgeW91cnNlbGZcbiAgICBpZiAoY3VycmVudFVzZXJJZCA9PT0gdXNlclRvRm9sbG93LmlkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6ICdDYW5ub3QgZm9sbG93IHlvdXJzZWxmJyB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiBhbHJlYWR5IGZvbGxvd2luZ1xuICAgIGNvbnN0IGV4aXN0aW5nRm9sbG93ID0gYXdhaXQgcHJpc21hLmZvbGxvd3MuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBmb2xsb3dlcklkX2ZvbGxvd2luZ0lkOiB7XG4gICAgICAgICAgZm9sbG93ZXJJZDogY3VycmVudFVzZXJJZCxcbiAgICAgICAgICBmb2xsb3dpbmdJZDogdXNlclRvRm9sbG93LmlkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgaWYgKGV4aXN0aW5nRm9sbG93KSB7XG4gICAgICAvLyBVbmZvbGxvd1xuICAgICAgYXdhaXQgcHJpc21hLmZvbGxvd3MuZGVsZXRlKHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBmb2xsb3dlcklkX2ZvbGxvd2luZ0lkOiB7XG4gICAgICAgICAgICBmb2xsb3dlcklkOiBjdXJyZW50VXNlcklkLFxuICAgICAgICAgICAgZm9sbG93aW5nSWQ6IHVzZXJUb0ZvbGxvdy5pZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsIFxuICAgICAgICBhY3Rpb246ICd1bmZvbGxvd2VkJyxcbiAgICAgICAgbWVzc2FnZTogYFlvdSB1bmZvbGxvd2VkICR7dXNlclRvRm9sbG93Lm5hbWV9YFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRm9sbG93XG4gICAgICBhd2FpdCBwcmlzbWEuZm9sbG93cy5jcmVhdGUoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgZm9sbG93ZXJJZDogY3VycmVudFVzZXJJZCxcbiAgICAgICAgICBmb2xsb3dpbmdJZDogdXNlclRvRm9sbG93LmlkLFxuICAgICAgICB9LFxuICAgICAgfSlcblxuICAgICAgLy8gQ3JlYXRlIG5vdGlmaWNhdGlvbiBmb3IgdGhlIHVzZXIgYmVpbmcgZm9sbG93ZWRcbiAgICAgIGF3YWl0IHByaXNtYS5ub3RpZmljYXRpb24uY3JlYXRlKHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHR5cGU6ICdmb2xsb3cnLFxuICAgICAgICAgIG1lc3NhZ2U6IGAke3Nlc3Npb24udXNlci5uYW1lfSBzdGFydGVkIGZvbGxvd2luZyB5b3VgLFxuICAgICAgICAgIHVzZXJJZDogdXNlclRvRm9sbG93LmlkLFxuICAgICAgICAgIHJlbGF0ZWRVc2VySWQ6IGN1cnJlbnRVc2VySWQsXG4gICAgICAgIH0sXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBcbiAgICAgICAgc3VjY2VzczogdHJ1ZSwgXG4gICAgICAgIGFjdGlvbjogJ2ZvbGxvd2VkJyxcbiAgICAgICAgbWVzc2FnZTogYFlvdSBhcmUgbm93IGZvbGxvd2luZyAke3VzZXJUb0ZvbGxvdy5uYW1lfWBcbiAgICAgIH0pXG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZvbGxvd2luZy91bmZvbGxvd2luZyB1c2VyOicsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6ICdGYWlsZWQgdG8gZm9sbG93L3VuZm9sbG93IHVzZXInIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApXG4gIH1cbn0gIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIlByaXNtYUNsaWVudCIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsInByaXNtYSIsIlBPU1QiLCJyZXF1ZXN0IiwicGFyYW1zIiwidXNlcm5hbWUiLCJzZXNzaW9uIiwidXNlciIsImlkIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiY3VycmVudFVzZXJJZCIsInVzZXJUb0ZvbGxvdyIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImV4aXN0aW5nRm9sbG93IiwiZm9sbG93cyIsImZvbGxvd2VySWRfZm9sbG93aW5nSWQiLCJmb2xsb3dlcklkIiwiZm9sbG93aW5nSWQiLCJkZWxldGUiLCJzdWNjZXNzIiwiYWN0aW9uIiwibWVzc2FnZSIsIm5hbWUiLCJjcmVhdGUiLCJkYXRhIiwibm90aWZpY2F0aW9uIiwidHlwZSIsInVzZXJJZCIsInJlbGF0ZWRVc2VySWQiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/users/[username]/follow/route.ts\n");

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
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/@auth","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fusers%2F%5Busername%5D%2Ffollow%2Froute&page=%2Fapi%2Fusers%2F%5Busername%5D%2Ffollow%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2F%5Busername%5D%2Ffollow%2Froute.ts&appDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();