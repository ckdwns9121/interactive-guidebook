"use client";

import { useState } from "react";
import MorphingText from "@/components/common/framer-motion/typography/morphing-text/MorphingText";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import TabInterface from "@/components/common/TabInterface";
import Title from "../../components/Title";
import { MORPHING_DEFAULTS, FONT_SIZE_OPTIONS, FONT_WEIGHT_OPTIONS, COLOR_PRESETS } from "./constants";

export default function MorphingTextPage() {
  // 컨트롤 상태
  const [texts, setTexts] = useState(MORPHING_DEFAULTS.texts);
  const [morphTime, setMorphTime] = useState(MORPHING_DEFAULTS.morphTime);
  const [cooldownTime, setCooldownTime] = useState(MORPHING_DEFAULTS.cooldownTime);
  const [color, setColor] = useState(MORPHING_DEFAULTS.color);
  const [fontSize, setFontSize] = useState(MORPHING_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(MORPHING_DEFAULTS.fontWeight);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    const code = morphingTextCode;
    navigator.clipboard.writeText(code);
  };

  // Usage 예제 코드
  const usageExample = `import MorphingText from "@/components/common/framer-motion/typography/morphing-text/MorphingText";

// 기본 사용법
<MorphingText texts={["디자인 없이도", "차별화된 웹을", "누구나 쉽게"]} />

// 커스텀 설정
<MorphingText
  texts={["Why", "is", "this", "cool?"]}
  morphTime={1.5}
  cooldownTime={0.8}
  color="#7c3aed"
  className="text-4xl font-bold"
/>

// 빠른 모프링
<MorphingText
  texts={["빠른", "변형", "효과"]}
  morphTime={0.5}
  cooldownTime={0.2}
  color="#dc2626"
  className="text-2xl"
/>

// 긴 텍스트 모프링
<MorphingText
  texts={[
    "긴 문장도",
    "자연스럽게",
    "변형됩니다"
  ]}
  morphTime={2}
  cooldownTime={1}
  color="#059669"
  className="text-3xl font-semibold"
/>`;

  // 실제 MorphingText 컴포넌트 소스 코드
  const morphingTextCode = `"use client";
import { useEffect, useRef } from "react";

interface MorphingTextProps {
  texts: string[];
  morphTime?: number; // morph 애니메이션 시간(초)
  cooldownTime?: number; // 쿨다운 시간(초)
  color?: string;
  className?: string;
}

/**
 * MorphingText
 * - 두 개의 텍스트를 겹쳐서 blur + threshold SVG 필터로 morphing 효과를 만듭니다.
 * - 반응형, 커스텀 텍스트, 폰트, 색상, 속도 props 지원
 * - 예시: <MorphingText texts={["Why", "is", "this", "cool?"]} />
 */
const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  color = "#222",
  className,
}) => {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  // 내부 상태
  const textIndex = useRef(texts.length - 1);
  const time = useRef(new Date());
  const morph = useRef(0);
  const cooldown = useRef(cooldownTime);

  useEffect(() => {
    const elts = {
      text1: text1Ref.current!,
      text2: text2Ref.current!,
    };
    if (!elts.text1 || !elts.text2) return;

    elts.text1.textContent = texts[textIndex.current % texts.length];
    elts.text2.textContent = texts[(textIndex.current + 1) % texts.length];

    function setMorph(fraction: number) {
      elts.text2.style.filter = \`blur(\${Math.min(8 / fraction - 8, 100)}px)\`;
      elts.text2.style.opacity = \`\${Math.pow(fraction, 0.4) * 100}%\`;

      const inv = 1 - fraction;
      elts.text1.style.filter = \`blur(\${Math.min(8 / inv - 8, 100)}px)\`;
      elts.text1.style.opacity = \`\${Math.pow(inv, 0.4) * 100}%\`;

      elts.text1.textContent = texts[textIndex.current % texts.length];
      elts.text2.textContent = texts[(textIndex.current + 1) % texts.length];
    }

    function doMorph() {
      morph.current -= cooldown.current;
      cooldown.current = 0;
      let fraction = morph.current / morphTime;
      if (fraction > 1) {
        cooldown.current = cooldownTime;
        fraction = 1;
      }
      setMorph(fraction);
    }

    function doCooldown() {
      morph.current = 0;
      elts.text2.style.filter = "";
      elts.text2.style.opacity = "100%";
      elts.text1.style.filter = "";
      elts.text1.style.opacity = "0%";
    }

    function animate() {
      requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown.current > 0;
      const dt = (+newTime - +time.current) / 1000;
      time.current = newTime;
      cooldown.current -= dt;
      if (cooldown.current <= 0) {
        if (shouldIncrementIndex) textIndex.current++;
        doMorph();
      } else {
        doCooldown();
      }
    }
    animate();
  }, [texts, morphTime, cooldownTime]);

  return (
    <div
      style={{
        filter: "url(#threshold) blur(0.6px)",
      }}
      className={\`\${className} relative inline-block whitespace-nowrap\`}
    >
      {/* SVG 필터 정의 */}
      <svg className="hidden">
        <defs>
          <filter id="threshold">
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
          </filter>
        </defs>
      </svg>
      <span
        ref={text1Ref}
        className="absolute inset-0 font-sans select-none"
        style={{
          color,
        }}
      />
      <span
        ref={text2Ref}
        className="absolute inset-0 font-sans select-none"
        style={{
          color,
        }}
      />
      {/* 숨겨진 더미 텍스트로 컨테이너 크기 설정 */}
      <span className="font-sans opacity-0 select-none" aria-hidden="true">
        {texts[0] || ""}
      </span>
    </div>
  );
};

export default MorphingText;`;

  // 텍스트 배열을 문자열로 변환/파싱하는 헬퍼 함수
  const textsToString = (texts: string[]) => texts.join("\n");
  const stringToTexts = (str: string) => str.split("\n").filter((text) => text.trim() !== "");

  // 컨트롤 패널 컴포넌트
  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* TEXTS */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Texts</label>
            <p className="text-xs text-gray-400">Morphing할 텍스트들 (줄바꿈으로 구분)</p>
            <textarea
              value={textsToString(texts)}
              onChange={(e) => setTexts(stringToTexts(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none placeholder-gray-400"
              rows={4}
              placeholder="각 줄에 하나씩 텍스트를 입력하세요"
            />
          </div>

          {/* MORPH TIME */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Morph Time</label>
            <p className="text-xs text-gray-400">변형 애니메이션 시간 (초)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.3"
                max="3"
                step="0.1"
                value={morphTime}
                onChange={(e) => setMorphTime(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={morphTime}
                onChange={(e) => setMorphTime(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0.3"
                max="3"
                step="0.1"
              />
            </div>
          </div>

          {/* COOLDOWN TIME */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Cooldown Time</label>
            <p className="text-xs text-gray-400">다음 변형까지 대기 시간 (초)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={cooldownTime}
                onChange={(e) => setCooldownTime(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={cooldownTime}
                onChange={(e) => setCooldownTime(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0.1"
                max="3"
                step="0.1"
              />
            </div>
          </div>

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
                placeholder="#003b9a"
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
              setTexts(MORPHING_DEFAULTS.texts);
              setMorphTime(MORPHING_DEFAULTS.morphTime);
              setCooldownTime(MORPHING_DEFAULTS.cooldownTime);
              setColor(MORPHING_DEFAULTS.color);
              setFontSize(MORPHING_DEFAULTS.fontSize);
              setFontWeight(MORPHING_DEFAULTS.fontWeight);
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
      <Title>Morphing Text.</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        텍스트가 자연스럽게 변형되면서 다른 텍스트로 모핑되는 애니메이션 효과를 적용합니다.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="h-48 flex items-center justify-center">
            <MorphingText
              key={`${texts.join("-")}-${morphTime}-${cooldownTime}-${color}`}
              texts={texts}
              morphTime={morphTime}
              cooldownTime={cooldownTime}
              color={color}
              className={`${fontSize} ${fontWeight}`}
            />
          </div>
        }
        usageContent={usageExample}
        codeContent={morphingTextCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="컴포넌트가 마운트되거나 텍스트 배열이 변경될 때"
        what="텍스트 배열의 각 요소를"
        how="blur와 threshold SVG 필터를 사용하여 자연스럽게 변형되는 모핑 애니메이션으로 표현"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="MorphingText 컴포넌트를 만들어주세요. 이 컴포넌트는 텍스트가 자연스럽게 변형되면서 다른 텍스트로 모핑되는 애니메이션을 보여줍니다. texts prop으로 모핑할 텍스트 배열을, morphTime prop으로 변형 애니메이션 시간을, cooldownTime prop으로 다음 변형까지 대기 시간을, color prop으로 텍스트 색상을 설정할 수 있게 해주세요. 두 개의 텍스트를 겹쳐서 blur와 threshold SVG 필터를 사용하여 모핑 효과를 구현해주세요. requestAnimationFrame을 활용하여 부드러운 애니메이션을 구현해주세요." />
    </div>
  );
}
