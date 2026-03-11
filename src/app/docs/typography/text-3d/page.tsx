"use client";
import { useState } from "react";
import Text3D from "@/components/common/framer-motion/typography/Text3D";
import TabInterface from "@/components/common/TabInterface";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import Title from "../../components/Title";

export default function Text3DPage() {
  // 컨트롤 상태
  const [text, setText] = useState("3D TEXT");
  const [fontSize, setFontSize] = useState(80);
  const [rotateAngle, setRotateAngle] = useState(20);
  const [skewAngle, setSkewAngle] = useState(-20);
  const [baseColor, setBaseColor] = useState("#ffffff");
  const [shadowColor1, setShadowColor1] = useState("#51B3A3");
  const [shadowColor2, setShadowColor2] = useState("#389788");
  const [shadowColor3, setShadowColor3] = useState("#7ee5d6");
  const [backgroundColor, setBackgroundColor] = useState("#59C4B4");
  const [shadowDepth, setShadowDepth] = useState(90);
  const [centered, setCentered] = useState(false);

  // 새로운 text-shadow 컨트롤 추가
  const [shadowOffsetX, setShadowOffsetX] = useState(1);
  const [shadowOffsetY, setShadowOffsetY] = useState(1);
  const [shadowBlur, setShadowBlur] = useState(0);
  const [shadowSpread, setShadowSpread] = useState(1);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    navigator.clipboard.writeText(text3DCode);
  };

  // Usage 예제 코드
  const usageExample = `import Text3D from "@/components/common/framer-motion/typography/Text3D";

// 기본 사용법
<Text3D
  text="3D TEXT"
  fontSize={80}
  rotateAngle={20}
  skewAngle={-20}
  baseColor="#ffffff"
  shadowColor1="#51B3A3"
  shadowColor2="#389788"
  shadowColor3="#7ee5d6"
  backgroundColor="#59C4B4"
  shadowDepth={90}
  shadowOffsetX={1}
  shadowOffsetY={1}
  shadowBlur={0}
  shadowSpread={1}
  centered={false}
/>

// 커스텀 설정
<Text3D
  text="CUSTOM 3D"
  fontSize={120}
  rotateAngle={15}
  skewAngle={-15}
  baseColor="#ff6b6b"
  shadowColor1="#e74c3c"
  shadowColor2="#c0392b"
  shadowColor3="#ff8a80"
  backgroundColor="#2c3e50"
  shadowDepth={120}
  shadowOffsetX={2}
  shadowOffsetY={2}
  shadowBlur={1}
  shadowSpread={1.5}
  centered={true}
/>

// 게임 스타일
<Text3D
  text="GAME OVER"
  fontSize={100}
  rotateAngle={25}
  skewAngle={-25}
  baseColor="#f39c12"
  shadowColor1="#e67e22"
  shadowColor2="#d35400"
  shadowColor3="#f1c40f"
  backgroundColor="#34495e"
  shadowDepth={150}
  shadowOffsetX={1.5}
  shadowOffsetY={1.5}
  shadowBlur={0}
  shadowSpread={1.2}
  centered={false}
/>`;

  // 컴포넌트 소스 코드
  const text3DCode = `"use client";

import React from "react";

interface Text3DProps {
  text: string;
  fontSize?: number;
  rotateAngle?: number;
  skewAngle?: number;
  baseColor?: string;
  shadowColor1?: string;
  shadowColor2?: string;
  shadowColor3?: string;
  backgroundColor?: string;
  shadowDepth?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowBlur?: number;
  shadowSpread?: number;
  centered?: boolean;
}

export default function Text3D({
  text,
  fontSize = 80,
  rotateAngle = 20,
  skewAngle = -20,
  baseColor = "#ffffff",
  shadowColor1 = "#51B3A3",
  shadowColor2 = "#389788",
  shadowColor3 = "#7ee5d6",
  backgroundColor = "#59C4B4",
  shadowDepth = 90,
  shadowOffsetX = 1,
  shadowOffsetY = 1,
  shadowBlur = 0,
  shadowSpread = 1,
  centered = false,
}: Text3DProps) {
  const generateShadows = () => {
    const shadows = [];

    // 첫 번째 단계: shadowColor1
    for (let i = 1; i <= 20; i++) {
      const x = i * shadowOffsetX * shadowSpread;
      const y = (i + (i > 10 ? i - 10 : 0)) * shadowOffsetY * shadowSpread;
      shadows.push(\`\${x}px \${y}px \${shadowBlur}px \${shadowColor1}\`);
    }

    // 두 번째 단계: shadowColor2
    for (let i = 21; i <= 47; i++) {
      const x = (i + Math.floor((i - 21) / 2)) * shadowOffsetX * shadowSpread;
      const y = (i + Math.floor((i - 21) / 2) + 10) * shadowOffsetY * shadowSpread;
      shadows.push(\`\${x}px \${y}px \${shadowBlur}px \${shadowColor2}\`);
    }

    // 세 번째 단계: shadowColor3
    for (let i = 48; i <= 64; i++) {
      const x = (i + (i - 48) * 2) * shadowOffsetX * shadowSpread;
      const y = (i + (i - 48) * 4 + 1) * shadowOffsetY * shadowSpread;
      shadows.push(\`\${x}px \${y}px \${shadowBlur}px \${shadowColor3}\`);
    }

    // 마지막 단계: shadowColor1 (뒷부분)
    for (let i = 65; i <= shadowDepth; i++) {
      const x = (i + (i - 65) * 2) * shadowOffsetX * shadowSpread;
      const y = (i + (i - 65) * 1 + 15) * shadowOffsetY * shadowSpread;
      shadows.push(\`\${x}px \${y}px \${shadowBlur}px \${shadowColor1}\`);
    }

    return shadows.join(", ");
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{ backgroundColor: centered ? backgroundColor : "transparent" }}
    >
      <h1
        style={{
          color: baseColor,
          fontSize: \`\${fontSize}px\`,
          transform: \`rotate(\${rotateAngle}deg) skew(\${skewAngle}deg)\`,
          textShadow: generateShadows(),
          userSelect: "none",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          fontFamily: "'Press Start 2P', cursive",
        }}
      >
        {text}
      </h1>
    </div>
  );
}`;

  // 컨트롤 패널
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
              placeholder="3D 텍스트를 입력하세요"
            />
          </div>

          {/* FONT SIZE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Font Size</label>
            <p className="text-xs text-gray-400">글꼴 크기 (px)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="20"
                max="200"
                step="5"
              />
            </div>
          </div>

          {/* ROTATE ANGLE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Rotate Angle</label>
            <p className="text-xs text-gray-400">회전 각도 (도)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="-45"
                max="45"
                step="1"
                value={rotateAngle}
                onChange={(e) => setRotateAngle(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={rotateAngle}
                onChange={(e) => setRotateAngle(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="-45"
                max="45"
                step="1"
              />
            </div>
          </div>

          {/* SKEW ANGLE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Skew Angle</label>
            <p className="text-xs text-gray-400">기울기 각도 (도)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="-45"
                max="45"
                step="1"
                value={skewAngle}
                onChange={(e) => setSkewAngle(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={skewAngle}
                onChange={(e) => setSkewAngle(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="-45"
                max="45"
                step="1"
              />
            </div>
          </div>

          {/* BASE COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Base Color</label>
            <p className="text-xs text-gray-400">기본 텍스트 색상</p>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#ffffff"
              />
            </div>
          </div>

          {/* SHADOW COLOR 1 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Shadow Color 1</label>
            <p className="text-xs text-gray-400">첫 번째 그림자 색상</p>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={shadowColor1}
                onChange={(e) => setShadowColor1(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={shadowColor1}
                onChange={(e) => setShadowColor1(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#51B3A3"
              />
            </div>
          </div>

          {/* SHADOW COLOR 2 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Shadow Color 2</label>
            <p className="text-xs text-gray-400">두 번째 그림자 색상</p>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={shadowColor2}
                onChange={(e) => setShadowColor2(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={shadowColor2}
                onChange={(e) => setShadowColor2(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#389788"
              />
            </div>
          </div>

          {/* SHADOW COLOR 3 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Shadow Color 3</label>
            <p className="text-xs text-gray-400">세 번째 그림자 색상</p>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={shadowColor3}
                onChange={(e) => setShadowColor3(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={shadowColor3}
                onChange={(e) => setShadowColor3(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#7ee5d6"
              />
            </div>
          </div>

          {/* BACKGROUND COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Background Color</label>
            <p className="text-xs text-gray-400">배경 색상</p>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                placeholder="#59C4B4"
              />
            </div>
          </div>

          {/* SHADOW DEPTH */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Shadow Depth</label>
            <p className="text-xs text-gray-400">그림자 깊이</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                value={shadowDepth}
                onChange={(e) => setShadowDepth(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={shadowDepth}
                onChange={(e) => setShadowDepth(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="20"
                max="200"
                step="5"
              />
            </div>
          </div>

          {/* SHADOW OFFSET X */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Shadow Offset X</label>
            <p className="text-xs text-gray-400">그림자 X 오프셋</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={shadowOffsetX}
                onChange={(e) => setShadowOffsetX(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={shadowOffsetX}
                onChange={(e) => setShadowOffsetX(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0"
                max="5"
                step="0.1"
              />
            </div>
          </div>

          {/* SHADOW OFFSET Y */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Shadow Offset Y</label>
            <p className="text-xs text-gray-400">그림자 Y 오프셋</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={shadowOffsetY}
                onChange={(e) => setShadowOffsetY(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={shadowOffsetY}
                onChange={(e) => setShadowOffsetY(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0"
                max="5"
                step="0.1"
              />
            </div>
          </div>

          {/* SHADOW BLUR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Shadow Blur</label>
            <p className="text-xs text-gray-400">그림자 블러</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={shadowBlur}
                onChange={(e) => setShadowBlur(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={shadowBlur}
                onChange={(e) => setShadowBlur(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0"
                max="10"
                step="0.5"
              />
            </div>
          </div>

          {/* SHADOW SPREAD */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Shadow Spread</label>
            <p className="text-xs text-gray-400">그림자 확산</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={shadowSpread}
                onChange={(e) => setShadowSpread(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={shadowSpread}
                onChange={(e) => setShadowSpread(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0.5"
                max="3"
                step="0.1"
              />
            </div>
          </div>

          {/* CENTERED */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Background Style</label>
            <p className="text-xs text-gray-400">배경 스타일 적용</p>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={centered}
                onChange={(e) => setCentered(e.target.checked)}
                className="w-4 h-4 text-blue-400 bg-black/20 border-gray-600 rounded focus:ring-blue-400 focus:ring-2"
              />
              <span className="text-sm text-gray-200">배경 색상 적용</span>
            </label>
          </div>
        </div>
      </ControlPanelWrapper>
    </div>
  );

  return (
    <div>
      <Title>3D Text Effect</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        CSS text-shadow를 활용하여 3D 텍스트 효과를 구현합니다. 회전, 기울기, 다층 그림자를 통해 입체감 있는 텍스트를
        표현하며, 게임이나 레트로 스타일의 인터페이스에 적합합니다.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div className="h-[50vh] flex items-center justify-center">
            <div
              className="min-h-32 md:min-h-40 flex items-center justify-center"
              style={{ backgroundColor: centered ? backgroundColor : "transparent" }}
            >
              <Text3D
                text={text}
                fontSize={fontSize}
                rotateAngle={rotateAngle}
                skewAngle={skewAngle}
                baseColor={baseColor}
                shadowColor1={shadowColor1}
                shadowColor2={shadowColor2}
                shadowColor3={shadowColor3}
                backgroundColor={backgroundColor}
                shadowDepth={shadowDepth}
                shadowOffsetX={shadowOffsetX}
                shadowOffsetY={shadowOffsetY}
                shadowBlur={shadowBlur}
                shadowSpread={shadowSpread}
                centered={false}
              />
            </div>
          </div>
        }
        usageContent={usageExample}
        codeContent={text3DCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="3D 텍스트 효과가 필요한 게임이나 레트로 스타일 인터페이스에서"
        what="텍스트를"
        how="CSS text-shadow의 다층 그림자와 transform의 rotate, skew를 조합하여 입체감 있는 3D 효과로 표현"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="Text3D 컴포넌트를 만들어주세요. 이 컴포넌트는 CSS text-shadow를 활용한 3D 텍스트 효과를 보여줍니다. text prop으로 표시할 텍스트를, fontSize prop으로 글꼴 크기를, rotateAngle과 skewAngle prop으로 회전과 기울기 각도를 설정할 수 있게 해주세요. baseColor prop으로 기본 텍스트 색상을, shadowColor1, shadowColor2, shadowColor3 prop으로 다층 그림자 색상을, backgroundColor prop으로 배경 색상을 설정할 수 있게 해주세요. shadowDepth prop으로 그림자 깊이를, shadowOffsetX와 shadowOffsetY prop으로 그림자 오프셋을, shadowBlur와 shadowSpread prop으로 그림자 블러와 확산을 설정할 수 있게 해주세요. centered prop으로 배경 색상 적용 여부를 설정할 수 있게 해주세요. CSS text-shadow를 다층으로 생성하여 3D 효과를 구현하고, transform을 활용하여 회전과 기울기 효과를 적용해주세요." />
    </div>
  );
}
