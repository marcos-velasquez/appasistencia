import { DataDisplay } from '@shared/components/table/interfaces/data-display.interface';

export class DisplayBuilder {
  private data: Partial<DataDisplay> = {};

  setHeaders(headers: string[]) {
    this.data.headers = headers;
    return this;
  }

  setLabels(labels: string[]) {
    this.data.labels = labels;
    return this;
  }

  set480(columns: string[]) {
    this.data[480] = columns;
    return this;
  }

  set680(columns: string[]) {
    this.data[680] = columns;
    return this;
  }

  set768(columns: string[]) {
    this.data[768] = columns;
    return this;
  }

  set1024(columns: string[]) {
    this.data[1024] = columns;
    return this;
  }

  setBreakpointsAll(columns: string[]) {
    this.set480(columns).set680(columns).set768(columns).set1024(columns);
    return this;
  }

  build() {
    this.data.active = [...this.data.headers];
    return this.data;
  }
}
