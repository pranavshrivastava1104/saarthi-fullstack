# 🚀 START HERE - Saarthi Usage Guide

## ✅ Your servers are already running!

**Backend**: http://localhost:8000 ✅  
**Frontend**: http://localhost:3000 ✅  

## 🎯 Step-by-Step Usage

### 1. Test Voice Features First
1. **Open this file in your browser**: `test-speech.html`
2. **Test TTS**: Click "Test English TTS" - you should hear speech
3. **Test STT**: Click "Start Listening" and say "Hello" - you should see your words
4. **Allow microphone access** when prompted!

### 2. Use the Main App
1. **Open**: http://localhost:3000
2. **Choose language**: Select Hindi/Bengali/Marathi/Tamil from dropdown
3. **Listen to content**: Click 🔊 buttons to hear health information
4. **Take quizzes**: Click "Take Quiz" then "Answer by Voice"

### 3. Try These Features
- **Change Language**: Select different languages from dropdown
- **Voice Quizzes**: Answer questions using your voice
- **Health Topics**: Explore pregnancy, dengue, hygiene
- **Earn Points**: Get correct answers to earn badges

## 🔧 If You Need to Restart

### Backend (Terminal 1):
```bash
cd saarthi-backend
python -m uvicorn main:app --reload --port 8000
```

### Frontend (Terminal 2):
```bash
cd saarthi-frontend
npm start
```

## 🎤 Voice Features Working

✅ **Text-to-Speech**: Browser speaks content aloud  
✅ **Speech-to-Text**: Microphone listens to your answers  
✅ **Multi-language**: Hindi, Bengali, Marathi, Tamil, English  
✅ **Voice Quizzes**: Answer questions by speaking  

## 🌟 Demo Ready Features

- **Multi-language voice interface**
- **Interactive health quizzes**
- **Voice-based answers**
- **Real-time health alerts**
- **Gamification system**
- **Mobile-responsive design**

## 🏆 Ready for Hackathon!

Your Saarthi app is fully functional with working voice features!

**Start using it now**: http://localhost:3000 