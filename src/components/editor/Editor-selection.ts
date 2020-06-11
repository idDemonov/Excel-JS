import { IDom } from '@/interface';
import { keys } from '@core/utils';

export class EditorSelection {
  private group: IDom[];
  current: IDom | null;

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el: IDom): void {
    this.clear();
    $el.focus().addClass('selected');
    this.group.push($el);
    this.current = $el;
  }

  selectGroup($group: IDom[]): void {
    this.clear();

    this.group = $group;
    this.group.forEach(($el) => $el.addClass('selected'));
  }

  clear(): void {
    this.group.forEach(($el) => $el.removeClass('selected'));
    this.group = [];
  }

  applyStyle(style: { [key: string]: string | undefined }): void {
    const correct = keys(style).reduce((res: Record<string, string>, key) => {
      if (typeof style[key] !== 'undefined') res[key] = <string>style[key];
      return res;
    }, {});
    this.group.forEach(($el) => $el.css(correct));
  }

  get selectedIds(): string[] {
    return this.group.map(($el) => $el.id());
  }
}
