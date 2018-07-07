// import productInfo from '../productCategory';
// import { deviceAdapter, isPwaApp as isPwaAppHelper, getCookie } from '../helpers';
// import { getQueryParams } from '../actions';

// type ConfiguratorStatus = {
//   configuratorGroupid: ?String,
//   orderedSteps: Array<String>,
//   stepsCompleted: Number,
// };
// const isPwaApp = isPwaAppHelper({ queryParams: getQueryParams() });
// export function getSKUDetails(
//     data : Array<String>,
//     callback: String,
//     skus: Array<String>,
//     devValues: ?Array<Object>,
// ) {
//     if (data !== undefined) {
//         window[callback](JSON.stringify(data));
//     } else {
//         window[callback](JSON.stringify(productInfo));
//     }
//     if (isPwaApp) {
//         if (skus[0] !== undefined) {
//             deviceAdapter('getSKUDetails', [skus, callback], isPwaApp);
//         } else {
//             window[callback](JSON.stringify(productInfo));
//         }
//     }
// }
// export function addToWishlist(skus: Array<String>, callback: String) {
//     // if (window.EcommAndroidClient && typeof window.EcommAndroidClient.addToWishlist !== 'undefined') {
//     //   return window.EcommAndroidClient.addToWishlist(skus);
//     // }
//     if (
//         window.EcommAndroidClient &&
//     typeof window.EcommAndroidClient.addToWishlist !== 'undefined'
//     ) {
//         const params = [skus];
//         return deviceAdapter('addToWishlist', [...params]);
//     } else if (
//         typeof window.webkit !== 'undefined' &&
//     typeof window.webkit.messageHandlers !== 'undefined'
//     ) {
//         deviceAdapter('addToWishlist', { data: skus, callback });
//     }
// }

// export function addToCartPwa(params) {
//     console.log('params', params);
//     let query = '';
//     if (params.targetPayload[0].children) {
//         const child = params.targetPayload[0].children;
//         let i = 0,
//             children = child.length;
//         for (; i < children;) {
//             query += `&addChildItem[]=${child[i]}`;
//             i++;
//         }
//     }
//     const payload = params.targetPayload;
//     var i = 1,
//         payloadLength = payload.length;
//     for (; i < payloadLength;) {
//         query += `&addItem[]=${payload[i].parent}`;
//         i++;
//     }
//     if (params.promocode) {
//         query += `&promocode=${params.promocode}`;
//     }
//     if (params.paymentPlanId) {
//         query += `&paymentPlanId=${params.paymentPlanId}`;
//     }
//     window.location.href = `https://www.samsung.com/us/m/checkout/cart?addItem[]=${params.targetPayload[0].parent}${query}`;
// }
// export function showToast(message) {
//     if (window.EcommAndroidClient) {
//         window.EcommAndroidClient.showToast(message);
//     }
// }

// export function getSiteId() {
//     if (window.EcommAndroidClient) {
//         window.EcommAndroidClient.getToken(false);
//     } else if (getCookie('tppid')) {
//         window.receiveSiteId(getCookie('tppid'));
//     } else {
//         window.receiveSiteId(null);
//     }
// }

// export function getResidualTradeInInfo(callback) {
//     try {
//         if (
//             window.EcommAndroidClient &&
//       window.EcommAndroidClient.getResidualTradeInInfo
//         ) {
//             const residualValue = window.EcommAndroidClient.getResidualTradeInInfo();
//             return JSON.parse(residualValue);
//         }
//     } catch (e) {
//         return null;
//     }
//     return null;
// }

// export function setConfiguratorStatus(status: ConfiguratorStatus) {
//     // if (window.EcommAndroidClient) {
//     //   const statusString = JSON.stringify(status);
//     //   window.EcommAndroidClient.setConfiguratorStatus(statusString);
//     // }
//     const statusString = [JSON.stringify(status)];
//     deviceAdapter('setConfiguratorStatus', [...statusString]);
// }

// export function showSpinner() {
//     // if (
//     //   (window & window.EcommAndroidClient &&
//     //     typeof window.EcommAndroidClient.showSpinner !== 'undefined') ||
//     //   window.webkit !== 'undefined'
//     // ) {
//     //   deviceAdapter('showSpinner');
//     // } else if (isPwaApp) {
//     //   deviceAdapter('showSpinner', [{}, {}], isPwaApp);
//     // }
//     // console.log("spinner called")
//     // renderLoader(true);
// }

// export function addCompositeToCart(items: String, old: Boolean) {
//     // if (window.EcommAndroidClient && typeof window.EcommAndroidClient.addCompositeToCart2 !== 'undefined' ) {
//     //   window.EcommAndroidClient.addCompositeToCart2(items);
//     //   if (typeof window.EcommAndroidClient.showSpinner !== 'undefined') {
//     //     window.EcommAndroidClient.showSpinner()
//     //   }
//     // }
//     console.log(items, +'items');
//     const params = [items];
//     deviceAdapter('addCompositeToCart2', [...params]);
//     if (
//         (window & window.EcommAndroidClient &&
//       typeof window.EcommAndroidClient.showSpinner !== 'undefined') ||
//     window.webkit !== 'undefined'
//     ) {
//         deviceAdapter('showSpinner');
//     } else if (isPwaApp) {
//         deviceAdapter('showSpinner', [{}, {}], isPwaApp);
//     }
// }

// export function hideSpinner() {
//     // deviceAdapter('hideSpinner');
//     // if (isPwaApp) {
//     //   deviceAdapter('hideSpinner', [{}, {}], isPwaApp);
//     // }
//     // renderLoader(false);
// }

// export function hide() {
//     // if (window.EcommAndroidClient) {
//     //   window.EcommAndroidClient.hide();
//     // }
//     deviceAdapter('hide');
// }

// export function close() {
//     deviceAdapter('close');
// }

// export function goBack() {
//     deviceAdapter('goBack');
// }

// export function showCart(bool) {
//     // if (window.EcommAndroidClient) {
//     //   window.EcommAndroidClient.showCart(!!bool);
//     // }
//     const params = [!!bool];
//     deviceAdapter('showCart', [...params]);
// }

// export function addPromoCode(promoCode) {
//     if (promoCode) {
//         const params = [promoCode];
//         deviceAdapter('addPromoCode', [...params]);
//     }
// }

// export function isInStore(devValue) {
//     if (window.EcommAndroidClient) {
//         const inStore = window.EcommAndroidClient.isInstoreMode();
//         return inStore;
//     }
//     return !!devValue;
// }

// export function configureBack(exit, confirm, hide, callback) {
//     if (window.EcommAndroidClient) {
//         if (typeof window.EcommAndroidClient.configureBackV2 !== 'undefined') {
//             window.EcommAndroidClient.configureBackV2(exit, confirm, hide, callback);
//         } else if (typeof window.EcommAndroidClient.configureBack !== 'undefined') {
//             window.EcommAndroidClient.configureBack(exit, confirm);
//         }
//     }
// }

// export const openUrl = (url) => {
//     window.location.href = url;
// };

// export const openExternalUrl = (url) => {
//     window.location.href = url;
// };

// export function launchCarrierFinancingFlow(items: String) {
//     const params = [items];
//     deviceAdapter('launchCarrierFinancingFlow', [...params]);
// }

// export function setUserPreference(key, value) {
//     deviceAdapter('setUserPreference', [key, value]);
// }
