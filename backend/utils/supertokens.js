const supertokens = require('supertokens-node');
const { express } = require('supertokens-node/lib/build/framework');
const Session = require('supertokens-node/recipe/session');
const thirdPartyEmailPassword = require('supertokens-node/recipe/thirdpartyemailpassword');

const initSupertokens = () => {
    supertokens.init({
        framework: "express",
        supertokens: {
            connectionURI: process.env.SUPERTOKENS_URI,
            apiKey: process.env.SUPERTOKENS_APIKEY
        },
        appInfo: {
            appName: "connectart",
            apiDomain: process.env.BACKEND_URL,
            websiteDomain: process.env.FRONTEND_URL,
            apiBasePath: "/api",
            websiteBasePath: "/auth"
        },
        recipeList:[
            thirdPartyEmailPassword.init({
                providers: [
                    thirdPartyEmailPassword.Google({
                        clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                        clientSecret: "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",
                    })
                ]
            }),
            Session.init(),
        ]
    })
    console.log("Supertokens connected");
};

module.exports = initSupertokens;

