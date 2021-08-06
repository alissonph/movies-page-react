import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";

export default function Header() {
  return (
    <Link href="/" passHref>
      <Image
        className={styles.image}
        src="/logo.png"
        alt="Logo image"
        width={111}
        height={32}
      />
    </Link>
  );
}
