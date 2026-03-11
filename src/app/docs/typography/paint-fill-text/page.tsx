"use client";

import { useState } from "react";
import PaintFillText from "@/components/common/framer-motion/typography/paint-fill-text/PaintFillText";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import TabInterface from "@/components/common/TabInterface";
import Title from "../../components/Title";
import { PAINT_FILL_TEXT_DEFAULTS, FONT_SIZE_OPTIONS, FONT_WEIGHT_OPTIONS, COLOR_PRESETS } from "./constants";

export default function PaintFillTextPage() {
  // 컨트롤 상태
  const [text, setText] = useState(PAINT_FILL_TEXT_DEFAULTS.text);
  const [duration, setDuration] = useState(PAINT_FILL_TEXT_DEFAULTS.duration);
  const [delay, setDelay] = useState(PAINT_FILL_TEXT_DEFAULTS.delay);
  const [textColor, setTextColor] = useState(PAINT_FILL_TEXT_DEFAULTS.textColor);
  const [fontSize, setFontSize] = useState(PAINT_FILL_TEXT_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(PAINT_FILL_TEXT_DEFAULTS.fontWeight);
  const [trackingTight, setTrackingTight] = useState(PAINT_FILL_TEXT_DEFAULTS.trackingTight);
  const [leadingNone, setLeadingNone] = useState(PAINT_FILL_TEXT_DEFAULTS.leadingNone);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    const code = paintFillTextCode;
    navigator.clipboard.writeText(code);
  };

  // Usage 예제 코드
  const usageExample = `import PaintFillText from "@/components/common/framer-motion/typography/paint-fill-text/PaintFillText";

// 기본 사용법
<PaintFillText
  text="Paint Fill Text"
  duration={1.5}
  delay={0.5}
  textColor="rgba(255, 255, 255, 1)"
/>

// 커스텀 설정
<PaintFillText
  text="Custom Paint Fill"
  duration={2.0}
  delay={0.2}
  textColor="rgba(29, 78, 216, 1)"
  fontSize="text-4xl sm:text-6xl md:text-7xl"
  fontWeight="font-semibold"
  trackingTight={false}
  leadingNone={false}
/>

// 빠른 애니메이션
<PaintFillText
  text="Quick Fill"
  duration={0.8}
  delay={0}
  textColor="rgba(220, 38, 38, 1)"
  fontSize="text-3xl sm:text-4xl md:text-5xl"
  fontWeight="font-black"
/>

// 긴 텍스트
<PaintFillText
  text="This is a longer text that demonstrates the paint fill effect"
  duration={3.0}
  delay={1.0}
  textColor="rgba(5, 150, 105, 1)"
  fontSize="text-2xl sm:text-3xl md:text-4xl"
  fontWeight="font-medium"
  trackingTight={true}
  leadingNone={true}
/>`;

  // 실제 PaintFillText 컴포넌트 소스 코드
  const paintFillTextCode = `"use client";

import styles from "./PaintFillText.module.css";

interface PaintFillTextProps {
  text: string;
  duration?: number; // 애니메이션 지속시간 (초)
  delay?: number; // 애니메이션 시작 지연시간 (초)
  textColor?: string; // 채워질 색상
  fontSize?: string; // 텍스트 크기 클래스
  fontWeight?: string; // 텍스트 굵기 클래스
  className?: string; // 추가 CSS 클래스
  trackingTight?: boolean; // 글자 간격 좁게
  leadingNone?: boolean; // 줄 간격 없애기
}

export default function PaintFillText({
  text,
  duration = 1.5,
  delay = 0.5,
  textColor = "rgba(255, 255, 255, 1)",
  fontSize = "text-6xl",
  fontWeight = "font-bold",
  className = "",
  trackingTight = true,
  leadingNone = true,
}: PaintFillTextProps) {
  const textClasses = [
    fontSize,
    fontWeight,
    trackingTight && "tracking-tight",
    leadingNone && "leading-none",
    "overflow-hidden",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={\`relative \${textClasses}\`}>
      {/* 외곽선 텍스트 (투명하게 처리) */}
      <div
        className={\`relative \${styles.strokeOutline}\`}
        style={
          {
            WebkitTextStroke: "3px transparent",
            WebkitTextFillColor: "transparent",
          } as React.CSSProperties
        }
      >
        {text}
      </div>

      {/* 물감 채우기 효과 텍스트 */}
      <div
        className={\`absolute inset-0 \${styles.paintFill}\`}
        style={
          {
            "--paint-duration": \`\${duration}s\`,
            "--paint-delay": \`\${delay}s\`,
            "--paint-color": textColor,
          } as React.CSSProperties
        }
      >
        {text}
      </div>
    </div>
  );
}`;

  // CSS 모듈 코드
  const cssModuleCode = `/* 외곽선 텍스트 - 깔끔하게 */
.strokeOutline {
  /* 발광 효과 제거 */
}

/* 물감 채우기 효과 - 핵심! */
.paintFill {
  background: linear-gradient(to bottom, var(--paint-color) 0%, var(--paint-color) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  clip-path: inset(100% 0 0 0);
  animation: paint-fill var(--paint-duration) ease-out var(--paint-delay) forwards;
}

/* 물감 채우기 애니메이션 */
@keyframes paint-fill {
  0% {
    clip-path: inset(100% 0 0 0);
  }
  100% {
    clip-path: inset(0% 0 0 0);
  }
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
            <p className="text-xs text-gray-400">표시할 텍스트</p>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
              placeholder="Paint Fill Text"
            />
          </div>

          {/* DURATION */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Duration</label>
            <p className="text-xs text-gray-400">애니메이션 지속 시간 (초)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.5"
                max="5"
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
                min="0.5"
                max="5"
                step="0.1"
              />
            </div>
          </div>

          {/* DELAY */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Delay</label>
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

          {/* TEXT COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Text Color</label>
            <p className="text-xs text-gray-400">채워질 텍스트 색상</p>
            <div className="flex items-center space-x-3 mb-2">
              <input
                type="color"
                value={textColor.includes("rgba") ? "#ffffff" : textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="rgba(255, 255, 255, 1)"
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

          {/* TOGGLE OPTIONS */}
          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Typography Options</label>
            <p className="text-xs text-gray-400">텍스트 스타일 옵션</p>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={trackingTight}
                  onChange={(e) => setTrackingTight(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-black/20 text-blue-600 focus:ring-blue-400 focus:ring-2"
                />
                <span className="text-sm text-gray-200">Tracking Tight</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={leadingNone}
                  onChange={(e) => setLeadingNone(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-black/20 text-blue-600 focus:ring-blue-400 focus:ring-2"
                />
                <span className="text-sm text-gray-200">Leading None</span>
              </label>
            </div>
          </div>
        </div>

        {/* 리셋 버튼 */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={() => {
              setText(PAINT_FILL_TEXT_DEFAULTS.text);
              setDuration(PAINT_FILL_TEXT_DEFAULTS.duration);
              setDelay(PAINT_FILL_TEXT_DEFAULTS.delay);
              setTextColor(PAINT_FILL_TEXT_DEFAULTS.textColor);
              setFontSize(PAINT_FILL_TEXT_DEFAULTS.fontSize);
              setFontWeight(PAINT_FILL_TEXT_DEFAULTS.fontWeight);
              setTrackingTight(PAINT_FILL_TEXT_DEFAULTS.trackingTight);
              setLeadingNone(PAINT_FILL_TEXT_DEFAULTS.leadingNone);
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
      <Title>Paint Fill Text.</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        텍스트가 물감이 채워지는 듯한 애니메이션 효과를 적용하여 위에서 아래로 색상이 채워지는 시각적 효과를 구현합니다.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="flex items-center justify-center min-h-[200px] p-8 md:p-16">
            <PaintFillText
              key={`${text}-${duration}-${delay}-${textColor}-${fontSize}-${fontWeight}-${trackingTight}-${leadingNone}`}
              text={text}
              duration={duration}
              delay={delay}
              textColor={textColor}
              fontSize={fontSize}
              fontWeight={fontWeight}
              trackingTight={trackingTight}
              leadingNone={leadingNone}
            />
          </div>
        }
        usageContent={usageExample}
        codeContent={`${paintFillTextCode}\n\n/* CSS Module */\n${cssModuleCode}`}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="컴포넌트가 마운트되거나 애니메이션이 시작될 때"
        what="텍스트를"
        how="CSS clip-path와 background-clip을 활용하여 물감이 채워지는 듯한 애니메이션으로 표현하고, 외곽선과 채워진 텍스트를 겹쳐서 입체감 구현"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="PaintFillText 컴포넌트를 만들어주세요. 이 컴포넌트는 텍스트가 물감이 채워지는 듯한 애니메이션 효과를 보여줍니다. text prop으로 표시할 텍스트를, duration prop으로 애니메이션 지속시간을, delay prop으로 시작 지연시간을, textColor prop으로 채워질 색상을, fontSize prop으로 텍스트 크기를, fontWeight prop으로 글꼴 두께를 설정할 수 있게 해주세요. CSS 모듈을 사용하여 clip-path와 background-clip을 활용한 물감 채우기 애니메이션을 구현하고, 외곽선 텍스트와 채워진 텍스트를 겹쳐서 입체감을 표현해주세요. trackingTight와 leadingNone 옵션으로 텍스트 스타일을 조정할 수 있게 해주세요." />
    </div>
  );
}
