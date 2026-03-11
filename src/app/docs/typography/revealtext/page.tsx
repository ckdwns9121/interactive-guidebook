"use client";

import { useState } from "react";
import RevealText from "@/components/common/framer-motion/typography/reveal-text/RevealText";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import TabInterface from "@/components/common/TabInterface";
import Title from "../../components/Title";
import {
  REVEAL_TEXT_DEFAULTS,
  DIRECTION_OPTIONS,
  FONT_SIZE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  COLOR_PRESETS,
} from "./constants";

export default function RevealTextDocsPage() {
  // 컨트롤 상태
  const [text, setText] = useState(REVEAL_TEXT_DEFAULTS.text);
  const [direction, setDirection] = useState<"up" | "down" | "left" | "right">(REVEAL_TEXT_DEFAULTS.direction);
  const [delay, setDelay] = useState(REVEAL_TEXT_DEFAULTS.delay);
  const [duration, setDuration] = useState(REVEAL_TEXT_DEFAULTS.duration);
  const [stagger, setStagger] = useState(REVEAL_TEXT_DEFAULTS.stagger);
  const [byWord, setByWord] = useState(REVEAL_TEXT_DEFAULTS.byWord);
  const [fontSize, setFontSize] = useState(REVEAL_TEXT_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(REVEAL_TEXT_DEFAULTS.fontWeight);
  const [textColor, setTextColor] = useState(REVEAL_TEXT_DEFAULTS.textColor);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    const code = revealTextCode;
    navigator.clipboard.writeText(code);
  };

  // Usage 예제 코드
  const usageExample = `import RevealText from "@/components/common/framer-motion/typography/reveal-text/RevealText";

// 기본 사용법
<RevealText text="Hello Vibe Coding." />

// 커스텀 설정
<RevealText
  text="고급 등장 애니메이션"
  direction="up"
  delay={0.5}
  duration={0.8}
  stagger={0.1}
  byWord={true}
  className="text-4xl font-bold text-blue-600"
/>

// 단어 단위 애니메이션
<RevealText
  text="단어별로 나타나는 텍스트"
  byWord={true}
  direction="left"
  stagger={0.2}
  className="text-2xl"
/>

// 빠른 글자 애니메이션
<RevealText
  text="빠른 등장 효과"
  direction="down"
  delay={0}
  duration={0.3}
  stagger={0.02}
  className="text-3xl font-semibold"
/>`;

  // 실제 RevealText 컴포넌트 소스 코드
  const revealTextCode = `"use client";
import React from "react";
import { motion } from "framer-motion";

interface RevealTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * 애니메이션 방향: up, down, left, right
   */
  direction?: "up" | "down" | "left" | "right";
  /**
   * 전체 애니메이션 시작 딜레이 (초)
   */
  delay?: number;
  /**
   * 각 글자/단어 애니메이션 지속시간 (초)
   */
  duration?: number;
  /**
   * 각 글자/단어 사이의 애니메이션 간격 (초)
   */
  stagger?: number;
  /**
   * 단어 단위로 애니메이션 적용 여부 (기본: false, 글자 단위)
   */
  byWord?: boolean;
}

/**
 * RevealText
 * - 텍스트가 한 글자씩 또는 한 단어씩 자연스럽게 나타나는 Reveal Animation
 * - direction, delay, duration, stagger 등 커스텀 prop 지원
 * - framer-motion의 motion.span 활용
 * - 반응형 및 접근성 고려
 */
const RevealText: React.FC<RevealTextProps> = ({
  text,
  className,
  style,
  direction = "up",
  delay = 0,
  duration = 0.5,
  stagger = 0.04,
  byWord = false,
}) => {
  // direction에 따라 초기 위치 설정
  const getInitial = () => {
    switch (direction) {
      case "up":
        return { y: "100%", opacity: 0 };
      case "down":
        return { y: "-100%", opacity: 0 };
      case "left":
        return { x: "-100%", opacity: 0 };
      case "right":
        return { x: "100%", opacity: 0 };
      default:
        return { y: "100%", opacity: 0 };
    }
  };

  // 텍스트를 글자 또는 단어 단위로 분리
  const units = byWord ? text.split(" ") : Array.from(text);

  return (
    <span className={\`\${className} inline-block overflow-hidden\`} style={style} aria-label={text} role="text">
      {units.map((unit, i) => (
        <React.Fragment key={i}>
          <motion.span
            initial={getInitial()}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{
              delay: delay + i * stagger,
              duration,
              ease: "easeOut",
            }}
            className="inline-block"
          >
            {unit === " " ? "\\u00A0" : unit}
          </motion.span>
          {byWord && i < units.length - 1 && <span className="inline-block">\\u00A0</span>}
        </React.Fragment>
      ))}
    </span>
  );
};

export default RevealText;`;

  // 컨트롤 패널 컴포넌트
  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* TEXT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Text</label>
            <p className="text-xs text-gray-400">텍스트를 입력하세요</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none placeholder-gray-400"
              rows={3}
              placeholder="Reveal할 텍스트를 입력하세요"
            />
          </div>

          {/* DIRECTION */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Direction</label>
            <p className="text-xs text-gray-400">애니메이션 방향</p>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value as "up" | "down" | "left" | "right")}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {DIRECTION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* DELAY */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Start Delay</label>
            <p className="text-xs text-gray-400">애니메이션 시작 지연 시간 (초)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
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
                max="3"
                step="0.1"
              />
            </div>
          </div>

          {/* DURATION */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Duration</label>
            <p className="text-xs text-gray-400">각 글자/단어 애니메이션 시간 (초)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.1"
                max="2"
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
                max="2"
                step="0.1"
              />
            </div>
          </div>

          {/* STAGGER */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Stagger</label>
            <p className="text-xs text-gray-400">각 글자/단어 사이 간격 (초)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="0.3"
                step="0.01"
                value={stagger}
                onChange={(e) => setStagger(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={stagger}
                onChange={(e) => setStagger(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0"
                max="0.3"
                step="0.01"
              />
            </div>
          </div>

          {/* BY WORD */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Animation Unit</label>
            <p className="text-xs text-gray-400">애니메이션 단위</p>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="byWord"
                  checked={!byWord}
                  onChange={() => setByWord(false)}
                  className="w-4 h-4 text-blue-600 border-gray-600 focus:ring-blue-500 focus:ring-2 bg-black/20"
                />
                <span className="text-sm text-gray-200">글자 단위</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="byWord"
                  checked={byWord}
                  onChange={() => setByWord(true)}
                  className="w-4 h-4 text-blue-600 border-gray-600 focus:ring-blue-500 focus:ring-2 bg-black/20"
                />
                <span className="text-sm text-gray-200">단어 단위</span>
              </label>
            </div>
          </div>

          {/* FONT SIZE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Font Size</label>
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

          {/* FONT WEIGHT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Font Weight</label>
            <p className="text-xs text-gray-400">글꼴 두께</p>
            <select
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {FONT_WEIGHT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* TEXT COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Text Color</label>
            <p className="text-xs text-gray-400">텍스트 색상</p>
            <select
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {COLOR_PRESETS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 리셋 버튼 */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={() => {
              setText(REVEAL_TEXT_DEFAULTS.text);
              setDirection(REVEAL_TEXT_DEFAULTS.direction);
              setDelay(REVEAL_TEXT_DEFAULTS.delay);
              setDuration(REVEAL_TEXT_DEFAULTS.duration);
              setStagger(REVEAL_TEXT_DEFAULTS.stagger);
              setByWord(REVEAL_TEXT_DEFAULTS.byWord);
              setFontSize(REVEAL_TEXT_DEFAULTS.fontSize);
              setFontWeight(REVEAL_TEXT_DEFAULTS.fontWeight);
              setTextColor(REVEAL_TEXT_DEFAULTS.textColor);
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
    <div>
      <Title>Reveal Text.</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        텍스트가 한 글자씩 또는 한 단어씩 자연스럽게 나타나는 등장 애니메이션 효과를 적용합니다.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className={`${fontSize} ${fontWeight} ${textColor}`}>
            <RevealText
              key={`${text}-${direction}-${delay}-${duration}-${stagger}-${byWord}`}
              text={text}
              direction={direction}
              delay={delay}
              duration={duration}
              stagger={stagger}
              byWord={byWord}
            />
          </div>
        }
        usageContent={usageExample}
        codeContent={revealTextCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="컴포넌트가 마운트되거나 텍스트가 변경될 때"
        what="텍스트의 각 글자나 단어를"
        how="지정된 방향에서 순차적으로 나타나는 애니메이션으로 표현"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="RevealText 컴포넌트를 만들어주세요. 이 컴포넌트는 텍스트가 한 글자씩 또는 한 단어씩 자연스럽게 나타나는 등장 애니메이션을 보여줍니다. text prop으로 등장할 텍스트를, direction prop으로 애니메이션 방향(up, down, left, right)을, delay prop으로 시작 지연 시간을, duration prop으로 각 글자/단어 애니메이션 시간을, stagger prop으로 글자/단어 사이 간격을, byWord prop으로 글자 단위 또는 단어 단위 애니메이션을 설정할 수 있게 해주세요. className과 style prop으로 추가 스타일링을 지원해주세요. framer-motion의 motion.span을 활용하여 구현해주세요." />
    </div>
  );
}
