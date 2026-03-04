export const serviceData = {
    "ai-customer-service": {
        id: "ai-customer-service",
        slugEn: "ai-customer-service",
        slugId: "ai-customer-service",
        titleKey: "srv1Title",
        descriptionKey: "srv1Desc",
        fullDescription: "Automate your client interactions with intelligent conversational AI. Our customer service bots are trained deeply on your business knowledge base to handle inquiries, bookings, and FAQs 24/7 with zero lag.",
        benefits: [
            "Reduce monthly customer support costs.",
            "Instant 24/7 response times across WhatsApp & Telegram.",
            "Seamless handover to human agents when needed.",
            "Learns continuously from past conversations."
        ],
        images: [
            { src: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop", category: "Chatbot UI" },
            { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", category: "Dashboard" },
            { src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop", category: "Analytics" }
        ]
    },
    "web-bisnis-cerdas": {
        id: "web-bisnis-cerdas",
        slugEn: "smart-business-web",
        slugId: "web-bisnis-cerdas",
        titleKey: "srv2Title",
        descriptionKey: "srv2Desc",
        fullDescription: "Convert visitors into loyal customers with highly optimized, visually stunning 3D Next.js landing pages. Each site is infused with our sales AI assistant to interactively guide users.",
        benefits: [
            "Premium, high-conversion modern design.",
            "Interactive 3D elements powered by React Three Fiber.",
            "Built-in AI Chatbot ready to close sales.",
            "Blazing fast loading speeds and SEO optimization."
        ],
        images: [
            { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop", category: "Web Design" },
            { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop", category: "Next.js Code" },
            { src: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop", category: "3D Rendering" }
        ]
    },
    "solusi-ai-lanjutan": {
        id: "solusi-ai-lanjutan",
        slugEn: "advanced-data-ai",
        slugId: "solusi-ai-lanjutan",
        titleKey: "srv3Title",
        descriptionKey: "srv3Desc",
        fullDescription: "Tap into the raw power of Machine Learning. We build custom models for Computer Vision (Object Detection, Quality Control) and Natural Language Processing to extract insights from your enterprise data.",
        benefits: [
            "Automate visual inspections with Computer Vision.",
            "Predict market trends with Machine Learning.",
            "Extract structured data from unstructured documents using NLP.",
            "Seamless API integration with your existing ERP/CRM."
        ],
        learningLinks: [
            { title: "Apa itu Machine Learning?", url: "https://medium.com/tag/machine-learning", category: "Machine Learning" },
            { title: "Mengenal Natural Language Processing (NLP)", url: "https://medium.com/tag/nlp", category: "NLP" },
            { title: "Konsep Dasar Computer Vision", url: "https://medium.com/tag/computer-vision", category: "Computer Vision" },
            { title: "Pengantar Deep Learning", url: "https://medium.com/tag/deep-learning", category: "Deep Learning" }
        ],
        images: [
            { src: "/services/cv-1.png", category: "Computer Vision" },
            { src: "/services/cv-2.png", category: "Computer Vision" },
            { src: "/services/cv-3.jpg", category: "Computer Vision" },
            { src: "/services/dl-1.png", category: "Deep Learning" },
            { src: "/services/dl-2.png", category: "Deep Learning" },
            { src: "/services/dl-3.webp", category: "Deep Learning" },
            { src: "/services/ml-1.jpg", category: "Machine Learning" },
            { src: "/services/ml-2.jpg", category: "Machine Learning" },
            { src: "/services/ml-3.webp", category: "Machine Learning" },
            { src: "/services/nlp-1.jpg", category: "NLP" },
            { src: "/services/nlp-2.webp", category: "NLP" },
            { src: "/services/nlp-3.webp", category: "NLP" }
        ]
    },
    "custom-enterprise": {
        id: "custom-enterprise",
        slugEn: "custom-enterprise",
        slugId: "custom-enterprise",
        titleKey: "srv4Title",
        descriptionKey: "srv4Desc",
        fullDescription: "A bespoke IT and AI architecture built from the ground up to solve your unique enterprise bottlenecks. From custom LLMs on private servers to massive data pipelines.",
        benefits: [
            "Dedicated engineering team.",
            "Highly secure, on-premise or private cloud deployment.",
            "Custom system integrations.",
            "24/7 SLA and critical system support."
        ],
        images: [
            { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", category: "Architecture" },
            { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop", category: "Servers" },
            { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop", category: "Strategy" }
        ]
    }
};

export type ServiceId = keyof typeof serviceData;
