"use client";

import { ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// 탭 아이콘 컴포넌트 (Material Design 아이콘 경로)
function VisibilityIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  );
}

function DescriptionIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
    </svg>
  );
}

interface TabInterfaceProps {
  activeTab: "preview" | "usage" | "code";
  onTabChange: (tab: "preview" | "usage" | "code") => void;
  previewContent: ReactNode;
  usageContent: string;
  codeContent: string;
  codeLanguage?: string;
  onCopyCode?: () => void;
  onSeeFullSnippet?: () => void;
  // Preview 탭 컨트롤 패널 props 추가
  controlPanel?: ReactNode;
}

// 탭 버튼 컴포넌트
interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}

function TabButton({ isActive, onClick, icon, label }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mr-4 last:mr-0 inline-flex items-center gap-2 rounded-md border border-white px-4 py-2 text-sm font-medium text-white transition-colors ${
        isActive ? "bg-[#1f2937] hover:bg-[#111827]" : "bg-transparent hover:bg-white/10"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// Refresh 아이콘 컴포넌트
function RefreshIcon() {
  return (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

// Copy 아이콘 컴포넌트
function CopyIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
}

// Preview 탭 컴포넌트
interface PreviewTabProps {
  previewContent: ReactNode;
  controlPanel?: ReactNode;
}

function PreviewTab({ previewContent, controlPanel }: PreviewTabProps) {
  return (
    <div className="space-y-6">
      {/* 데모 컨테이너 */}
      <div className="rounded-xl border border-gray-700 p-8 relative">
        {/* 새로고침 버튼 */}
        <button className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
          <RefreshIcon />
        </button>

        {/* 데모 컨테이너 */}
        <div className="flex items-center justify-center min-h-[400px]">{previewContent}</div>
      </div>

      {/* 컨트롤 패널 */}
      {controlPanel && <div className="rounded-xl border border-gray-700 p-6">{controlPanel}</div>}
    </div>
  );
}

// Usage 탭 컴포넌트
interface UsageTabProps {
  usageContent: string;
  codeLanguage?: string;
  onCopyCode?: () => void;
}

function UsageTab({ usageContent, codeLanguage = "typescript", onCopyCode }: UsageTabProps) {
  return (
    <div className="rounded-xl border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Usage</h3>
        <div className="flex items-center space-x-2">
          <select
            className="px-3 py-1 text-sm bg-gray-800 border border-gray-600 rounded text-white"
            defaultValue={codeLanguage}
          >
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
            <option value="jsx">JSX</option>
            <option value="tsx">TSX</option>
          </select>
          <button className="p-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors" onClick={onCopyCode}>
            <CopyIcon />
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <SyntaxHighlighter
          language={codeLanguage}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
            backgroundColor: "transparent",
          }}
          showLineNumbers={true}
          wrapLines={true}
        >
          {usageContent}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

// Code 탭 컴포넌트
interface CodeTabProps {
  codeContent: string;
  codeLanguage?: string;
  onCopyCode?: () => void;
  onSeeFullSnippet?: () => void;
}

function CodeTab({ codeContent, codeLanguage = "typescript", onCopyCode, onSeeFullSnippet }: CodeTabProps) {
  return (
    <div className="rounded-xl border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Code</h3>
        <div className="flex items-center space-x-2">
          <select
            className="px-3 py-1 text-sm bg-gray-800 border border-gray-600 rounded text-white"
            defaultValue={codeLanguage}
          >
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
            <option value="jsx">JSX</option>
            <option value="tsx">TSX</option>
          </select>
          <button className="p-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors" onClick={onCopyCode}>
            <CopyIcon />
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <SyntaxHighlighter
          language={codeLanguage}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
            backgroundColor: "transparent",
          }}
          showLineNumbers={true}
          wrapLines={true}
        >
          {codeContent}
        </SyntaxHighlighter>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded hover:bg-gray-700 transition-colors text-white"
          onClick={onSeeFullSnippet}
        >
          See Full Snippet
        </button>
      </div>
    </div>
  );
}

export default function TabInterface({
  activeTab,
  onTabChange,
  previewContent,
  usageContent,
  codeContent,
  codeLanguage = "typescript",
  onCopyCode,
  onSeeFullSnippet,
  controlPanel,
}: TabInterfaceProps) {
  return (
    <section className="mb-8">
      <div className="flex items-center mb-6">
        <TabButton
          isActive={activeTab === "preview"}
          onClick={() => onTabChange("preview")}
          icon={<VisibilityIcon />}
          label="Preview"
        />

        <TabButton
          isActive={activeTab === "usage"}
          onClick={() => onTabChange("usage")}
          icon={<DescriptionIcon />}
          label="Usage"
        />

        <TabButton
          isActive={activeTab === "code"}
          onClick={() => onTabChange("code")}
          icon={<CodeIcon />}
          label="Code"
        />
      </div>

      {/* Preview 탭 내용 */}
      {activeTab === "preview" && <PreviewTab previewContent={previewContent} controlPanel={controlPanel} />}

      {/* Usage 탭 내용 */}
      {activeTab === "usage" && (
        <UsageTab usageContent={usageContent} codeLanguage={codeLanguage} onCopyCode={onCopyCode} />
      )}

      {/* Code 탭 내용 */}
      {activeTab === "code" && (
        <CodeTab
          codeContent={codeContent}
          codeLanguage={codeLanguage}
          onCopyCode={onCopyCode}
          onSeeFullSnippet={onSeeFullSnippet}
        />
      )}
    </section>
  );
}
