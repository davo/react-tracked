"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSelector = void 0;

var _react = require("react");

var _Provider = require("./Provider");

var _utils = require("./utils");

var isFunction = function isFunction(f) {
  return typeof f === 'function';
};

var defaultEqualityFn = function defaultEqualityFn(a, b) {
  return a === b;
};

var useSelector = function useSelector(selector, eqlFn, opts) {
  var _ref = opts || !isFunction(eqlFn) && eqlFn || {},
      _ref$equalityFn = _ref.equalityFn,
      equalityFn = _ref$equalityFn === void 0 ? isFunction(eqlFn) ? eqlFn : defaultEqualityFn : _ref$equalityFn,
      _ref$customContext = _ref.customContext,
      customContext = _ref$customContext === void 0 ? _Provider.defaultContext : _ref$customContext;

  var forceUpdate = (0, _utils.useForceUpdate)();

  var _useContext = (0, _react.useContext)(customContext),
      state = _useContext.state,
      subscribe = _useContext.subscribe;

  var selected = selector(state);
  var ref = (0, _react.useRef)(null);
  (0, _utils.useIsomorphicLayoutEffect)(function () {
    ref.current = {
      equalityFn: equalityFn,
      selector: selector,
      state: state,
      selected: selected
    };
  });
  (0, _react.useEffect)(function () {
    var callback = function callback(nextState) {
      if (ref.current.state === nextState) return;
      var changed;

      try {
        changed = !ref.current.equalityFn(ref.current.selected, ref.current.selector(nextState));
      } catch (e) {
        changed = true; // stale props or some other reason
      }

      if (changed) {
        ref.current.state = nextState;
        forceUpdate();
      }
    };

    var unsubscribe = subscribe(callback); // force update in case the state is already changed

    forceUpdate();
    return unsubscribe;
  }, [subscribe, forceUpdate]);
  return selected;
};

exports.useSelector = useSelector;