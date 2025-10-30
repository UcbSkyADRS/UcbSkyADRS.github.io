"use strict";
exports.id = 846;
exports.ids = [846];
exports.modules = {

/***/ 846:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Blog)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function Blog() {
    const posts = [
        {
            title: "Automating Algorithm Discovery: A Case Study in Spot Instance Scheduling",
            author: "ADRS Team",
            date: "October 30, 2025",
            excerpt: "This post is the second in our AI-Driven Research Systems (ADRS) series, where we apply AI to optimize complex system problems. Here, we tackle spot instance scheduling, a classic cost-versus-reliability problem in the cloud. Specifically, we demonstrate how OpenEvolve discovers novel algorithms that surpass the algorithm from an NSDI'24 Best Paper, achieving up to 16% and 48% cost savings in a single and multi-region setups, respectively.",
            image: "/spot.png",
            url: "https://adrs-ucb.notion.site/spot-instance-scheduling"
        },
        {
            title: "Automating Algorithm Discovery: A Case Study in MoE Load Balancing",
            author: "ADRS Team",
            date: "October 23, 2025",
            excerpt: "This post is the first in a series of case studies in which we apply AI-Driven Research for Systems (ADRS) to optimize performance in various systems. In this blog, we discuss the optimization of a key component in large language model (LLM) inference. Specifically, we demonstrate how OpenEvolve independently discovers and surpasses highly optimized algorithms engineered by human experts to achieve a 5.0x speedup.",
            image: "/moe.png",
            url: "https://adrs-ucb.notion.site/moe-load-balancing"
        },
        {
            title: "Barbarians at The Gate: How AI is Upending Systems Research",
            author: "ADRS Team",
            date: "October 17, 2025",
            excerpt: 'AI is no longer just tuning systems as a "black box." It\'s now rewriting their core algorithms by treating the system as a "white box" and discovering solutions that can outperform human experts. This new approach, which we term AI-Driven Research for Systems (ADRS), can automate some of the most tedious parts of reseach.',
            image: "/image1.png",
            url: "https://adrs-ucb.notion.site/"
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
        className: "space-y-8",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                        className: "text-4xl md:text-6xl font-extrabold tracking-tight text-berkeleyBlue",
                        children: "Blog Series"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-xl md:text-2xl text-primary/80",
                        children: "Insights and case studies from AI-Driven Research Systems (ADRS)."
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "space-y-8",
                children: posts.map((post, idx)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        href: post.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow no-underline",
                        "aria-label": `Read ${post.title} on Notion`,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "bg-white md:flex md:items-stretch",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "md:basis-5/12 bg-white flex items-center justify-center p-4 md:p-5",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: post.image,
                                        alt: post.title,
                                        className: "w-full h-56 md:h-64 object-contain"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "md:basis-7/12 bg-berkeleyBlue text-white p-6 md:p-8",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                            className: "text-3xl md:text-4xl font-bold leading-tight",
                                            children: post.title
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "mt-2 text-white/80 text-sm md:text-base border-b border-white/20 pb-3",
                                            children: [
                                                "by: ",
                                                post.author,
                                                ", ",
                                                post.date
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "mt-4 text-white/90 text-base md:text-lg",
                                            children: post.excerpt
                                        })
                                    ]
                                })
                            ]
                        })
                    }, idx)
                )
            })
        ]
    });
};


/***/ })

};
;