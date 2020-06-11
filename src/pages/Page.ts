export abstract class Page {
  params: string;

  constructor(params: string) {
    this.params = params;
  }

  // abstract getRoot(): void;

  abstract afterRender(): void;

  abstract destroy(): void;
}
