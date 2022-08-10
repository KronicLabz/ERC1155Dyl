"use strict";
(() => {
var exports = {};
exports.id = 438;
exports.ids = [438];
exports.modules = {

/***/ 325:
/***/ ((module) => {

module.exports = import("@thirdweb-dev/sdk");;

/***/ }),

/***/ 822:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ generateMintSignature)
/* harmony export */ });
/* harmony import */ var _thirdweb_dev_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(325);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_thirdweb_dev_sdk__WEBPACK_IMPORTED_MODULE_0__]);
_thirdweb_dev_sdk__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function generateMintSignature(req, res) {
    // De-construct body from request
    const { address  } = JSON.parse(req.body);
    // Get the Early Access NFT Edition Drop contract
    const polygonSDK = new _thirdweb_dev_sdk__WEBPACK_IMPORTED_MODULE_0__.ThirdwebSDK("polygon");
    const earlyAccessNfts = polygonSDK.getEditionDrop("0x3EC3141Aa4577b4Aa8273B15D5f0f6Fe1E1916A7");
    // Check to see if the wallet address has an early access NFT
    const numTokensInCollection = await earlyAccessNfts.getTotalCount();
    let userHasToken = false;
    // Check each token in the Edition Drop
    for(let i = 0; i < numTokensInCollection.toNumber(); i++){
        // See if they have the token
        const balance = await earlyAccessNfts.balanceOf(address, i);
        if (balance.toNumber() > 0) {
            userHasToken = true;
            break;
        }
    }
    // Now use the SDK on Goerli to get the signature drop
    const goerliSDK = _thirdweb_dev_sdk__WEBPACK_IMPORTED_MODULE_0__.ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "goerli");
    const signatureDrop = goerliSDK.getSignatureDrop("0x3EC3141Aa4577b4Aa8273B15D5f0f6Fe1E1916A7");
    // If the user has an early access NFT, generate a mint signature
    if (userHasToken) {
        const mintSignature = await signatureDrop.signature.generate({
            to: address,
            price: "0",
            mintStartTime: new Date(0)
        });
        res.status(200).json(mintSignature);
    } else {
        res.status(400).json({
            message: "User does not have an early access NFT"
        });
    }
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(822));
module.exports = __webpack_exports__;

})();