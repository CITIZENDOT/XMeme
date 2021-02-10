# XMeme Frontend

## Development
* Install necessary packages with `yarn install`
* Start Development Server with  `yarn start`

## Production 
* Change the `REACT_APP_SERVER_URL` variable in [.env](./.env) file to Publicly Deployed Backend URL.
* Build the static files with `yarn build`
* Create a new file with name `_redirects` to [build](./build) folder which is generated with above command.
* Contents of the file should be as below.
    ```bash
    /*    /index.html   200
    ```
    * Note that this is specific to [Netlify](https://www.netlify.com/) deployement.
* Deploy with `netlify deploy --dir=build --prod`
