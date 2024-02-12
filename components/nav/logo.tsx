import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
    return (
        <Link
        href="/"
        >
            <Image
                height={130}
                width={130}
                src="/logo.svg"
                alt="logo"
            />
        </Link>
    )
}