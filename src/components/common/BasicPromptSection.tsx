import SectionShell from "./SectionShell";

interface BasicPromptSectionProps {
  prompt: string;
}

export default function BasicPromptSection({ prompt }: BasicPromptSectionProps) {
  return (
    <SectionShell number={2} title="바이브 프롬프트">
      <p className="text-gray-300 text-sm leading-relaxed">{prompt}</p>
    </SectionShell>
  );
}
