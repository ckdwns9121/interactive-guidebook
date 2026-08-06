"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0 hidden sm:block">
        <Image
          src="/main.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 block sm:hidden">
        <Image
          src="/mobile.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="relative z-10 flex h-full w-full items-end justify-center pb-20 md:pb-32">
        <MotionLink
          href="/docs"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block rounded-full bg-white/80 px-8 py-4 text-lg font-bold text-black shadow-lg backdrop-blur-sm transition-all duration-200 ease-in-out hover:bg-white"
        >
          시작하기
        </MotionLink>
      </div>
    </main>
  );
}
