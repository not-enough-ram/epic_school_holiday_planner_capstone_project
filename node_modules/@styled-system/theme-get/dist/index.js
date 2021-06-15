"use strict";

exports.__esModule = true;
exports["default"] = exports.themeGet = void 0;

var _core = require("@styled-system/core");

var themeGet = function themeGet(path, fallback) {
  if (fallback === void 0) {
    fallback = null;
  }

  return function (props) {
    return (0, _core.get)(props.theme, path, fallback);
  };
};

exports.themeGet = themeGet;
var _default = themeGet;
exports["default"] = _default;