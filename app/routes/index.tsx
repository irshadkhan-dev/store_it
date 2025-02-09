import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="w-full flex items-center justify-center">
      <Link to="/dashboard">Go to dashboard</Link>
      <Link to="/images">Go to images</Link>
    </div>
  );
}

export default Home;
