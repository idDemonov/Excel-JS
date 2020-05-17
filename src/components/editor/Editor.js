import { ExcelComponent } from '@core/Excel-component';
import { createTable } from '@/components/editor/editor.template';

export class Editor extends ExcelComponent {
  static classes = ['excel__editor', 'editor'];

  toHTML() {
    return createTable(25);
  }
}
