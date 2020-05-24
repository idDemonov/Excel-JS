export class EditorSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }
  // $el всегда instance класса dom
  select($el) {
    this.clear();
    $el.focus().addClass('selected');
    this.group.push($el);
    this.current = $el;
  }

  selectGroup($group = []) {
    this.clear();

    this.group = $group;
    this.group.forEach(($el) => $el.addClass('selected'));
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass('selected'));
    this.group = [];
  }
}
