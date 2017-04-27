import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CustomValidators from '../forms/CustomValidators';
import schemes from './contact.schemes';
import dictionary from './contact.dictionary';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact-component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  state:{
      position: string,
      action:   string,
      video:    string
  };
  scheme: any[];
  actions: {};
  positionAbilities: {};
  translations: {};
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.validateEmail]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.state = {
        action: "shadow",
        video: "",
        position: "american_grip"
    };

    this.actions = this.getActions();
    this.translations = this.buildTranslations();
    //this.actions = this.translate();

    this.positionAbilities = this.getPositionAbilities(schemes.actions);

    this.scheme = this.generateScheme(20);

    // TODO Check video exists for each action
  }
  updateState(elem) {
    switch (elem.kind) {
        case "action":
            this.state.action = elem.name;
            this.state.video  = elem.video;
            break;
        case "position":
            this.state.position = elem.name;
            break;
        default:
            console.log("Can't recognize element: "+elem);
    }
  }
  submitForm(): void {
    console.log(this.contactForm);
  }
  generateScheme(actionNumber) {
    var usedActions = {};

    var scheme: any[] = [];
    var schemeActions: any[] = [];

    var currentPosition = schemes.startPosition;
    scheme.push({
        kind: "position",
        name: currentPosition,
        image_url: ""
    });

    for(var i=0; i < actionNumber; i++) {
        var actions = this.recommendActions(currentPosition, usedActions);
        var action = this.getRandomElem(actions)
        usedActions[action] = true;

        var actionDesc = this.actions[action];
        var end = this.getRandomElem(actionDesc.end);
        schemeActions.push({
            begin: currentPosition,
            action: action,
            end: end
        });
        currentPosition = end;

        scheme.push({
            kind: "action",
            name: action,
            video: action + "__" + currentPosition + "__" + end
        });
        scheme.push({
            kind: "position",
            name: end,
            image_url: ""
        });
    }

    return scheme;
  }
  getRandomElem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  recommendActions(position, usedActions) {
    var actions = this.positionAbilities[position];

    actions = actions.filter(action => !usedActions[action]);

    if (actions.length <= 0) {
        actions = this.positionAbilities[position];
        actions.forEach(action => {delete usedActions[action]});
    }

    return actions;
  }
  getActions() {
    var actions = schemes.actions;
    for (var action in actions) {
        var desc = actions[action];

        if (desc.as !== undefined) {
            desc = actions[desc.as];
        }

        if (desc.begin.constructor !== Array) {
            desc.begin = [desc.begin];
        }
        if (desc.end.constructor !== Array) {
            desc.end = [desc.end];
        }

        if (desc.begin === undefined) {
            console.log("Action '"+action
                +"' doesn't have begin in description '"+desc+"' ");
            continue;
        }

        actions[action] = desc;
    }

    return actions;
  }

  t(name) {
      return this.translations[name] || name;
  }

  buildTranslations() {
    if (!dictionary.shouldBeUpdated) {
        return dictionary.translations;
    }

    var translations = dictionary.translations;

    for (var action in this.actions) {
        if (translations[action] === undefined) {
            translations[action] = "";
        }

        var desc = this.actions[action];
        for (var i in desc.begin) {
            var position = desc.begin[i];
            if (translations[position] === undefined) {
                translations[position] = "";
            }
        }
        for (var i in desc.end) {
            var position = desc.end[i];
            if (translations[position] === undefined) {
                translations[position] = "";
            }
        }
    }

    return translations;
  }
  getPositionAbilities(actions) {
    var positionAbilities = {};
    for (var action in actions) {
        var desc = actions[action];
        var begin = desc.begin;

        for (var i in begin) {
            var position = begin[i];

            if (positionAbilities[position] === undefined) {
                positionAbilities[position] = [];
            }

            positionAbilities[position].push(action);
        }
    }

    for (var action in actions) {
        var desc = actions[action];
        var end = desc.end;

        for (var i in end) {
            var position = end[i];
            if (positionAbilities[position] === undefined) {
                console.error("Position '"+position+"' has no way out");
            }
        }
    }

    return positionAbilities;
  }
}
