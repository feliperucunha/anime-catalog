import Link from "next/link";

export default function IndexPage() {
  return (
    <div>
      <p>this is normal page</p>
      <Link href="/about">
        <button>[normal button] go to ant page</button>
      </Link>
    </div>
  );
}
