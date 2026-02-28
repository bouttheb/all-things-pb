import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neutral-600">404</h1>
        <p className="mt-4 text-neutral-400">This page doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
