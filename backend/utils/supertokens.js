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
                override: {
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
    
                            // here we are only overriding the function that's responsible
                            // for signing in or signing up a user.
                            thirdPartySignInUp: async function (input) {
                                // TODO: some custom logic
                                console.log(input)
                                // or call the default behaviour as show below
                                return await originalImplementation.thirdPartySignInUp(input);
                            },
                            emailPasswordSignUp:async function(input){
                                console.log(input);
                                return await originalImplementation.emailPasswordSignUp(input);
                            }
                            // ...
                            // TODO: override more functions
                        }
                    }},
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

