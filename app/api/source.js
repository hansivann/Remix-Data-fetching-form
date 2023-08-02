// get data from json placeholder
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