/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BaseServiceDefault } from '../../source/index';
import {
  PersistenceInputCreate,
  PersistenceInputDelete,
  PersistenceInputUpdate,
  PersistenceInputRead,
  PersistencePromise,
} from 'flexiblepersistence';
import { settings } from 'ts-mixer';
import { DefaultInitializer } from 'default-initializer';
settings.initFunction = 'init';
export default class TestService extends BaseServiceDefault {
  constructor(initDefault?: DefaultInitializer) {
    super(initDefault);
  }

  close(): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  }
  getPersistenceInfo() {
    return {};
  }
  existent(
    input: PersistenceInputCreate<any>
  ): Promise<PersistencePromise<any>> {
    return new Promise<PersistencePromise<any>>((resolve) => {
      resolve(
        new PersistencePromise<any>({
          receivedItem: 'existent.receivedItem',
          result: 'existent.result',
          selectedItem: 'existent.selectedItem',
          sentItem: 'existent.sentItem',
        })
      );
    });
  }
  create(input: PersistenceInputCreate<any>): Promise<PersistencePromise<any>> {
    return new Promise<PersistencePromise<any>>((resolve) => {
      setTimeout(
        () =>
          resolve(
            new PersistencePromise<any>({
              receivedItem: 'create.receivedItem',
              result: 'create.result',
              selectedItem: 'create.selectedItem',
              sentItem: 'create.sentItem',
            })
          ),
        1000
      );
    });
  }
  nonexistent(input: PersistenceInputDelete): Promise<PersistencePromise<any>> {
    return new Promise<PersistencePromise<any>>((resolve) => {
      resolve(
        new PersistencePromise<any>({
          receivedItem: 'nonexistent.receivedItem',
          result: 'nonexistent.result',
          selectedItem: 'nonexistent.selectedItem',
          sentItem: 'nonexistent.sentItem',
        })
      );
    });
  }
  delete(input: PersistenceInputDelete): Promise<PersistencePromise<any>> {
    return new Promise<PersistencePromise<any>>((resolve) => {
      resolve(
        new PersistencePromise<any>({
          receivedItem: 'delete.receivedItem',
          result: 'delete.result',
          selectedItem: 'delete.selectedItem',
          sentItem: 'delete.sentItem',
        })
      );
    });
  }
  correct(
    input: PersistenceInputUpdate<any>
  ): Promise<PersistencePromise<any>> {
    return new Promise<PersistencePromise<any>>((resolve) => {
      resolve(
        new PersistencePromise<any>({
          receivedItem: 'correct.receivedItem',
          result: 'correct.result',
          selectedItem: 'correct.selectedItem',
          sentItem: 'correct.sentItem',
        })
      );
    });
  }
  update(input: PersistenceInputUpdate<any>): Promise<PersistencePromise<any>> {
    return new Promise<PersistencePromise<any>>((resolve) => {
      resolve(
        new PersistencePromise<any>({
          receivedItem: 'update.receivedItem',
          result: 'update.result',
          selectedItem: 'update.selectedItem',
          sentItem: 'update.sentItem',
        })
      );
    });
  }
  read(input: PersistenceInputRead): Promise<PersistencePromise<any>> {
    return new Promise<PersistencePromise<any>>((resolve) => {
      resolve(
        new PersistencePromise<any>({
          receivedItem: 'read.receivedItem',
          result: 'read.result',
          selectedItem: 'read.selectedItem',
          sentItem: 'read.sentItem',
        })
      );
    });
  }
}
