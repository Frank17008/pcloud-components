(self["webpackChunk_pointcloud_pcloud_components"] = self["webpackChunk_pointcloud_pcloud_components"] || []).push([["mf-dep_src_umi_cache_mfsu_mf-va_antd_es_select_js"],{

/***/ "./node_modules/antd/es/select/index.js":
/*!**********************************************!*\
  !*** ./node_modules/antd/es/select/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var rc_util_es_omit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rc-util/es/omit */ "./node_modules/antd/node_modules/rc-util/es/omit.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/antd/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var rc_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rc-select */ "./node_modules/rc-select/es/index.js");
/* harmony import */ var _config_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config-provider */ "./node_modules/antd/es/config-provider/context.js");
/* harmony import */ var _utils_iconUtil__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/iconUtil */ "./node_modules/antd/es/select/utils/iconUtil.js");
/* harmony import */ var _config_provider_SizeContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../config-provider/SizeContext */ "./node_modules/antd/es/config-provider/SizeContext.js");
/* harmony import */ var _form_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../form/context */ "./node_modules/antd/es/form/context.js");
/* harmony import */ var _util_statusUtils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../_util/statusUtils */ "./node_modules/antd/es/_util/statusUtils.js");
/* harmony import */ var _util_motion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../_util/motion */ "./node_modules/antd/es/_util/motion.js");

 // TODO: 4.0 - codemod should help to change `filterOption` to support node props.

var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};












var SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';

var InternalSelect = function InternalSelect(_a, ref) {
  var _classNames2;

  var customizePrefixCls = _a.prefixCls,
      _a$bordered = _a.bordered,
      bordered = _a$bordered === void 0 ? true : _a$bordered,
      className = _a.className,
      getPopupContainer = _a.getPopupContainer,
      dropdownClassName = _a.dropdownClassName,
      _a$listHeight = _a.listHeight,
      listHeight = _a$listHeight === void 0 ? 256 : _a$listHeight,
      placement = _a.placement,
      _a$listItemHeight = _a.listItemHeight,
      listItemHeight = _a$listItemHeight === void 0 ? 24 : _a$listItemHeight,
      customizeSize = _a.size,
      notFoundContent = _a.notFoundContent,
      customStatus = _a.status,
      showArrow = _a.showArrow,
      props = __rest(_a, ["prefixCls", "bordered", "className", "getPopupContainer", "dropdownClassName", "listHeight", "placement", "listItemHeight", "size", "notFoundContent", "status", "showArrow"]);

  var _React$useContext = react__WEBPACK_IMPORTED_MODULE_2__.useContext(_config_provider__WEBPACK_IMPORTED_MODULE_6__.ConfigContext),
      getContextPopupContainer = _React$useContext.getPopupContainer,
      getPrefixCls = _React$useContext.getPrefixCls,
      renderEmpty = _React$useContext.renderEmpty,
      direction = _React$useContext.direction,
      virtual = _React$useContext.virtual,
      dropdownMatchSelectWidth = _React$useContext.dropdownMatchSelectWidth;

  var size = react__WEBPACK_IMPORTED_MODULE_2__.useContext(_config_provider_SizeContext__WEBPACK_IMPORTED_MODULE_7__.default);
  var prefixCls = getPrefixCls('select', customizePrefixCls);
  var rootPrefixCls = getPrefixCls();
  var mode = react__WEBPACK_IMPORTED_MODULE_2__.useMemo(function () {
    var m = props.mode;

    if (m === 'combobox') {
      return undefined;
    }

    if (m === SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return 'combobox';
    }

    return m;
  }, [props.mode]);
  var isMultiple = mode === 'multiple' || mode === 'tags';
  var mergedShowArrow = showArrow !== undefined ? showArrow : props.loading || !(isMultiple || mode === 'combobox'); // ===================== Validation Status =====================

  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_form_context__WEBPACK_IMPORTED_MODULE_8__.FormItemStatusContext),
      contextStatus = _useContext.status,
      hasFeedback = _useContext.hasFeedback;

  var mergedStatus = (0,_util_statusUtils__WEBPACK_IMPORTED_MODULE_9__.getMergedStatus)(contextStatus, customStatus); // ===================== Empty =====================

  var mergedNotFound;

  if (notFoundContent !== undefined) {
    mergedNotFound = notFoundContent;
  } else if (mode === 'combobox') {
    mergedNotFound = null;
  } else {
    mergedNotFound = renderEmpty('Select');
  } // ===================== Icons =====================


  var _getIcons = (0,_utils_iconUtil__WEBPACK_IMPORTED_MODULE_10__.default)((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__.default)((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__.default)({}, props), {
    multiple: isMultiple,
    status: mergedStatus,
    hasFeedback: hasFeedback,
    showArrow: mergedShowArrow,
    prefixCls: prefixCls
  })),
      suffixIcon = _getIcons.suffixIcon,
      itemIcon = _getIcons.itemIcon,
      removeIcon = _getIcons.removeIcon,
      clearIcon = _getIcons.clearIcon;

  var selectProps = (0,rc_util_es_omit__WEBPACK_IMPORTED_MODULE_3__.default)(props, ['suffixIcon', 'itemIcon']);
  var rcSelectRtlDropDownClassName = classnames__WEBPACK_IMPORTED_MODULE_4___default()(dropdownClassName, (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)({}, "".concat(prefixCls, "-dropdown-").concat(direction), direction === 'rtl'));
  var mergedSize = customizeSize || size;
  var mergedClassName = classnames__WEBPACK_IMPORTED_MODULE_4___default()((_classNames2 = {}, (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)(_classNames2, "".concat(prefixCls, "-lg"), mergedSize === 'large'), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)(_classNames2, "".concat(prefixCls, "-sm"), mergedSize === 'small'), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)(_classNames2, "".concat(prefixCls, "-rtl"), direction === 'rtl'), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)(_classNames2, "".concat(prefixCls, "-borderless"), !bordered), _classNames2), (0,_util_statusUtils__WEBPACK_IMPORTED_MODULE_9__.getStatusClassNames)(prefixCls, mergedStatus, hasFeedback), className); // ===================== Placement =====================

  var getPlacement = function getPlacement() {
    if (placement !== undefined) {
      return placement;
    }

    return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(rc_select__WEBPACK_IMPORTED_MODULE_5__.default, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__.default)({
    ref: ref,
    virtual: virtual,
    dropdownMatchSelectWidth: dropdownMatchSelectWidth
  }, selectProps, {
    transitionName: (0,_util_motion__WEBPACK_IMPORTED_MODULE_11__.getTransitionName)(rootPrefixCls, (0,_util_motion__WEBPACK_IMPORTED_MODULE_11__.getTransitionDirection)(placement), props.transitionName),
    listHeight: listHeight,
    listItemHeight: listItemHeight,
    mode: mode,
    prefixCls: prefixCls,
    placement: getPlacement(),
    direction: direction,
    inputIcon: suffixIcon,
    menuItemSelectedIcon: itemIcon,
    removeIcon: removeIcon,
    clearIcon: clearIcon,
    notFoundContent: mergedNotFound,
    className: mergedClassName,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    dropdownClassName: rcSelectRtlDropDownClassName,
    showArrow: hasFeedback || showArrow
  }));
};

var Select = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(InternalSelect);
Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.Option = rc_select__WEBPACK_IMPORTED_MODULE_5__.Option;
Select.OptGroup = rc_select__WEBPACK_IMPORTED_MODULE_5__.OptGroup;
/* harmony default export */ __webpack_exports__["default"] = (Select);

/***/ }),

/***/ "./src/.umi/.cache/.mfsu/mf-va_antd_es_select.js":
/*!*******************************************************!*\
  !*** ./src/.umi/.cache/.mfsu/mf-va_antd_es_select.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_es_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/es/select */ "./node_modules/antd/es/select/index.js");

/* harmony default export */ __webpack_exports__["default"] = (antd_es_select__WEBPACK_IMPORTED_MODULE_0__.default);


/***/ })

}]);