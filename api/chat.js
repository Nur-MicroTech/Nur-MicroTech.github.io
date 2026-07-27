export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'Vercel-এ GEMINI_API_KEY সেট করা হয়নি!' });
        }

        // gemini-1.5-flash ব্যবহার করা হয়েছে কোটা সমস্যা এড়াতে
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: message }]
                }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Gemini API Error details:', data);
            
            // Quota Exceeded হলে ইউজার ফ্রেন্ডলি মেসেজ
            if (data.error?.message?.includes('Quota exceeded')) {
                return res.status(429).json({ 
                    error: 'দৈনিক ফ্রি লিমিট শেষ হয়ে গেছে। অনুগ্রহ করে নতুন একটি API Key সেট করুন।' 
                });
            }

            return res.status(response.status).json({ 
                error: data.error?.message || 'Gemini API Response Error' 
            });
        }

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "কোনো উত্তর পাওয়া যায়নি।";
        return res.status(200).json({ reply });

    } catch (error) {
        console.error('Server Catch Error:', error);
        return res.status(500).json({ error: 'সার্ভারে কানেক্ট করতে সমস্যা হচ্ছে।' });
    }
}
