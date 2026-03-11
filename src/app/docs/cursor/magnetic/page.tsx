"use client";

import { useState } from "react";
import MagneticCursor from "@/components/common/framer-motion/cursor/MagneticCursor";
import MagneticTargetBox from "@/components/common/framer-motion/cursor/MagneticTargetBox";
import TabInterface from "@/components/common/TabInterface";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import Title from "../../components/Title";
import {
  MAGNETIC_CURSOR_DEFAULTS,
  BOX_COLOR_OPTIONS,
  TEXT_COLOR_OPTIONS,
  BORDER_STYLE_OPTIONS,
  BORDER_COLOR_OPTIONS,
  FONT_SIZE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
} from "./constants";

export default function MagneticCursorDocsPage() {
  // 컨트롤 상태
  const [boxWidth, setBoxWidth] = useState(MAGNETIC_CURSOR_DEFAULTS.boxWidth);
  const [boxHeight, setBoxHeight] = useState(MAGNETIC_CURSOR_DEFAULTS.boxHeight);
  const [boxText, setBoxText] = useState(MAGNETIC_CURSOR_DEFAULTS.boxText);
  const [boxColor, setBoxColor] = useState(MAGNETIC_CURSOR_DEFAULTS.boxColor);
  const [textColor, setTextColor] = useState(MAGNETIC_CURSOR_DEFAULTS.textColor);
  const [borderStyle, setBorderStyle] = useState(MAGNETIC_CURSOR_DEFAULTS.borderStyle);
  const [borderColor, setBorderColor] = useState(MAGNETIC_CURSOR_DEFAULTS.borderColor);
  const [fontSize, setFontSize] = useState(MAGNETIC_CURSOR_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(MAGNETIC_CURSOR_DEFAULTS.fontWeight);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    navigator.clipboard.writeText(magneticCursorCode);
  };

  // Usage 예제 코드
  const usageExample = `import MagneticCursor from "@/components/common/framer-motion/cursor/MagneticCursor";
import MagneticTargetBox from "@/components/common/framer-motion/cursor/MagneticTargetBox";

// 기본 사용법
<>
  <MagneticCursor />
  <div className="flex flex-wrap items-center justify-center gap-6">
    <MagneticTargetBox>HOVER ME</MagneticTargetBox>
    <MagneticTargetBox className="bg-red-600 text-white border-dashed border-white">
      MAGNETIC
    </MagneticTargetBox>
  </div>
</>

// 커스텀 스타일링
<>
  <MagneticCursor />
  <div className="flex flex-wrap items-center justify-center gap-8">
    <MagneticTargetBox className="bg-blue-600 text-white border-solid border-yellow-400 text-xl font-bold">
      INTERACT
    </MagneticTargetBox>
    <MagneticTargetBox className="bg-green-600 text-white border-dotted border-white text-lg">
      EFFECT
    </MagneticTargetBox>
  </div>
</>

// 다양한 크기와 스타일
<>
  <MagneticCursor />
  <div className="flex flex-wrap items-center justify-center gap-4">
    <MagneticTargetBox className="w-32 h-32 bg-purple-600 text-white text-sm">
      SMALL
    </MagneticTargetBox>
    <MagneticTargetBox className="w-48 h-24 bg-orange-500 text-white text-lg font-bold">
      MEDIUM
    </MagneticTargetBox>
    <MagneticTargetBox className="w-64 h-20 bg-teal-600 text-white text-xl">
      LARGE
    </MagneticTargetBox>
  </div>
</>`;

  // 컴포넌트 소스 코드
  const magneticCursorCode = `"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// MagneticCursor 컴포넌트
export default function MagneticCursor() {
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
    <motion.div
      className="fixed pointer-events-none z-50 w-4 h-4 bg-white rounded-full mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        x: cursorX.get() - 8,
        y: cursorY.get() - 8,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isVisible ? 1 : 0,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.2 }}
    />
  );
}

// MagneticTargetBox 컴포넌트
interface MagneticTargetBoxProps {
  children: React.ReactNode;
  className?: string;
}

export function MagneticTargetBox({ children, className = "" }: MagneticTargetBoxProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={\`flex items-center justify-center rounded-lg border-2 transition-colors \${className}\`}
      style={{
        width: "200px",
        height: "100px",
        backgroundColor: "#3b82f6",
        color: "white",
        fontSize: "16px",
        fontWeight: "600",
      }}
      animate={{
        x: isHovered ? mousePosition.x * 0.1 : 0,
        y: isHovered ? mousePosition.y * 0.1 : 0,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ duration: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}`;

  // 컨트롤 패널
  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* BOX TEXT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Box Text</label>
            <p className="text-xs text-gray-400">박스에 표시될 텍스트</p>
            <input
              type="text"
              value={boxText}
              onChange={(e) => setBoxText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
              placeholder="박스 텍스트를 입력하세요"
            />
          </div>

          {/* BOX WIDTH */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Box Width</label>
            <p className="text-xs text-gray-400">박스 너비 (px)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="100"
                max="400"
                step="10"
                value={boxWidth}
                onChange={(e) => setBoxWidth(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={boxWidth}
                onChange={(e) => setBoxWidth(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="100"
                max="400"
                step="10"
              />
            </div>
          </div>

          {/* BOX HEIGHT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Box Height</label>
            <p className="text-xs text-gray-400">박스 높이 (px)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="50"
                max="200"
                step="10"
                value={boxHeight}
                onChange={(e) => setBoxHeight(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={boxHeight}
                onChange={(e) => setBoxHeight(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="50"
                max="200"
                step="10"
              />
            </div>
          </div>

          {/* BOX COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Box Color</label>
            <p className="text-xs text-gray-400">박스 배경 색상</p>
            <select
              value={boxColor}
              onChange={(e) => setBoxColor(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {BOX_COLOR_OPTIONS.map((option) => (
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
              {TEXT_COLOR_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* BORDER STYLE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Border Style</label>
            <p className="text-xs text-gray-400">테두리 스타일</p>
            <select
              value={borderStyle}
              onChange={(e) => setBorderStyle(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {BORDER_STYLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* BORDER COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Border Color</label>
            <p className="text-xs text-gray-400">테두리 색상</p>
            <select
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {BORDER_COLOR_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
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
              setBoxWidth(MAGNETIC_CURSOR_DEFAULTS.boxWidth);
              setBoxHeight(MAGNETIC_CURSOR_DEFAULTS.boxHeight);
              setBoxText(MAGNETIC_CURSOR_DEFAULTS.boxText);
              setBoxColor(MAGNETIC_CURSOR_DEFAULTS.boxColor);
              setTextColor(MAGNETIC_CURSOR_DEFAULTS.textColor);
              setBorderStyle(MAGNETIC_CURSOR_DEFAULTS.borderStyle);
              setBorderColor(MAGNETIC_CURSOR_DEFAULTS.borderColor);
              setFontSize(MAGNETIC_CURSOR_DEFAULTS.fontSize);
              setFontWeight(MAGNETIC_CURSOR_DEFAULTS.fontWeight);
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
      <MagneticCursor />
      <Title>Magnetic Cursor</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        마우스 커서가 자석처럼 끌리는 효과를 구현합니다. framer-motion을 활용하여 마우스 위치를 감지하고, 타겟 요소에
        가까워질수록 커서가 자연스럽게 끌리는 애니메이션을 제공합니다.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <MagneticTargetBox
                style={{
                  width: `${boxWidth}px`,
                  height: `${boxHeight}px`,
                  backgroundColor: boxColor,
                  color: textColor,
                  fontSize: fontSize,
                  fontWeight: fontWeight,
                  borderStyle: borderStyle,
                  borderColor: borderColor,
                }}
              >
                {boxText}
              </MagneticTargetBox>
              <MagneticTargetBox className="bg-red-600 text-white border-dashed border-white">HOVER</MagneticTargetBox>
              <MagneticTargetBox className="bg-green-600 text-white border-solid border-yellow-400">
                INTERACT
              </MagneticTargetBox>
            </div>
          </div>
        }
        usageContent={usageExample}
        codeContent={magneticCursorCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="사용자가 마우스를 타겟 요소 위에 올렸을 때"
        what="커서를"
        how="framer-motion의 useMotionValue와 useSpring을 활용하여 마우스 위치에 따라 자석처럼 끌리는 애니메이션으로 표현하고, 스프링 물리 효과를 적용하여 자연스러운 움직임 구현"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="MagneticCursor와 MagneticTargetBox 컴포넌트를 만들어주세요. MagneticCursor는 커스텀 커서를 생성하고, MagneticTargetBox는 자석 효과가 적용되는 타겟 요소입니다. MagneticCursor는 framer-motion의 useMotionValue와 useSpring을 활용하여 마우스 위치를 감지하고, 커스텀 커서가 마우스를 따라 움직이도록 구현해주세요. MagneticTargetBox는 마우스가 가까워질수록 커서가 끌리는 효과를 구현하고, hover 시 스케일과 위치 변화 애니메이션을 적용해주세요. 스프링 물리 효과를 적용하여 자연스러운 애니메이션을 구현하고, mix-blend-difference를 활용하여 커서의 가시성을 확보해주세요." />
    </div>
  );
}
