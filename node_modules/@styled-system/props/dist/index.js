"use strict";

exports.__esModule = true;
exports.pick = exports.omit = void 0;

var _styledSystem = require("styled-system");

var all = (0, _styledSystem.compose)(_styledSystem.space, _styledSystem.typography, _styledSystem.color, _styledSystem.layout, _styledSystem.flexbox, _styledSystem.border, _styledSystem.background, _styledSystem.position, _styledSystem.grid, _styledSystem.shadow, _styledSystem.buttonStyle, _styledSystem.textStyle, _styledSystem.colorStyle);
var regex = new RegExp("^(" + all.propNames.join('|') + ")$");

var omit = function omit(props) {
  var next = {};

  for (var key in props) {
    if (regex.test(key)) continue;
    next[key] = props[key];
  }

  return next;
};

exports.omit = omit;

var pick = function pick(props) {
  var next = {};

  for (var key in props) {
    if (!regex.test(key)) continue;
    next[key] = props[key];
  }

  return next;
};

exports.pick = pick;