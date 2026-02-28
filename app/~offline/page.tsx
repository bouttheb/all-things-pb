"use client";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">📡</div>
        <h1 className="text-xl font-bold text-white">You&apos;re offline</h1>
        <p className="mt-2 text-neutral-400 text-sm">
          Please reconnect to browse All Things Benjamin Robinson.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-block mt-6 px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
