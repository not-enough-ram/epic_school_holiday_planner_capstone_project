import { get } from '@styled-system/core';
export var themeGet = function themeGet(path, fallback) {
  if (fallback === void 0) {
    fallback = null;
  }

  return function (props) {
    return get(props.theme, path, fallback);
  };
};
export default themeGet;
