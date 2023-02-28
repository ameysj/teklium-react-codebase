import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: process.env.React_App_POOL_ID,
    ClientId: process.env.React_App_CLIENT_ID
}

export default new CognitoUserPool(poolData);