"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888,195];
exports.modules = {

/***/ 502:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "react-icons/fa"
var fa_ = __webpack_require__(290);
;// CONCATENATED MODULE: ./src/components/Nav.js



function Nav() {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "navbar fixed w-full flex md:flex-col px-4 md:px-6 py-4 md:py-8 md:pb-10 z-30 bg-gradient-to-b from-sidebarTintStart to-sidebarTintEnd text-primary md:h-full items-center justify-between md:static md:w-auto md:max-h-screen md:justify-between",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: "/",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: "text-5xl md:text-7xl cursor-pointer font-extrabold tracking-tight text-berkeleyBlue",
                            children: "ADRS"
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "md:flex md:flex-col gap-5 hidden mt-6 md:mt-10",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/blog",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    className: "text-2xl md:text-3xl font-semibold leading-none opacity-90 hover:opacity-100",
                                    children: "Blog"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/about",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    className: "text-2xl md:text-3xl font-semibold leading-none opacity-90 hover:opacity-100",
                                    children: "About"
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "hidden md:flex items-center gap-4 text-2xl",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "mailto:ucbskyadrs@gmail.com",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        "aria-label": "Email",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(fa_.FaEnvelope, {})
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "https://x.com/ai4research_ucb",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        "aria-label": "Twitter",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(fa_.FaTwitter, {})
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "https://discord.gg/4z7Yy3e4",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        "aria-label": "Discord",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(fa_.FaDiscord, {})
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "https://join.slack.com/t/adrs-global/shared_invite/zt-3fgme22n5-PKYyAc9aIeTyX5iSQTKIoA",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        "aria-label": "Slack",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(fa_.FaSlack, {})
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "https://github.com/UCB-ADRS/ADRS",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        "aria-label": "GitHub",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(fa_.FaGithub, {})
                    })
                ]
            })
        ]
    });
};

;// CONCATENATED MODULE: ./src/pages/_app.js



function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "w-screen full-container flex flex-col md:flex-row",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "md:basis-1/5",
                children: /*#__PURE__*/ jsx_runtime_.jsx(Nav, {})
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                id: "content",
                className: "md:overflow-y-scroll md:max-h-screen text-primary grow md:grow-0 md:basis-4/5 flex flex-col bg-white md:border-l md:border-neutral-200 md:shadow-lg",
                children: /*#__PURE__*/ jsx_runtime_.jsx("main", {
                    className: "max-w-5xl w-full mx-auto px-6 py-8",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                        ...pageProps
                    })
                })
            })
        ]
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 14:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 20:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 52:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 422:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 290:
/***/ ((module) => {

module.exports = require("react-icons/fa");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [505,664], () => (__webpack_exec__(502)));
module.exports = __webpack_exports__;

})();