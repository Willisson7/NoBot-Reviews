const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// requiring cloudinary - josie
// const cloudinary = require('cloudinary').v2;


// requiring clog.js 
const { clog } = require('./middleware/clog');

// import fileupload library - josie
// const fileupload = require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 3001;

// Import custom middleware, "cLog"
app.use(clog);

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });


const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// handle file body parsing middle ware - josie
// app.use(fileupload({useTempTiles: true}))

//Configuration for cloudinary - josie
// cloudinary.config({
//   cloud_name: "dqlvvu8yl",
//   api_key: "221258574378714",
//   api_secret: "NQ6lxahV578bwRoPt2IrL-Yho2s"
// });









app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening ' + PORT));
});




// cloudinary code:
// this is a route to image uploads
// key for the image is "image" - josie

// app.post{"/upload", async (req, res)=>{


//     const file = req.files.image

//     try{console.log(file);

//         const result = await cloudinary.uploader.upload(file.tempFilePath, {
//             public_id: `${Date.now()}`,
//             resource_type: "auto"
//         })

//         res.json({
//             public_id: result.public_id,
//             url: result.secure_url
//         })

//   }catch(err){
//     console.log("Error", err)
//     return res.status(400).json({error: err})
//   }


// }}