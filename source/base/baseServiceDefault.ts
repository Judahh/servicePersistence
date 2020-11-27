import { settings } from 'ts-mixer';
import { Default } from 'default-initializer';
import BaseDAODefaultInitializer from './baseDAODefaultInitializer';
import { PersistenceAdapter, PersistenceInput } from 'flexiblepersistence';
settings.initFunction = 'init';
export default class BaseServiceDefault extends Default {
  protected baseClass = 'BaseService';

  protected nameScheme: string | undefined;

  protected persistenceType = '';

  persistence?: PersistenceAdapter;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async persistencePublish(
    method: string,
    input: PersistenceInput | any
  ): Promise<any[] | undefined> {
    if (this.persistence) {
      if (!input.scheme) input.scheme = this.nameScheme;
      return this.persistence[method](input);
    }
  }

  public constructor(initDefault?: BaseDAODefaultInitializer) {
    super(initDefault);
  }

  init(initDefault?: BaseDAODefaultInitializer): void {
    // console.log('init:', initDefault);
    super.init(initDefault);
    if (initDefault && initDefault.persistence)
      this.setPersistence(initDefault.persistence);
    if (!this.nameScheme && this.element)
      this.nameScheme = this.element.replace('Service', this.persistenceType);
  }

  getPersistence() {
    return this.persistence;
  }

  setPersistence(persistence: PersistenceAdapter) {
    this.persistence = persistence;
  }
}
