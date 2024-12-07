import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './ChatWidget.css';
import { getPrivacyVariable } from '../privacy';
import i18n from '../i18n';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatState {
    messages: Message[];
    sessionId?: string;
    isLoading: boolean;
    isInitializing?: boolean;
}

export default function ChatWidget(): JSX.Element {
    const { t } = useTranslation();
    const [state, setState] = useState<ChatState>({
        messages: [{
            role: 'assistant',
            content: t('CHAT_INITIAL_MESSAGE', { name: getPrivacyVariable("NAME") })
        }],
        isLoading: false,
        isInitializing: false
    });
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const currentMessageRef = useRef<string>('');
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [state.messages]);

    // Prevent body scroll when chat is open on mobile
    useEffect(() => {
        if (!isOpen) return;

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';

        const chatMessages = document.querySelector('.chat-messages');
        if (!chatMessages) return;

        const handleTouchMove = (e: TouchEvent) => {
            const target = e.target as HTMLElement;
            if (!chatMessages.contains(target)) {
                e.preventDefault();
            }
        };

        document.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleResize = () => {
            const visualViewport = window.visualViewport;
            if (visualViewport) {
                setIsKeyboardVisible(visualViewport.height < window.innerHeight);
            }
        };

        window.visualViewport?.addEventListener('resize', handleResize);
        return () => window.visualViewport?.removeEventListener('resize', handleResize);
    }, []);

    const sendMessage = async () => {
        if (!input.trim() || state.isLoading) return;

        const userMessage = input.trim();
        setInput('');

        // Set initializing state for first message
        setState(prev => ({
            ...prev,
            isLoading: true,
            isInitializing: !prev.sessionId,
            messages: [...prev.messages,
                { role: 'user', content: userMessage },
                { role: 'assistant', content: '' }
            ]
        }));

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    sessionId: state.sessionId,
                    lang: i18n.language
                }),
            });

            // Get session ID from first response
            if (!state.sessionId) {
                const newSessionId = response.headers.get('X-Session-Id');
                if (newSessionId) {
                    setState(prev => ({ ...prev, sessionId: newSessionId }));
                }
            }

            // Handle streaming response
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) throw new Error('No reader available');

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            currentMessageRef.current += data.chunk;

                            setState(prev => ({
                                ...prev,
                                messages: prev.messages.map((msg, i) =>
                                    i === prev.messages.length - 1
                                        ? { ...msg, content: currentMessageRef.current }
                                        : msg
                                )
                            }));
                        } catch (e) {
                            console.error('Error parsing SSE data:', e);
                        }
                    }
                }
            }

            currentMessageRef.current = '';
            setState(prev => ({
                ...prev,
                isLoading: false,
                isInitializing: false
            }));

        } catch (error) {
            console.error('Chat error:', error);
            setState(prev => ({
                ...prev,
                isLoading: false,
                isInitializing: false
            }));
        }
    };

    return (
        <>
            <button
                className={`chat-button ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Chat"
            >
                ?
            </button>

            {isOpen && (
                <div className={`chat-widget ${isKeyboardVisible ? 'keyboard-visible' : ''}`}>
                    <button
                        className="chat-close"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close chat"
                    >
                        ×
                    </button>
                    <div className="chat-messages">
                        {state.messages.map((msg, i) => (
                            <div key={i} className={`message ${msg.role}`}>
                                {msg.content.split('\n').map((text, index) => (
                                    <React.Fragment key={index}>
                                        {text}
                                        {index !== msg.content.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                                {state.isLoading && i === state.messages.length - 1 && (
                                    <>
                                        <span className="dot-typing"></span>
                                        {state.isInitializing && (
                                            <div className="initializing-warning">
                                                {t('CHAT_INITIALIZING_MESSAGE')}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            enterKeyHint="send"
                            placeholder={t('CHAT_INPUT_PLACEHOLDER')}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={state.isLoading || !input.trim()}
                        >
                            {t('CHAT_SEND_BUTTON')}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}