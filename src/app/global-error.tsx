'use client'; // Error boundaries must be Client Components

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something Global Error!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
