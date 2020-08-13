import { settings } from 'ts-mixer';
import { Default, DefaultInitializer } from 'default-initializer';
settings.initFunction = 'init';
export default class BaseServiceDefault extends Default {
  protected baseClass = 'BaseService';

  protected nameDAO: string | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async dAO(
    method: string,
    ...args: any
  ): Promise<any[] | undefined> {
    if (!this.nameDAO && this.element)
      this.nameDAO = this.element.replace('Service', 'DAO');
    return this.journaly?.publish(this.nameDAO + '.' + method, ...args);
  }

  public constructor(initDefault: DefaultInitializer) {
    super(initDefault);
  }

  public init(initDefault: DefaultInitializer): void {
    super.init(initDefault);
  }
}
