import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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
        .then(() => { errMsg.innerText = ""; })
        .catch(() => { errMsg.innerText = "ভুল ইমেইল অথবা পাসওয়ার্ড!"; });
};

window.logoutUser = function() { signOut(auth); };

onAuthStateChanged(auth, (user) => {
    const loginBox = document.getElementById('loginBox');
    const protectedProjects = document.getElementById('protectedProjects');

    if (user) {
        loginBox.style.display = "none";
        protectedProjects.style.display = "block";
    } else {
        loginBox.style.display = "block";
        protectedProjects.style.display = "none";
        document.getElementById('p1-container').innerHTML = "";
    }
});

window.loadSecureProject = async function(projectId, containerId) {
    const container = document.getElementById(containerId);
    if (container.innerHTML.trim() !== "") return;

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
    document.getElementById(sectionId).classList.add('active');
    btn.classList.add('btn-active');
};

window.toggleProject = function(contentId, containerId, projectId, headerElem) {
    const content = document.getElementById(contentId);
    const icon = headerElem.querySelector('.icon');

    if (content.style.display === "block") {
        content.style.display = "none";
        icon.innerText = "🔽";
    } else {
        content.style.display = "block";
        icon.innerText = "🔼";
        window.loadSecureProject(projectId, containerId);
    }
};

/* ১ম থেকে ১২-শ শ্রেণীর সব বই এবং লিঙ্কসমূহ */
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

window.openStudyFolder = function(viewId) {
    document.getElementById('hubMainCategories').style.display = 'none';
    document.getElementById(viewId).style.display = 'block';

    if(viewId === 'academicView') {
        renderClassGrid();
    }
};

window.backToHubMain = function() {
    document.getElementById('academicView').style.display = 'none';
    document.getElementById('ieltsView').style.display = 'none';
    document.getElementById('islamicView').style.display = 'none';
    document.getElementById('literatureView').style.display = 'none';
    document.getElementById('classDetailView').style.display = 'none';
    document.getElementById('hubMainCategories').style.display = 'grid';
};

function renderClassGrid() {
    const grid = document.getElementById('classListGrid');
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
    document.getElementById('academicView').style.display = 'none';
    document.getElementById('classDetailView').style.display = 'block';
    document.getElementById('selectedClassTitle').innerText = `🎓 Class ${classNum} Resources`;

    const noticeBox = document.getElementById('writerNoticeBox');
    if (classNum === '11-12') {
        noticeBox.style.display = 'block';
        updateLikeDisplay();
    } else {
        noticeBox.style.display = 'none';
    }

    const booksContainer = document.getElementById('boardBooksContainer');
    booksContainer.innerHTML = '';

    const books = classBooksData[classNum] || [];
    if(books.length === 0) {
        booksContainer.innerHTML = '<li class="book-item"><span>কোনো বই পাওয়া যায়নি</span></li>';
    } else {
        books.forEach(book => {
            const isAvailable = book.link && book.link.trim() !== "";
            booksContainer.innerHTML += `
                <li class="book-item">
                    <span>📘 ${book.name}</span>
                    ${isAvailable ? 
                        `<a href="${book.link}" target="_blank">ডাউনলোড / পড়ুন</a>` : 
                        `<a href="javascript:void(0)" class="disabled-btn" onclick="alert('বইটির লিঙ্ক শীঘ্রই যুক্ত হচ্ছে!')">শীঘ্রই আসছে</a>`}
                </li>
            `;
        });
    }
};

window.backToAcademic = function() {
    document.getElementById('classDetailView').style.display = 'none';
    document.getElementById('academicView').style.display = 'block';
};

window.addLike = function() {
    let likes = parseInt(localStorage.getItem('hsc_book_likes') || '0');
    likes += 1;
    localStorage.setItem('hsc_book_likes', likes);
    updateLikeDisplay();
};

function updateLikeDisplay() {
    let likes = localStorage.getItem('hsc_book_likes') || '0';
    document.getElementById('likeCountText').innerText = likes + " Likes";
}
