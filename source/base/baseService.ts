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
export default class BaseService<Input, Output>
  extends Default
  implements ISRAR<Input, Output>
{
  persistence?: IPersistence;

  other(input: IInput<Input>): Promise<IOutput<Input, Output>> {
    return this.persistencePublish('other', input);
  }

  existent(input: IInputCreate<Input>): Promise<IOutput<Input, Output>> {
    return this.persistencePublish('existent', input as IInput<Input>);
  }
  create(input: IInputCreate<Input>): Promise<IOutput<Input, Output>> {
    return this.persistencePublish('create', input as IInput<Input>);
  }

  nonexistent(input: IInputDelete): Promise<IOutput<Input, Output>> {
    return this.persistencePublish('nonexistent', input);
  }
  delete(input: IInputDelete): Promise<IOutput<Input, Output>> {
    return this.persistencePublish('delete', input);
  }
  read(input: IInputRead): Promise<IOutput<Input, Output>> {
    return this.persistencePublish('read', input);
  }
  correct(input: IInputUpdate<Input>): Promise<IOutput<Input, Output>> {
    return this.persistencePublish('correct', input as IInput<Input>);
  }

  update(input: IInputUpdate<Input>): Promise<IOutput<Input, Output>> {
    return this.persistencePublish('update', input as IInput<Input>);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async persistencePublish(
    method: string,
    input: IInput<Input>
  ): Promise<IOutput<Input, Output>> {
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
