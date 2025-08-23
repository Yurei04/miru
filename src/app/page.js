import Image from "next/image";
import MiruMain from "./pages/miruPage/miruMain";
import SuveryQuestions from "./components/global/survey";
import HistoryPage from "./pages/historyPage/historyMain";

export default function Home() {
  return (
    <div className="">
      <HistoryPage />
    </div>
  );
}
