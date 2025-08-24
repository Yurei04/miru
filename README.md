# How to Run Miru Locally

This project has two main parts:  
1. **Frontend (Next.js + React + Tailwind)**  
2. **Backend (FastAPI + YOLOv8 ML model)**  

Follow the steps below to run everything on your own machine.  

---

## 1. Clone the Repository
```bash
git clone https://github.com/Yurei04/miru.git
cd miru
```

---

## 2. Set Up the Backend (FastAPI + YOLOv8)

Go to the backend folder:
```bash
cd src
cd backend
```

Create a Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows
```

Install dependencies:
```bash
pip install -r requirements.txt
```
```
fastapi
uvicorn
ultralytics
opencv-python
numpy
```

Run the backend server:
```bash
uvicorn main:app --reload --port 8000
```

Your backend should now be live at:  
[http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 3. Set Up the Frontend (Next.js)

Open a new terminal and go to the frontend folder:
```bash
cd miru
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Your frontend should now be live at:  
[http://localhost:3000](http://localhost:3000)

---

## 4. Connect Frontend to Backend

In your frontend code (usually inside `services/api.js` or wherever you fetch data), make sure the API URL points to your local backend:

```javascript
const API_URL = "http://127.0.0.1:8000";
```

---

## 5. Test the App

- Upload an image → the backend runs YOLOv8 detection.  
- If you set up live detection, enable your webcam.  
- Results should be returned and displayed on the frontend.  

---

## Done!

You now have the full project running locally with:

- Frontend → [http://localhost:3000](http://localhost:3000)  
- Backend → [http://127.0.0.1:8000](http://127.0.0.1:8000)
