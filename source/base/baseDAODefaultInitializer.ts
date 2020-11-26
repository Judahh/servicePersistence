import { DefaultInitializer, PersistenceAdapter } from 'flexiblepersistence';

export default interface BaseDAODefaultInitializer extends DefaultInitializer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  persistence?: PersistenceAdapter;
}
