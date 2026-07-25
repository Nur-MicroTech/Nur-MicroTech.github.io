/**
 * Smart CV & Career Hub Engine (BD & Global Standard)
 * Developed for Noor Mohammad's Portfolio Hub
 */

// ৬টি প্রধান জব ক্যাটাগরি এবং প্রতিটি ক্যাটাগরির ২-৩টি করে টেমপ্লেট ডাটা
const cvCategoriesData = [
    {
        id: "cat_tech",
        title: "Engineering & IT",
        icon: "💻",
        description: "Software Engineer, EEE/IoT, Civil/Mechanical, Network Admin",
        templates: [
            { id: "tech_ats_1", name: "ATS Tech Grid (Standard)", badge: "ATS-Friendly", color: "#2563eb" },
            { id: "tech_portfolio_2", name: "Project Portfolio Focus", badge: "GitHub Integrated", color: "#0d9488" },
            { id: "tech_minimal_3", name: "Clean Developer Layout", badge: "Minimal", color: "#4f46e5" }
        ]
    },
    {
        id: "cat_corporate",
        title: "Corporate & Office Sales",
        icon: "🏢",
        description: "HR, Marketing, Accounts/Finance, Operations, Sales Executive",
        templates: [
            { id: "corp_clean_1", name: "Modern Corporate Executive", badge: "KPI Highlighted", color: "#1e293b" },
            { id: "corp_metrics_2", name: "Achievement & Sales First", badge: "High Impact", color: "#0369a1" },
            { id: "corp_classic_3", name: "Standard Office Resume", badge: "Professional", color: "#334155" }
        ]
    },
    {
        id: "cat_service",
        title: "Frontline, Retail & Service",
        icon: "🛒",
        description: "Supershop Cashier/Boy, Delivery Exec, Customer Care, Receptionist",
        templates: [
            { id: "serv_simple_1", name: "Simple High-Visibility CV", badge: "Shift & Reliability Focus", color: "#059669" },
            { id: "serv_direct_2", name: "Fast Scan Retail Format", badge: "Quick Review", color: "#d97706" }
        ]
    },
    {
        id: "cat_education",
        title: "Education & Academia",
        icon: "🎓",
        description: "School/College Teacher, University Lecturer, Academic Counselor",
        templates: [
            { id: "edu_academic_1", name: "Academic CV Format", badge: "Publications & Pedagogy", color: "#7c3aed" },
            { id: "edu_teaching_2", name: "Institutional Educator CV", badge: "Subject Mastery", color: "#2563eb" }
        ]
    },
    {
        id: "cat_bd_classic",
        title: "BD Traditional / Govt / Bank",
        icon: "🏛️",
        description: "Govt Job Application, Traditional BD Business Groups, Admin Roles",
        templates: [
            { id: "bd_classic_1", name: "BD Standard Tabular CV", badge: "Personal Info & NID Grid", color: "#15803d" },
            { id: "bd_govt_2", name: "Formal First Class Format", badge: "Full Disclosure", color: "#b91c1c" }
        ]
    },
    {
        id: "cat_creative",
        title: "Creative & Freelancing",
        icon: "🎨",
        description: "Graphic Designer, Video Editor, UI/UX, Content Creator",
        templates: [
            { id: "creative_visual_1", name: "Visual Portfolio CV", badge: "Color Accents", color: "#db2777" },
            { id: "creative_modern_2", name: "Minimalist Media Format", badge: "Behance/Dribbble Ready", color: "#9333ea" }
        ]
    }
];

// গ্লোবাল স্টেট
let currentCvState = {
    selectedCategory: null,
    selectedTemplate: null,
    formData: {
        fullName: "নুর মোহাম্মদ",
        jobTitle: "IoT & Full-Stack Web Engineer",
        email: "contact@noormohammad.dev",
        phone: "+880 1700-000000",
        address: "ঢাকা, বাংলাদেশ",
        nidOrPassport: "1998XXXXXXXXXXXXX",
        fatherName: "মোঃ আব্দুল মজিদ",
        motherName: "মোসাম্মাৎ রহিমা বেগম",
        maritalStatus: "অবিবাহিত",
        githubOrPortfolio: "github.com/noormohammad",
        summary: "উদ্ভাবনী প্রযুক্তি, IoT সিস্টেম এবং আধুনিক ওয়েব অ্যাপ্লিকেশন তৈরিতে আগ্রহী বিএসসি গ্র্যাজুয়েট প্রকৌশলী।",
        experience: "• IoT Smart Energy System (বিএসসি ফাইনাল প্রজেক্ট) - রিয়েল-টাইম ক্লাউড মনিটরিং ও মেশিন লার্নিং ব্যবহার করে বিদ্যুৎ চুরি ডিটেকশন প্রজেক্ট সম্পন্ন।\n• ওয়েব ও আইওটি ফ্রিল্যান্স ডেভেলপমেন্ট।",
        education: "• বি.এসসি ইন ইইই / সিএসই - আতিশ দীপঙ্কর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (ADUST) [২০২৬]\n• এইচ.এসসি - ঢাকা বোর্ড",
        skills: "Arduino R4 WiFi, ACS712 Sensors, Firebase, Next.js, React, Tailwind CSS, Python, C/C++"
    }
};

function initCvBuilder() {
    const root = document.getElementById("cvBuilderRoot");
    if (!root) return;
    renderCategoriesView();
}

// ১. ৬টি ক্যাটাগরি ভিউ রেন্ডার
function renderCategoriesView() {
    const root = document.getElementById("cvBuilderRoot");
    if (!root) return;

    let html = `
        <div class="grid-container">
    `;

    cvCategoriesData.forEach(cat => {
        html += `
            <div class="hub-card" onclick="window.selectCvCategory('${cat.id}')">
                <span>${cat.icon}</span>
                <div style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 5px;">${cat.title}</div>
                <div style="font-size: 12px; color: #64748b; font-weight: normal; line-height: 1.4;">${cat.description}</div>
                <div style="margin-top: 10px; font-size: 11px; background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 12px; display: inline-block; font-weight: 600;">
                    ${cat.templates.length} টি প্রস্তুত টেমপ্লেট
                </div>
            </div>
        `;
    });

    html += `</div>`;
    root.innerHTML = html;
}

// ২. ক্যাটাগরি সিলেক্ট করার পর টেমপ্লেট তালিকা
function selectCvCategory(catId) {
    const category = cvCategoriesData.find(c => c.id === catId);
    if (!category) return;

    currentCvState.selectedCategory = category;
    const root = document.getElementById("cvBuilderRoot");

    let html = `
        <button class="back-btn no-print" onclick="window.renderCategoriesView()">⬅️ ক্যাটাগরি তালিকায় ফিরে যান</button>
        <h3 style="color: #0f172a; margin-bottom: 5px;">${category.icon} ${category.title} এর টেমপ্লেটসমূহ</h3>
        <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">আপনার পছন্দসই টেমপ্লেটে ক্লিক করে তথ্য দেওয়া শুরু করুন:</p>
        
        <div class="grid-container">
    `;

    category.templates.forEach(tpl => {
        html += `
            <div class="hub-card" style="border-top: 4px solid ${tpl.color}; text-align: left;" onclick="window.openCvEditor('${tpl.id}')">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 24px; margin: 0;">📄</span>
                    <span style="background: #f1f5f9; color: #334155; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-weight: 600;">${tpl.badge}</span>
                </div>
                <h4 style="color: #0f172a; font-size: 15px; margin-bottom: 6px;">${tpl.name}</h4>
                <p style="font-size: 12px; color: #64748b;">ক্লিক করে তৈরি করুন ➡️</p>
            </div>
        `;
    });

    html += `</div>`;
    root.innerHTML = html;
}

// ৩. লাইভ সিভি এডিটর ও ফর্ম ভিউ
function openCvEditor(templateId) {
    const template = currentCvState.selectedCategory.templates.find(t => t.id === templateId);
    currentCvState.selectedTemplate = template;
    
    const root = document.getElementById("cvBuilderRoot");

    const isBdClassic = currentCvState.selectedCategory.id === "cat_bd_classic";

    let html = `
        <div class="no-print" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <button class="back-btn" style="margin:0;" onclick="window.selectCvCategory('${currentCvState.selectedCategory.id}')">⬅️ টেমপ্লেটে ফিরুন</button>
            <button onclick="window.print()" style="background-color: #16a34a; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                🖨️ ১-ক্লিকে PDF ডাউনলোড করুন
            </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 25px;">
            <!-- ইনপুট ফর্ম (বামপাশে) -->
            <div class="no-print" style="background: #f8fafc; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
                <h3 style="font-size: 16px; color: #0f172a; margin-bottom: 15px; border-bottom: 2px solid #cbd5e1; padding-bottom: 6px;">✏️ তথ্য পরিবর্তন করুন</h3>
                
                <label style="font-size: 12px; font-weight: 700; color: #475569;">পূর্ণ নাম:</label>
                <input type="text" id="cv_fullName" value="${currentCvState.formData.fullName}" oninput="window.updateCvPreview()" style="width:100%; padding:8px; margin:4px 0 12px 0; border:1px solid #cbd5e1; border-radius:6px;">

                <label style="font-size: 12px; font-weight: 700; color: #475569;">কাঙ্ক্ষিত পদ/টাইটেল:</label>
                <input type="text" id="cv_jobTitle" value="${currentCvState.formData.jobTitle}" oninput="window.updateCvPreview()" style="width:100%; padding:8px; margin:4px 0 12px 0; border:1px solid #cbd5e1; border-radius:6px;">

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div>
                        <label style="font-size: 12px; font-weight: 700; color: #475569;">ইমেইল:</label>
                        <input type="text" id="cv_email" value="${currentCvState.formData.email}" oninput="window.updateCvPreview()" style="width:100%; padding:8px; margin:4px 0 12px 0; border:1px solid #cbd5e1; border-radius:6px;">
                    </div>
                    <div>
                        <label style="font-size: 12px; font-weight: 700; color: #475569;">ফোন নম্বর:</label>
                        <input type="text" id="cv_phone" value="${currentCvState.formData.phone}" oninput="window.updateCvPreview()" style="width:100%; padding:8px; margin:4px 0 12px 0; border:1px solid #cbd5e1; border-radius:6px;">
                    </div>
                </div>

                <label style="font-size: 12px; font-weight: 700; color: #475569;">ঠিকানা:</label>
                <input type="text" id="cv_address" value="${currentCvState.formData.address}" oninput="window.updateCvPreview()" style="width:100%; padding:8px; margin:4px 0 12px 0; border:1px solid #cbd5e1; border-radius:6px;">

                ${isBdClassic ? `
                    <div style="background: #f1f5f9; padding: 10px; border-radius: 6px; margin-bottom: 12px;">
                        <label style="font-size: 12px; font-weight: 700; color: #1e293b;">পিতার নাম:</label>
                        <input type="text" id="cv_fatherName" value="${currentCvState.formData.fatherName}" oninput="window.updateCvPreview()" style="width:100%; padding:6px; margin:2px 0 8px 0; border:1px solid #cbd5e1; border-radius:4px;">

                        <label style="font-size: 12px; font-weight: 700; color: #1e293b;">মাতার নাম:</label>
                        <input type="text" id="cv_motherName" value="${currentCvState.formData.motherName}" oninput="window.updateCvPreview()" style="width:100%; padding:6px; margin:2px 0 8px 0; border:1px solid #cbd5e1; border-radius:4px;">

                        <label style="font-size: 12px; font-weight: 700; color: #1e293b;">এনআইডি / স্মার্ট কার্ড নম্বর:</label>
                        <input type="text" id="cv_nid" value="${currentCvState.formData.nidOrPassport}" oninput="window.updateCvPreview()" style="width:100%; padding:6px; margin:2px 0 0 0; border:1px solid #cbd5e1; border-radius:4px;">
                    </div>
                ` : ''}

                <label style="font-size: 12px; font-weight: 700; color: #475569;">পোর্টফোলিও / গিটহাব লিংক:</label>
                <input type="text" id="cv_github" value="${currentCvState.formData.githubOrPortfolio}" oninput="window.updateCvPreview()" style="width:100%; padding:8px; margin:4px 0 12px 0; border:1px solid #cbd5e1; border-radius:6px;">

                <label style="font-size: 12px; font-weight: 700; color: #475569;">ক্যারিয়ার অবজেক্টিভ / সামারি:</label>
                <textarea id="cv_summary" oninput="window.updateCvPreview()" style="width:100%; padding:8px; margin:4px 0 12px 0; border:1px solid #cbd5e1; border-radius:6px; height: 60px;">${currentCvState.formData.summary}</textarea>

                <label style="font-size: 12px; font-weight: 700; color: #475569;">দক্ষতা (Skills):</label>
                <input type="text" id="cv_skills" value="${currentCvState.formData.skills}" oninput="window.updateCvPreview()" style="width:100%; padding:8px; margin:4px 0 12px 0; border:1px solid #cbd5e1; border-radius:6px;">

                <label style="font-size: 12px; font-weight: 700; color: #475569;">অভিজ্ঞতা ও প্রজেক্টসমূহ:</label>
                <textarea id="cv_experience" oninput="window.updateCvPreview()" style="width:100%; padding:8px; margin:4px 0 12px 0; border:1px solid #cbd5e1; border-radius:6px; height: 80px;">${currentCvState.formData.experience}</textarea>

                <label style="font-size: 12px; font-weight: 700; color: #475569;">শিক্ষাগত যোগ্যতা (Education):</label>
                <textarea id="cv_education" oninput="window.updateCvPreview()" style="width:100%; padding:8px; margin:4px 0 12px 0; border:1px solid #cbd5e1; border-radius:6px; height: 80px;">${currentCvState.formData.education}</textarea>
            </div>

            <!-- রিয়েল-টাইম সিভি প্রিভিউ (ডানপাশে) -->
            <div style="background: white; border: 1px solid #cbd5e1; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" id="cvPreviewArea">
                <!-- ডাইনামিকভাবে রেন্ডার হবে -->
            </div>
        </div>
    `;

    root.innerHTML = html;
    updateCvPreview();
}

// ৪. রিয়েলটাইমে আপডেট প্রিভিউ
function updateCvPreview() {
    const previewArea = document.getElementById("cvPreviewArea");
    if (!previewArea) return;

    // ইনপুট ভ্যালু রিড
    const getVal = (id, fallback) => {
        const el = document.getElementById(id);
        return el ? el.value : fallback;
    };

    const name = getVal("cv_fullName", currentCvState.formData.fullName);
    const title = getVal("cv_jobTitle", currentCvState.formData.jobTitle);
    const email = getVal("cv_email", currentCvState.formData.email);
    const phone = getVal("cv_phone", currentCvState.formData.phone);
    const address = getVal("cv_address", currentCvState.formData.address);
    const github = getVal("cv_github", currentCvState.formData.githubOrPortfolio);
    const summary = getVal("cv_summary", currentCvState.formData.summary);
    const skills = getVal("cv_skills", currentCvState.formData.skills);
    const experience = getVal("cv_experience", currentCvState.formData.experience);
    const education = getVal("cv_education", currentCvState.formData.education);

    const isBdClassic = currentCvState.selectedCategory && currentCvState.selectedCategory.id === "cat_bd_classic";
    const fatherName = getVal("cv_fatherName", currentCvState.formData.fatherName);
    const motherName = getVal("cv_motherName", currentCvState.formData.motherName);
    const nid = getVal("cv_nid", currentCvState.formData.nidOrPassport);

    const accentColor = currentCvState.selectedTemplate ? currentCvState.selectedTemplate.color : "#2563eb";

    let cvHtml = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; line-height: 1.5;">
            <!-- হেডার সেকশন -->
            <div style="border-bottom: 2px solid ${accentColor}; padding-bottom: 12px; margin-bottom: 15px;">
                <h1 style="color: ${accentColor}; font-size: 24px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">${name}</h1>
                <div style="font-size: 14px; font-weight: 600; color: #475569; margin-top: 2px;">${title}</div>
                
                <div style="display: flex; gap: 12px; flex-wrap: wrap; font-size: 12px; color: #64748b; margin-top: 8px;">
                    <span>📞 ${phone}</span>
                    <span>✉️ ${email}</span>
                    <span>📍 ${address}</span>
                    ${github ? `<span>🔗 ${github}</span>` : ''}
                </div>
            </div>

            <!-- ক্যারিয়ার উদ্দেশ্য -->
            <div style="margin-bottom: 15px;">
                <h4 style="color: ${accentColor}; font-size: 13px; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 6px;">Career Objective</h4>
                <p style="font-size: 12.5px; color: #334155; margin: 0;">${summary}</p>
            </div>

            <!-- বিডি ক্লাসিক টেবিল থাকলে -->
            ${isBdClassic ? `
                <div style="margin-bottom: 15px;">
                    <h4 style="color: ${accentColor}; font-size: 13px; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 6px;">Personal Details (BD Standard)</h4>
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                        <tr><td style="padding: 3px 0; font-weight:600; width:35%;">Father's Name:</td><td>${fatherName}</td></tr>
                        <tr><td style="padding: 3px 0; font-weight:600;">Mother's Name:</td><td>${motherName}</td></tr>
                        <tr><td style="padding: 3px 0; font-weight:600;">National ID (NID):</td><td>${nid}</td></tr>
                    </table>
                </div>
            ` : ''}

            <!-- দক্ষতা -->
            <div style="margin-bottom: 15px;">
                <h4 style="color: ${accentColor}; font-size: 13px; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 6px;">Key Skills & Expertise</h4>
                <div style="font-size: 12.5px; color: #334155;">${skills}</div>
            </div>

            <!-- অভিজ্ঞতা ও প্রজেক্ট -->
            <div style="margin-bottom: 15px;">
                <h4 style="color: ${accentColor}; font-size: 13px; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 6px;">Experience & Key Projects</h4>
                <div style="font-size: 12px; color: #334155; white-space: pre-line;">${experience}</div>
            </div>

            <!-- শিক্ষা -->
            <div style="margin-bottom: 15px;">
                <h4 style="color: ${accentColor}; font-size: 13px; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 6px;">Education & Qualifications</h4>
                <div style="font-size: 12px; color: #334155; white-space: pre-line;">${education}</div>
            </div>
        </div>
    `;

    previewArea.innerHTML = cvHtml;
}

// ফাংশনগুলোকে গ্লোবাল উইন্ডোতে এক্সপোজ করা
window.initCvBuilder = initCvBuilder;
window.renderCategoriesView = renderCategoriesView;
window.selectCvCategory = selectCvCategory;
window.openCvEditor = openCvEditor;
window.updateCvPreview = updateCvPreview;

// ইনিশিয়ালাইজ করা
document.addEventListener("DOMContentLoaded", () => {
    initCvBuilder();
});
