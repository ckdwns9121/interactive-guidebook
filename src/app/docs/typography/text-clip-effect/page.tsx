"use client";
import { useState } from "react";
import TextClipEffectItem from "@/components/common/framer-motion/typography/TextClipEffectItem";
import TabInterface from "@/components/common/TabInterface";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import Title from "../../components/Title";
const TEXT_CLIP_EFFECT_DEFAULTS = {
  items: [
    { main: "Hello", sub: "Hello" },
    { main: "javascript", sub: "javascript" },
    { main: "typescript", sub: "typescript" },
  ],
  clipColor: "#ff6b6b",
  fontSize: "text-4xl",
  fontWeight: "font-bold",
  showMarkers: false,
  startPosition: "top center",
  endPosition: "bottom center",
  scrubEffect: false,
};

const FONT_SIZE_OPTIONS = [
  { value: "text-2xl", label: "2XL" },
  { value: "text-3xl", label: "3XL" },
  { value: "text-4xl", label: "4XL" },
  { value: "text-5xl", label: "5XL" },
  { value: "text-6xl", label: "6XL" },
];

const FONT_WEIGHT_OPTIONS = [
  { value: "font-normal", label: "Normal" },
  { value: "font-medium", label: "Medium" },
  { value: "font-semibold", label: "Semibold" },
  { value: "font-bold", label: "Bold" },
  { value: "font-black", label: "Black" },
];

const COLOR_PRESETS = [
  { value: "#ff6b6b", label: "Red" },
  { value: "#4ecdc4", label: "Teal" },
  { value: "#45b7d1", label: "Blue" },
  { value: "#96ceb4", label: "Green" },
  { value: "#ffeaa7", label: "Yellow" },
  { value: "#dfe6e9", label: "Gray" },
  { value: "#a29bfe", label: "Purple" },
  { value: "#fd79a8", label: "Pink" },
];

const SCROLL_TRIGGER_POSITIONS = [
  { value: "top bottom", label: "Top Bottom" },
  { value: "top center", label: "Top Center" },
  { value: "top top", label: "Top Top" },
  { value: "center bottom", label: "Center Bottom" },
  { value: "center center", label: "Center Center" },
  { value: "center top", label: "Center Top" },
];

const END_POSITIONS = [
  { value: "bottom bottom", label: "Bottom Bottom" },
  { value: "bottom center", label: "Bottom Center" },
  { value: "bottom top", label: "Bottom Top" },
  { value: "center bottom", label: "Center Bottom" },
  { value: "center center", label: "Center Center" },
  { value: "center top", label: "Center Top" },
];

export default function TextClipEffectPage() {
  // 컨트롤 상태
  const [items, setItems] = useState(TEXT_CLIP_EFFECT_DEFAULTS.items);
  const [clipColor, setClipColor] = useState(TEXT_CLIP_EFFECT_DEFAULTS.clipColor);
  const [fontSize, setFontSize] = useState(TEXT_CLIP_EFFECT_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(TEXT_CLIP_EFFECT_DEFAULTS.fontWeight);
  const [showMarkers, setShowMarkers] = useState(TEXT_CLIP_EFFECT_DEFAULTS.showMarkers);
  const [startPosition, setStartPosition] = useState(TEXT_CLIP_EFFECT_DEFAULTS.startPosition);
  const [endPosition, setEndPosition] = useState(TEXT_CLIP_EFFECT_DEFAULTS.endPosition);
  const [scrubEffect, setScrubEffect] = useState(TEXT_CLIP_EFFECT_DEFAULTS.scrubEffect);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    navigator.clipboard.writeText(textClipEffectCode);
  };

  // 텍스트 배열을 문자열로 변환/파싱하는 헬퍼 함수
  const itemsToString = (items: typeof TEXT_CLIP_EFFECT_DEFAULTS.items) =>
    items.map((item) => `${item.main}|${item.sub}`).join("\n");

  const stringToItems = (str: string) =>
    str
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const [main, sub] = line.split("|");
        return { main: main || "", sub: sub || main || "" };
      });

  // Usage 예제 코드
  const usageExample = `import TextClipEffectItem from "@/components/common/framer-motion/typography/TextClipEffectItem";

// 기본 사용법
<TextClipEffectItem
  main="Hello"
  sub="Hello"
  className="text-4xl"
  clipColor="#ffffff"
  showMarkers={false}
  startPosition="top center"
  endPosition="bottom center"
  scrubEffect={false}
/>

// 여러 항목 사용
const items = [
  { main: "Hello", sub: "Hello" },
  { main: "javascript", sub: "javascript" },
  { main: "typescript", sub: "typescript" }
];

{items.map((item, index) => (
  <TextClipEffectItem
    key={index}
    main={item.main}
    sub={item.sub}
    className="text-3xl font-bold"
    clipColor="#ff6b6b"
    showMarkers={true}
    startPosition="top center"
    endPosition="center center"
    scrubEffect={true}
  />
))}

// 커스텀 설정
<TextClipEffectItem
  main="Custom Text"
  sub="Custom Subtitle"
  className="text-6xl font-black"
  clipColor="#4ecdc4"
  showMarkers={true}
  startPosition="top center"
  endPosition="bottom center"
  scrubEffect={true}
/>`;

  // 컴포넌트 소스 코드
  const textClipEffectCode = `"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextClipEffectItemProps {
  main: string;
  sub: string;
  className?: string;
  clipColor?: string;
  showMarkers?: boolean;
  startPosition?: string;
  endPosition?: string;
  scrubEffect?: boolean;
}

export default function TextClipEffectItem({
  main,
  sub,
  className = "",
  clipColor = "#ffffff",
  showMarkers = false,
  startPosition = "top center",
  endPosition = "bottom center",
  scrubEffect = false,
}: TextClipEffectItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [startPosition, endPosition],
  });

  const clipProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 100]
  );

  const mainOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  const subOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [1, 0, 0, 1]
  );

  return (
    <div ref={containerRef} className={\`relative \${className}\`}>
      {/* 마커 표시 */}
      {showMarkers && (
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500 opacity-50" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 opacity-50" />
        </div>
      )}

      {/* 메인 텍스트 */}
      <motion.div
        className="relative"
        style={{ opacity: mainOpacity }}
      >
        <div className="relative">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
            {main}
          </span>
          <motion.div
            className="absolute inset-0 bg-clip-text text-transparent"
            style={{
              background: \`linear-gradient(to right, \${clipColor}, \${clipColor})\`,
              clipPath: \`inset(0 \${100 - (scrubEffect ? scrollYProgress.get() * 100 : clipProgress.get())}% 0 0)\`,
            }}
          >
            {main}
          </motion.div>
        </div>
      </motion.div>

      {/* 서브 텍스트 */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: subOpacity }}
      >
        <span className="text-gray-400">{sub}</span>
      </motion.div>
    </div>
  );
}`;

  // 컨트롤 패널
  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* TEXT ITEMS */}
          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Text Items</label>
            <p className="text-xs text-gray-400">텍스트 항목들 (main|sub 형식으로 줄바꿈으로 구분)</p>
            <textarea
              value={itemsToString(items)}
              onChange={(e) => setItems(stringToItems(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none placeholder-gray-400"
              rows={4}
              placeholder="Hello|Hello&#10;javascript|javascript&#10;typescript|typescript"
            />
          </div>

          {/* CLIP COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Clip Color</label>
            <p className="text-xs text-gray-400">클립 배경 색상</p>
            <div className="flex items-center space-x-3 mb-2">
              <input
                type="color"
                value={clipColor}
                onChange={(e) => setClipColor(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={clipColor}
                onChange={(e) => setClipColor(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#ffffff"
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setClipColor(preset.value)}
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

          {/* START POSITION */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Start Position</label>
            <p className="text-xs text-gray-400">애니메이션 시작 위치</p>
            <select
              value={startPosition}
              onChange={(e) => setStartPosition(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {SCROLL_TRIGGER_POSITIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* END POSITION */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">End Position</label>
            <p className="text-xs text-gray-400">애니메이션 끝 위치</p>
            <select
              value={endPosition}
              onChange={(e) => setEndPosition(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {END_POSITIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* TOGGLE OPTIONS */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Options</label>
            <p className="text-xs text-gray-400">애니메이션 옵션</p>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showMarkers}
                  onChange={(e) => setShowMarkers(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-black/20 text-blue-600 focus:ring-blue-400 focus:ring-2"
                />
                <span className="text-sm text-gray-200">Show Markers</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={scrubEffect}
                  onChange={(e) => setScrubEffect(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-black/20 text-blue-600 focus:ring-blue-400 focus:ring-2"
                />
                <span className="text-sm text-gray-200">Scrub Effect</span>
              </label>
            </div>
          </div>
        </div>

        {/* 리셋 버튼 */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={() => {
              setItems(TEXT_CLIP_EFFECT_DEFAULTS.items);
              setClipColor(TEXT_CLIP_EFFECT_DEFAULTS.clipColor);
              setFontSize(TEXT_CLIP_EFFECT_DEFAULTS.fontSize);
              setFontWeight(TEXT_CLIP_EFFECT_DEFAULTS.fontWeight);
              setShowMarkers(TEXT_CLIP_EFFECT_DEFAULTS.showMarkers);
              setStartPosition(TEXT_CLIP_EFFECT_DEFAULTS.startPosition);
              setEndPosition(TEXT_CLIP_EFFECT_DEFAULTS.endPosition);
              setScrubEffect(TEXT_CLIP_EFFECT_DEFAULTS.scrubEffect);
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
      <Title>Text Clip.</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        스크롤에 따라 텍스트가 클립되는 효과를 적용합니다. 스크롤 진행도에 따라 텍스트가 위에서 아래로 색상이 채워지는
        시각적 효과를 구현하며, 메인 텍스트와 서브 텍스트 간의 전환 애니메이션을 제공합니다.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="p-8 md:p-16 min-h-[60vh]">
            <div className={`flex flex-col gap-8 ${fontWeight}`}>
              {items.map((item, index) => (
                <TextClipEffectItem
                  key={`${item.main}-${index}-${clipColor}-${showMarkers}-${startPosition}-${endPosition}-${scrubEffect}`}
                  main={item.main}
                  sub={item.sub}
                  className={fontSize}
                  clipColor={clipColor}
                  showMarkers={showMarkers}
                  startPosition={startPosition}
                  endPosition={endPosition}
                  scrubEffect={scrubEffect}
                />
              ))}
            </div>
          </div>
        }
        usageContent={usageExample}
        codeContent={textClipEffectCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="사용자가 텍스트 영역을 스크롤할 때"
        what="텍스트를"
        how="스크롤 진행도에 따라 클립 마스크를 적용하여 위에서 아래로 색상이 채워지는 효과로 표현하고, 메인과 서브 텍스트 간의 부드러운 전환 애니메이션 구현"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="TextClipEffectItem 컴포넌트를 만들어주세요. 이 컴포넌트는 스크롤에 따라 텍스트가 클립되는 효과를 보여줍니다. main과 sub prop으로 메인 텍스트와 서브 텍스트를, className prop으로 스타일링을, clipColor prop으로 클립 색상을 설정할 수 있게 해주세요. showMarkers prop으로 마커 표시 여부를, startPosition과 endPosition prop으로 애니메이션 시작/끝 위치를, scrubEffect prop으로 스크럽 효과를 설정할 수 있게 해주세요. framer-motion의 useScroll과 useTransform을 활용하여 스크롤 진행도를 감지하고, clipPath를 사용하여 텍스트 클립 효과를 구현해주세요. 메인 텍스트와 서브 텍스트 간의 opacity 전환 애니메이션도 추가해주세요." />
    </div>
  );
}
