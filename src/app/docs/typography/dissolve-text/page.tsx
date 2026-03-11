"use client";

import { useState } from "react";
import DissolveText from "@/components/common/framer-motion/typography/dissolve-text/DissolveText";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import TabInterface from "@/components/common/TabInterface";
import Title from "../../components/Title";
import { DISSOLVE_DEFAULTS, FONT_SIZE_OPTIONS, FONT_WEIGHT_OPTIONS, COLOR_PRESETS } from "./constants";

export default function DissolveTextPage() {
  // 컨트롤 상태
  const [text, setText] = useState(DISSOLVE_DEFAULTS.text);
  const [baseFrequency, setBaseFrequency] = useState(DISSOLVE_DEFAULTS.baseFrequency);
  const [numOctaves, setNumOctaves] = useState(DISSOLVE_DEFAULTS.numOctaves);
  const [duration, setDuration] = useState(DISSOLVE_DEFAULTS.duration);
  const [hoverTrigger, setHoverTrigger] = useState(DISSOLVE_DEFAULTS.hoverTrigger);
  const [color, setColor] = useState(DISSOLVE_DEFAULTS.color);
  const [fontSize, setFontSize] = useState(DISSOLVE_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(DISSOLVE_DEFAULTS.fontWeight);
  const [manualProgress, setManualProgress] = useState(0);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    navigator.clipboard.writeText(dissolveTextCode);
  };

  // Usage 예제 코드
  const usageExample = `import DissolveText from "@/components/common/framer-motion/typography/dissolve-text/DissolveText";

// 기본 사용법 (호버 시 디졸브)
<DissolveText text="DISSOLVE" />

// 큰 덩어리로 흩어지는 효과
<DissolveText
  text="DUST"
  baseFrequency={0.02}
  numOctaves={2}
  duration={2000}
  color="#a78bfa"
  className="text-8xl font-black"
/>

// 미세하게 흩어지는 효과
<DissolveText
  text="PIXEL"
  baseFrequency={0.08}
  numOctaves={5}
  duration={800}
  color="#f472b6"
  className="text-6xl font-bold"
/>

// 외부에서 progress 직접 제어
const [progress, setProgress] = useState(0);
<DissolveText
  text="CONTROL"
  progress={progress}
  color="#34d399"
  className="text-7xl font-black"
/>
<input
  type="range" min={0} max={1} step={0.01}
  value={progress}
  onChange={(e) => setProgress(Number(e.target.value))}
/>`;

  // 실제 DissolveText 컴포넌트 소스 코드
  const dissolveTextCode = `"use client";
import { useEffect, useRef, useState } from "react";

interface DissolveTextProps {
  text: string;
  color?: string;
  /** 디졸브 진행도 (0: 온전, 1: 완전히 흩어짐). 외부에서 제어할 때 사용 */
  progress?: number;
  /** 호버 시 디졸브 애니메이션 자동 실행 */
  hoverTrigger?: boolean;
  /** 노이즈 주파수 (낮을수록 큰 덩어리로 흩어짐) */
  baseFrequency?: number;
  /** 노이즈 디테일 레벨 */
  numOctaves?: number;
  /** 디졸브 애니메이션 시간 (ms) */
  duration?: number;
  className?: string;
}

/**
 * 부드러운 sigmoid 기반 tableValues 생성
 * progress에 따라 noise 밝기별 alpha를 부드럽게 전환
 *
 * tableValues의 각 항목 = 해당 밝기 구간의 출력 alpha
 * progress=0 → 전부 1(보임), progress=1 → 전부 0(사라짐)
 * 중간값에서는 sigmoid 곡선으로 부드럽게 전환
 */
function buildTableValues(progress: number, steps = 32): string {
  const values: number[] = [];
  for (let i = 0; i < steps; i++) {
    const x = i / (steps - 1); // 0~1: noise 밝기 구간
    // sigmoid: threshold(=progress) 근처에서 부드럽게 0→1 전환
    // sharpness가 높을수록 전환이 급격 (12~20이 적당)
    const sharpness = 16;
    const sigmoid = 1 / (1 + Math.exp(sharpness * (progress - x)));
    values.push(Math.max(0, Math.min(1, sigmoid)));
  }
  return values.map((v) => v.toFixed(3)).join(" ");
}

/**
 * DissolveText
 * - SVG feTurbulence + feComponentTransfer로 텍스트가 먼지처럼 흩어지며 사라지는 효과
 * - requestAnimationFrame으로 SVG attribute를 직접 업데이트 (React 리렌더 없음)
 * - sigmoid 기반 부드러운 threshold로 자연스러운 디졸브
 */
const DissolveText: React.FC<DissolveTextProps> = ({
  text,
  color = "#ffffff",
  progress: controlledProgress,
  hoverTrigger = true,
  baseFrequency = 0.04,
  numOctaves = 3,
  duration = 1200,
  className,
}) => {
  const filterId = useRef(\`dissolve-\${Math.random().toString(36).slice(2, 8)}\`);
  const transferRef = useRef<SVGFEFuncAElement>(null);
  const animRef = useRef<number>(0);
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const startRef = useRef(0);
  const startTimeRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  // SVG attribute 직접 업데이트 (리렌더 없이)
  const applyProgress = (p: number) => {
    const transfer = transferRef.current;
    if (!transfer) return;
    transfer.setAttribute("tableValues", buildTableValues(p));
  };

  // 호버 트리거: rAF로 SVG 직접 구동
  useEffect(() => {
    if (controlledProgress !== undefined) return;
    if (!hoverTrigger) return;

    targetRef.current = isHovered ? 1 : 0;
    startRef.current = progressRef.current;
    startTimeRef.current = performance.now();

    function animate(now: number) {
      const elapsed = now - startTimeRef.current;
      const t = Math.min(elapsed / duration, 1);
      // easeInOutCubic
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

  // 외부 progress 제어
  useEffect(() => {
    if (controlledProgress === undefined) return;
    progressRef.current = controlledProgress;
    applyProgress(controlledProgress);
  }, [controlledProgress]);

  // 마운트 시 초기 필터 적용
  useEffect(() => {
    applyProgress(controlledProgress ?? 0);
  }, []);

  return (
    <div
      className={\`\${className ?? ""} relative inline-block cursor-pointer\`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id={filterId.current} x="-10%" y="-10%" width="120%" height="120%">
            {/* 1) Perlin Noise 생성 — 흩어지는 패턴 */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves={numOctaves}
              seed="42"
              result="noise"
            />
            {/* 2) 노이즈 밝기를 기준으로 alpha를 sigmoid 곡선으로 부드럽게 전환 */}
            <feComponentTransfer in="noise" result="mask">
              <feFuncA ref={transferRef} type="table" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1" />
            </feComponentTransfer>
            {/* 3) 마스크와 원본을 합성 — alpha가 0인 영역이 사라짐 */}
            <feComposite in="SourceGraphic" in2="mask" operator="in" />
          </filter>
        </defs>
      </svg>

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

export default DissolveText;`;

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
              placeholder="DISSOLVE"
            />
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

          {/* MANUAL PROGRESS (hover trigger off일 때) */}
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
              setText(DISSOLVE_DEFAULTS.text);
              setBaseFrequency(DISSOLVE_DEFAULTS.baseFrequency);
              setNumOctaves(DISSOLVE_DEFAULTS.numOctaves);
              setDuration(DISSOLVE_DEFAULTS.duration);
              setHoverTrigger(DISSOLVE_DEFAULTS.hoverTrigger);
              setColor(DISSOLVE_DEFAULTS.color);
              setFontSize(DISSOLVE_DEFAULTS.fontSize);
              setFontWeight(DISSOLVE_DEFAULTS.fontWeight);
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
      <Title>Dissolve Text.</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        SVG feTurbulence와 feComponentTransfer 필터를 활용하여 텍스트가 먼지처럼 흩어지며 사라지는 디졸브 효과를 적용합니다.
        텍스트 위에 마우스를 올려보세요.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="h-48 flex items-center justify-center">
            <DissolveText
              key={`${text}-${baseFrequency}-${numOctaves}-${color}-${hoverTrigger}`}
              text={text}
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
        codeContent={dissolveTextCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="사용자가 텍스트 위에 마우스를 올리거나, progress 값이 변경될 때"
        what="텍스트의 각 픽셀 영역을"
        how="SVG feTurbulence로 fractal noise 패턴을 생성하고, feComponentTransfer의 discrete threshold로 노이즈를 이진 마스크로 변환한 뒤, feComposite로 원본과 합성하여 점진적으로 흩어지는 효과를 표현"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="DissolveText 컴포넌트를 만들어주세요. SVG feTurbulence로 fractal noise를 생성하고, feComponentTransfer의 discrete 함수로 노이즈를 이진 마스크(threshold)로 변환합니다. feComposite의 'in' 연산자로 마스크와 원본 텍스트를 합성하여 노이즈 패턴에 따라 텍스트가 부분적으로 사라지는 효과를 만듭니다. threshold 값을 0→1로 변경하면 점점 더 많은 영역이 사라집니다. 호버 트리거와 외부 progress 제어를 모두 지원해주세요." />
    </div>
  );
}
