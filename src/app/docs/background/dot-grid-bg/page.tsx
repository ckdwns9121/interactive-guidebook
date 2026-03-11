"use client";

import { useState } from "react";
import DotGridBG from "@/components/common/framer-motion/background/dot-grid-bg/DotGridBG";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";
import TabInterface from "@/components/common/TabInterface";
import Title from "../../components/Title";
import {
  DOT_GRID_DEFAULTS,
  COLOR_PRESETS,
  BG_COLOR_PRESETS,
} from "./constants";

export default function DotGridBGPage() {
  const [dotSize, setDotSize] = useState(DOT_GRID_DEFAULTS.dotSize);
  const [dotSpacing, setDotSpacing] = useState(DOT_GRID_DEFAULTS.dotSpacing);
  const [interactionRadius, setInteractionRadius] = useState(
    DOT_GRID_DEFAULTS.interactionRadius
  );
  const [maxDotScale, setMaxDotScale] = useState(
    DOT_GRID_DEFAULTS.maxDotScale
  );
  const [showLines, setShowLines] = useState(DOT_GRID_DEFAULTS.showLines);
  const [lineOpacity, setLineOpacity] = useState(
    DOT_GRID_DEFAULTS.lineOpacity
  );
  const [dotColor, setDotColor] = useState(DOT_GRID_DEFAULTS.dotColor);
  const [bgGradient, setBgGradient] = useState(BG_COLOR_PRESETS[0].value);

  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">(
    "preview"
  );

  const handleReset = () => {
    setDotSize(DOT_GRID_DEFAULTS.dotSize);
    setDotSpacing(DOT_GRID_DEFAULTS.dotSpacing);
    setInteractionRadius(DOT_GRID_DEFAULTS.interactionRadius);
    setMaxDotScale(DOT_GRID_DEFAULTS.maxDotScale);
    setShowLines(DOT_GRID_DEFAULTS.showLines);
    setLineOpacity(DOT_GRID_DEFAULTS.lineOpacity);
    setDotColor(DOT_GRID_DEFAULTS.dotColor);
    setBgGradient(BG_COLOR_PRESETS[0].value);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(componentCode);
  };

  const usageExample = `import DotGridBG from "@/components/common/framer-motion/background/dot-grid-bg/DotGridBG";

// 기본 사용법
<div className="relative h-64 bg-gradient-to-b from-gray-900 to-black">
  <DotGridBG />
</div>

// children과 함께 사용
<div className="relative h-96 bg-gradient-to-b from-indigo-950 to-gray-950">
  <DotGridBG
    dotColor="#818cf8"
    interactionRadius={150}
    maxDotScale={4}
    showLines={true}
    lineOpacity={0.2}
  >
    <div className="flex items-center justify-center h-full">
      <h1 className="text-4xl font-bold text-white">Hello World</h1>
    </div>
  </DotGridBG>
</div>

// 라인 없이 사용
<DotGridBG
  dotColor="#f472b6"
  dotSpacing={20}
  showLines={false}
  maxDotScale={5}
/>`;

  const componentCode = `"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface DotGridBGProps {
  dotSize?: number;
  dotColor?: string;
  dotSpacing?: number;
  interactionRadius?: number;
  maxDotScale?: number;
  showLines?: boolean;
  lineColor?: string;
  lineOpacity?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function DotGridBG({
  dotSize = 1,
  dotColor = "#ffffff",
  dotSpacing = 30,
  interactionRadius = 120,
  maxDotScale = 3,
  showLines = true,
  lineColor = "#ffffff",
  lineOpacity = 0.15,
  className = "",
  children,
}: DotGridBGProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const rafRef = useRef<number>(0);

  const hexToRgb = useCallback((hex: string) => {
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 255, g: 255, b: 255 };
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const mouse = mouseRef.current;
    const dotRgb = hexToRgb(dotColor);
    const lineRgb = hexToRgb(lineColor);
    const radiusSq = interactionRadius * interactionRadius;

    ctx.clearRect(0, 0, width, height);

    const activeDots: { x: number; y: number; scale: number }[] = [];

    for (let x = dotSpacing; x < width; x += dotSpacing) {
      for (let y = dotSpacing; y < height; y += dotSpacing) {
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const distSq = dx * dx + dy * dy;

        let scale = 1;
        let alpha = 0.3;

        if (mouse.active && distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          const t = 1 - dist / interactionRadius;
          scale = 1 + (maxDotScale - 1) * t;
          alpha = 0.3 + 0.7 * t;
          activeDots.push({ x, y, scale });
        }

        ctx.beginPath();
        ctx.arc(x, y, dotSize * scale, 0, Math.PI * 2);
        ctx.fillStyle = \`rgba(\${dotRgb.r}, \${dotRgb.g}, \${dotRgb.b}, \${alpha})\`;
        ctx.fill();
      }
    }

    if (showLines && activeDots.length > 1) {
      const maxLineDist = dotSpacing * 2;
      const maxLineDistSq = maxLineDist * maxLineDist;

      for (let i = 0; i < activeDots.length; i++) {
        for (let j = i + 1; j < activeDots.length; j++) {
          const a = activeDots[i];
          const b = activeDots[j];
          const ldx = a.x - b.x;
          const ldy = a.y - b.y;
          const ldistSq = ldx * ldx + ldy * ldy;

          if (ldistSq < maxLineDistSq) {
            const ldist = Math.sqrt(ldistSq);
            const lineAlpha = lineOpacity * (1 - ldist / maxLineDist);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = \`rgba(\${lineRgb.r}, \${lineRgb.g}, \${lineRgb.b}, \${lineAlpha})\`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }
  }, [dotSize, dotColor, dotSpacing, interactionRadius, maxDotScale, showLines, lineColor, lineOpacity, hexToRgb]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = \`\${rect.width}px\`;
      canvas.style.height = \`\${rect.height}px\`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      draw();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(draw);
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, active: false };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(draw);
    };

    resizeCanvas();

    const observer = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      observer.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return (
    <div className={\`relative \${className}\`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-auto"
        style={{ display: "block" }}
      />
      {children && (
        <div className="relative z-10 pointer-events-none">{children}</div>
      )}
    </div>
  );
}`;

  const controlPanel = (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
      <ControlPanelWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">
              Dot Size
            </label>
            <p className="text-xs text-gray-400">점의 기본 크기</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={dotSize}
                onChange={(e) => setDotSize(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={dotSize}
                onChange={(e) => setDotSize(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0.5"
                max="3"
                step="0.5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">
              Dot Spacing
            </label>
            <p className="text-xs text-gray-400">점 사이 간격 (px)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="15"
                max="60"
                step="5"
                value={dotSpacing}
                onChange={(e) => setDotSpacing(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={dotSpacing}
                onChange={(e) => setDotSpacing(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="15"
                max="60"
                step="5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">
              Interaction Radius
            </label>
            <p className="text-xs text-gray-400">마우스 반응 반경 (px)</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="50"
                max="250"
                step="10"
                value={interactionRadius}
                onChange={(e) => setInteractionRadius(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={interactionRadius}
                onChange={(e) => setInteractionRadius(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="50"
                max="250"
                step="10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">
              Max Dot Scale
            </label>
            <p className="text-xs text-gray-400">점의 최대 확대 배율</p>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="1.5"
                max="6"
                step="0.5"
                value={maxDotScale}
                onChange={(e) => setMaxDotScale(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={maxDotScale}
                onChange={(e) => setMaxDotScale(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="1.5"
                max="6"
                step="0.5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">
              Show Lines
            </label>
            <p className="text-xs text-gray-400">
              활성화된 점 사이 연결선 표시
            </p>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showLines}
                onChange={(e) => setShowLines(e.target.checked)}
                className="w-4 h-4 text-blue-400 bg-black/20 border-gray-600 rounded focus:ring-blue-400 focus:ring-2"
              />
              <span className="text-sm text-gray-200">연결선 표시</span>
            </label>
          </div>

          {showLines && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">
                Line Opacity
              </label>
              <p className="text-xs text-gray-400">연결선 투명도</p>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="0.05"
                  max="0.4"
                  step="0.05"
                  value={lineOpacity}
                  onChange={(e) => setLineOpacity(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="number"
                  value={lineOpacity}
                  onChange={(e) => setLineOpacity(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  min="0.05"
                  max="0.4"
                  step="0.05"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">
              Dot Color
            </label>
            <p className="text-xs text-gray-400">점 색상 프리셋</p>
            <div className="flex flex-wrap gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setDotColor(preset.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    dotColor === preset.value
                      ? "border-white scale-110"
                      : "border-gray-600 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: preset.value }}
                  title={preset.label}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">
              Background
            </label>
            <p className="text-xs text-gray-400">배경 그라디언트</p>
            <select
              value={bgGradient}
              onChange={(e) => setBgGradient(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {BG_COLOR_PRESETS.map((preset) => (
                <option
                  key={preset.value}
                  value={preset.value}
                  className="bg-gray-800 text-white"
                >
                  {preset.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 flex items-end">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              초기화
            </button>
          </div>
        </div>
      </ControlPanelWrapper>
    </div>
  );

  return (
    <div>
      <Title>Dot Grid Background</Title>
      <hr className="my-4 border-t border-gray-700" />

      <p className="text-gray-200 text-lg mb-8">
        HTML5 Canvas 기반의 인터랙티브 도트 그리드 배경입니다. 마우스 커서 근처의
        점들이 커지고 연결선이 나타나며 네트워크 효과를 만들어냅니다.
      </p>

      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={
          <div
            className={`relative h-64 rounded-lg overflow-hidden bg-gradient-to-b ${bgGradient}`}
          >
            <DotGridBG
              key={`${dotSize}-${dotSpacing}-${interactionRadius}-${maxDotScale}-${showLines}-${lineOpacity}-${dotColor}`}
              dotSize={dotSize}
              dotColor={dotColor}
              dotSpacing={dotSpacing}
              interactionRadius={interactionRadius}
              maxDotScale={maxDotScale}
              showLines={showLines}
              lineColor={dotColor}
              lineOpacity={lineOpacity}
              className="w-full h-full"
            >
              <div className="flex items-center justify-center h-64">
                <p className="text-white/60 text-lg font-medium tracking-widest uppercase select-none">
                  Move your mouse
                </p>
              </div>
            </DotGridBG>
          </div>
        }
        usageContent={usageExample}
        codeContent={componentCode}
        codeLanguage="typescript"
        onCopyCode={handleCopyCode}
        controlPanel={controlPanel}
      />

      <IdeaConcretizationSection
        when="마우스가 배경 위를 움직일 때"
        what="그리드의 각 점들을"
        how="HTML5 Canvas에 일정 간격의 점 그리드를 그리고, 마우스 위치와 각 점의 거리를 계산하여 반경 내의 점은 크기와 투명도를 증가시키고, 인접한 활성화된 점들 사이에 연결선을 그려 인터랙티브 네트워크 효과를 표현"
      />

      <BasicPromptSection prompt="DotGridBG 컴포넌트를 만들어주세요. HTML5 Canvas를 사용하여 일정 간격의 도트 그리드를 그리고, 마우스 커서 근처의 점들이 크기와 투명도가 증가하며, 활성화된 점들 사이에 연결선이 나타나는 인터랙티브 배경을 구현해주세요. dotSize, dotColor, dotSpacing, interactionRadius, maxDotScale, showLines, lineColor, lineOpacity props로 커스터마이즈할 수 있고, children을 받아 콘텐츠를 캔버스 위에 렌더링할 수 있게 해주세요. requestAnimationFrame을 사용하여 부드러운 애니메이션을 구현하고, ResizeObserver로 반응형 크기 조절을 지원해주세요." />
    </div>
  );
}
