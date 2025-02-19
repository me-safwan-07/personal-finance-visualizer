import { Button } from "@/components/ui/button";
import connectDB from "@/utils/db";
import Image from "next/image";

connectDB();

export default function Home() {
  return (
    <>

      <Button>Click me</Button>
    </>
  );
}
