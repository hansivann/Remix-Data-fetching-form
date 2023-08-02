import { Link } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Form Exercise" },
    { name: "Form Exercise", content: "Form Exercise" },
  ];
};

// export async function loader({request}){
//   //if cookie present = welcome back,
//   //if first time, send first message

//     const cookieHeader = request.headers.get("Cookie");
//     const hasUserVisitedPage = await hasUserVisited.parse(cookieHeader);

//     const message = hasUserVisitedPage ? "Welcome back!" : "First time"

//     return json(
//       {message},
//       {
//         headers: {
//           "Set-Cookie": await hasUserVisited.serialize({}),
//         },
//       }
//     );

// }

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

// cookie example

// export default function Index(){
//   const data = useLoaderData();
//   return <pre>{JSON.stringify(data, null ,2)}</pre>;
// }
