/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PersistenceAdapter,
  PersistenceInfo,
  PersistencePromise,
  // RelationValueServiceHandler,
  // SelectedItemValue,
  PersistenceInputCreate,
  PersistenceInputUpdate,
  PersistenceInputRead,
  PersistenceInputDelete,
} from 'flexiblepersistence';
export class ServiceHandler implements PersistenceAdapter {
  private persistenceInfo: PersistenceInfo;

  constructor(persistenceInfo: PersistenceInfo) {
    this.persistenceInfo = persistenceInfo;
  }
  close(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  private getFormattedScheme(scheme: string): string {
    return scheme.charAt(0).toUpperCase() + scheme.slice(1);
  }

  public async correct(
    input: PersistenceInputUpdate
  ): Promise<PersistencePromise> {
    return (
      await this.persistenceInfo.journaly.publish(
        this.getFormattedScheme(input.scheme) + 'Service.correct',
        input
      )
    )[0];
  }

  public async nonexistent(
    input: PersistenceInputDelete
  ): Promise<PersistencePromise> {
    return (
      await this.persistenceInfo.journaly.publish(
        this.getFormattedScheme(input.scheme) + 'Service.nonexistent',
        input
      )
    )[0];
  }

  public async existent(
    input: PersistenceInputCreate
  ): Promise<PersistencePromise> {
    return (
      await this.persistenceInfo.journaly.publish(
        this.getFormattedScheme(input.scheme) + 'Service.existent',
        input
      )
    )[0];
  }

  public async create(
    input: PersistenceInputCreate
  ): Promise<PersistencePromise> {
    return (
      await this.persistenceInfo.journaly.publish(
        this.getFormattedScheme(input.scheme) + 'Service.create',
        input
      )
    )[0];
  }
  public async update(
    input: PersistenceInputUpdate
  ): Promise<PersistencePromise> {
    return (
      await this.persistenceInfo.journaly.publish(
        this.getFormattedScheme(input.scheme) + 'Service.update',
        input
      )
    )[0];
  }
  public async read(input: PersistenceInputRead): Promise<PersistencePromise> {
    return (
      await this.persistenceInfo.journaly.publish(
        this.getFormattedScheme(input.scheme) + 'Service.read',
        input
      )
    )[0];
  }
  public async delete(
    input: PersistenceInputDelete
  ): Promise<PersistencePromise> {
    return (
      await this.persistenceInfo.journaly.publish(
        this.getFormattedScheme(input.scheme) + 'Service.delete',
        input
      )
    )[0];
  }

  public getPersistenceInfo(): PersistenceInfo {
    return this.persistenceInfo;
  }
}
