// Configuration data for the Birthday Surprise website
const birthdayData = {
  // Birthday Girl's details
  name: "Sarah",
  age: 22, // The correct age option to continue

  // Audio settings
  // The path to the birthday song. Using a royalty-free track or placeholder.
  // The user can customize this path or overwrite the file in assets/audio/birthday-song.mp3
  audioPath: "./assets/audio/birthday-song.mp3",

  // Page 2: Three Personal Messages
  messages: [
    "Some people enter our life randomly...\nbut somehow become one of the most important parts of it. ✨",
    "From random conversations\nto countless memories...\nour friendship became a beautiful part of my life. 🌸",
    "And today isn't just another day...\nit's the day someone very special was born. ❤️"
  ],

  // Page 3: Interactive Questions (YES / NO Game)
  // Each question has a YES action and NO reactions (chosen randomly when user tries to hover/tap NO)
  questions: [
    {
      text: "Do you agree that our friendship has created some unforgettable memories?",
      noReactions: [
        "Nice try 😏",
        "Nope! 😜",
        "You can't escape this one 😂",
        "Wrong button! 🔒",
        "I knew you'd try that! 😉"
      ]
    },
    {
      text: "Would you choose our friendship all over again?",
      noReactions: [
        "Nice try 😏",
        "Nope! 😜",
        "You can't escape this one 😂",
        "Wrong button! 🔒",
        "I knew you'd try that! 😉"
      ]
    },
    {
      text: "Are you ready for your birthday surprise?",
      noReactions: [
        "Nice try 😏",
        "Nope! 😜",
        "You can't escape this one 😂",
        "Wrong button! 🔒",
        "I knew you'd try that! 😉"
      ]
    }
  ],

  // Page 4: Friendship / Life Journey Cards
  journey: [
    {
      title: "Where It All Started",
      date: "The Beginning",
      description: "Every beautiful journey starts somewhere. This was one of those moments that slowly became a beautiful friendship.",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Random Conversations",
      date: "Late Night Talks",
      description: "From random talks to conversations that somehow lasted forever...",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "The Crazy Moments",
      date: "Pure Fun",
      description: "Some memories don't need an explanation. They just need us to remember how crazy we were.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Always There",
      date: "Through Thick & Thin",
      description: "Through good days, bad days and completely random days, you became someone I could always count on.",
      image: "https://images.unsplash.com/photo-1484712401471-05c7215830eb?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Still Creating Memories",
      date: "And Beyond...",
      description: "And honestly...\nI hope this journey never ends.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop"
    }
  ],

  // Page 5: 10 Memories Gallery (Polaroids)
  memories: [
    {
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=500&auto=format&fit=crop",
      caption: "That day 😂"
    },
    {
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=500&auto=format&fit=crop",
      caption: "One of my favorite memories."
    },
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop",
      caption: "Pure chaos."
    },
    {
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=500&auto=format&fit=crop",
      caption: "Good times."
    },
    {
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=500&auto=format&fit=crop",
      caption: "Another unforgettable moment."
    },
    {
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=500&auto=format&fit=crop",
      caption: "Just us being us."
    },
    {
      image: "https://images.unsplash.com/photo-1506869648501-554191b9db96?q=80&w=500&auto=format&fit=crop",
      caption: "Stupid selfies 🤳"
    },
    {
      image: "https://images.unsplash.com/photo-1525026198548-4baa3128848c?q=80&w=500&auto=format&fit=crop",
      caption: "Always smiling 😊"
    },
    {
      image: "https://images.unsplash.com/photo-1481841580057-e2bc992b8c52?q=80&w=500&auto=format&fit=crop",
      caption: "Warm sun & laughs ☀️"
    },
    {
      image: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=500&auto=format&fit=crop",
      caption: "Cozy vibes ☕"
    }
  ],

  // Age choices shown to the birthday girl
  ageChoices: [18, 19, 20, 21, 22, 23, 24, 25],

  // Playful hints for wrong ages
  wrongAgeFeedback: [
    "Are you sure? 😂",
    "Try again!",
    "That doesn't seem right 👀",
    "Wait, are you lying about your age? 😜"
  ],

  // Final emotional letter (HTML-friendly or markdown-friendly array of paragraphs)
  finalLetter: [
    "Happy Birthday once again ❤️",
    "Thank you for being one of the most beautiful parts of my life.",
    "We've already created so many memories, and I hope we create hundreds more.",
    "Stay happy. Stay crazy. Keep smiling.",
    "And most importantly...",
    "Never change the amazing person you are.",
    "Happy Birthday! 🎂❤️"
  ],

  // Signature
  signature: "— From your best friend ❤️"
};

// Attach to window object for browser access
window.birthdayData = birthdayData;
