export default async function handler(req, res) {
    // CORS Header (GitHub Pages কে ব্যাকএন্ডের সাথে কানেক্ট করতে দেয়)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Preflight Request হ্যান্ডেল করা
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const authHeader = req.headers.authorization;
    
    // ব্যাকএন্ডে সাধারণ টোকেন ভ্যালিডেশন
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: 'অনুমতি ছাড়া প্রবেশ নিষেধ!' });
    }

    try {
        // ব্যাকএন্ডে সংরক্ষিত গোপন Wokwi লিঙ্কসমূহ
        const projects = {
            "p1": {
                name: "IoT Smart Medicine Box",
                iframeUrl: "https://wokwi.com/projects/469244889301297153/embed?no-edit=1&tab=diagram"
            }
        };

        const projectId = req.query.id || "p1";
        
        if (projects[projectId]) {
            return res.status(200).json({ 
                success: true, 
                data: projects[projectId] 
            });
        } else {
            return res.status(404).json({ success: false, error: 'প্রজেক্ট পাওয়া যায়নি' });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: 'সার্ভার সমস্যা!' });
    }
}
