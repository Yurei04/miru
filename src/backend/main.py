from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import io
import cv2
from ultralytics import YOLO
import numpy as np

app = FastAPI()
model = YOLO("yolov8n.pt")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # change to the backend link later this is dangerous
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def root():
    return {"message": "FastAPI Yolo Working"}


# For MIRU img detection
@app.post("/detect-image")
async def detect_image(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    results = model.predict(img)

    for r in results:
        for box in r.boxes:
           x1, y1, x2, y2 = map(int, box.xyxy[0])
           cls = model.names[int(box.cls)]
           conf = float(box.conf)

           cv2.rectangle(img, (x1, y1), (x2, y2), [0, 255, 0], 2) 
           cv2.putText(img, f"{cls} {conf:.2f}", (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2) #change color later

    _, img_encoded = cv2.imencode(".jpg", img);    
    return StreamingResponse(io.BytesIO(img_encoded.tobytes()), media_type="image/jpeg")


# For MIRU live detection

def generate_frames():
    cap = cv2.VideoCapture(0)
    while True:
        success, frame = cap.read()
        if not success:
            break

        results = model(frame)

        for r in results:
            for box in r.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cls = model.names[int(box.cls)]
                conf = float(box.conf)
                cv2.rectangle(frame, (x1, y1), (x2, y2), [0, 255, 0], 2) 
                cv2.putText(frame, f"{cls} {conf:.2f}", (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2) #change color later
        
        _, buffer = cv2.imencode(".jpg", frame)
        frame_bytes = buffer.tobytes()

        yield (b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n")

    cap.release()
    
@app.get("/detect-live")
async def detect_live():
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")