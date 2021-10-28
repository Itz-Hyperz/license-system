
//////////////////////////////////////////////////////////////////////
///  This is just an example of how to use the License System API  ///
//////////////////////////////////////////////////////////////////////

// Import Axios
const axios = require('axios')
let key = 'YOUR_LICENSE_KEY_HERE'; // Your license key goes here
let keyId = 5; // The Id given to you when a users license is created for them
licenseCheck(key, keyId)

async function licenseCheck(key, keyId) {

    // Initial Check
    let checkres = await axios({
        method: 'get', // Post Request
        url: `https://license.hyperz.net/api/${key}`, // Your domain with your license key at the end
        headers: {Accept: 'application/json, text/plain, */*','User-Agent': '*', 'productId': keyId } // The product Id given when the license key is created (keyId)
    });
    if(checkres.data.authorized) { // If Authorization is accepted
        console.log('License Key Accepted')
    } else { // If authorization is failed
        console.log('License Key Failed')
        process.exit(1) // Terminate the NodeJS Application
    }

    // Timed check to repeat ever hour
    setInterval(async () => {
        let checkres = await axios({
            method: 'get', // Post Request
            url: `https://license.hyperz.net/api/${key}`, // Your domain with your license key at the end
            headers: {Accept: 'application/json, text/plain, */*','User-Agent': '*', 'productId': keyId } // The product Id given when the license key is created
        });
        if(checkres.data.authorized) { // If Authorization is accepted
            console.log('License Key Accepted')
        } else { // If authorization is failed
            console.log('License Key Failed')
            process.exit(1) // Terminate the NodeJS Application
        }
    }, 3600000); // Every 1 hour

}

//////////////////////////////////////////////////////////////////////
///  This is just an example of how to use the License System API  ///
//////////////////////////////////////////////////////////////////////
