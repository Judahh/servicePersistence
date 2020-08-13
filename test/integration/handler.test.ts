import {
  Handler,
  DatabaseInfo,
  Operation,
  Event,
  MongoDB,
} from 'flexiblepersistence';

import { ServiceHandler } from '../../source/serviceHandler';
import { ServiceInfo } from '../../source/serviceInfo';
import { Journaly } from 'journaly';
import TestService from './testService';

let read;
let write;

test('add and read array and find object', async (done) => {
  const journaly = new Journaly();
  new TestService({
    journaly: journaly,
  });
  read = new ServiceHandler(new ServiceInfo({}, journaly));
  write = new MongoDB(
    new DatabaseInfo({
      database: 'write',
      host: process.env.MONGO_HOST || 'localhost',
      port: process.env.MONGO_PORT,
    })
  );
  console.log(journaly.getSubjects());
  const handler = new Handler(write, read);
  await handler.getWrite().clear('events');
  const obj = new Object();
  obj['test'] = 'test';
  try {
    const persistencePromise = await handler.addEvent(
      new Event({ operation: Operation.create, name: 'test', content: obj })
    );

    expect(persistencePromise.receivedItem).toStrictEqual(
      'create.receivedItem'
    );

    const persistencePromise1 = await handler.readArray('test', {});
    expect(persistencePromise1.receivedItem).toStrictEqual('read.receivedItem');
    expect(persistencePromise1.selectedItem).toStrictEqual('read.selectedItem');
    expect(persistencePromise1.sentItem).toStrictEqual('read.sentItem');
  } catch (error) {
    await handler.getWrite().clear('events');
    await write.close();
    console.error(error);
    expect(error).toBe(null);
    done();
  }
  await handler.addEvent(
    new Event({ operation: Operation.delete, name: 'test' })
  );
  await handler.getWrite().clear('events');
  await write.close();
  done();
});
