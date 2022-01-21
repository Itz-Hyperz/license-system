const _config = {

    // Client Settings (REQUIRED)
    prefix: "license!", // The prefix to run all commands inside of the bot
    token: "YOUR_BOT_TOKEN", // The token from your Discord Dev Portal
    aboutServer: "A complex yet easy to use License System created by [@Hyperz](https://hyperz.net/discord)!", // This is a description of your server
    date_format: "MM-DD-YYYY HH:mm", // The date format for the bot
    copyright: "© 2021 Your Name", // The footer for most embeds
    deleteCommands: true, // This will decide whether or not to delete commands when they are ran.

    // Application Settings (REQUIRED)
    themeColor: "blue", // The theme color for the main logger (blue, red, green, yellow, magenta)
    port: "8080", // The port for the bot to listen on
    debugmode: true, // Toggles the logging of errors and excess information
    logCommandLoading: false, // Toggles the logging of commands being loaded

    // Presence Settings (REQUIRED)
    presence: [
        {name: "HD-Client", type: "PLAYING", status: "dnd"}, // The bot will cycle through these
        {name: "This Server", type: "WATCHING", status: "dnd"}, // The bot will cycle through these
        {name: "Jellys Music", type: "LISTENING", status: "dnd"} // The bot will cycle through these
    ],

    // MySQL Settings (REQUIRED)
    database: {
        host: "localhost", // The IP of your SQL Server
        user: "root", // The username for your SQL Server
        password: "", // The password for of the user for your SQL Server
        database: "licensesystem" // The database designated for the bot
    },

    // API Settings (REQUIRED)
    api: {
        port: "3000", // The NGINX port for the API to listen on
        logActions: false, // Log when a request is made
        newLicenseSecret: "somesecretlol" // The secret used to create a new license (/addLicense)
    },

    // Permission Settings (REQUIRED)
    permissions: {
        managers: ['704094587836301392'] // A list of User Ids that can add & remove licenses to the system
    },

    command_count: 8, // DONT TOUCH
    event_count: 3 // DONT TOUCH
}

module.exports = _config
