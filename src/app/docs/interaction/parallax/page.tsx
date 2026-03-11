"use client";

import { useState } from "react";
import ParallaxImage from "@/components/common/framer-motion/ParallaxImage";
import TabInterface from "@/components/common/TabInterface";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import Title from "../../components/Title";
import {
  PARALLAX_DEFAULTS,
  IMAGE_OPTIONS,
  CONTAINER_HEIGHT_OPTIONS,
  IMAGE_HEIGHT_OPTIONS,
  OBJECT_FIT_OPTIONS,
} from "./constants";

export default function ParallaxPage() {
  // 컨트롤 상태
  const [imageUrl, setImageUrl] = useState(PARALLAX_DEFAULTS.imageUrl);
  const [parallaxRange, setParallaxRange] = useState(PARALLAX_DEFAULTS.parallaxRange);
  const [stiffness, setStiffness] = useState(PARALLAX_DEFAULTS.stiffness);
  const [damping, setDamping] = useState(PARALLAX_DEFAULTS.damping);
  const [mass, setMass] = useState(PARALLAX_DEFAULTS.mass);
  const [restDelta, setRestDelta] = useState(PARALLAX_DEFAULTS.restDelta);
  const [containerHeight, setContainerHeight] = useState(PARALLAX_DEFAULTS.containerHeight);
  const [imageHeight, setImageHeight] = useState(PARALLAX_DEFAULTS.imageHeight);
  const [objectFit, setObjectFit] = useState(PARALLAX_DEFAULTS.objectFit);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    navigator.clipboard.writeText(parallaxImageCode);
  };

  // Usage 예제 코드
  const usageExample = `import ParallaxImage from "@/components/common/framer-motion/ParallaxImage";

// 기본 사용법
<ParallaxImage />

// 커스텀 설정
<ParallaxImage
  imageUrl="/path/to/image.jpg"
  parallaxRange={400}
  stiffness={80}
  damping={15}
  mass={1.2}
  restDelta={0.3}
  containerHeight="h-[600px]"
  imageHeight="h-[800px]"
  objectFit="object-cover"
/>

// 간단한 설정
<ParallaxImage
  imageUrl="/hero-image.jpg"
  parallaxRange={200}
  containerHeight="h-screen"
/>`;

  // 실제 ParallaxImage 컴포넌트 소스 코드
  const parallaxImageCode = `"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface ParallaxImageProps {
  imageUrl?: string;
  parallaxRange?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  restDelta?: number;
  containerHeight?: string;
  imageHeight?: string;
  objectFit?: string;
}

/**
 * ParallaxImage 컴포넌트
 * - 스크롤에 따라 이미지가 위로 천천히 이동하는 패럴럭스 효과를 보여줍니다.
 * - 반응형 웹을 고려하여 이미지가 부모 영역에 맞게 조정됩니다.
 */
export default function ParallaxImage({
  imageUrl = "/1.avif",
  parallaxRange = 300,
  stiffness = 60,
  damping = 20,
  mass = 1,
  restDelta = 0.5,
  containerHeight = "h-screen",
  imageHeight = "h-[120vh]",
  objectFit = "object-cover",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  // ref 영역의 스크롤 진행도를 가져옵니다.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // 시작점과 끝점을 명확하게 지정
  });

  // 1. 스크롤에 따라 y값을 만듭니다.
  // y값을 0에서 -parallaxRange로 설정하여 이미지가 박스 안에서만 위로 자연스럽게 이동하게 만듭니다.
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -parallaxRange]);

  // 2. useSpring으로 감싸서, 변화가 있을 때 자연스럽게 트랜지션이 일어나도록 합니다.
  const y = useSpring(rawY, {
    stiffness, // 낮을수록 더 천천히 멈춤
    damping, // 낮을수록 더 오래 흔들림
    mass,
    restDelta, // 멈추는 민감도
  });

  return (
    <div ref={ref} className={\`relative \${containerHeight} w-full max-w-full overflow-hidden\`}>
      <motion.img
        src={imageUrl}
        alt="parallax"
        className={\`absolute top-0 block \${imageHeight} w-full \${objectFit}\`}
        style={{
          y,
        }}
      />
    </div>
  );
}`;

  // 컨트롤 패널 컴포넌트
  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* IMAGE URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Background Image</label>
            <p className="text-xs text-gray-400">배경 이미지 선택</p>
            <select
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {IMAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* PARALLAX RANGE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Parallax Range</label>
            <p className="text-xs text-gray-400">패럴럭스 이동 범위 (px)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="100"
                max="600"
                step="50"
                value={parallaxRange}
                onChange={(e) => setParallaxRange(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={parallaxRange}
                onChange={(e) => setParallaxRange(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="100"
                max="600"
                step="50"
              />
            </div>
          </div>

          {/* STIFFNESS */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Stiffness</label>
            <p className="text-xs text-gray-400">스프링 강성 (높을수록 빠름)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="20"
                max="200"
                step="10"
                value={stiffness}
                onChange={(e) => setStiffness(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={stiffness}
                onChange={(e) => setStiffness(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="20"
                max="200"
                step="10"
              />
            </div>
          </div>

          {/* DAMPING */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Damping</label>
            <p className="text-xs text-gray-400">감쇠 (낮을수록 더 흔들림)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="5"
                max="50"
                step="5"
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
                max="50"
                step="5"
              />
            </div>
          </div>

          {/* MASS */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Mass</label>
            <p className="text-xs text-gray-400">질량 (높을수록 느림)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={mass}
                onChange={(e) => setMass(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={mass}
                onChange={(e) => setMass(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0.5"
                max="3"
                step="0.1"
              />
            </div>
          </div>

          {/* REST DELTA */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Rest Delta</label>
            <p className="text-xs text-gray-400">멈춤 민감도</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={restDelta}
                onChange={(e) => setRestDelta(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={restDelta}
                onChange={(e) => setRestDelta(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0.1"
                max="2"
                step="0.1"
              />
            </div>
          </div>

          {/* CONTAINER HEIGHT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Container Height</label>
            <p className="text-xs text-gray-400">컨테이너 높이</p>
            <select
              value={containerHeight}
              onChange={(e) => setContainerHeight(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {CONTAINER_HEIGHT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* IMAGE HEIGHT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Image Height</label>
            <p className="text-xs text-gray-400">이미지 높이</p>
            <select
              value={imageHeight}
              onChange={(e) => setImageHeight(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {IMAGE_HEIGHT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* OBJECT FIT */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Object Fit</label>
            <p className="text-xs text-gray-400">이미지 맞춤 방식</p>
            <select
              value={objectFit}
              onChange={(e) => setObjectFit(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {OBJECT_FIT_OPTIONS.map((option) => (
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
              setImageUrl(PARALLAX_DEFAULTS.imageUrl);
              setParallaxRange(PARALLAX_DEFAULTS.parallaxRange);
              setStiffness(PARALLAX_DEFAULTS.stiffness);
              setDamping(PARALLAX_DEFAULTS.damping);
              setMass(PARALLAX_DEFAULTS.mass);
              setRestDelta(PARALLAX_DEFAULTS.restDelta);
              setContainerHeight(PARALLAX_DEFAULTS.containerHeight);
              setImageHeight(PARALLAX_DEFAULTS.imageHeight);
              setObjectFit(PARALLAX_DEFAULTS.objectFit);
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
      <Title>Parallax Image.</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        스크롤에 따라 배경 이미지가 시차를 두고 움직이는 패럴럭스 효과를 적용합니다.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <ParallaxImage
            imageUrl={imageUrl}
            parallaxRange={parallaxRange}
            stiffness={stiffness}
            damping={damping}
            mass={mass}
            restDelta={restDelta}
            containerHeight="h-[400px]"
            imageHeight="h-[500px]"
            objectFit={objectFit}
          />
        }
        usageContent={usageExample}
        codeContent={parallaxImageCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 - 새로운 디자인 */}
      <IdeaConcretizationSection
        when="스크롤 이벤트가 발생할 때"
        what="배경 이미지를"
        how="스크롤 방향과 반대로 시차를 두고 움직이는 애니메이션으로 표현"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="ParallaxImage 컴포넌트를 만들어주세요. 이 컴포넌트는 스크롤 시 배경 이미지가 시차를 두고 움직이는 패럴럭스 효과를 보여줍니다. imageUrl prop으로 배경 이미지 경로를, parallaxRange prop으로 이동 범위를, stiffness와 damping prop으로 애니메이션 물리 속성을 설정할 수 있게 해주세요. containerHeight와 imageHeight prop으로 컨테이너와 이미지 높이를, objectFit prop으로 이미지 맞춤 방식을 지정할 수 있게 해주세요." />
    </div>
  );
}
