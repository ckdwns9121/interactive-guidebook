"use client";
import overlayCursorCode from "@/components/common/framer-motion/cursor/OverlayCursor.tsx?raw";

import { useState } from "react";
import OverlayCursorProvider from "@/components/common/framer-motion/cursor/OverlayCursor";
import ComponentDocPage from "../../components/ComponentDocPage";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import { TextAreaField } from "@/components/common/docs-controls/TextAreaField";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { ColorField } from "@/components/common/docs-controls/ColorField";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { OVERLAY_CURSOR_DEFAULTS, TEXT_SIZE_OPTIONS, COLOR_PRESETS } from "./constants";

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

export default function OverlayCursorDemoPage() {
  // 컨트롤 상태
  const [cursorText, setCursorText] = useState(OVERLAY_CURSOR_DEFAULTS.cursorText);
  const [cursorSize, setCursorSize] = useState(OVERLAY_CURSOR_DEFAULTS.cursorSize);
  const [cursorColor, setCursorColor] = useState(OVERLAY_CURSOR_DEFAULTS.cursorColor);
  const [demoText, setDemoText] = useState(OVERLAY_CURSOR_DEFAULTS.demoText);
  const [demoTextSize, setDemoTextSize] = useState(OVERLAY_CURSOR_DEFAULTS.demoTextSize);
  const [demoTextColor, setDemoTextColor] = useState(OVERLAY_CURSOR_DEFAULTS.demoTextColor);
  const [demoBgColor, setDemoBgColor] = useState(OVERLAY_CURSOR_DEFAULTS.demoBgColor);

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

          <RangeWithNumber
            label="Cursor Size"
            description="커서 크기"
            value={cursorSize}
            onChange={setCursorSize}
            min={30}
            max={150}
          />
          <ColorField
            label="Cursor Color"
            description="커서 배경 색상"
            value={cursorColor}
            onChange={setCursorColor}
            presets={COLOR_PRESETS}
          />
          <TextAreaField
            label="Demo Text"
            description="데모 영역의 텍스트"
            value={demoText}
            onChange={setDemoText}
            rows={2}
            placeholder="데모 텍스트를 입력하세요"
          />
          <SelectField
            label="Demo Text Size"
            description="데모 텍스트 크기"
            value={demoTextSize}
            onChange={setDemoTextSize}
            options={TEXT_SIZE_OPTIONS}
          />
          <ColorField label="Demo Text Color" description="데모 텍스트 색상" value={demoTextColor} onChange={setDemoTextColor} />
          <ColorField label="Demo Background" description="데모 영역 배경색" value={demoBgColor} onChange={setDemoBgColor} />
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
    <ComponentDocPage
      title="Overlay Mouse Cursor."
      description="마우스 커서가 영역 위에서 부드럽게 변형되는 인터랙션을 구현합니다. framer-motion을 활용하여 커스텀 커서를 생성하고, 마우스 움직임에 따라 자연스럽게 따라가는 애니메이션을 제공합니다."
      preview={
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
      usage={usageExample}
      code={overlayCursorCode}
      controlPanel={controlPanel}
      idea={{
        when: "사용자가 마우스를 움직일 때",
        what: "커스텀 커서를",
        how: "framer-motion의 useMotionValue와 useSpring을 활용하여 마우스 위치에 따라 부드럽게 따라가는 애니메이션으로 표현하고, 스프링 물리 효과를 적용하여 자연스러운 움직임 구현",
      }}
      prompt="OverlayCursorProvider 컴포넌트를 만들어주세요. 이 컴포넌트는 마우스 커서가 영역 위에서 부드럽게 변형되는 인터랙션을 보여줍니다. children prop으로 감싸질 콘텐츠를, cursorText prop으로 커서 안에 표시될 텍스트를, cursorSize prop으로 커서 크기를, cursorColor prop으로 커서 배경 색상을 설정할 수 있게 해주세요. framer-motion의 useMotionValue와 useSpring을 활용하여 마우스 위치를 감지하고, 커스텀 커서가 마우스를 따라 움직이도록 구현해주세요. 스프링 물리 효과를 적용하여 자연스러운 애니메이션을 구현하고, 마우스 진입/이탈 시 커서의 표시/숨김 효과도 추가해주세요."
    />
  );
}
