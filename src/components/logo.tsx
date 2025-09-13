import Image from "next/image";
import logo from "../../public/logo.svg";
import Link from "next/link";

function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={className}>
      <Image src={logo} alt="petsoft logo" />
    </Link>
  );
}

export default Logo;
