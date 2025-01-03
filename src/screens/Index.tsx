import { useContext } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import { FaGithub } from "react-icons/fa";

import IndexHeader from "../components/IndexHeader";
import HeroSection from "../components/indexScreen/HeroSection";
import BenefitsSection from "../components/indexScreen/BenefitsSection";
import FeaturesSection from "../components/indexScreen/FeaturesSection";

export default function Index() {
  const { language } = useContext(AuthContext);

  return (
    <>
      <IndexHeader />
      <main className="flex flex-1 flex-col gap-8 bg-slate-50 p-8 text-gray-800 390p:p-4">
        <HeroSection />
        <BenefitsSection />
        <FeaturesSection />
        <div className="mt-8 flex justify-end">
          <a
            href="https://github.com/roobbs"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-800 to-blue-600 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-800 hover:shadow-xl"
          >
            <FaGithub className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-lg">
              {language === "esp" ? "Creado por " : "Created by "}
            </span>
            <span className="text-lg font-bold">roobbs</span>
          </a>
        </div>
      </main>
    </>
  );
}
