// ১. সোশ্যাল মিডিয়া লিঙ্কসমূহ render করার জন্য
document.addEventListener("DOMContentLoaded", function () {
    const socialLinksHTML = `
        <a href="https://www.facebook.com/musafir.nurm514" target="_blank" class="btn-social btn-facebook">📘 Facebook</a>
        <a href="https://twitter.com" target="_blank" class="btn-social btn-twitter">🐦 Twitter (X)</a>
        <a href="https://www.instagram.com" target="_blank" class="btn-social btn-instagram">📸 Instagram</a>
        <a href="https://www.linkedin.com" target="_blank" class="btn-social btn-linkedin">💼 LinkedIn</a>
    `;
    const socialContainer = document.getElementById("socialLinksContainer");
    if (socialContainer) socialContainer.innerHTML = socialLinksHTML;

    // ২. শিক্ষা হাবের অতিরিক্ত কন্টেন্ট (অরিজিনাল নোটিশ + লাইক + মতামত পাঠানো)
    const studyViewsHTML = `
        <!-- একাডেমি ক্লাস তালিকা -->
        <div id="academicView" style="display: none; margin-top: 15px;">
            <button class="back-btn" onclick="backToHubMain()">🔙 মূল ক্যাটাগরিতে ফিরুন</button>
            <h3>🏫 একাডেমি ক্লাস বেছে নিন</h3>
            <div class="grid-container" id="classListGrid"></div>
        </div>

        <!-- ক্লাসের ভেতরের ডিটেইলস -->
        <div id="classDetailView" style="display: none; margin-top: 15px;">
            <button class="back-btn" onclick="backToAcademic()">🔙 ক্লাস তালিকায় ফিরুন</button>
            <h3 id="selectedClassTitle"></h3>
            
            <!-- আপনার অরিজিনাল বিশেষ বার্তা নোটিশ (সবসময় দৃশ্যমান) -->
            <div id="writerNoticeBox" class="author-notice-box" style="display: block; margin-top: 15px; background: #eff6ff; border-left: 5px solid #2563eb; padding: 15px; border-radius: 8px;">
                📢 <strong>বিশেষ বার্তা:</strong> যেসব রাইটারের বই এখানে রাখা হয়েছে, এই বিষয়ে যদি আপনাদের কোনো ব্যক্তিগত মতামত থাকে তবে দয়া করে জানাবেন। যদি আমার এই উদ্যোগটি ভালো লেগে থাকে তবে একটি লাইক দিন। আর যদি লেখক/প্রকাশক বা সংশ্লিষ্ট কারো কাছে এই বিষয়টি অসন্তোষজনক মনে হয়, তবে দয়া করে আমার সাথে যোগাযোগ করে নিষেধ করবেন, আমি সাথে সাথে বইটি সরিয়ে দেবো। এটি কোনো বাণিজ্যিক উদ্দেশ্যে নয়, সম্পূর্ণ শিক্ষার্থীদের সহায়তার উদ্দেশ্যে করা হয়েছে। ধন্যবাদ।
                
                <div class="like-container" style="margin-top: 10px; display: flex; align-items: center; gap: 10px;">
                    <button class="btn-like" onclick="addLike()" style="background: #2563eb; color: white; border: none; padding: 6px 12px; border-radius: 20px; cursor: pointer; font-weight: bold;">👍 Like</button>
                    <span id="likeCountText" style="font-weight: bold; color: #1e293b;">0 Likes</span>
                </div>

                <!-- মতামত জানানোর ফিচার -->
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

        <!-- অন্যান্য ক্যাটাগরি -->
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

    // লাইক আপডেট
    loadLikes();
});

// ৩. ড্রাইভের লিঙ্ককে অটোমেটিক /preview লিঙ্কে রূপান্তর করার ফাংশন
function fixDriveUrl(url) {
    if (url && url.includes("drive.google.com") && url.includes("/view")) {
        return url.replace("/view", "/preview");
    }
    return url;
}

// ৪. লাইক ও মতামত ফাংশনালিটি
let likesCount = parseInt(localStorage.getItem('writerNoticeLikes') || '0');

function loadLikes() {
    const text = document.getElementById('likeCountText');
    if (text) text.innerText = likesCount + " Likes";
}

window.addLike = function() {
    likesCount++;
    localStorage.setItem('writerNoticeLikes', likesCount);
    loadLikes();
};

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
// html2pdf লাইব্রেরি ডায়নামিকালি লোড করা (PDF ডাউনলোডের জন্য)
(function loadPdfLibrary() {
    if (!document.getElementById('html2pdf-script')) {
        const script = document.createElement('script');
        script.id = 'html2pdf-script';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        document.head.appendChild(script);
    }
})();

// CV CSS Styling (Dynamic Injection)
const cvStyle = document.createElement('style');
cvStyle.innerHTML = `
    .cv-page {
        width: 210mm;
        min-height: 297mm;
        background: #ffffff;
        margin: 0 auto 20px auto;
        box-shadow: 0 0 10px rgba(0,0,0,0.15);
        display: flex;
        box-sizing: border-box;
        border-radius: 12px;
        overflow: hidden;
        border: 2px solid #334155;
        font-family: 'Segoe UI', Arial, sans-serif;
    }
    .cv-sidebar {
        width: 35%;
        background-color: #c0d8f0;
        padding: 25px 15px;
        box-sizing: border-box;
        text-align: left;
    }
    .cv-main {
        width: 65%;
        padding: 30px 20px;
        box-sizing: border-box;
        text-align: left;
    }
    .cv-photo-box {
        width: 130px;
        height: 150px;
        margin: 0 auto 20px auto;
        border: 4px solid #ffffff;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        position: relative;
        background: #e2e8f0;
    }
    .cv-photo-box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .cv-photo-input {
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        opacity: 0; cursor: pointer;
    }
    .cv-title-left {
        color: #d97706;
        font-size: 14px;
        font-weight: bold;
        border-bottom: 2px solid #d97706;
        padding-bottom: 3px;
        margin-top: 20px;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
    .cv-title-main {
        color: #334155;
        font-size: 18px;
        font-weight: bold;
        border-bottom: 2px solid #cbd5e1;
        padding-bottom: 4px;
        margin-top: 15px;
        margin-bottom: 10px;
    }
    .cv-editable {
        outline: none;
        padding: 2px 4px;
        border: 1px dashed transparent;
        transition: 0.2s;
    }
    .cv-editable:hover, .cv-editable:focus {
        border-color: #2563eb;
        background-color: #eff6ff;
        border-radius: 4px;
    }
    .cv-list {
        padding-left: 18px;
        margin: 5px 0;
    }
    .cv-list li {
        margin-bottom: 5px;
        font-size: 13px;
        color: #1e293b;
    }
`;
document.head.appendChild(cvStyle);

// Group A: Engineering 2-Page CV Template
const templatesData = {
    groupA: `
        <!-- Page 1 -->
        <div class="cv-page" id="cvPage1">
            <div class="cv-sidebar">
                <div class="cv-photo-box">
                    <img id="userCvPhoto" src="https://via.placeholder.com/130x150?text=Upload+Photo" alt="Profile Photo">
                    <input type="file" class="cv-photo-input" accept="image/*" onchange="uploadCvPhoto(event)">
                </div>
                <h2 class="cv-editable" contenteditable="true" style="color: #d97706; font-size: 16px; text-align: center;">MD. REZANUZZAMAN</h2>
                
                <div class="cv-title-left">CONTACT</div>
                <p class="cv-editable" contenteditable="true" style="font-size: 12px; color: #0f172a; line-height: 1.5;">
                    <strong>Address:</strong><br>1/23, Block-B, Humayun Road, Mohammadpur, Dhaka.<br>
                    <strong>Phone:</strong><br>+8801717692592<br>
                    <strong>Email:</strong><br>nupam.ce.engr@gmail.com<br>
                    <strong>LinkedIn:</strong><br>linkedin.com/in/rezanuzzaman
                </p>

                <div class="cv-title-left">BASIC KNOWLEDGE</div>
                <p class="cv-editable" contenteditable="true" style="font-size: 12px; color: #0f172a; line-height: 1.5;">
                    Efficient in AutoCAD 2D, Microsoft Word, Excel, Access, Power Point, Adobe Photoshop, Web design, Internet & E-mail Browsing etc.
                </p>

                <div class="cv-title-left">LANGUAGE SKILLS</div>
                <ul class="cv-list cv-editable" contenteditable="true" style="font-size: 12px;">
                    <li>Excellent fluency in speaking and writing in <strong>Bengali</strong>.</li>
                    <li>Moderate fluency in speaking and writing in <strong>English</strong>.</li>
                </ul>
            </div>

            <div class="cv-main">
                <div class="cv-title-main">Current Objective</div>
                <p class="cv-editable" contenteditable="true" style="font-size: 13px; color: #334155; line-height: 1.5;">
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
                
                <div style="margin-bottom: 15px;">
                    <strong class="cv-editable" contenteditable="true" style="font-size: 14px; color: #0f172a;">Junior Executive of BoQ</strong> 
                    <span class="cv-editable" contenteditable="true" style="font-size: 12px; color: #64748b;"> – 28 August, 2020 to Continue</span><br>
                    <em class="cv-editable" contenteditable="true" style="font-size: 13px; color: #2563eb;">Credence Housing Ltd., House-15, Road-13/A, Dhanmondi, Dhaka.</em>
                    <ul class="cv-list cv-editable" contenteditable="true">
                        <li>Prepare construction project Bill of Quantities (BOQ).</li>
                        <li>Prepare construction project Material of Quantities (MOQ).</li>
                        <li>Determining project requirements, quotations.</li>
                        <li>Represent the Specification Unit and participate on committees.</li>
                        <li>Identifies and compiles quantities and specifications of materials.</li>
                        <li>Prepare land feasibility and work at ERP software.</li>
                    </ul>
                </div>

                <div>
                    <strong class="cv-editable" contenteditable="true" style="font-size: 14px; color: #0f172a;">Site Engineer</strong> 
                    <span class="cv-editable" contenteditable="true" style="font-size: 12px; color: #64748b;"> – 02 February, 2019 to 28 August, 2020</span><br>
                    <em class="cv-editable" contenteditable="true" style="font-size: 13px; color: #2563eb;">Credence Housing Ltd., House-15, Road-13/A, Dhanmondi, Dhaka.</em>
                    <ul class="cv-list cv-editable" contenteditable="true">
                        <li>Act as the assistant technical adviser on a construction site.</li>
                        <li>Overall responsible for Store of a Construction project.</li>
                        <li>Preparing site reports and maintain optimal workflow.</li>
                        <li>Work with senior Project Engineer to manage high-rise building.</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Page 2 -->
        <div class="cv-page" id="cvPage2">
            <div class="cv-sidebar">
                <div class="cv-title-left">HOBBIES</div>
                <ul class="cv-list cv-editable" contenteditable="true" style="font-size: 12px;">
                    <li>Poetry</li>
                    <li>Guitar playing</li>
                    <li>Photography</li>
                </ul>

                <div class="cv-title-left">REFERENCE</div>
                <p class="cv-editable" contenteditable="true" style="font-size: 12px; color: #0f172a; line-height: 1.5;">
                    <strong>(1) Md. Asaduzzaman</strong><br>
                    Manager, Public Relations<br>
                    Shapla Grihayan Limited.<br>
                    <strong>Mob:</strong> +8801712114948
                </p>
            </div>

            <div class="cv-main">
                <div class="cv-title-main">Education Qualification</div>
                <div class="cv-editable" contenteditable="true" style="font-size: 13px; line-height: 1.6; margin-bottom: 15px;">
                    <strong>Bachelor of Science in Civil Engineering</strong><br>
                    European University of Bangladesh (EUB) | <em>Result: Running</em>
                </div>
                <div class="cv-editable" contenteditable="true" style="font-size: 13px; line-height: 1.6; margin-bottom: 15px;">
                    <strong>Diploma-in-Civil-Engineering</strong><br>
                    Khulna Polytechnic Institute (BTEB)<br>
                    Passing Year: 2016 | <em>Result: 3.35 (Out of 4.00)</em>
                </div>
                <div class="cv-editable" contenteditable="true" style="font-size: 13px; line-height: 1.6; margin-bottom: 15px;">
                    <strong>Secondary School Certificate (SSC)</strong><br>
                    Damurhuda Pilot High School (Jessore Board)<br>
                    Group: Science | Passing Year: 2011 | <em>Result: 4.03 (Out of 5.00)</em>
                </div>

                <div class="cv-title-main">Personal Information</div>
                <table style="width: 100%; font-size: 13px; color: #1e293b; border-collapse: collapse;">
                    <tr><td style="padding: 3px 0;"><strong>Name:</strong></td><td class="cv-editable" contenteditable="true">Md. Rezanuzzaman</td></tr>
                    <tr><td style="padding: 3px 0;"><strong>Father's Name:</strong></td><td class="cv-editable" contenteditable="true">Md. Masud Billah</td></tr>
                    <tr><td style="padding: 3px 0;"><strong>Mother's Name:</strong></td><td class="cv-editable" contenteditable="true">Mst. Jasmin Ara</td></tr>
                    <tr><td style="padding: 3px 0;"><strong>Present Address:</strong></td><td class="cv-editable" contenteditable="true">1/23, Block-B, Humayun Road, Mohammadpur, Dhaka-1207</td></tr>
                    <tr><td style="padding: 3px 0;"><strong>Permanent Address:</strong></td><td class="cv-editable" contenteditable="true">Vill: Gobindapur, P.O & Upazila: Damurhuda, Zilla: Chuadanga</td></tr>
                    <tr><td style="padding: 3px 0;"><strong>Date of Birth:</strong></td><td class="cv-editable" contenteditable="true">14th January, 1995</td></tr>
                    <tr><td style="padding: 3px 0;"><strong>Religion & Nationality:</strong></td><td class="cv-editable" contenteditable="true">Islam (Sunni) | Bangladeshi</td></tr>
                    <tr><td style="padding: 3px 0;"><strong>NID No:</strong></td><td class="cv-editable" contenteditable="true">1934694390</td></tr>
                </table>

                <p class="cv-editable" contenteditable="true" style="font-size: 11px; color: #64748b; margin-top: 30px; font-style: italic;">
                    I do hereby declare that all information here is true to the best of my knowledge.
                </p>
            </div>
        </div>
    `
};

// CV নেভিগেশন ও ফটো আপলোড ফাংশন
window.openCvCategory = function(groupKey) {
    document.getElementById('cvCategoryGrid').style.display = 'none';
    document.getElementById('cvEditorView').style.display = 'block';
    
    const container = document.getElementById('cvTemplateContainer');
    if (templatesData[groupKey]) {
        container.innerHTML = templatesData[groupKey];
    } else {
        container.innerHTML = `<div style="padding: 20px; background: #fff3cd; border-radius: 8px;">
            ⚠️ এই ক্যাটাগরির টেমপ্লেটটি যুক্ত করা হচ্ছে... শীঘ্রই পাওয়া যাবে!
        </div>`;
    }
};

window.backToCvGrid = function() {
    document.getElementById('cvEditorView').style.display = 'none';
    document.getElementById('cvCategoryGrid').style.display = 'grid';
};

window.uploadCvPhoto = function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('userCvPhoto');
        if (output) output.src = reader.result;
    };
    if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
};

// PDF জেনারেট ও ডাউনলোড ফাংশন
window.downloadCV = function() {
    const element = document.getElementById('cvTemplateContainer');
    const opt = {
        margin:       0,
        filename:     'My_CV.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opt).from(element).save();
    } else {
        alert("PDF ইঞ্জিন লোড হচ্ছে, অনুগ্রহ করে কয়েক সেকেন্ড পর আবার চেষ্টা করুন!");
    }
};
