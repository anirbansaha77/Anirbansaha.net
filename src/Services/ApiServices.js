// const RADON_PARTNER_ID = 'quuwym9g4ul1lfecdi';
// const RADON_URL = 'radon.ecom-mobile-samsung.com';
// const FINANCE_PLAN_URL = 'qa3-publicgw-120145154.us-west-2.elb.amazonaws.com';
// const APP_SECRET = 'FiDBnIkqdOrcbdlacaddgngFafeFhNdk';
// const APP_ID = 'shopping-carts-v3';
// // const REWARDS_SERVICE = "https://int-01-ue1-referral-service-app.ecom.gin-dev.com";
// // "https://referral-service.ecom-mobile-samsung.com";
// // const PWA_PRODUCT_DETAILS = 'https://qa3-ecom.seasam.org';
// const PWA_PRODUCT_DETAILS = 'https://www.samsung.com';


// export function fetchAccessoryPrice(sku, accessories, siteId) {
//     const accessoryList = [];
//     const payload = {};
//     payload.params = {};
//     payload.params.line_items = [];
//     payload.params.siteId = siteId || 0;
//     const paramObject = {};

//     for (let k = 0; k < accessories.length; k++) {
//         const accessoryObject = {};
//         accessoryObject.sku_id = accessories[k];
//         accessoryList.push(accessoryObject);
//         paramObject.line_items = accessoryList;
//     }

//     paramObject.sku_id = sku;
//     payload.params.line_items.push(paramObject);

//     return fetch(`https://${RADON_URL}/v1/carts/getCartPrice`, {
//         method: 'POST',
//         body: JSON.stringify(payload),
//         headers: {
//             'x-radon-partner-id': RADON_PARTNER_ID,
//             'x-radon-timestamp': Date.now(),
//             'content-type': 'application/json',
//         },
//     });
// }

// export function fetchDynamicConfigurator(type, isHttp) {
//     // const protocol = isHttp ? 'http://' : 'https://';
//     // let url =
//     // protocol +
//     // 'int-01-ue1-ecommapi-app.ecom.gin-dev.com/v2/getConfiguration?type=gs9';
//     // let url = protocol + 'ecommapi.ecom-mobile-samsung.com/v2/getConfiguration?type=gs9';

//     const url = 'https://s3.amazonaws.com/ecom-mobile/v3/s9Configurator-pwa.json';
//     // if (process && process.env && process.env.NODE_ENV && process.env.NODE_ENV === "development") {
//     // url = "http://int-01-ue1-ecommapi-app.ecom.gin-dev.com/v2/getConfiguration?type=gs9";
//     // }
//     return fetch(url);
// }

// export function fetchPricing(skus, isHttp, siteId) {
//     const protocol = isHttp ? 'http://' : 'https://';
//     const url =
//     `${protocol
//     }ecommapi.ecom-mobile-samsung.com/v3/getPricing?siteId=${
//         siteId || 0}`;
//     const payload = {
//         params: {
//             skus: [...skus],
//         },
//     };
//     return fetch(url, {
//         method: 'POST',
//         body: JSON.stringify(payload),
//         headers: {
//             'content-type': 'application/json',
//         },
//     });
// }

// export function fetchFinancePlan(sku, appId) {
//     const payload = {
//         filter_current_finance_plans: true,
//         skus: [sku],
//     };

//     return fetch(
//         `http://${FINANCE_PLAN_URL}/v1/price-engine/finance-plans/_search`,
//         {
//             method: 'POST',
//             body: JSON.stringify(payload),
//             headers: {
//                 'x-ecom-app-secret': APP_SECRET,
//                 'x-ecom-app-id': APP_ID,
//                 'content-type': 'application/json',
//             },
//         },
//     );
// }

// export function fetchRefereeCoupon(params, REWARDS_SERVICE) {
//     let url = `${REWARDS_SERVICE}/v1/getRefereeCoupon`;
//     if (params) {
//         url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(params);
//     }
//     return fetch(url);
// }

// export function fetchProductDetails(skus) {
//     const url = `${PWA_PRODUCT_DETAILS}/us/m/internal/products?skus=${skus}`;
//     // let url = `http://int-01-ue1-ecommapi-app.ecom.gin-dev.com/v2/productDetails?product-id=${skus}`
//     return fetch(url);
// }

// function queryParams(params) {
//     if (!params) {
//         return '';
//     }
//     return Object.keys(params)
//         .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
//         .join('&');
// }
