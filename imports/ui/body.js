// Importe la collection depuis api/col.js

import { Inscrits } from '../api/col.js';

// Importe la collection Cartes depuis api/carte.js

import { Cartes } from '../api/carte.js';

// Importe les Templates depuis 'meteor/templating'

import { Template } from 'meteor/templating';

// Importe le body.html

import './body.html';

// Importe le template.html

import './template.js';

// Affiche les inscrits dans l'atelier

Template.body.helpers({
inscription() {
    // Show newest tasks at the top
    return Inscrits.find({}, { sort: { createdAt: -1 } });
},

carte() {
    // Show newest tasks at the top
    return Cartes.find({}, { sort: { createdAt: -1 } });
},
});

Template.body.events({

'submit .formulair'(event) {

    // Empêcher le navigateur par défaut de soumettre le formulaire
    
    event.preventDefault();

    // Obtenir la valeur de l'élément de formulaire

    const target = event.target;
    const noM = target.nom.value;
    const prenoM = target.prenom.value;
    const phonE = target.phone.value;
    const maiL = target.mail.value;


    // Insérer une tâche dans la collection

    Inscrits.insert({
    noM,
    prenoM,
    phonE,
    maiL,
    createdAt: new Date(), // heure actuelle
    });

    // Forme claire

    target.nom.value = '';
    target.prenom.value = '';
    target.phone.value = '';
    target.mail.value = '';

},

'submit .formAtelier'(event) {

    // Empêcher le navigateur par défaut de soumettre le formulaire
    
    event.preventDefault();

    // Obtenir la valeur de l'élément de formulaire

    const target = event.target;
    const Picture = target.picture.value;
    const Title = target.title.value;
    const Describ = target.describ.value;

    Cartes.insert({
        Picture,
        Title,
        Describ,
        createdAt: new Date(), // heure actuelle
        });

        target.picture.value = '';
        target.title.value = '';
        target.describ.value = '';




},

'submit .modalModif'(event) {

    event.preventDefault();

    const target = event.target;
    const Picture2 = target.picture2.value;
    const Title2 = target.title2.value;
    const Describ2 = target.describ2.value;
    const id = target.editId.value;

    Cartes.update(id, {
        $set: {Picture: Picture2, Title: Title2, Describ: Describ2}
    });

    $('#modalModif').modal('hide');
},



'click .btn-edit-modif' (event) {

    const target = event.target;
    const idModif = target.getAttribute('data-id');
    const modif = Cartes.findOne({_id:idModif});

    const firstModif = document.querySelector('#modif1');
    const secondModif = document.querySelector('#modif2');
    const thirdModif = document.querySelector('#modif3');
    const hidden = document.querySelector('#edit-id');

    hidden.value = idModif;
    firstModif.value = modif.Picture;
    secondModif.value = modif.Title;
    thirdModif.value = modif.Describ;
},

});


Template.fred.events({
    'click .deleted'() {
    Inscrits.remove(this._id);
    },

 /*
   'click .btn-edit-membre'(event) {

    const target = event.target;
    const idMembre = target.getAttribute('data-id');
    const membre = Collect.findOne({_id:idMembre});

    const firstmod = document.querySelector("#titre");
    const secondmod = document.querySelector("#titreCarte");
    const thirdmod = document.querySelector("#texte");
    const fourmod = document.querySelector("#liste");
    const hidden = document.querySelector("#editId");

    hidden.value = idMembre;

    }, */

});

Template.cartes.events({
    'click .suppr'() {
    Cartes.remove(this._id);
    },
});