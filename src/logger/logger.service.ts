import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService extends ConsoleLogger {
  async logToFile(entry) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date())}\t${entry}\n`;

    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      await fsPromises.appendFile(
        path.join(__dirname, '..', '..', 'logs', 'log.txt'),
        formattedEntry,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  log(message: unknown, context?: unknown): void {
    const entry = `${context}\t${message}`;
    this.logToFile(entry);
    super.log(message, context);
  }

  error(message: unknown, stackOrContext: unknown): void {
    const entry = `${stackOrContext}\t${message}`;
    this.logToFile(entry);
    super.error(message, stackOrContext);
  }
}
