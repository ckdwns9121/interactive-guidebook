"use client";

import { useState } from "react";
import TiltCard from "@/components/common/effects/TiltCard";
import TabInterface from "@/components/common/TabInterface";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import Title from "../../components/Title";
import {
  TILT_CARD_DEFAULTS,
  BACKGROUND_COLOR_OPTIONS,
  PADDING_OPTIONS,
  BORDER_RADIUS_OPTIONS,
  SHADOW_OPTIONS,
} from "./constants";

export default function TiltCardDocsPage() {
  // 컨트롤 상태
  const [maxTilt, setMaxTilt] = useState(TILT_CARD_DEFAULTS.maxTilt);
  const [parallaxFactor, setParallaxFactor] = useState(TILT_CARD_DEFAULTS.parallaxFactor);
  const [cardWidth, setCardWidth] = useState(TILT_CARD_DEFAULTS.cardWidth);
  const [cardHeight, setCardHeight] = useState(TILT_CARD_DEFAULTS.cardHeight);
  const [backgroundColor, setBackgroundColor] = useState(TILT_CARD_DEFAULTS.backgroundColor);
  const [cardPadding, setCardPadding] = useState(TILT_CARD_DEFAULTS.cardPadding);
  const [borderRadius, setBorderRadius] = useState(TILT_CARD_DEFAULTS.borderRadius);
  const [shadow, setShadow] = useState(TILT_CARD_DEFAULTS.shadow);
  const [titleText, setTitleText] = useState(TILT_CARD_DEFAULTS.titleText);
  const [titleSize, setTitleSize] = useState(TILT_CARD_DEFAULTS.titleSize);
  const [titleWeight, setTitleWeight] = useState(TILT_CARD_DEFAULTS.titleWeight);
  const [titleColor, setTitleColor] = useState(TILT_CARD_DEFAULTS.titleColor);
  const [descriptionText, setDescriptionText] = useState(TILT_CARD_DEFAULTS.descriptionText);
  const [descriptionSize, setDescriptionSize] = useState(TILT_CARD_DEFAULTS.descriptionSize);
  const [descriptionColor, setDescriptionColor] = useState(TILT_CARD_DEFAULTS.descriptionColor);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    navigator.clipboard.writeText(tiltCardCode);
  };

  // Usage 예제 코드
  const usageExample = `import TiltCard from "@/components/common/effects/TiltCard";

// 기본 사용법
<TiltCard maxTilt={15} parallaxFactor={0.5}>
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-bold text-gray-800 mb-2">카드 제목</h3>
    <p className="text-gray-600">카드 내용입니다.</p>
  </div>
</TiltCard>

// 커스텀 설정
<TiltCard maxTilt={25} parallaxFactor={0.8}>
  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-xl shadow-2xl">
    <h3 className="text-2xl font-bold text-white mb-4">인터랙티브 카드</h3>
    <p className="text-blue-100">마우스 움직임에 따라 기울어지는 카드입니다.</p>
  </div>
</TiltCard>

// 이미지 카드
<TiltCard maxTilt={20} parallaxFactor={0.6}>
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <img src="/image.jpg" alt="카드 이미지" className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">이미지 카드</h3>
      <p className="text-gray-600">이미지가 포함된 틸트 카드입니다.</p>
    </div>
  </div>
</TiltCard>`;

  // 컴포넌트 소스 코드
  const tiltCardCode = `"use client";

import { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  maxTilt?: number;
  parallaxFactor?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function TiltCard({
  children,
  maxTilt = 15,
  parallaxFactor = 0.5,
  style,
  className = "",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-1, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseX, [-1, 1], [-maxTilt, maxTilt]);

  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseXFromCenter = e.clientX - centerX;
    const mouseYFromCenter = e.clientY - centerY;

    const normalizedX = mouseXFromCenter / (rect.width / 2);
    const normalizedY = mouseYFromCenter / (rect.height / 2);

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      className={\`perspective-1000 \${className}\`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <motion.div
        className="w-full h-full"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            transform: \`translateZ(\${parallaxFactor * 50}px)\`,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}`;

  // 컨트롤 패널
  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* MAX TILT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Max Tilt</label>
            <p className="text-xs text-gray-400">최대 기울기 각도 (도)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="5"
                max="45"
                step="1"
                value={maxTilt}
                onChange={(e) => setMaxTilt(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={maxTilt}
                onChange={(e) => setMaxTilt(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="5"
                max="45"
                step="1"
              />
            </div>
          </div>

          {/* PARALLAX FACTOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Parallax Factor</label>
            <p className="text-xs text-gray-400">패럴럭스 깊이 강도</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={parallaxFactor}
                onChange={(e) => setParallaxFactor(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={parallaxFactor}
                onChange={(e) => setParallaxFactor(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0"
                max="1"
                step="0.05"
              />
            </div>
          </div>

          {/* CARD WIDTH */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Card Width</label>
            <p className="text-xs text-gray-400">카드 너비 (px)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="200"
                max="600"
                step="20"
                value={cardWidth}
                onChange={(e) => setCardWidth(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={cardWidth}
                onChange={(e) => setCardWidth(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="200"
                max="600"
                step="20"
              />
            </div>
          </div>

          {/* CARD HEIGHT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Card Height</label>
            <p className="text-xs text-gray-400">카드 높이 (px)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="200"
                max="500"
                step="20"
                value={cardHeight}
                onChange={(e) => setCardHeight(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={cardHeight}
                onChange={(e) => setCardHeight(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="200"
                max="500"
                step="20"
              />
            </div>
          </div>

          {/* BACKGROUND COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Background Color</label>
            <p className="text-xs text-gray-400">카드 배경색</p>
            <select
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {BACKGROUND_COLOR_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* PADDING */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Padding</label>
            <p className="text-xs text-gray-400">카드 내부 여백</p>
            <select
              value={cardPadding}
              onChange={(e) => setCardPadding(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {PADDING_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* BORDER RADIUS */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Border Radius</label>
            <p className="text-xs text-gray-400">모서리 둥글기</p>
            <select
              value={borderRadius}
              onChange={(e) => setBorderRadius(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {BORDER_RADIUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* SHADOW */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Shadow</label>
            <p className="text-xs text-gray-400">그림자 강도</p>
            <select
              value={shadow}
              onChange={(e) => setShadow(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {SHADOW_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* TITLE TEXT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Title Text</label>
            <p className="text-xs text-gray-400">카드 제목</p>
            <input
              type="text"
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
              placeholder="카드 제목을 입력하세요"
            />
          </div>
        </div>

        {/* 리셋 버튼 */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={() => {
              setMaxTilt(TILT_CARD_DEFAULTS.maxTilt);
              setParallaxFactor(TILT_CARD_DEFAULTS.parallaxFactor);
              setCardWidth(TILT_CARD_DEFAULTS.cardWidth);
              setCardHeight(TILT_CARD_DEFAULTS.cardHeight);
              setBackgroundColor(TILT_CARD_DEFAULTS.backgroundColor);
              setCardPadding(TILT_CARD_DEFAULTS.cardPadding);
              setBorderRadius(TILT_CARD_DEFAULTS.borderRadius);
              setShadow(TILT_CARD_DEFAULTS.shadow);
              setTitleText(TILT_CARD_DEFAULTS.titleText);
              setTitleSize(TILT_CARD_DEFAULTS.titleSize);
              setTitleWeight(TILT_CARD_DEFAULTS.titleWeight);
              setTitleColor(TILT_CARD_DEFAULTS.titleColor);
              setDescriptionText(TILT_CARD_DEFAULTS.descriptionText);
              setDescriptionSize(TILT_CARD_DEFAULTS.descriptionSize);
              setDescriptionColor(TILT_CARD_DEFAULTS.descriptionColor);
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
      <Title>Tilt Card.</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        마우스 움직임에 따라 3D 기울기 효과를 적용하는 인터랙티브 카드입니다. 마우스 위치에 따라 카드가 자연스럽게
        기울어지며, 패럴럭스 효과와 스프링 애니메이션을 통해 부드러운 사용자 경험을 제공합니다.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="flex justify-center">
            <TiltCard
              maxTilt={maxTilt}
              parallaxFactor={parallaxFactor}
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
              }}
            >
              <div
                className={`${backgroundColor} ${cardPadding} ${borderRadius} ${shadow} w-full h-full flex flex-col justify-center items-center text-center`}
              >
                <h3 className={`${titleSize} ${titleWeight} ${titleColor} mb-4`}>{titleText}</h3>
                <p className={`${descriptionSize} ${descriptionColor}`}>{descriptionText}</p>
              </div>
            </TiltCard>
          </div>
        }
        usageContent={usageExample}
        codeContent={tiltCardCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="사용자가 카드 위에서 마우스를 움직일 때"
        what="카드를"
        how="마우스 위치에 따라 3D 회전과 패럴럭스 효과를 적용하여 입체감 있는 인터랙션으로 표현"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="TiltCard 컴포넌트를 만들어주세요. 이 컴포넌트는 마우스 움직임에 따라 3D 기울기 효과를 적용하는 인터랙티브 카드를 보여줍니다. children prop으로 카드 내용을, maxTilt prop으로 최대 기울기 각도를, parallaxFactor prop으로 패럴럭스 깊이 강도를 설정할 수 있게 해주세요. style과 className prop으로 추가 스타일링을 지원해주세요. framer-motion의 useMotionValue, useTransform, useSpring을 활용하여 마우스 위치를 감지하고, 카드의 회전 각도를 계산해주세요. 마우스가 카드 중앙에서 멀어질수록 더 큰 각도로 기울어지도록 구현하고, 스프링 애니메이션으로 부드러운 전환을 적용해주세요. perspective와 transform-style을 활용하여 3D 효과를 구현해주세요." />
    </div>
  );
}
