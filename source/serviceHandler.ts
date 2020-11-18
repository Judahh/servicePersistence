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
} from 'flexiblepersistence';
export class ServiceHandler implements PersistenceAdapter {
  private persistenceInfo: PersistenceInfo;

  constructor(persistenceInfo: PersistenceInfo) {
    this.persistenceInfo = persistenceInfo;
  }
  close(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  private getFormattedScheme(scheme: string): string {
    return scheme.charAt(0).toUpperCase() + scheme.slice(1);
  }

  private persistencePromise(input, method, resolve, reject) {
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

  private makePromise(input, method): Promise<PersistencePromise> {
    return new Promise((resolve, reject) => {
      this.persistencePromise(input, method, resolve, reject);
    });
  }

  correct(input: PersistenceInputUpdate): Promise<PersistencePromise> {
    return this.makePromise(input, 'correct');
  }

  nonexistent(input: PersistenceInputDelete): Promise<PersistencePromise> {
    return this.makePromise(input, 'nonexistent');
  }

  existent(input: PersistenceInputCreate): Promise<PersistencePromise> {
    return this.makePromise(input, 'existent');
  }

  create(input: PersistenceInputCreate): Promise<PersistencePromise> {
    return this.makePromise(input, 'create');
  }
  update(input: PersistenceInputUpdate): Promise<PersistencePromise> {
    return this.makePromise(input, 'update');
  }
  read(input: PersistenceInputRead): Promise<PersistencePromise> {
    return this.makePromise(input, 'read');
  }
  delete(input: PersistenceInputDelete): Promise<PersistencePromise> {
    return this.makePromise(input, 'delete');
  }

  public getPersistenceInfo(): PersistenceInfo {
    return this.persistenceInfo;
  }
}
