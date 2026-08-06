"use client";

import { ReactNode, useState } from "react";
import Title from "./Title";
import TabInterface from "@/components/common/TabInterface";
import ControlPanelWrapper from "@/components/common/ControlPanelWrapper";
import IdeaConcretizationSection from "@/components/common/IdeaConcretizationSection";
import BasicPromptSection from "@/components/common/BasicPromptSection";

interface ComponentDocPageProps {
  /** 페이지 제목. 문자열 또는 <TextScramble /> 같은 노드 */
  title: ReactNode;
  /** 제목 아래 컴포넌트 설명 */
  description: ReactNode;
  /** Preview 탭 내용 */
  preview: ReactNode;
  /** Usage 탭에 표시할 예제 코드 문자열 */
  usage: string;
  /** Code 탭에 표시할 컴포넌트 소스 (?raw import) */
  code: string;
  codeLanguage?: string;
  /**
   * 컨트롤 패널 필드들. "컨트롤 패널" 헤딩과 ControlPanelWrapper로 감싸
   * 3열 그리드로 렌더링된다. 레이아웃까지 직접 구성하려면 controlPanel 사용.
   */
  controls?: ReactNode;
  /** 헤딩/래퍼 포함 전체를 직접 구성하는 컨트롤 패널 (controls보다 우선) */
  controlPanel?: ReactNode;
  idea?: { when: string; what: string; how: string };
  prompt?: string;
}

export default function ComponentDocPage({
  title,
  description,
  preview,
  usage,
  code,
  codeLanguage = "typescript",
  controls,
  controlPanel,
  idea,
  prompt,
}: ComponentDocPageProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const resolvedControlPanel =
    controlPanel ??
    (controls ? (
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">컨트롤 패널</h3>
        <ControlPanelWrapper>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{controls}</div>
        </ControlPanelWrapper>
      </div>
    ) : undefined);

  return (
    <div>
      <Title>{title}</Title>
      <hr className="my-4 border-t border-gray-700" />

      <p className="text-gray-200 text-lg mb-8">{description}</p>

      <TabInterface
        activeTab={activeTab}
        onTabChange={setActiveTab}
        previewContent={preview}
        usageContent={usage}
        codeContent={code}
        codeLanguage={codeLanguage}
        onCopyCode={handleCopyCode}
        controlPanel={resolvedControlPanel}
      />

      {idea && <IdeaConcretizationSection when={idea.when} what={idea.what} how={idea.how} />}

      {prompt && <BasicPromptSection prompt={prompt} />}
    </div>
  );
}
