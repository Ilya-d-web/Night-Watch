/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/js/app.js":
/*!******************************!*\
  !*** ./src/assets/js/app.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./src/assets/js/app.js?");

/***/ }),

/***/ "./src/assets/js/menu-header.js":
/*!**************************************!*\
  !*** ./src/assets/js/menu-header.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(document).ready(function () {\r\n    let scrollOffset = 0;\r\n\r\n    $('.icon-menu').on(\"click\", function () {\r\n        toggleClassActive();\r\n        //Смена класса active у элементов menu и icon\r\n\r\n        if ($('.menu__body').hasClass('active')) {\r\n            stopPropagationIcon();\r\n            //Остановка клика по icon-menu\r\n            stopPropagationMenu();\r\n            //Остановка клика по menu__body\r\n\r\n            $('.header__content').on(\"click\", function (event) {\r\n                removeClassActive();\r\n            });\r\n            //Закрытие burger кликом по header\r\n        }\r\n    });\r\n\r\n    $(window).on(\"resize\", function () {\r\n        if (window.matchMedia('(min-width: 768px)').matches) {\r\n            removeClassActive();\r\n        }\r\n    });\r\n    //Проверка экрана на смену ширины\r\n\r\n    $(window).on(\"scroll\", function () {\r\n        let beginH = $(\"#begin\").innerHeight();\r\n        scrollOffset = $(this).scrollTop();\r\n\r\n        if (scrollOffset > beginH - 38) {\r\n            $('.header').addClass('fixed');\r\n        } else {\r\n            $('.header').removeClass('fixed');\r\n        }\r\n    });\r\n    //Фиксирование позиции burger во время скрола\r\n\r\n    $('a.menu__link').on(\"click\", function () {\r\n        removeClassActive();\r\n        //Закрытие burger при прокрутке к якорю\r\n\r\n        $(\"html, body\").animate({\r\n            scrollTop: ($($(this).attr(\"href\")).offset().top + -80) + \"px\"\r\n        }, {\r\n            duration: 1000,\r\n            easing: \"swing\",\r\n        });\r\n    });\r\n    //Плавная прокрутка\r\n});\r\n//Главная функция страницы, которая срабатывает после загрузки содержимого\r\n\r\nfunction removeClassActive() {\r\n    $('.icon-menu').removeClass('active');\r\n    $('.menu__body').removeClass('active');\r\n    $('body').removeClass('no-scroll');\r\n}\r\n//Удаление класса active\r\nfunction toggleClassActive() {\r\n    $('.icon-menu').toggleClass('active');\r\n    $('.menu__body').toggleClass('active');\r\n    $('body').toggleClass('no-scroll');\r\n}\r\n//Смена класса active\r\nfunction stopPropagationIcon() {\r\n    $('.icon-menu').on(\"click\", function (event) {\r\n        event.stopPropagation();\r\n    });\r\n}\r\n//Остановка клика по icon-menu\r\nfunction stopPropagationMenu() {\r\n    $('.menu__body').on(\"click\", function (event) {\r\n        event.stopPropagation();\r\n    });\r\n}\r\n//Остановка клика по menu__body\n\n//# sourceURL=webpack:///./src/assets/js/menu-header.js?");

/***/ }),

/***/ "./src/assets/js/slider.js":
/*!*********************************!*\
  !*** ./src/assets/js/slider.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(document).ready(function () {\r\n    $('.slider').slick({\r\n        arrows: true,\r\n        slidesToShow: 3,\r\n        slidesToScroll: 1,\r\n        speed: 400,\r\n        easing: 'ease-in-out',\r\n        autoplay: true,\r\n        autoplaySpeed: 3500,\r\n        draggable: false,\r\n        touchThreshold: 8,\r\n        waitForAnimate: true,\r\n        variableWidth: true,\r\n        lazyLoad: 'ondemand',\r\n        responsive: [{\r\n            breakpoint: 767.98,\r\n            settings: {\r\n                arrows: false,\r\n                slidesToShow: 4,\r\n            },\r\n        }],\r\n    });\r\n})\n\n//# sourceURL=webpack:///./src/assets/js/slider.js?");

/***/ }),

/***/ "./src/assets/js/webpForCss.js":
/*!*************************************!*\
  !*** ./src/assets/js/webpForCss.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function testWebP(callback) {\r\n\r\n    var webP = new Image();\r\n    webP.onload = webP.onerror = function () {\r\n        callback(webP.height == 2);\r\n    };\r\n    webP.src = \"data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA\";\r\n}\r\n\r\ntestWebP(function (support) {\r\n\r\n    if (support == true) {\r\n        document.querySelector('body').classList.add('webp');\r\n    } else {\r\n        document.querySelector('body').classList.add('no-webp');\r\n    }\r\n});\n\n//# sourceURL=webpack:///./src/assets/js/webpForCss.js?");

/***/ }),

/***/ 0:
/*!***************************************************************************************************************************!*\
  !*** multi ./src/assets/js/app.js ./src/assets/js/menu-header.js ./src/assets/js/slider.js ./src/assets/js/webpForCss.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! E:\\Any\\WEB\\ПРОЕКТ --Night Watch--\\src\\assets\\js\\app.js */\"./src/assets/js/app.js\");\n__webpack_require__(/*! E:\\Any\\WEB\\ПРОЕКТ --Night Watch--\\src\\assets\\js\\menu-header.js */\"./src/assets/js/menu-header.js\");\n__webpack_require__(/*! E:\\Any\\WEB\\ПРОЕКТ --Night Watch--\\src\\assets\\js\\slider.js */\"./src/assets/js/slider.js\");\nmodule.exports = __webpack_require__(/*! E:\\Any\\WEB\\ПРОЕКТ --Night Watch--\\src\\assets\\js\\webpForCss.js */\"./src/assets/js/webpForCss.js\");\n\n\n//# sourceURL=webpack:///multi_./src/assets/js/app.js_./src/assets/js/menu-header.js_./src/assets/js/slider.js_./src/assets/js/webpForCss.js?");

/***/ })

/******/ });