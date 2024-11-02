import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class DetailedLogger extends Logger {
  error(message: string, trace?: string, context?: string) {
    const timestamp = new Date().toISOString();

    const errorMessage = `
    ==== Error Details ====
    Timestamp: ${timestamp}
    Message: ${message}
    Trace: ${trace ?? 'No trace available'}
    Context: ${context ?? 'No context provided'}
    =======================
    `;

    super.error(errorMessage, trace, context);

    if (trace) {
      console.error('Full Stack Trace:', trace);
    }
  }
}
