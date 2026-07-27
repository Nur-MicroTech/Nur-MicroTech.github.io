// State Management Variables
let cheatWarnings = 0;
let isExamActive = false;
let examTimerInterval = null;
let activeQuestions = [];

// 1. Digital Library Data (Includes All Grades 1 to 12 & BCS Drives)
const bookLibrary = [
    { title: "১ম শ্রেণি - প্রাথমিক বাংলা বই", classGroup: "primary", link: "https://drive.google.com", audio: "#" },
    { title: "৫ম শ্রেণি - প্রাথমিক গণিত", classGroup: "primary", link: "https://drive.google.com", audio: "#" },
    { title: "৮ম শ্রেণি - সাধারণ বিজ্ঞান", classGroup: "jsc", link: "https://drive.google.com", audio: "#" },
    { title: "৯ম-১০ম শ্রেণি - পদার্থবিজ্ঞান", classGroup: "ssc", link: "https://drive.google.com", audio: "#" },
    { title: "৯ম-১০ম শ্রেণি - উচ্চতর গণিত", classGroup: "ssc", link: "https://drive.google.com", audio: "#" },
    { title: "এইচএসসি - রসায়ন ১ম পত্র", classGroup: "hsc", link: "https://drive.google.com", audio: "#" },
    { title: "এইচএসসি - তথ্য ও যোগাযোগ প্রযুক্তি (ICT)", classGroup: "hsc", link: "https://drive.google.com", audio: "#" },
    { title: "বিসিএস - এমপিথ্রি বাংলা সাহিত্য", classGroup: "bcs", link: "https://drive.google.com", audio: "#" },
    { title: "বিসিএস - প্রফেশনাল সাধারণ জ্ঞান ও বিজ্ঞান", classGroup: "bcs", link: "https://drive.google.com", audio: "#" }
];

// 2. Full Question Bank (BCS & Academic Questions)
const bcsQuestionBank = [
    { id: 1, question: "চর্যাপদ কোন ছন্দে লেখা?", options: ["অক্ষরবৃত্ত", "মাত্রাবৃত্ত", "স্বরবৃত্ত", "ছন্দহীন"], correct: 1 },
    { id: 2, question: "বাংলাদেশের সংবিধানের রক্ষক কে?", options: ["জাতীয় সংসদ", "হাইকোর্ট", "সুপ্রীম কোর্ট", "রাষ্ট্রপতি"], correct: 2 },
    { id: 3, question: "কোন ধাতু স্বাভাবিক তাপমাত্রায় তরল থাকে?", options: ["পারদ", "সোডিয়াম", "গ্যালিয়াম", "লিথিয়াম"], correct: 0 },
    { id: 4, question: "আমার ভাইয়ের রক্তে রাঙানো একুশে ফেব্রুয়ারি- গানটির সুরকার কে?", options: ["আবদুল গাফ্ফার চৌধুরী", "আলতাফ মাহমুদ", "আব্দুল লতিফ", "গাজী মাজহারুল আনোয়ার"], correct: 1 },
    { id: 5, question: "নিচের কোনটি কম্পিউটারের স্থায়ী মেমোরি (Permanent Memory)?", options: ["RAM", "ROM", "Cache", "Buffer"], correct: 1 },
    { id: 6, question: "কাজী নজরুল ইসলামের 'অগ্নিবীণা' কাব্যের প্রথম কবিতা কোনটি?", options: ["প্রলয়োল্লাস", "বিদ্রোহী", "ধূমকেতু", "খেয়াপারের তরণী"], correct: 0 },
    { id: 7, question: "মুক্তিযুদ্ধের সময় সমগ্র বাংলাদেশকে কয়টি সেক্টরে ভাগ করা হয়েছিল?", options: ["৯টি", "১০টি", "১১টি", "৬৪টি"], correct: 2 },
    { id: 8, question: "গ্রিনউইচ মান সময় অপেক্ষা বাংলাদেশের সময় কত ঘণ্টা এগিয়ে?", options: ["৪ ঘণ্টা", "৫ ঘণ্টা", "৬ ঘণ্টা", "৭ ঘণ্টা"], correct: 2 },
    { id: 9, question: "গাছের জীবন আছে কে আবিষ্কার করেন?", options: ["জগদীশ চন্দ্র বসু", "সত্যেন্দ্রনাথ বসু", "কাজী নজরুল", "ড. কুদরাত-এ-খুদা"], correct: 0 },
    { id: 10, question: " Which one is the correct spelling?", options: ["Lieutenent", "Lieutenant", "Leutenant", "Lietenant"], correct: 1 },
    { id: 11, question: "বাংলা ভাষায় মৌলিক স্বরধ্বনি কয়টি?", options: ["৭টি", "১১টি", "৩৯টি", "৫০টি"], correct: 0 },
    { id: 12, question: "আন্তর্জাতিক মাতৃভাষা দিবস কত তারিখে ঘোষিত হয়?", options: ["২১ ফেব্রুয়ারি ১৯৯৯", "১৭ নভেম্বর ১৯৯৯", "১৬ ডিসেম্বর ১৯৭১", "২৬ মার্চ ১৯৭১"], correct: 1 },
    { id: 13, question: "C language এর জনক কে?", options: ["ডেনিস রিচি", "বিল গেটস", "স্টিভ জবস", "মার্শাল নান"], correct: 0 },
    { id: 14, question: "বায়ুমণ্ডলে নাইট্রোজেনের পরিমাণ শতকরা কত ভাগ?", options: ["৭৮.০২%", "২০.৯৫%", "০.০৩%", "০.৯৩%"], correct: 0 },
    { id: 15, question: "সোমপুর বিহার কোথায় অবস্থিত?", options: ["পাহাড়পুর, নওগাঁ", "ময়নামতি, কুমিল্লা", "মহাস্থানগড়, বগুড়া", "সুন্দরবন"], correct: 0 },
    { id: 16, question: "মুক্তিযুদ্ধভিত্তিক উপন্যাস 'হাঙর নদী গ্রেনেড'-এর রচয়িতা কে?", options: ["সেলিনা হোসেন", "শওকত ওসমান", "হুমায়ূন আহমেদ", "জহির রায়হান"], correct: 0 },
    { id: 17, question: "কৌটিল্য কার প্রধানমন্ত্রী ছিলেন?", options: ["চন্দ্রগুপ্ত মৌর্য", "সমুদ্রগুপ্ত", "অশোক", "হর্ষবর্ধন"], correct: 0 },
    { id: 18, question: "পদ্মা সেতুর দৈর্ঘ্য কত কিলোমিটার?", options: ["৬.১৫ কিমি", "৫.৫ কিমি", "৭.২ কিমি", "৬.৮ কিমি"], correct: 0 },
    { id: 19, question: "HTML এর পূর্ণরূপ কি?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperText Marking Link", "None"], correct: 0 },
    { id: 20, question: "বিশ্ব পরিবেশ দিবস কোনটি?", options: ["৫ জুন", "৮ মার্চ", "৭ এপ্রিল", "১ মে"], correct: 0 }
];

// App Initialization
document.addEventListener("DOMContentLoaded", () => {
    initAntiCheatSystem();
    renderBooks(bookLibrary);
});

// Section Navigation Switcher
function switchSection(sectionId, event) {
    if (isExamActive && sectionId !== 'exam-engine') {
        alert("পরীক্ষা চলছে! অন্য ট্যাবে যাওয়া নিষিদ্ধ।");
        return;
    }
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(sectionId).classList.add('active');
    if(event) event.currentTarget.classList.add('active');
}

// Student Registration Logic
function handleStudentRegister(e) {
    e.preventDefault();
    const name = document.getElementById('stdName').value;
    const email = document.getElementById('stdEmail').value;
    const stdClass = document.getElementById('stdClass').value;
    
    const generatedID = "NMT-" + Math.floor(100000 + Math.random() * 900000);
    
    document.getElementById('cardName').innerText = name;
    document.getElementById('cardEmail').innerText = email;
    document.getElementById('cardClass').innerText = stdClass;
    document.getElementById('cardID').innerText = generatedID;
    document.getElementById('userDisplayName').innerText = name;
}

// Anti-Cheat Engine
function initAntiCheatSystem() {
    window.addEventListener("blur", triggerCheatWarning);
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) triggerCheatWarning();
    });
}

function triggerCheatWarning() {
    if (!isExamActive) return;
    
    cheatWarnings++;
    document.getElementById('cheatCount').innerText = cheatWarnings;
    document.getElementById('antiCheatModal').classList.remove('hidden');
    
    if (cheatWarnings >= 2) {
        closeCheatModal();
        submitExam(true);
    }
}

function closeCheatModal() {
    document.getElementById('antiCheatModal').classList.add('hidden');
}

// BCS Exam Engine Engine
function startExam(type) {
    isExamActive = true;
    cheatWarnings = 0;
    activeQuestions = bcsQuestionBank;
    
    document.getElementById('examSelectView').classList.add('hidden');
    document.getElementById('activeExamView').classList.remove('hidden');
    document.getElementById('examResultView').classList.add('hidden');
    
    renderQuestions();
    startTimer(600); // 10 Minutes
}

function renderQuestions() {
    const container = document.getElementById('quizQuestionsContainer');
    container.innerHTML = "";
    
    activeQuestions.forEach((q, index) => {
        let html = `
            <div class="question-card">
                <h4>${index + 1}. ${q.question}</h4>
                ${q.options.map((opt, optIndex) => `
                    <label class="option-item">
                        <input type="radio" name="q_${q.id}" value="${optIndex}"> ${opt}
                    </label>
                `).join('')}
            </div>
        `;
        container.innerHTML += html;
    });
}

function startTimer(seconds) {
    let timeLeft = seconds;
    examTimerInterval = setInterval(() => {
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        document.getElementById('timerText').innerText = 
            `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
        
        if (timeLeft <= 0) {
            clearInterval(examTimerInterval);
            submitExam();
        }
        timeLeft--;
    }, 1000);
}

function submitExam(forced = false) {
    clearInterval(examTimerInterval);
    isExamActive = false;
    
    let score = 0;
    activeQuestions.forEach(q => {
        const selected = document.querySelector(`input[name="q_${q.id}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) {
            score++;
        }
    });
    
    document.getElementById('activeExamView').classList.add('hidden');
    document.getElementById('examResultView').classList.remove('hidden');
    document.getElementById('userScore').innerText = score;
    document.getElementById('totalScore').innerText = activeQuestions.length;
    
    const statusText = document.getElementById('resultStatusText');
    if (forced) {
        statusText.innerText = "অ্যান্টি-চিটিং নিয়ম ভঙ্গের কারণে পরীক্ষা স্বয়ংক্রিয়ভাবে জমা নেওয়া হয়েছে!";
        statusText.style.color = "var(--danger)";
    } else {
        statusText.innerText = score >= 10 ? "অভিনন্দন! আপনি উত্তীর্ণ হয়েছেন।" : "আরেকটু ভালোভাবে প্রস্তুতি নিন।";
        statusText.style.color = "var(--success)";
    }
}

function resetExam() {
    document.getElementById('examResultView').classList.add('hidden');
    document.getElementById('examSelectView').classList.remove('hidden');
}

// Digital Library Filter Logic
function renderBooks(books) {
    const grid = document.getElementById('booksGrid');
    grid.innerHTML = "";
    books.forEach(b => {
        grid.innerHTML += `
            <div class="card">
                <i class="fa-solid fa-book-bookmark card-icon"></i>
                <h3>${b.title}</h3>
                <p>ক্যাটাগরি: ${b.classGroup.toUpperCase()}</p>
                <a href="${b.link}" target="_blank" class="btn btn-primary" style="display:inline-block; margin-top:12px; text-decoration:none;">PDF ডাউনলোড/পড়ুন</a>
            </div>
        `;
    });
}

function filterBooks() {
    const category = document.getElementById('bookClassFilter').value;
    if (category === 'all') {
        renderBooks(bookLibrary);
    } else {
        const filtered = bookLibrary.filter(b => b.classGroup === category);
        renderBooks(filtered);
    }
}

// Gemini AI Chatbot Handler
async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg) return;
    
    const chatContainer = document.getElementById('chatMessages');
    chatContainer.innerHTML += `<div class="message user">${msg}</div>`;
    input.value = "";
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: msg })
        });
        const data = await response.json();
        chatContainer.innerHTML += `<div class="message ai">${data.reply || 'উত্তর পাওয়া যায়নি।'}</div>`;
    } catch (err) {
        chatContainer.innerHTML += `<div class="message ai">এপিআই কানেকশন পাওয়া যায়নি (Vercel Backend চেক করুন)।</div>`;
    }
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function handleKeyPress(e) {
    if (e.key === 'Enter') sendChatMessage();
}

// Dynamic CV Builder Functionality
function updateCvPreview() {
    document.getElementById('pvName').innerText = document.getElementById('cvFullName').value || "আপনার নাম";
    document.getElementById('pvTitle').innerText = document.getElementById('cvTitle').value || "প্রফেশনাল টাইটেল";
    document.getElementById('pvEmail').innerText = document.getElementById('cvEmail').value || "email@example.com";
    document.getElementById('pvPhone').innerText = document.getElementById('cvPhone').value || "+8801700000000";
    document.getElementById('pvSummary').innerText = document.getElementById('cvSummary').value || "আপনার সংক্ষেপ বিবরণী এখানে রিয়েল-টাইমে প্রদর্শিত হবে।";
}

function downloadPDF() {
    const element = document.getElementById('cvPaper');
    html2pdf().from(element).save('Nur_MicroTech_Resume.pdf');
}

// Wokwi Project Loader
function loadWokwiProject(type) {
    const container = document.getElementById('wokwiContainer');
    const url = type === 'esp32' ? "https://wokwi.com/projects/new/esp32" : "https://wokwi.com/projects/new/arduino-uno";
    container.innerHTML = `<iframe src="${url}" width="100%" height="450px" style="border:none; border-radius:8px;"></iframe>`;
}
