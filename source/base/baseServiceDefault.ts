/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// file deepcode ignore no-any: any needed
import { settings } from 'ts-mixer';
import { Default } from '@flexiblepersistence/default-initializer';
import BaseServiceDefaultInitializer from './baseServiceDefaultInitializer';
import {
  PersistenceAdapter,
  PersistenceInput,
  PersistenceInputCreate,
  PersistenceInputDelete,
  PersistenceInputRead,
  PersistenceInputUpdate,
  PersistencePromise,
  SRARAdapter,
} from 'flexiblepersistence';
settings.initFunction = 'init';
export default class BaseServiceDefault
  extends Default
  implements SRARAdapter<any, any> {
  persistence?: PersistenceAdapter;

  other(input: PersistenceInput<any>): Promise<PersistencePromise<any>> {
    return this.persistencePublish('other', input);
  }

  existent(
    input: PersistenceInputCreate<any>
  ): Promise<PersistencePromise<any>> {
    return this.persistencePublish('existent', input);
  }
  create(input: PersistenceInputCreate<any>): Promise<PersistencePromise<any>> {
    return this.persistencePublish('create', input);
  }

  nonexistent(input: PersistenceInputDelete): Promise<PersistencePromise<any>> {
    return this.persistencePublish('nonexistent', input);
  }
  delete(input: PersistenceInputDelete): Promise<PersistencePromise<any>> {
    return this.persistencePublish('delete', input);
  }
  read(input: PersistenceInputRead): Promise<PersistencePromise<any>> {
    return this.persistencePublish('read', input);
  }
  correct(
    input: PersistenceInputUpdate<any>
  ): Promise<PersistencePromise<any>> {
    return this.persistencePublish('correct', input);
  }

  update(input: PersistenceInputUpdate<any>): Promise<PersistencePromise<any>> {
    return this.persistencePublish('update', input);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async persistencePublish(
    method: string,
    input: PersistenceInput<any>
  ): Promise<PersistencePromise<any>> {
    if (this.persistence) {
      if (!input.scheme) input.scheme = this.getName();
      return this.persistence[method](input);
    }
    throw new Error('There is no Persistence connected.');
  }

  public constructor(initDefault?: BaseServiceDefaultInitializer) {
    super(initDefault);
  }
  protected generateName() {
    this.setName(this.getClassName().replace('Service', this.getType()));
  }

  init(initDefault?: BaseServiceDefaultInitializer): void {
    // console.log('init:', initDefault);
    super.init(initDefault);
    if (initDefault && initDefault.persistence)
      this.setPersistence(initDefault.persistence);
  }

  getPersistence() {
    return this.persistence;
  }

  setPersistence(persistence: PersistenceAdapter) {
    this.persistence = persistence;
  }
}
