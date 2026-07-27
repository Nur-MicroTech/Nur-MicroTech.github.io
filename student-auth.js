/* ============================================================
   student-auth.js
   Student Registration + Login (Roll Number ভিত্তিক) + Auto Roll Generator
   ============================================================ */

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  runTransaction,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxwXrdpLQGrrV-njkWnrdfrb5jNvOklX8",
  authDomain: "nur-microtech.firebaseapp.com",
  projectId: "nur-microtech",
  storageBucket: "nur-microtech.firebasestorage.app",
  messagingSenderId: "411818921094",
  appId: "1:411818921094:web:9822cf69b597c9d69e1507",
  measurementId: "G-Q31Y82RRH6"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const ROLL_START = 272000001;
const ROLL_DOMAIN = "student.nurmicrotech.local";

function rollToEmail(roll) {
  return `${roll}@${ROLL_DOMAIN}`;
}

async function getNextRoll() {
  const counterRef = doc(db, "meta", "rollCounter");
  const newRoll = await runTransaction(db, async (transaction) => {
    const counterSnap = await transaction.get(counterRef);
    let current = ROLL_START;
    if (counterSnap.exists()) {
      current = counterSnap.data().last + 1;
    }
    transaction.set(counterRef, { last: current }, { merge: true });
    return current;
  });
  return newRoll;
}

window.registerStudent = async function ({ name, phone, gmail, password, institution, studentClass }) {
  const errBox = document.getElementById("reg-error");
  if (errBox) errBox.innerText = "";

  try {
    if (!name || !phone || !gmail || !password) {
      throw new Error("সব প্রয়োজনীয় তথ্য পূরণ করুন।");
    }
    if (password.length < 6) {
      throw new Error("পাসওয়ার্ড কমপক্ষে ৬ ক্যারেক্টার হতে হবে।");
    }

    const roll = await getNextRoll();
    const authEmail = rollToEmail(roll);

    const cred = await createUserWithEmailAndPassword(auth, authEmail, password);

    await setDoc(doc(db, "students", cred.user.uid), {
      roll,
      name,
      phone,
      gmail,
      institution: institution || "দেওয়া হয়নি",
      studentClass: studentClass || "",
      createdAt: serverTimestamp()
    });

    return { success: true, roll };
  } catch (err) {
    let msg = "রেজিস্ট্রেশন ব্যর্থ হয়েছে।";
    if (err.code === "auth/email-already-in-use") msg = "সিস্টেম ত্রুটি — আবার চেষ্টা করুন (Roll কনফ্লিক্ট)।";
    else if (err.code === "auth/weak-password") msg = "পাসওয়ার্ড খুবই দুর্বল।";
    else if (err.message) msg = err.message;

    if (errBox) errBox.innerText = msg;
    return { success: false, error: msg };
  }
};

window.loginStudent = async function (roll, password) {
  const errBox = document.getElementById("login-error");
  if (errBox) errBox.innerText = "";

  try {
    const cleanRoll = String(roll).trim();
    if (!/^\d{9}$/.test(cleanRoll)) {
      throw new Error("সঠিক ৯ ডিজিটের রোল নম্বর দিন।");
    }
    const authEmail = rollToEmail(cleanRoll);
    await signInWithEmailAndPassword(auth, authEmail, password);
    return { success: true };
  } catch (err) {
    let msg = "রোল অথবা পাসওয়ার্ড ভুল।";
    if (err.message && err.message.includes("রোল নম্বর")) msg = err.message;
    if (errBox) errBox.innerText = msg;
    return { success: false, error: msg };
  }
};

window.logoutStudent = function () {
  signOut(auth);
};

async function loadStudentProfile(uid) {
  const snap = await getDoc(doc(db, "students", uid));
  return snap.exists() ? snap.data() : null;
}

onAuthStateChanged(auth, async (user) => {
  const authForms = document.getElementById("auth-forms-container");
  const dashboard = document.getElementById("student-dashboard");

  if (user) {
    const profile = await loadStudentProfile(user.uid);
    if (profile) {
      if (authForms) authForms.classList.add("hidden");
      if (dashboard) dashboard.classList.remove("hidden");

      const nameEl = document.getElementById("user-name");
      const idEl = document.getElementById("user-id");
      const instEl = document.getElementById("user-inst-display");
      const avatarEl = document.getElementById("user-avatar");

      if (nameEl) nameEl.innerText = profile.name;
      if (idEl) idEl.innerText = "ID: " + profile.roll;
      if (instEl) instEl.innerText = profile.institution;
      if (avatarEl) avatarEl.innerText = profile.name.charAt(0).toUpperCase();
    }
  } else {
    if (authForms) authForms.classList.remove("hidden");
    if (dashboard) dashboard.classList.add("hidden");
  }
});
