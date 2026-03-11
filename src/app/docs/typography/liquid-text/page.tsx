"use client";

import { useState } from "react";
import LiquidText from "@/components/common/framer-motion/typography/liquid-text/LiquidText";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import TabInterface from "@/components/common/TabInterface";
import Title from "../../components/Title";
import { LIQUID_DEFAULTS, FONT_SIZE_OPTIONS, FONT_WEIGHT_OPTIONS, COLOR_PRESETS } from "./constants";

export default function LiquidTextPage() {
  // 컨트롤 상태
  const [text, setText] = useState(LIQUID_DEFAULTS.text);
  const [scale, setScale] = useState(LIQUID_DEFAULTS.scale);
  const [baseFrequency, setBaseFrequency] = useState(LIQUID_DEFAULTS.baseFrequency);
  const [speed, setSpeed] = useState(LIQUID_DEFAULTS.speed);
  const [numOctaves, setNumOctaves] = useState(LIQUID_DEFAULTS.numOctaves);
  const [color, setColor] = useState(LIQUID_DEFAULTS.color);
  const [fontSize, setFontSize] = useState(LIQUID_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(LIQUID_DEFAULTS.fontWeight);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    navigator.clipboard.writeText(liquidTextCode);
  };

  // Usage 예제 코드
  const usageExample = `import LiquidText from "@/components/common/framer-motion/typography/liquid-text/LiquidText";

// 기본 사용법
<LiquidText text="LIQUID" />

// 강한 왜곡 + 빠른 속도
<LiquidText
  text="WAVE"
  scale={20}
  speed={1.5}
  color="#38bdf8"
  className="text-8xl font-black"
/>

// 부드러운 물결
<LiquidText
  text="SMOOTH"
  scale={6}
  baseFrequency={0.008}
  speed={0.3}
  numOctaves={2}
  color="#a78bfa"
  className="text-6xl font-bold"
/>

// 격렬한 왜곡
<LiquidText
  text="CHAOS"
  scale={30}
  baseFrequency={0.03}
  speed={2}
  numOctaves={5}
  color="#f87171"
  className="text-7xl font-black"
/>`;

  // 실제 LiquidText 컴포넌트 소스 코드
  const liquidTextCode = `"use client";
import { useEffect, useRef } from "react";

interface LiquidTextProps {
  text: string;
  color?: string;
  /** 왜곡 강도 (px) */
  scale?: number;
  /** 노이즈 주파수 (낮을수록 큰 물결) */
  baseFrequency?: number;
  /** 애니메이션 속도 */
  speed?: number;
  /** 노이즈 디테일 레벨 */
  numOctaves?: number;
  className?: string;
}

/**
 * LiquidText
 * - SVG feTurbulence + feDisplacementMap 필터로 텍스트에 액체처럼 흐르는 왜곡 효과를 적용합니다.
 * - requestAnimationFrame으로 turbulence의 seed를 변경하여 실시간 애니메이션을 구현합니다.
 * - 예시: <LiquidText text="LIQUID" scale={12} speed={0.8} />
 */
const LiquidText: React.FC<LiquidTextProps> = ({
  text,
  color = "#ffffff",
  scale = 12,
  baseFrequency = 0.015,
  speed = 0.8,
  numOctaves = 3,
  className,
}) => {
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const animFrameRef = useRef<number>(0);
  const filterId = useRef(\`liquid-\${Math.random().toString(36).slice(2, 8)}\`);

  useEffect(() => {
    const turbulence = turbulenceRef.current;
    if (!turbulence) return;

    let seed = 0;

    function animate() {
      seed += speed;
      turbulence!.setAttribute("seed", String(Math.floor(seed)));
      animFrameRef.current = requestAnimationFrame(animate);
    }

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [speed]);

  return (
    <div className={\`\${className ?? ""} relative inline-block\`}>
      {/* SVG 필터 정의 */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id={filterId.current} x="-20%" y="-20%" width="140%" height="140%">
            {/* 1) Perlin Noise 생성 */}
            <feTurbulence
              ref={turbulenceRef}
              type="turbulence"
              baseFrequency={baseFrequency}
              numOctaves={numOctaves}
              seed="0"
              result="turbulence"
            />
            {/* 2) 노이즈 기반으로 원본 픽셀 위치를 왜곡 */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* 3) 원본과 왜곡본을 부드럽게 합성 */}
            <feMerge>
              <feMergeNode in="displaced" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* 필터가 적용된 텍스트 */}
      <span
        className="select-none whitespace-nowrap"
        style={{
          color,
          filter: \`url(#\${filterId.current})\`,
          display: "inline-block",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default LiquidText;`;

  // 컨트롤 패널 컴포넌트
  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* TEXT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Text</label>
            <p className="text-xs text-gray-400">표시할 텍스트</p>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
              placeholder="LIQUID"
            />
          </div>

          {/* SCALE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Scale</label>
            <p className="text-xs text-gray-400">왜곡 강도 (px)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0"
                max="50"
                step="1"
              />
            </div>
          </div>

          {/* BASE FREQUENCY */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Base Frequency</label>
            <p className="text-xs text-gray-400">노이즈 주파수 (낮을수록 큰 물결)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.001"
                max="0.1"
                step="0.001"
                value={baseFrequency}
                onChange={(e) => setBaseFrequency(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={baseFrequency}
                onChange={(e) => setBaseFrequency(Number(e.target.value))}
                className="w-20 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0.001"
                max="0.1"
                step="0.001"
              />
            </div>
          </div>

          {/* SPEED */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Speed</label>
            <p className="text-xs text-gray-400">애니메이션 속도</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0.1"
                max="5"
                step="0.1"
              />
            </div>
          </div>

          {/* NUM OCTAVES */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Num Octaves</label>
            <p className="text-xs text-gray-400">노이즈 디테일 레벨 (1~8)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={numOctaves}
                onChange={(e) => setNumOctaves(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={numOctaves}
                onChange={(e) => setNumOctaves(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="1"
                max="8"
                step="1"
              />
            </div>
          </div>

          {/* COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Text Color</label>
            <p className="text-xs text-gray-400">텍스트 색상</p>
            <div className="flex items-center space-x-3 mb-2">
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
            <div className="flex flex-wrap gap-1">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setColor(preset.value)}
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
        </div>

        {/* 리셋 버튼 */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={() => {
              setText(LIQUID_DEFAULTS.text);
              setScale(LIQUID_DEFAULTS.scale);
              setBaseFrequency(LIQUID_DEFAULTS.baseFrequency);
              setSpeed(LIQUID_DEFAULTS.speed);
              setNumOctaves(LIQUID_DEFAULTS.numOctaves);
              setColor(LIQUID_DEFAULTS.color);
              setFontSize(LIQUID_DEFAULTS.fontSize);
              setFontWeight(LIQUID_DEFAULTS.fontWeight);
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
      <Title>Liquid Text.</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        SVG feTurbulence와 feDisplacementMap 필터를 활용하여 텍스트에 액체처럼 흐르는 왜곡 애니메이션을 적용합니다.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="h-48 flex items-center justify-center">
            <LiquidText
              key={`${text}-${scale}-${baseFrequency}-${speed}-${numOctaves}-${color}`}
              text={text}
              scale={scale}
              baseFrequency={baseFrequency}
              speed={speed}
              numOctaves={numOctaves}
              color={color}
              className={`${fontSize} ${fontWeight}`}
            />
          </div>
        }
        usageContent={usageExample}
        codeContent={liquidTextCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="컴포넌트가 마운트될 때"
        what="텍스트의 모든 픽셀을"
        how="SVG feTurbulence로 Perlin Noise를 생성하고, feDisplacementMap으로 노이즈 값에 따라 픽셀 위치를 왜곡하여 액체처럼 흐르는 효과를 실시간으로 표현"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="LiquidText 컴포넌트를 만들어주세요. SVG feTurbulence 필터로 Perlin Noise를 생성하고, feDisplacementMap으로 텍스트 픽셀을 왜곡하여 액체처럼 흐르는 효과를 만듭니다. requestAnimationFrame으로 turbulence seed를 매 프레임 변경하여 실시간 애니메이션을 구현합니다. scale(왜곡 강도), baseFrequency(물결 크기), speed(속도), numOctaves(디테일) prop을 지원해주세요." />
    </div>
  );
}
