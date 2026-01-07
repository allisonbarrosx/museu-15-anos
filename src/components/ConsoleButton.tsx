import React from "react";
import { ConsoleOption } from "../../types";

interface ConsoleButtonProps {
  consoleData: ConsoleOption;
  isSelected: boolean;
  onClick: (consoleData: ConsoleOption) => void;
}

const ConsoleButton: React.FC<ConsoleButtonProps> = ({
  consoleData,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick(consoleData)}
      className={`
        relative group overflow-hidden rounded-xl p-6 text-left transition-all duration-300 border-2
        ${
          isSelected
            ? `border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.5)]`
            : "border-slate-800 hover:border-slate-600 hover:scale-[1.02]"
        }
        bg-slate-900
      `}
    >
      <div
        className={`absolute inset-0 opacity-20 transition-opacity duration-300 ${consoleData.gradient} group-hover:opacity-40`}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <span className="text-xs font-retro tracking-widest opacity-70 uppercase mb-2 block text-white/60">
            {consoleData.era}
          </span>
          <h3 className="text-2xl font-bold text-white mb-1 uppercase tracking-wide">
            {consoleData.name}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {consoleData.description}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
          <span>SELECIONAR</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default ConsoleButton;
