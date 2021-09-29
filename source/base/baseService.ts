/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// file deepcode ignore no-any: any needed
import { settings } from 'ts-mixer';
import { Default } from '@flexiblepersistence/default-initializer';
import IBaseService from './iBaseService';
import {
  IPersistence,
  IInput,
  IInputCreate,
  IInputDelete,
  IInputRead,
  IInputUpdate,
  IOutput,
  ISRAR,
} from 'flexiblepersistence';
settings.initFunction = 'init';
export default class BaseService extends Default implements ISRAR<any, any> {
  persistence?: IPersistence;

  other(input: IInput<any>): Promise<IOutput<unknown, unknown>> {
    return this.persistencePublish('other', input);
  }

  existent(input: IInputCreate<any>): Promise<IOutput<unknown, unknown>> {
    return this.persistencePublish('existent', input);
  }
  create(input: IInputCreate<any>): Promise<IOutput<unknown, unknown>> {
    return this.persistencePublish('create', input);
  }

  nonexistent(input: IInputDelete): Promise<IOutput<unknown, unknown>> {
    return this.persistencePublish('nonexistent', input);
  }
  delete(input: IInputDelete): Promise<IOutput<unknown, unknown>> {
    return this.persistencePublish('delete', input);
  }
  read(input: IInputRead): Promise<IOutput<unknown, unknown>> {
    return this.persistencePublish('read', input);
  }
  correct(input: IInputUpdate<any>): Promise<IOutput<unknown, unknown>> {
    return this.persistencePublish('correct', input);
  }

  update(input: IInputUpdate<any>): Promise<IOutput<unknown, unknown>> {
    return this.persistencePublish('update', input);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async persistencePublish(
    method: string,
    input: IInput<any>
  ): Promise<IOutput<unknown, unknown>> {
    if (this.persistence) {
      if (!input.scheme) input.scheme = this.getName();
      return this.persistence[method](input);
    }
    throw new Error('There is no Persistence connected.');
  }

  public constructor(initDefault?: IBaseService) {
    super(initDefault);
  }
  protected generateName() {
    this.setName(this.getClassName().replace('Service', this.getType()));
  }

  init(initDefault?: IBaseService): void {
    // console.log('init:', initDefault);
    super.init(initDefault);
    if (initDefault && initDefault.persistence)
      this.setPersistence(initDefault.persistence);
  }

  getPersistence() {
    return this.persistence;
  }

  setPersistence(persistence: IPersistence) {
    this.persistence = persistence;
  }
}
