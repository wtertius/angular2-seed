import { Component, OnInit } from '@angular/core';
import CustomValidators from '../forms/CustomValidators';
import elements from './model/hustle.elements';
import Scheme from './model/hustle.scheme';
import dictionary from './model/hustle.dictionary';
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
    schemeByColumns: any[];
    constructor(private pageScrollService: PageScrollService) {
        PageScrollConfig.defaultDuration = 200;
    }

    ngOnInit() {
        this.state = {
            action: "shadow",
            video: "shadow__mirror_grip__shadow_position",
            position: "american_grip"
        };


        const schemeLength = 50;
        var scheme = new Scheme();
        this.schemeByColumns = this.divideRangeByColumns(scheme.Generate(schemeLength))

        document.querySelector('video').defaultPlaybackRate = 0.5;
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
                console.error("Can't recognize element: "+elem);
        }

        this.scrollTo('#video');
    }

    scrollToRangeBegin() {
        this.scrollTo('#column-0');
    }

    scrollTo(id) {
        this.pageScrollService.start(PageScrollInstance.simpleInstance(document, id));
    }

    changeVideoRate() {
        document.querySelector('video').playbackRate = parseFloat((<HTMLInputElement>document.getElementById('rateSlider')).value);
    }

    divideRangeByColumns(range) {
        const positionHeigth = 30;
        const actionHeigth = 50;
        const columnHeightFraction = 0.93; // src/app/hustle/hustle-component.css .column : height

        var elemsPerColumn = Math.floor(
            document.documentElement.clientHeight * columnHeightFraction / (positionHeigth + actionHeigth));
        var columnNumber = Math.ceil(range.length / (2*elemsPerColumn));

        var schemeByColumns = [];

        for (var j = 0; j < columnNumber; j++) {
            schemeByColumns[j] = [];
        }

        for (var i = 0; i < range.length; i += 2) {
            var position = range[i];
            var action = range[i+1];

            var j = Math.floor(i/(2*elemsPerColumn));
            schemeByColumns[j].push(position);
            if (action !== undefined) {
                schemeByColumns[j].push(action);
            }
        }

        return schemeByColumns;
    }

    t(name) {
        return dictionary.t(name);
    }
}
