import { DisplayBuilder } from '@shared/components/table/models/display-builder.model';

export const dataDisplay = new DisplayBuilder()
  .setLabels(['Nombre', 'Rut', 'Registro'])
  .setHeaders(['name', 'rut', 'register'])
  .set480(['name', 'rut'])
  .set680(['name', 'rut'])
  .set768(['name', 'rut', 'register'])
  .set1024(['name', 'rut', 'register'])
  .build();
