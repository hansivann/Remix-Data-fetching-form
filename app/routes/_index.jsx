import { Link, isRouteErrorResponse, useRouteError } from "@remix-run/react";

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
      className=" mt-56 sm:mx-auto sm:w-full sm:max-w-md bg-gradient-to-bl from-orange-300 to-orange-100 py-8 px-6 shadow rounded-lg sm:px-10"
    >
      <h1 className=" mb-16 mt-8 font-medium text-5xl ">Hello</h1>
      <div className=" flex space-x-12 ml-10 mb-5  text-lg">
        <Link
          to="../form"
          className=" hover:text-black hover:underline text-gray-700"
        >
          Sign Up
        </Link>
        <br />
        <Link
          to="../profile"
          className=" hover:text-black hover:underline text-gray-700"
        >
          Profile
        </Link>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <head>
          <title>Page does not exist</title>
        </head>

        <body className=" m-11">
          <h1 className="  text-3xl ">Oops . . .</h1>
          <div className="ml-11 mt-11 p-4 rounded shadow-lg border bg-rose-100 border-rose-600">
            <p>Sorry, the page you are looking for does not exist</p>
            <p>Status: {error.status} </p>
            <p>{error.data.message}</p>
          </div>
        </body>
      </>
    );
  }

  let errorMessage = "Unknown error";
  if (error) {
    errorMessage = error.message;
  }

  return (
    <div className="m-8 text-2xl ">
      <h1 className="mb-4">Oops..</h1>
      <p className=" pb-11 ">Something went wrong..</p>
      <div className=" sm:mx-auto">
        <pre className=" flex-auto  mt-11 p-4 rounded shadow-lg border w-fit bg-rose-100 border-rose-600">
          {errorMessage}
        </pre>
      </div>
    </div>
  );
}
