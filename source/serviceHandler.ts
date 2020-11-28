/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PersistenceAdapter,
  PersistenceInfo,
  PersistencePromise,
  // RelationValueServiceHandler,
  // SelectedItemValue,
  PersistenceInputCreate,
  PersistenceInputUpdate,
  PersistenceInputRead,
  PersistenceInputDelete,
  DefaultInitializer,
} from 'flexiblepersistence';
import { BaseServiceDefault } from '.';
export class ServiceHandler implements PersistenceAdapter {
  private persistenceInfo: PersistenceInfo;

  element: {
    [name: string]: BaseServiceDefault;
  } = {};
  persistence?: PersistenceAdapter;

  constructor(
    persistenceInfo: PersistenceInfo,
    element?: {
      [name: string]: BaseServiceDefault;
    },
    persistence?: PersistenceAdapter
  ) {
    this.persistenceInfo = persistenceInfo;
    if (element) this.setElement(element);
    if (persistence) this.setPersistence(persistence);
  }

  protected initElement() {
    const initDefault: DefaultInitializer = {
      journaly: this.persistenceInfo.journaly,
    };
    for (const key in this.element) {
      if (Object.prototype.hasOwnProperty.call(this.element, key)) {
        const element = this.element[key];
        element.init(initDefault);
      }
    }
  }

  setElement(element: { [name: string]: BaseServiceDefault }) {
    this.element = element;
    this.initElement();
  }

  protected initPersistence() {
    if (this.persistence)
      for (const key in this.element) {
        if (Object.prototype.hasOwnProperty.call(this.element, key)) {
          const element = this.element[key];
          element.setPersistence(this.persistence);
        }
      }
  }

  setPersistence(persistence: PersistenceAdapter) {
    this.persistence = persistence;
    this.initPersistence();
  }
  close(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  private getFormattedScheme(scheme: string): string {
    return scheme.charAt(0).toUpperCase() + scheme.slice(1);
  }

  private PersistencePromise(input, method, resolve, reject) {
    this.persistenceInfo.journaly
      .publish(
        this.getFormattedScheme(input.scheme) + 'Service.' + method,
        input
      )
      .then((output) => {
        resolve(output);
      })
      .catch((error) => {
        reject(error);
      });
  }

  private makePromise(input, method): Promise<PersistencePromise<any>> {
    return new Promise((resolve, reject) => {
      this.PersistencePromise(input, method, resolve, reject);
    });
  }

  correct(
    input: PersistenceInputUpdate<any>
  ): Promise<PersistencePromise<any>> {
    return this.makePromise(input, 'correct');
  }

  nonexistent(input: PersistenceInputDelete): Promise<PersistencePromise<any>> {
    return this.makePromise(input, 'nonexistent');
  }

  existent(
    input: PersistenceInputCreate<any>
  ): Promise<PersistencePromise<any>> {
    return this.makePromise(input, 'existent');
  }

  create(input: PersistenceInputCreate<any>): Promise<PersistencePromise<any>> {
    return this.makePromise(input, 'create');
  }
  update(input: PersistenceInputUpdate<any>): Promise<PersistencePromise<any>> {
    return this.makePromise(input, 'update');
  }
  read(input: PersistenceInputRead): Promise<PersistencePromise<any>> {
    return this.makePromise(input, 'read');
  }
  delete(input: PersistenceInputDelete): Promise<PersistencePromise<any>> {
    return this.makePromise(input, 'delete');
  }

  public getPersistenceInfo(): PersistenceInfo {
    return this.persistenceInfo;
  }
}
