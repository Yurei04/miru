import NavBar from "@/app/components/global/navbar";
import HistoryPage from "@/app/pages/historyPage/historyMain";

export default function History () {
    return (
        <div className="w-full h-screen">
            <NavBar />
            <HistoryPage />
        </div>
    )
}