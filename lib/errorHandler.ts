// Global error handler
export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorCallbacks: Array<(error: Error, context?: ErrorContext) => void> = [];

  private constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', this.handleGlobalError.bind(this));
      window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));
    }
  }

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  public onError(callback: (error: Error, context?: ErrorContext) => void): void {
    this.errorCallbacks.push(callback);
  }

  private handleGlobalError(event: ErrorEvent): void {
    this.notifyCallbacks(event.error, { type: 'global' });
  }

  private handleUnhandledRejection(event: PromiseRejectionEvent): void {
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
    this.notifyCallbacks(error, { type: 'unhandledRejection' });
    event.preventDefault();
  }

  private notifyCallbacks(error: Error, context?: ErrorContext): void {
    this.errorCallbacks.forEach((callback) => callback(error, context));
    console.error('Error captured:', error, context);
    // Send to Sentry here
    // Sentry.captureException(error, { extra: context })
  }

  public static captureException(error: Error, context?: ErrorContext): void {
    ErrorHandler.getInstance().notifyCallbacks(error, context);
  }

  public static captureMessage(message: string, context?: ErrorContext): void {
    const error = new Error(message);
    ErrorHandler.getInstance().notifyCallbacks(error, context);
  }
}

// Initialize error handler
ErrorHandler.getInstance();

type ErrorContext = {
  type?: string;
} & Record<string, unknown>;
