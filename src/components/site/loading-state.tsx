interface LoadingStateProps {
  label?: string;
}

export const LoadingState = ({ label = "Loading content..." }: LoadingStateProps) => (
  <div className="mx-auto my-12 max-w-3xl rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-600">
    {label}
  </div>
);
