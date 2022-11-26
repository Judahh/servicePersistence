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
export default class BaseService<Filter, Input, Output>
  extends Default
  implements ISRAR<Filter, Input, Output>
{
  persistence?: IPersistence;

  other(input: IInput<Filter, Input>): Promise<IOutput<Filter, Input, Output>> {
    return this.persistencePublish('other', input);
  }

  create(
    input: IInputCreate<Filter, Input>
  ): Promise<IOutput<Filter, Input, Output>> {
    return this.persistencePublish('create', input as IInput<Filter, Input>);
  }

  read(
    input: IInputRead<Filter, Input>
  ): Promise<IOutput<Filter, Input, Output>> {
    return this.persistencePublish('read', input);
  }

  update(
    input: IInputUpdate<Filter, Input>
  ): Promise<IOutput<Filter, Input, Output>> {
    return this.persistencePublish('update', input as IInput<Filter, Input>);
  }

  delete(
    input: IInputDelete<Filter, Input>
  ): Promise<IOutput<Filter, Input, Output>> {
    return this.persistencePublish('delete', input);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async persistencePublish(
    method: string,
    input: IInput<Filter, Input>
  ): Promise<IOutput<Filter, Input, Output>> {
    if (this.persistence) {
      if (!input.scheme) input.scheme = this.getName();
      return this.persistence[method](input);
    }
    // throw new Error('There is no Persistence connected.');
    return input;
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
