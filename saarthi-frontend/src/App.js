import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // User state
  const [userLanguage, setUserLanguage] = useState('hi-IN'); // Hindi by default
  const [userName, setUserName] = useState('Sita');
  const [userPoints, setUserPoints] = useState(150);
  const [userBadges, setUserBadges] = useState(['First Lesson', 'Health Warrior']);
  
  // App state
  const [currentSection, setCurrentSection] = useState('home');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [liveAlerts, setLiveAlerts] = useState([]);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizResult, setQuizResult] = useState('');
  const [languageContent, setLanguageContent] = useState({});
  
  // Speech synthesis and recognition
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  
  // Initialize speech APIs
  useEffect(() => {
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
    
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      // Set language based on userLanguage
      const languageMap = {
        'hi-IN': 'hi-IN',
        'bn-IN': 'bn-IN', 
        'mr-IN': 'mr-IN',
        'ta-IN': 'ta-IN',
        'en-IN': 'en-US'
      };
      
      recognition.lang = languageMap[userLanguage] || 'hi-IN';
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuizAnswer(transcript);
        checkQuizAnswer(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setQuizAnswer(languageContent.not_understood || 'Sorry, I could not understand. Please try again.');
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      setSpeechRecognition(recognition);
    }
  }, [userLanguage, languageContent.not_understood]);

  // Health content sections with language support
  const healthSections = [
    {
      id: 'pregnancy',
      title: {
        'hi-IN': 'गर्भावस्था पोषण',
        'bn-IN': 'গর্ভাবস্থার পুষ্টি',
        'mr-IN': 'गर्भावस्था पोषण',
        'ta-IN': 'கர்ப்ப கால ஊட்டச்சத்து',
        'en-IN': 'Pregnancy Nutrition'
      },
      icon: '🤱',
      content: {
        'hi-IN': 'गर्भावस्था के दौरान, बहुत सारे फल, सब्जियां और प्रोटीन खाएं। कच्ची मछली और बिना पाश्चराइज्ड दूध से बचें। दैनिक प्रसवपूर्व विटामिन लें।',
        'bn-IN': 'গর্ভাবস্থায় প্রচুর ফল, সবজি এবং প্রোটিন খান। কাঁচা মাছ এবং অপরিশোধিত দুধ এড়িয়ে চলুন। প্রতিদিন প্রসবপূর্ব ভিটামিন নিন।',
        'mr-IN': 'गर्भावस्थेदरम्यान, भरपूर फळे, भाज्या आणि प्रथिने खा. कच्चा मासा आणि अपाश्चराइज्ड दूध टाळा. दैनिक प्रसवपूर्व जीवनसत्त्वे घ्या.',
        'ta-IN': 'கர்ப்ப காலத்தில், நிறைய பழங்கள், காய்கறிகள் மற்றும் புரதங்களை உண்ணுங்கள். கச்சா மீன் மற்றும் பாஸ்சரைஸ் செய்யப்படாத பாலைத் தவிர்க்கவும். தினசரி கர்ப்ப முன் வைட்டமின்களை எடுத்துக்கொள்ளுங்கள்.',
        'en-IN': 'During pregnancy, eat plenty of fruits, vegetables, and protein. Avoid raw fish and unpasteurized milk. Take your prenatal vitamins daily.'
      },
      quiz: {
        'hi-IN': {
          question: 'कौन सा भोजन आपके बच्चे को बढ़ने में मदद करता है?',
          options: ['फल और सब्जियां', 'सिर्फ चावल', 'मिठाई और चॉकलेट'],
          correct: 0
        },
        'bn-IN': {
          question: 'কোন খাবার আপনার বাচ্চার বৃদ্ধিতে সাহায্য করে?',
          options: ['ফল এবং সবজি', 'শুধু ভাত', 'মিষ্টি এবং চকলেট'],
          correct: 0
        },
        'mr-IN': {
          question: 'कोणते अन्न तुमच्या बाळाला वाढण्यास मदत करते?',
          options: ['फळे आणि भाज्या', 'फक्त भात', 'गोड आणि चॉकलेट'],
          correct: 0
        },
        'ta-IN': {
          question: 'எந்த உணவு உங்கள் குழந்தையின் வளர்ச்சிக்கு உதவுகிறது?',
          options: ['பழங்கள் மற்றும் காய்கறிகள்', 'அரிசி மட்டும்', 'இனிப்புகள் மற்றும் சாக்லேட்'],
          correct: 0
        },
        'en-IN': {
          question: 'What food helps your baby grow?',
          options: ['Fruits and vegetables', 'Only rice', 'Sweets and chocolates'],
          correct: 0
        }
      }
    },
    {
      id: 'dengue',
      title: {
        'hi-IN': 'डेंगू रोकथाम',
        'bn-IN': 'ডেঙ্গু প্রতিরোধ',
        'mr-IN': 'डेंगू प्रतिबंध',
        'ta-IN': 'டெங்கு தடுப்பு',
        'en-IN': 'Dengue Prevention'
      },
      icon: '🦟',
      content: {
        'hi-IN': 'डेंगू मच्छरों से फैलता है। अपने आसपास को साफ रखें, खड़े पानी को हटाएं, मच्छरदानी का उपयोग करें और लंबी आस्तीन पहनें।',
        'bn-IN': 'ডেঙ্গু মশার মাধ্যমে ছড়ায়। আশপাশ পরিষ্কার রাখুন, জমে থাকা জল সরান, মশারি ব্যবহার করুন এবং লম্বা হাতা পরুন।',
        'mr-IN': 'डेंगू डासांद्वारे पसरतो. आपल्या सभोवताली स्वच्छ ठेवा, स्थिर पाणी काढून टाका, डासपल्ला वापरा आणि लांब बाही घाला.',
        'ta-IN': 'டெங்கு கொசுக்களால் பரவுகிறது. உங்கள் சுற்றுப்புறங்களை சுத்தமாக வைத்திருங்கள், நிற்கும் தண்ணீரை அகற்றுங்கள், கொசு வலைகளைப் பயன்படுத்துங்கள் மற்றும் நீண்ட சட்டைகளை அணியுங்கள்.',
        'en-IN': 'Dengue is spread by mosquitoes. Keep your surroundings clean, remove standing water, use mosquito nets, and wear long sleeves.'
      },
      quiz: {
        'hi-IN': {
          question: 'डेंगू को कैसे रोक सकते हैं?',
          options: ['ज्यादा पानी पीएं', 'खड़े पानी को हटाएं', 'हमेशा घर के अंदर रहें'],
          correct: 1
        },
        'bn-IN': {
          question: 'ডেঙ্গু কীভাবে প্রতিরোধ করা যায়?',
          options: ['অধিক জল পান করুন', 'জমে থাকা জল সরান', 'সবসময় বাড়ির ভিতরে থাকুন'],
          correct: 1
        },
        'mr-IN': {
          question: 'डेंगू कसा थांबवता येतो?',
          options: ['जास्त पाणी प्या', 'स्थिर पाणी काढून टाका', 'नेहमी घरात रहा'],
          correct: 1
        },
        'ta-IN': {
          question: 'டெங்குவை எப்படி தடுக்கலாம்?',
          options: ['அதிக தண்ணீர் குடியுங்கள்', 'நிற்கும் தண்ணீரை அகற்றுங்கள்', 'எப்போதும் வீட்டுக்குள் இருங்கள்'],
          correct: 1
        },
        'en-IN': {
          question: 'How can you prevent dengue?',
          options: ['Drink more water', 'Remove standing water', 'Stay indoors always'],
          correct: 1
        }
      }
    },
    {
      id: 'hygiene',
      title: {
        'hi-IN': 'व्यक्तिगत स्वच्छता',
        'bn-IN': 'ব্যক্তিগত স্বাস্থ্যবিধি',
        'mr-IN': 'वैयक्तिक स्वच्छता',
        'ta-IN': 'தனிப்பட்ட சுகாதாரம்',
        'en-IN': 'Personal Hygiene'
      },
      icon: '🧼',
      content: {
        'hi-IN': 'खाने से पहले और शौचालय के बाद साबुन से हाथ धोएं। नाखून छोटे और साफ रखें। साफ पानी से रोज नहाएं।',
        'bn-IN': 'খাওয়ার আগে এবং টয়লেটের পর সাবান দিয়ে হাত ধুয়ে নিন। নখ ছোট এবং পরিষ্কার রাখুন। পরিষ্কার জল দিয়ে প্রতিদিন স্নান করুন।',
        'mr-IN': 'खाण्यापूर्वी आणि शौचालयानंतर साबणाने हात धुवा. नखे लहान आणि स्वच्छ ठेवा. स्वच्छ पाण्याने दररोज स्नान करा.',
        'ta-IN': 'சாப்பிடுவதற்கு முன் மற்றும் கழிப்பறைக்குப் பிறகு சோப்புடன் கைகளை கழுவுங்கள். நகங்களை குட்டையாகவும் சுத்தமாகவும் வைத்திருங்கள். சுத்தமான தண்ணீரில் தினசரி குளியுங்கள்.',
        'en-IN': 'Wash your hands with soap before eating and after using the toilet. Keep your nails short and clean. Bathe daily with clean water.'
      },
      quiz: {
        'hi-IN': {
          question: 'हाथ कब धोने चाहिए?',
          options: ['सिर्फ सुबह में', 'खाने से पहले और शौचालय के बाद', 'सिर्फ गंदे होने पर'],
          correct: 1
        },
        'bn-IN': {
          question: 'কখন হাত ধোয়া উচিত?',
          options: ['শুধু সকালে', 'খাওয়ার আগে এবং টয়লেটের পর', 'শুধু নোংরা হলে'],
          correct: 1
        },
        'mr-IN': {
          question: 'हात कधी धुवावे?',
          options: ['फक्त सकाळी', 'खाण्यापूर्वी आणि शौचालयानंतर', 'फक्त घाणेरडे झाल्यास'],
          correct: 1
        },
        'ta-IN': {
          question: 'கைகளை எப்போது கழுவ வேண்டும்?',
          options: ['காலையில் மட்டும்', 'சாப்பிடுவதற்கு முன் மற்றும் கழிப்பறைக்குப் பிறகு', 'அழுக்காக இருக்கும்போது மட்டும்'],
          correct: 1
        },
        'en-IN': {
          question: 'When should you wash your hands?',
          options: ['Only in the morning', 'Before eating and after toilet', 'Only when dirty'],
          correct: 1
        }
      }
    }
  ];

  const languages = [
    { code: 'hi-IN', name: 'हिंदी', voice: 'hi-IN-Deepika' },
    { code: 'bn-IN', name: 'বাংলা', voice: 'bn-IN-Tanishaa' },
    { code: 'mr-IN', name: 'मराठी', voice: 'mr-IN-Aarohi' },
    { code: 'ta-IN', name: 'தமிழ்', voice: 'ta-IN-Pallavi' },
    { code: 'en-IN', name: 'English', voice: 'en-IN-Neerja' }
  ];

  // Load language content when language changes
  useEffect(() => {
    const loadLanguageContent = async () => {
      try {
        const response = await fetch(`http://localhost:8000/language-content/${userLanguage}`);
        if (response.ok) {
          const content = await response.json();
          setLanguageContent(content);
        }
      } catch (error) {
        console.error('Error loading language content:', error);
      }
    };
    
    loadLanguageContent();
  }, [userLanguage]);

  // Update speech recognition language when user language changes
  useEffect(() => {
    if (speechRecognition) {
      speechRecognition.lang = userLanguage;
    }
  }, [userLanguage, speechRecognition]);

  // Simulate live alerts with all languages
  useEffect(() => {
    const alertInterval = setInterval(() => {
      const alerts = {
        'hi-IN': [
          '⚠️ डेंगू अलर्ट: अपने क्षेत्र में खड़े पानी को हटाएं!',
          '🏥 इस रविवार को गांव केंद्र में मुफ्त स्वास्थ्य शिविर',
          '💊 अपनी दवाएं समय पर लेना न भूलें',
          '🌡️ गर्म मौसम में हाइड्रेटेड रहें'
        ],
        'bn-IN': [
          '⚠️ ডেঙ্গু সতর্কতা: আপনার এলাকায় জমে থাকা জল সরান!',
          '🏥 এই রবিবার গ্রাম কেন্দ্রে বিনামূল্যে স্বাস্থ্য শিবির',
          '💊 সময়মতো ওষুধ খেতে ভুলবেন না',
          '🌡️ গরম আবহাওয়ায় হাইড্রেটেড থাকুন'
        ],
        'mr-IN': [
          '⚠️ डेंगू सतर्कता: तुमच्या क्षेत्रातील स्थिर पाणी काढून टाका!',
          '🏥 या रविवारी गाव केंद्रात मोफत आरोग्य शिबीर',
          '💊 तुमची औषधे वेळेवर घेण्यास विसरू नका',
          '🌡️ उष्ण हवामानात हायड्रेटेड रहा'
        ],
        'ta-IN': [
          '⚠️ டெங்கு எச்சரிக்கை: உங்கள் பகுதியில் நிற்கும் தண்ணீரை அகற்றுங்கள்!',
          '🏥 இந்த ஞாயிற்றுக்கிழமை கிராம மையத்தில் இலவச சுகாதார முகாம்',
          '💊 உங்கள் மருந்துகளை சரியான நேரத்தில் எடுத்துக்கொள்ள மறக்காதீர்கள்',
          '🌡️ சூடான வானிலையில் நீரேற்றம் செய்யுங்கள்'
        ],
        'en-IN': [
          '⚠️ Dengue alert: Remove standing water in your area!',
          '🏥 Free health camp this Sunday at village center',
          '💊 Don\'t forget to take your medicines on time',
          '🌡️ Stay hydrated during hot weather'
        ]
      };
      
      const currentAlerts = alerts[userLanguage] || alerts['en-IN'];
      const randomAlert = currentAlerts[Math.floor(Math.random() * currentAlerts.length)];
      setLiveAlerts(prev => [...prev.slice(-2), { id: Date.now(), message: randomAlert, time: new Date().toLocaleTimeString() }]);
    }, 30000); // Every 30 seconds

    return () => clearInterval(alertInterval);
  }, [userLanguage]);

  // TTS function using browser's speech synthesis
  const speakText = async (text, voiceId = null) => {
    if (!text) return;
    
    setIsSpeaking(true);
    setIsPaused(false);
    
    // Use Web Speech API directly
    fallbackToWebSpeech(text);
  };
  
  const fallbackToWebSpeech = (text) => {
    if (speechSynthesis) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language based on userLanguage
      const languageMap = {
        'hi-IN': 'hi-IN',
        'bn-IN': 'bn-IN', 
        'mr-IN': 'mr-IN',
        'ta-IN': 'ta-IN',
        'en-IN': 'en-US'
      };
      
      utterance.lang = languageMap[userLanguage] || 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };
      
      utterance.onpause = () => {
        setIsPaused(true);
      };
      
      utterance.onresume = () => {
        setIsPaused(false);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        setIsSpeaking(false);
        setIsPaused(false);
      };
      
      setCurrentUtterance(utterance);
      speechSynthesis.speak(utterance);
    }
  };

  // Stop speech
  const stopSpeech = () => {
    // Stop Murf API audio if playing
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
    
    // Stop Web Speech API if speaking
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
    
    setIsSpeaking(false);
    setIsPaused(false);
  };

  // Pause/Resume speech
  const togglePauseResume = () => {
    // Handle Murf API audio
    if (currentAudio) {
      if (currentAudio.paused) {
        currentAudio.play();
      } else {
        currentAudio.pause();
      }
      return;
    }
    
    // Handle Web Speech API
    if (speechSynthesis) {
      if (speechSynthesis.speaking) {
        if (speechSynthesis.paused) {
          speechSynthesis.resume();
        } else {
          speechSynthesis.pause();
        }
      }
    }
  };

  // STT function using browser's speech recognition
  const startListening = async () => {
    setIsListening(true);
    
    // Use Web Speech API directly
    fallbackToWebSpeechRecognition();
  };
  
  const fallbackToWebSpeechRecognition = () => {
    if (speechRecognition) {
      // Update recognition language
      const languageMap = {
        'hi-IN': 'hi-IN',
        'bn-IN': 'bn-IN', 
        'mr-IN': 'mr-IN',
        'ta-IN': 'ta-IN',
        'en-IN': 'en-US'
      };
      
      speechRecognition.lang = languageMap[userLanguage] || 'hi-IN';
      speechRecognition.start();
    } else {
      setIsListening(false);
      setQuizAnswer(languageContent.not_understood || 'Sorry, I could not understand. Please try again.');
    }
  };

  // Quiz functions
  const startQuiz = (section) => {
    const quiz = section.quiz[userLanguage] || section.quiz['en-IN'];
    setQuizQuestion(quiz);
    setQuizResult('');
    speakText(quiz.question);
  };

  const checkQuizAnswer = (answer) => {
    if (quizQuestion) {
      const isCorrect = answer.toLowerCase().includes(quizQuestion.options[quizQuestion.correct].toLowerCase());
      
      if (isCorrect) {
        setUserPoints(prev => prev + 50);
        setUserBadges(prev => [...prev, 'Quiz Master']);
        const successMessage = languageContent.excellent || 'Excellent! You got it right! You earned 50 points!';
        setQuizResult(`✅ ${successMessage}`);
        speakText(successMessage);
      } else {
        const wrongMessage = (languageContent.wrong_answer || 'That\'s not quite right. The correct answer is: ') + quizQuestion.options[quizQuestion.correct];
        setQuizResult(`❌ ${wrongMessage}`);
        speakText(wrongMessage);
      }
      setQuizQuestion(null);
      setQuizAnswer('');
    }
  };

  // Welcome message
  useEffect(() => {
    if (languageContent.welcome) {
      speakText(languageContent.welcome);
    }
  }, [languageContent.welcome]);

  // Get localized content
  const getLocalizedContent = (section, field) => {
    return section[field][userLanguage] || section[field]['en-IN'] || section[field];
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <h1>🩺 Saarthi</h1>
          <p>Your Health Companion</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <span className="user-points">⭐ {userPoints} points</span>
          </div>
          <select 
            value={userLanguage} 
            onChange={(e) => setUserLanguage(e.target.value)}
            className="language-selector"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Audio Controls */}
      {(isSpeaking || isPaused) && (
        <div className="audio-controls">
          <span className="audio-status">
            {isPaused ? '⏸️ Paused' : '🔊 Speaking...'}
          </span>
          <button onClick={togglePauseResume} className="audio-control-btn">
            {isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
          <button onClick={stopSpeech} className="audio-control-btn">
            ⏹️ Stop
          </button>
        </div>
      )}

      {/* Live Alerts */}
      {liveAlerts.length > 0 && (
        <div className="live-alerts">
          {liveAlerts.map(alert => (
            <div key={alert.id} className="alert-item">
              <span className="alert-time">{alert.time}</span>
              <span className="alert-message">{alert.message}</span>
              <button onClick={() => speakText(alert.message)} className="alert-speak">🔊</button>
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main className="main-content">
        {currentSection === 'home' && (
          <div className="home-section">
            <h2>Welcome to Saarthi! 🎉</h2>
            <p>Learn about health in your own language and voice.</p>
            
            <div className="health-topics">
              <h3>Choose a Topic:</h3>
              <div className="topics-grid">
                {healthSections.map(section => (
                  <div key={section.id} className="topic-card" onClick={() => setCurrentSection(section.id)}>
                    <div className="topic-icon">{section.icon}</div>
                    <h4>{getLocalizedContent(section, 'title')}</h4>
                    <button className="topic-button">Learn More</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="user-badges">
              <h3>Your Achievements:</h3>
              <div className="badges-grid">
                {userBadges.map(badge => (
                  <span key={badge} className="badge">🏆 {badge}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {healthSections.map(section => 
          currentSection === section.id && (
            <div key={section.id} className="content-section">
              <div className="section-header">
                <button onClick={() => setCurrentSection('home')} className="back-button">← Back</button>
                <h2>{section.icon} {getLocalizedContent(section, 'title')}</h2>
              </div>
              
              <div className="content-card">
                <p>{getLocalizedContent(section, 'content')}</p>
                <div className="content-actions">
                  <button 
                    onClick={() => speakText(getLocalizedContent(section, 'content'))} 
                    className="action-button"
                    disabled={isSpeaking}
                  >
                    {isSpeaking ? '🔊 Speaking...' : '🔊 Listen to Content'}
                  </button>
                  <button onClick={() => startQuiz(section)} className="action-button quiz-button">
                    🧠 Take Quiz
                  </button>
                </div>
              </div>

              {quizQuestion && (
                <div className="quiz-section">
                  <h3>Quiz Question:</h3>
                  <p>{quizQuestion.question}</p>
                  <div className="quiz-options">
                    {quizQuestion.options.map((option, index) => (
                      <button 
                        key={index} 
                        onClick={() => checkQuizAnswer(option)}
                        className="quiz-option"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div className="voice-answer">
                    <button 
                      onClick={startListening} 
                      disabled={isListening}
                      className="voice-button"
                    >
                      {isListening ? (languageContent.listening || '🎤 Listening...') : '🎤 Answer by Voice'}
                    </button>
                    {quizAnswer && <p>Your answer: {quizAnswer}</p>}
                    {quizResult && (
                      <div className="quiz-result">
                        <p>{quizResult}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Saarthi - Empowering Health Education Through Voice Technology</p>
        <p>Powered by Murf API</p>
      </footer>
    </div>
  );
}

export default App;
