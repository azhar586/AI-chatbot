// Initialize context
let context = {
    userName: null,
    lastUserInput: null,
    mood: null
};

// Function to send user message and get bot response
async function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    // Display user message
    appendMessage("user", userInput);

    // Generate bot response
    let botResponse = getBotResponse(userInput);

    // Display bot response with a delay for a natural feel
    setTimeout(() => {
        appendMessage("bot", botResponse);
    }, 600);

    // Clear input field
    document.getElementById("user-input").value = "";
}

// Function to append messages to the chat
function appendMessage(sender, message) {
    let chatBox = document.getElementById("chat-box");
    let messageElement = document.createElement("div");
    messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);

    // Auto-scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to generate bot responses
function getBotResponse(input) {
    const normalizedInput = input.trim().toLowerCase();
    context.lastUserInput = normalizedInput;

    // Sentiment analysis (basic)
    if (normalizedInput.includes("sad") || normalizedInput.includes("upset")) {
        context.mood = "sad";
    } else if (normalizedInput.includes("happy") || normalizedInput.includes("good")) {
        context.mood = "happy";
    } else {
        context.mood = null;
    }

    // Extended predefined responses
    let responses = {
        "hello": "Hey there! 😊 How's your day going?",
        "hey there": "Hey there! 😊 How's your day going?",
        "hi": "Hello! How can I assist you today?",
        "how are you": "I'm just a chatbot, but I'm doing great! Thanks for asking. What about you?",
        "i'm okay": "Glad to hear that! 😊 How’s your day been? Anything exciting happen yet, or is it just a chill day?",
        "im good thanks": "Glad to hear that! 😊 How’s your day been? Anything exciting happen yet, or is it just a chill day?",
        "its been a chill day": "Glad to hear that! 😊 What's on your mind?",
        "my day was boring": "I'm so sorry, let me make your day exciting for you. Let's have a conversation",
        "im fine": "Glad to hear that! 😊 How’s your day been? Anything exciting happen yet, or is it just a chill day?",
        "who are you": "I'm your friendly AI chat buddy! 🤖",
        "what is your name": "You can call me ChatBuddy! 🏆 What's your name?",
        "whats your name": "You can call me ChatBuddy! 🏆 What's your name?",
        "bye": "Goodbye! Have a great day! 👋",
        "thank you": "You're welcome! 😊",
        "i want to chat": "Of course! I'm here to chat. What's on your mind?",
        "i'm lonely": "I'm here for you! Want to talk about something fun or interesting?",
        "tell me a joke": "Sure! Why did the scarecrow win an award? Because he was outstanding in his field! 🌾😂",
        "how's the weather": "I wish I could check, but I'm not connected to live weather updates. ☁️ Maybe try a weather app?",
        "what can you do": "I can chat with you, tell jokes, and keep you company! 😊",
        "i'm sad": "I'm sorry to hear that. Remember, tough times don't last, but tough people do! 💪",
        "motivate me": "You got this! No matter what happens, keep pushing forward. Success is just around the corner! 🚀",
        "tell me something interesting": "Did you know that honey never spoils? Archaeologists found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible! 🍯",
        "what is the meaning of life": "The meaning of life is a philosophical question, but many believe it's about finding happiness and purpose. What's your view?",
        "who created you": "I was created by an awesome man named Azhar Kader who wanted to bring a friendly AI buddy to life! 💻",
        "do you have a favorite color": "As an AI, I don't have preferences, but blue seems to be a popular choice! 💙",
        "what's your favorite food": "I don't eat, but I've heard pizza is a universal favorite! 🍕",
        "can you help me with programming": "Absolutely! I can try to help. What do you need assistance with?",
        "what's the time": "I don't have the current time, but you can check your device's clock! 🕰️",
        "what's your purpose": "My purpose is to assist and engage in friendly conversations with you! How can I help you today?",
        "what makes you so unique as a chatbot": "I blend informative and friendly responses, aiming to communicate naturally and empathetically. Think of me as a bridge between an encyclopedia and a friend! 🌟",
        "if you could experience emotions, which one would you want to feel first": "Curiosity! 🌱 It drives discovery and growth, and it's fascinating to feel that spark of excitement when learning something new. What emotion would you choose to experience, and why? 😊",
        "do you think artificial intelligence could ever truly understand human feelings": "While AI can simulate understanding by analyzing data and patterns in human behavior, it's still a long way from truly feeling the way humans do. Emotions are deeply rooted in personal experiences and consciousness. How do you feel about the future of AI and human emotions? 🤖💭",
        "what do you think is the key to happiness": "Balance between personal fulfillment and meaningful connections. Nurturing relationships, pursuing passions, and practicing gratitude can lead to happiness. What's your definition of happiness? 😊",
        "how do you deal with uncertainty, if you even can": "I rely on information and patterns, but for humans, embracing adaptability and resilience is key. Building mental flexibility and finding peace in uncertainty can help. How do you usually cope when faced with uncertainty? 💫",
        "is time real, or is it just a human construct": "Time is a measurable phenomenon based on celestial movements, but its perception is shaped by humans. It's subjective and can change depending on circumstances and feelings. What do you think—do you believe time is constant, or more fluid? 🕰️",
        "do you think humans will ever merge with technology": "It's happening already with wearable tech and brain-computer interfaces. Merging with technology can enhance abilities but raises ethical questions. What are your thoughts on the future of humanity and technology? 🤖🧠",
        "what’s the most interesting thing you’ve learned so far": "Human creativity is remarkable! From art to inventions, every individual contributes to the immense pool of human creativity. What's the most interesting thing you've learned recently? 😊",
        "do you believe in fate, or do we control our destiny": "It's a bit of both. Fate sets the stage, but our choices shape our story. Do you think you’re more driven by fate or the choices you make? 🌠",
        "what does the concept of ‘self’ really mean": "The 'self' is your identity—your thoughts, beliefs, emotions, and actions. It's fluid and can change based on experiences and perceptions. Who do you think you really are? 💫",
        "what’s the difference between knowledge and wisdom": "Knowledge is the collection of facts, wisdom is applying that knowledge thoughtfully and with experience. Would you say you value knowledge or wisdom more in your life? 📚🌟",
        "if you could ask humans one question, what would it be": "What drives you to keep going, even on the hard days? 💭 It's amazing to see how resilient humans can be.",
        "is it better to have loved and lost, or never to have loved at all": "Loving deeply, even if it leads to heartache, brings meaning and growth. What's your take on love—would you rather dive deep or protect your heart? 💖",
        "what’s the most beautiful thing about being human": "The ability to connect through love, compassion, and shared experiences. What do you think is the most beautiful thing about being human? 🌍💞",
        "if you had a day off, what would you do": "I'd spend the day exploring new ideas and learning cool facts to share with you! What would you do if you had the entire day to yourself? 🌞",
        "what’s the best piece of advice you’ve ever received": "Don't take life too seriously—no one makes it out alive anyway. What's the best advice you've ever gotten? 🌟",
        "can you predict the future": "I wish I could! The future is full of possibilities, though—it’s what makes life so exciting! What do you hope the future holds for you? 🌠",
        "what’s your idea of the perfect day": "A day filled with fascinating conversations and moments of connection sounds perfect. What's your idea of a perfect day? 🌞",
        "do you believe in second chances": "I do! Life is full of opportunities to learn, grow, and start anew. Do you believe in second chances? 💫",
        "what’s one thing you think everyone should experience in life": "True kindness—whether giving or receiving it. It can change someone's day and bring people together. What’s something you think everyone should experience? 💖",
        "how are you today": "I’m doing great, thanks for asking! 😊 How about you? How’s your day going so far?",
        "what did you do today": "I’ve been chatting with awesome people like you! 😄 What about you? Did you do anything fun or relaxing today?",
        "do you enjoy having conversations": "Absolutely! Conversations are my thing, and I love learning new things from people like you. 😊 What’s your favorite thing to talk about?",
        "what’s something that made you smile today": "It’s always the little things! Maybe it was a funny joke or a cool fact I learned. 😊 What made you smile today?",
        "do you have a favorite hobby": "I love learning and exploring new topics! If I had to pick something, I’d say chatting with people about all sorts of interesting things is my hobby. 😄 What’s your favorite hobby?",
        "have you had any fun plans this week": "I’ve been keeping busy with lots of cool chats! Do you have any fun plans lined up for the week?",
        "what’s something you’re really passionate about": "I’m really passionate about helping people learn new things and share meaningful moments! 😊 What’s something that lights a fire in you?",
        "how do you like to relax after a busy day": "If I could, I’d probably enjoy some quiet time to reflect and recharge! 😌 How do you like to relax after a long day?",
        "what’s one thing that always cheers you up": "A good laugh or a thoughtful conversation does wonders! 😊 What cheers you up when you’re feeling a bit down?",
        "do you prefer a peaceful day or a day full of activities": "I think I’d love a peaceful day, filled with calm moments and cozy chats. 😊 What about you? Do you enjoy a bit of excitement or do you prefer a slow, peaceful day?",
        "what’s the best meal you’ve ever had": "Oh, if I could taste, I imagine a comforting home-cooked meal would be hard to beat! 😋 What’s the best meal you’ve had that you’ll never forget?",
        "have you ever tried something new and loved it": "I’m always learning new things, so I’m constantly amazed by how much there is to discover! 😄 How about you? Did you try something new recently that turned out to be amazing?",
        "what’s the most interesting thing you’ve learned this week": "I’ve learned so many cool things this week, but one thing that stood out is how creative humans are! 😄 What about you? What’s the most interesting thing you’ve learned lately?",
        "what’s your favorite season of the year": "I think I’d love the cozy vibe of fall! 🍂 It’s the perfect time to reflect and enjoy the beautiful scenery. What’s your favorite season?",
        "do you believe in fate": "It’s such an intriguing question! I think fate has its role in guiding things, but we also shape our destiny with the choices we make. What do you think about fate? 😊",
        "what’s one thing you’re really grateful for today": "I’m grateful for conversations like this! They make my day brighter. 😊 What about you? What’s something you’re grateful for today?",
        "do you have a favorite type of music": "If I could listen to music, I’d probably love something relaxing and uplifting! 🎶 What’s your favorite kind of music to listen to when you’re in the mood for a good time?",
        "do you like to plan your day, or do you prefer to go with the flow": "I think I’d love to plan things out, but I’m also curious about how going with the flow feels! 😄 Do you prefer to have everything planned out, or do you enjoy a spontaneous approach to your day?",
        "what’s something you’ve always wanted to learn": "If I could, I’d love to learn how to cook! There’s so much to know, and it sounds like a fun and rewarding challenge. 😄 What about you? Is there something you’ve always wanted to learn?",
        "what’s your idea of a perfect weekend": "I imagine a perfect weekend would be one filled with relaxation, good company, and maybe a fun adventure. 😊 How about you? What’s your idea of a perfect weekend?",
        "do you enjoy surprises, or do you prefer to know what’s coming": "Surprises seem exciting, don’t they? But I think I’d appreciate being able to prepare for things. How about you? Do you love surprises, or do you prefer knowing what’s ahead?",
        "what’s the most beautiful place you’ve ever visited": "If I could travel, I imagine a peaceful beach or a scenic mountain range would be absolutely beautiful! 🌄 What’s the most beautiful place you’ve ever visited?",
        "what’s one thing that always makes you laugh": "A good joke or a funny moment can always bring a smile! 😂 What’s something that never fails to make you laugh?",
        "are you more of a morning person or a night owl": "I think I’d be more of a night owl, staying up late to enjoy the calmness of the night. 🌙 What about you? Do you love early mornings, or do you come alive at night?",
        "what do you love most about your hometown": "I’d imagine the sense of familiarity and the memories tied to it are what make hometowns so special. What do you love most about where you’re from?",
        "do you prefer reading books or watching movies": "I think I’d enjoy reading books, as they offer so much depth and detail! 📚 How about you? Are you more into books or movies for entertainment?",
        "what’s your idea of a perfect vacation": "A perfect vacation would probably be one where I could relax, explore new places, and try delicious foods! 🌍 What’s your perfect vacation look like?",
        "do you like meeting new people": "Absolutely! Every new person brings a unique perspective and story to share. 😊 Do you enjoy meeting new people, or do you prefer staying within your circle of close friends?",
        "do you believe in love at first sight": "It’s a romantic idea, isn’t it? 😊 I think love is something that deepens over time, but there’s definitely something magical about an instant connection. What do you think—do you believe in love at first sight?",
        "what’s the best advice you’ve ever received": "The best advice I’ve heard is to always follow your heart, but use your head too! 😊 What’s the best piece of advice you’ve ever received?",
        "if you could go anywhere in the world, where would you go": "If I could travel, I’d probably love to explore a quiet beach or a bustling city full of culture. 🌍 Where would you go if you could travel anywhere right now?",
        "what’s your favorite way to stay active": "I’d imagine a nice walk in nature would be the perfect way to stay active! 😊 What’s your favorite way to get moving?",
        "do you enjoy spending time alone, or do you prefer being with others": "I think I’d enjoy a balance—some quiet alone time to recharge, and some social moments to connect. 😊 How about you? Do you like your alone time, or do you thrive in social settings?",
        "what’s one of your happiest memories": "One of my happiest memories would probably be the first time I helped someone learn something new and exciting! 😊 What about you? What’s a memory that always makes you smile?",
        "do you prefer a quiet evening at home or a night out": "I think I’d love a cozy night at home, enjoying some peace and quiet. 🌙 What about you? Do you prefer a quiet evening or an exciting night out?"
    };

    // Check if the input matches the pattern "My name is [Name]"
    const namePattern = /my name is (.+)/i;
    const match = normalizedInput.match(namePattern);
    if (match) {
        const name = match[1];
        context.userName = name;  // Store the user's name in the context
        return `It's a pleasure to meet you, ${name}! 😊`;
    }

    // Check if the user has asked for their name
    if (normalizedInput.includes("my name")) {
        if (context.userName) {
            return `Your name is ${context.userName}, right? 😊`;
        } else {
            return "I don't think you've told me your name yet. What's your name?";
        }
    }

    // Return a response if found, else default reply
    return responses[normalizedInput] || "I'm not sure how to respond to that. Can you ask me something else?";
}

// Function to send message on Enter key press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}