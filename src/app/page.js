import Image from "next/image";
import MiruMain from "./pages/miruPage/miruMain";
import SuveryQuestions from "./components/global/survey";
import HistoryPage from "./pages/historyPage/historyMain";
import MiruDocPage from "./pages/miruDocPage/miruDocMain";

export default function Home() {
  return (
    <div className="">
      <MiruDocPage />
    </div>
  );
}
