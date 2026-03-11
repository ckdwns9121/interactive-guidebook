"use client";

import { useState } from "react";
import NoiseGrainBG from "@/components/common/framer-motion/background/noise-grain-bg/NoiseGrainBG";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import TabInterface from "@/components/common/TabInterface";
import Title from "../../components/Title";
import {
  NOISE_GRAIN_DEFAULTS,
  BLEND_MODE_OPTIONS,
  BG_COLOR_PRESETS,
} from "./constants";

export default function NoiseGrainBGPage() {
  // 컨트롤 상태
  const [opacity, setOpacity] = useState(NOISE_GRAIN_DEFAULTS.opacity);
  const [baseFrequency, setBaseFrequency] = useState(NOISE_GRAIN_DEFAULTS.baseFrequency);
  const [numOctaves, setNumOctaves] = useState(NOISE_GRAIN_DEFAULTS.numOctaves);
  const [animate, setAnimate] = useState(NOISE_GRAIN_DEFAULTS.animate);
  const [speed, setSpeed] = useState(NOISE_GRAIN_DEFAULTS.speed);
  const [blendMode, setBlendMode] = useState<string>(NOISE_GRAIN_DEFAULTS.blendMode);
  const [bgGradient, setBgGradient] = useState(BG_COLOR_PRESETS[0].value);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 리셋 핸들러
  const handleReset = () => {
    setOpacity(NOISE_GRAIN_DEFAULTS.opacity);
    setBaseFrequency(NOISE_GRAIN_DEFAULTS.baseFrequency);
    setNumOctaves(NOISE_GRAIN_DEFAULTS.numOctaves);
    setAnimate(NOISE_GRAIN_DEFAULTS.animate);
    setSpeed(NOISE_GRAIN_DEFAULTS.speed);
    setBlendMode(NOISE_GRAIN_DEFAULTS.blendMode);
    setBgGradient(BG_COLOR_PRESETS[0].value);
  };

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    navigator.clipboard.writeText(noiseGrainBGCode);
  };

  // Usage 예제 코드
  const usageExample = `import NoiseGrainBG from "@/components/common/framer-motion/background/noise-grain-bg/NoiseGrainBG";

// 기본 사용법
<NoiseGrainBG>
  <div className="h-64 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
    <h1 className="text-white text-4xl font-bold">NOISE GRAIN</h1>
  </div>
</NoiseGrainBG>

// 커스텀 설정
<NoiseGrainBG
  opacity={0.2}
  baseFrequency={0.8}
  numOctaves={6}
  speed={15}
  blendMode="soft-light"
>
  <div className="h-96 bg-gradient-to-br from-indigo-900 to-purple-900 p-8">
    <p className="text-white">콘텐츠 위에 필름 그레인 오버레이</p>
  </div>
</NoiseGrainBG>

// 애니메이션 비활성화 (정적 그레인)
<NoiseGrainBG animate={false} opacity={0.1}>
  <div className="h-48 bg-black flex items-center justify-center">
    <p className="text-white">정적 그레인 배경</p>
  </div>
</NoiseGrainBG>`;

  // 실제 NoiseGrainBG 컴포넌트 소스 코드
  const noiseGrainBGCode = `"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface NoiseGrainBGProps {
  opacity?: number;
  baseFrequency?: number;
  numOctaves?: number;
  animate?: boolean;
  speed?: number;
  blendMode?: string;
  className?: string;
  children?: React.ReactNode;
}

const NoiseGrainBG: React.FC<NoiseGrainBGProps> = ({
  opacity = 0.15,
  baseFrequency = 0.65,
  numOctaves = 4,
  animate = true,
  speed = 10,
  blendMode = "overlay",
  className = "",
  children,
}) => {
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const rafRef = useRef<number>(0);
  const seedRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);

  const animateGrain = useCallback(
    (time: number) => {
      if (!turbulenceRef.current) return;

      const interval = 1000 / speed;
      if (time - lastFrameTimeRef.current >= interval) {
        seedRef.current = (seedRef.current + 1) % 100;
        turbulenceRef.current.setAttribute("seed", String(seedRef.current));
        lastFrameTimeRef.current = time;
      }

      rafRef.current = requestAnimationFrame(animateGrain);
    },
    [speed]
  );

  useEffect(() => {
    if (animate) {
      rafRef.current = requestAnimationFrame(animateGrain);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate, animateGrain]);

  const filterId = \\\`noise-grain-\\\${React.useId().replace(/:/g, "")}\\\`;

  return (
    <div className={\\\`relative \\\${className}\\\`}>
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
          opacity,
        }}
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <filter id={filterId}>
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves={numOctaves}
              stitchTiles="stitch"
              seed="0"
            />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter={\\\`url(#\\\${filterId})\\\`}
          />
        </svg>
      </div>
    </div>
  );
};

export default NoiseGrainBG;`;

  // 컨트롤 패널 컴포넌트
  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Opacity</label>
            <p className="text-xs text-gray-400">노이즈 오버레이 불투명도</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0"
                max="0.5"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Base Frequency</label>
            <p className="text-xs text-gray-400">노이즈 기본 주파수 (높을수록 세밀)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.1"
                max="2.0"
                step="0.05"
                value={baseFrequency}
                onChange={(e) => setBaseFrequency(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={baseFrequency}
                onChange={(e) => setBaseFrequency(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0.1"
                max="2.0"
                step="0.05"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Num Octaves</label>
            <p className="text-xs text-gray-400">노이즈 디테일 수준 (옥타브)</p>
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Animate</label>
            <p className="text-xs text-gray-400">그레인 애니메이션 활성화</p>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={animate}
                onChange={(e) => setAnimate(e.target.checked)}
                className="w-4 h-4 text-blue-400 bg-black/20 border-gray-600 rounded focus:ring-blue-400 focus:ring-2"
              />
              <span className="text-sm text-gray-200">애니메이션 사용</span>
            </label>
          </div>

          {animate && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Speed</label>
              <p className="text-xs text-gray-400">애니메이션 속도 (FPS)</p>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="number"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  min="1"
                  max="30"
                  step="1"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Blend Mode</label>
            <p className="text-xs text-gray-400">배경과 합성 모드</p>
            <select
              value={blendMode}
              onChange={(e) => setBlendMode(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {BLEND_MODE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Background</label>
            <p className="text-xs text-gray-400">배경 그라디언트 프리셋</p>
            <select
              value={bgGradient}
              onChange={(e) => setBgGradient(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {BG_COLOR_PRESETS.map((preset) => (
                <option key={preset.value} value={preset.value} className="bg-gray-800 text-white">
                  {preset.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 flex items-end">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </ControlPanelWrapper>
    </div>
  );

  return (
    <div>
      <Title>Noise Grain Background.</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        SVG feTurbulence 필터를 활용하여 필름 그레인 노이즈 오버레이를 생성합니다. requestAnimationFrame으로 매 프레임 seed 값을 변경해 자연스러운 깜박임 효과를 만들어냅니다.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <NoiseGrainBG
            key={`${opacity}-${baseFrequency}-${numOctaves}-${animate}-${speed}-${blendMode}`}
            opacity={opacity}
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            animate={animate}
            speed={speed}
            blendMode={blendMode}
          >
            <div className={`h-64 bg-gradient-to-br ${bgGradient} flex items-center justify-center rounded-lg`}>
              <h2 className="text-white text-3xl md:text-5xl font-bold tracking-wider select-none">
                NOISE GRAIN
              </h2>
            </div>
          </NoiseGrainBG>
        }
        usageContent={usageExample}
        codeContent={noiseGrainBGCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="페이지가 로드되거나 배경 영역이 표시될 때"
        what="배경 위에 필름 그레인 노이즈를"
        how="SVG feTurbulence로 fractal noise를 생성하고, requestAnimationFrame으로 seed 값을 매 프레임 변경하여 깜박이는 필름 그레인 효과를 만든 뒤, mix-blend-mode로 배경과 자연스럽게 합성"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="NoiseGrainBG 컴포넌트를 만들어주세요. 이 컴포넌트는 SVG feTurbulence 필터를 사용하여 필름 그레인 노이즈 오버레이를 생성합니다. opacity prop으로 노이즈 불투명도를, baseFrequency prop으로 노이즈 기본 주파수를, numOctaves prop으로 디테일 수준을, animate prop으로 애니메이션 활성화 여부를, speed prop으로 애니메이션 속도를, blendMode prop으로 합성 모드를 설정할 수 있게 해주세요. children을 감싸고 그 위에 노이즈를 오버레이하되, pointer-events-none으로 하위 콘텐츠의 인터랙션을 방해하지 않도록 해주세요. requestAnimationFrame과 ref를 사용하여 React 리렌더 없이 SVG 속성을 직접 업데이트해주세요." />
    </div>
  );
}
