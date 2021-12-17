import { DisplayBuilder } from '@shared/components/table/models/display-builder.model';

export const dataDisplay = new DisplayBuilder()
  .setLabels(['nombre', 'opciones'])
  .setHeaders(['name', 'opciones'])
  .setBreakpointsAll(['name', 'opciones'])
  .build();
