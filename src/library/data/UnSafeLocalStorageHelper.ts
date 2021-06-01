const map = new Map<string, any>();

export abstract class StorageProvider {
  abstract get<T>(key: string): T;
  abstract set<T>(key: string, value: T): void;
  abstract remove<T>(key: string): void;

  static create(): StorageProvider {
      if (localStorage) {
          return new UnSafeLocalStorageProvider();
      }
      return map;
  }
}

export class UnSafeLocalStorageProvider extends StorageProvider {
    get<T>(key: string): T {
        return JSON.parse(localStorage.getItem(key) || "null");
    }

    set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    remove<T>(key: string): void {
        localStorage.removeItem(key);
    }
}
