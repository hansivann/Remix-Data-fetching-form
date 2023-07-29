import { Link } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Form Exercise" },
    { name: "description", content: "Form Exercise" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Hello</h1>
      <Link to="/form">Sign Up</Link> <br />
      <Link to="/profile">Profile</Link>
    </div>
  );
}
