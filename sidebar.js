document.addEventListener("DOMContentLoaded", function () {
    // ১. CSS ইন্জেক্ট করা
    const sidebarStyle = document.createElement("style");
    sidebarStyle.innerHTML = `
        .menu-toggle-btn {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
            cursor: pointer;
            color: white;
            background: #334155;
            padding: 8px 14px;
            border-radius: 8px;
            transition: 0.3s;
            z-index: 100;
        }
        .menu-toggle-btn:hover { background: #2563eb; }

        .custom-sidebar {
            height: 100%;
            width: 270px;
            position: fixed;
            top: 0;
            left: -270px;
            background-color: #0f172a;
            box-shadow: 4px 0 15px rgba(0,0,0,0.3);
            overflow-y: auto;
            transition: 0.3s ease-in-out;
            padding-top: 60px;
            z-index: 1000;
            text-align: left;
        }
        .custom-sidebar.open { left: 0; }

        .sidebar-close-btn {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 22px;
            color: #94a3b8;
            cursor: pointer;
        }
        .sidebar-close-btn:hover { color: white; }

        .custom-sidebar a {
            padding: 14px 25px;
            text-decoration: none;
            font-size: 15px;
            color: #cbd5e1;
            display: block;
            transition: 0.2s;
            font-weight: 500;
            border-bottom: 1px solid #1e293b;
        }
        .custom-sidebar a:hover {
            background-color: #2563eb;
            color: white;
            padding-left: 32px;
        }

        .sidebar-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
        }
        .sidebar-overlay.active { display: block; }
    `;
    document.head.appendChild(sidebarStyle);

    // ২. ৩-বার বোতাম
    const header = document.querySelector("header");
    if (header) {
        const toggleBtn = document.createElement("div");
        toggleBtn.className = "menu-toggle-btn";
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        toggleBtn.onclick = window.toggleNavSidebar;
        header.appendChild(toggleBtn);
    }

    // ৩. সাইডবার HTML
    const sidebarHTML = `
        <div id="customSidebar" class="custom-sidebar">
            <div class="sidebar-close-btn" onclick="window.toggleNavSidebar()"><i class="fa-solid fa-xmark"></i></div>
            <a href="javascript:void(0)" onclick="window.triggerSection('home')">🏠 হোম</a>
            <a href="javascript:void(0)" onclick="window.triggerSection('about')">👨‍💻 আমার সম্পর্কে</a>
            <a href="javascript:void(0)" onclick="window.triggerSection('projects')">🤖 প্রজেক্টসমূহ</a>
            <a href="javascript:void(0)" onclick="window.triggerSection('studyHub')">📚 জ্ঞান ও শিক্ষা হাব</a>
            <a href="javascript:void(0)" onclick="window.triggerSection('plans')">🚀 ভবিষ্যৎ প্ল্যান</a>
            <a href="javascript:void(0)" onclick="window.triggerSection('gallery')">📸 গ্যালারি</a>
            <a href="javascript:void(0)" onclick="window.triggerSection('contact')">📲 যোগাযোগ</a>
        </div>
        <div id="sidebarOverlay" class="sidebar-overlay" onclick="window.toggleNavSidebar()"></div>
    `;
    document.body.insertAdjacentHTML("beforeend", sidebarHTML);
});

// ৪. সাইডবার খোলা/বন্ধ করা
window.toggleNavSidebar = function () {
    const sidebar = document.getElementById("customSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (sidebar && overlay) {
        sidebar.classList.toggle("open");
        overlay.classList.toggle("active");
    }
};

// ৫. সেকশন পরিবর্তন ও কন্টেন্ট লোড
window.triggerSection = function (sectionId) {
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(sec => sec.classList.remove('active'));

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    if (sectionId === "studyHub") {
        window.closeStudyFolder();
    }

    window.toggleNavSidebar();
};

// ৬. শিক্ষা হাবের ক্যাটাগরি ড্রিল-ডাউন (একাডেমি কন্টেন্ট লোডিং ফিক্স)
window.openStudyFolder = function (folderId) {
    const mainCat = document.getElementById("hubMainCategories");
    const subViewsContainer = document.getElementById("studyHubViews");

    if (mainCat) mainCat.style.display = "none";

    let folderTitle = "বিভাগীয় রিসোর্স";
    let contentHTML = "";

    if (folderId === 'academicView') {
        folderTitle = "🏫 একাডেমি (Class 1 - 12)";
        contentHTML = `
            <ul class="book-list">
                <li class="book-item"><span>📘 ক্লাস ৯-১০ গণিত নোটস</span> <a href="#">ডাউনলোড</a></li>
                <li class="book-item"><span>📕 এইচএসসি পদার্থবিজ্ঞান গাইড</span> <a href="#">ডাউনলোড</a></li>
            </ul>
        `;
    } else if (folderId === 'ieltsView') {
        folderTitle = "🇬🇧 IELTS প্রিপারেশন";
        contentHTML = `<p>IELTS স্পিকিং ও রাইটিং ম্যাটেরিয়ালস এখানে উপলব্ধ।</p>`;
    } else if (folderId === 'islamicView') {
        folderTitle = "🕌 ইসলামিক বই";
        contentHTML = `<p>ইসলামিক বই ও বয়ান কালেকশন।</p>`;
    } else if (folderId === 'literatureView') {
        folderTitle = "📖 সাহিত্য ও অন্যান্য";
        contentHTML = `<p>উপন্যাস ও সাহিত্য গ্রন্থ।</p>`;
    }

    if (subViewsContainer) {
        subViewsContainer.innerHTML = `
            <button class="back-btn" onclick="window.closeStudyFolder()">⬅️ ফিরে যান</button>
            <div class="resource-box">
                <h4>${folderTitle}</h4>
                ${contentHTML}
            </div>
        `;
        subViewsContainer.style.display = "block";
    }
};

window.closeStudyFolder = function () {
    const mainCat = document.getElementById("hubMainCategories");
    const subViewsContainer = document.getElementById("studyHubViews");
    if (mainCat) mainCat.style.display = "grid";
    if (subViewsContainer) {
        subViewsContainer.style.display = "none";
        subViewsContainer.innerHTML = "";
    }
};
