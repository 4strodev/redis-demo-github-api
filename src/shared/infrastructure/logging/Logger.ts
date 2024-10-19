export enum Levels {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

export type LogMetadata = { [key: string]: any };

export abstract class Logger {
  public abstract log(
    level: Levels,
    message: string,
    metadata?: LogMetadata,
  ): void;

  public error(message: string, metadata?: LogMetadata): void {
    this.log(Levels.ERROR, message, metadata);
  }
  public warn(message: string, metadata?: LogMetadata): void {
    this.log(Levels.WARN, message, metadata);
  }
  public info(message: string, metadata?: LogMetadata): void {
    this.log(Levels.INFO, message, metadata);
  }
  public debug(message: string, metadata?: LogMetadata): void {
    this.log(Levels.DEBUG, message, metadata);
  }
}
