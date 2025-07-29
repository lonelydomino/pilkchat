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
exports.id = "app/api/posts/trending/route";
exports.ids = ["app/api/posts/trending/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fposts%2Ftrending%2Froute&page=%2Fapi%2Fposts%2Ftrending%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fposts%2Ftrending%2Froute.ts&appDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fposts%2Ftrending%2Froute&page=%2Fapi%2Fposts%2Ftrending%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fposts%2Ftrending%2Froute.ts&appDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_michaelmartinez_My_Stuff_Software_Development_BlueSky_Clone_app_api_posts_trending_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/posts/trending/route.ts */ \"(rsc)/./app/api/posts/trending/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/posts/trending/route\",\n        pathname: \"/api/posts/trending\",\n        filename: \"route\",\n        bundlePath: \"app/api/posts/trending/route\"\n    },\n    resolvedPagePath: \"/Users/michaelmartinez/My Stuff/Software Development/BlueSky Clone/app/api/posts/trending/route.ts\",\n    nextConfigOutput,\n    userland: _Users_michaelmartinez_My_Stuff_Software_Development_BlueSky_Clone_app_api_posts_trending_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/posts/trending/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZwb3N0cyUyRnRyZW5kaW5nJTJGcm91dGUmcGFnZT0lMkZhcGklMkZwb3N0cyUyRnRyZW5kaW5nJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcG9zdHMlMkZ0cmVuZGluZyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm1pY2hhZWxtYXJ0aW5leiUyRk15JTIwU3R1ZmYlMkZTb2Z0d2FyZSUyMERldmVsb3BtZW50JTJGQmx1ZVNreSUyMENsb25lJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm1pY2hhZWxtYXJ0aW5leiUyRk15JTIwU3R1ZmYlMkZTb2Z0d2FyZSUyMERldmVsb3BtZW50JTJGQmx1ZVNreSUyMENsb25lJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ2tEO0FBQy9IO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUdBQXVHO0FBQy9HO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDNko7O0FBRTdKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmx1ZXNreS1jbG9uZS8/MDhiOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvbWljaGFlbG1hcnRpbmV6L015IFN0dWZmL1NvZnR3YXJlIERldmVsb3BtZW50L0JsdWVTa3kgQ2xvbmUvYXBwL2FwaS9wb3N0cy90cmVuZGluZy9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcG9zdHMvdHJlbmRpbmcvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9wb3N0cy90cmVuZGluZ1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvcG9zdHMvdHJlbmRpbmcvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvbWljaGFlbG1hcnRpbmV6L015IFN0dWZmL1NvZnR3YXJlIERldmVsb3BtZW50L0JsdWVTa3kgQ2xvbmUvYXBwL2FwaS9wb3N0cy90cmVuZGluZy9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9wb3N0cy90cmVuZGluZy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fposts%2Ftrending%2Froute&page=%2Fapi%2Fposts%2Ftrending%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fposts%2Ftrending%2Froute.ts&appDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/posts/trending/route.ts":
/*!*****************************************!*\
  !*** ./app/api/posts/trending/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/auth */ \"(rsc)/./auth.ts\");\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_1__.PrismaClient();\nasync function GET(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_auth__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        const currentUserId = session?.user?.id;\n        // Get trending posts with engagement metrics\n        const trendingPosts = await prisma.post.findMany({\n            where: {\n                published: true,\n                createdAt: {\n                    gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)\n                }\n            },\n            include: {\n                author: {\n                    select: {\n                        id: true,\n                        name: true,\n                        username: true,\n                        image: true\n                    }\n                },\n                _count: {\n                    select: {\n                        likes: true,\n                        comments: true,\n                        reposts: true\n                    }\n                }\n            },\n            orderBy: [\n                {\n                    likes: {\n                        _count: \"desc\"\n                    }\n                },\n                {\n                    comments: {\n                        _count: \"desc\"\n                    }\n                },\n                {\n                    createdAt: \"desc\"\n                }\n            ],\n            take: 20\n        });\n        // Calculate trending score and add interaction status\n        const postsWithScore = await Promise.all(trendingPosts.map(async (post)=>{\n            // Calculate trending score based on engagement and recency\n            const hoursSinceCreation = (Date.now() - post.createdAt.getTime()) / (1000 * 60 * 60);\n            const engagementScore = post._count.likes + post._count.comments * 2 + post._count.reposts * 3;\n            const trendingScore = engagementScore / Math.pow(hoursSinceCreation + 2, 1.5) // Gravity factor\n            ;\n            // Check if current user has interacted with this post\n            let isLiked = false;\n            let isReposted = false;\n            if (currentUserId) {\n                const [like, repost] = await Promise.all([\n                    prisma.like.findUnique({\n                        where: {\n                            userId_postId: {\n                                userId: currentUserId,\n                                postId: post.id\n                            }\n                        }\n                    }),\n                    prisma.repost.findUnique({\n                        where: {\n                            userId_postId: {\n                                userId: currentUserId,\n                                postId: post.id\n                            }\n                        }\n                    })\n                ]);\n                isLiked = !!like;\n                isReposted = !!repost;\n            }\n            return {\n                ...post,\n                trendingScore,\n                isLiked,\n                isReposted\n            };\n        }));\n        // Sort by trending score\n        postsWithScore.sort((a, b)=>b.trendingScore - a.trendingScore);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            posts: postsWithScore.slice(0, 10)\n        });\n    } catch (error) {\n        console.error(\"Error fetching trending posts:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"Failed to fetch trending posts\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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T3hELGtGQUFZQSxDQUFDcUQsSUFBSSxDQUN0QjtZQUFFRyxPQUFPO1FBQWlDLEdBQzFDO1lBQUVFLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmx1ZXNreS1jbG9uZS8uL2FwcC9hcGkvcG9zdHMvdHJlbmRpbmcvcm91dGUudHM/OWE3YSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tICduZXh0LWF1dGgnXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvYXV0aCdcblxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucylcbiAgICBjb25zdCBjdXJyZW50VXNlcklkID0gc2Vzc2lvbj8udXNlcj8uaWRcblxuICAgIC8vIEdldCB0cmVuZGluZyBwb3N0cyB3aXRoIGVuZ2FnZW1lbnQgbWV0cmljc1xuICAgIGNvbnN0IHRyZW5kaW5nUG9zdHMgPSBhd2FpdCBwcmlzbWEucG9zdC5maW5kTWFueSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBwdWJsaXNoZWQ6IHRydWUsXG4gICAgICAgIGNyZWF0ZWRBdDoge1xuICAgICAgICAgIGd0ZTogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDcgKiAyNCAqIDYwICogNjAgKiAxMDAwKSwgLy8gTGFzdCA3IGRheXNcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBpbmNsdWRlOiB7XG4gICAgICAgIGF1dGhvcjoge1xuICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICBuYW1lOiB0cnVlLFxuICAgICAgICAgICAgdXNlcm5hbWU6IHRydWUsXG4gICAgICAgICAgICBpbWFnZTogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgIGxpa2VzOiB0cnVlLFxuICAgICAgICAgICAgY29tbWVudHM6IHRydWUsXG4gICAgICAgICAgICByZXBvc3RzOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgb3JkZXJCeTogW1xuICAgICAgICB7XG4gICAgICAgICAgbGlrZXM6IHtcbiAgICAgICAgICAgIF9jb3VudDogJ2Rlc2MnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjb21tZW50czoge1xuICAgICAgICAgICAgX2NvdW50OiAnZGVzYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGNyZWF0ZWRBdDogJ2Rlc2MnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHRha2U6IDIwLFxuICAgIH0pXG5cbiAgICAvLyBDYWxjdWxhdGUgdHJlbmRpbmcgc2NvcmUgYW5kIGFkZCBpbnRlcmFjdGlvbiBzdGF0dXNcbiAgICBjb25zdCBwb3N0c1dpdGhTY29yZSA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgdHJlbmRpbmdQb3N0cy5tYXAoYXN5bmMgKHBvc3QpID0+IHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRyZW5kaW5nIHNjb3JlIGJhc2VkIG9uIGVuZ2FnZW1lbnQgYW5kIHJlY2VuY3lcbiAgICAgICAgY29uc3QgaG91cnNTaW5jZUNyZWF0aW9uID0gKERhdGUubm93KCkgLSBwb3N0LmNyZWF0ZWRBdC5nZXRUaW1lKCkpIC8gKDEwMDAgKiA2MCAqIDYwKVxuICAgICAgICBjb25zdCBlbmdhZ2VtZW50U2NvcmUgPSBwb3N0Ll9jb3VudC5saWtlcyArIChwb3N0Ll9jb3VudC5jb21tZW50cyAqIDIpICsgKHBvc3QuX2NvdW50LnJlcG9zdHMgKiAzKVxuICAgICAgICBjb25zdCB0cmVuZGluZ1Njb3JlID0gZW5nYWdlbWVudFNjb3JlIC8gTWF0aC5wb3coaG91cnNTaW5jZUNyZWF0aW9uICsgMiwgMS41KSAvLyBHcmF2aXR5IGZhY3RvclxuXG4gICAgICAgIC8vIENoZWNrIGlmIGN1cnJlbnQgdXNlciBoYXMgaW50ZXJhY3RlZCB3aXRoIHRoaXMgcG9zdFxuICAgICAgICBsZXQgaXNMaWtlZCA9IGZhbHNlXG4gICAgICAgIGxldCBpc1JlcG9zdGVkID0gZmFsc2VcblxuICAgICAgICBpZiAoY3VycmVudFVzZXJJZCkge1xuICAgICAgICAgIGNvbnN0IFtsaWtlLCByZXBvc3RdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcHJpc21hLmxpa2UuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX3Bvc3RJZDoge1xuICAgICAgICAgICAgICAgICAgdXNlcklkOiBjdXJyZW50VXNlcklkLFxuICAgICAgICAgICAgICAgICAgcG9zdElkOiBwb3N0LmlkLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHByaXNtYS5yZXBvc3QuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkX3Bvc3RJZDoge1xuICAgICAgICAgICAgICAgICAgdXNlcklkOiBjdXJyZW50VXNlcklkLFxuICAgICAgICAgICAgICAgICAgcG9zdElkOiBwb3N0LmlkLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICBdKVxuXG4gICAgICAgICAgaXNMaWtlZCA9ICEhbGlrZVxuICAgICAgICAgIGlzUmVwb3N0ZWQgPSAhIXJlcG9zdFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5wb3N0LFxuICAgICAgICAgIHRyZW5kaW5nU2NvcmUsXG4gICAgICAgICAgaXNMaWtlZCxcbiAgICAgICAgICBpc1JlcG9zdGVkLFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIClcblxuICAgIC8vIFNvcnQgYnkgdHJlbmRpbmcgc2NvcmVcbiAgICBwb3N0c1dpdGhTY29yZS5zb3J0KChhLCBiKSA9PiBiLnRyZW5kaW5nU2NvcmUgLSBhLnRyZW5kaW5nU2NvcmUpXG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgcG9zdHM6IHBvc3RzV2l0aFNjb3JlLnNsaWNlKDAsIDEwKSwgLy8gUmV0dXJuIHRvcCAxMCB0cmVuZGluZyBwb3N0c1xuICAgIH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdHJlbmRpbmcgcG9zdHM6JywgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0ZhaWxlZCB0byBmZXRjaCB0cmVuZGluZyBwb3N0cycgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgIClcbiAgfVxufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiUHJpc21hQ2xpZW50IiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwicHJpc21hIiwiR0VUIiwicmVxdWVzdCIsInNlc3Npb24iLCJjdXJyZW50VXNlcklkIiwidXNlciIsImlkIiwidHJlbmRpbmdQb3N0cyIsInBvc3QiLCJmaW5kTWFueSIsIndoZXJlIiwicHVibGlzaGVkIiwiY3JlYXRlZEF0IiwiZ3RlIiwiRGF0ZSIsIm5vdyIsImluY2x1ZGUiLCJhdXRob3IiLCJzZWxlY3QiLCJuYW1lIiwidXNlcm5hbWUiLCJpbWFnZSIsIl9jb3VudCIsImxpa2VzIiwiY29tbWVudHMiLCJyZXBvc3RzIiwib3JkZXJCeSIsInRha2UiLCJwb3N0c1dpdGhTY29yZSIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJob3Vyc1NpbmNlQ3JlYXRpb24iLCJnZXRUaW1lIiwiZW5nYWdlbWVudFNjb3JlIiwidHJlbmRpbmdTY29yZSIsIk1hdGgiLCJwb3ciLCJpc0xpa2VkIiwiaXNSZXBvc3RlZCIsImxpa2UiLCJyZXBvc3QiLCJmaW5kVW5pcXVlIiwidXNlcklkX3Bvc3RJZCIsInVzZXJJZCIsInBvc3RJZCIsInNvcnQiLCJhIiwiYiIsImpzb24iLCJwb3N0cyIsInNsaWNlIiwiZXJyb3IiLCJjb25zb2xlIiwic3RhdHVzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/posts/trending/route.ts\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/@auth","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fposts%2Ftrending%2Froute&page=%2Fapi%2Fposts%2Ftrending%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fposts%2Ftrending%2Froute.ts&appDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmichaelmartinez%2FMy%20Stuff%2FSoftware%20Development%2FBlueSky%20Clone&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();