import SectionShell from "./SectionShell";

interface IdeaConcretizationSectionProps {
  when: string;
  what: string;
  how: string;
}

export default function IdeaConcretizationSection({ when, what, how }: IdeaConcretizationSectionProps) {
  return (
    <SectionShell number={1} title="인터렉션 아이디어">
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <span className="text-gray-400 text-sm font-medium min-w-[60px]">언제:</span>
          <span className="text-gray-300 text-sm">{when}</span>
        </div>
        <div className="flex items-start space-x-3">
          <span className="text-gray-400 text-sm font-medium min-w-[60px]">무엇을:</span>
          <span className="text-gray-300 text-sm">{what}</span>
        </div>
        <div className="flex items-start space-x-3">
          <span className="text-gray-400 text-sm font-medium min-w-[60px]">어떻게:</span>
          <span className="text-gray-300 text-sm">{how}</span>
        </div>
      </div>
    </SectionShell>
  );
}
