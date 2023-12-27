import { auth } from "express-oauth2-jwt-bearer";

const checkJwt = auth({
  audience: "{https://bookstore-api/}", // e.g. https://book-store-api
  issuerBaseURL: `https://dev-5olwimhwpl8bxpjy.us.auth0.com/`,
});

export default checkJwt;
