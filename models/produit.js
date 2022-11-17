const mongoose = require('mongoose');
const Joi = require('joi');
var moment = require("moment");

const produit_schema = new mongoose.Schema({
    nom : String,
    categorie : String,
    description : String,
    marque : String,
    date_ajout : {
        type : String,
        required: true,
        default: moment(Date.now()).format("YYYY/DD/MM hh:mm"),
    },
    quantite : Number,
    prix : Number,
    image : String
});

let produit_validation = Joi.object({
    nom: Joi.string().required(),
    categorie: Joi.string().required(),
    description: Joi.string().required(),
    marque: Joi.string().required(),
    image: Joi.string(),
    quantite : Joi.number().min(0),
    prix : Joi.number(),
    
});

const Produit = mongoose.model('produit',produit_schema);

module.exports.Produit=Produit;
module.exports.produit_validation=produit_validation;