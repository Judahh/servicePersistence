/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// file deepcode ignore no-any: any needed
import {
  IPersistence,
  PersistenceInfo,
  IOutput,
  // RelationValueServiceHandler,
  // SelectedItemValue,
  IInputCreate,
  IInputUpdate,
  IInputRead,
  IInputDelete,
  IInput,
} from 'flexiblepersistence';
import { IDefault } from '@flexiblepersistence/default-initializer';
import { BaseService } from '.';
export class ServiceHandler implements IPersistence {
  private persistenceInfo: PersistenceInfo;

  element: {
    [name: string]: BaseService<any, any>;
  } = {};
  persistence?: IPersistence;

  constructor(
    persistenceInfo?: PersistenceInfo,
    element?: {
      [name: string]: BaseService<any, any>;
    },
    persistence?: IPersistence
  ) {
    this.persistenceInfo = persistenceInfo;
    if (element) this.setElement(element);
    if (persistence) this.setPersistence(persistence);
  }
  clear(): Promise<boolean> {
    if (this.persistence) return this.persistence.clear();
    throw new Error('Persistence nonexistent.');
  }

  protected initElement() {
    const initDefault: IDefault = {
      journaly: this.persistenceInfo.journaly,
    };
    for (const key in this.element) {
      if (Object.prototype.hasOwnProperty.call(this.element, key)) {
        const element = this.element[key];
        element.init(initDefault);
      }
    }
  }

  setElement(element: { [name: string]: BaseService<any, any> }) {
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

  setPersistence(persistence: IPersistence) {
    this.persistence = persistence;
    this.initPersistence();
  }
  close(): Promise<any> {
    if (this.persistence) return this.persistence.close();
    throw new Error('Persistence nonexistent.');
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

  private makePromise(input, method): Promise<IOutput<unknown, unknown>> {
    return new Promise((resolve, reject) => {
      this.PersistencePromise(input, method, resolve, reject);
    });
  }

  other(input: IInput<any>): Promise<IOutput<unknown, unknown>> {
    return this.makePromise(input, 'other');
  }

  create(input: IInputCreate<any>): Promise<IOutput<unknown, unknown>> {
    return this.makePromise(input, 'create');
  }
  update(input: IInputUpdate<any>): Promise<IOutput<unknown, unknown>> {
    return this.makePromise(input, 'update');
  }
  read(input: IInputRead): Promise<IOutput<unknown, unknown>> {
    return this.makePromise(input, 'read');
  }
  delete(input: IInputDelete): Promise<IOutput<unknown, unknown>> {
    return this.makePromise(input, 'delete');
  }

  public getPersistenceInfo(): PersistenceInfo {
    return this.persistenceInfo;
  }
}
