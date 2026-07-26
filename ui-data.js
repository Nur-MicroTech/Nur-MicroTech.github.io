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

// ==========================================
// 1. AUTOMATICALLY LOAD HTML2PDF LIBRARY
// ==========================================
(function loadPdfLibrary() {
    if (!document.getElementById('html2pdf-script')) {
        const script = document.createElement('script');
        script.id = 'html2pdf-script';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        document.head.appendChild(script);
    }
})();

// ==========================================
// 2. INJECT EXACT CSS STYLES matching THE IMAGE
// ==========================================
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
        border-radius: 20px;
        border: 2px solid #2b4c7e;
        overflow: hidden;
        font-family: Arial, sans-serif;
        position: relative;
    }
    .cv-sidebar {
        width: 32%;
        background-color: #cbdcf0;
        padding: 25px 15px;
        box-sizing: border-box;
        text-align: left;
        border-bottom-right-radius: 80px;
        position: relative;
    }
    .cv-main {
        width: 68%;
        padding: 30px 20px;
        box-sizing: border-box;
        text-align: left;
    }
    .cv-photo-box {
        width: 120px;
        height: 140px;
        margin: 0 auto 15px auto;
        border: 3px solid #ffffff;
        box-shadow: 0 3px 6px rgba(0,0,0,0.2);
        position: relative;
        background: #ffffff;
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
        font-size: 13px;
        font-weight: bold;
        margin-top: 18px;
        margin-bottom: 5px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    .cv-title-main {
        color: #475569;
        font-size: 18px;
        font-weight: bold;
        border-bottom: 1.5px solid #cbd5e1;
        padding-bottom: 3px;
        margin-top: 15px;
        margin-bottom: 8px;
    }
    .cv-editable {
        outline: none;
        padding: 2px;
        border: 1px dashed transparent;
        transition: 0.2s;
    }
    .cv-editable:hover, .cv-editable:focus {
        border-color: #2563eb;
        background-color: #eff6ff;
        border-radius: 3px;
    }
    .cv-list {
        padding-left: 15px;
        margin: 3px 0;
    }
    .cv-list li {
        margin-bottom: 4px;
        font-size: 11px;
        color: #1e293b;
        line-height: 1.3;
    }
    .sig-box {
        margin-top: 15px;
        position: relative;
        display: inline-block;
    }
    .sig-img {
        width: 100px;
        height: 40px;
        object-fit: contain;
        display: block;
    }
`;
document.head.appendChild(cvStyle);

// ==========================================
// 3. GROUP DATA STRUCTURE
// ==========================================
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

// ==========================================
// 4. NAVIGATION & CONTROLLER FUNCTIONS
// ==========================================
window.openCvSubCategories = function(groupKey) {
    currentSelectedGroup = groupKey;
    const group = cvGroupsData[groupKey];
    
    if (!group) {
        alert("এই ক্যাটাগরির টেমপ্লেট শীঘ্রই আসছে!");
        return;
    }

    document.getElementById('cvCategoryGrid').style.display = 'none';
    document.getElementById('cvSubCategoryView').style.display = 'block';
    document.getElementById('selectedCategoryTitle').innerText = group.title;

    const listContainer = document.getElementById('templateListGrid');
    listContainer.innerHTML = '';

    group.templates.forEach((tpl) => {
        const card = document.createElement('div');
        card.className = 'hub-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `<span>📂</span> ${tpl.name}`;
        card.onclick = () => renderSelectedCv(tpl.render());
        listContainer.appendChild(card);
    });
};

window.backToCvCategoryGrid = function() {
    document.getElementById('cvSubCategoryView').style.display = 'none';
    document.getElementById('cvCategoryGrid').style.display = 'grid';
};

window.renderSelectedCv = function(templateHTML) {
    document.getElementById('cvSubCategoryView').style.display = 'none';
    document.getElementById('cvEditorView').style.display = 'block';
    document.getElementById('cvTemplateContainer').innerHTML = templateHTML;
};

window.backToSubCategory = function() {
    document.getElementById('cvEditorView').style.display = 'none';
    document.getElementById('cvSubCategoryView').style.display = 'block';
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

// ==========================================
// 5. EXACT REPLICA OF THE IMAGE TEMPLATE
// ==========================================
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

                <!-- SIGNATURE AND DATE SECTION -->
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
