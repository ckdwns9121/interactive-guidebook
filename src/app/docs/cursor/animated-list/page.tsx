"use client";

import { useState } from "react";
import AnimatedTextListWithCursor from "@/components/common/framer-motion/AnimatedTextListWithCursor";
import TabInterface from "@/components/common/TabInterface";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import Title from "../../components/Title";
import {
  ANIMATED_LIST_DEFAULTS,
  FONT_SIZE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  COLOR_OPTIONS,
  GAP_OPTIONS,
  IMAGE_SIZE_OPTIONS,
  BORDER_RADIUS_OPTIONS,
  DEFAULT_IMAGES,
} from "./constants";

export default function AnimatedTextListPage() {
  // 컨트롤 상태
  const [cities, setCities] = useState(ANIMATED_LIST_DEFAULTS.cities);
  const [fontSize, setFontSize] = useState(ANIMATED_LIST_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(ANIMATED_LIST_DEFAULTS.fontWeight);
  const [textColor, setTextColor] = useState(ANIMATED_LIST_DEFAULTS.textColor);
  const [codeColor, setCodeColor] = useState(ANIMATED_LIST_DEFAULTS.codeColor);
  const [gap, setGap] = useState(ANIMATED_LIST_DEFAULTS.gap);
  const [imageSize, setImageSize] = useState(ANIMATED_LIST_DEFAULTS.imageSize);
  const [borderRadius, setBorderRadius] = useState(ANIMATED_LIST_DEFAULTS.borderRadius);

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  // 코드 복사 핸들러
  const handleCopyCode = () => {
    navigator.clipboard.writeText(animatedListCode);
  };

  // Usage 예제 코드
  const usageExample = `import AnimatedTextListWithCursor from "@/components/common/framer-motion/AnimatedTextListWithCursor";

// 기본 사용법
const cities = [
  { code: "01", name: "Tokyo", img: "/images/tokyo.jpg" },
  { code: "02", name: "New York", img: "/images/newyork.jpg" },
  { code: "03", name: "Paris", img: "/images/paris.jpg" },
  { code: "04", name: "London", img: "/images/london.jpg" },
];

<AnimatedTextListWithCursor cities={cities} />

// 커스텀 설정
<AnimatedTextListWithCursor
  cities={cities}
  fontSize="text-2xl"
  fontWeight="font-bold"
  textColor="#ffffff"
  codeColor="#666666"
  gap="gap-6"
  imageSize="w-24 h-24"
  borderRadius="rounded-full"
/>`;

  // 컴포넌트 소스 코드
  const animatedListCode = `"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface City {
  code: string;
  name: string;
  img: string;
}

interface AnimatedTextListWithCursorProps {
  cities: City[];
  fontSize?: string;
  fontWeight?: string;
  textColor?: string;
  codeColor?: string;
  gap?: string;
  imageSize?: string;
  borderRadius?: string;
}

export default function AnimatedTextListWithCursor({
  cities,
  fontSize = "text-xl",
  fontWeight = "font-medium",
  textColor = "#ffffff",
  codeColor = "#666666",
  gap = "gap-4",
  imageSize = "w-20 h-20",
  borderRadius = "rounded-lg",
}: AnimatedTextListWithCursorProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative" onMouseMove={handleMouseMove}>
      <div className={\`flex flex-col \${gap}\`}>
        {cities.map((city, index) => (
          <motion.div
            key={index}
            className="flex items-center cursor-pointer"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ 
              skewX: -2,
              transition: { duration: 0.3 }
            }}
          >
            <motion.span
              className={\`\${fontSize} \${fontWeight} mr-8\`}
              style={{ color: codeColor }}
              animate={{
                color: hoveredIndex === index ? textColor : codeColor,
              }}
              transition={{ duration: 0.3 }}
            >
              {city.code}
            </motion.span>
            <motion.span
              className={\`\${fontSize} \${fontWeight}\`}
              style={{ color: textColor }}
              animate={{
                x: hoveredIndex === index ? 20 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {city.name}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* 커스텀 커서 */}
      {hoveredIndex !== null && (
        <motion.div
          className={\`fixed pointer-events-none z-50 \${imageSize} \${borderRadius} overflow-hidden\`}
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y - 40,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={cities[hoveredIndex].img}
            alt={cities[hoveredIndex].name}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </div>
  );
}`;

  // 도시 수정 함수
  const updateCity = (index: number, field: string, value: string) => {
    const newCities = [...cities];
    newCities[index] = { ...newCities[index], [field]: value };
    setCities(newCities);
  };

  // 컨트롤 패널
  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* CITY ITEMS */}
          <div className="space-y-4 md:col-span-2 lg:col-span-3">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">List Items</label>
            <p className="text-xs text-gray-400">리스트 설정</p>
            {cities.map((city, index) => (
              <div key={index} className="grid gap-4 md:grid-cols-3 p-4 bg-black/20 rounded-lg border border-gray-700">
                <div className="space-y-2">
                  <label className="text-xs text-gray-300">Code</label>
                  <input
                    type="text"
                    value={city.code}
                    onChange={(e) => updateCity(index, "code", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="01"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-300">Name</label>
                  <input
                    type="text"
                    value={city.name}
                    onChange={(e) => updateCity(index, "name", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Tokyo"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-300">Image</label>
                  <select
                    value={city.img}
                    onChange={(e) => updateCity(index, "img", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {DEFAULT_IMAGES.map((img) => (
                      <option key={img} value={img} className="bg-gray-800 text-white">
                        {img}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
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

          {/* TEXT COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Text Color</label>
            <p className="text-xs text-gray-400">메인 텍스트 색상</p>
            <select
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {COLOR_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* CODE COLOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Code Color</label>
            <p className="text-xs text-gray-400">코드 텍스트 색상</p>
            <select
              value={codeColor}
              onChange={(e) => setCodeColor(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {COLOR_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* GAP */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Gap</label>
            <p className="text-xs text-gray-400">항목 간 간격</p>
            <select
              value={gap}
              onChange={(e) => setGap(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {GAP_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* IMAGE SIZE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Image Size</label>
            <p className="text-xs text-gray-400">커서 이미지 크기</p>
            <select
              value={imageSize}
              onChange={(e) => setImageSize(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {IMAGE_SIZE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* BORDER RADIUS */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Border Radius</label>
            <p className="text-xs text-gray-400">이미지 둥글기</p>
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
        </div>

        {/* 리셋 버튼 */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={() => {
              setCities(ANIMATED_LIST_DEFAULTS.cities);
              setFontSize(ANIMATED_LIST_DEFAULTS.fontSize);
              setFontWeight(ANIMATED_LIST_DEFAULTS.fontWeight);
              setTextColor(ANIMATED_LIST_DEFAULTS.textColor);
              setCodeColor(ANIMATED_LIST_DEFAULTS.codeColor);
              setGap(ANIMATED_LIST_DEFAULTS.gap);
              setImageSize(ANIMATED_LIST_DEFAULTS.imageSize);
              setBorderRadius(ANIMATED_LIST_DEFAULTS.borderRadius);
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
      <Title>애니메이티드 리스트 (Animated Text List With Cursor)</Title>
      <hr className="my-4 border-t border-gray-700" />

      {/* 컴포넌트 설명 */}
      <p className="text-gray-200 text-lg mb-8">
        마우스 커서에 반응하는 인터랙티브 텍스트 리스트입니다. hover 시 컬러 변화와 애니메이션, 마우스 이동에 따른 skew
        효과, 커스텀 커서 이미지를 구현합니다.
      </p>

      {/* 탭 인터페이스 */}
      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <AnimatedTextListWithCursor
            cities={cities}
            fontSize={fontSize}
            fontWeight={fontWeight}
            textColor={textColor}
            codeColor={codeColor}
            gap={gap}
            imageSize={imageSize}
            borderRadius={borderRadius}
          />
        }
        usageContent={usageExample}
        codeContent={animatedListCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      {/* 아이디어 구체화 섹션 */}
      <IdeaConcretizationSection
        when="사용자가 리스트 항목에 마우스를 올렸을 때"
        what="텍스트와 커서를"
        how="컬러 변화, skew 애니메이션, 커스텀 이미지 커서로 표현하여 인터랙티브한 사용자 경험 제공"
      />

      {/* 기본 프롬프트 섹션 */}
      <BasicPromptSection prompt="AnimatedTextListWithCursor 컴포넌트를 만들어주세요. 이 컴포넌트는 마우스 커서에 반응하는 인터랙티브 텍스트 리스트를 보여줍니다. cities prop으로 코드, 이름, 이미지가 포함된 리스트 배열을, fontSize와 fontWeight prop으로 텍스트 스타일을, textColor와 codeColor prop으로 텍스트 색상을 설정할 수 있게 해주세요. gap prop으로 항목 간 간격을, imageSize와 borderRadius prop으로 커서 이미지 크기와 둥글기를 조정할 수 있게 해주세요. hover 시 텍스트 색상 변화와 이동 애니메이션, skew 효과를 적용하고, 마우스 위치에 따라 해당 항목의 이미지가 커서로 나타나도록 구현해주세요. framer-motion을 활용하여 부드러운 애니메이션을 구현해주세요." />
    </div>
  );
}
