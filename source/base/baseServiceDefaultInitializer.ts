import { DefaultInitializer } from 'default-initializer';
import { Handler } from 'flexiblepersistence';

export default interface BaseServiceDefaultInitializer
  extends DefaultInitializer {
  handler: Handler;
}
