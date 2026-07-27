import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ==========================================
// 1. FIREBASE & AUTHENTICATION CONFIG
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyAxwXrdpLQGrrV-njkWnrdfrb5jNvOklX8",
    authDomain: "nur-microtech.firebaseapp.com",
    projectId: "nur-microtech",
    storageBucket: "nur-microtech.firebasestorage.app",
    messagingSenderId: "411818921094",
    appId: "1:411818921094:web:9822cf69b597c9d69e1507",
    measurementId: "G-Q31Y82RRH6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const BACKEND_URL = "https://nur-micro-tech-github-io.vercel.app/api/get-project";

window.loginUser = function() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passInput').value;
    const errMsg = document.getElementById('errMsg');
    signInWithEmailAndPassword(auth, email, password)
        .then(() => { if (errMsg) errMsg.innerText = ""; })
        .catch(() => { if (errMsg) errMsg.innerText = "ভুল ইমেইল অথবা পাসওয়ার্ড!"; });
};

window.logoutUser = function() { signOut(auth); };

onAuthStateChanged(auth, (user) => {
    const loginBox = document.getElementById('loginBox');
    const protectedProjects = document.getElementById('protectedProjects');
    if (user) {
        if (loginBox) loginBox.style.display = "none";
        if (protectedProjects) protectedProjects.style.display = "block";
    } else {
        if (loginBox) loginBox.style.display = "block";
        if (protectedProjects) protectedProjects.style.display = "none";
        const container = document.getElementById('p1-container');
        if (container) container.innerHTML = "";
    }
});

window.loadSecureProject = async function(projectId, containerId) {
    const container = document.getElementById(containerId);
    if (!container || container.innerHTML.trim() !== "") return;
    const user = auth.currentUser;
    if (!user) return;
    container.innerHTML = "<p style='color:#2563eb; font-weight:bold;'>সার্ভার থেকে নিরাপদে ডাটা লোড হচ্ছে...</p>";
    try {
        const token = await user.getIdToken();
        const response = await fetch(`${BACKEND_URL}?id=${projectId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        if (result.success) {
            container.innerHTML = `<p>আমার তৈরি প্রথম সিকিউর সার্কিট সিমুলেশন প্রজেক্ট:</p><iframe src="${result.data.iframeUrl}"></iframe>`;
        } else {
            container.innerHTML = `<p style="color:red;">অ্যাক্সেস মেলেনি: ${result.error}</p>`;
        }
    } catch (err) {
        container.innerHTML = `<p style="color:red;">সার্ভার কানেকশনে সমস্যা হয়েছে!</p>`;
    }
};

window.showSection = function(sectionId, btn) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('btn-active'));
    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.classList.add('active');
    if (btn) btn.classList.add('btn-active');
};

window.toggleProject = function(contentId, containerId, projectId, headerElem) {
    const content = document.getElementById(contentId);
    const icon = headerElem.querySelector('.icon');
    if (content.style.display === "block") {
        content.style.display = "none";
        if (icon) icon.innerText = "🔽";
    } else {
        content.style.display = "block";
        if (icon) icon.innerText = "🔼";
        window.loadSecureProject(projectId, containerId);
    }
};

// ==========================================
// 2. ACADEMIC BOOKS DATA & STUDY HUB
// ==========================================
const classBooksData = {
    1: [
        { name: "আমার বাংলা বই", link: "https://drive.google.com/file/d/1BlBcoyyZdG_VNMoDdnpIMVilIW8WAFBF/view?usp=sharing" },
        { name: "English for Today", link: "https://drive.google.com/file/d/1Lo5a-Db4_3Q76lve6hn3qfrTCzfQoDYs/view?usp=sharing" },
        { name: "প্রাথমিক গণিত", link: "https://drive.google.com/file/d/19Hf4I1vMwfDCRrF61V8Gn7M-xLyPnuH2/view?usp=sharing" }
    ],
    2: [
        { name: "আমার বাংলা বই", link: "https://drive.google.com/file/d/1rTfp1Xja0vVpQo248CsmFa73jdj9l-Cw/view?usp=sharing" },
        { name: "English for Today", link: "https://drive.google.com/file/d/1K-efm2y7alesM1N-rLmKFESX-ZPamOzY/view?usp=sharing" },
        { name: "প্রাথমিক গণিত", link: "https://drive.google.com/file/d/1WAJds1ocCoZR4rdo42BRieV3Dgpvz-Xy/view?usp=sharing" }
    ],
    3: [
        { name: "আমার বাংলা বই", link: "https://drive.google.com/file/d/1HQvShhpaXB2dy9jhi2KShmc7Cy4NeQ_h/view?usp=sharing" },
        { name: "English for Today", link: "https://drive.google.com/file/d/1aPOc8qmuJy9WIjOFuVmuHvqhbcqTmYmS/view?usp=sharing" },
        { name: "প্রাথমিক গণিত", link: "https://drive.google.com/file/d/13Aq8yYot7bVTkjJhcMjnecJm8L9cT9Yn/view?usp=sharing" },
        { name: "প্রাথমিক বিজ্ঞান", link: "https://drive.google.com/file/d/1yQT6T4IWGJsRNkz11wVLf6a9YW1AFgGF/view?usp=sharing" },
        { name: "বাংলাদেশ ও বিশ্বপরিচয় (BGS)", link: "https://drive.google.com/file/d/1KiKpu34cp1cgFVmW5dBJLlzkcJXGp4Op/view?usp=sharing" },
        { name: "ইসলাম ও নৈতিক শিক্ষা (ধর্ম)", link: "https://drive.google.com/file/d/1eqn0qDp9E4wsswwLmTDhue3pIFxlrDTF/view?usp=sharing" }
    ],
    4: [
        { name: "আমার বাংলা বই", link: "https://drive.google.com/file/d/1KlZpvzj4_5_92ome4V0oBoU_P1jUzLof/view?usp=sharing" },
        { name: "English for Today", link: "https://drive.google.com/file/d/1lvLw6JnqqWFukGFMBaa7Tau690SLUtRk/view?usp=sharing" },
        { name: "প্রাথমিক গণিত", link: "https://drive.google.com/file/d/1vkL-b0X8NthBYavweDtyIBjl6GRha9Tz/view?usp=sharing" },
        { name: "প্রাথমিক বিজ্ঞান", link: "https://drive.google.com/file/d/1o0DpXrkjVbYkyerkUcBa-ioRu1mfX1VJ/view?usp=sharing" },
        { name: "বাংলাদেশ ও বিশ্বপরিচয় (BGS)", link: "https://drive.google.com/file/d/1oBLMU_SXjZZ8OA8dvKMSh2dioX0ednw_/view?usp=sharing" },
        { name: "ইসলাম ও নৈতিক শিক্ষা (Religion)", link: "https://drive.google.com/file/d/15_2cIyC5uGTFUY17j5bQJLBvnZT9eLNf/view?usp=sharing" }
    ],
    5: [
        { name: "আমার বাংলা বই", link: "https://drive.google.com/file/d/1aZWJ5ofGwUzke5jv2Z0JYRdv80SScbEw/view?usp=sharing" },
        { name: "English for Today", link: "https://drive.google.com/file/d/1LGsHMPGJ7CPMnxwMVdRwBRWRt15dmTFM/view?usp=sharing" },
        { name: "প্রাথমিক গণিত", link: "https://drive.google.com/file/d/1rEj786v4dHTdH1KPXd-ZnEn10MByuyP-/view?usp=sharing" },
        { name: "প্রাথমিক বিজ্ঞান", link: "https://drive.google.com/file/d/1pu4oMxE6HZurY3D-KRTW4MLDOrDpKKwC/view?usp=sharing" },
        { name: "বাংলাদেশ ও বিশ্বপরিচয় (BGS)", link: "https://drive.google.com/file/d/1T-d8a0b1PMHTXa6OHP5573vXuvzTFwee/view?usp=sharing" },
        { name: "ইসলাম ও নৈতিক শিক্ষা (Religion)", link: "https://drive.google.com/file/d/10_me063U9tNcwI5kRI853AWwTPsdQoCR/view?usp=sharing" }
    ],
    6: [
        { name: "বাংলা আনন্দপাঠ", link: "https://drive.google.com/file/d/14jvbgh3TN3xQTmgHTuw4Wnr3PuuKBd8j/view?usp=sharing" },
        { name: "বাংলা ব্যাকরণ ও নির্মিতি", link: "https://drive.google.com/file/d/1DDruTWkKbKapnqNvY8GNbnYKqttjmmR9/view?usp=sharing" },
        { name: "বাংলা চারুপাঠ", link: "https://drive.google.com/file/d/1j2MTJX3Qdy5QZJXCqPRrT9ZYQyysTQle/view?usp=sharing" },
        { name: "English for Today", link: "https://drive.google.com/file/d/1kRXsFrw7zKuYHyVQom81yYlv5ssM6Jms/view?usp=sharing" },
        { name: "English Grammar", link: "https://drive.google.com/file/d/1xAS6MkaX7N3chNP7Ri8V55T48xYMKR2y/view?usp=sharing" },
        { name: "গণিত", link: "https://drive.google.com/file/d/1xWpWJiMlFsw3P3J-jzXWrOMGD65ZxOVZ/view?usp=sharing" },
        { name: "বিজ্ঞান", link: "https://drive.google.com/file/d/11a-rtlpOxF2NiawlCMu9lL1RPThnfxgQ/view?usp=sharing" },
        { name: "গার্হস্থ্য বিজ্ঞান", link: "https://drive.google.com/file/d/1aMQdN-4zJahFhOMMx0s_R2uhv5lifEiT/view?usp=sharing" },
        { name: "বাংলাদেশ ও বিশ্বপরিচয় (BGS)", link: "https://drive.google.com/file/d/1YDt4yqapb0W0dS8Cf7QxyXdf3I2qEeB9/view?usp=sharing" },
        { name: "তথ্য ও যোগাযোগ প্রযুক্তি (ICT)", link: "https://drive.google.com/file/d/119Q8c67rpBL0iXxxCsFes_35TOO_X3tr/view?usp=sharing" },
        { name: "ইসলাম ও নৈতিক শিক্ষা", link: "https://drive.google.com/file/d/14AXR_mujPlzAEhy8MV7sOEtdtcckzLI8/view?usp=sharing" },
        { name: "কৃষি শিক্ষা", link: "https://drive.google.com/file/d/1zIQ2WDG2P4a0MAdrDCsIf3Zj7o_8tIR_/view?usp=sharing" },
        { name: "কর্ম ও জীবনমুখী শিক্ষা", link: "https://drive.google.com/file/d/1WHPa59IALGqA0D0dGAQaxgE4C5XX74-E/view?usp=sharing" },
        { name: "শারীরিক শিক্ষা ও স্বাস্থ্য", link: "https://drive.google.com/file/d/1gw-dExUhmum174wn4E4Ve_vOINTT0skv/view?usp=sharing" }
    ],
    7: [
        { name: "বাংলা আনন্দপাঠ", link: "https://drive.google.com/file/d/1ZANoS8O26D5SIJ8PftDuWMQyNiQJyfw0/view?usp=sharing" },
        { name: "বাংলা সপ্তবর্ণা", link: "https://drive.google.com/file/d/1hiyvbcr_g9H9J4-FHjyOiwlKajqxon_r/view?usp=sharing" },
        { name: "বাংলা ব্যাকরণ ও নির্মিতি", link: "https://drive.google.com/file/d/14TteP9mLClVetMZP2nUxeOGfvq6r0tDW/view?usp=sharing" },
        { name: "English for Today", link: "https://drive.google.com/file/d/1EeR_jc5mFyQcoTMrq_19f3wuR1xTCmYU/view?usp=sharing" },
        { name: "English Grammar", link: "https://drive.google.com/file/d/14ZhaoXMmtdxqBz5FzbgxcFAyfEzD78ss/view?usp=sharing" },
        { name: "গণিত", link: "https://drive.google.com/file/d/1YsGY0glsjK2OM9q6x_yJm3uThmO9lHwH/view?usp=sharing" },
        { name: "বিজ্ঞান", link: "https://drive.google.com/file/d/1IoDTeTPU2g_3yoOFUGvg35o4Dj0FncrW/view?usp=sharing" },
        { name: "বাংলাদেশ ও বিশ্বপরিচয় (BGS)", link: "https://drive.google.com/file/d/1hLCY2mv-zmjhwQWqtdiC9j1LBgyVX97m/view?usp=sharing" },
        { name: "তথ্য ও যোগাযোগ প্রযুক্তি (ICT)", link: "https://drive.google.com/file/d/1024u47BAL2TaX2nBug8jxDfLQgTPCiEA/view?usp=sharing" },
        { name: "কৃষি শিক্ষা", link: "https://drive.google.com/file/d/1vBg-xoJmseU7p7f8T1nfl4hXCWD2OilL/view?usp=sharing" },
        { name: "ইসলাম ও নৈতিক শিক্ষা", link: "https://drive.google.com/file/d/12M96UXW4gPNsuewOQpQUvK7rBm9u7TMj/view?usp=sharing" }
    ],
    8: [
        { name: "বাংলা আনন্দপাঠ", link: "https://drive.google.com/file/d/1zyKHky-GuFlrhHnZTpJ54h_4NLG0Johh/view?usp=sharing" },
        { name: "বাংলা সাহিত্য কণিকা", link: "https://drive.google.com/file/d/1QDNdE6LJB-n6qU7Y5hV_cACrtQ9jzB-V/view?usp=sharing" },
        { name: "বাংলা ব্যাকরণ ও নির্মিতি", link: "https://drive.google.com/file/d/16pktB40s09ZXI1TeXfTYAB2rOMfc5SSE/view?usp=sharing" },
        { name: "English for Today", link: "https://drive.google.com/file/d/1tJHhgS20BcHdLJuJeQ3JgotnQ_CO1YdS/view?usp=sharing" },
        { name: "English Grammar", link: "https://drive.google.com/file/d/1YmB-F6fD5VHkEqLlsh54WvnMk3UX5Ddh/view?usp=sharing" },
        { name: "গণিত", link: "https://drive.google.com/file/d/1xugkiY_lKCYlt-YhSYJniHXo6ni2tOgx/view?usp=sharing" },
        { name: "বিজ্ঞান", link: "https://drive.google.com/file/d/1GIfoOTNp58IByEdPjVPhXs3BcGn8cuIs/view?usp=sharing" },
        { name: "বাংলাদেশ ও বিশ্বপরিচয় (BGS)", link: "https://drive.google.com/file/d/1XYMyiATugT7piNrnzJzuRZ1Mp-caedqW/view?usp=sharing" },
        { name: "তথ্য ও যোগাযোগ প্রযুক্তি (ICT)", link: "https://drive.google.com/file/d/1lPPff0v8-Ca8ulIkC5bK7nSq1GT5XKI8/view?usp=sharing" },
        { name: "ইসলাম ও নৈতিক শিক্ষা", link: "https://drive.google.com/file/d/1sldGoN_VCDjT-jyJ_NgLQKNnKhIoEuZc/view?usp=sharing" },
        { name: "কৃষি শিক্ষা", link: "https://drive.google.com/file/d/10xdzsmoWdsXojNKXgwxT2zBnCDCJcpRW/view?usp=sharing" }
    ],
    "9-10": [
        { name: "বাংলা ১ম পত্র (মাধ্যমিক বাংলা সাহিত্য)", link: "https://drive.google.com/file/d/1eyBNQNnP0jftgFjwCjqWy18SXkvKSVSq/view?usp=sharing" },
        { name: "বাংলা ১ম পত্র (সহপাঠ)", link: "https://drive.google.com/file/d/1x0KUCvrzK1ttFh5LbzDVYGpATa3_hyxz/view?usp=sharing" },
        { name: "বাংলা ২য় পত্র (ব্যাকরণ ও নির্মিতি)", link: "https://drive.google.com/file/d/1BixEfhk9Msxn4nl_2C3Ci2QmRFQYbqCw/view?usp=sharing" },
        { name: "English 1st Paper (English for Today)", link: "https://drive.google.com/file/d/1vEkgiFiTOhUbkiQJs31NnpJiDDmWporR/view?usp=sharing" },
        { name: "English 2nd Paper (Grammar & Composition)", link: "https://drive.google.com/file/d/16pzd04Jq0As8q7FPay3nS_9EaZU6Fu37/view?usp=sharing" },
        { name: "সাধারণ গণিত (General Math)", link: "https://drive.google.com/file/d/1ys13mcajGTqahF6355HkoIxvc0MGUbWr/view?usp=sharing" },
        { name: "সাধারণ বিজ্ঞান (General Science)", link: "https://drive.google.com/file/d/1KHGA4FRM7Iij4nTNHBSTPrM-uMcq3Q6_/view?usp=sharing" },
        { name: "তথ্য ও যোগাযোগ প্রযুক্তি (ICT)", link: "https://drive.google.com/file/d/1PMRFrwFy8Z15ZCPpPjpJQ-TFmyo1A2pG/view?usp=sharing" },
        { name: "বাংলাদেশ ও বিশ্বপরিচয় (BGS)", link: "https://drive.google.com/file/d/1mUQ-Ge6Exjgx1Dyq_sGZx7CRFebwXJie/view?usp=sharing" },
        { name: "পদার্থবিজ্ঞান (Physics)", link: "https://drive.google.com/file/d/1dHBi26ayw-rTXMfAX-NpXLObKCZ8fDYT/view?usp=sharing" },
        { name: "রসায়ন (Chemistry)", link: "https://drive.google.com/file/d/1qJAs0J4Ns0M7fYFA4u1E-Mx3uQTSqSCW/view?usp=sharing" },
        { name: "জীববিজ্ঞান (Biology)", link: "https://drive.google.com/file/d/1bvFWH4yJZQFMkfwH8Jah94Yd_F0rcQ4P/view?usp=sharing" },
        { name: "উচ্চতর গণিত (Higher Math)", link: "https://drive.google.com/file/d/1ZtfguyqMjxyb0SUjXVAAmPIokd8bFOhZ/view?usp=sharing" },
        { name: "হিসাববিজ্ঞান (Accounting)", link: "https://drive.google.com/file/d/1KldHEF2WQjxXTtF3GMjVVWcvmzvxoKN4/view?usp=sharing" },
        { name: "ব্যবসায় উদ্যোগ (Business Ent.)", link: "https://drive.google.com/file/d/1vPTB4B5zTZjAhRF2FIfiGTwow3imBMw2/view?usp=sharing" },
        { name: "ফিন্যান্স ও ব্যাংকিং (Finance & Banking)", link: "https://drive.google.com/file/d/1T0MdFHpBQnk_JY08RSmrUMbYWk70oy-E/view?usp=sharing" },
        { name: "ভূগোল ও পরিবেশ (Geography)", link: "https://drive.google.com/file/d/1hhOAJOC7EMn5AvNcUb6byo_aWVn65lfE/view?usp=sharing" },
        { name: "বাংলাদেশের ইতিহাস ও বিশ্বসভ্যতা", link: "https://drive.google.com/file/d/1Q19zbmV_rDEBYxDF392yQ8vMX6GpEawN/view?usp=sharing" },
        { name: "কৃষি শিক্ষা (Agriculture)", link: "https://drive.google.com/file/d/1oFKjDZQreZi2UPujaK1kTKCXMwKABvYi/view?usp=sharing" },
        { name: "অর্থনীতি (Economics)", link: "https://drive.google.com/file/d/1N7cv9iubLTnqN-gG-kf7rG0ogjOTDCGM/view?usp=sharing" },
        { name: "পৌরনীতি ও নাগরিকতা (Civics)", link: "https://drive.google.com/file/d/1EFpS4r7EKWnsjtU8TnJJ_Jp0rdKlO58b/view?usp=sharing" },
        { name: "ইসলাম ও নৈতিক শিক্ষা (Religion)", link: "https://drive.google.com/file/d/1K4ZWKR8GLpdVkdutdMXUfdt9mEuRgW-5/view?usp=sharing" }
    ],
    "11-12": [
        { name: "বাংলা ১ম পত্র (সাহিত্যপাঠ)", link: "https://drive.google.com/file/d/1bXOUmKQ275dSoIBA-A0eKwqe8yjlvJWI/view?usp=sharing" },
        { name: "বাংলা ১ম পত্র (সহপাঠ)", link: "https://drive.google.com/file/d/1d00LxIWIHGTNhsh9HEGvEwBK8r2bHFfr/view?usp=sharing" },
        { name: "English 1st Paper (English For Today)", link: "https://drive.google.com/file/d/11ixyyycw6cyotqGHemvlwTzfrD1E4hky/view?usp=sharing" },
        { name: "ICT (পার্ট - ১)", link: "https://drive.google.com/file/d/1Ufd4HCCuaENzCMlsn4XS4eMfytzye_oN/view?usp=sharing" },
        { name: "ICT (পার্ট - ২)", link: "https://drive.google.com/file/d/1SQEwosbBcU4Hcpn9OlHUMU9iVo2sfBZQ/view?usp=sharing" },
        { name: "ICT (পার্ট - ৩)", link: "https://drive.google.com/file/d/1AHk6LZuVV9geGSsYSadCtRSjo0hIo5-W/view?usp=sharing" },
        { name: "পদার্থবিজ্ঞান ১ম পত্র (পার্ট - ১)", link: "https://drive.google.com/file/d/1Cf19HnZQUR1i536ws_ho3kpW52Ilm10J/view?usp=sharing" },
        { name: "পদার্থবিজ্ঞান ১ম পত্র (পার্ট - ২)", link: "https://drive.google.com/file/d/1YZy7pUh7QdJ2pYtRMeMWu3YeKeD2WzhO/view?usp=sharing" },
        { name: "পদার্থবিজ্ঞান ১ম পত্র (পার্ট - ৩)", link: "https://drive.google.com/file/d/1GpUwTWbFe2S5eQCF3HJuZHGDdtXREqma/view?usp=sharing" },
        { name: "পদার্থবিজ্ঞান ২য় পত্র", link: "https://drive.google.com/file/d/18R6JEBPoOiLnpUVlXmjE8KNcLuuOVQNh/view?usp=sharing" },
        { name: "রসায়ন ১ম পত্র", link: "https://drive.google.com/file/d/1FDQ8EKFCKdMfJJuRf4-pgsVjU4Dc02hz/view?usp=sharing" },
        { name: "রসায়ন ২য় পত্র", link: "https://drive.google.com/file/d/1_kpC2Dck6uo522RanEisLM6-5ZRpP7_R/view?usp=sharing" },
        { name: "জীববিজ্ঞান ১ম পত্র (পার্ট - ১)", link: "https://drive.google.com/file/d/1XNV41CIYxDooF0Kz1j31aWSKxjMcQGlV/view?usp=sharing" },
        { name: "জীববিজ্ঞান ১ম পত্র (পার্ট - ২)", link: "https://drive.google.com/file/d/1zMk7c4V2fdzzMUx8_kAYhGIp-s062cU1/view?usp=sharing" },
        { name: "জীববিজ্ঞান ২য় পত্র (পার্ট - ১)", link: "https://drive.google.com/file/d/1ko1TcVJNw_xSul6XfbzS2OBX_A2ncP7m/view?usp=sharing" },
        { name: "জীববিজ্ঞান ২য় পত্র (পার্ট - ২)", link: "https://drive.google.com/file/d/1AvMyijjvNkNVMqXEqJTWuNe517TI5Cwv/view?usp=sharing" },
        { name: "উচ্চতর গণিত ১ম পত্র", link: "https://drive.google.com/file/d/1cGra3AnL11joZqHTPrTsiZpY2_l_s1os/view?usp=sharing" },
        { name: "উচ্চতর গণিত ২য় পত্র", link: "https://drive.google.com/file/d/1KCbyp3LxQOgXE7iiOjYhcXyrHPRYxNq7/view?usp=sharing" },
        { name: "বাংলা ২য় পত্র (ব্যাকরণ ও নির্মিতি)", link: "" },
        { name: "English 2nd Paper (Grammar & Composition)", link: "" },
        { name: "হিসাববিজ্ঞান ১ম পত্র", link: "" },
        { name: "হিসাববিজ্ঞান ২য় পত্র", link: "" },
        { name: "ব্যবসায় সংগঠন ও ব্যবস্থাপনা ১ম পত্র", link: "" },
        { name: "ব্যবসায় সংগঠন ও ব্যবস্থাপনা ২য় পত্র", link: "" },
        { name: "উৎপাদন ব্যবস্থাপনা ও বিপণন ১ম পত্র", link: "" },
        { name: "উৎপাদন ব্যবস্থাপনা ও বিপণন ২য় পত্র", link: "" },
        { name: "ফিন্যান্স, ব্যাংকিং ও বীমা ১ম পত্র", link: "" },
        { name: "ফিন্যান্স, ব্যাংকিং ও বীমা ২য় পত্র", link: "" },
        { name: "পৌরনীতি ও সুশাসন ১ম পত্র", link: "" },
        { name: "পৌরনীতি ও সুশাসন ২য় পত্র", link: "" },
        { name: "অর্থনীতি ১ম পত্র", link: "" },
        { name: "অর্থনীতি ২য় পত্র", link: "" },
        { name: "ইতিহাস", link: "" },
        { name: "ইসলামের ইতিহাস ও সংস্কৃতি ১ম পত্র", link: "" },
        { name: "ইসলামের ইতিহাস ও সংস্কৃতি ২য় পত্র", link: "" },
        { name: "সমাজবিজ্ঞান", link: "" },
        { name: "সমাজকর্ম ১ম পত্র", link: "" },
        { name: "সমাজকর্ম ২য় পত্র", link: "" },
        { name: "যুক্তিবিদ্যা ১ম পত্র", link: "" },
        { name: "যুক্তিবিদ্যা ২য় পত্র", link: "" },
        { name: "ভূগোল ১ম পত্র", link: "" },
        { name: "ভূগোল ২য় পত্র", link: "" },
        { name: "ইসলাম শিক্ষা", link: "" },
        { name: "মনোবিজ্ঞান", link: "" },
        { name: "কৃষি শিক্ষা", link: "" },
        { name: "গার্হস্থ্য বিজ্ঞান / গৃহ ব্যবস্থাপনা", link: "" },
        { name: "পরিসংখ্যান", link: "" }
    ]
};

window.fixDriveUrl = function(url) {
    if (url && url.includes("drive.google.com") && url.includes("/view")) {
        return url.replace("/view", "/preview");
    }
    return url;
};

window.openStudyFolder = function(viewId) {
    const hub = document.getElementById('hubMainCategories');
    if (hub) hub.style.display = 'none';
    const target = document.getElementById(viewId);
    if (target) target.style.display = 'block';
    if(viewId === 'academicView') {
        renderClassGrid();
    }
};

window.backToHubMain = function() {
    ['academicView', 'ieltsView', 'islamicView', 'literatureView', 'classDetailView'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    const hub = document.getElementById('hubMainCategories');
    if (hub) hub.style.display = 'grid';
};

function renderClassGrid() {
    const grid = document.getElementById('classListGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    for(let i = 1; i <= 8; i++) {
        grid.innerHTML += `
            <div class="hub-card" onclick="openClassDetail('${i}')">
                <span>🎓</span> Class ${i}
            </div>
        `;
    }
    grid.innerHTML += `
        <div class="hub-card" onclick="openClassDetail('9-10')">
            <span>🎓</span> Class 9-10
        </div>
        <div class="hub-card" onclick="openClassDetail('11-12')">
            <span>🎓</span> Class 11-12
        </div>
    `;
}

window.openClassDetail = function(classNum) {
    const academicView = document.getElementById('academicView');
    const classDetailView = document.getElementById('classDetailView');
    if (academicView) academicView.style.display = 'none';
    if (classDetailView) classDetailView.style.display = 'block';
    const title = document.getElementById('selectedClassTitle');
    if (title) title.innerText = `🎓 Class ${classNum} Resources`;
    const noticeBox = document.getElementById('writerNoticeBox');
    if (noticeBox) {
        noticeBox.style.display = (classNum === '11-12') ? 'block' : 'none';
        updateLikeDisplay();
    }
    const booksContainer = document.getElementById('boardBooksContainer');
    if (booksContainer) {
        booksContainer.innerHTML = '';
        const books = classBooksData[classNum] || [];
        if(books.length === 0) {
            booksContainer.innerHTML = '<li class="book-item"><span>কোনো বই পাওয়া যায়নি</span></li>';
        } else {
            books.forEach(book => {
                const isAvailable = book.link && book.link.trim() !== "";
                const finalLink = fixDriveUrl(book.link);
                booksContainer.innerHTML += `
                    <li class="book-item">
                        <span>📘 ${book.name}</span>
                        ${isAvailable ? 
                            `<a href="${finalLink}" target="_blank">ডাউনলোড / পড়ুন</a>` : 
                            `<a href="javascript:void(0)" class="disabled-btn" onclick="alert('বইটির লিঙ্ক শীঘ্রই যুক্ত হচ্ছে!')">শীঘ্রই আসছে</a>`}
                    </li>
                `;
            });
        }
    }
};

window.backToAcademic = function() {
    const classDetailView = document.getElementById('classDetailView');
    const academicView = document.getElementById('academicView');
    if (classDetailView) classDetailView.style.display = 'none';
    if (academicView) academicView.style.display = 'block';
};

// ==========================================
// 3. UI INITIALIZATION & SIDEBAR ENGINE
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    // Dynamic Sidebar Styles Inject
    const sidebarStyle = document.createElement("style");
    sidebarStyle.innerHTML = `
        .menu-toggle-btn {
            position: absolute; left: 20px; top: 50%; transform: translateY(-50%);
            font-size: 20px; cursor: pointer; color: white; background: #334155;
            padding: 8px 14px; border-radius: 8px; transition: 0.3s; z-index: 100;
        }
        .menu-toggle-btn:hover { background: #2563eb; }
        .custom-sidebar {
            height: 100%; width: 270px; position: fixed; top: 0; left: -270px;
            background-color: #0f172a; box-shadow: 4px 0 15px rgba(0,0,0,0.3);
            overflow-y: auto; transition: 0.3s ease-in-out; padding-top: 60px;
            z-index: 1000; text-align: left;
        }
        .custom-sidebar.open { left: 0; }
        .sidebar-close-btn { position: absolute; top: 15px; right: 20px; font-size: 22px; color: #94a3b8; cursor: pointer; }
        .sidebar-close-btn:hover { color: white; }
        .custom-sidebar a {
            padding: 14px 25px; text-decoration: none; font-size: 15px; color: #cbd5e1;
            display: block; transition: 0.2s; font-weight: 500; border-bottom: 1px solid #1e293b;
        }
        .custom-sidebar a:hover { background-color: #2563eb; color: white; padding-left: 32px; }
        .sidebar-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 999; }
        .sidebar-overlay.active { display: block; }
    `;
    document.head.appendChild(sidebarStyle);

    // Inject Toggle Button Into Header
    const header = document.querySelector("header");
    if (header) {
        const toggleBtn = document.createElement("div");
        toggleBtn.className = "menu-toggle-btn";
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        toggleBtn.onclick = window.toggleNavSidebar;
        header.appendChild(toggleBtn);
    }

    // Inject Sidebar HTML
    const sidebarHTML = `
        <div id="customSidebar" class="custom-sidebar">
            <div class="sidebar-close-btn" onclick="window.toggleNavSidebar()"><i class="fa-solid fa-xmark"></i></div>
            <a href="javascript:void(0)" onclick="window.triggerNav('home')">🏠 হোম</a>
            <a href="javascript:void(0)" onclick="window.triggerNav('about')">👨‍💻 আমার সম্পর্কে</a>
            <a href="javascript:void(0)" onclick="window.triggerNav('projects')">🤖 প্রজেক্টসমূহ</a>
            <a href="javascript:void(0)" onclick="window.triggerNav('studyHub')">📚 জ্ঞান ও শিক্ষা হাব</a>
            <a href="javascript:void(0)" onclick="window.triggerNav('plans')">🚀 ভবিষ্যৎ প্ল্যান</a>
            <a href="javascript:void(0)" onclick="window.triggerNav('gallery')">📸 গ্যালারি</a>
            <a href="javascript:void(0)" onclick="window.triggerNav('contact')">📲 যোগাযোগ</a>
            <a href="javascript:void(0)" onclick="showSection('cvBuilder')">📄 CV Builder</a>
        </div>
        <div id="sidebarOverlay" class="sidebar-overlay" onclick="window.toggleNavSidebar()"></div>
    `;
    document.body.insertAdjacentHTML("beforeend", sidebarHTML);

    // Inject Social Links
    const socialLinksHTML = `
        <a href="https://www.facebook.com/musafir.nurm514" target="_blank" class="btn-social btn-facebook">📘 Facebook</a>
        <a href="https://twitter.com" target="_blank" class="btn-social btn-twitter">🐦 Twitter (X)</a>
        <a href="https://www.instagram.com" target="_blank" class="btn-social btn-instagram">📸 Instagram</a>
        <a href="https://www.linkedin.com" target="_blank" class="btn-social btn-linkedin">💼 LinkedIn</a>
    `;
    const socialContainer = document.getElementById("socialLinksContainer");
    if (socialContainer) socialContainer.innerHTML = socialLinksHTML;

    // Inject Study Hub Dynamic Views
    const studyViewsHTML = `
        <div id="academicView" style="display: none; margin-top: 15px;">
            <button class="back-btn" onclick="backToHubMain()">🔙 মূল ক্যাটাগরিতে ফিরুন</button>
            <h3>🏫 একাডেমি ক্লাস বেছে নিন</h3>
            <div class="grid-container" id="classListGrid"></div>
        </div>
        <div id="classDetailView" style="display: none; margin-top: 15px;">
            <button class="back-btn" onclick="backToAcademic()">🔙 ক্লাস তালিকায় ফিরুন</button>
            <h3 id="selectedClassTitle"></h3>
            <div id="writerNoticeBox" class="author-notice-box" style="display: block; margin-top: 15px; background: #eff6ff; border-left: 5px solid #2563eb; padding: 15px; border-radius: 8px;">
                📢 <strong>বিশেষ বার্তা:</strong> যেসব রাইটারের বই এখানে রাখা হয়েছে, এই বিষয়ে যদি আপনাদের কোনো ব্যক্তিগত মতামত থাকে তবে দয়া করে জানাবেন। যদি আমার এই উদ্যোগটি ভালো লেগে থাকে তবে একটি লাইক দিন। আর যদি লেখক/প্রকাশক বা সংশ্লিষ্ট কারো কাছে এই বিষয়টি অসন্তোষজনক মনে হয়, তবে দয়া করে আমার সাথে যোগাযোগ করে নিষেধ করবেন, আমি সাথে সাথে বইটি সরিয়ে দেবো। এটি কোনো বাণিজ্যিক উদ্দেশ্যে নয়, সম্পূর্ণ শিক্ষার্থীদের সহায়তার উদ্দেশ্যে করা হয়েছে। ধন্যবাদ।
                <div class="like-container" style="margin-top: 10px; display: flex; align-items: center; gap: 10px;">
                    <button class="btn-like" onclick="addLike()" style="background: #2563eb; color: white; border: none; padding: 6px 12px; border-radius: 20px; cursor: pointer; font-weight: bold;">👍 Like</button>
                    <span id="likeCountText" style="font-weight: bold; color: #1e293b;">0 Likes</span>
                </div>
                <div class="feedback-area-box" style="margin-top: 15px; padding-top: 10px; border-top: 1px dashed #bfdbfe;">
                    <strong>💬 আপনার মন্তব্য বা অনুরোধ লিখুন:</strong>
                    <textarea id="userFeedback" class="feedback-area" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; margin-top: 8px; font-size: 13px;" placeholder="বই বা রাইটার সম্পর্কে মতামত লিখুন..."></textarea>
                    <button class="btn-feedback" onclick="submitFeedback()" style="background-color: #0284c7; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; margin-top: 6px; cursor: pointer;">মতামত পাঠান</button>
                    <div id="feedbackSuccess" style="color: #16a34a; font-size: 13px; font-weight: bold; margin-top: 5px; display: none;">আপনার মতামত জমা নেওয়া হয়েছে! ধন্যবাদ।</div>
                </div>
            </div>
            <div class="resource-box" style="margin-top: 15px;">
                <h4>📄 বোর্ড ও রেফারেন্স বই</h4>
                <ul class="book-list" id="boardBooksContainer"></ul>
            </div>
            <div class="resource-box" style="margin-top: 15px;">
                <h4>📖 গাইড ও নোটস (Guide Books & Notes)</h4>
                <p>অধ্যায়ভিত্তিক গাইড ও হ্যান্ডনোটস শীঘ্রই আপলোড করা হবে...</p>
            </div>
            <div class="resource-box" style="margin-top: 15px;">
                <h4>🎥 ভিডিও ক্লাসেস (Class Records)</h4>
                <p>অধ্যায়ভিত্তিক ক্লাস ভিডিও রেকর্ডস খুব শীঘ্রই যুক্ত হবে...</p>
            </div>
        </div>
        <div id="ieltsView" style="display: none; margin-top: 15px;">
            <button class="back-btn" onclick="backToHubMain()">🔙 মূল ক্যাটাগরিতে ফিরুন</button>
            <h3>🇬🇧 IELTS Preparation Hub</h3>
            <div class="resource-box">
                <h4>📚 Cambridge Books & Materials</h4>
                <p>পিডিএফ বই ও লিসেনিং অডিও ফাইলসমূহ...</p>
            </div>
        </div>
        <div id="islamicView" style="display: none; margin-top: 15px;">
            <button class="back-btn" onclick="backToHubMain()">🔙 মূল ক্যাটাগরিতে ফিরুন</button>
            <h3>🕌 ইসলামিক বই ও তাফসীর</h3>
            <div class="resource-box">
                <h4>📖 তাফসীর ও হাদিস গ্রন্থ</h4>
                <p>সংগৃহীত ইসলামিক পিডিএফ বইসমূহ...</p>
            </div>
        </div>
        <div id="literatureView" style="display: none; margin-top: 15px;">
            <button class="back-btn" onclick="backToHubMain()">🔙 মূল ক্যাটাগরিতে ফিরুন</button>
            <h3>📖 সাহিত্য ও অন্যান্য উপন্যাস</h3>
            <div class="resource-box">
                <h4>🖋️ গল্প ও সাহিত্য সম্ভার</h4>
                <p>দেশি-বিদেশি বিখ্যাত উপন্যাস ও কবিতার বই...</p>
            </div>
        </div>
    `;
    const studyContainer = document.getElementById("studyHubViews");
    if (studyContainer) studyContainer.innerHTML = studyViewsHTML;
    updateLikeDisplay();
});

window.toggleNavSidebar = function () {
    const sidebar = document.getElementById("customSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (sidebar && overlay) {
        sidebar.classList.toggle("open");
        overlay.classList.toggle("active");
    }
};

window.triggerNav = function (sectionId) {
    const navButtons = document.querySelectorAll("header nav button");
    let clicked = false;
    navButtons.forEach(btn => {
        const attr = btn.getAttribute("onclick");
        if (attr && attr.includes(sectionId)) {
            btn.click();
            clicked = true;
        }
    });
    if (!clicked && typeof window.showSection === "function") {
        window.showSection(sectionId);
    }
    window.toggleNavSidebar();
};

// LocalStorage Likes & Feedback Handler
window.addLike = function() {
    let likes = parseInt(localStorage.getItem('writerNoticeLikes') || '0');
    likes += 1;
    localStorage.setItem('writerNoticeLikes', likes);
    updateLikeDisplay();
};

function updateLikeDisplay() {
    let likes = localStorage.getItem('writerNoticeLikes') || '0';
    const text = document.getElementById('likeCountText');
    if (text) text.innerText = likes + " Likes";
}

window.submitFeedback = function() {
    const input = document.getElementById("userFeedback");
    const msg = document.getElementById("feedbackSuccess");
    if (input && input.value.trim() !== "") {
        let feedbacks = JSON.parse(localStorage.getItem("siteFeedbacks") || "[]");
        feedbacks.push(input.value);
        localStorage.setItem("siteFeedbacks", JSON.stringify(feedbacks));
        input.value = "";
        if (msg) {
            msg.style.display = "block";
            setTimeout(() => { msg.style.display = "none"; }, 3000);
        }
    }
};

// Dynamic HTML2PDF Library Loader
(function loadPdfLibrary() {
    if (!document.getElementById('html2pdf-script')) {
        const script = document.createElement('script');
        script.id = 'html2pdf-script';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        document.head.appendChild(script);
    }
})();

// ==========================================
// 4. CV BUILDER ENGINE & TEMPLATES
// ==========================================
const cvStyle = document.createElement('style');
cvStyle.innerHTML = `
    .cv-page {
        width: 210mm; min-height: 297mm; background: #ffffff; margin: 0 auto 20px auto;
        box-shadow: 0 0 10px rgba(0,0,0,0.15); display: flex; box-sizing: border-box;
        border-radius: 20px; border: 2px solid #2b4c7e; overflow: hidden;
        font-family: Arial, sans-serif; position: relative;
    }
    .cv-sidebar { width: 32%; background-color: #cbdcf0; padding: 25px 15px; box-sizing: border-box; text-align: left; border-bottom-right-radius: 80px; position: relative; }
    .cv-main { width: 68%; padding: 30px 20px; box-sizing: border-box; text-align: left; }
    .cv-photo-box { width: 120px; height: 140px; margin: 0 auto 15px auto; border: 3px solid #ffffff; box-shadow: 0 3px 6px rgba(0,0,0,0.2); position: relative; background: #ffffff; }
    .cv-photo-box img { width: 100%; height: 100%; object-fit: cover; }
    .cv-photo-input { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
    .cv-title-left { color: #d97706; font-size: 13px; font-weight: bold; margin-top: 18px; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; }
    .cv-title-main { color: #475569; font-size: 18px; font-weight: bold; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 3px; margin-top: 15px; margin-bottom: 8px; }
    .cv-editable { outline: none; padding: 2px; border: 1px dashed transparent; transition: 0.2s; }
    .cv-editable:hover, .cv-editable:focus { border-color: #2563eb; background-color: #eff6ff; border-radius: 3px; }
    .cv-list { padding-left: 15px; margin: 3px 0; }
    .cv-list li { margin-bottom: 4px; font-size: 11px; color: #1e293b; line-height: 1.3; }
    .sig-box { margin-top: 15px; position: relative; display: inline-block; }
    .sig-img { width: 100px; height: 40px; object-fit: contain; display: block; }
`;
document.head.appendChild(cvStyle);

const cvGroupsData = {
    groupA: {
        title: "Group A: Engineering & Tech",
        templates: [
            { id: "groupA_tp1", name: "📄 Template-1 (2-Page Exact Replica)", render: () => getGroupATemplate1() },
            { id: "groupA_tp2", name: "📄 Template-2 (Modern Single-Page)", render: () => getGroupATemplate2() },
            { id: "groupA_tp3", name: "📄 Template-3 (Compact Technical)", render: () => getGroupATemplate3() }
        ]
    }
};

let currentSelectedGroup = '';

window.openCvSubCategories = function(groupKey) {
    currentSelectedGroup = groupKey;
    const group = cvGroupsData[groupKey];
    if (!group) {
        alert("এই ক্যাটাগরির টেমপ্লেট শীঘ্রই আসছে!");
        return;
    }
    const catGrid = document.getElementById('cvCategoryGrid');
    const subCatView = document.getElementById('cvSubCategoryView');
    if (catGrid) catGrid.style.display = 'none';
    if (subCatView) subCatView.style.display = 'block';
    const titleElem = document.getElementById('selectedCategoryTitle');
    if (titleElem) titleElem.innerText = group.title;
    const listContainer = document.getElementById('templateListGrid');
    if (listContainer) {
        listContainer.innerHTML = '';
        group.templates.forEach((tpl) => {
            const card = document.createElement('div');
            card.className = 'hub-card';
            card.style.cursor = 'pointer';
            card.innerHTML = `<span>📂</span> ${tpl.name}`;
            card.onclick = () => window.renderSelectedCv(tpl.render());
            listContainer.appendChild(card);
        });
    }
};

window.backToCvCategoryGrid = function() {
    const subCatView = document.getElementById('cvSubCategoryView');
    const catGrid = document.getElementById('cvCategoryGrid');
    if (subCatView) subCatView.style.display = 'none';
    if (catGrid) catGrid.style.display = 'grid';
};

window.renderSelectedCv = function(templateHTML) {
    const subCatView = document.getElementById('cvSubCategoryView');
    const editorView = document.getElementById('cvEditorView');
    const container = document.getElementById('cvTemplateContainer');
    if (subCatView) subCatView.style.display = 'none';
    if (editorView) editorView.style.display = 'block';
    if (container) container.innerHTML = templateHTML;
};

window.backToSubCategory = function() {
    const editorView = document.getElementById('cvEditorView');
    const subCatView = document.getElementById('cvSubCategoryView');
    if (editorView) editorView.style.display = 'none';
    if (subCatView) subCatView.style.display = 'block';
};

window.uploadCvPhoto = function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('userCvPhoto');
        if (output) output.src = reader.result;
    };
    if (event.target.files && event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
};

window.uploadSignature = function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('userSignatureImg');
        if (output) output.src = reader.result;
    };
    if (event.target.files && event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
};

window.downloadCV = function() {
    const element = document.getElementById('cvTemplateContainer');
    const opt = {
        margin: 0,
        filename: 'MD_REZANUZZAMAN_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opt).from(element).save();
    } else {
        alert("PDF ইঞ্জিন লোড হচ্ছে, কিছু মুহূর্ত পর আবার ট্রাই করুন!");
    }
};

function getGroupATemplate1() {
    return `
        <!-- PAGE 1 -->
        <div class="cv-page" id="cvPage1">
            <div class="cv-sidebar">
                <div class="cv-photo-box">
                    <img id="userCvPhoto" src="https://via.placeholder.com/120x140?text=Photo" alt="Profile Photo">
                    <input type="file" class="cv-photo-input" accept="image/*" onchange="uploadCvPhoto(event)">
                </div>
                
                <h3 class="cv-editable" contenteditable="true" style="color: #d97706; font-size: 13px; text-align: center; margin-bottom: 15px; font-weight: bold;">MD. REZANUZZAMAN</h3>
                
                <div class="cv-title-left">CONTACT</div>
                <p class="cv-editable" contenteditable="true" style="font-size: 11px; color: #0f172a; line-height: 1.4;">
                    <strong>Address:</strong><br>
                    1/23, Block-B, Humayun Road,<br>Mohammadpur, Dhaka.<br>
                    <strong>Phone:</strong><br>
                    +8801711092592<br>
                    <strong>Email:</strong><br>
                    <span style="color: #2563eb; text-decoration: underline;">rapon.engr@gmail.com</span><br>
                    <strong>LinkedIn:</strong><br>
                    <span style="color: #2563eb; font-size: 10px;">https://www.linkedin.com/in/rezanuzzaman-rapon-224780191</span>
                </p>
                <div class="cv-title-left">BASIC KNOWLEDGE</div>
                <p class="cv-editable" contenteditable="true" style="font-size: 11px; color: #0f172a; line-height: 1.4;">
                    Efficient in AutoCAD 2D, Microsoft Word, Excel, Access, Power Point, Adobe Photoshop, Web design, Internet & Email Browsing etc.
                </p>
                <div class="cv-title-left">LANGUAGE SKILLS</div>
                <p class="cv-editable" contenteditable="true" style="font-size: 11px; color: #0f172a; line-height: 1.4;">
                    Excellent fluence in speaking and writing in <strong>Bengali</strong>.<br><br>
                    Moderate fluence in speaking and writing in <strong>English</strong>.
                </p>
            </div>
            <div class="cv-main">
                <div class="cv-title-main">Current Objective</div>
                <p class="cv-editable" contenteditable="true" style="font-size: 11px; color: #334155; line-height: 1.4;">
                    Achieving a dynamic and challenging job where I can use my technical and interpersonal skills, creativity and above all my learning experiences in order to develop my career as well as to contribute in the welfare of the organization.
                </p>
                <div class="cv-title-main">Skill Highlights</div>
                <div style="display: flex; justify-content: space-between;">
                    <ul class="cv-list cv-editable" contenteditable="true" style="width: 48%;">
                        <li>Project Management</li>
                        <li>Strong decision maker</li>
                        <li>Estimation</li>
                    </ul>
                    <ul class="cv-list cv-editable" contenteditable="true" style="width: 48%;">
                        <li>Store Management</li>
                        <li>BoQ (Bill of Quantity)</li>
                        <li>Team working and communication</li>
                    </ul>
                </div>
                <div class="cv-title-main">Experience</div>
                
                <div style="margin-bottom: 12px;">
                    <strong class="cv-editable" contenteditable="true" style="font-size: 12px; color: #0f172a;">Junior Executive of BoQ</strong> 
                    <span class="cv-editable" contenteditable="true" style="font-size: 11px; color: #475569;">– 28 August, 2020 to Continue</span><br>
                    <strong class="cv-editable" contenteditable="true" style="font-size: 11px; color: #0f172a;">Credence Housing Ltd.</strong>, <span class="cv-editable" contenteditable="true" style="font-size: 11px; color: #475569;">House-15, Road-13/A, Dhanmondi, Dhaka.</span>
                    <ul class="cv-list cv-editable" contenteditable="true">
                        <li>Prepare construction project Bill of Quantities (BOQ).</li>
                        <li>Prepare construction project Material of Quantities (MOQ).</li>
                        <li>Determining project requirements, quotations.</li>
                        <li>Represent the Specification Unit and participate on committees related to specification document development.</li>
                        <li>Identifies and compiles from contract documents all quantities and specifications of materials required for the project.</li>
                        <li>Prepare land feasibility.</li>
                        <li>Work at ERP software.</li>
                    </ul>
                </div>
                <div>
                    <strong class="cv-editable" contenteditable="true" style="font-size: 12px; color: #0f172a;">Site Engineer</strong> 
                    <span class="cv-editable" contenteditable="true" style="font-size: 11px; color: #475569;">– 02 February, 2019 to 28 August, 2020</span><br>
                    <strong class="cv-editable" contenteditable="true" style="font-size: 11px; color: #0f172a;">Credence Housing Ltd.</strong>, <span class="cv-editable" contenteditable="true" style="font-size: 11px; color: #475569;">House-15, Road-13/A, Dhanmondi, Dhaka.</span>
                    <ul class="cv-list cv-editable" contenteditable="true">
                        <li>Act as the assistant technical adviser on a construction site for subcontractors, craftspeople and operatives.</li>
                        <li>Overall responsible for Store of a Construction project including general store, accessories, raw materials, etc.</li>
                        <li>Preparing site reports and filling in other paperwork and maintain optimal workflow.</li>
                        <li>Work with senior Project Engineer to manage high-rise and Fair-face building.</li>
                        <li>Carry out quality assurance tests to discover errors and optimize usability.</li>
                        <li>Work at ERP software.</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- PAGE 2 -->
        <div class="cv-page" id="cvPage2">
            <div class="cv-sidebar">
                <div class="cv-title-left">HOBBIES</div>
                <p class="cv-editable" contenteditable="true" style="font-size: 11px; color: #0f172a; line-height: 1.5;">
                    Poetry<br>Guitar playing<br>Photography
                </p>
                <div class="cv-title-left">REFERANCE</div>
                <p class="cv-editable" contenteditable="true" style="font-size: 11px; color: #0f172a; line-height: 1.4;">
                    <strong>(1) Md. Asaduzzaman</strong><br>
                    Manager, Public Relations<br>
                    Shoyok grihayan limited.<br>
                    <strong>Mob:</strong> +8801712114940
                </p>
            </div>
            <div class="cv-main">
                <div class="cv-title-main">Education Qualification</div>
                <table style="width: 100%; font-size: 11px; color: #1e293b; border-collapse: collapse; margin-bottom: 15px;">
                    <tr><td style="width: 30%; padding: 2px 0;">Name of degree</td><td>: <strong class="cv-editable" contenteditable="true">Bachelor of Science in Civil Engineering.</strong></td></tr>
                    <tr><td style="padding: 2px 0;">Name of institute</td><td>: <span class="cv-editable" contenteditable="true">European University of Bangladesh (EUB)</span></td></tr>
                    <tr><td style="padding: 2px 0;">Result</td><td>: <span class="cv-editable" contenteditable="true">Running</span></td></tr>
                </table>
                <table style="width: 100%; font-size: 11px; color: #1e293b; border-collapse: collapse; margin-bottom: 15px;">
                    <tr><td style="width: 30%; padding: 2px 0;">Name of degree</td><td>: <strong class="cv-editable" contenteditable="true">Diploma-in-Civil-Engineering.</strong></td></tr>
                    <tr><td style="padding: 2px 0;">Name of institute</td><td>: <span class="cv-editable" contenteditable="true">Khulna Polytechnic Institute.</span></td></tr>
                    <tr><td style="padding: 2px 0;">Name of Board</td><td>: <span class="cv-editable" contenteditable="true">Bangladesh Technical Education Board, Dhaka.</span></td></tr>
                    <tr><td style="padding: 2px 0;">Passing Year</td><td>: <span class="cv-editable" contenteditable="true">2016.</span></td></tr>
                    <tr><td style="padding: 2px 0;">Result</td><td>: <span class="cv-editable" contenteditable="true">3.35 (Out of 4.00)</span></td></tr>
                </table>
                <table style="width: 100%; font-size: 11px; color: #1e293b; border-collapse: collapse; margin-bottom: 15px;">
                    <tr><td style="width: 30%; padding: 2px 0;">Name of degree</td><td>: <strong class="cv-editable" contenteditable="true">Secondary School Certificate</strong></td></tr>
                    <tr><td style="padding: 2px 0;">Name of institute</td><td>: <span class="cv-editable" contenteditable="true">Dumuria Pilot High School.</span></td></tr>
                    <tr><td style="padding: 2px 0;">Status of Board</td><td>: <span class="cv-editable" contenteditable="true">Jessore Board.</span></td></tr>
                    <tr><td style="padding: 2px 0;">Group</td><td>: <span class="cv-editable" contenteditable="true">Science</span></td></tr>
                    <tr><td style="padding: 2px 0;">Passing Year</td><td>: <span class="cv-editable" contenteditable="true">2011.</span></td></tr>
                    <tr><td style="padding: 2px 0;">Result</td><td>: <span class="cv-editable" contenteditable="true">4.03 (Out of 5.00)</span></td></tr>
                </table>
                <div class="cv-title-main">Personal Information</div>
                <table style="width: 100%; font-size: 11px; color: #1e293b; border-collapse: collapse;">
                    <tr><td style="width: 30%; padding: 2px 0;">Name</td><td>: <span class="cv-editable" contenteditable="true">Md. Rezanuzzaman.</span></td></tr>
                    <tr><td style="padding: 2px 0;">Father's Name</td><td>: <span class="cv-editable" contenteditable="true">Md. Masud Fillah.</span></td></tr>
                    <tr><td style="padding: 2px 0;">Mother's Name</td><td>: <span class="cv-editable" contenteditable="true">Mst. Jasmin Ara.</span></td></tr>
                    <tr><td style="padding: 2px 0;">Present Address</td><td>: <span class="cv-editable" contenteditable="true">1/23, Block-B, Humayun Road,<br>Mohammadpur, Dhaka- 1207.</span></td></tr>
                    <tr><td style="padding: 2px 0;">Permanent Address</td><td>: <span class="cv-editable" contenteditable="true">Village- Gobindapur, P.O- Dumuria, Upazila- Dumuria, Zilla- Khulna.</span></td></tr>
                    <tr><td style="padding: 2px 0;">Date of Birth</td><td>: <span class="cv-editable" contenteditable="true">14th January, 1995.</span></td></tr>
                    <tr><td style="padding: 2px 0;">Nationality</td><td>: <span class="cv-editable" contenteditable="true">Bangladeshi (By Birth).</span></td></tr>
                    <tr><td style="padding: 2px 0;">Religion</td><td>: <span class="cv-editable" contenteditable="true">Islam (Sunni).</span></td></tr>
                    <tr><td style="padding: 2px 0;">Marital Status</td><td>: <span class="cv-editable" contenteditable="true">Unmarried.</span></td></tr>
                    <tr><td style="padding: 2px 0;">Blood Group</td><td>: <span class="cv-editable" contenteditable="true">A (+)</span></td></tr>
                    <tr><td style="padding: 2px 0;">NID No.</td><td>: <span class="cv-editable" contenteditable="true">1934094390</span></td></tr>
                    <tr><td style="padding: 2px 0;">Passport No.</td><td>: <span class="cv-editable" contenteditable="true">BY0988847</span></td></tr>
                </table>
                <p class="cv-editable" contenteditable="true" style="font-size: 10px; color: #475569; margin-top: 25px; font-style: italic; line-height: 1.3;">
                    I do hereby that all information here is true of my knowledge. If required and where applicable this document can be supported by appropriate authentic certificates.
                </p>
                <div style="margin-top: 15px;">
                    <div class="sig-box">
                        <img id="userSignatureImg" class="sig-img" src="https://via.placeholder.com/100x40?text=Sign+Here" alt="Signature">
                        <input type="file" class="cv-photo-input" accept="image/*" onchange="uploadSignature(event)" title="Click to upload signature">
                    </div>
                    <div style="border-top: 1px solid #0f172a; width: 120px; font-weight: bold; font-size: 11px; padding-top: 2px;">
                        <u>Signature</u>
                    </div>
                    <div style="font-size: 11px; margin-top: 3px;">
                        Date: <span class="cv-editable" contenteditable="true">____________</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getGroupATemplate2() {
    return `<div class="cv-page"><div class="cv-main" style="width:100%;"><h2>Template-2 (ডিজাইন যুক্ত করা হচ্ছে...)</h2></div></div>`;
}

function getGroupATemplate3() {
    return `<div class="cv-page"><div class="cv-main" style="width:100%;"><h2>Template-3 (ডিজাইন যুক্ত করা হচ্ছে...)</h2></div></div>`;
}
