require('./db/connect')

const cors = require("cors");
const express = require('express');
const session = require('express-session');
const agent_router = require('./routers/agent');
const produit_router = require('./routers/produit');
const client_router = require('./routers/client');
const commande_router = require('./routers/commande');
const offre_router = require('./routers/offre');
const claim_router = require('./routers/claim');
const bill_router = require('./routers/bill');
//const auth = require('./middleware/auth');
// get configaration from .env
require("dotenv").config();

let app = express();
//cors provides Express middleware to enable CORS with various options
var corsOptions = {
    origin: "http://localhost:4200",
    
  };
  app.use((req, res, next) => {
    //res.setHeader('Access-Control-Allow-Origin', 'https://cdpn.io')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
app.use(cors(corsOptions));
app.use(express.json());

// Initialiser express-session
app.use(
    session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req,res,next)=>{
  res.locals.message=req.session.message;
  delete req.session.message;
  next();
});
// serve all static files inside public directory display images
app.use(express.static('public')); 
app.use('/assets/img', express.static('assets/img'));
app.use('/uploads', express.static("uploads"));
app.use('/files', express.static("files"));

app.get('/', function (req, res) {
  res.send('<b>My</b> first express http server');
});

app.use('/api/agent',agent_router);
app.use('/api/produit',produit_router);
app.use('/api/client',client_router);
app.use('/api/commande',commande_router);
app.use('/api/offre',offre_router);
app.use('/api/claim',claim_router);
app.use('/api/bill',bill_router);


app.listen(process.env.PORT,() => {
    console.log(`Running at localhost:${process.env.PORT}`);
  });
