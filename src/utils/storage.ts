export class Storage {
  static save(key: string, value: string) {
    return sessionStorage.setItem(key, value);
  }

  static load(key: string) {
    return sessionStorage.getItem(key);
  }

  static remove(key: string) {
    return sessionStorage.removeItem(key);
  }

  static clear() {
    return sessionStorage.clear();
  }
}
