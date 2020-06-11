import { ExcelComponent } from '@core/Excel-component';
import {
  IDom,
  IExcelStateComponents,
  TOptionsElComp,
  TStylesCell,
} from '@/interface';

export class ExcelStateComponents extends ExcelComponent
  implements IExcelStateComponents {
  state: TStylesCell | undefined;
  constructor(...args: [IDom, TOptionsElComp]) {
    super(...args);
  }

  get template(): string {
    return JSON.stringify(this.state, null, 2);
  }

  initState(initialState: TStylesCell): void {
    this.state = { ...initialState };
  }

  setState(newState: TStylesCell): void {
    this.state = { ...this.state, ...newState };
    this.$root.html(this.template);
  }
}
