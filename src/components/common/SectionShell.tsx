import { ReactNode } from "react";

interface SectionShellProps {
  number: number;
  title: string;
  children: ReactNode;
}

export function SectionShell({ number, title, children }: SectionShellProps) {
  return (
    <section className="mb-8">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-8 h-8 bg-[#181818] rounded-full border border-white flex items-center justify-center">
          <span className="text-white font-bold text-sm">{number}</span>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
          <div className="pl-4 border-l border-gray-600">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default SectionShell;
