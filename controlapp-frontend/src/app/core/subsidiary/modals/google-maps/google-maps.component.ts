import { Inject, OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Place } from '../../shared/interfaces/place.interface';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  zoom: number = 20;
  options = {
    types: [],
  };

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public place: Place) {}

  ngOnInit(): void {
    if (!this.place.latitud) this.setCurrentLocation();
  }

  public handleAddressChange(address: Address) {
    this.place.name = address.name;
    this.place.latitud = address.geometry.location.lat();
    this.place.longitud = address.geometry.location.lng();
    this.place.address = address.name;
  }

  onSave() {
    this.dialogRef.close(this.place);
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.place.latitud = position.coords.latitude;
        this.place.longitud = position.coords.longitude;
      });
    }
  }
}
