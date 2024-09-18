import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "./subcomponents/Button";
export default function ErrorPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5 p-2 text-4xl">
      <h1 className="">404</h1>
      <p>Oops! This page does not exist.</p>
      <Link to="/">
        <Button className="rounded-sm bg-green-300 p-2">
          <p>Home Page</p>
        </Button>
      </Link>
    </div>
  );
}
