// Importe la collection depuis api/col.js

import { Ateliers } from '../api/sign.js';

// Importe les Templates depuis 'meteor/templating'

import { Template } from 'meteor/templating';



// Importe le template.html pour l'importer au body.js

import './template.html';



/* Template.atelier.helpers({
    atelier() {
        // Show newest tasks at the top
        return Ateliers.find({}, { sort: { createdAt: -1 } });
    },
    });


    Template.atelier.events({

        'submit .atelier-cuisine'(event) {
        
            // Empêcher le navigateur par défaut de soumettre le formulaire
            
            event.preventDefault();
        
            // Obtenir la valeur de l'élément de formulaire
        
            const target = event.target;
            const atelieR = target.ajouteAtelier.value;
            
        
        
            // Insérer une tâche dans la collection
        
            Ateliers.insert({
            atelieR,
            
            createdAt: new Date(), // heure actuelle
            });
        
            // Forme claire
        
            target.ajouteAtelier.value = '';
         
           
        },
                
        });

        Template.atelier.events({
            'click .deleted'() {
                Ateliers.remove(this._id);
              },
        }); */