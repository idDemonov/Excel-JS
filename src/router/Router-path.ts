export class RouterPath {
  protected constructor() {}

  static get path(): string {
    return window.location.hash.slice(1);
  }

  static set path(path: string) {
    window.location.hash = path;
  }

  static get param(): string {
    return RouterPath.path.split('/')[1];
  }
}
