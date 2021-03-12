// file deepcode ignore no-any: any needed
import {
  Handler,
  PersistenceInfo,
  Operation,
  Event,
  MongoDB,
  PersistencePromise,
} from 'flexiblepersistence';

import { ServiceHandler } from '../../source/serviceHandler';
import { Journaly, SenderReceiver } from 'journaly';
import TestService from './testService';

let read;
let write;

test('add and read array and find object', async (done) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const journaly = Journaly.newJournaly() as SenderReceiver<any>;
  // new TestService({
  //   journaly: journaly,
  // });
  read = new ServiceHandler(new PersistenceInfo({}, journaly), {
    test: new TestService(),
  });
  write = new MongoDB(
    new PersistenceInfo(
      {
        database: 'write',
        host: process.env.MONGO_HOST || 'localhost',
        port: process.env.MONGO_PORT,
      },
      journaly
    )
  );
  // console.log(journaly.getSubjects());
  const handler = new Handler(write, read);
  await handler.getWrite().clear();
  const obj = {};
  obj['test'] = 'test';
  try {
    const persistencePromise = await handler.addEvent(
      new Event({ operation: Operation.create, name: 'test', content: obj })
    );

    expect(persistencePromise).toStrictEqual(
      new PersistencePromise({
        receivedItem: 'create.receivedItem',
        result: 'create.result',
        selectedItem: 'create.selectedItem',
        sentItem: 'create.sentItem',
      })
    );

    const persistencePromise1 = await handler.readArray('test', {});

    expect(persistencePromise1).toStrictEqual(
      new PersistencePromise({
        receivedItem: 'read.receivedItem',
        result: 'read.result',
        selectedItem: 'read.selectedItem',
        sentItem: 'read.sentItem',
      })
    );

    const persistencePromise2 = await handler.addEvent(
      new Event({ operation: Operation.existent, name: 'test', content: obj })
    );

    expect(persistencePromise2).toStrictEqual(
      new PersistencePromise({
        receivedItem: 'existent.receivedItem',
        result: 'existent.result',
        selectedItem: 'existent.selectedItem',
        sentItem: 'existent.sentItem',
      })
    );

    const persistencePromise3 = await handler.addEvent(
      new Event({
        operation: Operation.nonexistent,
        name: 'test',
        content: obj,
      })
    );

    expect(persistencePromise3).toStrictEqual(
      new PersistencePromise({
        receivedItem: 'nonexistent.receivedItem',
        result: 'nonexistent.result',
        selectedItem: 'nonexistent.selectedItem',
        sentItem: 'nonexistent.sentItem',
      })
    );

    const persistencePromise4 = await handler.addEvent(
      new Event({
        operation: Operation.correct,
        name: 'test',
        content: obj,
      })
    );

    expect(persistencePromise4).toStrictEqual(
      new PersistencePromise({
        receivedItem: 'correct.receivedItem',
        result: 'correct.result',
        selectedItem: 'correct.selectedItem',
        sentItem: 'correct.sentItem',
      })
    );

    const persistencePromise5 = await handler.addEvent(
      new Event({
        operation: Operation.update,
        name: 'test',
        content: obj,
      })
    );

    expect(persistencePromise5).toStrictEqual(
      new PersistencePromise({
        receivedItem: 'update.receivedItem',
        result: 'update.result',
        selectedItem: 'update.selectedItem',
        sentItem: 'update.sentItem',
      })
    );

    expect(read.getPersistenceInfo()).toStrictEqual(
      new PersistenceInfo({}, journaly)
    );
  } catch (error) {
    await handler.getWrite().clear();
    await write.close();
    console.error(error);
    expect(error).toBe(null);
    done();
  }
  await handler.addEvent(
    new Event({ operation: Operation.delete, name: 'test' })
  );
  await handler.getWrite().clear();
  await write.close();
  done();
});
