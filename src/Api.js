import WooCommerceAPI from 'woocommerce-api';
const WooCommerce  = new WooCommerceAPI({
  url: 'http://veronica.codingkloud.com', // Your store URL
  consumerKey: 'ck_03e83242fdcbb62a01daebe9c4817741f4c18a36', // Your consumer secret
  consumerSecret: 'cs_069ce05d83a89152f983fcdd2d4460c213256009', // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v1' // WooCommerce WP REST API version
  
});
export const WooCommerceV3  = new WooCommerceAPI({
  url: 'http://veronica.codingkloud.com', // Your store URL
  consumerKey: 'ck_03e83242fdcbb62a01daebe9c4817741f4c18a36', // Your consumer secret
  consumerSecret: 'cs_069ce05d83a89152f983fcdd2d4460c213256009', // Your consumer secret
  //verifySsl: false,
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3', // WooCommerce WP REST API version
  //wpAPIPrefix: 'wp-json'
  
});
// const WooCommerce  = new WooCommerceAPI({
//   url: 'http://sunilwoostore.000webhostapp.com', // Your store URL
//   consumerKey: 'ck_eb46f07f1826d6e0b36407e2d3b6deae2b1bfe8a', // Your consumer secret
//   consumerSecret: 'cs_cdc62b2e96fbdfa06d56efdbb645063b71281f0d', // Your consumer secret
//   wpAPI: true, // Enable the WP REST API integration
//   version: 'wc/v1' // WooCommerce WP REST API version
  
// });
// export const WooCommerceV3  = new WooCommerceAPI({
//   url: 'http://sunilwoostore.000webhostapp.com', // Your store URL
//   consumerKey: 'ck_eb46f07f1826d6e0b36407e2d3b6deae2b1bfe8a', // Your consumer secret
//   consumerSecret: 'cs_cdc62b2e96fbdfa06d56efdbb645063b71281f0d', // Your consumer secret
//   //verifySsl: false,
//   wpAPI: true, // Enable the WP REST API integration
//   version: 'wc/v3', // WooCommerce WP REST API version
//   //wpAPIPrefix: 'wp-json'
  
// });

export default WooCommerce;
 