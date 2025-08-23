
export default function LiveDetection () {
    const backendUrl = "http://localhost:5000";

    return (
        <div className="">
            <h2></h2>
            <div className="">
                <div className="">
                    <img
                        src={`${backendUrl}/detect-live`}
                        alt="Live Stream"
                        className=""
                    />
                </div>
            </div>
        </div>
    )
}