import { Link } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Form Exercise" },
    { name: "Form Exercise", content: "Form Exercise" },
  ];
};

export default function Index() {
  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
      class=" mt-56 sm:mx-auto sm:w-full sm:max-w-md bg-gradient-to-bl from-orange-300 to-orange-100 py-8 px-6 shadow rounded-lg sm:px-10"
    >
      <h1 class=" mb-16 mt-8 font-medium text-5xl ">Hello</h1>
      <div class=" flex space-x-12 ml-10 mb-5  text-lg">
        <Link to="../form" class=" hover:text-black text-gray-700">
          Sign Up
        </Link>{" "}
        <br />
        <Link to="../profile" class=" hover:text-black text-gray-700  ">
          Profile
        </Link>
      </div>
    </div>
  );
}


export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
      </head>
      <body>
        <div className="mb-3">
          <div className="p-4 rounded shadow-lg border bg-rose-200">
            <div className="text-gray-600 font-bold text-xl mb-2">
              <p>Oops.. Something went wrong..</p>
            </div>
            <p>
              {error.message}
              {error.stack}
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}