function LoaderAllNotes() {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-teal-500 mx-auto mb-4"></div>
        <p className="text-slate-700 font-medium">Loading your notes...</p>
      </div>
    </div>
  )
}

export default LoaderAllNotes
