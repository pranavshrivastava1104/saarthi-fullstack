# 🚀 Saarthi - Quick Start Guide

**Get Saarthi running in 5 minutes for your hackathon demo!**

## ⚡ **Super Quick Start**

### **Step 1: Start Backend**
```bash
cd saarthi-backend
python -m uvicorn main:app --reload --port 8000
```

### **Step 2: Start Frontend**
```bash
cd saarthi-frontend
npm start
```

### **Step 3: Test & Demo**
1. Open `http://localhost:3000` in **Chrome or Edge**
2. Allow microphone access when prompted
3. Test voice features at `http://localhost:3000/test-speech.html`
4. **Demo Ready!** 🎉

## 🎯 **Hackathon Demo Script**

### **Opening (30 seconds)**
*"Saarthi is a revolutionary voice-first health education platform that bridges the digital divide. It makes health information accessible to everyone, regardless of literacy levels or language barriers."*

### **Key Demo Points (2-3 minutes)**

1. **Language Selection** (30 sec)
   - Show language dropdown with 5 Indian languages
   - Switch between Hindi, Bengali, Marathi, Tamil, English
   - *"Notice how the entire interface changes language instantly"*

2. **Voice-First Interaction** (45 sec)
   - Click speaker icon to hear content
   - Show pause/resume/stop controls
   - *"All content is voice-enabled using Web Speech API - no external dependencies"*

3. **Interactive Quiz** (45 sec)
   - Start a quiz in any language
   - Use voice to answer questions
   - Show points and badges earned
   - *"Users can interact entirely through voice, perfect for low-literacy communities"*

4. **Live Alerts** (30 sec)
   - Show real-time health notifications
   - Demonstrate multi-language alerts
   - *"Real-time health alerts in local languages keep communities informed"*

### **Closing (30 seconds)**
*"Saarthi represents the future of inclusive digital health - where technology serves everyone, not just the literate. It's ready for deployment and can immediately impact millions of lives across India."*

## 🏆 **Hackathon Winning Features to Highlight**

### **Technical Innovation**
- ✅ **Web Speech API**: Cutting-edge browser technology
- ✅ **Voice-First Design**: Revolutionary UX approach
- ✅ **Multi-Language**: 5 Indian languages supported
- ✅ **No External APIs**: Works offline once loaded

### **Social Impact**
- ✅ **Accessibility**: Works for users with limited literacy
- ✅ **Cultural Relevance**: Indian health contexts
- ✅ **Community Focus**: Rural and urban communities
- ✅ **Immediate Impact**: Ready for deployment

### **Scalability**
- ✅ **Modular Architecture**: Easy to extend
- ✅ **Cloud Ready**: Deploy anywhere
- ✅ **Open Source**: Community contributions welcome
- ✅ **Mobile Ready**: Responsive design

## 🎮 **Demo Flow**

### **1. Welcome Screen**
- Show beautiful gradient background
- Point out user points and badges
- Demonstrate language selector

### **2. Health Topics**
- Click on "Pregnancy Nutrition"
- Show voice playback controls
- Demonstrate pause/resume/stop

### **3. Interactive Quiz**
- Start quiz in Hindi or any language
- Use voice to answer: *"फल और सब्जियां"*
- Show success message and points earned

### **4. Live Alerts**
- Show real-time notifications
- Click speaker icon to hear alerts
- Demonstrate multi-language support

### **5. Gamification**
- Show points increasing
- Display achievement badges
- Highlight progress tracking

## 🔧 **Troubleshooting**

### **If Backend Won't Start**
```bash
# Check if Python is installed
python --version

# Install dependencies if needed
pip install fastapi uvicorn

# Try different port
python -m uvicorn main:app --reload --port 8001
```

### **If Frontend Won't Start**
```bash
# Check if Node.js is installed
node --version

# Install dependencies
npm install

# Try different port
npm start -- --port 3001
```

### **If Voice Features Don't Work**
1. **Use Chrome or Edge browser**
2. **Allow microphone access** when prompted
3. **Test with test-speech.html** first
4. **Check browser console** for errors

### **If Language Doesn't Change**
1. **Refresh the page** after language selection
2. **Check browser console** for errors
3. **Ensure backend is running** on port 8000

## 📱 **Browser Requirements**

### **Required for Voice Features**
- ✅ **Chrome 66+** (recommended)
- ✅ **Edge 79+** (recommended)
- ⚠️ **Safari 14.1+** (limited support)
- ⚠️ **Firefox 75+** (limited support)

### **Best Experience**
- **Chrome or Edge** browser
- **Microphone access** allowed
- **Speakers/headphones** connected
- **Stable internet** connection

## 🎯 **Hackathon Tips**

### **Before Demo**
1. **Test everything** 10 minutes before
2. **Have backup plan** if voice fails
3. **Prepare script** but be flexible
4. **Check internet** connection

### **During Demo**
1. **Start with impact** - show voice features first
2. **Keep it simple** - focus on core features
3. **Tell a story** - connect to real problems
4. **Show passion** - believe in your solution

### **After Demo**
1. **Be ready for questions** about scalability
2. **Have roadmap** for future features
3. **Show deployment** readiness
4. **Highlight social impact**

## 🚀 **Deployment Ready**

### **Backend Deployment**
- **Heroku**: Ready with Procfile
- **Railway**: Direct deployment
- **AWS/GCP**: Docker ready
- **Vercel**: Serverless functions

### **Frontend Deployment**
- **Vercel**: One-click deployment
- **Netlify**: Drag and drop
- **GitHub Pages**: Static hosting
- **AWS S3**: Static website hosting

## 📊 **Impact Metrics**

### **Social Impact**
- **100% voice-enabled** for low-literacy users
- **5 major Indian languages** supported
- **Works on any device** with browser
- **No internet required** after loading

### **Technical Innovation**
- **Voice-first design** approach
- **Web Speech API** integration
- **Multi-modal interface** (text, voice, visual)
- **Real-time processing** capabilities

### **Scalability**
- **Modular architecture** for easy extension
- **API-first design** for mobile apps
- **Cloud-ready** for global deployment
- **Community-driven** development

---

**🎉 You're ready to win your hackathon! Good luck! 🎉** 