/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// file deepcode ignore no-any: any needed
import { BaseService } from '../../source/index';
import {
  IInputCreate,
  IInputDelete,
  IInputUpdate,
  IInputRead,
  IOutput,
} from 'flexiblepersistence';
import { settings } from 'ts-mixer';
import { IDefault } from '@flexiblepersistence/default-initializer';
settings.initFunction = 'init';
export default class TestService extends BaseService<unknown, unknown> {
  constructor(initDefault?: IDefault) {
    super(initDefault);
  }

  close(): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  }
  getPersistenceInfo() {
    return {};
  }
  existent(input: IInputCreate<any>): Promise<IOutput<unknown, unknown>> {
    return new Promise<IOutput<unknown, unknown>>((resolve) => {
      resolve({
        receivedItem: 'existent.receivedItem',
        result: 'existent.result',
        selectedItem: 'existent.selectedItem',
        sentItem: 'existent.sentItem',
      });
    });
  }
  create(input: IInputCreate<any>): Promise<IOutput<unknown, unknown>> {
    return new Promise<IOutput<unknown, unknown>>((resolve) => {
      setTimeout(
        () =>
          resolve({
            receivedItem: 'create.receivedItem',
            result: 'create.result',
            selectedItem: 'create.selectedItem',
            sentItem: 'create.sentItem',
          }),
        1000
      );
    });
  }
  nonexistent(input: IInputDelete): Promise<IOutput<unknown, unknown>> {
    return new Promise<IOutput<unknown, unknown>>((resolve) => {
      resolve({
        receivedItem: 'nonexistent.receivedItem',
        result: 'nonexistent.result',
        selectedItem: 'nonexistent.selectedItem',
        sentItem: 'nonexistent.sentItem',
      });
    });
  }
  delete(input: IInputDelete): Promise<IOutput<unknown, unknown>> {
    return new Promise<IOutput<unknown, unknown>>((resolve) => {
      resolve({
        receivedItem: 'delete.receivedItem',
        result: 'delete.result',
        selectedItem: 'delete.selectedItem',
        sentItem: 'delete.sentItem',
      });
    });
  }
  correct(input: IInputUpdate<any>): Promise<IOutput<unknown, unknown>> {
    return new Promise<IOutput<unknown, unknown>>((resolve) => {
      resolve({
        receivedItem: 'correct.receivedItem',
        result: 'correct.result',
        selectedItem: 'correct.selectedItem',
        sentItem: 'correct.sentItem',
      });
    });
  }
  update(input: IInputUpdate<any>): Promise<IOutput<unknown, unknown>> {
    return new Promise<IOutput<unknown, unknown>>((resolve) => {
      resolve({
        receivedItem: 'update.receivedItem',
        result: 'update.result',
        selectedItem: 'update.selectedItem',
        sentItem: 'update.sentItem',
      });
    });
  }
  read(input: IInputRead): Promise<IOutput<unknown, unknown>> {
    return new Promise<IOutput<unknown, unknown>>((resolve) => {
      resolve({
        receivedItem: 'read.receivedItem',
        result: 'read.result',
        selectedItem: 'read.selectedItem',
        sentItem: 'read.sentItem',
      });
    });
  }
}
