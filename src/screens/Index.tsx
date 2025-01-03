import { useContext } from "react";
import { AuthContext } from "../components/auth/AuthContext";

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
        <div className="text-right text-blue-900">
          {language === "esp" ? "Creado por:" : "Created by:"}{" "}
          <span className="text-lg font-bold text-gray-800">roobbs</span>
        </div>
      </main>
    </>
  );
}
