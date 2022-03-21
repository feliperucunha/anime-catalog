import { Button } from "antd";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <p>this button using antd</p>

      <Link href="/" passHref>
        <Button type="primary">back to normal page</Button>
      </Link>
    </div>
  );
}
