function ErrorAllNotes({ error }: { error: Error }) {
  return (
    <div className="flex min-h-[80dvh] items-center justify-center bg-slate-50">
      <div className="text-center bg-white rounded-lg shadow-xl p-8 max-w-md border border-slate-200">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <p className="text-2xl font-bold text-red-600 mb-2">
          Error loading notes
        </p>
        <p className="text-slate-600">{error.message}</p>
      </div>
    </div>
  )
}

export default ErrorAllNotes
