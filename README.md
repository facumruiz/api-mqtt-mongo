# mern-stack-example
Mern Stack code for the [Mern Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial)

[![CI](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml/badge.svg)](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml)

## How To Run
Create the file `mern/server/.env` with your Atlas URI and the server port:
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/<dbname>?retryWrites=true&w=majority

PORT=5050

JWT_SECRET=<your_jwt_secret>

EMAIL_USER=<your_email>
EMAIL_PASS=<your_email_password>
FRONT_URL=<your_front_url>
BACKEND_URL=<your_backend_url>
```

Start server:
```
cd mern/server
npm install
npm start
```

Start Web server
```
cd mern/client
npm install
npm run dev
```

## Disclaimer

Use at your own risk; not a supported MongoDB product
