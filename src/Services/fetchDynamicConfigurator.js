export default function fetchDynamicConfigurator(type, isHttp) {
    let protocol = isHttp ? 'http://' : 'https://';
    let url = protocol + 'ecommapi.ecom-mobile-samsung.com/v2/getConfiguration?type=gs9-pwa';
    // let url = protocol + 'int-01-ue1-ecommapi-app.ecom.gin-dev.com/v2/getConfiguration?type=gs9-pwa';
    //let url = 'https://www.samsung.com/us/smg/content/samsung/content-library/prepurchase/configurator/us/star-configurator/configurator-products-512.json';
    return fetch(url, {mode:'cors'}).then(res =>  res.json());
}