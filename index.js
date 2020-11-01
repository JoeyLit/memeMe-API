const express = require('express')
const compression = require('compression');
const routes = require('./routes')
const path = require('path')
const	fileUpload = require('express-fileupload')
const	app = express()
const	mysql = require('mysql')
const	bodyParser=require("body-parser")
const connection = require('./config/database')
var cors = require('cors')

const helmet = require('helmet')

const xss = require('xss-clean')

app.use(compression()); //Compress all routes
    
// connecting to meme routes middleware
const memeRoutes = require('./Routes/meme')

// connecting to Random meme routes middleware
const memeModalOtherRoutes = require('./Routes/meme-modal-other')

// connecting to Random meme routes middleware
const memeRandomRoutes = require('./Routes/meme-random')

// connecting to Search meme routes middleware
const memeSearchRoutes = require('./Routes/meme-search')

// connecting to Search meme routes middleware
const memeTypeRoutes = require('./Routes/meme-memetype')

//setting headers
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH');
    res.setHeader('Access-Control-Allow-Methods', 'Content-Type, Authorization');
    next()
})
 

 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images/upload_images')));
app.use(fileUpload());
app.use(express.json());
app.use(cors())

// set security header
app.use(helmet());

// prevent XSS Attacks
app.use(xss());
 
// development only
 
app.get('/', routes.index);//call for main index page
app.post('/', routes.index);//call for signup post 
app.get('/profile/:id',routes.profile);

// get all meme by ASCENDING pagination
app.use('/api', memeRoutes);

// get meme by id
app.use('/api', memeRoutes);

// get all meme by ASCENDING pagination MODAL OTHER
app.use('/api-modal-other', memeModalOtherRoutes);

// get all meme by RANDOM MODAL pagination
app.use('/api-random', memeRandomRoutes);

// get all SEARCH RESULT of meme 
app.use('/api-search', memeSearchRoutes);

// get all SEARCH RESULT of meme 
app.use('/api-memetype', memeTypeRoutes);


//Connecting to server
app.listen(process.env.PORT || 8080, ()=>{
	console.log('app running on port 8080')
});