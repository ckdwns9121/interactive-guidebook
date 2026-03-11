"use client";

import { useState } from "react";
import OverlayCursorProvider from "@/components/common/framer-motion/cursor/OverlayCursor";
import TabInterface from "@/components/common/TabInterface";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import Title from "../../components/Title";
import { OVERLAY_CURSOR_DEFAULTS, TEXT_SIZE_OPTIONS, COLOR_PRESETS } from "./constants";

export default function OverlayCursorDemoPage() {
  // 컨트롤 상태
  const [cursorText, setCursorText] = useState(OVERLAY_CURSOR_DEFAULTS.cursorText);
  const [cursorSize, setCursorSize] = useState(OVERLAY_CURSOR_DEFAULTS.cursorSize);
  const [cursorColor, setCursorColor] = useState(OVERLAY_CURSOR_DEFAULTS.cursorColor);
  const [demoText, setDemoText] = useState(OVERLAY_CURSOR_DEFAULTS.demoText);
  const [demoTextSize, setDemoTextSize] = useState(OVERLAY_CURSOR_DEFAULTS.demoTextSize);
  const [demoTextColor, setDemoTextColor] = useState(OVERLAY_CURSOR_DEFAULTS.demoTextColor);
  const [demoBgColor, setDemoBgColor] = useState(OVERLAY_CURSOR_DEFAULTS.demoBgColor);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    navigator.clipboard.writeText(overlayCursorCode);
  };

  // Usage 예제 코드
  const usageExample = `import OverlayCursorProvider from "@/components/common/framer-motion/cursor/OverlayCursor";

// 기본 사용법
<OverlayCursorProvider
  cursorText="HOVER"
  cursorSize={80}
  cursorColor="#ff69b4"
>
  <div className="w-full max-w-[480px] h-40 mx-auto rounded-lg shadow-md flex items-center justify-center text-2xl font-bold text-center px-4 bg-white text-pink-500">
    마우스를 올려보세요
  </div>
</OverlayCursorProvider>

// 커스텀 설정
<OverlayCursorProvider
  cursorText="CLICK"
  cursorSize={100}
  cursorColor="#4f46e5"
>
  <div className="w-full max-w-[600px] h-60 mx-auto rounded-xl shadow-lg flex items-center justify-center text-3xl font-bold text-center px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
    인터랙티브 영역
  </div>
</OverlayCursorProvider>

// 아이콘 커서
<OverlayCursorProvider
  cursorText="→"
  cursorSize={60}
  cursorColor="#10b981"
>
  <div className="w-full max-w-[400px] h-32 mx-auto rounded-lg shadow-md flex items-center justify-center text-xl font-semibold text-center px-4 bg-emerald-50 text-emerald-700">
    화살표 커서
  </div>
</OverlayCursorProvider>`;

  // 컴포넌트 소스 코드
  const overlayCursorCode = `"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface OverlayCursorProviderProps {
  children: React.ReactNode;
  cursorText?: string;
  cursorSize?: number;
  cursorColor?: string;
}

export default function OverlayCursorProvider({
  children,
  cursorText = "HOVER",
  cursorSize = 80,
  cursorColor = "#ff69b4",
}: OverlayCursorProviderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {children}
      
      {/* 커스텀 커서 */}
      <motion.div
        className="fixed pointer-events-none z-50 flex items-center justify-center rounded-full text-white font-bold text-sm"
        style={{
          x: cursorX,
          y: cursorY,
          width: cursorSize,
          height: cursorSize,
          backgroundColor: cursorColor,
          opacity: isVisible ? 1 : 0,
          x: cursorX.get() - cursorSize / 2,
          y: cursorY.get() - cursorSize / 2,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {cursorText}
      </motion.div>
    </>
  );
}`;

  // 컨트롤 패널
  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* CURSOR TEXT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Cursor Text</label>
            <p className="text-xs text-gray-400">커서 안에 표시될 텍스트</p>
            <input
              type="text"
              value={cursorText}
              onChange={(e) => setCursorText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
              placeholder="커서 텍스트를 입력하세요"
            />
          </div>

          {/* CURSOR SIZE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Cursor Size</label>
            <p className="text-xs text-gray-400">커서 크기</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="30"
                max="150"
                value={cursorSize}
                onChange={(e) => setCursorSize(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={cursorSize}
                onChange={(e) => setCursorSize(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="30"
                max="150"
              />
            </div>
          </div>

          {/* CURSOR COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Cursor Color</label>
            <p className="text-xs text-gray-400">커서 배경 색상</p>
            <div className="flex items-center space-x-3 mb-2">
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
                placeholder="#ff69b4"
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setCursorColor(preset.value)}
                  className="w-6 h-6 rounded border border-gray-600 hover:scale-110 transition-transform"
                  style={{ backgroundColor: preset.value }}
                  title={preset.label}
                />
              ))}
            </div>
          </div>

          {/* DEMO TEXT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Demo Text</label>
            <p className="text-xs text-gray-400">데모 영역의 텍스트</p>
            <textarea
              value={demoText}
              onChange={(e) => setDemoText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none placeholder-gray-400"
              rows={2}
              placeholder="데모 텍스트를 입력하세요"
            />
          </div>

          {/* DEMO TEXT SIZE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Demo Text Size</label>
            <p className="text-xs text-gray-400">데모 텍스트 크기</p>
            <select
              value={demoTextSize}
              onChange={(e) => setDemoTextSize(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {TEXT_SIZE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* DEMO TEXT COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Demo Text Color</label>
            <p className="text-xs text-gray-400">데모 텍스트 색상</p>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={demoTextColor}
                onChange={(e) => setDemoTextColor(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={demoTextColor}
                onChange={(e) => setDemoTextColor(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#ec4899"
              />
            </div>
          </div>

          {/* DEMO BACKGROUND COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Demo Background</label>
            <p className="text-xs text-gray-400">데모 영역 배경색</p>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={demoBgColor}
                onChange={(e) => setDemoBgColor(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={demoBgColor}
                onChange={(e) => setDemoBgColor(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>

        {/* 리셋 버튼 */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={() => {
              setCursorText(OVERLAY_CURSOR_DEFAULTS.cursorText);
              setCursorSize(OVERLAY_CURSOR_DEFAULTS.cursorSize);
              setCursorColor(OVERLAY_CURSOR_DEFAULTS.cursorColor);
              setDemoText(OVERLAY_CURSOR_DEFAULTS.demoText);
              setDemoTextSize(OVERLAY_CURSOR_DEFAULTS.demoTextSize);
              setDemoTextColor(OVERLAY_CURSOR_DEFAULTS.demoTextColor);
              setDemoBgColor(OVERLAY_CURSOR_DEFAULTS.demoBgColor);
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
      <Title>Overlay Mouse Cursor.</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        마우스 커서가 영역 위에서 부드럽게 변형되는 인터랙션을 구현합니다. framer-motion을 활용하여 커스텀 커서를
        생성하고, 마우스 움직임에 따라 자연스럽게 따라가는 애니메이션을 제공합니다.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="min-h-[40vh] flex items-center justify-center">
            <OverlayCursorProvider
              key={`${cursorText}-${cursorSize}-${cursorColor}`}
              cursorText={cursorText}
              cursorSize={cursorSize}
              cursorColor={cursorColor}
            >
              <div
                className={`w-full max-w-[480px] h-40 mx-auto rounded-lg shadow-md flex items-center justify-center ${demoTextSize} font-bold text-center px-4`}
                style={{
                  backgroundColor: demoBgColor,
                  color: demoTextColor,
                }}
              >
                {demoText}
              </div>
            </OverlayCursorProvider>
          </div>
        }
        usageContent={usageExample}
        codeContent={overlayCursorCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="사용자가 마우스를 움직일 때"
        what="커스텀 커서를"
        how="framer-motion의 useMotionValue와 useSpring을 활용하여 마우스 위치에 따라 부드럽게 따라가는 애니메이션으로 표현하고, 스프링 물리 효과를 적용하여 자연스러운 움직임 구현"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="OverlayCursorProvider 컴포넌트를 만들어주세요. 이 컴포넌트는 마우스 커서가 영역 위에서 부드럽게 변형되는 인터랙션을 보여줍니다. children prop으로 감싸질 콘텐츠를, cursorText prop으로 커서 안에 표시될 텍스트를, cursorSize prop으로 커서 크기를, cursorColor prop으로 커서 배경 색상을 설정할 수 있게 해주세요. framer-motion의 useMotionValue와 useSpring을 활용하여 마우스 위치를 감지하고, 커스텀 커서가 마우스를 따라 움직이도록 구현해주세요. 스프링 물리 효과를 적용하여 자연스러운 애니메이션을 구현하고, 마우스 진입/이탈 시 커서의 표시/숨김 효과도 추가해주세요." />
    </div>
  );
}
