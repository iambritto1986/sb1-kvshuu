interface ErrorLog {
  timestamp: Date;
  error: Error;
  userId?: string;
  context?: Record<string, any>;
}

class ErrorLogger {
  private static instance: ErrorLogger;
  private logs: ErrorLog[] = [];
  private readonly maxLogs = 100;

  private constructor() {
    window.onerror = (message, source, lineno, colno, error) => {
      this.logError(error || new Error(message as string));
    };

    window.onunhandledrejection = (event) => {
      this.logError(event.reason);
    };
  }

  public static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  public logError(error: Error, context?: Record<string, any>) {
    const errorLog: ErrorLog = {
      timestamp: new Date(),
      error,
      context
    };

    this.logs.unshift(errorLog);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    // In production, send to error tracking service
    console.error('Error logged:', errorLog);

    return errorLog;
  }

  public getRecentLogs(): ErrorLog[] {
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
  }
}

export const errorLogger = ErrorLogger.getInstance();

export const handleError = (error: Error, context?: Record<string, any>) => {
  errorLogger.logError(error, context);
  
  // Return user-friendly error message
  return {
    message: 'An unexpected error occurred. Please try again or contact support if the problem persists.',
    supportEmail: 'support@performancepro.com',
    errorId: Date.now().toString(36)
  };
};