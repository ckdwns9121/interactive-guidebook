"use client";

import { useState } from "react";
import ZoomScrollBg from "../../../../components/common/framer-motion/ZoomScrollBg";
import TabInterface from "@/components/common/TabInterface";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import Title from "../../components/Title";
import {
  ZOOM_BG_DEFAULTS,
  IMAGE_OPTIONS,
  TITLE_SIZE_OPTIONS,
  TITLE_WEIGHT_OPTIONS,
  BLEND_MODE_OPTIONS,
} from "./constants";

export default function ZoomScrollBgPage() {
  // 컨트롤 상태
  const [imageSrc, setImageSrc] = useState(ZOOM_BG_DEFAULTS.imageSrc);
  const [imageAlt, setImageAlt] = useState(ZOOM_BG_DEFAULTS.imageAlt);
  const [title, setTitle] = useState(ZOOM_BG_DEFAULTS.title);
  const [minScale, setMinScale] = useState(ZOOM_BG_DEFAULTS.minScale);
  const [maxScale, setMaxScale] = useState(ZOOM_BG_DEFAULTS.maxScale);
  const [stiffness, setStiffness] = useState(ZOOM_BG_DEFAULTS.stiffness);
  const [damping, setDamping] = useState(ZOOM_BG_DEFAULTS.damping);
  const [mass, setMass] = useState(ZOOM_BG_DEFAULTS.mass);
  const [titleSize, setTitleSize] = useState(ZOOM_BG_DEFAULTS.titleSize);
  const [titleWeight, setTitleWeight] = useState(ZOOM_BG_DEFAULTS.titleWeight);
  const [titleColor, setTitleColor] = useState(ZOOM_BG_DEFAULTS.titleColor);
  const [blendMode, setBlendMode] = useState(ZOOM_BG_DEFAULTS.blendMode);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    navigator.clipboard.writeText(zoomScrollBgCode);
  };

  const titleClassName = `${blendMode} ${titleSize} ${titleWeight} ${titleColor}`;

  // Usage 예제 코드
  const usageExample = `import ZoomScrollBg from "@/components/common/framer-motion/ZoomScrollBg";

// 기본 사용법
<ZoomScrollBg
  imageSrc="/images/background.jpg"
  imageAlt="배경 이미지"
  title="Zoom Background"
  minScale={1}
  maxScale={1.5}
  stiffness={100}
  damping={20}
  mass={1}
  titleClassName="text-white text-4xl font-bold mix-blend-difference"
/>

// 커스텀 설정
<ZoomScrollBg
  imageSrc="/images/hero-bg.jpg"
  imageAlt="히어로 배경"
  title="Hero Section"
  minScale={0.8}
  maxScale={2}
  stiffness={150}
  damping={30}
  mass={0.8}
  titleClassName="text-white text-6xl font-black mix-blend-overlay"
/>

// 자연스러운 확대 효과
<ZoomScrollBg
  imageSrc="/images/parallax-bg.jpg"
  imageAlt="패럴럭스 배경"
  title="Parallax Effect"
  minScale={1.2}
  maxScale={1.8}
  stiffness={80}
  damping={15}
  mass={1.2}
  titleClassName="text-white text-5xl font-bold mix-blend-multiply"
/>`;

  // 컴포넌트 소스 코드
  const zoomScrollBgCode = `"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ZoomScrollBgProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  minScale?: number;
  maxScale?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  titleClassName?: string;
}

export default function ZoomScrollBg({
  imageSrc,
  imageAlt,
  title,
  minScale = 1,
  maxScale = 1.5,
  stiffness = 100,
  damping = 20,
  mass = 1,
  titleClassName = "",
}: ZoomScrollBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [minScale, maxScale], {
    stiffness,
    damping,
    mass,
  });

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* 배경 이미지 */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      {/* 제목 */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className={titleClassName}>{title}</h1>
      </div>
    </div>
  );
}`;

  // 컨트롤 패널
  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* IMAGE SOURCE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Background Image</label>
            <p className="text-xs text-gray-400">배경 이미지 선택</p>
            <select
              value={imageSrc}
              onChange={(e) => setImageSrc(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {IMAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* TITLE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Title</label>
            <p className="text-xs text-gray-400">표시될 제목 텍스트</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
              placeholder="제목을 입력하세요"
            />
          </div>

          {/* MIN SCALE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Min Scale</label>
            <p className="text-xs text-gray-400">최소 확대 비율</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.05"
                value={minScale}
                onChange={(e) => setMinScale(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={minScale}
                onChange={(e) => setMinScale(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0.5"
                max="1.5"
                step="0.05"
              />
            </div>
          </div>

          {/* MAX SCALE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Max Scale</label>
            <p className="text-xs text-gray-400">최대 확대 비율</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="1"
                max="3"
                step="0.05"
                value={maxScale}
                onChange={(e) => setMaxScale(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={maxScale}
                onChange={(e) => setMaxScale(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="1"
                max="3"
                step="0.05"
              />
            </div>
          </div>

          {/* STIFFNESS */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Stiffness</label>
            <p className="text-xs text-gray-400">스프링 강성 (반응 속도)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="10"
                max="300"
                value={stiffness}
                onChange={(e) => setStiffness(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={stiffness}
                onChange={(e) => setStiffness(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="10"
                max="300"
              />
            </div>
          </div>

          {/* DAMPING */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Damping</label>
            <p className="text-xs text-gray-400">스프링 댐핑 (감속도)</p>
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

          {/* TITLE SIZE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Title Size</label>
            <p className="text-xs text-gray-400">제목 텍스트 크기</p>
            <select
              value={titleSize}
              onChange={(e) => setTitleSize(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {TITLE_SIZE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* TITLE WEIGHT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Title Weight</label>
            <p className="text-xs text-gray-400">제목 글꼴 두께</p>
            <select
              value={titleWeight}
              onChange={(e) => setTitleWeight(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {TITLE_WEIGHT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* BLEND MODE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Blend Mode</label>
            <p className="text-xs text-gray-400">텍스트 블렌드 모드</p>
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
        </div>

        {/* 리셋 버튼 */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={() => {
              setImageSrc(ZOOM_BG_DEFAULTS.imageSrc);
              setImageAlt(ZOOM_BG_DEFAULTS.imageAlt);
              setTitle(ZOOM_BG_DEFAULTS.title);
              setMinScale(ZOOM_BG_DEFAULTS.minScale);
              setMaxScale(ZOOM_BG_DEFAULTS.maxScale);
              setStiffness(ZOOM_BG_DEFAULTS.stiffness);
              setDamping(ZOOM_BG_DEFAULTS.damping);
              setMass(ZOOM_BG_DEFAULTS.mass);
              setTitleSize(ZOOM_BG_DEFAULTS.titleSize);
              setTitleWeight(ZOOM_BG_DEFAULTS.titleWeight);
              setTitleColor(ZOOM_BG_DEFAULTS.titleColor);
              setBlendMode(ZOOM_BG_DEFAULTS.blendMode);
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
      <Title>Zoom Scroll Background.</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        스크롤에 따라 배경 이미지가 부드럽게 확대/축소되는 인터랙션을 구현합니다. framer-motion을 활용하여 스크롤
        진행도에 따른 자연스러운 줌 효과를 제공하며, 텍스트와 배경의 블렌드 모드를 통해 시각적 깊이감을 표현합니다.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="h-[60vh]">
            <ZoomScrollBg
              key={`${imageSrc}-${title}-${minScale}-${maxScale}-${stiffness}-${damping}-${mass}`}
              imageSrc={imageSrc}
              imageAlt={imageAlt}
              title={title}
              minScale={minScale}
              maxScale={maxScale}
              stiffness={stiffness}
              damping={damping}
              mass={mass}
              titleClassName={titleClassName}
            />
          </div>
        }
        usageContent={usageExample}
        codeContent={zoomScrollBgCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="사용자가 페이지를 스크롤할 때"
        what="배경 이미지를"
        how="스크롤 진행도에 따라 framer-motion의 useTransform을 활용하여 자연스러운 확대/축소 애니메이션으로 표현하고, 스프링 물리 효과를 적용하여 부드러운 전환 구현"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="ZoomScrollBg 컴포넌트를 만들어주세요. 이 컴포넌트는 스크롤에 따라 배경 이미지가 확대/축소되는 효과를 보여줍니다. imageSrc와 imageAlt prop으로 배경 이미지를, title prop으로 제목 텍스트를, minScale과 maxScale prop으로 최소/최대 확대 비율을 설정할 수 있게 해주세요. stiffness, damping, mass prop으로 스프링 물리 효과를, titleClassName prop으로 제목 스타일링을 설정할 수 있게 해주세요. framer-motion의 useScroll과 useTransform을 활용하여 스크롤 진행도를 감지하고, 배경 이미지의 scale을 동적으로 조절해주세요. 스프링 물리 효과를 적용하여 자연스러운 애니메이션을 구현하고, 오버레이와 블렌드 모드를 통해 텍스트 가독성을 확보해주세요." />
    </div>
  );
}
