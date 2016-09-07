(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/App.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Color converter, see 'https://github.com/Qix-/color' for Color manipulation library
var scssPalette = '',
    jsPalette = {},
    palette = [{ name: 'gg-gold', hex: '#ffb819', scss: '' }, { name: 'gg-blue', hex: '#00a7cf', scss: '' }, { name: 'gg-green', hex: '#00c4b4', scss: '' }, { name: 'gg-red', hex: '#ff5a34', scss: '' }, { name: 'gg-gold', hex: '#ffb819', scss: '' }, { name: 'gg-purple', hex: '#555387', scss: '' }];

palette.map(function (color, index) {
  var currentColor = (0, _color2.default)(color.hex),
      currentColorRgb = currentColor.values.rgb,
      currentColorLight1 = currentColor.clone().lighten(0.05),
      currentColorLight2 = currentColor.clone().lighten(0.10),
      currentColorLight3 = currentColor.clone().lighten(0.15),
      currentColorLight4 = currentColor.clone().lighten(0.30),
      currentColorDark1 = currentColor.clone().darken(0.05),
      currentColorDark2 = currentColor.clone().darken(0.10),
      currentColorDark3 = currentColor.clone().darken(0.15),
      currentColorDark4 = currentColor.clone().darken(0.30);

  // Assemble .scss code for each color and all its variations
  color.scss += '// "' + color.name + '" with variations\n';
  color.scss += '$' + color.name + ': ' + color.hex + ';\n';
  color.scss += '$' + color.name + '-light-1: mix(white, $' + color.name + ', 5%);\n';
  color.scss += '$' + color.name + '-light-2: mix(white, $' + color.name + ', 10%);\n';
  color.scss += '$' + color.name + '-light-3: mix(white, $' + color.name + ', 15%);\n';
  color.scss += '$' + color.name + '-light-4: mix(white, $' + color.name + ', 30%);\n';
  color.scss += '$' + color.name + '-dark-1: mix(black, $' + color.name + ', 5%);\n';
  color.scss += '$' + color.name + '-dark-2: mix(black, $' + color.name + ', 10%);\n';
  color.scss += '$' + color.name + '-dark-3: mix(black, $' + color.name + ', 15%);\n';
  color.scss += '$' + color.name + '-dark-4: mix(black, $' + color.name + ', 30%);\n\n';

  // Assemble .js code for each color and all its variations
  jsPalette[color.name] = {};
  jsPalette[color.name].color = 'rgb(' + currentColorRgb + ')';
  jsPalette[color.name].colorLight1 = 'rgb(' + currentColorLight1.values.rgb + ')';
  jsPalette[color.name].colorLight2 = 'rgb(' + currentColorLight2.values.rgb + ')';
  jsPalette[color.name].colorLight3 = 'rgb(' + currentColorLight3.values.rgb + ')';
  jsPalette[color.name].colorLight4 = 'rgb(' + currentColorLight4.values.rgb + ')';
  jsPalette[color.name].colorDark1 = 'rgb(' + currentColorDark1.values.rgb + ')';
  jsPalette[color.name].colorDark2 = 'rgb(' + currentColorDark2.values.rgb + ')';
  jsPalette[color.name].colorDark3 = 'rgb(' + currentColorDark3.values.rgb + ')';
  jsPalette[color.name].colorDark4 = 'rgb(' + currentColorDark4.values.rgb + ')';

  // Add this color to Scss palette
  scssPalette += color.scss;
});

// View scssPalette string, for copying into .scss source code
console.log(scssPalette);

// View jsPalette object, for copying into .js source code
console.log(jsPalette);

// React app

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'content' },
        _react2.default.createElement(
          'h1',
          null,
          ' '
        ),
        _react2.default.createElement(
          'h2',
          null,
          'Welcome!'
        ),
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              { href: 'http://brunch.io' },
              'Brunch homepage'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              { href: 'https://facebook.github.io/react/' },
              'React.js homepage'
            )
          )
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;
});

;require.register("initialize.js", function(exports, require, module) {
'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _App = require('components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  _reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.querySelector('#app'));
});
});

require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map