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
exports.id = "app/api/search/route";
exports.ids = ["app/api/search/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsearch%2Froute&page=%2Fapi%2Fsearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsearch%2Froute.ts&appDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsearch%2Froute&page=%2Fapi%2Fsearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsearch%2Froute.ts&appDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_michaelmartinez_My_Stuff_Software_Development_BlueSky_Clone_app_api_search_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/search/route.ts */ \"(rsc)/./app/api/search/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/search/route\",\n        pathname: \"/api/search\",\n        filename: \"route\",\n        bundlePath: \"app/api/search/route\"\n    },\n    resolvedPagePath: \"/Users/michaelmartinez/My Stuff/Software Development/BlueSky Clone/app/api/search/route.ts\",\n    nextConfigOutput,\n    userland: _Users_michaelmartinez_My_Stuff_Software_Development_BlueSky_Clone_app_api_search_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/search/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZzZWFyY2glMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnNlYXJjaCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnNlYXJjaCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm1pY2hhZWxtYXJ0aW5leiUyRk15JTIwU3R1ZmYlMkZTb2Z0d2FyZSUyMERldmVsb3BtZW50JTJGQmx1ZVNreSUyMENsb25lJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm1pY2hhZWxtYXJ0aW5leiUyRk15JTIwU3R1ZmYlMkZTb2Z0d2FyZSUyMERldmVsb3BtZW50JTJGQmx1ZVNreSUyMENsb25lJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQzBDO0FBQ3ZIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUdBQXVHO0FBQy9HO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDNko7O0FBRTdKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmx1ZXNreS1jbG9uZS8/OTQ4OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvbWljaGFlbG1hcnRpbmV6L015IFN0dWZmL1NvZnR3YXJlIERldmVsb3BtZW50L0JsdWVTa3kgQ2xvbmUvYXBwL2FwaS9zZWFyY2gvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3NlYXJjaC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3NlYXJjaFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvc2VhcmNoL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL21pY2hhZWxtYXJ0aW5lei9NeSBTdHVmZi9Tb2Z0d2FyZSBEZXZlbG9wbWVudC9CbHVlU2t5IENsb25lL2FwcC9hcGkvc2VhcmNoL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3NlYXJjaC9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsearch%2Froute&page=%2Fapi%2Fsearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsearch%2Froute.ts&appDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/search/route.ts":
/*!*********************************!*\
  !*** ./app/api/search/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/auth */ \"(rsc)/./auth.ts\");\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_1__.PrismaClient();\nasync function GET(request) {\n    try {\n        const { searchParams } = new URL(request.url);\n        const query = searchParams.get(\"q\");\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_auth__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        const currentUserId = session?.user?.id;\n        if (!query || query.trim().length === 0) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                users: []\n            });\n        }\n        const searchTerm = query.trim();\n        // Search users by name or username\n        const users = await prisma.user.findMany({\n            where: {\n                OR: [\n                    {\n                        name: {\n                            contains: searchTerm,\n                            mode: \"insensitive\"\n                        }\n                    },\n                    {\n                        username: {\n                            contains: searchTerm,\n                            mode: \"insensitive\"\n                        }\n                    }\n                ],\n                // Exclude the current user from search results\n                id: {\n                    not: currentUserId\n                }\n            },\n            include: {\n                _count: {\n                    select: {\n                        posts: true,\n                        followers: true,\n                        following: true\n                    }\n                }\n            },\n            take: 20,\n            orderBy: [\n                {\n                    followers: {\n                        _count: \"desc\"\n                    }\n                },\n                {\n                    posts: {\n                        _count: \"desc\"\n                    }\n                }\n            ]\n        });\n        // Add follow status for each user\n        const usersWithFollowStatus = await Promise.all(users.map(async (user)=>{\n            let isFollowing = false;\n            if (currentUserId) {\n                const follow = await prisma.follows.findUnique({\n                    where: {\n                        followerId_followingId: {\n                            followerId: currentUserId,\n                            followingId: user.id\n                        }\n                    }\n                });\n                isFollowing = !!follow;\n            }\n            return {\n                id: user.id,\n                name: user.name,\n                username: user.username,\n                email: user.email,\n                bio: user.bio,\n                image: user.image,\n                _count: user._count,\n                isFollowing\n            };\n        }));\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            users: usersWithFollowStatus\n        });\n    } catch (error) {\n        console.error(\"Error searching users:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"Failed to search users\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3NlYXJjaC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXVEO0FBQ1Y7QUFDRDtBQUNSO0FBRXBDLE1BQU1JLFNBQVMsSUFBSUgsd0RBQVlBO0FBRXhCLGVBQWVJLElBQUlDLE9BQW9CO0lBQzVDLElBQUk7UUFDRixNQUFNLEVBQUVDLFlBQVksRUFBRSxHQUFHLElBQUlDLElBQUlGLFFBQVFHLEdBQUc7UUFDNUMsTUFBTUMsUUFBUUgsYUFBYUksR0FBRyxDQUFDO1FBQy9CLE1BQU1DLFVBQVUsTUFBTVYsMkRBQWdCQSxDQUFDQyw4Q0FBV0E7UUFDbEQsTUFBTVUsZ0JBQWdCRCxTQUFTRSxNQUFNQztRQUVyQyxJQUFJLENBQUNMLFNBQVNBLE1BQU1NLElBQUksR0FBR0MsTUFBTSxLQUFLLEdBQUc7WUFDdkMsT0FBT2pCLGtGQUFZQSxDQUFDa0IsSUFBSSxDQUFDO2dCQUFFQyxPQUFPLEVBQUU7WUFBQztRQUN2QztRQUVBLE1BQU1DLGFBQWFWLE1BQU1NLElBQUk7UUFFN0IsbUNBQW1DO1FBQ25DLE1BQU1HLFFBQVEsTUFBTWYsT0FBT1UsSUFBSSxDQUFDTyxRQUFRLENBQUM7WUFDdkNDLE9BQU87Z0JBQ0xDLElBQUk7b0JBQ0Y7d0JBQ0VDLE1BQU07NEJBQ0pDLFVBQVVMOzRCQUNWTSxNQUFNO3dCQUNSO29CQUNGO29CQUNBO3dCQUNFQyxVQUFVOzRCQUNSRixVQUFVTDs0QkFDVk0sTUFBTTt3QkFDUjtvQkFDRjtpQkFDRDtnQkFDRCwrQ0FBK0M7Z0JBQy9DWCxJQUFJO29CQUNGYSxLQUFLZjtnQkFDUDtZQUNGO1lBQ0FnQixTQUFTO2dCQUNQQyxRQUFRO29CQUNOQyxRQUFRO3dCQUNOQyxPQUFPO3dCQUNQQyxXQUFXO3dCQUNYQyxXQUFXO29CQUNiO2dCQUNGO1lBQ0Y7WUFDQUMsTUFBTTtZQUNOQyxTQUFTO2dCQUNQO29CQUNFSCxXQUFXO3dCQUNUSCxRQUFRO29CQUNWO2dCQUNGO2dCQUNBO29CQUNFRSxPQUFPO3dCQUNMRixRQUFRO29CQUNWO2dCQUNGO2FBQ0Q7UUFDSDtRQUVBLGtDQUFrQztRQUNsQyxNQUFNTyx3QkFBd0IsTUFBTUMsUUFBUUMsR0FBRyxDQUM3Q3BCLE1BQU1xQixHQUFHLENBQUMsT0FBTzFCO1lBQ2YsSUFBSTJCLGNBQWM7WUFFbEIsSUFBSTVCLGVBQWU7Z0JBQ2pCLE1BQU02QixTQUFTLE1BQU10QyxPQUFPdUMsT0FBTyxDQUFDQyxVQUFVLENBQUM7b0JBQzdDdEIsT0FBTzt3QkFDTHVCLHdCQUF3Qjs0QkFDdEJDLFlBQVlqQzs0QkFDWmtDLGFBQWFqQyxLQUFLQyxFQUFFO3dCQUN0QjtvQkFDRjtnQkFDRjtnQkFDQTBCLGNBQWMsQ0FBQyxDQUFDQztZQUNsQjtZQUVBLE9BQU87Z0JBQ0wzQixJQUFJRCxLQUFLQyxFQUFFO2dCQUNYUyxNQUFNVixLQUFLVSxJQUFJO2dCQUNmRyxVQUFVYixLQUFLYSxRQUFRO2dCQUN2QnFCLE9BQU9sQyxLQUFLa0MsS0FBSztnQkFDakJDLEtBQUtuQyxLQUFLbUMsR0FBRztnQkFDYkMsT0FBT3BDLEtBQUtvQyxLQUFLO2dCQUNqQnBCLFFBQVFoQixLQUFLZ0IsTUFBTTtnQkFDbkJXO1lBQ0Y7UUFDRjtRQUdGLE9BQU96QyxrRkFBWUEsQ0FBQ2tCLElBQUksQ0FBQztZQUFFQyxPQUFPa0I7UUFBc0I7SUFDMUQsRUFBRSxPQUFPYyxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQywwQkFBMEJBO1FBQ3hDLE9BQU9uRCxrRkFBWUEsQ0FBQ2tCLElBQUksQ0FDdEI7WUFBRWlDLE9BQU87UUFBeUIsR0FDbEM7WUFBRUUsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibHVlc2t5LWNsb25lLy4vYXBwL2FwaS9zZWFyY2gvcm91dGUudHM/NzgzMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tICduZXh0LWF1dGgnXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvYXV0aCdcblxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gbmV3IFVSTChyZXF1ZXN0LnVybClcbiAgICBjb25zdCBxdWVyeSA9IHNlYXJjaFBhcmFtcy5nZXQoJ3EnKVxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxuICAgIGNvbnN0IGN1cnJlbnRVc2VySWQgPSBzZXNzaW9uPy51c2VyPy5pZFxuXG4gICAgaWYgKCFxdWVyeSB8fCBxdWVyeS50cmltKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyB1c2VyczogW10gfSlcbiAgICB9XG5cbiAgICBjb25zdCBzZWFyY2hUZXJtID0gcXVlcnkudHJpbSgpXG5cbiAgICAvLyBTZWFyY2ggdXNlcnMgYnkgbmFtZSBvciB1c2VybmFtZVxuICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZE1hbnkoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgT1I6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICAgIGNvbnRhaW5zOiBzZWFyY2hUZXJtLFxuICAgICAgICAgICAgICBtb2RlOiAnaW5zZW5zaXRpdmUnLCAvLyBDYXNlLWluc2Vuc2l0aXZlIHNlYXJjaFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB7XG4gICAgICAgICAgICAgIGNvbnRhaW5zOiBzZWFyY2hUZXJtLFxuICAgICAgICAgICAgICBtb2RlOiAnaW5zZW5zaXRpdmUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICAvLyBFeGNsdWRlIHRoZSBjdXJyZW50IHVzZXIgZnJvbSBzZWFyY2ggcmVzdWx0c1xuICAgICAgICBpZDoge1xuICAgICAgICAgIG5vdDogY3VycmVudFVzZXJJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBpbmNsdWRlOiB7XG4gICAgICAgIF9jb3VudDoge1xuICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgcG9zdHM6IHRydWUsXG4gICAgICAgICAgICBmb2xsb3dlcnM6IHRydWUsXG4gICAgICAgICAgICBmb2xsb3dpbmc6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB0YWtlOiAyMCwgLy8gTGltaXQgcmVzdWx0c1xuICAgICAgb3JkZXJCeTogW1xuICAgICAgICB7XG4gICAgICAgICAgZm9sbG93ZXJzOiB7XG4gICAgICAgICAgICBfY291bnQ6ICdkZXNjJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcG9zdHM6IHtcbiAgICAgICAgICAgIF9jb3VudDogJ2Rlc2MnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pXG5cbiAgICAvLyBBZGQgZm9sbG93IHN0YXR1cyBmb3IgZWFjaCB1c2VyXG4gICAgY29uc3QgdXNlcnNXaXRoRm9sbG93U3RhdHVzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICB1c2Vycy5tYXAoYXN5bmMgKHVzZXIpID0+IHtcbiAgICAgICAgbGV0IGlzRm9sbG93aW5nID0gZmFsc2VcbiAgICAgICAgXG4gICAgICAgIGlmIChjdXJyZW50VXNlcklkKSB7XG4gICAgICAgICAgY29uc3QgZm9sbG93ID0gYXdhaXQgcHJpc21hLmZvbGxvd3MuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICBmb2xsb3dlcklkX2ZvbGxvd2luZ0lkOiB7XG4gICAgICAgICAgICAgICAgZm9sbG93ZXJJZDogY3VycmVudFVzZXJJZCxcbiAgICAgICAgICAgICAgICBmb2xsb3dpbmdJZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgICBpc0ZvbGxvd2luZyA9ICEhZm9sbG93XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICBiaW86IHVzZXIuYmlvLFxuICAgICAgICAgIGltYWdlOiB1c2VyLmltYWdlLFxuICAgICAgICAgIF9jb3VudDogdXNlci5fY291bnQsXG4gICAgICAgICAgaXNGb2xsb3dpbmcsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgdXNlcnM6IHVzZXJzV2l0aEZvbGxvd1N0YXR1cyB9KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlYXJjaGluZyB1c2VyczonLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnRmFpbGVkIHRvIHNlYXJjaCB1c2VycycgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgIClcbiAgfVxufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiUHJpc21hQ2xpZW50IiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwicHJpc21hIiwiR0VUIiwicmVxdWVzdCIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsInF1ZXJ5IiwiZ2V0Iiwic2Vzc2lvbiIsImN1cnJlbnRVc2VySWQiLCJ1c2VyIiwiaWQiLCJ0cmltIiwibGVuZ3RoIiwianNvbiIsInVzZXJzIiwic2VhcmNoVGVybSIsImZpbmRNYW55Iiwid2hlcmUiLCJPUiIsIm5hbWUiLCJjb250YWlucyIsIm1vZGUiLCJ1c2VybmFtZSIsIm5vdCIsImluY2x1ZGUiLCJfY291bnQiLCJzZWxlY3QiLCJwb3N0cyIsImZvbGxvd2VycyIsImZvbGxvd2luZyIsInRha2UiLCJvcmRlckJ5IiwidXNlcnNXaXRoRm9sbG93U3RhdHVzIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsImlzRm9sbG93aW5nIiwiZm9sbG93IiwiZm9sbG93cyIsImZpbmRVbmlxdWUiLCJmb2xsb3dlcklkX2ZvbGxvd2luZ0lkIiwiZm9sbG93ZXJJZCIsImZvbGxvd2luZ0lkIiwiZW1haWwiLCJiaW8iLCJpbWFnZSIsImVycm9yIiwiY29uc29sZSIsInN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/search/route.ts\n");

/***/ }),

/***/ "(rsc)/./auth.ts":
/*!*****************!*\
  !*** ./auth.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth/prisma-adapter */ \"(rsc)/./node_modules/@auth/prisma-adapter/index.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_2__.PrismaClient();\nconst authOptions = {\n    adapter: (0,_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(prisma),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                const user = await prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user || !user.password) {\n                    return null;\n                }\n                const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_4___default().compare(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    return null;\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    username: user.username,\n                    image: user.image\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60,\n        updateAge: 24 * 60 * 60\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.username = user.username;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.sub;\n                session.user.username = token.username;\n            }\n            return session;\n        },\n        async redirect ({ url, baseUrl }) {\n            // Allows relative callback URLs\n            if (url.startsWith(\"/\")) return `${baseUrl}${url}`;\n            else if (new URL(url).origin === baseUrl) return url;\n            return baseUrl;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        signUp: \"/signup\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hdXRoLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBZ0M7QUFDb0I7QUFDUDtBQUNvQjtBQUNwQztBQUU3QixNQUFNSyxTQUFTLElBQUlILHdEQUFZQTtBQUV4QixNQUFNSSxjQUFjO0lBQ3pCQyxTQUFTTixtRUFBYUEsQ0FBQ0k7SUFDdkJHLFdBQVc7UUFDVEwsMkVBQW1CQSxDQUFDO1lBQ2xCTSxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQ2pELE9BQU87Z0JBQ1Q7Z0JBRUEsTUFBTUUsT0FBTyxNQUFNWCxPQUFPVyxJQUFJLENBQUNDLFVBQVUsQ0FBQztvQkFDeENDLE9BQU87d0JBQ0xQLE9BQU9ELFlBQVlDLEtBQUs7b0JBQzFCO2dCQUNGO2dCQUVBLElBQUksQ0FBQ0ssUUFBUSxDQUFDQSxLQUFLRixRQUFRLEVBQUU7b0JBQzNCLE9BQU87Z0JBQ1Q7Z0JBRUEsTUFBTUssa0JBQWtCLE1BQU1mLHVEQUFjLENBQzFDTSxZQUFZSSxRQUFRLEVBQ3BCRSxLQUFLRixRQUFRO2dCQUdmLElBQUksQ0FBQ0ssaUJBQWlCO29CQUNwQixPQUFPO2dCQUNUO2dCQUVBLE9BQU87b0JBQ0xFLElBQUlMLEtBQUtLLEVBQUU7b0JBQ1hWLE9BQU9LLEtBQUtMLEtBQUs7b0JBQ2pCRixNQUFNTyxLQUFLUCxJQUFJO29CQUNmYSxVQUFVTixLQUFLTSxRQUFRO29CQUN2QkMsT0FBT1AsS0FBS08sS0FBSztnQkFDbkI7WUFDRjtRQUNGO0tBQ0Q7SUFDREMsU0FBUztRQUNQQyxVQUFVO1FBQ1ZDLFFBQVEsS0FBSyxLQUFLLEtBQUs7UUFDdkJDLFdBQVcsS0FBSyxLQUFLO0lBQ3ZCO0lBQ0FDLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRWQsSUFBSSxFQUFFO1lBQ3ZCLElBQUlBLE1BQU07Z0JBQ1JjLE1BQU1SLFFBQVEsR0FBR04sS0FBS00sUUFBUTtZQUNoQztZQUNBLE9BQU9RO1FBQ1Q7UUFDQSxNQUFNTixTQUFRLEVBQUVBLE9BQU8sRUFBRU0sS0FBSyxFQUFFO1lBQzlCLElBQUlBLE9BQU87Z0JBQ1ROLFFBQVFSLElBQUksQ0FBQ0ssRUFBRSxHQUFHUyxNQUFNQyxHQUFHO2dCQUMzQlAsUUFBUVIsSUFBSSxDQUFDTSxRQUFRLEdBQUdRLE1BQU1SLFFBQVE7WUFDeEM7WUFDQSxPQUFPRTtRQUNUO1FBQ0EsTUFBTVEsVUFBUyxFQUFFQyxHQUFHLEVBQUVDLE9BQU8sRUFBRTtZQUM3QixnQ0FBZ0M7WUFDaEMsSUFBSUQsSUFBSUUsVUFBVSxDQUFDLE1BQU0sT0FBTyxDQUFDLEVBQUVELFFBQVEsRUFBRUQsSUFBSSxDQUFDO2lCQUU3QyxJQUFJLElBQUlHLElBQUlILEtBQUtJLE1BQU0sS0FBS0gsU0FBUyxPQUFPRDtZQUNqRCxPQUFPQztRQUNUO0lBQ0Y7SUFDQUksT0FBTztRQUNMQyxRQUFRO1FBQ1JDLFFBQVE7SUFDVjtJQUNBQyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLGVBQWU7QUFDckMsRUFBQztBQUVELGlFQUFlNUMsZ0RBQVFBLENBQUNNLFlBQVlBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibHVlc2t5LWNsb25lLy4vYXV0aC50cz85MjM4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCJcbmltcG9ydCB7IFByaXNtYUFkYXB0ZXIgfSBmcm9tIFwiQGF1dGgvcHJpc21hLWFkYXB0ZXJcIlxuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCJcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCJcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCJcblxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpXG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9ucyA9IHtcbiAgYWRhcHRlcjogUHJpc21hQWRhcHRlcihwcmlzbWEpLFxuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6IFwiY3JlZGVudGlhbHNcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfVxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmICghdXNlciB8fCAhdXNlci5wYXNzd29yZCkge1xuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc1Bhc3N3b3JkVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShcbiAgICAgICAgICBjcmVkZW50aWFscy5wYXNzd29yZCxcbiAgICAgICAgICB1c2VyLnBhc3N3b3JkXG4gICAgICAgIClcblxuICAgICAgICBpZiAoIWlzUGFzc3dvcmRWYWxpZCkge1xuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcbiAgICAgICAgICBpbWFnZTogdXNlci5pbWFnZSxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogXCJqd3RcIixcbiAgICBtYXhBZ2U6IDMwICogMjQgKiA2MCAqIDYwLCAvLyAzMCBkYXlzXG4gICAgdXBkYXRlQWdlOiAyNCAqIDYwICogNjAsIC8vIDI0IGhvdXJzXG4gIH0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHRva2VuLnVzZXJuYW1lID0gdXNlci51c2VybmFtZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuXG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLnN1YiFcbiAgICAgICAgc2Vzc2lvbi51c2VyLnVzZXJuYW1lID0gdG9rZW4udXNlcm5hbWUgYXMgc3RyaW5nXG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvblxuICAgIH0sXG4gICAgYXN5bmMgcmVkaXJlY3QoeyB1cmwsIGJhc2VVcmwgfSkge1xuICAgICAgLy8gQWxsb3dzIHJlbGF0aXZlIGNhbGxiYWNrIFVSTHNcbiAgICAgIGlmICh1cmwuc3RhcnRzV2l0aChcIi9cIikpIHJldHVybiBgJHtiYXNlVXJsfSR7dXJsfWBcbiAgICAgIC8vIEFsbG93cyBjYWxsYmFjayBVUkxzIG9uIHRoZSBzYW1lIG9yaWdpblxuICAgICAgZWxzZSBpZiAobmV3IFVSTCh1cmwpLm9yaWdpbiA9PT0gYmFzZVVybCkgcmV0dXJuIHVybFxuICAgICAgcmV0dXJuIGJhc2VVcmxcbiAgICB9XG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiAnL2xvZ2luJyxcbiAgICBzaWduVXA6ICcvc2lnbnVwJyxcbiAgfSxcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXG59XG5cbmV4cG9ydCBkZWZhdWx0IE5leHRBdXRoKGF1dGhPcHRpb25zKSAiXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJQcmlzbWFBZGFwdGVyIiwiUHJpc21hQ2xpZW50IiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImJjcnlwdCIsInByaXNtYSIsImF1dGhPcHRpb25zIiwiYWRhcHRlciIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaXNQYXNzd29yZFZhbGlkIiwiY29tcGFyZSIsImlkIiwidXNlcm5hbWUiLCJpbWFnZSIsInNlc3Npb24iLCJzdHJhdGVneSIsIm1heEFnZSIsInVwZGF0ZUFnZSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic3ViIiwicmVkaXJlY3QiLCJ1cmwiLCJiYXNlVXJsIiwic3RhcnRzV2l0aCIsIlVSTCIsIm9yaWdpbiIsInBhZ2VzIiwic2lnbkluIiwic2lnblVwIiwic2VjcmV0IiwicHJvY2VzcyIsImVudiIsIk5FWFRBVVRIX1NFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./auth.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/@auth","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsearch%2Froute&page=%2Fapi%2Fsearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsearch%2Froute.ts&appDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();