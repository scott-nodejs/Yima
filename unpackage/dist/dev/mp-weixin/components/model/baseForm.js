(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/model/baseForm"],{

/***/ 65:
/*!*************************************************************!*\
  !*** D:/appshuo/oneCode/Yima/components/model/baseForm.vue ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _baseForm_vue_vue_type_template_id_aa3f3854___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseForm.vue?vue&type=template&id=aa3f3854& */ 66);
/* harmony import */ var _baseForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./baseForm.vue?vue&type=script&lang=js& */ 68);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _baseForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _baseForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _baseForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _baseForm_vue_vue_type_template_id_aa3f3854___WEBPACK_IMPORTED_MODULE_0__["render"],
  _baseForm_vue_vue_type_template_id_aa3f3854___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _baseForm_vue_vue_type_template_id_aa3f3854___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/model/baseForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 66:
/*!********************************************************************************************!*\
  !*** D:/appshuo/oneCode/Yima/components/model/baseForm.vue?vue&type=template&id=aa3f3854& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_baseForm_vue_vue_type_template_id_aa3f3854___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./baseForm.vue?vue&type=template&id=aa3f3854& */ 67);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_baseForm_vue_vue_type_template_id_aa3f3854___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_baseForm_vue_vue_type_template_id_aa3f3854___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_baseForm_vue_vue_type_template_id_aa3f3854___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_baseForm_vue_vue_type_template_id_aa3f3854___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 67:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/appshuo/oneCode/Yima/components/model/baseForm.vue?vue&type=template&id=aa3f3854& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 68:
/*!**************************************************************************************!*\
  !*** D:/appshuo/oneCode/Yima/components/model/baseForm.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_baseForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./baseForm.vue?vue&type=script&lang=js& */ 69);
/* harmony import */ var _C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_baseForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_baseForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_baseForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_baseForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_HBuilderX_3_1_18_20210609_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_baseForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 69:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/appshuo/oneCode/Yima/components/model/baseForm.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    var currentDate = this.getDate({
      format: true });

    return {
      date: currentDate,
      count: 0 };

  },
  props: {
    formData: {
      type: Object } },


  computed: {
    startDate: function startDate() {
      return this.getDate('start');
    },
    endDate: function endDate() {
      return this.getDate('end');
    } },

  methods: {
    changeDefault: function changeDefault() {
      this.form.is_default = this.form.is_default == 0 ? 1 : 0;
    },
    changeDefaultRadio: function changeDefaultRadio(e) {
      var val = e.detail.value;
      for (var i = 0; i < this.formData.cdata.form.length; i++) {
        var item = this.formData.cdata.form[i];
        if (item.type === 'radio') {
          item.val = val;
          break;
        }
      }
    },
    changeDefaultCheckbox: function changeDefaultCheckbox(e) {
      console.log(e);
      var val = e.detail.value;
      for (var i = 0; i < this.formData.cdata.form.length; i++) {
        var item = this.formData.cdata.form[i];
        if (item.type === 'checkbox') {
          item.val = val.join();
          break;
        }
      }
    },
    bindPickerChange: function bindPickerChange(e) {
      console.log('picker发送选择改变，携带值为', e.target.value);
      this.count = e.target.value;
      for (var i = 0; i < this.formData.cdata.form.length; i++) {
        var item = this.formData.cdata.form[i];
        if (item.type === 'select') {
          item.val = item['options'][this.count].val;
          break;
        }
      }
    },
    bindDateChange: function bindDateChange(e) {
      this.date = e.target.value;
      for (var i = 0; i < this.formData.cdata.form.length; i++) {
        var item = this.formData.cdata.form[i];
        if (item.type === 'date') {
          item.val = this.date;
          break;
        }
      }
    },
    submit: function submit() {var _this = this;
      var flag = true;
      var url = 'http://yima.hazer.top/api/submit';
      for (var i = 0; i < this.formData.cdata.form.length; i++) {
        if (this.formData.cdata.form[i].isNecessary === 1 && this.formData.cdata.form[i].val === '') {
          if (this.formData.cdata.form[i].type === 'date') {
            this.formData.cdata.form[i].val = this.getDate({ format: true });
            continue;
          }
          flag = false;
          uni.showToast({
            title: this.formData.cdata.form[i].desc + '是必填项',
            duration: 1000,
            icon: 'none' });

          break;
        }
      }
      if (flag) {
        new Promise(function (resolve, reject) {uni.request({
            url: url,
            method: 'POST',
            header: {
              'content-type': 'application/json' },

            data: {
              obj: _this.formData.cdata.form,
              codeId: _this.formData.codeId },

            success: function success(res) {
              resolve(res);
            } });
        }).then(function (res) {
          uni.showToast({
            title: '操作成功',
            duration: 1000 });

          console.log(_this.formData);
          for (var _i = 0; _i < _this.formData.cdata.form.length; _i++) {

            var item = _this.formData.cdata.form[_i];
            if (item.type === 'select' || item.type === 'radio' || item.type === 'checkbox') {

            } else {
              item.val = '';
            }
          }
        });
      }
    },
    getDate: function getDate(type) {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();

      if (type === 'start') {
        year = year - 60;
      } else if (type === 'end') {
        year = year + 2;
      }
      month = month > 9 ? month : '0' + month;
      day = day > 9 ? day : '0' + day;
      return "".concat(year, "-").concat(month, "-").concat(day);
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/model/baseForm.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/model/baseForm-create-component',
    {
        'components/model/baseForm-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(65))
        })
    },
    [['components/model/baseForm-create-component']]
]);
