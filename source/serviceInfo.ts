import { Journaly } from 'journaly';
import { ConnectionOptions } from 'mongoose';
import * as tls from 'tls';
import { DatabaseInfo } from 'flexiblepersistence';
export class ServiceInfo extends DatabaseInfo {
  public journaly: Journaly<any>;

  constructor(
    info: {
      uri?: string;
      database?: string;
      host?: string;
      port?: number | string;
      username?: string;
      password?: string;
      options?: string;
      connectionType?: string;
      ssl?: ConnectionOptions | tls.ConnectionOptions | boolean;
    },
    journaly: Journaly<any>
  ) {
    super(info);
    this.journaly = journaly;
  }
}
