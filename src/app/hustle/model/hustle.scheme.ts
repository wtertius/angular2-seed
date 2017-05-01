import { OnInit } from '@angular/core';
import elements from './hustle.elements';

export default class Scheme {
    schemeLength: number;
    actions: {};
    positionAbilities: {};

    constructor() {
        this.actions = elements.GetActions();
        this.positionAbilities = this.getPositionAbilities(elements.actions);
    }

    Generate(actionNumber) {
        var usedActions = {};

        var range: any[] = [];
        var schemeActions: any[] = [];

        var currentPosition = elements.startPosition;
        range.push({
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

            range.push({
                kind: "action",
                name: action,
                video: elements.GetVideoName(action, currentPosition, end)
            });
            range.push({
                kind: "position",
                name: end,
                image_url: ""
            });
        }

        return range;
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
}
