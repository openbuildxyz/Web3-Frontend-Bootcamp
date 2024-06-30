'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { ConnectButton } from '@rainbow-me/rainbowkit';

import Swap from "./swap";

export default function Home() {
  return (
    <main className={styles.main}>
      <Swap />
    </main>
  );
}
