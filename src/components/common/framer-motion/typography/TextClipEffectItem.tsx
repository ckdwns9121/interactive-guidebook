"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TextClipEffect.module.css";

gsap.registerPlugin(ScrollTrigger);

export type TextClipEffectItemProps = {
  main: string;
  sub: React.ReactNode;
  className?: string;
  clipColor?: string;
  showMarkers?: boolean;
  startPosition?: string;
  endPosition?: string;
  scrubEffect?: boolean;
};

export default function TextClipEffectItem({
  main,
  sub,
  className,
  clipColor = "#fff",
  showMarkers = false,
  startPosition = "center 80%",
  endPosition = "center 20%",
  scrubEffect = true,
}: TextClipEffectItemProps) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const textElement = textRef.current;

    if (textElement) {
      // 기존 ScrollTrigger 제거
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === textElement) {
          trigger.kill();
        }
      });

      gsap.to(textElement, {
        backgroundSize: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: textElement,
          start: startPosition,
          end: endPosition,
          scrub: scrubEffect,
          markers: showMarkers,
        },
      });
    }

    return () => {
      // 컴포넌트 언마운트 시 ScrollTrigger 정리
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === textElement) {
          trigger.kill();
        }
      });
    };
  }, [showMarkers, startPosition, endPosition, scrubEffect]);

  return (
    <h1 ref={textRef} className={`${styles.text} ${className}`}>
      {main}
      <span className={styles.span} style={{ backgroundColor: clipColor }}>
        {sub}
      </span>
    </h1>
  );
}
