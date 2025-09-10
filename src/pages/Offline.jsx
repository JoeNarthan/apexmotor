// src/components/common/Offline.jsx
export default function Offline() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold">⚡ You’re offline</h1>
      <p className="mt-2 text-gray-500">Check your internet and try again.</p>
      <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Retry
      </button>
    </div>
  );
}
