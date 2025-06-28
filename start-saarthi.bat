@echo off
echo Starting Saarthi - Voice-First Health Education App
echo.

echo Starting Backend Server...
cd saarthi-backend
start "Saarthi Backend" cmd /k "venv\Scripts\activate && python -m uvicorn main:app --reload --port 8000"

echo.
echo Starting Frontend Server...
cd ..\saarthi-frontend
start "Saarthi Frontend" cmd /k "npm start"

echo.
echo Saarthi is starting up!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul 