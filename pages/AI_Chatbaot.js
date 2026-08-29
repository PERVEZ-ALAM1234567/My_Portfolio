document.addEventListener("DOMContentLoaded", () => {
    // const chatBox = document.getElementById("chat-box");
    // const userInput = document.getElementById("user-input");
    // const sendBtn = document.getElementById("send-btn");

    // const botResponses = {
    //     "hi": "Hello! I am your portfolio chatbot. Ask me about my skills or projects.",
    //     "skills": "I specialize in Frontend Development with HTML, CSS, JavaScript, GSAP, and Anime.js!",
    //     "projects": "I have built interactive UI projects including animated portfolios and dashboards.",
    //     "contact": "You can reach me at example@email.com",
    //     "default": "Sorry, I didn't understand that. Ask me about my 'skills' or 'projects'."
    // };

    // function addMessage(text, type) {
    //     const messageDiv = document.createElement("div");
    //     messageDiv.classList.add("message", type === "user" ? "user-message" : "bot-message");
    //     messageDiv.textContent = text;
    //     chatBox.appendChild(messageDiv);

    //     // GSAP Animation (Messages fade in and bounce)
    //     gsap.fromTo(messageDiv, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });

    //     chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll down
    // }

    // function handleUserInput() {
    //     const userText = userInput.value.trim().toLowerCase();
    //     if (userText === "") return;

    //     addMessage(userText, "user");

    //     setTimeout(() => {
    //         const botReply = botResponses[userText] || botResponses["default"];
    //         addMessage(botReply, "bot");

    //         // Anime.js Text Morphing for Bot Responses
    //         anime({
    //             targets: ".bot-message:last-child",
    //             scale: [0.8, 1],
    //             duration: 500,
    //             easing: "easeOutElastic(1, .8)"
    //         });

    //     }, 600);

    //     userInput.value = "";
    // }

    // sendBtn.addEventListener("click", handleUserInput);
    // userInput.addEventListener("keypress", (e) => {
    //     if (e.key === "Enter") handleUserInput();
    // });







































        const chatBox = document.getElementById("chat-box");
        const userInput = document.getElementById("user-input");
        const sendBtn = document.getElementById("send-btn");
        const micBtn = document.getElementById("mic-btn");
        const downloadBtn = document.getElementById("download-btn");
        const darkToggle = document.getElementById("dark-toggle");
    
        const botResponses = {
            hi: "Hello! I’m your portfolio AI. Ask about my skills, projects, or how to contact me!",
            skills: "I specialize in HTML, CSS, JavaScript, React, GSAP, Anime.js & building animated UIs!",
            projects: "I've created dashboards, animated portfolios, chatbots, and more!",
            contact: "Reach me at: portfolio@example.com",
            default: "I'm not sure I understood that 🤔. Try asking about ‘skills’, ‘projects’, or ‘contact’.",
        };
    
        let chatHistory = [];
    
        // --- Match Keywords
        function matchInput(input) {
            if (input.includes("hello") || input.includes("hi")) return "hi";
            if (input.includes("skill") || input.includes("tech")) return "skills";
            if (input.includes("project") || input.includes("work")) return "projects";
            if (input.includes("email") || input.includes("contact")) return "contact";
            return "default";
        }
    
        // --- Render Message
        function renderMessage(text, type, time = null) {
            const messageWrapper = document.createElement("div");
            messageWrapper.classList.add("message", type === "user" ? "user-message" : "bot-message");
    
            const avatar = document.createElement("span");
            avatar.className = "avatar";
            avatar.textContent = type === "user" ? "🧑" : "🤖";
    
            const content = document.createElement("div");
            content.className = "message-content";
            content.textContent = text;
    
            const timeTag = document.createElement("div");
            timeTag.className = "time-tag";
            timeTag.textContent = time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
            messageWrapper.appendChild(avatar);
            messageWrapper.appendChild(content);
            messageWrapper.appendChild(timeTag);
            chatBox.appendChild(messageWrapper);
    
            gsap.fromTo(messageWrapper, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
            anime({ targets: messageWrapper, scale: [0.95, 1], duration: 400, easing: "easeOutElastic(1, .6)" });
    
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    
        // --- Add Message
        function addMessage(text, type) {
            const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            renderMessage(text, type, time);
            chatHistory.push({ text, type, time });
            localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
        }
    
        // --- Show Typing
        function showTyping() {
            const typingDiv = document.createElement("div");
            typingDiv.className = "bot-message message typing";
            typingDiv.innerHTML = '<span class="avatar">🤖</span><div class="message-content dots"><span>.</span><span>.</span><span>.</span></div>';
            chatBox.appendChild(typingDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
            return typingDiv;
        }
    
        // --- Handle Input
        function handleUserInput() {
            const text = userInput.value.trim().toLowerCase();
            if (!text) return;
            addMessage(text, "user");
    
            const typingEl = showTyping();
            const key = matchInput(text);
    
            setTimeout(() => {
                typingEl.remove();
                addMessage(botResponses[key], "bot");
                showQuickReplies();
            }, 700);
    
            userInput.value = "";
        }
    
        sendBtn.addEventListener("click", handleUserInput);
        userInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleUserInput();
        });
    
        // --- Quick Replies
        function showQuickReplies() {
            const replies = ["skills", "projects", "contact"];
            const wrapper = document.createElement("div");
            wrapper.className = "quick-replies";
    
            replies.forEach(reply => {
                const btn = document.createElement("button");
                btn.className = "quick-reply-btn";
                btn.textContent = reply;
                btn.onclick = () => {
                    userInput.value = reply;
                    handleUserInput();
                    wrapper.remove();
                };
                wrapper.appendChild(btn);
            });
    
            chatBox.appendChild(wrapper);
            gsap.from(wrapper, { opacity: 0, y: 20, duration: 0.4 });
        }
    
        // --- Voice Input
        if ("webkitSpeechRecognition" in window && micBtn) {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = "en-US";
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
    
            micBtn.addEventListener("click", () => recognition.start());
    
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                userInput.value = transcript;
                handleUserInput();
            };
    
            recognition.onerror = (err) => {
                alert("Mic error: " + err.message);
            };
        }
    
        // --- Restore Chat
        function restoreChat() {
            const saved = localStorage.getItem("chatHistory");
            if (!saved) return;
            chatHistory = JSON.parse(saved);
            chatHistory.forEach(({ text, type, time }) => renderMessage(text, type, time));
        }
    
        restoreChat();
    
        // --- Download Chat as PDF
        if (downloadBtn) {
            downloadBtn.addEventListener("click", () => {
                const pdfContent = document.createElement("div");
                pdfContent.style.padding = "20px";
    
                chatHistory.forEach(({ text, type, time }) => {
                    const p = document.createElement("p");
                    p.textContent = `[${time}] ${type === "user" ? "🧑 You" : "🤖 Bot"}: ${text}`;
                    pdfContent.appendChild(p);
                });
    
                html2pdf().from(pdfContent).set({
                    margin: 0.5,
                    filename: "chat-history.pdf",
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
                }).save();
            });
        }
    
        
    });
    