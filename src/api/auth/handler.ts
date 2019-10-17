import dotenv from 'dotenv';
import express, { Response, Request } from 'express';
import passport from 'passport'
import session from 'express-session';
import { create } from 'simple-oauth2';
import { OIDCStrategy } from 'passport-azure-ad';
import cookieParser from 'cookie-parser';
import { createServer, proxy } from 'aws-serverless-express';
import flash from 'connect-flash';
import { SUCCESS_PAGE } from './success';

dotenv.config();

// Configure simple-oauth2
const oauth2 = create({
  client: {
    id: process.env.OAUTH_APP_ID as string,
    secret: process.env.OAUTH_APP_PASSWORD as string,
  },
  auth: {
    tokenHost: process.env.OAUTH_AUTHORITY as string,
    authorizePath: process.env.OAUTH_AUTHORIZE_ENDPOINT,
    tokenPath: process.env.OAUTH_TOKEN_ENDPOINT
  }
});

// Configure passport

// In-memory storage of logged-in users
// For demo purposes only, production apps should store
// this in a reliable storage
var users: any = {};

// Passport calls serializeUser and deserializeUser to
// manage users
passport.serializeUser(function(user: any, done) {
  // Use the OID property of the user as a key
  users[user.profile.oid] = user;
  done (null, user.profile.oid);
});

passport.deserializeUser(function(id: string, done) {
  done(null, users[id]);
});

// Callback function called once the sign-in is complete
// and an access token has been obtained
async function signInComplete(_iss: any, _sub: any, profile: any, _accessToken: any, _refreshToken: any, params: any, done: any) {
  if (!profile.oid) {
    return done(new Error("No OID found in user profile."), null);
  }

  // try{
  //   const user = await graph.getUserDetails(accessToken);

  //   if (user) {
  //     // Add properties to profile
  //     profile['email'] = user.mail ? user.mail : user.userPrincipalName;
  //   }
  // } catch (err) {
  //   done(err, null);
  // }

  // Create a simple-oauth2 token from raw tokens
  let oauthToken = oauth2.accessToken.create(params);

  // Save the profile and tokens in user storage
  users[profile.oid] = { profile, oauthToken };
  return done(null, users[profile.oid]);
}

// Configure OIDC strategy
passport.use(new OIDCStrategy(
  {
    identityMetadata: `${process.env.OAUTH_AUTHORITY}${process.env.OAUTH_ID_METADATA}`,
    clientID: process.env.OAUTH_APP_ID as string,
    responseType: 'code id_token',
    responseMode: 'form_post',
    redirectUrl: process.env.OAUTH_REDIRECT_URI as string,
    allowHttpForRedirectUrl: true,
    clientSecret: process.env.OAUTH_APP_PASSWORD,
    validateIssuer: false,
    passReqToCallback: true,
    scope: JSON.parse(process.env.OAUTH_SCOPES as string,)
  },
  signInComplete
));

var app = express();

// app.use(eventContext());


// Session middleware
// NOTE: Uses default in-memory session store, which is not
// suitable for production
app.use(session({
  secret: 'your_secret_value_here',
  resave: false,
  saveUninitialized: false,
  unset: 'destroy'
}));

// Flash middleware
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/test', (_req: Request, res: Response) => {
  res.json({});
});
app.get('/fail', (_req: Request, res: Response) => {
  res.send('you failed.');
});

const router = express.Router();

/* GET auth callback. */
router.get('/signin', (req, res: Response, next) => {
  passport.authenticate('azuread-openidconnect',
    {
      response: res,
      prompt: 'login',
      failureRedirect: '/fail',
      failureFlash: true
    } as any
  )(req,res,next);
}, (_req, res) => {
  console.log('redirect');
  res.redirect('/');
});

router.post('/callback', (req, res, next) => {
  console.log('post');
  passport.authenticate('azuread-openidconnect',
    {
      response: res,
      failureRedirect: '/fail',
      failureFlash: true
    } as any
  )(req,res,next);
}, (_req, res) => {
  console.log('callback');
  res.redirect('/');
});

router.get('/signout', (req: Request, res) => {
  console.log('signout');
  if (req.session) {
    req.session.destroy((_err) => {
      req.logout();
      res.redirect('/');
    });
  }
});

router.get('/success', (req: Request, res) => {
  console.log('success');
  res.set('Content-Type', 'text/html');
  res.send(SUCCESS_PAGE);
});

app.use('/auth', router);


const server = createServer(app)


export const handler = (event, context) => { 
  console.log(event);
  proxy(server, event, context)
};
