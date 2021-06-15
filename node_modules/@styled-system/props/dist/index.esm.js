import { compose, space, typography, color, layout, flexbox, border, background, position, grid, shadow, buttonStyle, textStyle, colorStyle } from 'styled-system';
var all = compose(space, typography, color, layout, flexbox, border, background, position, grid, shadow, buttonStyle, textStyle, colorStyle);
var regex = new RegExp("^(" + all.propNames.join('|') + ")$");
export var omit = function omit(props) {
  var next = {};

  for (var key in props) {
    if (regex.test(key)) continue;
    next[key] = props[key];
  }

  return next;
};
export var pick = function pick(props) {
  var next = {};

  for (var key in props) {
    if (!regex.test(key)) continue;
    next[key] = props[key];
  }

  return next;
};
