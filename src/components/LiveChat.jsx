import { useEffect, useRef, useState } from 'react';

const startingMessages = [
  { id: 1, from: 'user', text: 'Xin chào' },
  { id: 2, from: 'user', text: 'Làm thế nào để xem các sản phẩm' },
  { id: 3, from: 'admin', text: 'ADMIN: Chào bạn' },
  { id: 4, from: 'admin', text: 'ADMIN: Bạn có thể vào mục Shop để xem các sản phẩm' },
];

function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(startingMessages);
  const [message, setMessage] = useState('');
  const messageListRef = useRef(null);

  useEffect(() => {
    if (isOpen && messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [isOpen, messages]);

  function sendMessage(event) {
    event.preventDefault();
    const text = message.trim();
    if (!text) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), from: 'user', text },
    ]);
    setMessage('');
  }

  return (
    <div className="live-chat">
      {isOpen && (
        <section className="live-chat__window" role="dialog" aria-label="Customer support chat">
          <header className="live-chat__header">
            <h2>Customer Support</h2>
            <button type="button" onClick={() => setIsOpen(false)}>
              Let's Chat App
            </button>
          </header>

          <div className="live-chat__messages" ref={messageListRef} aria-live="polite">
            {messages.map((item) => (
              <div className={`chat-message chat-message--${item.from}`} key={item.id}>
                {item.from === 'admin' && <span className="chat-message__avatar" aria-hidden="true">👨🏻‍💼</span>}
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <form className="live-chat__composer" onSubmit={sendMessage}>
            <span className="chat-message__avatar" aria-hidden="true">👨🏻‍💼</span>
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              type="text"
              placeholder="Enter Message!"
              aria-label="Enter message"
            />
            <button className="live-chat__tool" type="button" aria-label="Attach a file" disabled>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="m8 12.5 6.9-6.9a3 3 0 0 1 4.2 4.2l-8.6 8.6a5 5 0 0 1-7.1-7.1l8.2-8.2" />
              </svg>
            </button>
            <button className="live-chat__tool" type="button" aria-label="Emoji picker" disabled>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <circle cx="9" cy="10" r=".8" />
                <circle cx="15" cy="10" r=".8" />
                <path d="M8.5 14a4.5 4.5 0 0 0 7 0" />
              </svg>
            </button>
            <button className="live-chat__send" type="submit" aria-label="Send message" disabled={!message.trim()}>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M3 11.5 21 3l-6.6 18-3.1-7.3L3 11.5Z" />
                <path d="m11.3 13.7 4.4-4.4" />
              </svg>
            </button>
          </form>
        </section>
      )}

      {!isOpen && (
        <button
          className="live-chat__toggle"
          type="button"
          aria-label="Open customer support chat"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
        >
          <svg aria-hidden="true" viewBox="0 0 32 32">
            <path d="M16 3.5c-7 0-12.5 5.1-12.5 11.6 0 3.2 1.4 6.1 3.8 8.2L6 28l5.1-2.6c1.5.6 3.2.9 4.9.9 7 0 12.5-5.1 12.5-11.6S23 3.5 16 3.5Z" />
            <path d="m8.5 19 5.3-5.6 3.4 2.6 6.3-5.3-5.3 7.5-3.5-2.6L8.5 19Z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default LiveChat;
