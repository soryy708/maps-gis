import { Component, OnInit } from '@angular/core';
import govmap from '../govmap/index';
import layers from '../govmap/layers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    govmap.createMap('map', {
      token: '5a4b8472-b95b-4687-8179-0ccb621c7990',
      layers: layers.map(layer => layer.key),
      background: '0',
      layersMode: 1,
      zoomButtons: false,
    });
  }
}
