"use client";

import { useState } from "react";
import TypingText from "@/components/common/framer-motion/typography/typing-text/TypingText";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import TabInterface from "@/components/common/TabInterface";
import Title from "../../components/Title";

export default function TypographyAnimationPage() {
  // 컨트롤 상태
  const [text, setText] = useState("타이포그래피");
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [delay, setDelay] = useState(0);
  const [cursorColor, setCursorColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("inherit");
  const [variant, setVariant] = useState("h1");
  const [cursorType, setCursorType] = useState("|");
  const [showCursor, setShowCursor] = useState(true);
  const [loop, setLoop] = useState(false);

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

  // 커서 타입 옵션
  const cursorOptions = [
    { value: "|", label: "line" },
    { value: "_", label: "underscore" },
    { value: "█", label: "block" },
    { value: "●", label: "dot" },
  ];

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    const code = typingTextCode;
    navigator.clipboard.writeText(code);
  };

  // Usage 예제 코드
  const usageExample = `import TypingText from "@/components/common/framer-motion/typography/typing-text/TypingText";

// 기본 사용법
<TypingText text="안녕하세요!" />

// 커스텀 설정
<TypingText
  text="타이핑 애니메이션입니다."
  speed={150}
  delay={500}
  className="text-2xl font-bold"
  cursorChar="█"
  showCursor={true}
  loop={true}
  cursorClassName="text-blue-500"
  textClassName="text-white"
/>

// 간단한 설정
<TypingText
  text="Hello World!"
  speed={100}
  className="text-xl"
/>`;

  // 실제 TypingText 컴포넌트 소스 코드
  const typingTextCode = `"use client";
import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorChar?: string;
  showCursor?: boolean;
  loop?: boolean;
  cursorClassName?: string;
  textClassName?: string;
}

/**
 * TypingText 컴포넌트
 * - 텍스트가 타이핑되는 애니메이션 효과를 보여줍니다.
 * - 다양한 타이포그래피 스타일과 커서 옵션을 지원합니다.
 */
export default function TypingText({
  text,
  speed = 100,
  delay = 0,
  className = "",
  cursorChar = "|",
  showCursor = true,
  loop = false,
  cursorClassName = "",
  textClassName = "",
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setIsTyping(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(true);
    }
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (loop) {
      const timer = setTimeout(() => {
        setDisplayText("");
        setCurrentIndex(0);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed, isTyping, loop]);

  return (
    <div className={\`\${className} \${textClassName}\`}>
      <span>{displayText}</span>
      {showCursor && (
        <span className={\`animate-pulse \${cursorClassName}\`}>
          {cursorChar}
        </span>
      )}
    </div>
  );
}`;

  // 컨트롤 패널 컴포넌트
  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* TEXTS */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Texts</label>
            <p className="text-xs text-gray-400">순차적으로 타이핑될 텍스트</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none placeholder-gray-400"
              rows={3}
              placeholder="타이핑될 텍스트를 입력하세요"
            />
          </div>

          {/* TYPING SPEED */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Typing Speed</label>
            <p className="text-xs text-gray-400">각 글자 타이핑 속도(ms)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="20"
                max="500"
                value={typingSpeed}
                onChange={(e) => setTypingSpeed(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={typingSpeed}
                onChange={(e) => setTypingSpeed(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="20"
                max="500"
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

          {/* CURSOR COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Cursor Color</label>
            <p className="text-xs text-gray-400">커서 색상</p>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={cursorColor}
                onChange={(e) => setCursorColor(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={cursorColor}
                onChange={(e) => setCursorColor(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#ffffff"
              />
            </div>
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

          {/* CURSOR TYPE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Cursor Type</label>
            <p className="text-xs text-gray-400">커서 타입</p>
            <select
              value={cursorType}
              onChange={(e) => setCursorType(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {cursorOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* SHOW CURSOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Show Cursor</label>
            <p className="text-xs text-gray-400">커서 표시 여부</p>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showCursor}
                onChange={(e) => setShowCursor(e.target.checked)}
                className="w-4 h-4 text-blue-400 bg-black/20 border-gray-600 rounded focus:ring-blue-400 focus:ring-2"
              />
              <span className="text-sm text-gray-200">커서 표시</span>
            </label>
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
      <Title>타이핑 애니메이션</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">텍스트가 타이핑되는 애니메이션 효과를 적용합니다.</p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="min-h-32 md:min-h-40 flex items-center justify-center">
            <TypingText
              key={`${text}-${typingSpeed}-${delay}-${cursorType}-${showCursor}-${loop}`}
              text={text}
              speed={typingSpeed}
              delay={delay}
              className={getVariantClass(variant)}
              cursorChar={cursorType}
              showCursor={showCursor}
              loop={loop}
              cursorClassName={`text-[${cursorColor}]`}
              textClassName={textColor === "inherit" ? "" : `text-[${textColor}]`}
            />
          </div>
        }
        usageContent={usageExample}
        codeContent={typingTextCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="컴포넌트가 마운트되거나 텍스트가 변경될 때"
        what="텍스트를"
        how="한 글자씩 순차적으로 나타나는 타이핑 애니메이션으로 표현"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="TypingText 컴포넌트를 만들어주세요. 이 컴포넌트는 텍스트가 타이핑되는 애니메이션 효과를 보여줍니다. text prop으로 타이핑할 텍스트를, speed prop으로 타이핑 속도를, delay prop으로 시작 전 대기 시간을 설정할 수 있게 해주세요. className prop으로 스타일링을, cursorChar prop으로 커서 문자를, showCursor prop으로 커서 표시 여부를, loop prop으로 반복 재생을 설정할 수 있게 해주세요. cursorClassName과 textClassName prop으로 커서와 텍스트의 개별 스타일링을 지원해주세요." />
    </div>
  );
}
