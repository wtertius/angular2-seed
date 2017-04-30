import { Component, OnInit } from '@angular/core';
import CustomValidators from '../forms/CustomValidators';
import schemes from './hustle.schemes';
import dictionary from './hustle.dictionary';
import {PageScrollConfig, PageScrollInstance, PageScrollService} from 'ng2-page-scroll';

@Component({
  selector: 'app-hustle',
  templateUrl: './hustle.component.html',
  styleUrls: ['./hustle.component.css']
})

export class HustleComponent implements OnInit {
  state:{
      position: string,
      action:   string,
      video:    string
  };
  scheme: any[];
  schemeByColumns: any[];
  schemeLength: number;
  columnCount: number;
  actions: {};
  positionAbilities: {};
  translations: {};
  constructor(private pageScrollService: PageScrollService) {
      PageScrollConfig.defaultDuration = 200;
  }

  ngOnInit() {
    this.state = {
        action: "shadow",
        video: "shadow__mirror_grip__shadow_position",
        position: "american_grip"
    };

    this.actions = this.getActions();
    this.translations = this.buildTranslations();
    this.positionAbilities = this.getPositionAbilities(schemes.actions);

    this.schemeLength = 50;
    this.columnCount = this.getColumnCount();
    this.scheme = this.generateScheme(this.schemeLength);

    this.schemeByColumns = this.divideSchemeByColumns()

    document.querySelector('video').defaultPlaybackRate = 0.5;
    // TODO Check video exists for each action
  }
  getColumnCount() {
      return Math.ceil(this.schemeLength);
  }
  scrollToSchemeBegin() {
    this.scrollTo('#column-0');
  }
  scrollTo(id) {
    this.pageScrollService.start(PageScrollInstance.simpleInstance(document, id));
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
            console.error("Can't recognize element: "+elem);
    }

    this.scrollTo('#video');
  }

  changeVideoRate() {
      document.querySelector('video').playbackRate = parseFloat((<HTMLInputElement>document.getElementById('rateSlider')).value);
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

    divideSchemeByColumns() {
        const positionHeigth = 30;
        const actionHeigth = 50;
        const columnHeightFraction = 0.93; // src/app/hustle/hustle-component.css .column : height

        var elemsPerColumn = Math.floor(
            document.documentElement.clientHeight * columnHeightFraction / (positionHeigth + actionHeigth));
        var columnNumber = Math.ceil(this.scheme.length / (2*elemsPerColumn));

        var schemeByColumns = [];

        for (var j = 0; j < columnNumber; j++) {
            schemeByColumns[j] = [];
        }

        for (var i = 0; i < this.scheme.length; i += 2) {
            var position = this.scheme[i];
            var action = this.scheme[i+1];

            var j = Math.floor(i/(2*elemsPerColumn));
            schemeByColumns[j].push(position);
            if (action !== undefined) {
                schemeByColumns[j].push(action);
            }
        }

        return schemeByColumns;
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
            console.error("Action '"+action
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
