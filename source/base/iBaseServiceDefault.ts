import { PersistenceAdapter } from 'flexiblepersistence';
import { DefaultInitializer } from '@flexiblepersistence/default-initializer';

export default interface IBaseServiceDefault
  extends DefaultInitializer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  persistence?: PersistenceAdapter;
}
