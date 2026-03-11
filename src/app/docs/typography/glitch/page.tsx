"use client";

import { useState } from "react";
import GlitchText from "@/components/common/framer-motion/typography/glitch-text/GlitchText";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import TabInterface from "@/components/common/TabInterface";
import Title from "../../components/Title";
import TextScramble from "@/components/common/framer-motion/typography/TextScramble";

export default function GlitchTextPage() {
  // 컨트롤 상태
  const [text, setText] = useState("GLITCH EFFECT");
  const [speed, setSpeed] = useState(0.5);
  const [enableShadows, setEnableShadows] = useState(true);
  const [enableOnHover, setEnableOnHover] = useState(false);
  const [refreshDelay, setRefreshDelay] = useState(100);
  const [variant, setVariant] = useState("h1");
  const [glitchColor1, setGlitchColor1] = useState("#ff0040");
  const [glitchColor2, setGlitchColor2] = useState("#00ffff");
  const [glitchColor3, setGlitchColor3] = useState("#ff0080");
  const [glitchColor4, setGlitchColor4] = useState("#0040ff");

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    const code = glitchTextCode;
    navigator.clipboard.writeText(code);
  };

  // Usage 예제 코드
  const usageExample = `import GlitchText from "@/components/common/framer-motion/typography/glitch-text/GlitchText";

// 기본 사용법
<GlitchText>GLITCH EFFECT</GlitchText>

// 커스텀 설정
<GlitchText
  speed={0.3}
  enableShadows={true}
  enableOnHover={false}
  refreshDelay={150}
  glitchColors={["#ff0040", "#00ffff", "#ff0080", "#0040ff"]}
  className="text-4xl font-bold"
>
  고급 글리치 효과
</GlitchText>

// 호버 시에만 글리치
<GlitchText
  enableOnHover={true}
  speed={0.8}
  className="text-2xl"
>
  호버 글리치
</GlitchText>

// 그림자 없이 글리치
<GlitchText
  enableShadows={false}
  speed={0.5}
  className="text-3xl"
>
  미니멀 글리치
</GlitchText>`;

  // 실제 GlitchText 컴포넌트 소스 코드
  const glitchTextCode = `"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
  glitchColors?: string[];
  refreshDelay?: number;
}

// 강렬한 글리치 색상 (이미지 스타일)
const defaultGlitchColors = [
  "#ff0040", // 강렬한 빨강
  "#00ffff", // 시안
  "#ff0080", // 핑크
  "#0040ff", // 파랑
];

// 다양한 글리치 패턴 생성 함수들
function getRandomClip() {
  const patterns = [
    // 수평 슬라이스
    () => {
      const top = Math.random() * 80;
      const height = 5 + Math.random() * 20;
      return \`inset(\${top}% 0 \${100 - top - height}% 0)\`;
    },
    // 대각선 슬라이스
    () => {
      const points = Array.from({ length: 4 }, () => Math.random() * 100);
      return \`polygon(\${points[0]}% \${points[1]}%, \${points[2]}% \${points[3]}%, \${100 - points[0]}% \${
        100 - points[1]
      }%, \${100 - points[2]}% \${100 - points[3]}%)\`;
    },
    // 불규칙한 조각들
    () => {
      const x1 = Math.random() * 30;
      const x2 = 70 + Math.random() * 30;
      const y1 = Math.random() * 40;
      const y2 = 60 + Math.random() * 40;
      return \`inset(\${y1}% \${100 - x2}% \${100 - y2}% \${x1}%)\`;
    },
  ];

  return patterns[Math.floor(Math.random() * patterns.length)]();
}

// 강렬한 변형 값들
function getRandomTransform() {
  return {
    x: (Math.random() - 0.5) * 20, // -10 ~ 10px
    y: (Math.random() - 0.5) * 8, // -4 ~ 4px
    skewX: (Math.random() - 0.5) * 10, // -5 ~ 5deg
    scale: 0.98 + Math.random() * 0.04, // 0.98 ~ 1.02
  };
}

const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = "",
  glitchColors = defaultGlitchColors,
  refreshDelay = 100,
}) => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(!enableOnHover);

  // 강렬한 글리치 애니메이션
  const performIntenseGlitch = useCallback(async () => {
    try {
      const duration = 0.1 * speed;

      // 4개 레이어로 더 복잡한 글리치
      const promises = [
        // 레이어 1: 빨간색 큰 오프셋
        controls1.start({
          clipPath: getRandomClip(),
          ...getRandomTransform(),
          x: [0, 15, -8, 0],
          color: enableShadows ? glitchColors[0] : "rgba(0,0,0,0)",
          opacity: [0.8, 1, 0.9, 0.8],
          transition: {
            duration: duration,
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.3, 0.7, 1],
          },
        }),

        // 레이어 2: 시안색 반대 방향
        controls2.start({
          clipPath: getRandomClip(),
          ...getRandomTransform(),
          x: [0, -12, 6, 0],
          y: [0, 2, -1, 0],
          color: enableShadows ? glitchColors[1] : "rgba(0,0,0,0)",
          opacity: [0.7, 0.9, 1, 0.7],
          transition: {
            duration: duration * 1.2,
            ease: [0.55, 0.055, 0.675, 0.19],
            times: [0, 0.4, 0.6, 1],
          },
        }),

        // 레이어 3: 핑크색 스큐 효과
        controls3.start({
          clipPath: getRandomClip(),
          ...getRandomTransform(),
          x: [0, 8, -15, 0],
          skewX: [0, 3, -2, 0],
          color: enableShadows ? glitchColors[2] : "rgba(0,0,0,0)",
          opacity: [0.6, 1, 0.8, 0.6],
          transition: {
            duration: duration * 0.8,
            ease: [0.175, 0.885, 0.32, 1.275],
            times: [0, 0.2, 0.8, 1],
          },
        }),

        // 레이어 4: 파란색 미세 진동
        controls4.start({
          clipPath: getRandomClip(),
          ...getRandomTransform(),
          x: [0, -5, 10, -3, 0],
          y: [0, 1, -2, 1, 0],
          color: enableShadows ? glitchColors[3] : "rgba(0,0,0,0)",
          opacity: [0.5, 0.8, 1, 0.7, 0.5],
          transition: {
            duration: duration * 1.5,
            ease: "linear",
            times: [0, 0.25, 0.5, 0.75, 1],
          },
        }),
      ];

      await Promise.all(promises);

      // 모든 레이어 리셋
      [controls1, controls2, controls3, controls4].forEach((control) => {
        control.set({
          clipPath: "none",
          x: 0,
          y: 0,
          skewX: 0,
          scale: 1,
          color: "rgba(0,0,0,0)",
          opacity: 0,
        });
      });
    } catch (error) {
      console.error("글리치 애니메이션 에러:", error);
    }
  }, [controls1, controls2, controls3, controls4, speed, enableShadows, glitchColors]);

  // 애니메이션 루프
  useEffect(() => {
    if (!shouldAnimate) return;

    let timeoutId: NodeJS.Timeout;
    let isActive = true;

    const animationLoop = async () => {
      if (!isActive) return;

      await performIntenseGlitch();

      if (isActive) {
        // 랜덤한 간격으로 더 자연스러운 글리치
        const randomDelay = refreshDelay + (Math.random() - 0.5) * refreshDelay * 0.5;
        timeoutId = setTimeout(animationLoop, randomDelay);
      }
    };

    // 초기 지연
    timeoutId = setTimeout(animationLoop, 300);

    return () => {
      isActive = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [shouldAnimate, performIntenseGlitch, refreshDelay]);

  // 호버 상태 관리
  useEffect(() => {
    if (enableOnHover) {
      setShouldAnimate(isHovered);
    } else {
      setShouldAnimate(true);
    }
  }, [enableOnHover, isHovered]);

  // 호버 이벤트 핸들러
  const handleMouseEnter = () => {
    if (enableOnHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (enableOnHover) {
      setIsHovered(false);
      // 호버 종료시 모든 레이어 리셋
      [controls1, controls2, controls3, controls4].forEach((control) => {
        control.set({
          clipPath: "none",
          x: 0,
          y: 0,
          skewX: 0,
          scale: 1,
          color: "rgba(0,0,0,0)",
          opacity: 0,
        });
      });
    }
  };

  return (
    <span
      className={\`\${className} relative inline-block font-bold cursor-pointer\`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={children}
      style={{
        textShadow: shouldAnimate ? "0 0 10px rgba(255,255,255,0.1)" : "none",
      }}
    >
      {/* 메인 텍스트 */}
      <span className="relative z-10">{children}</span>

      {/* 글리치 레이어 1 - 빨간색 */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] select-none font-bold"
        animate={controls1}
        initial={{ clipPath: "none", x: 0, y: 0, skewX: 0, scale: 1, color: "rgba(0,0,0,0)", opacity: 0 }}
        style={{
          display: "block",
          overflow: "hidden",
          whiteSpace: "pre",
          mixBlendMode: "screen",
        }}
      >
        {children}
      </motion.span>

      {/* 글리치 레이어 2 - 시안색 */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] select-none font-bold"
        animate={controls2}
        initial={{ clipPath: "none", x: 0, y: 0, skewX: 0, scale: 1, color: "rgba(0,0,0,0)", opacity: 0 }}
        style={{
          display: "block",
          overflow: "hidden",
          whiteSpace: "pre",
          mixBlendMode: "screen",
        }}
      >
        {children}
      </motion.span>

      {/* 글리치 레이어 3 - 핑크색 */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] select-none font-bold"
        animate={controls3}
        initial={{ clipPath: "none", x: 0, y: 0, skewX: 0, scale: 1, color: "rgba(0,0,0,0)", opacity: 0 }}
        style={{
          display: "block",
          overflow: "hidden",
          whiteSpace: "pre",
          mixBlendMode: "screen",
        }}
      >
        {children}
      </motion.span>

      {/* 글리치 레이어 4 - 파란색 */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[4] select-none font-bold"
        animate={controls4}
        initial={{ clipPath: "none", x: 0, y: 0, skewX: 0, scale: 1, color: "rgba(0,0,0,0)", opacity: 0 }}
        style={{
          display: "block",
          overflow: "hidden",
          whiteSpace: "pre",
          mixBlendMode: "screen",
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default GlitchText;`;

  // Typography variant 클래스
  const getVariantClass = (variant: string) => {
    switch (variant) {
      case "h1":
        return "text-3xl md:text-5xl lg:text-6xl font-bold";
      case "h2":
        return "text-2xl md:text-4xl lg:text-5xl font-semibold";
      case "h3":
        return "text-xl md:text-3xl lg:text-4xl font-medium";
      case "h4":
        return "text-lg md:text-2xl lg:text-3xl font-medium";
      case "body":
        return "text-base md:text-lg";
      case "small":
        return "text-sm md:text-base";
      default:
        return "text-xl md:text-3xl lg:text-4xl font-medium";
    }
  };

  // 글리치 색상 배열
  const glitchColors = [glitchColor1, glitchColor2, glitchColor3, glitchColor4];

  // 컨트롤 패널 컴포넌트
  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Text</label>
            <p className="text-xs text-gray-400">글리치 효과가 적용될 텍스트</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none placeholder-gray-400"
              rows={2}
              placeholder="글리치 효과를 적용할 텍스트를 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Speed</label>
            <p className="text-xs text-gray-400">글리치 애니메이션 속도 (낮을수록 빠름)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0.1"
                max="2"
                step="0.1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Refresh Delay</label>
            <p className="text-xs text-gray-400">글리치 효과 간격 (ms)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="50"
                max="1000"
                value={refreshDelay}
                onChange={(e) => setRefreshDelay(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={refreshDelay}
                onChange={(e) => setRefreshDelay(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="50"
                max="1000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Glitch Color 1</label>
            <p className="text-xs text-gray-400">첫 번째 글리치 색상</p>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={glitchColor1}
                onChange={(e) => setGlitchColor1(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={glitchColor1}
                onChange={(e) => setGlitchColor1(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#ff0040"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Glitch Color 2</label>
            <p className="text-xs text-gray-400">두 번째 글리치 색상</p>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={glitchColor2}
                onChange={(e) => setGlitchColor2(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={glitchColor2}
                onChange={(e) => setGlitchColor2(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#00ffff"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Glitch Color 3</label>
            <p className="text-xs text-gray-400">세 번째 글리치 색상</p>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={glitchColor3}
                onChange={(e) => setGlitchColor3(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={glitchColor3}
                onChange={(e) => setGlitchColor3(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#ff0080"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Glitch Color 4</label>
            <p className="text-xs text-gray-400">네 번째 글리치 색상</p>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={glitchColor4}
                onChange={(e) => setGlitchColor4(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={glitchColor4}
                onChange={(e) => setGlitchColor4(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#0040ff"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Variant</label>
            <p className="text-xs text-gray-400">Typography 변형</p>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="h1" className="bg-gray-800 text-white">
                H1 - Heading 1
              </option>
              <option value="h2" className="bg-gray-800 text-white">
                H2 - Heading 2
              </option>
              <option value="h3" className="bg-gray-800 text-white">
                H3 - Heading 3
              </option>
              <option value="h4" className="bg-gray-800 text-white">
                H4 - Heading 4
              </option>
              <option value="body" className="bg-gray-800 text-white">
                Body - 본문
              </option>
              <option value="small" className="bg-gray-800 text-white">
                Small - 소형
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Enable Shadows</label>
            <p className="text-xs text-gray-400">글리치 그림자 효과 활성화</p>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={enableShadows}
                onChange={(e) => setEnableShadows(e.target.checked)}
                className="w-4 h-4 text-blue-400 bg-black/20 border-gray-600 rounded focus:ring-blue-400 focus:ring-2"
              />
              <span className="text-sm text-gray-200">그림자 효과 사용</span>
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Enable On Hover</label>
            <p className="text-xs text-gray-400">호버 시에만 글리치 효과 실행</p>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={enableOnHover}
                onChange={(e) => setEnableOnHover(e.target.checked)}
                className="w-4 h-4 text-blue-400 bg-black/20 border-gray-600 rounded focus:ring-blue-400 focus:ring-2"
              />
              <span className="text-sm text-gray-200">호버 시에만 실행</span>
            </label>
          </div>
        </div>
      </ControlPanelWrapper>
    </div>
  );

  return (
    <div>
      <Title>
        <TextScramble text="Glitch Text." speed={30} delay={0} loop={false} pauseTime={1000} revealSpeed={60} />
      </Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        텍스트에 사이버펑크 스타일의 글리치 효과를 적용하여 디지털 왜곡 현상을 시뮬레이션합니다.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="min-h-32 md:min-h-40 flex items-center justify-center">
            <GlitchText
              key={`${text}-${speed}-${enableShadows}-${enableOnHover}-${refreshDelay}-${glitchColor1}-${glitchColor2}-${glitchColor3}-${glitchColor4}`}
              className={getVariantClass(variant)}
              speed={speed}
              enableShadows={enableShadows}
              enableOnHover={enableOnHover}
              refreshDelay={refreshDelay}
              glitchColors={glitchColors}
            >
              {text}
            </GlitchText>
          </div>
        }
        usageContent={usageExample}
        codeContent={glitchTextCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="컴포넌트가 마운트되거나 호버 이벤트가 발생할 때"
        what="텍스트를"
        how="4개의 색상 레이어와 랜덤한 클리핑 패턴으로 글리치 효과를 표현"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="GlitchText 컴포넌트를 만들어주세요. 이 컴포넌트는 텍스트에 사이버펑크 스타일의 글리치 효과를 적용합니다. children prop으로 글리치 효과를 적용할 텍스트를, speed prop으로 애니메이션 속도를, enableShadows prop으로 그림자 효과 활성화를, enableOnHover prop으로 호버 시에만 실행 여부를, glitchColors prop으로 글리치 색상 배열을, refreshDelay prop으로 글리치 효과 간격을 설정할 수 있게 해주세요. 4개의 레이어로 구성된 복잡한 글리치 효과를 구현하고, 랜덤한 클리핑 패턴과 변형을 적용해주세요. framer-motion의 useAnimation을 활용하여 구현해주세요." />
    </div>
  );
}
