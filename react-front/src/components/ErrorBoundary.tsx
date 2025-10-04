import { Component, ErrorInfo, ReactNode } from 'react';
import { clearAllAuth } from '../auth';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onAuthError?: () => void;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ error, errorInfo });
        
        if (this.isAuthError(error)) {
            clearAllAuth();
            if (this.props.onAuthError) {
                this.props.onAuthError();
            } else {
                window.location.href = '/login';
            }
        }
        
        if (process.env.NODE_ENV === 'development') {
            console.error('ErrorBoundary caught an error:', error, errorInfo);
        }
    }

    private isAuthError(error: Error): boolean {
        const authErrorMessages = [
            'authentication failed',
            'token expired',
            'unauthorized',
            '401',
            '403',
        ];
        
        return authErrorMessages.some(msg => 
            error.message.toLowerCase().includes(msg.toLowerCase())
        );
    }

    retry = () => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center min-h-screen p-4">
                    <div className="text-center max-w-md">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Something went wrong
                        </h1>
                        <p className="text-gray-600 mb-6">
                            We're sorry, but something unexpected happened. Please try again.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={this.retry}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Go Home
                            </button>
                        </div>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-6 text-left">
                                <summary className="cursor-pointer text-sm text-gray-500">
                                    Error Details (Development)
                                </summary>
                                <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
