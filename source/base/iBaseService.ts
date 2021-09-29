import { IPersistence } from 'flexiblepersistence';
import { IDefault } from '@flexiblepersistence/default-initializer';

export default interface IBaseService extends IDefault {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  persistence?: IPersistence;
}
