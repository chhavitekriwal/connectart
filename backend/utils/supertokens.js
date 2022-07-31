const supertokens = require('supertokens-node');
const { express } = require('supertokens-node/lib/build/framework');
const Session = require('supertokens-node/recipe/session');
const thirdPartyEmailPassword = require('supertokens-node/recipe/thirdpartyemailpassword');

const User = require('../models/user');

const initSupertokens = () => {
    supertokens.init({
        framework: "express",
        supertokens: {
            connectionURI: process.env.SUPERTOKENS_URI,
            apiKey: process.env.SUPERTOKENS_API_KEY
        },
        appInfo: {
            appName: "connectart",
            apiDomain: process.env.BACKEND_URL,
            websiteDomain: process.env.FRONTEND_URL,
            apiBasePath: "/auth",
            websiteBasePath: "/auth"
        },
        
        recipeList:[
            thirdPartyEmailPassword.init({
                override: {
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            thirdPartySignInUp: async function (input) {
                                console.log(input);
                                return await originalImplementation.thirdPartySignInUp(input);
                            },
                            emailPasswordSignUp:async function(input){
                                console.log(input);
                                return await originalImplementation.emailPasswordSignUp(input);
                            }
                        }
                    }},
                providers: [
                    thirdPartyEmailPassword.Google({
                        clientId: process.env.GOOGLE_CLIENT_ID,
                        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    })
                ]
            }),
            Session.init(),
        ]
    })
    console.log("Supertokens connected");
};

module.exports = initSupertokens;

