import {makeClient} from "@spree/storefront-api-v2-sdk";
// When using the SDK in a <script> tag or as part of a Webpack bundle
// targeted for the browser, instead use:
// import { makeClient } from '@spree/storefront-api-v2-sdk/dist/client'

const client = makeClient({
    host: "http://192.168.8.88:3001",
});


export default client;