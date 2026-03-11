"use client";

import { useState } from "react";
import ScrollMarqueeText from "@/components/common/framer-motion/typography/ScrollMarqueeText";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import TabInterface from "@/components/common/TabInterface";
import Title from "../../components/Title";

export default function ScrollMarqueePage() {
  // 컨트롤 상태
  const [texts, setTexts] = useState([
    "Let's Dive Into This Tutorial",
    "Take It Easy!",
    "Don't Worry Let's Code",
    "Happy Coding",
  ]);
  const [baseSpeed, setBaseSpeed] = useState(50);
  const [fontSize, setFontSize] = useState("clamp(2.5rem, 5vw, 5rem)");
  const [color, setColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [direction, setDirection] = useState(false);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    const code = scrollMarqueeTextCode;
    navigator.clipboard.writeText(code);
  };

  // Usage 예제 코드
  const usageExample = `import ScrollMarqueeText from "@/components/common/framer-motion/typography/ScrollMarqueeText";

// 기본 사용법
<ScrollMarqueeText
  texts={["Let's Dive Into This Tutorial", "Take It Easy!", "Don't Worry Let's Code", "Happy Coding"]}
/>

// 커스텀 설정
<ScrollMarqueeText
  texts={["Custom", "Marquee", "Text"]}
  baseSpeed={80}
  fontSize="clamp(2rem, 4vw, 4rem)"
  color="#3b82f6"
  backgroundColor="#1f2937"
  direction={false}
  className="rounded-lg p-4"
/>

// 오른쪽 방향 마퀴
<ScrollMarqueeText
  texts={["Right", "Direction", "Marquee"]}
  baseSpeed={60}
  direction={true}
  color="#ef4444"
  className="bg-red-500 p-2 rounded"
/>

// 빠른 속도 마퀴
<ScrollMarqueeText
  texts={["Fast", "Speed", "Animation"]}
  baseSpeed={120}
  fontSize="clamp(1.5rem, 3vw, 3rem)"
  color="#22c55e"
  className="bg-green-500 p-3 rounded-md"
/>`;

  // 실제 ScrollMarqueeText 컴포넌트 소스 코드
  const scrollMarqueeTextCode = `"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface ScrollMarqueeTextProps {
  texts: string[];
  baseSpeed?: number;
  fontSize?: string;
  color?: string;
  backgroundColor?: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * direction: false(기본값) = 왼쪽, true = 오른쪽
   */
  direction?: boolean;
}

export default function ScrollMarqueeText({
  texts,
  baseSpeed = 50,
  fontSize = "5vw",
  color = "#000",
  backgroundColor = "transparent",
  className,
  style,
  direction = false, // 기본값: 왼쪽
}: ScrollMarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [duplicatedTexts, setDuplicatedTexts] = useState<string[]>([]);
  const controls = useAnimationControls();
  const [scrollSpeed, setScrollSpeed] = useState(baseSpeed);
  const countRef = useRef(0);

  // 텍스트 배열 2배로 복제
  useEffect(() => {
    setDuplicatedTexts([...texts, ...texts]);
  }, [texts]);

  // 스크롤 이벤트에 따른 속도 조절
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);

      // 스크롤 속도에 따라 마키 속도 증가
      setScrollSpeed(baseSpeed + scrollDiff * 2);

      // 일정 시간 후 원래 속도로 복귀
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollSpeed(baseSpeed);
      }, 150);

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [baseSpeed]);

  // 무한 스크롤 애니메이션 (방향에 따라 x값 증감)
  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      if (!containerRef.current) return;

      const halfWidth = containerRef.current.scrollWidth / 2;

      // 오른쪽 방향일 때는 -halfWidth에서 0까지 이동, 왼쪽은 0에서 -halfWidth까지 이동
      if (direction) {
        // 초기값 세팅 (최초 0이면 -halfWidth로)
        if (countRef.current === 0) {
          countRef.current = -halfWidth;
        }
        countRef.current += scrollSpeed * 0.1;
        if (countRef.current >= 0) {
          countRef.current = -halfWidth;
        }
      } else {
        countRef.current -= scrollSpeed * 0.1;
        if (countRef.current <= -halfWidth) {
          countRef.current = 0;
        }
      }

      controls.set({ x: countRef.current });
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [scrollSpeed, controls, direction]);

  return (
    <div
      ref={containerRef}
      className={twMerge("w-full overflow-hidden whitespace-nowrap relative", className)}
      style={{ backgroundColor }}
    >
      <motion.div
        animate={controls}
        className="inline-block whitespace-nowrap py-4"
        style={{
          fontSize,
          color,
          ...style,
        }}
      >
        {duplicatedTexts.map((text, index) => (
          <span key={index} className="mr-8">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}`;

  // 텍스트 배열을 문자열로 변환/파싱하는 헬퍼 함수
  const textsToString = (texts: string[]) => texts.join("\n");
  const stringToTexts = (str: string) => str.split("\n").filter((text) => text.trim() !== "");

  // 컨트롤 패널 컴포넌트
  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* TEXTS */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Texts</label>
            <p className="text-xs text-gray-400">마키에 표시될 텍스트 (줄바꿈으로 구분)</p>
            <textarea
              value={textsToString(texts)}
              onChange={(e) => setTexts(stringToTexts(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none placeholder-gray-400"
              rows={4}
              placeholder="각 줄에 하나씩 텍스트를 입력하세요"
            />
          </div>

          {/* BASE SPEED */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Base Speed</label>
            <p className="text-xs text-gray-400">기본 스크롤 속도</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="10"
                max="200"
                value={baseSpeed}
                onChange={(e) => setBaseSpeed(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={baseSpeed}
                onChange={(e) => setBaseSpeed(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="10"
                max="200"
              />
            </div>
          </div>

          {/* FONT SIZE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Font Size</label>
            <p className="text-xs text-gray-400">텍스트 크기 (CSS 단위)</p>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="clamp(1rem, 2vw, 2rem)" className="bg-gray-800 text-white">
                Small (clamp(1rem, 2vw, 2rem))
              </option>
              <option value="clamp(1.5rem, 3vw, 3rem)" className="bg-gray-800 text-white">
                Medium (clamp(1.5rem, 3vw, 3rem))
              </option>
              <option value="clamp(2.5rem, 5vw, 5rem)" className="bg-gray-800 text-white">
                Large (clamp(2.5rem, 5vw, 5rem))
              </option>
              <option value="clamp(3rem, 8vw, 8rem)" className="bg-gray-800 text-white">
                Extra Large (clamp(3rem, 8vw, 8rem))
              </option>
              <option value="2rem" className="bg-gray-800 text-white">
                Fixed 2rem
              </option>
              <option value="4rem" className="bg-gray-800 text-white">
                Fixed 4rem
              </option>
              <option value="6rem" className="bg-gray-800 text-white">
                Fixed 6rem
              </option>
            </select>
          </div>

          {/* TEXT COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Text Color</label>
            <p className="text-xs text-gray-400">텍스트 색상</p>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#ffffff"
              />
            </div>
          </div>

          {/* BACKGROUND COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Background Color</label>
            <p className="text-xs text-gray-400">배경 색상</p>
            <div className="flex items-center space-x-3">
              <select
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="transparent" className="bg-gray-800 text-white">
                  Transparent
                </option>
                <option value="#000000" className="bg-gray-800 text-white">
                  Black
                </option>
                <option value="#ffffff" className="bg-gray-800 text-white">
                  White
                </option>
                <option value="#ef4444" className="bg-gray-800 text-white">
                  Red
                </option>
                <option value="#f97316" className="bg-gray-800 text-white">
                  Orange
                </option>
                <option value="#eab308" className="bg-gray-800 text-white">
                  Yellow
                </option>
                <option value="#22c55e" className="bg-gray-800 text-white">
                  Green
                </option>
                <option value="#3b82f6" className="bg-gray-800 text-white">
                  Blue
                </option>
                <option value="#8b5cf6" className="bg-gray-800 text-white">
                  Purple
                </option>
              </select>
            </div>
          </div>

          {/* DIRECTION */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Direction</label>
            <p className="text-xs text-gray-400">스크롤 방향</p>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="direction"
                  checked={!direction}
                  onChange={() => setDirection(false)}
                  className="w-4 h-4 text-blue-600 border-gray-600 focus:ring-blue-500 focus:ring-2 bg-black/20"
                />
                <span className="text-sm text-gray-200">← 왼쪽</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="direction"
                  checked={direction}
                  onChange={() => setDirection(true)}
                  className="w-4 h-4 text-blue-600 border-gray-600 focus:ring-blue-500 focus:ring-2 bg-black/20"
                />
                <span className="text-sm text-gray-200">오른쪽 →</span>
              </label>
            </div>
          </div>
        </div>

        {/* 리셋 버튼 */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              setTexts(["Let's Dive Into This Tutorial", "Take It Easy!", "Don't Worry Let's Code", "Happy Coding"]);
              setBaseSpeed(50);
              setFontSize("clamp(2.5rem, 5vw, 5rem)");
              setColor("#ffffff");
              setBackgroundColor("transparent");
              setDirection(false);
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
          >
            Reset to Default
          </button>
        </div>
      </ControlPanelWrapper>
    </div>
  );

  return (
    <div>
      <Title>마퀴 텍스트</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        텍스트가 무한히 스크롤되는 마퀴 효과를 적용하며, 페이지 스크롤에 따라 속도가 동적으로 변화합니다.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="relative h-[60vh] border-none bg-gradient-to-b from-gray-900 to-gray-800 bg-cover bg-center no-repeat shadow-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full max-w-4xl mx-auto px-4">
                <ScrollMarqueeText
                  key={`${texts.join("-")}-${baseSpeed}-${fontSize}-${color}-${backgroundColor}-${direction}`}
                  texts={texts}
                  baseSpeed={baseSpeed}
                  fontSize={fontSize}
                  color={color}
                  backgroundColor={backgroundColor}
                  direction={direction}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        }
        usageContent={usageExample}
        codeContent={scrollMarqueeTextCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="컴포넌트가 마운트되거나 스크롤 이벤트가 발생할 때"
        what="텍스트 배열을"
        how="무한 스크롤 애니메이션으로 표현하고, 페이지 스크롤 속도에 따라 마퀴 속도를 동적으로 조절"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="ScrollMarqueeText 컴포넌트를 만들어주세요. 이 컴포넌트는 텍스트가 무한히 스크롤되는 마퀴 효과를 보여줍니다. texts prop으로 마퀴할 텍스트 배열을, baseSpeed prop으로 기본 스크롤 속도를, fontSize prop으로 텍스트 크기를, color prop으로 텍스트 색상을, backgroundColor prop으로 배경 색상을, direction prop으로 스크롤 방향을 설정할 수 있게 해주세요. 텍스트 배열을 2배로 복제하여 무한 스크롤을 구현하고, 페이지 스크롤 이벤트를 감지하여 마퀴 속도를 동적으로 조절해주세요. framer-motion의 useAnimationControls와 requestAnimationFrame을 활용하여 부드러운 애니메이션을 구현해주세요." />

      {/* 응용 예제 섹션 */}
      <section className="mb-8 mt-12">
        <h2 className="mb-4 text-xl md:text-2xl font-medium text-white">응용 예제</h2>
        <div className="relative h-[60vh] border-none bg-gradient-to-b from-gray-900 to-gray-800 bg-cover bg-center no-repeat shadow-lg overflow-hidden">
          <div>
            <div className="relative rotate-5 transform bg-red-500">
              <ScrollMarqueeText
                texts={["Let's Dive Into This Tutorial", "Take It Easy!", "Don't Worry Let's Code", "Happy Coding"]}
                baseSpeed={50}
                fontSize="clamp(2.5rem, 5vw, 5rem)"
                color="#fff"
                className="rounded-md bg-red-500 p-4 font-bold tracking-tighter"
              />
            </div>
            <div className="relative rotate-5 transform bg-orange-500">
              <ScrollMarqueeText
                texts={["Let's Dive Into This Tutorial", "Take It Easy!", "Don't Worry Let's Code", "Happy Coding"]}
                baseSpeed={50}
                fontSize="clamp(2.5rem, 5vw, 5rem)"
                color="#fff"
                direction={true}
                className="rounded-md bg-orange-500 p-4 font-bold tracking-tighter"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
