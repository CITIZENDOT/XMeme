# XMeme Frontend

## Development

- Install necessary packages with `yarn install`
- Start Development Server with `yarn start`

## Production

- Change the `REACT_APP_SERVER_URL` variable in [.env](./.env) file to Publicly Deployed Backend URL.
- Build the static files with `yarn build`
- Copy [\_redirects](./_redirects) file to `build` folder (Specific to netlify deployement).
- Deploy with `netlify deploy --dir=build --prod`
