"use client";

import { useState } from "react";
import { MagneticLetters } from "@/components/common/framer-motion/typography/MagneticLetters";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import TabInterface from "@/components/common/TabInterface";
import Title from "../../components/Title";
import { MAGNETIC_DEFAULTS, FONT_SIZE_OPTIONS, FONT_WEIGHT_OPTIONS, SPACING_OPTIONS, COLOR_PRESETS } from "./constants";

export default function MagneticLettersPage() {
  // 컨트롤 상태
  const [text, setText] = useState(MAGNETIC_DEFAULTS.text);
  const [strength, setStrength] = useState(MAGNETIC_DEFAULTS.strength);
  const [threshold, setThreshold] = useState(MAGNETIC_DEFAULTS.threshold);
  const [stiffness, setStiffness] = useState(MAGNETIC_DEFAULTS.stiffness);
  const [damping, setDamping] = useState(MAGNETIC_DEFAULTS.damping);
  const [textColor, setTextColor] = useState(MAGNETIC_DEFAULTS.textColor);
  const [fontSize, setFontSize] = useState(MAGNETIC_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(MAGNETIC_DEFAULTS.fontWeight);
  const [spacing, setSpacing] = useState(MAGNETIC_DEFAULTS.spacing);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    const code = magneticLettersCode;
    navigator.clipboard.writeText(code);
  };

  // Usage 예제 코드
  const usageExample = `import { MagneticLetters } from "@/components/common/framer-motion/typography/MagneticLetters";

// 기본 사용법
<MagneticLetters text="MAGNETIC TEXT" />

// 커스텀 설정
<MagneticLetters
  text="고급 마그네틱 효과"
  strength={60}
  threshold={8}
  stiffness={300}
  damping={25}
  textColor="#ff6b6b"
  className="text-5xl font-bold"
/>

// 간단한 설정
<MagneticLetters
  text="Hello World!"
  strength={30}
  textColor="#ffffff"
  className="text-2xl"
/>`;

  // 실제 MagneticLetters 컴포넌트 소스 코드
  const magneticLettersCode = `"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface MagneticLettersProps {
  text: string;
  strength?: number;
  threshold?: number;
  stiffness?: number;
  damping?: number;
  textColor?: string;
  className?: string;
}

/**
 * MagneticLetters 컴포넌트
 * - 마우스 커서에 반응하여 텍스트가 자석처럼 끌리는 효과를 보여줍니다.
 * - 각 글자가 개별적으로 마우스 위치에 반응합니다.
 */
export function MagneticLetters({
  text,
  strength = 40,
  threshold = 6,
  stiffness = 400,
  damping = 30,
  textColor = "#ffffff",
  className = "",
}: MagneticLettersProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={\`flex items-center justify-center \${className}\`}>
      {text.split("").map((letter, index) => (
        <MagneticLetter
          key={index}
          letter={letter}
          mousePosition={mousePosition}
          containerRef={containerRef}
          strength={strength}
          threshold={threshold}
          stiffness={stiffness}
          damping={damping}
          textColor={textColor}
        />
      ))}
    </div>
  );
}

interface MagneticLetterProps {
  letter: string;
  mousePosition: { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement>;
  strength: number;
  threshold: number;
  stiffness: number;
  damping: number;
  textColor: string;
}

function MagneticLetter({
  letter,
  mousePosition,
  containerRef,
  strength,
  threshold,
  stiffness,
  damping,
  textColor,
}: MagneticLetterProps) {
  const letterRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness, damping });
  const springY = useSpring(y, { stiffness, damping });

  useEffect(() => {
    if (!letterRef.current || !containerRef.current) return;

    const letterRect = letterRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const letterCenterX = letterRect.left + letterRect.width / 2 - containerRect.left;
    const letterCenterY = letterRect.top + letterRect.height / 2 - containerRect.top;

    const mouseX = mousePosition.x - containerRect.left;
    const mouseY = mousePosition.y - containerRect.top;

    const distance = Math.sqrt(
      Math.pow(mouseX - letterCenterX, 2) + Math.pow(mouseY - letterCenterY, 2)
    );

    const maxDistance = letterRect.width * threshold;

    if (distance < maxDistance) {
      const force = (1 - distance / maxDistance) * strength;
      const angle = Math.atan2(mouseY - letterCenterY, mouseX - letterCenterX);

      x.set(Math.cos(angle) * force);
      y.set(Math.sin(angle) * force);
    } else {
      x.set(0);
      y.set(0);
    }
  }, [mousePosition, strength, threshold, stiffness, damping, x, y]);

  return (
    <motion.div
      ref={letterRef}
      style={{
        x: springX,
        y: springY,
        color: textColor,
      }}
      className="inline-block"
    >
      {letter}
    </motion.div>
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
            <p className="text-xs text-gray-400">마그네틱 효과를 적용할 텍스트</p>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
              placeholder="텍스트를 입력하세요"
            />
          </div>

          {/* STRENGTH */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Strength</label>
            <p className="text-xs text-gray-400">자석 끌림 강도</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="100"
                value={strength}
                onChange={(e) => setStrength(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={strength}
                onChange={(e) => setStrength(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0"
                max="100"
              />
            </div>
          </div>

          {/* THRESHOLD */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Threshold</label>
            <p className="text-xs text-gray-400">영향 범위 배수</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="1"
                max="15"
                step="0.5"
              />
            </div>
          </div>

          {/* STIFFNESS */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Stiffness</label>
            <p className="text-xs text-gray-400">스프링 강성 (빠르기)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="50"
                max="1000"
                value={stiffness}
                onChange={(e) => setStiffness(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={stiffness}
                onChange={(e) => setStiffness(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="50"
                max="1000"
              />
            </div>
          </div>

          {/* DAMPING */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Damping</label>
            <p className="text-xs text-gray-400">스프링 댐핑 (감속)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="5"
                max="100"
                value={damping}
                onChange={(e) => setDamping(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={damping}
                onChange={(e) => setDamping(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="5"
                max="100"
              />
            </div>
          </div>

          {/* TEXT COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Text Color</label>
            <p className="text-xs text-gray-400">텍스트 색상</p>
            <div className="flex items-center space-x-3 mb-2">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#ffffff"
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setTextColor(preset.value)}
                  className="w-6 h-6 rounded border border-gray-600 hover:scale-110 transition-transform"
                  style={{ backgroundColor: preset.value }}
                  title={preset.label}
                />
              ))}
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

          {/* SPACING */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Letter Spacing</label>
            <p className="text-xs text-gray-400">글자 간격</p>
            <select
              value={spacing}
              onChange={(e) => setSpacing(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {SPACING_OPTIONS.map((option) => (
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
              setText(MAGNETIC_DEFAULTS.text);
              setStrength(MAGNETIC_DEFAULTS.strength);
              setThreshold(MAGNETIC_DEFAULTS.threshold);
              setStiffness(MAGNETIC_DEFAULTS.stiffness);
              setDamping(MAGNETIC_DEFAULTS.damping);
              setTextColor(MAGNETIC_DEFAULTS.textColor);
              setFontSize(MAGNETIC_DEFAULTS.fontSize);
              setFontWeight(MAGNETIC_DEFAULTS.fontWeight);
              setSpacing(MAGNETIC_DEFAULTS.spacing);
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
      <Title>마그네틱 텍스트</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">마우스 커서에 반응하여 텍스트가 자석처럼 끌리는 효과를 적용합니다.</p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="min-h-32 md:min-h-40 flex items-center justify-center">
            <MagneticLetters
              key={`${text}-${strength}-${threshold}-${stiffness}-${damping}-${textColor}`}
              text={text}
              strength={strength}
              threshold={threshold}
              stiffness={stiffness}
              damping={damping}
              textColor={textColor}
              className={`${fontSize} ${fontWeight} ${spacing}`}
            />
          </div>
        }
        usageContent={usageExample}
        codeContent={magneticLettersCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="마우스가 텍스트 영역에 접근할 때"
        what="텍스트의 각 글자를"
        how="마우스 커서 위치에 따라 자석처럼 끌리는 애니메이션으로 표현"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="MagneticLetters 컴포넌트를 만들어주세요. 이 컴포넌트는 마우스 커서에 반응하여 텍스트가 자석처럼 끌리는 효과를 보여줍니다. text prop으로 마그네틱 효과를 적용할 텍스트를, strength prop으로 자석 끌림 강도를, threshold prop으로 영향 범위 배수를, stiffness와 damping prop으로 스프링 물리 속성을 설정할 수 있게 해주세요. textColor prop으로 텍스트 색상을, className prop으로 추가 스타일링을 지원해주세요. 각 글자가 개별적으로 마우스 위치에 반응하도록 구현해주세요." />
    </div>
  );
}
