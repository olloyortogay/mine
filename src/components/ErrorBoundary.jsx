import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-900 p-8">
                    <h1 className="text-4xl font-bold mb-4">Biror narsa noto'g'ri ketdi</h1>
                    <p className="text-xl mb-8">Kechirasiz, xatolik yuz berdi.</p>
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full overflow-auto border border-red-200">
                        <h2 className="text-lg font-bold mb-2">Xato haqida:</h2>
                        <pre className="text-sm font-mono text-red-600 whitespace-pre-wrap">
                            {this.state.error && this.state.error.toString()}
                        </pre>
                        <h2 className="text-lg font-bold mt-4 mb-2">Stack Trace:</h2>
                        <pre className="text-xs font-mono text-gray-600 whitespace-pre-wrap">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition"
                    >
                        Sahifani yangilash
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
