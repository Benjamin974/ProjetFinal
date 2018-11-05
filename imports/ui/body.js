// Importe la collection depuis api/col.js

import { Inscrits } from '../api/col.js';

// Importe la collection Cartes depuis api/carte.js

import { Cartes } from '../api/carte.js';

import { Reserves } from '../api/carte.js';

// Importe les Templates depuis 'meteor/templating'

import { Template } from 'meteor/templating';

// Importe le body.html

import './body.html';

// Importe le template.html

import './template.js';

// Affiche les inscrits dans l'atelier
Template.body.onCreated(function bodyOnCreated() {
    // counter starts at 0
    this.counter = new ReactiveVar(0);
  });

Template.body.helpers({
inscription() {
    // Show newest tasks at the top
    return Inscrits.find({}, { sort: { createdAt: -1 } });
},

carte() {
    // Show newest tasks at the top
    return Cartes.find({}, { sort: { createdAt: -1 } });
},

reserves() {
    return Reserves.find({}, {sort: { createdAt: -1 } });
},

counter() {
    return Template.instance().counter.get();
  },
});

Template.body.events({

'click .reserv'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
},

'submit .formulair'(event) {

    // Empêcher le navigateur par défaut de soumettre le formulaire
    
    event.preventDefault();

    // Obtenir la valeur de l'élément de formulaire

    const target = event.target;
    const noM = target.nom.value;
    const prenoM = target.prenom.value;
    const phonE = target.phone.value;
    const maiL = target.mail.value;
    const atelieR = target.choixAtelier.value;


    // Insérer une tâche dans la collection

    Inscrits.insert({
    atelieR,
    noM,
    prenoM,
    phonE,
    maiL,
    createdAt: new Date(), // heure actuelle
    });

    // efface les valeurs dans les inputs

    target.choixAtelier.value = '';
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
    const Dates = target.date.value;
    const Horaires = target.horaire_de_debut.value;
    const Durée = target.durée.value;
    const Placedispo = target.Nombre_de_place_disponible.value;
    const Prix = target.prix.value;

    Cartes.insert({
        Picture,
        Title,
        Describ,
        Dates,
        Horaires,
        Durée,
        Placedispo,
        Prix,
        createdAt: new Date(), // heure actuelle
        });

        target.picture.value = '';
        target.title.value = '';
        target.describ.value = '';
        target.date.value = '';
        target.horaire_de_debut.value = '';
        target.durée.value = '';
        target.Nombre_de_place_disponible.value = '';
        target.prix.value = '';



},

'submit .modalModif'(event) {

    event.preventDefault();

    const target = event.target;
    const Picture2 = target.picture2.value;
    const Title2 = target.title2.value;
    const Describ2 = target.describ2.value;
    const Dates2 = target.date2.value;
    const Horaires2 = target.horaire_de_debut2.value;
    const Durée2 = target.durée2.value;
    const Placedispo2= target.Nombre_de_place_disponible2.value;
    const Prix2 = target.prix2.value;
    const id = target.editId.value;

    Cartes.update(id, {
        $set: {Picture: Picture2, Title: Title2, Describ: Describ2, Dates: Dates2, Horaires: Horaires2, Durée: Durée2, Placedispo: Placedispo2, Prix: Prix2 }
    });

    $('#modalModif').modal('hide');
},

/* Utilise une collection pour ajouté une reservation depuis un modal. */

'submit .reservation'(event) {

    event.preventDefault();

    const target = event.target;
    const Name = target.nom.value;
    const firstName = target.prenom.value;
    const Mail = target.mail.value;
    const Phone = target.phone.value;
    const titre2 = target.title11.value;

    Reserves.insert({
        titre2,
        Name,
        firstName,
        Mail,
        Phone,
        createdAt: new Date(),
    });

    $('#modal3').modal('hide');

    target.nom.value = '';
    target.prenom.value = '';
    target.mail.value = '';
    target.phone.value = '';
},

'click .btn-edit-modif' (event) {

    const target = event.target;
    const idModif = target.getAttribute('data-id');
    const modif = Cartes.findOne({_id:idModif});

/*Permet de recupérer l'id des inputs*/ 
   
    const firstModif = document.querySelector('#modif1');
    const secondModif = document.querySelector('#modif2');
    const thirdModif = document.querySelector('#modif3');
    const fourthModif = document.querySelector('#modif4');
    const fiveModif = document.querySelector('#modif5');
    const sixModif = document.querySelector('#modif6');
    const sevenModif = document.querySelector('#modif7');
    const eightModif = document.querySelector('#modif8');
    const hidden = document.querySelector('#edit-id');

/*lie les inputs du formulaire au modal*/ 

    hidden.value = idModif;
    firstModif.value = modif.Picture;
    secondModif.value = modif.Title;
    thirdModif.value = modif.Describ;
    fourthModif.value = modif.Dates;
    fiveModif.value = modif.Horaires;
    sixModif.value = modif.Durée;
    sevenModif.value = modif.Placedispo;
    eightModif.value = modif.Prix;

},


'click .btn-edit-reserve'(event) {

    const target = event.target;
    const idModif = target.getAttribute('data-id');
    const modif = Cartes.findOne({_id:idModif});

/*Permet de recupérer l'id des inputs*/

    const hidden = document.querySelector('#edit-id');
    const secondModif = document.querySelector('#modif11');
    const thirdModif = document.querySelector('#modif3');

  
    hidden.value = modif._id;
    secondModif.value = modif.Title;
    thirdModif.value = modif.Describ;

},


});

/*supprime le membre de la collection Inscrits*/ 
Template.fred.events({
    'click .deleted'() {
    Inscrits.remove(this._id);
    },


});
/*supprime le membre de la collection Cartes*/ 
Template.cartes.events({
    'click .suppr'() {
    Cartes.remove(this._id);
    },

});
/*supprime le membre de la collection Reserves*/
Template.Reservation.events({
    'click .supprime'() {
        Reserves.remove(this._id);
        },
});
