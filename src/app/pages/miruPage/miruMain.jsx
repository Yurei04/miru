import ImgDetect from "@/app/components/imgDetect";
import LiveDetection from "@/app/components/liveDetect";

export default function MiruMain () {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div>
                <ImgDetect/>
                <LiveDetection/>
            </div>
        </div>
    )
}