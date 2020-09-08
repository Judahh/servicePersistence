/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BaseServiceDefault } from '../../source/index';
import {
  PersistenceAdapter,
  PersistenceInputCreate,
  PersistenceInputDelete,
  PersistenceInputUpdate,
  PersistenceInputRead,
  PersistencePromise,
} from 'flexiblepersistence';
import { settings } from 'ts-mixer';
import { DefaultInitializer } from 'default-initializer';
settings.initFunction = 'init';
export default class TestService
  extends BaseServiceDefault
  implements PersistenceAdapter {
  constructor(initDefault: DefaultInitializer) {
    super(initDefault);
    initDefault;
  }

  close(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  getDatabaseInfo() {
    throw new Error('Method not implemented.');
  }
  existent(input: PersistenceInputCreate): Promise<PersistencePromise> {
    return new Promise<PersistencePromise>((resolve) => {
      resolve(
        new PersistencePromise({
          receivedItem: 'existent.receivedItem',
          result: 'existent.result',
          selectedItem: 'existent.selectedItem',
          sentItem: 'existent.sentItem',
        })
      );
    });
  }
  create(input: PersistenceInputCreate): Promise<PersistencePromise> {
    return new Promise<PersistencePromise>((resolve) => {
      resolve(
        new PersistencePromise({
          receivedItem: 'create.receivedItem',
          result: 'create.result',
          selectedItem: 'create.selectedItem',
          sentItem: 'create.sentItem',
        })
      );
    });
  }
  nonexistent(input: PersistenceInputDelete): Promise<PersistencePromise> {
    return new Promise<PersistencePromise>((resolve) => {
      resolve(
        new PersistencePromise({
          receivedItem: 'nonexistent.receivedItem',
          result: 'nonexistent.result',
          selectedItem: 'nonexistent.selectedItem',
          sentItem: 'nonexistent.sentItem',
        })
      );
    });
  }
  delete(input: PersistenceInputDelete): Promise<PersistencePromise> {
    return new Promise<PersistencePromise>((resolve) => {
      resolve(
        new PersistencePromise({
          receivedItem: 'delete.receivedItem',
          result: 'delete.result',
          selectedItem: 'delete.selectedItem',
          sentItem: 'delete.sentItem',
        })
      );
    });
  }
  correct(input: PersistenceInputUpdate): Promise<PersistencePromise> {
    return new Promise<PersistencePromise>((resolve) => {
      resolve(
        new PersistencePromise({
          receivedItem: 'correct.receivedItem',
          result: 'correct.result',
          selectedItem: 'correct.selectedItem',
          sentItem: 'correct.sentItem',
        })
      );
    });
  }
  update(input: PersistenceInputUpdate): Promise<PersistencePromise> {
    return new Promise<PersistencePromise>((resolve) => {
      resolve(
        new PersistencePromise({
          receivedItem: 'update.receivedItem',
          result: 'update.result',
          selectedItem: 'update.selectedItem',
          sentItem: 'update.sentItem',
        })
      );
    });
  }
  read(input: PersistenceInputRead): Promise<PersistencePromise> {
    return new Promise<PersistencePromise>((resolve) => {
      resolve(
        new PersistencePromise({
          receivedItem: 'read.receivedItem',
          result: 'read.result',
          selectedItem: 'read.selectedItem',
          sentItem: 'read.sentItem',
        })
      );
    });
  }
}
