import { Link, useRouteError, isRouteErrorResponse } from "@remix-run/react";

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

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p> 
      </div>
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
      <div className=" mt-4 sm:mx-auto sm:w-full sm:max-w-md ">
        <pre className=" mt-4 ml-4 text-rose-400 text-sm">{errorMessage}</pre>
      </div>
    </div>
  );
}