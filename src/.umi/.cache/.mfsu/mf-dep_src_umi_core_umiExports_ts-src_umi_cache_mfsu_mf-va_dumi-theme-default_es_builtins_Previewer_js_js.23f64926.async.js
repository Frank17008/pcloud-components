(self["webpackChunk_pointcloud_pcloud_components"] = self["webpackChunk_pointcloud_pcloud_components"] || []).push([["mf-dep_src_umi_core_umiExports_ts-src_umi_cache_mfsu_mf-va_dumi-theme-default_es_builtins_Previewer_js_js"],{

/***/ "./src/.umi/core/history.ts":
/*!**********************************!*\
  !*** ./src/.umi/core/history.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createHistory": function() { return /* binding */ createHistory; },
/* harmony export */   "history": function() { return /* binding */ history; }
/* harmony export */ });
/* harmony import */ var _Users_stone_Documents_develop_pcloud_components_node_modules_umijs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@umijs/runtime */ "./node_modules/history-with-query/esm/history.js");
// @ts-nocheck

var options = {
  "basename": "/"
};

if (window.routerBase) {
  options.basename = window.routerBase;
} // remove initial history because of ssr


var history = ({"NODE_ENV":"development"}).__IS_SERVER ? null : (0,_Users_stone_Documents_develop_pcloud_components_node_modules_umijs_runtime__WEBPACK_IMPORTED_MODULE_0__.createBrowserHistory)(options);
var createHistory = function createHistory() {
  var hotReload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (!hotReload) {
    history = (0,_Users_stone_Documents_develop_pcloud_components_node_modules_umijs_runtime__WEBPACK_IMPORTED_MODULE_0__.createBrowserHistory)(options);
  }

  return history;
};


/***/ }),

/***/ "./src/.umi/core/plugin.ts":
/*!*********************************!*\
  !*** ./src/.umi/core/plugin.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "plugin": function() { return /* binding */ plugin; }
/* harmony export */ });
/* harmony import */ var _Users_stone_Documents_develop_pcloud_components_node_modules_umijs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@umijs/runtime */ "./node_modules/@umijs/runtime/dist/index.esm.js");
// @ts-nocheck

var plugin = new _Users_stone_Documents_develop_pcloud_components_node_modules_umijs_runtime__WEBPACK_IMPORTED_MODULE_0__.Plugin({
  validKeys: ['modifyClientRenderOpts', 'patchRoutes', 'rootContainer', 'render', 'onRouteChange', '__mfsu']
});


/***/ }),

/***/ "./src/.umi/core/umiExports.ts":
/*!*************************************!*\
  !*** ./src/.umi/core/umiExports.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "history": function() { return /* reexport safe */ _history__WEBPACK_IMPORTED_MODULE_0__.history; },
/* harmony export */   "plugin": function() { return /* reexport safe */ _plugin__WEBPACK_IMPORTED_MODULE_1__.plugin; }
/* harmony export */ });
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./history */ "./src/.umi/core/history.ts");
/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugin */ "./src/.umi/core/plugin.ts");
// @ts-nocheck



/***/ }),

/***/ "./src/.umi/.cache/.mfsu/mf-va_dumi-theme-default_es_builtins_Previewer.js.js":
/*!************************************************************************************!*\
  !*** ./src/.umi/.cache/.mfsu/mf-va_dumi-theme-default_es_builtins_Previewer.js.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_stone_Documents_develop_pcloud_components_node_modules_dumi_theme_default_es_builtins_Previewer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/dumi-theme-default/es/builtins/Previewer.js */ "./node_modules/dumi-theme-default/es/builtins/Previewer.js");

/* harmony default export */ __webpack_exports__["default"] = (_Users_stone_Documents_develop_pcloud_components_node_modules_dumi_theme_default_es_builtins_Previewer_js__WEBPACK_IMPORTED_MODULE_0__.default);


/***/ })

}]);