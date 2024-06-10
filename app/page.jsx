import Link from "next/link";

export default function Page() {
  return (
    <>
      ir al dashboard: 
      <Link href={"/dashboard"}>click</Link>
    </>
  );
}