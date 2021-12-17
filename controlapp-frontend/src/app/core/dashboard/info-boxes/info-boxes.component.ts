import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-boxes',
  templateUrl: './info-boxes.component.html',
  styles: [],
})
export class InfoBoxesComponent implements OnInit {
  @Input() data: { title: string; icon: string; amount: string }[];
  constructor() {}

  ngOnInit(): void {}
}
