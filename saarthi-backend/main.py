from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
import uuid
import json
from typing import Dict, Any

app = FastAPI(title="Saarthi Health Education API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Language content for all 5 supported languages
LANGUAGE_CONTENT = {
    "hi-IN": {
        "welcome": "स्वागत है! मैं आपकी स्वास्थ्य शिक्षा में मदद करूंगा।",
        "excellent": "बहुत बढ़िया! आपने सही जवाब दिया! आपको 50 अंक मिले!",
        "wrong_answer": "यह बिल्कुल सही नहीं है। सही जवाब है: ",
        "not_understood": "माफ़ करें, मैं समझ नहीं पाया। कृपया फिर से कोशिश करें।",
        "listening": "🎤 सुन रहा हूं...",
        "speaking": "🔊 बोल रहा हूं...",
        "quiz_master": "क्विज मास्टर",
        "health_warrior": "स्वास्थ्य योद्धा",
        "first_lesson": "पहला पाठ"
    },
    "bn-IN": {
        "welcome": "স্বাগতম! আমি আপনার স্বাস্থ্য শিক্ষায় সাহায্য করব।",
        "excellent": "চমৎকার! আপনি সঠিক উত্তর দিয়েছেন! আপনি 50 পয়েন্ট পেয়েছেন!",
        "wrong_answer": "এটা ঠিক সঠিক নয়। সঠিক উত্তর হল: ",
        "not_understood": "দুঃখিত, আমি বুঝতে পারিনি। অনুগ্রহ করে আবার চেষ্টা করুন।",
        "listening": "🎤 শুনছি...",
        "speaking": "🔊 বলছি...",
        "quiz_master": "কুইজ মাস্টার",
        "health_warrior": "স্বাস্থ্য যোদ্ধা",
        "first_lesson": "প্রথম পাঠ"
    },
    "mr-IN": {
        "welcome": "स्वागत आहे! मी तुमच्या आरोग्य शिक्षणात मदत करेन.",
        "excellent": "उत्कृष्ट! तुम्ही बरोबर उत्तर दिले! तुम्हाला 50 गुण मिळाले!",
        "wrong_answer": "ते अगदी बरोबर नाही. बरोबर उत्तर आहे: ",
        "not_understood": "माफ करा, मी समजू शकलो नाही. कृपया पुन्हा प्रयत्न करा.",
        "listening": "🎤 ऐकत आहे...",
        "speaking": "🔊 बोलत आहे...",
        "quiz_master": "क्विझ मास्टर",
        "health_warrior": "आरोग्य योद्धा",
        "first_lesson": "पहिला धडा"
    },
    "ta-IN": {
        "welcome": "வரவேற்கிறேன்! நான் உங்கள் சுகாதார கல்வியில் உதவுவேன்.",
        "excellent": "சிறந்தது! நீங்கள் சரியான பதில் கொடுத்தீர்கள்! நீங்கள் 50 புள்ளிகள் பெற்றீர்கள்!",
        "wrong_answer": "அது முற்றிலும் சரியாக இல்லை. சரியான பதில்: ",
        "not_understood": "மன்னிக்கவும், நான் புரிந்துகொள் முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
        "listening": "🎤 கேட்கிறேன்...",
        "speaking": "🔊 பேசுகிறேன்...",
        "quiz_master": "வினாடி வினா மாஸ்டர்",
        "health_warrior": "சுகாதார வீரர்",
        "first_lesson": "முதல் பாடம்"
    },
    "en-IN": {
        "welcome": "Welcome! I will help you with health education.",
        "excellent": "Excellent! You got it right! You earned 50 points!",
        "wrong_answer": "That's not quite right. The correct answer is: ",
        "not_understood": "Sorry, I could not understand. Please try again.",
        "listening": "🎤 Listening...",
        "speaking": "🔊 Speaking...",
        "quiz_master": "Quiz Master",
        "health_warrior": "Health Warrior",
        "first_lesson": "First Lesson"
    }
}

# Voice mappings for different languages
VOICE_MAPPINGS = {
    "hi-IN": "hi-IN-Deepika",
    "bn-IN": "bn-IN-Tanishaa", 
    "mr-IN": "mr-IN-Aarohi",
    "ta-IN": "ta-IN-Pallavi",
    "en-IN": "en-IN-Neerja"
}

class TTSRequest(BaseModel):
    text: str
    language: str = "hi-IN"

class STTRequest(BaseModel):
    audio_data: str
    language: str = "hi-IN"

@app.get("/")
async def root():
    return {"message": "Saarthi Health Education API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Saarthi API"}

@app.get("/language-content/{language_code}")
async def get_language_content(language_code: str):
    """Get language-specific content for the frontend"""
    if language_code not in LANGUAGE_CONTENT:
        raise HTTPException(status_code=400, detail="Unsupported language")
    
    return LANGUAGE_CONTENT[language_code]

@app.get("/health-content/")
async def get_health_content():
    """Get health education content in multiple languages"""
    return {
        "topics": [
            {
                "id": "pregnancy",
                "title": {
                    "hi-IN": "गर्भावस्था पोषण",
                    "bn-IN": "গর্ভাবস্থার পুষ্টি", 
                    "mr-IN": "गर्भावस्था पोषण",
                    "ta-IN": "கர்ப்ப கால ஊட்டச்சத்து",
                    "en-IN": "Pregnancy Nutrition"
                },
                "content": {
                    "hi-IN": "गर्भावस्था के दौरान, बहुत सारे फल, सब्जियां और प्रोटीन खाएं। कच्ची मछली और बिना पाश्चराइज्ड दूध से बचें। दैनिक प्रसवपूर्व विटामिन लें।",
                    "bn-IN": "গর্ভাবস্থায় প্রচুর ফল, সবজি এবং প্রোটিন খান। কাঁচা মাছ এবং অপরিশোধিত দুধ এড়িয়ে চলুন। প্রতিদিন প্রসবপূর্ব ভিটামিন নিন।",
                    "mr-IN": "गर्भावस्थेदरम्यान, भरपूर फळे, भाज्या आणि प्रथिने खा. कच्चा मासा आणि अपाश्चराइज्ड दूध टाळा. दैनिक प्रसवपूर्व जीवनसत्त्वे घ्या.",
                    "ta-IN": "கர்ப்ப காலத்தில், நிறைய பழங்கள், காய்கறிகள் மற்றும் புரதங்களை உண்ணுங்கள். கச்சா மீன் மற்றும் பாஸ்சரைஸ் செய்யப்படாத பாலைத் தவிர்க்கவும். தினசரி கர்ப்ப முன் வைட்டமின்களை எடுத்துக்கொள்ளுங்கள்.",
                    "en-IN": "During pregnancy, eat plenty of fruits, vegetables, and protein. Avoid raw fish and unpasteurized milk. Take your prenatal vitamins daily."
                }
            },
            {
                "id": "dengue",
                "title": {
                    "hi-IN": "डेंगू रोकथाम",
                    "bn-IN": "ডেঙ্গু প্রতিরোধ",
                    "mr-IN": "डेंगू प्रतिबंध", 
                    "ta-IN": "டெங்கு தடுப்பு",
                    "en-IN": "Dengue Prevention"
                },
                "content": {
                    "hi-IN": "डेंगू मच्छरों से फैलता है। अपने आसपास को साफ रखें, खड़े पानी को हटाएं, मच्छरदानी का उपयोग करें और लंबी आस्तीन पहनें।",
                    "bn-IN": "ডেঙ্গু মশার মাধ্যমে ছড়ায়। আশপাশ পরিষ্কার রাখুন, জমে থাকা জল সরান, মশারি ব্যবহার করুন এবং লম্বা হাতা পরুন।",
                    "mr-IN": "डेंगू डासांद्वारे पसरतो. आपल्या सभोवताली स्वच्छ ठेवा, स्थिर पाणी काढून टाका, डासपल्ला वापरा आणि लांब बाही घाला.",
                    "ta-IN": "டெங்கு கொசுக்களால் பரவுகிறது. உங்கள் சுற்றுப்புறங்களை சுத்தமாக வைத்திருங்கள், நிற்கும் தண்ணீரை அகற்றுங்கள், கொசு வலைகளைப் பயன்படுத்துங்கள் மற்றும் நீண்ட சட்டைகளை அணியுங்கள்.",
                    "en-IN": "Dengue is spread by mosquitoes. Keep your surroundings clean, remove standing water, use mosquito nets, and wear long sleeves."
                }
            },
            {
                "id": "hygiene",
                "title": {
                    "hi-IN": "व्यक्तिगत स्वच्छता",
                    "bn-IN": "ব্যক্তিগত স্বাস্থ্যবিধি",
                    "mr-IN": "वैयक्तिक स्वच्छता",
                    "ta-IN": "தனிப்பட்ட சுகாதாரம்", 
                    "en-IN": "Personal Hygiene"
                },
                "content": {
                    "hi-IN": "खाने से पहले और शौचालय के बाद साबुन से हाथ धोएं। नाखून छोटे और साफ रखें। साफ पानी से रोज नहाएं।",
                    "bn-IN": "খাওয়ার আগে এবং টয়লেটের পর সাবান দিয়ে হাত ধুয়ে নিন। নখ ছোট এবং পরিষ্কার রাখুন। পরিষ্কার জল দিয়ে প্রতিদিন স্নান করুন।",
                    "mr-IN": "खाण्यापूर्वी आणि शौचालयानंतर साबणाने हात धुवा. नखे लहान आणि स्वच्छ ठेवा. स्वच्छ पाण्याने दररोज स्नान करा.",
                    "ta-IN": "சாப்பிடுவதற்கு முன் மற்றும் கழிப்பறைக்குப் பிறகு சோப்புடன் கைகளை கழுவுங்கள். நகங்களை குட்டையாகவும் சுத்தமாகவும் வைத்திருங்கள். சுத்தமான தண்ணீரில் தினசரி குளியுங்கள்.",
                    "en-IN": "Wash your hands with soap before eating and after using the toilet. Keep your nails short and clean. Bathe daily with clean water."
                }
            }
        ]
    }

@app.post("/tts/")
async def text_to_speech(request: TTSRequest):
    """
    Text-to-Speech endpoint that returns instructions for client-side Web Speech API
    """
    try:
        # Get the appropriate voice for the language
        voice_id = VOICE_MAPPINGS.get(request.language, "en-IN-Neerja")
        
        # Return instructions for client-side TTS
        return {
            "success": True,
            "message": "Use Web Speech API for TTS",
            "instructions": {
                "method": "speechSynthesis.speak()",
                "language": request.language,
                "voice_id": voice_id,
                "text": request.text
            },
            "fallback": "If Web Speech API fails, use browser's built-in TTS capabilities"
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "message": "TTS failed. Please use browser's Web Speech API."
        }

@app.post("/stt/")
async def speech_to_text(request: STTRequest):
    """
    Speech-to-Text endpoint that returns instructions for client-side Web Speech API
    """
    try:
        # Return instructions for client-side STT
        return {
            "success": True,
            "message": "Use Web Speech API for STT",
            "instructions": {
                "method": "SpeechRecognition",
                "language": request.language,
                "continuous": False,
                "interimResults": False
            },
            "fallback": "If Web Speech API fails, use browser's built-in speech recognition"
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "message": "STT failed. Please use browser's Web Speech API."
        }

@app.post("/pdf-to-audio/")
async def pdf_to_audio(file: UploadFile = File(...)):
    """
    PDF to Audio conversion endpoint
    """
    try:
        # For now, return a simple response indicating PDF processing
        return {
            "success": True,
            "message": "PDF processing initiated",
            "filename": file.filename,
            "instructions": "Use Web Speech API to read PDF content aloud"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "message": "PDF processing failed"
        }

@app.get("/supported-languages/")
async def get_supported_languages():
    """Get list of supported languages"""
    return {
        "languages": [
            {"code": "hi-IN", "name": "हिंदी", "voice": "hi-IN-Deepika"},
            {"code": "bn-IN", "name": "বাংলা", "voice": "bn-IN-Tanishaa"},
            {"code": "mr-IN", "name": "मराठी", "voice": "mr-IN-Aarohi"},
            {"code": "ta-IN", "name": "தமிழ்", "voice": "ta-IN-Pallavi"},
            {"code": "en-IN", "name": "English", "voice": "en-IN-Neerja"}
        ]
    }

@app.get("/user-progress/{user_id}")
async def get_user_progress(user_id: str):
    """Get user progress and achievements"""
    # Mock user progress data
    return {
        "user_id": user_id,
        "points": 150,
        "badges": ["First Lesson", "Health Warrior", "Quiz Master"],
        "lessons_completed": 3,
        "quizzes_taken": 5,
        "correct_answers": 4
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 