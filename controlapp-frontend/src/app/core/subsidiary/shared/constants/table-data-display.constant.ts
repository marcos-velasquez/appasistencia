import { DisplayBuilder } from '@shared/components/table/models/display-builder.model';

export const dataDisplay = new DisplayBuilder()
  .setLabels(['N°', 'nombre', 'dirección', 'zona', 'opciones'])
  .setHeaders(['number', 'name', 'address', 'zone', 'opciones'])
  .set480(['number', 'name', 'opciones'])
  .set680(['number', 'name', 'address', 'opciones'])
  .set768(['number', 'name', 'address', 'opciones'])
  .set1024(['number', 'name', 'address', 'opciones'])
  .build();
