"use client";
import { useState } from "react";
import TextScramble from "@/components/common/framer-motion/typography/TextScramble";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import TabInterface from "@/components/common/TabInterface";
import Title from "../../components/Title";

export default function ScrambleTextPage() {
  // 컨트롤 상태
  const [text, setText] = useState("스크램블 효과");
  const [speed, setSpeed] = useState(50);
  const [delay, setDelay] = useState(100);
  const [loop, setLoop] = useState(true);
  const [pauseTime, setPauseTime] = useState(1000);
  const [characters, setCharacters] = useState(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
  );
  const [revealSpeed, setRevealSpeed] = useState(100);
  const [trigger, setTrigger] = useState<"auto" | "hover" | "manual">("auto");
  const [textColor, setTextColor] = useState("inherit");
  const [variant, setVariant] = useState("h1");

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // Typography variant 클래스
  const getVariantClass = (variant: string) => {
    switch (variant) {
      case "h1":
        return "text-3xl md:text-5xl lg:text-6xl font-bold";
      case "h2":
        return "text-2xl md:text-4xl lg:text-5xl font-semibold";
      case "h3":
        return "text-xl md:text-3xl lg:text-4xl font-medium";
      case "h4":
        return "text-lg md:text-2xl lg:text-3xl font-medium";
      case "body":
        return "text-base md:text-lg";
      case "small":
        return "text-sm md:text-base";
      default:
        return "text-xl md:text-3xl lg:text-4xl font-medium";
    }
  };

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    const code = textScrambleCode;
    navigator.clipboard.writeText(code);
  };

  // Usage 예제 코드
  const usageExample = `import TextScramble from "@/components/common/framer-motion/typography/TextScramble";

// 기본 사용법
<TextScramble text="스크램블 효과" />

// 커스텀 설정
<TextScramble
  text="고급 스크램블 효과입니다."
  speed={30}
  delay={500}
  loop={true}
  pauseTime={2000}
  characters="!@#$%^&*()_+-=[]{}|;:,.<>?"
  revealSpeed={150}
  trigger="hover"
  className="text-2xl font-bold"
/>

// 간단한 설정
<TextScramble
  text="Hello World!"
  speed={50}
  loop={true}
  className="text-xl"
/>`;

  // 실제 TextScramble 컴포넌트 소스 코드
  const textScrambleCode = `"use client";
import { useState, useEffect } from "react";

interface TextScrambleProps {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  pauseTime?: number;
  characters?: string;
  revealSpeed?: number;
  trigger?: "auto" | "hover" | "manual";
  className?: string;
}

/**
 * TextScramble 컴포넌트
 * - 텍스트가 스크램블되는 애니메이션 효과를 보여줍니다.
 * - 다양한 트리거 방식과 스크램블 옵션을 지원합니다.
 */
export default function TextScramble({
  text,
  speed = 50,
  delay = 100,
  loop = false,
  pauseTime = 1000,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
  revealSpeed = 100,
  trigger = "auto",
  className = "",
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrambleText = (text: string) => {
    return text
      .split("")
      .map(() => characters[Math.floor(Math.random() * characters.length)])
      .join("");
  };

  const startScramble = () => {
    setIsScrambling(true);
    setCurrentIndex(0);
    setDisplayText(scrambleText(text));
  };

  const revealText = () => {
    if (currentIndex < text.length) {
      setTimeout(() => {
        setDisplayText(
          text.slice(0, currentIndex + 1) + scrambleText(text.slice(currentIndex + 1))
        );
        setCurrentIndex(currentIndex + 1);
      }, revealSpeed);
    } else {
      setIsScrambling(false);
      if (loop) {
        setTimeout(() => {
          startScramble();
        }, pauseTime);
      }
    }
  };

  useEffect(() => {
    if (trigger === "auto") {
      const timer = setTimeout(() => {
        startScramble();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [trigger, delay, text]);

  useEffect(() => {
    if (isScrambling && currentIndex < text.length) {
      revealText();
    }
  }, [isScrambling, currentIndex, text, revealSpeed, loop, pauseTime]);

  const handleMouseEnter = () => {
    if (trigger === "hover" && !isScrambling) {
      startScramble();
    }
  };

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ cursor: trigger === "hover" ? "pointer" : "default" }}
    >
      {displayText}
    </div>
  );
}`;

  // 컨트롤 패널 컴포넌트
  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* TEXT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Text</label>
            <p className="text-xs text-gray-400">스크램블될 텍스트</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none placeholder-gray-400"
              rows={3}
              placeholder="스크램블될 텍스트를 입력하세요"
            />
          </div>

          {/* SCRAMBLE SPEED */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Scramble Speed</label>
            <p className="text-xs text-gray-400">스크램블 속도(ms)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="10"
                max="200"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="10"
                max="200"
              />
            </div>
          </div>

          {/* START DELAY */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Start Delay</label>
            <p className="text-xs text-gray-400">애니메이션 시작 전 대기 시간(ms)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="3000"
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0"
                max="3000"
              />
            </div>
          </div>

          {/* REVEAL SPEED */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Reveal Speed</label>
            <p className="text-xs text-gray-400">각 문자가 복원되는 속도</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="50"
                max="300"
                value={revealSpeed}
                onChange={(e) => setRevealSpeed(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={revealSpeed}
                onChange={(e) => setRevealSpeed(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="50"
                max="300"
              />
            </div>
          </div>

          {/* PAUSE TIME */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Pause Time</label>
            <p className="text-xs text-gray-400">반복 시 일시정지 시간(ms)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="500"
                max="5000"
                value={pauseTime}
                onChange={(e) => setPauseTime(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={pauseTime}
                onChange={(e) => setPauseTime(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="500"
                max="5000"
              />
            </div>
          </div>

          {/* CHARACTERS */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Characters</label>
            <p className="text-xs text-gray-400">스크램블에 사용할 문자셋</p>
            <textarea
              value={characters}
              onChange={(e) => setCharacters(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none placeholder-gray-400"
              rows={2}
              placeholder="스크램블에 사용할 문자들을 입력하세요"
            />
          </div>

          {/* TEXT COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Text Color</label>
            <p className="text-xs text-gray-400">텍스트 색상</p>
            <div className="flex items-center space-x-3">
              <select
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="inherit" className="bg-gray-800 text-white">
                  inherit
                </option>
                <option value="#000000" className="bg-gray-800 text-white">
                  Black
                </option>
                <option value="#ffffff" className="bg-gray-800 text-white">
                  White
                </option>
                <option value="#3b82f6" className="bg-gray-800 text-white">
                  Blue
                </option>
                <option value="#10b981" className="bg-gray-800 text-white">
                  Green
                </option>
                <option value="#f59e0b" className="bg-gray-800 text-white">
                  Orange
                </option>
                <option value="#ef4444" className="bg-gray-800 text-white">
                  Red
                </option>
              </select>
            </div>
          </div>

          {/* VARIANT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Variant</label>
            <p className="text-xs text-gray-400">Typography 변형</p>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="h1" className="bg-gray-800 text-white">
                H1 - Heading 1
              </option>
              <option value="h2" className="bg-gray-800 text-white">
                H2 - Heading 2
              </option>
              <option value="h3" className="bg-gray-800 text-white">
                H3 - Heading 3
              </option>
              <option value="h4" className="bg-gray-800 text-white">
                H4 - Heading 4
              </option>
              <option value="body" className="bg-gray-800 text-white">
                Body - 본문
              </option>
              <option value="small" className="bg-gray-800 text-white">
                Small - 소형
              </option>
            </select>
          </div>

          {/* TRIGGER */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Trigger</label>
            <p className="text-xs text-gray-400">트리거 방식</p>
            <select
              value={trigger}
              onChange={(e) => setTrigger(e.target.value as "auto" | "hover" | "manual")}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="auto" className="bg-gray-800 text-white">
                Auto - 자동 시작
              </option>
              <option value="hover" className="bg-gray-800 text-white">
                Hover - 마우스 호버 시
              </option>
              <option value="manual" className="bg-gray-800 text-white">
                Manual - 수동 제어
              </option>
            </select>
          </div>

          {/* LOOP */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Loop</label>
            <p className="text-xs text-gray-400">반복 재생</p>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={loop}
                onChange={(e) => setLoop(e.target.checked)}
                className="w-4 h-4 text-blue-400 bg-black/20 border-gray-600 rounded focus:ring-blue-400 focus:ring-2"
              />
              <span className="text-sm text-gray-200">반복 재생</span>
            </label>
          </div>
        </div>
      </ControlPanelWrapper>
    </div>
  );

  return (
    <div>
      <Title>스크램블 텍스트</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">텍스트가 스크램블되는 애니메이션 효과를 적용합니다.</p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="min-h-32 md:min-h-40 flex items-center justify-center">
            <TextScramble
              text={text}
              speed={speed}
              delay={delay}
              loop={loop}
              pauseTime={pauseTime}
              characters={characters}
              revealSpeed={revealSpeed}
              trigger={trigger}
              className={`${getVariantClass(variant)} ${textColor === "inherit" ? "" : `text-[${textColor}]`}`}
            />
          </div>
        }
        usageContent={usageExample}
        codeContent={textScrambleCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="컴포넌트가 마운트되거나 호버 이벤트가 발생할 때"
        what="텍스트를"
        how="랜덤 문자로 스크램블한 후 원래 텍스트로 순차적으로 복원하는 애니메이션으로 표현"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="TextScramble 컴포넌트를 만들어주세요. 이 컴포넌트는 텍스트가 스크램블되는 애니메이션 효과를 보여줍니다. text prop으로 스크램블할 텍스트를, speed prop으로 스크램블 속도를, delay prop으로 시작 전 대기 시간을 설정할 수 있게 해주세요. loop prop으로 반복 재생을, pauseTime prop으로 반복 시 일시정지 시간을, characters prop으로 스크램블에 사용할 문자셋을, revealSpeed prop으로 각 문자가 복원되는 속도를 설정할 수 있게 해주세요. trigger prop으로 auto, hover, manual 트리거 방식을 지원해주세요." />
    </div>
  );
}
