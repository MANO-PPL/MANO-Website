import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatbotWidgetDesktop from "./ChatbotWidgetDesktop";
import ChatbotWidgetTablet from "./ChatbotWidgetTablet";
import ChatbotWidgetMobile from "./ChatbotWidgetMobile";

const API_URL = import.meta.env.VITE_RAG_API_URL || "http://localhost:5555";
const CHAT_API_URL = `${API_URL}/chat-corporate/chat`;

const initialMessage = {
    role: "assistant",
    text: "Hi! I am MANO Assistant. Ask me anything about MANO services, projects, or company details.",
    sources: []
};

const defaultSuggestedQuestions = [
    "What services does MANO offer?",
    "Where is MANO Projects located?",
    "When was MANO established?",
    "How can I contact MANO?"
];

const serviceQuestionsBySlug = {
    "project-management": [
        "What is included in Project Management services?",
        "How does MANO improve project efficiency and control?",
        "What KPIs does MANO track for project management?",
        "Why choose MANO for project management consultancy?"
    ],
    "project-execution": [
        "What is covered under Project Execution services?",
        "How does MANO manage on-site coordination and supervision?",
        "How does MANO ensure execution quality and safety?",
        "How is daily progress tracked during execution?"
    ],
    "project-planning": [
        "What planning methods does MANO use (CPM/PERT)?",
        "How does MANO handle manpower and material planning?",
        "How does MANO manage long-lead procurement planning?",
        "Why is project planning important before execution?"
    ],
    "contract-management": [
        "What is included in Contract Management services?",
        "How does MANO handle tendering and vendor finalization?",
        "How does MANO reduce contract and claim risks?",
        "What are the benefits of MANO contract compliance systems?"
    ],
    "qa-audit": [
        "What is covered under QA/QC and Auditing?",
        "How does MANO perform quality inspections and snagging?",
        "How does MANO ensure QA/QC compliance on projects?",
        "What quality documentation does MANO maintain?"
    ],
    "cost-consultancy": [
        "What is included in Cost Consultancy services?",
        "How does MANO control project budgets and BOQs?",
        "How does MANO perform rate analysis and cost tracking?",
        "How does cost consultancy improve project ROI?"
    ],
    "qs-billing-audit": [
        "What is included in QS and Auditing services?",
        "How does MANO verify bills and joint measurements?",
        "How does MANO prevent overbilling and quantity mismatch?",
        "What audit controls are used in QS billing?"
    ],
    "ehs-audit": [
        "What is included in EHS Audit services?",
        "How does MANO monitor safety compliance on-site?",
        "How does MANO manage hazards and incident reporting?",
        "What are the key outcomes of MANO EHS audits?"
    ],
    epc: [
        "What is included in MANO EPC services?",
        "How does MANO integrate engineering, procurement, and construction?",
        "How does MANO optimize EPC cost and timeline control?",
        "What industries does MANO support under EPC?"
    ]
};

const serviceSlugAliases = {
    "qa-qc-auditing": "qa-audit",
    "qaqc-auditing": "qa-audit",
    "qs-auditing": "qs-billing-audit",
    "project-execution-management": "project-execution"
};

function getSuggestedQuestionsByPath(pathname) {
    const pagePath = (pathname || "").toLowerCase().split("?")[0];

    // Route format is `/:brand/services/:serviceSlug`.
    const pathParts = pagePath.split("/").filter(Boolean);
    const servicesIndex = pathParts.indexOf("services");

    if (servicesIndex !== -1) {
        const rawSlug = pathParts[servicesIndex + 1];

        if (!rawSlug) {
            return [
                "What services does MANO offer?",
                "Tell me about Contract Management key focus areas.",
                "What is included in QA/QC services?",
                "How does MANO handle project planning?"
            ];
        }

        const normalizedSlug = serviceSlugAliases[rawSlug] || rawSlug;
        if (serviceQuestionsBySlug[normalizedSlug]) {
            return serviceQuestionsBySlug[normalizedSlug];
        }
    }

    if (pagePath.includes("/services")) {
        return [
            "What services does MANO offer?",
            "Tell me about Contract Management key focus areas.",
            "What is included in QA/QC services?",
            "How does MANO handle project planning?"
        ];
    }

    if (pagePath.includes("/projects")) {
        return [
            "What types of projects has MANO delivered?",
            "Which industries does MANO serve?",
            "What is MANO's project delivery model?",
            "How does MANO ensure quality in projects?"
        ];
    }

    if (pagePath.includes("/careers")) {
        return [
            "What job opportunities are available at MANO?",
            "Which locations are hiring currently?",
            "What qualifications are expected for roles?",
            "How can I apply for a position at MANO?"
        ];
    }

    if (pagePath.includes("/about-us")) {
        return [
            "When was MANO established and by whom?",
            "What are MANO's mission and vision?",
            "Who are the key leaders at MANO?",
            "Where is MANO head office located?"
        ];
    }

    return defaultSuggestedQuestions;
}

export default function ChatbotWidget() {
    const location = useLocation();
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const [isTabletDevice, setIsTabletDevice] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([initialMessage]);
    const listRef = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mobileWidthQuery = window.matchMedia("(max-width: 767px)");
        const tabletWidthQuery = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
        const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

        const updateDevice = () => {
            const isMobile = mobileWidthQuery.matches;
            const isTablet = tabletWidthQuery.matches;
            const isCoarse = coarsePointerQuery.matches;
            setIsMobileDevice(isMobile || (isCoarse && !isTablet));
            setIsTabletDevice(isTablet);
        };

        updateDevice();

        mobileWidthQuery.addEventListener("change", updateDevice);
        tabletWidthQuery.addEventListener("change", updateDevice);
        coarsePointerQuery.addEventListener("change", updateDevice);

        return () => {
            mobileWidthQuery.removeEventListener("change", updateDevice);
            tabletWidthQuery.removeEventListener("change", updateDevice);
            coarsePointerQuery.removeEventListener("change", updateDevice);
        };
    }, []);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, loading, isOpen]);

    // Lock background scroll when chatbot is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const sendMessage = async (overrideQuestion) => {
        const question = (overrideQuestion ?? input).trim();
        if (!question || loading) return;

        const userMessage = { role: "user", text: question, sources: [] };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch(CHAT_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question })
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: data?.answer || "I couldn't generate an answer right now.",
                    sources: Array.isArray(data?.sources) ? data.sources : []
                }
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: "I couldn't reach the assistant service right now. Please try again in a moment.",
                    sources: []
                }
            ]);
            console.error("[ChatbotWidget] Chat request failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const onKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    const isGatewayPage = location.pathname === "/";
    if (isGatewayPage) {
        return null;
    }

    const suggestedQuestions = getSuggestedQuestionsByPath(location.pathname);

    const widgetProps = {
        isOpen,
        setIsOpen,
        listRef,
        messages,
        loading,
        suggestedQuestions,
        sendMessage,
        input,
        setInput,
        onKeyDown
    };

    if (isMobileDevice) {
        return <ChatbotWidgetMobile {...widgetProps} />;
    }

    if (isTabletDevice) {
        return <ChatbotWidgetTablet {...widgetProps} />;
    }

    return <ChatbotWidgetDesktop {...widgetProps} />;
}
