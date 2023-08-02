
export async function getSource() {
  const user_URL = "https://jsonplaceholder.typicode.com/users";
  const response = await fetch(user_URL);

  const source = await response.json();
  console.log(source);

  return source;
}

// export function ErrorBoundary({ error }) {
//     return (
//       <div>
//         <h1>Error</h1>
//         <p>{error.message}</p>
//         <p>The stack trace is:</p>
//         <pre>{error.stack}</pre>
//       </div>
//     );
//   }

// export function ErrorBoundary() {
//   const error = useRouteError();

//   // when true, this is what used to go to `CatchBoundary`
//   if (isRouteErrorResponse(error)) {
//     return (
//       <div>
//         <h1>Oops</h1>
//         <p>Status: {error.status}</p>
//         <p>{error.data.message}</p>
//       </div>
//     );
//   }

//   // Don't forget to typecheck with your own logic.
//   // Any value can be thrown, not just errors!
//   let errorMessage = "Unknown error";
//   if (isDefinitelyAnError(error)) {
//     errorMessage = error.message;
//   }

//   return (
//     <div>
//       <h1>Uh oh ...</h1>
//       <p>Something went wrong.</p>
//       <pre>{errorMessage}</pre>
//     </div>
//   );
// }