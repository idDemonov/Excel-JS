import { ExcelComponent } from '@core/Excel-component';

export class Editor extends ExcelComponent {
  static classes = ['excel__editor', 'editor'];

  toHTML() {
    return ` 
          <div class="row">
            <div class="row__number"></div>

            <div class="row__data">
              <div class="column">A</div>
              <div class="column">B</div>
              <div class="column">C</div>
            </div>
          </div>

          <div class="row">
            <div class="row__number">1</div>

            <div class="row__data">
              <div class="row__cell" contenteditable>A1</div>
              <div class="row__cell" contenteditable>B2</div>
              <div class="row__cell" contenteditable>C3</div>
            </div>
          </div>

          <div class="row">
            <div class="row__number">2</div>

            <div class="row__data">
              <div class="row__cell" contenteditable>A2</div>
              <div class="row__cell" contenteditable>B2</div>
              <div class="row__cell" contenteditable>C2</div>
            </div>
          </div>

          <div class="row">
            <div class="row__number">3</div>

            <div class="row__data">
              <div class="row__cell selected" contenteditable>A3</div>
              <div class="row__cell" contenteditable>B3</div>
              <div class="row__cell" contenteditable>C3</div>
            </div>
          </div>
       `;
  }
}
