# webpack-express-hmr-fullstack
### Hot module reload to with gulp

# development environment
1. express
2. webpack
3. gulp

# Directory structure
```
┬ bin ─ server.js // server runner
├ public // compliled files
├ routes // routing modules
├ src // original files
├ views // view files ( extension: ejs )
└ app.js // express server
```

# How to start project
```
// install modules
$ npm install

// run development mode
$ npm run dev

// run product mode
$ npm start

// run with pm2
$ npm install -g pm2
$ pm2 start pm2.config.js
```

# env settings
|  filename  | product use | development use |
|------------|-------------|-----------------|
| public.env |      √      |        √        |
| prod.env   |      √      |                 |
| dev.env    |             |        √        |
