export class EditorSelection {
  constructor() {
    this.group = [];
  }
  // $el всегда instance класса dom
  select($el) {
    $el.addClass('selected');
    this.group.push($el);
  }

  selectGroup() {}
}
