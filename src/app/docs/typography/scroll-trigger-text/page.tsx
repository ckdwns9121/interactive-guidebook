"use client";
import { useState } from "react";
import ScrollTriggerText from "@/components/common/framer-motion/typography/ScrollTriggerText";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import TabInterface from "@/components/common/TabInterface";
import Title from "../../components/Title";
import { SCROLL_TRIGGER_TEXT_DEFAULTS, FONT_SIZE_OPTIONS, COLOR_PRESETS } from "./constants";

export default function ScrollTriggerTextPage() {
  // 컨트롤 상태
  const [text, setText] = useState(SCROLL_TRIGGER_TEXT_DEFAULTS.text);
  const [fromColor, setFromColor] = useState(SCROLL_TRIGGER_TEXT_DEFAULTS.fromColor);
  const [toColor, setToColor] = useState(SCROLL_TRIGGER_TEXT_DEFAULTS.toColor);
  const [duration, setDuration] = useState(SCROLL_TRIGGER_TEXT_DEFAULTS.duration);
  const [fontSize, setFontSize] = useState(SCROLL_TRIGGER_TEXT_DEFAULTS.fontSize);
  const [initialScale, setInitialScale] = useState(SCROLL_TRIGGER_TEXT_DEFAULTS.initialScale);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    navigator.clipboard.writeText(scrollTriggerTextCode);
  };

  // Usage 예제 코드
  const usageExample = `import ScrollTriggerText from "@/components/common/framer-motion/typography/ScrollTriggerText";

// 기본 사용법
<ScrollTriggerText
  text="스크롤에 따라 텍스트 색상이 변합니다."
  fromColor="#888888"
  toColor="#FFD600"
/>

// 커스텀 설정
<ScrollTriggerText
  text="Custom scroll trigger text with different colors"
  fromColor="#003b9a"
  toColor="#dc2626"
  duration={1.2}
  fontSize="clamp(2rem, 6vw, 5rem)"
  initialScale={0.6}
  className="font-bold"
/>

// 빠른 애니메이션
<ScrollTriggerText
  text="Fast animation with quick color change"
  fromColor="#059669"
  toColor="#7c3aed"
  duration={0.3}
  fontSize="clamp(1.5rem, 4vw, 3rem)"
  initialScale={0.9}
/>

// 긴 텍스트
<ScrollTriggerText
  text="This is a very long text that demonstrates how the scroll trigger effect works with multiple characters and words. Each character will animate individually as you scroll through the page."
  fromColor="#000000"
  toColor="#ffffff"
  duration={1.5}
  fontSize="clamp(1rem, 3vw, 2rem)"
  initialScale={0.7}
  className="leading-relaxed"
/>`;

  // 실제 ScrollTriggerText 컴포넌트 소스 코드
  const scrollTriggerTextCode = `"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

interface ScrollTriggerTextProps {
  fromColor?: string;
  toColor?: string;
  duration?: number;
  text?: string;
  fontSize?: string;
  initialX?: number;
  finalX?: number;
  initialScale?: number;
  finalScale?: number;
  className?: string;
}

export default function ScrollTriggerText({
  fromColor = "#888",
  toColor = "#FFD600",
  duration = 0.8,
  text = "Scroll Trigger Text Scroll Trigger Text Scroll Trigger Text Scroll Trigger Text Scroll Trigger Text Scroll Trigger Text",
  fontSize = "5vw",
  className,
  initialScale = 0.8,
}: ScrollTriggerTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const chars = Array.from(text);
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  // 글자별 스타일 계산 함수
  function getCharStyle(i: number) {
    const spread = 0.5;
    const base = 0.2;
    const step = spread / Math.max(chars.length - 1, 1);
    const start = base + i * step;
    const end = start + 0.18;

    // opacity 계산
    let opacity = 0;
    if (progress >= start && progress <= end) {
      opacity = (progress - start) / (end - start);
    } else if (progress > end && progress < 1) {
      opacity = 1;
    }
    // scale 계산
    let scale = initialScale;
    if (progress >= start && progress <= end) {
      scale = initialScale + ((1 - initialScale) * (progress - start)) / (end - start);
    } else if (progress > end && progress < 1) {
      scale = 1;
    }
    // color 계산 (간단히 fromColor/toColor 중간값, 실제로는 보간 필요)
    const color = progress >= start && progress <= end ? toColor : fromColor;

    return {
      opacity,
      scale,
      color,
      transition: \`color \${duration}s ease\`,
      whiteSpace: chars[i] === " " ? "pre" : undefined,
      display: "inline-block",
    };
  }

  return (
    <div ref={containerRef}>
      <motion.h1
        style={{
          fontSize,
          transition: \`color \${duration}s ease\`,
        }}
        className={className}
      >
        {chars.map((char, i) => (
          <span key={i} style={getCharStyle(i)}>
            {char === " " ? "\\u00A0" : char}
          </span>
        ))}
      </motion.h1>
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
          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Text</label>
            <p className="text-xs text-gray-400">표시할 텍스트</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none placeholder-gray-400"
              rows={3}
              placeholder="텍스트를 입력하세요"
            />
          </div>

          {/* FROM COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">시작 색상</label>
            <p className="text-xs text-gray-400">텍스트의 초기 색상</p>
            <div className="flex items-center space-x-3 mb-2">
              <input
                type="color"
                value={fromColor}
                onChange={(e) => setFromColor(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={fromColor}
                onChange={(e) => setFromColor(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#888888"
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setFromColor(preset.value)}
                  className="w-6 h-6 rounded border border-gray-600 hover:scale-110 transition-transform"
                  style={{ backgroundColor: preset.value }}
                  title={preset.label}
                />
              ))}
            </div>
          </div>

          {/* TO COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">끝 색상</label>
            <p className="text-xs text-gray-400">스크롤 시 변할 색상</p>
            <div className="flex items-center space-x-3 mb-2">
              <input
                type="color"
                value={toColor}
                onChange={(e) => setToColor(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={toColor}
                onChange={(e) => setToColor(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#FFD600"
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setToColor(preset.value)}
                  className="w-6 h-6 rounded border border-gray-600 hover:scale-110 transition-transform"
                  style={{ backgroundColor: preset.value }}
                  title={preset.label}
                />
              ))}
            </div>
          </div>

          {/* DURATION */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">애니메이션 시간</label>
            <p className="text-xs text-gray-400">색상 변화 애니메이션 지속시간 (초)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0.1"
                max="3"
                step="0.1"
              />
            </div>
          </div>

          {/* FONT SIZE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">폰트 크기</label>
            <p className="text-xs text-gray-400">텍스트 크기</p>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {FONT_SIZE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* INITIAL SCALE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">초기 스케일</label>
            <p className="text-xs text-gray-400">텍스트의 초기 크기 비율</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={initialScale}
                onChange={(e) => setInitialScale(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={initialScale}
                onChange={(e) => setInitialScale(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0.1"
                max="1"
                step="0.1"
              />
            </div>
          </div>
        </div>

        {/* 리셋 버튼 */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={() => {
              setText(SCROLL_TRIGGER_TEXT_DEFAULTS.text);
              setFromColor(SCROLL_TRIGGER_TEXT_DEFAULTS.fromColor);
              setToColor(SCROLL_TRIGGER_TEXT_DEFAULTS.toColor);
              setDuration(SCROLL_TRIGGER_TEXT_DEFAULTS.duration);
              setFontSize(SCROLL_TRIGGER_TEXT_DEFAULTS.fontSize);
              setInitialScale(SCROLL_TRIGGER_TEXT_DEFAULTS.initialScale);
            }}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            기본값으로 리셋
          </button>
        </div>
      </ControlPanelWrapper>
    </div>
  );

  return (
    <div className="min-h-[200vh]">
      <Title>Scroll Trigger Text.</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        스크롤에 따라 텍스트의 각 글자가 순차적으로 색상과 크기가 변화하는 애니메이션 효과를 적용합니다.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="min-h-[50vh] lg:min-h-[100vh]">
            <ScrollTriggerText
              key={`${text}-${fromColor}-${toColor}-${duration}-${fontSize}-${initialScale}`}
              text={text}
              fromColor={fromColor}
              toColor={toColor}
              duration={duration}
              fontSize={fontSize}
              initialScale={initialScale}
              className="font-bold"
            />
          </div>
        }
        usageContent={usageExample}
        codeContent={scrollTriggerTextCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="사용자가 텍스트 영역을 스크롤할 때"
        what="텍스트의 각 글자를"
        how="순차적으로 색상 변화와 크기 변화 애니메이션으로 표현하여 스크롤 진행도에 따른 시각적 피드백 제공"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="ScrollTriggerText 컴포넌트를 만들어주세요. 이 컴포넌트는 스크롤에 따라 텍스트의 각 글자가 순차적으로 색상과 크기가 변화하는 애니메이션을 보여줍니다. text prop으로 표시할 텍스트를, fromColor prop으로 초기 색상을, toColor prop으로 변화할 색상을, duration prop으로 애니메이션 지속시간을, fontSize prop으로 텍스트 크기를, initialScale prop으로 초기 크기 비율을 설정할 수 있게 해주세요. framer-motion의 useScroll과 useMotionValueEvent를 활용하여 스크롤 진행도를 감지하고, 각 글자별로 개별적인 애니메이션을 적용해주세요. 스크롤 진행도에 따라 opacity, scale, color가 순차적으로 변화하도록 구현해주세요." />
    </div>
  );
}
