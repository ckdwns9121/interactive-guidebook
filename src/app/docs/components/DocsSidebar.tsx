"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import menuTree from "./menuTree";
import Image from "next/image";
import { cn } from "@/utils/cn";

export default function DocsSidebar() {
  const pathname = usePathname();
  // 모바일 아코디언 상태: 카테고리별 펼침 여부
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  // 반응형 체크
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    // 컴포넌트 마운트 시 한번 실행
    checkIsMobile();

    // resize 이벤트에 대한 리스너 등록
    window.addEventListener("resize", checkIsMobile);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // 모바일에서 카테고리 클릭 시 펼침/접힘 토글
  const handleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <nav aria-label="인터랙션 가이드북" className="w-full h-full pt-16 md:pt-0">
      <div className="sticky top-16">
        <div className="relative mb-4 h-32 w-full">
          <Image src="/main.png" alt="main" fill className="w-full" priority />
        </div>
        <h2 className="text-sm font-semibold mb-4 text-[#fff]">프롬프트 인터랙션 가이드북</h2>
        <ul className="flex flex-col space-y-1">
          {menuTree.map((category, idx) => {
            // 모바일: 아코디언, 데스크탑: 항상 펼침
            const expanded = isMobile ? openIdx === idx : true;
            return (
              <li key={category.category} className="mb-4">
                <button
                  type="button"
                  onClick={() => isMobile && handleAccordion(idx)}
                  disabled={!isMobile}
                  className={cn(
                    "w-full mb-1 rounded px-2 py-1 flex items-center justify-between text-left text-lg font-bold text-white transition-colors",
                    isMobile ? "cursor-pointer hover:bg-white/10" : "cursor-default",
                  )}
                  aria-expanded={expanded}
                  aria-controls={`category-panel-${idx}`}
                >
                  <span className="w-full flex items-center justify-between">
                    {category.category}
                    {isMobile && <span className="text-xs text-[#fff]">{expanded ? "▲" : "▼"}</span>}
                  </span>
                </button>
                <ul
                  id={`category-panel-${idx}`}
                  className={cn("space-y-0.5 pl-3 border-l border-[#eaeaea]", expanded ? "block" : "hidden")}
                >
                  {category.items.map((item) => {
                    // 현재 경로와 메뉴 경로가 일치하면 active
                    const active = pathname === item.path;
                    return (
                      <li key={item.id}>
                        <Link href={item.path} className="block" aria-current={active ? "page" : undefined}>
                          <div
                            className={cn(
                              "w-full rounded px-2 py-1 flex justify-start text-base font-medium transition-colors hover:text-black hover:bg-[#fafafa]",
                              active ? "text-black bg-[#fafafa]" : "text-white bg-transparent",
                            )}
                          >
                            <div>{item.name}</div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

// 설명:
// - 현재 경로에 따라 활성화(active) 메뉴 스타일 적용
// - 모바일(최대 768px)에서는 카테고리별 아코디언 UI 적용
// - 접근성: aria-expanded, aria-controls, aria-current 등 사용
// - 반응형/UX 개선 및 친절한 주석 포함
