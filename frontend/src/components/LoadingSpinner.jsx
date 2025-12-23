const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-2  border-emerald-200" />
        <div className="w-20 h-20 rounded-full absolute top-0 left-0 border-t-2 border-emerald-500 animate-spin" />
        <div className="font-medium text-2xl sr-only">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
