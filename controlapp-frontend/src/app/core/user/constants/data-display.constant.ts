import { DisplayBuilder } from '@shared/components/table/models/display-builder.model';

export const dataDisplay = new DisplayBuilder()
  .setLabels(['Nombre', 'Apellido', 'email', 'rol', 'opciones'])
  .setHeaders(['first_name', 'last_name', 'email', 'role', 'opciones'])
  .set480(['first_name', 'last_name', 'opciones'])
  .set680(['first_name', 'last_name', 'email', 'opciones'])
  .set768(['first_name', 'last_name', 'email', 'role', 'opciones'])
  .set1024(['first_name', 'last_name', 'email', 'role', 'opciones'])
  .build();
