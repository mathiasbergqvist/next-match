import { Button } from "@heroui/button";
import Link from "next/link";
import { FaRegSmile } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl text-red-500">Hello, App!</h1>
      <Button
        as={Link}
        href="/members"
        color="primary"
        startContent={<FaRegSmile size={20}></FaRegSmile>}
      >
        Click me
      </Button>
    </div>
  );
}
