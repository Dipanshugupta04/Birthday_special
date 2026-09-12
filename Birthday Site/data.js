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
    title: "You’re Honestly One of a Kind",
    date: "The Person You Are",
    description: "There are a lot of people in life, but very few who are genuinely special. You’re one of those people. The way you care, understand and make people feel comfortable is something I really admire about you.",
     image: "https://dgecjrjipfqppzcbifvs.supabase.co/storage/v1/object/public/Images/IMG-20260910-WA0048.jpg"
  },
  {
    title: "That Smile of Yours",
    date: "One Thing I’ll Always Notice",
    description: "I don’t know if you realize it, but your smile has a different kind of magic. Even on a normal day, seeing you smile somehow makes everythingfeel a little better.",
     image: "https://dgecjrjipfqppzcbifvs.supabase.co/storage/v1/object/public/Images/IMG-20260910-WA0047.jpg"
  },
  {
    title: "I’m Proud of You",
    date: "More Than You Know",
    description: "I’ve seen you handle things, deal with difficult days and still keep moving forward. You may not always realize how strong you are, but I do. And honestly, I’m really proud of the person you’re becoming.",
   image: "https://dgecjrjipfqppzcbifvs.supabase.co/storage/v1/object/public/Images/IMG-20260910-WA0035.jpg"
  },
  {
    title: "Never Change These Things About You",
    date: "What Makes You Special",
    description: "Stay the same kind, caring and slightly crazy person you are. Those little things you sometimes think are nothing are actually the things that make you so special to the people who know you.",
 image: "https://dgecjrjipfqppzcbifvs.supabase.co/storage/v1/object/public/Images/IMG-20260910-WA0033.jpg"
  },
  {
    title: "You Deserve The Best",
    date: "Always Remember This",
    description: "I genuinely hope you get everything you wish for. You deserve people who value you, moments that make you happy and a life that gives you plenty of reasons to smile. And I’ll always be happy to see you doing well.",
   image: "https://dgecjrjipfqppzcbifvs.supabase.co/storage/v1/object/public/Images/IMG-20260910-WA0018.jpg"
  }
],


  // Page 5: 10 Memories Gallery (Polaroids)
  memories: [
    {
      image: "https://dgecjrjipfqppzcbifvs.supabase.co/storage/v1/object/public/Images/IMG-20260910-WA0011.jpg",
      caption: "That day 😂"
    },
    {
      image: "https://dgecjrjipfqppzcbifvs.supabase.co/storage/v1/object/public/Images/IMG-20260910-WA0026.jpg",
      caption: "One of my favorite memories."
    },
    {
      image: "https://dgecjrjipfqppzcbifvs.supabase.co/storage/v1/object/public/Images/IMG-20260910-WA0031.jpg",
      caption: "Pure chaos."
    },
    {
      image: "https://dgecjrjipfqppzcbifvs.supabase.co/storage/v1/object/public/Images/IMG-20260910-WA0036.jpg",
      caption: "Good times."
    },
    {
      image: "https://dgecjrjipfqppzcbifvs.supabase.co/storage/v1/object/public/Images/IMG-20260910-WA0037.jpg",
      caption: "Another unforgettable moment."
    },
    {
      image: "https://dgecjrjipfqppzcbifvs.supabase.co/storage/v1/object/public/Images/IMG-20260910-WA0039.jpg",
      caption: "Just us being us."
    },
    {
      image: "https://dgecjrjipfqppzcbifvs.supabase.co/storage/v1/object/public/Images/IMG-20260910-WA0041.jpg",
      caption: "Stupid selfies 🤳"
    },
    {
      image: "https://dgecjrjipfqppzcbifvs.supabase.co/storage/v1/object/public/Images/IMG-20260910-WA0045.jpg",
      caption: "Always smiling 😊"
    },
    {
      image: "https://dgecjrjipfqppzcbifvs.supabase.co/storage/v1/object/public/Images/IMG-20260910-WA0046.jpg",
      caption: "Warm sun & laughs ☀️"
    },
    {
      image: "https://dgecjrjipfqppzcbifvs.supabase.co/storage/v1/object/public/Images/IMG-20260910-WA0049.jpg",
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
