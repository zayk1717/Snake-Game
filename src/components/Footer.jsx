import React from "react";
import { FiGithub } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="py-6 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-12 select-none text-sm flex justify-center items-center space-x-2 flex-wrap gap-2">
      <div className="text-xs text-gray-400 dark:text-gray-500 select-text">
        &copy; {new Date().getFullYear()} SRCarlo. All rights reserved.
      </div>
      <a
        href="https://github.com/SRCarlo"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-1 underline hover:text-gray-900 dark:hover:text-gray-100 font-semibold"
      >
        <FiGithub size={16} />
        <span>SRCarlo</span>
      </a>
    </footer>
  );
}
