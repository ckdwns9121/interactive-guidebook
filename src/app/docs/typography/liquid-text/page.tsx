"use client";
import liquidTextCode from "@/components/common/framer-motion/typography/liquid-text/LiquidText.tsx?raw";

import { useState } from "react";
import LiquidText from "@/components/common/framer-motion/typography/liquid-text/LiquidText";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import ComponentDocPage from "../../components/ComponentDocPage";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { ColorField } from "@/components/common/docs-controls/ColorField";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { ControlField } from "@/components/common/docs-controls/ControlField";
import { LIQUID_DEFAULTS, FONT_SIZE_OPTIONS, FONT_WEIGHT_OPTIONS, COLOR_PRESETS } from "./constants";

const usageExample = `import LiquidText from "@/components/common/framer-motion/typography/liquid-text/LiquidText";

// 기본 사용법
<LiquidText text="LIQUID" />

// 강한 왜곡 + 빠른 속도
<LiquidText
  text="WAVE"
  scale={20}
  speed={1.5}
  color="#38bdf8"
  className="text-8xl font-black"
/>

// 부드러운 물결
<LiquidText
  text="SMOOTH"
  scale={6}
  baseFrequency={0.008}
  speed={0.3}
  numOctaves={2}
  color="#a78bfa"
  className="text-6xl font-bold"
/>

// 격렬한 왜곡
<LiquidText
  text="CHAOS"
  scale={30}
  baseFrequency={0.03}
  speed={2}
  numOctaves={5}
  color="#f87171"
  className="text-7xl font-black"
/>`;

export default function LiquidTextPage() {
  const [text, setText] = useState(LIQUID_DEFAULTS.text);
  const [scale, setScale] = useState(LIQUID_DEFAULTS.scale);
  const [baseFrequency, setBaseFrequency] = useState(LIQUID_DEFAULTS.baseFrequency);
  const [speed, setSpeed] = useState(LIQUID_DEFAULTS.speed);
  const [numOctaves, setNumOctaves] = useState(LIQUID_DEFAULTS.numOctaves);
  const [color, setColor] = useState(LIQUID_DEFAULTS.color);
  const [fontSize, setFontSize] = useState(LIQUID_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(LIQUID_DEFAULTS.fontWeight);

  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ControlField label="Text" description="표시할 텍스트">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
              placeholder="LIQUID"
            />
          </ControlField>
          <RangeWithNumber
            label="Scale"
            description="왜곡 강도 (px)"
            value={scale}
            onChange={setScale}
            min={0}
            max={50}
            step={1}
          />
          <RangeWithNumber
            label="Base Frequency"
            description="노이즈 주파수 (낮을수록 큰 물결)"
            value={baseFrequency}
            onChange={setBaseFrequency}
            min={0.001}
            max={0.1}
            step={0.001}
          />
          <RangeWithNumber
            label="Speed"
            description="애니메이션 속도"
            value={speed}
            onChange={setSpeed}
            min={0.1}
            max={5}
            step={0.1}
          />
          <RangeWithNumber
            label="Num Octaves"
            description="노이즈 디테일 레벨 (1~8)"
            value={numOctaves}
            onChange={setNumOctaves}
            min={1}
            max={8}
            step={1}
          />
          <ColorField
            label="Text Color"
            description="텍스트 색상"
            value={color}
            onChange={setColor}
            presets={COLOR_PRESETS}
          />
          <SelectField
            label="Font Size"
            description="텍스트 크기"
            value={fontSize}
            onChange={setFontSize}
            options={FONT_SIZE_OPTIONS}
          />
          <SelectField
            label="Font Weight"
            description="글꼴 두께"
            value={fontWeight}
            onChange={setFontWeight}
            options={FONT_WEIGHT_OPTIONS}
          />
        </div>

        {/* 리셋 버튼 */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={() => {
              setText(LIQUID_DEFAULTS.text);
              setScale(LIQUID_DEFAULTS.scale);
              setBaseFrequency(LIQUID_DEFAULTS.baseFrequency);
              setSpeed(LIQUID_DEFAULTS.speed);
              setNumOctaves(LIQUID_DEFAULTS.numOctaves);
              setColor(LIQUID_DEFAULTS.color);
              setFontSize(LIQUID_DEFAULTS.fontSize);
              setFontWeight(LIQUID_DEFAULTS.fontWeight);
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
    <ComponentDocPage
      title="Liquid Text."
      description="SVG feTurbulence와 feDisplacementMap 필터를 활용하여 텍스트에 액체처럼 흐르는 왜곡 애니메이션을 적용합니다."
      preview={
        <div className="h-48 flex items-center justify-center">
          <LiquidText
            key={`${text}-${scale}-${baseFrequency}-${speed}-${numOctaves}-${color}`}
            text={text}
            scale={scale}
            baseFrequency={baseFrequency}
            speed={speed}
            numOctaves={numOctaves}
            color={color}
            className={`${fontSize} ${fontWeight}`}
          />
        </div>
      }
      usage={usageExample}
      code={liquidTextCode}
      controlPanel={controlPanel}
      idea={{
        when: "컴포넌트가 마운트될 때",
        what: "텍스트의 모든 픽셀을",
        how: "SVG feTurbulence로 Perlin Noise를 생성하고, feDisplacementMap으로 노이즈 값에 따라 픽셀 위치를 왜곡하여 액체처럼 흐르는 효과를 실시간으로 표현",
      }}
      prompt="LiquidText 컴포넌트를 만들어주세요. SVG feTurbulence 필터로 Perlin Noise를 생성하고, feDisplacementMap으로 텍스트 픽셀을 왜곡하여 액체처럼 흐르는 효과를 만듭니다. requestAnimationFrame으로 turbulence seed를 매 프레임 변경하여 실시간 애니메이션을 구현합니다. scale(왜곡 강도), baseFrequency(물결 크기), speed(속도), numOctaves(디테일) prop을 지원해주세요."
    />
  );
}
