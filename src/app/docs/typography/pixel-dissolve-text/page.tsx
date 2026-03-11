"use client";

import { useState } from "react";
import PixelDissolveText from "@/components/common/framer-motion/typography/pixel-dissolve-text/PixelDissolveText";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import TabInterface from "@/components/common/TabInterface";
import Title from "../../components/Title";
import { PIXEL_DISSOLVE_DEFAULTS, FONT_SIZE_OPTIONS, FONT_WEIGHT_OPTIONS, COLOR_PRESETS } from "./constants";

export default function PixelDissolveTextPage() {
  const [text, setText] = useState(PIXEL_DISSOLVE_DEFAULTS.text);
  const [pixelSize, setPixelSize] = useState(PIXEL_DISSOLVE_DEFAULTS.pixelSize);
  const [baseFrequency, setBaseFrequency] = useState(PIXEL_DISSOLVE_DEFAULTS.baseFrequency);
  const [numOctaves, setNumOctaves] = useState(PIXEL_DISSOLVE_DEFAULTS.numOctaves);
  const [duration, setDuration] = useState(PIXEL_DISSOLVE_DEFAULTS.duration);
  const [hoverTrigger, setHoverTrigger] = useState(PIXEL_DISSOLVE_DEFAULTS.hoverTrigger);
  const [color, setColor] = useState(PIXEL_DISSOLVE_DEFAULTS.color);
  const [fontSize, setFontSize] = useState(PIXEL_DISSOLVE_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(PIXEL_DISSOLVE_DEFAULTS.fontWeight);
  const [manualProgress, setManualProgress] = useState(0);

  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pixelDissolveTextCode);
  };

  const usageExample = `import PixelDissolveText from "@/components/common/framer-motion/typography/pixel-dissolve-text/PixelDissolveText";

// 기본 사용법 (호버 시 픽셀 디졸브)
<PixelDissolveText text="PIXEL" />

// 큰 픽셀 블록으로 사라지는 효과
<PixelDissolveText
  text="RETRO"
  pixelSize={16}
  baseFrequency={0.03}
  duration={2000}
  color="#fbbf24"
  className="text-8xl font-black"
/>

// 미세한 픽셀 디졸브
<PixelDissolveText
  text="DUST"
  pixelSize={4}
  baseFrequency={0.06}
  numOctaves={5}
  duration={800}
  color="#f472b6"
  className="text-6xl font-bold"
/>

// 외부에서 progress 직접 제어
const [progress, setProgress] = useState(0);
<PixelDissolveText
  text="CONTROL"
  progress={progress}
  pixelSize={10}
  color="#34d399"
  className="text-7xl font-black"
/>
<input
  type="range" min={0} max={1} step={0.01}
  value={progress}
  onChange={(e) => setProgress(Number(e.target.value))}
/>`;

  const pixelDissolveTextCode = `"use client";
import { useEffect, useRef, useState } from "react";

interface PixelDissolveTextProps {
  text: string;
  color?: string;
  /** 디졸브 진행도 (0: 온전, 1: 완전히 사라짐). 외부에서 제어할 때 사용 */
  progress?: number;
  /** 호버 시 디졸브 애니메이션 자동 실행 */
  hoverTrigger?: boolean;
  /** 픽셀 크기 (클수록 큰 모자이크) */
  pixelSize?: number;
  /** 노이즈 주파수 (흩어지는 패턴) */
  baseFrequency?: number;
  /** 노이즈 디테일 레벨 */
  numOctaves?: number;
  /** 디졸브 애니메이션 시간 (ms) */
  duration?: number;
  className?: string;
}

/**
 * sigmoid 기반 tableValues 생성
 * progress에 따라 noise 밝기별 alpha를 부드럽게 전환
 */
function buildTableValues(progress: number, steps = 32): string {
  const values: number[] = [];
  for (let i = 0; i < steps; i++) {
    const x = i / (steps - 1);
    const sharpness = 14;
    const sigmoid = 1 / (1 + Math.exp(sharpness * (progress - x)));
    values.push(Math.max(0, Math.min(1, sigmoid)));
  }
  return values.map((v) => v.toFixed(3)).join(" ");
}

/**
 * PixelDissolveText
 * - feMorphology로 픽셀화(모자이크) + feTurbulence/feComponentTransfer로 디졸브
 * - progress에 따라 픽셀화 강도와 디졸브가 동시에 진행
 * - rAF 기반 직접 SVG attribute 업데이트 (React 리렌더 없음)
 */
const PixelDissolveText: React.FC<PixelDissolveTextProps> = ({
  text,
  color = "#ffffff",
  progress: controlledProgress,
  hoverTrigger = true,
  pixelSize = 8,
  baseFrequency = 0.04,
  numOctaves = 3,
  duration = 1200,
  className,
}) => {
  const filterId = useRef(\\\`pixel-dissolve-\\\${Math.random().toString(36).slice(2, 8)}\\\`);
  const transferRef = useRef<SVGFEFuncAElement>(null);
  const scaleRef = useRef<SVGFEConvolveMatrixElement>(null);
  const animRef = useRef<number>(0);
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const startRef = useRef(0);
  const startTimeRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  const matrixSize = pixelSize;
  const kernelSize = Math.max(1, Math.min(matrixSize, 20));
  const kernelCount = kernelSize * kernelSize;
  const kernelMatrix = new Array(kernelCount).fill((1 / kernelCount).toFixed(6)).join(" ");

  const applyProgress = (p: number) => {
    const transfer = transferRef.current;
    if (transfer) {
      transfer.setAttribute("tableValues", buildTableValues(p));
    }
    const scale = scaleRef.current;
    if (scale) {
      const radius = Math.round(p * pixelSize);
      scale.setAttribute("radius", \\\`\\\${radius}\\\`);
    }
  };

  useEffect(() => {
    if (controlledProgress !== undefined) return;
    if (!hoverTrigger) return;

    targetRef.current = isHovered ? 1 : 0;
    startRef.current = progressRef.current;
    startTimeRef.current = performance.now();

    function animate(now: number) {
      const elapsed = now - startTimeRef.current;
      const t = Math.min(elapsed / duration, 1);
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const current = startRef.current + (targetRef.current - startRef.current) * ease;

      progressRef.current = current;
      applyProgress(current);

      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    }

    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isHovered, hoverTrigger, controlledProgress, duration]);

  useEffect(() => {
    if (controlledProgress === undefined) return;
    progressRef.current = controlledProgress;
    applyProgress(controlledProgress);
  }, [controlledProgress]);

  useEffect(() => {
    applyProgress(controlledProgress ?? 0);
  }, []);

  return (
    <div
      className={\\\`\\\${className ?? ""} relative inline-block cursor-pointer\\\`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id={filterId.current} x="-10%" y="-10%" width="120%" height="120%">
            <feMorphology
              ref={scaleRef}
              in="SourceGraphic"
              operator="dilate"
              radius="0"
              result="pixelated"
            />
            <feConvolveMatrix
              in="pixelated"
              order={\\\`\\\${kernelSize}\\\`}
              kernelMatrix={kernelMatrix}
              divisor="1"
              edgeMode="duplicate"
              result="mosaic"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves={numOctaves}
              seed="77"
              result="noise"
            />
            <feComponentTransfer in="noise" result="mask">
              <feFuncA
                ref={transferRef}
                type="table"
                tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1"
              />
            </feComponentTransfer>
            <feComposite in="mosaic" in2="mask" operator="in" />
          </filter>
        </defs>
      </svg>

      <span
        className="select-none whitespace-nowrap"
        style={{
          color,
          filter: \\\`url(#\\\${filterId.current})\\\`,
          display: "inline-block",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default PixelDissolveText;`;

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
              placeholder="PIXEL"
            />
          </div>

          {/* PIXEL SIZE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Pixel Size</label>
            <p className="text-xs text-gray-400">픽셀 블록 크기 (1~20)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={pixelSize}
                onChange={(e) => setPixelSize(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={pixelSize}
                onChange={(e) => setPixelSize(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="1"
                max="20"
                step="1"
              />
            </div>
          </div>

          {/* BASE FREQUENCY */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Base Frequency</label>
            <p className="text-xs text-gray-400">노이즈 주파수 (낮을수록 큰 덩어리)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.005"
                max="0.15"
                step="0.005"
                value={baseFrequency}
                onChange={(e) => setBaseFrequency(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={baseFrequency}
                onChange={(e) => setBaseFrequency(Number(e.target.value))}
                className="w-20 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0.005"
                max="0.15"
                step="0.005"
              />
            </div>
          </div>

          {/* NUM OCTAVES */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Num Octaves</label>
            <p className="text-xs text-gray-400">노이즈 디테일 (1~8)</p>
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

          {/* DURATION */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Duration</label>
            <p className="text-xs text-gray-400">디졸브 애니메이션 시간 (ms)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="200"
                max="3000"
                step="100"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-20 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="200"
                max="3000"
                step="100"
              />
            </div>
          </div>

          {/* HOVER TRIGGER */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Hover Trigger</label>
            <p className="text-xs text-gray-400">호버 시 자동 디졸브</p>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setHoverTrigger(!hoverTrigger)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  hoverTrigger ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    hoverTrigger ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-sm text-gray-300">{hoverTrigger ? "ON" : "OFF"}</span>
            </div>
          </div>

          {/* MANUAL PROGRESS */}
          {!hoverTrigger && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Progress</label>
              <p className="text-xs text-gray-400">디졸브 진행도 (0~1)</p>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={manualProgress}
                  onChange={(e) => setManualProgress(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="number"
                  value={manualProgress}
                  onChange={(e) => setManualProgress(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  min="0"
                  max="1"
                  step="0.01"
                />
              </div>
            </div>
          )}

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
              setText(PIXEL_DISSOLVE_DEFAULTS.text);
              setPixelSize(PIXEL_DISSOLVE_DEFAULTS.pixelSize);
              setBaseFrequency(PIXEL_DISSOLVE_DEFAULTS.baseFrequency);
              setNumOctaves(PIXEL_DISSOLVE_DEFAULTS.numOctaves);
              setDuration(PIXEL_DISSOLVE_DEFAULTS.duration);
              setHoverTrigger(PIXEL_DISSOLVE_DEFAULTS.hoverTrigger);
              setColor(PIXEL_DISSOLVE_DEFAULTS.color);
              setFontSize(PIXEL_DISSOLVE_DEFAULTS.fontSize);
              setFontWeight(PIXEL_DISSOLVE_DEFAULTS.fontWeight);
              setManualProgress(0);
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
      <Title>Pixel Dissolve Text.</Title>
      <hr className="my-4 border-t border-gray-700" />

      <p className="text-gray-200 text-lg mb-8">
        SVG feMorphology와 feConvolveMatrix로 텍스트를 픽셀화(모자이크)하고, feTurbulence 기반 디졸브 마스크와 결합하여
        레트로 게임처럼 픽셀 단위로 흩어지며 사라지는 효과를 적용합니다. 텍스트 위에 마우스를 올려보세요.
      </p>

      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="h-48 flex items-center justify-center">
            <PixelDissolveText
              key={`${text}-${pixelSize}-${baseFrequency}-${numOctaves}-${color}-${hoverTrigger}`}
              text={text}
              pixelSize={pixelSize}
              baseFrequency={baseFrequency}
              numOctaves={numOctaves}
              duration={duration}
              hoverTrigger={hoverTrigger}
              progress={hoverTrigger ? undefined : manualProgress}
              color={color}
              className={`${fontSize} ${fontWeight}`}
            />
          </div>
        }
        usageContent={usageExample}
        codeContent={pixelDissolveTextCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      <IdeaConcretizationSection
        when="사용자가 텍스트 위에 마우스를 올리거나, progress 값이 변경될 때"
        what="텍스트의 각 픽셀 영역을"
        how="SVG feMorphology(dilate)로 픽셀 블록을 확대하고 feConvolveMatrix 평균 필터로 모자이크 효과를 만든 뒤, feTurbulence 노이즈 기반 sigmoid 마스크와 feComposite로 합성하여 픽셀 단위로 점진적으로 흩어지는 레트로 디졸브 효과를 표현"
      />

      <BasicPromptSection prompt="PixelDissolveText 컴포넌트를 만들어주세요. SVG feMorphology로 텍스트를 픽셀 블록으로 확대하고 feConvolveMatrix 평균 필터로 모자이크 효과를 만듭니다. 동시에 feTurbulence로 fractal noise를 생성하고 feComponentTransfer의 sigmoid table로 디졸브 마스크를 만들어 feComposite로 합성합니다. progress가 증가하면 픽셀 블록이 커지면서 동시에 노이즈 패턴에 따라 부분적으로 사라지는 레트로 게임 스타일 효과를 구현합니다. requestAnimationFrame으로 60fps 부드러운 애니메이션을 지원하고, 호버 트리거와 외부 progress 제어를 모두 지원해주세요." />
    </div>
  );
}
