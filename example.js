
//////////////////////////////////////////////////////////////////////
///  This is just an example of how to use the License System API  ///
//////////////////////////////////////////////////////////////////////

// Import Axios
const axios = require('axios')

// Data for checking licenses
let key = 'YOUR_LICENSE_KEY_HERE'; // Your license key goes here
let keyId = 5; // The Id given to you when a users license is created for them
licenseCheck(key, keyId);

// Data for creating a license
addLicense("704094587836301392"); // The owner Id you are registering the license to (Discord Account Id)

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

async function addLicense(ownerId) {
    let newLicense = await axios({
        method: 'get',
        url: "http://localhost:3000/addLicense",
        headers: {Accept: 'application/json, text/plain, */*','User-Agent': '*', 'secret': 'somesecretlol', 'ownerid': ownerId }
    });
    if(!newLicense.data.error) { // If no error is found
        console.log(`New license created: `, newLicense.data.licenseInfo) // Log the new license information (JSON Object)
    } else { // If an error is found
        console.log(`License Add Error: `, newLicense.data.reason) // Log the error
    }
}

//////////////////////////////////////////////////////////////////////
///  This is just an example of how to use the License System API  ///
//////////////////////////////////////////////////////////////////////
