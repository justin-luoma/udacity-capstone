const env = process.env.NODE_ENV;


const apiId = 'i65si6ec8c';
export const POST_API_ENDPOINT = env && env === 'development' ? "http://localhost:8080/api" : `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`;

export const IMAGE_API_ENDPOINT = "https://exkrmn2pt6.execute-api.us-east-1.amazonaws.com/dev";

export const authConfig = {
    domain: 'dev-sz67ap41.us.auth0.com',
    clientId: 'ITKpfwTGPrHyidIFIUIxmB0AhHLTQOZe',
    callbackUrl: env && env === 'development' ? 'http://localhost:3000/callback' : 'https://d46adv7k03c3k.cloudfront.net/callback',
    audience: "https://udacity.luoma.dev"
};

export const HEADERS = (token) => {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    }
};
