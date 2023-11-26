"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var dotenv = _interopRequireWildcard(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _connectdb = _interopRequireDefault(require("./config/connectdb"));
var _api = _interopRequireDefault(require("./routers/api"));
var _schedulePromotions = _interopRequireDefault(require("./controllers/schedulePromotions"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
dotenv.config();
_schedulePromotions.default.start();
const app = (0, _express.default)();
app.use((0, _cors.default)({
  credentials: true,
  origin: true
}));
const port = process.env.PORT || 6969;
app.use(_bodyParser.default.json({
  limit: '50mb'
}));
app.use(_bodyParser.default.urlencoded({
  limit: '50mb',
  extended: true
}));

// setup router

(0, _api.default)(app);
(0, _connectdb.default)();
app.listen(port, () => {
  return console.log('server running on port: ', port);
});