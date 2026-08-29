document.addEventListener("DOMContentLoaded", () => {
  // Ensure we have access to the configuration data
  const config = window.birthdayData;
  if (!config) {
    console.error("Birthday data configuration not found.");
    return;
  }

  /* ==========================================================================
     DOM ELEMENTS
     ========================================================================== */
  const bgMusic = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");
  const progressContainer = document.getElementById("progress-container");
  const progressBarFill = document.getElementById("progress-bar-fill");
  const progressPercent = document.getElementById("progress-percent");
  
  // Navigation / Page containers
  const pages = Array.from({ length: 10 }, (_, i) => document.getElementById(`page-${i + 1}`));
  
  // Page 1 Elements
  const startBtn = document.getElementById("start-btn");

  // Page 2 Elements
  const messageText = document.getElementById("message-text");
  const msgNextBtn = document.getElementById("msg-next-btn");

  // Page 3 Elements
  const questionText = document.getElementById("question-text");
  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");
  const gameReactionToast = document.getElementById("game-reaction-toast");

  // Page 4 Elements
  const storyCardsWrapper = document.getElementById("story-cards-wrapper");
  const storyNextBtn = document.getElementById("story-next-btn");

  // Page 5 Elements
  const polaroidGrid = document.getElementById("polaroid-grid");
  const galleryNextBtn = document.getElementById("gallery-next-btn");

  // Page 6 Elements
  const ageChoicesGrid = document.getElementById("age-choices-grid");
  const ageFeedback = document.getElementById("age-feedback");

  // Page 7 Elements
  const birthdayName = document.getElementById("birthday-name");
  const revealContinueBtn = document.getElementById("reveal-continue-btn");

  // Page 8 & 9 Elements
  const cutCakeBtn = document.getElementById("cut-cake-btn");
  const cakeContinueBtn = document.getElementById("cake-continue-btn");
  const cakeStatusMsg = document.getElementById("cake-status-message");
  const svgKnife = document.getElementById("cake-knife");
  const cakeLeftSlice = document.getElementById("cake-left-slice");
  const cakeRightSlice = document.getElementById("cake-right-slice");
  const cakeSliceLine = document.getElementById("cake-slice-line");
  const flames = document.querySelectorAll(".candle-flame");

  // Page 10 Elements
  const finalParagraphs = document.getElementById("final-paragraphs");
  const finalSignature = document.getElementById("final-signature");
  const replayBtn = document.getElementById("replay-btn");

  // Lightbox Elements
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  /* ==========================================================================
     STATE MANAGEMENT
     ========================================================================== */
  let currentPageIndex = 0; // 0-based index (0 corresponds to Page 1)
  let currentMessageIndex = 0;
  let currentQuestionIndex = 0;
  let currentStoryCardIndex = 0;
  
  // Audio state
  let isMuted = false;
  let audioInitialized = false;

  // Question state
  let questionState = "ask"; // "ask", "transition"

  /* ==========================================================================
     PAGE NAVIGATION ENGINE
     ========================================================================== */
  function showPage(index) {
    if (index < 0 || index >= pages.length) return;
    
    // Fade out current page
    const activePage = pages[currentPageIndex];
    activePage.style.opacity = 0;
    activePage.style.transform = "translateY(-20px) scale(0.95)";
    
    setTimeout(() => {
      activePage.classList.remove("active");
      activePage.classList.add("hidden");
      
      // Prepare next page
      const nextPage = pages[index];
      nextPage.classList.remove("hidden");
      
      // Trigger browser reflow to allow transition to register
      nextPage.offsetHeight; 
      
      nextPage.classList.add("active");
      nextPage.style.opacity = 1;
      nextPage.style.transform = "translateY(0) scale(1)";
      
      currentPageIndex = index;
      updateProgressBar();
      handlePageActivation(index + 1);
    }, 500);
  }

  function updateProgressBar() {
    // Show progress only between pages 2 and 9
    const activePageNum = currentPageIndex + 1;
    if (activePageNum > 1 && activePageNum < 10 && activePageNum !== 7) {
      progressContainer.classList.remove("hidden");
      // Calculate progress percentage
      const percent = Math.round(((activePageNum - 1) / (pages.length - 2)) * 100);
      progressBarFill.style.width = `${percent}%`;
      progressPercent.textContent = `${percent}%`;
    } else {
      progressContainer.classList.add("hidden");
    }
  }

  function handlePageActivation(pageNum) {
    switch (pageNum) {
      case 2:
        currentMessageIndex = 0;
        playTypingAnimation(config.messages[currentMessageIndex]);
        break;
      case 3:
        currentQuestionIndex = 0;
        questionState = "ask";
        loadQuestion(0);
        break;
      case 4:
        currentStoryCardIndex = 0;
        showStoryCard(0);
        break;
      case 6:
        setupAgeChoices();
        break;
      case 7:
        // Huge Birthday Reveal
        birthdayName.textContent = config.name;
        triggerMassiveConfetti();
        // Start floating random balloons in the background
        startRandomBalloons();
        break;
      case 8:
        // Reset Cake scene
        svgKnife.classList.add("hidden");
        svgKnife.classList.remove("anim-cut");
        cakeLeftSlice.classList.remove("slice-left-move");
        cakeRightSlice.classList.remove("slice-right-move");
        cakeSliceLine.style.opacity = "1";
        flames.forEach(f => f.style.opacity = "1");
        cakeStatusMsg.classList.add("hidden");
        cutCakeBtn.classList.remove("hidden");
        cakeContinueBtn.classList.add("hidden");
        break;
      case 10:
        setupFinalLetter();
        break;
    }
  }

  /* ==========================================================================
     PAGE 1: INTRO SURPRISE
     ========================================================================== */
  startBtn.addEventListener("click", () => {
    initAudio();
    musicToggle.classList.remove("hidden");
    showPage(1); // Go to Page 2
  });

  /* ==========================================================================
     PAGE 2: PERSONAL MESSAGES SEQUENCE
     ========================================================================== */
  let typingTimer;
  function playTypingAnimation(text) {
    messageText.textContent = "";
    messageText.classList.remove("finished");
    
    let index = 0;
    clearInterval(typingTimer);
    
    // Format spacing nicely
    const characters = text.split("");
    
    typingTimer = setInterval(() => {
      if (index < characters.length) {
        messageText.textContent += characters[index];
        index++;
      } else {
        clearInterval(typingTimer);
        messageText.classList.add("finished");
      }
    }, 45); // Adjust typing speed
  }

  msgNextBtn.addEventListener("click", () => {
    // If currently typing, click skips to the end
    const activeText = config.messages[currentMessageIndex];
    if (messageText.textContent.length < activeText.length) {
      clearInterval(typingTimer);
      messageText.textContent = activeText;
      messageText.classList.add("finished");
      return;
    }

    currentMessageIndex++;
    if (currentMessageIndex < config.messages.length) {
      playTypingAnimation(config.messages[currentMessageIndex]);
      // Update button text for final message
      if (currentMessageIndex === config.messages.length - 1) {
        msgNextBtn.innerHTML = "Okay... continue ❤️";
      }
    } else {
      // Go to interactive game
      showPage(2);
    }
  });

  /* ==========================================================================
     PAGE 3: INTERACTIVE QUESTION GAME (MOVING NO BUTTON)
     ========================================================================== */
  function loadQuestion(index) {
    if (index < config.questions.length) {
      btnNo.style.position = "static";
      btnNo.style.left = "auto";
      btnNo.style.top = "auto";
      btnNo.style.transform = "none";
      
      questionText.textContent = config.questions[index].text;
      btnYes.textContent = "YES! ❤️";
      btnNo.textContent = "NO 🥺";
      btnNo.style.opacity = "1";
      btnNo.style.pointerEvents = "auto";
      
      msgNextBtn.innerHTML = "Next →"; // reset next button content for reuse
    } else {
      // Transition out of the game
      questionState = "transition";
      questionText.textContent = "Okay... now let's go through our journey ❤️";
      btnYes.textContent = "Let's Go ✨";
      btnNo.style.opacity = "0";
      btnNo.style.pointerEvents = "none";
    }
  }

  // NO Button Teleportation Logic
  function teleportNoButton(e) {
    if (questionState === "transition") return;

    // Trigger reaction toast
    const activeQ = config.questions[currentQuestionIndex];
    const reactions = activeQ.noReactions;
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    
    gameReactionToast.textContent = randomReaction;
    gameReactionToast.classList.remove("hidden");
    gameReactionToast.style.opacity = "1";
    
    // Clear toast after a short delay
    setTimeout(() => {
      gameReactionToast.style.opacity = "0";
    }, 1200);

    // Get container / card bounding rect to keep button confined within card
    const card = btnNo.closest(".glass-card");
    const cardRect = card.getBoundingClientRect();
    
    // Button details
    const btnRect = btnNo.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    
    // Safe padding inside card bounds
    const padding = 15;
    const minX = padding;
    const maxX = cardRect.width - btnWidth - padding;
    const minY = padding + 80; // keep below heading
    const maxY = cardRect.height - btnHeight - padding;

    // Calculate new position relative to the relative card container
    let randomX = Math.random() * (maxX - minX) + minX;
    let randomY = Math.random() * (maxY - minY) + minY;
    
    // Ensure button is set to absolute
    btnNo.style.position = "absolute";
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
  }

  // Intercept cursor/finger hovering or touching NO button
  btnNo.addEventListener("mouseenter", teleportNoButton);
  btnNo.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Stop click emulation
    teleportNoButton(e);
  });
  btnNo.addEventListener("click", (e) => {
    e.preventDefault();
    teleportNoButton(e);
  });

  // YES Button Action
  btnYes.addEventListener("click", () => {
    if (questionState === "ask") {
      // Play brief confetti blast for correct response
      triggerConfettiBurst(btnYes.getBoundingClientRect());
      
      currentQuestionIndex++;
      setTimeout(() => {
        loadQuestion(currentQuestionIndex);
      }, 300);
    } else {
      // Continue to Page 4 (Friendship Journey)
      showPage(3);
    }
  });

  /* ==========================================================================
     PAGE 4: FRIENDSHIP JOURNEY CARDS
     ========================================================================== */
  function renderJourneyCards() {
    storyCardsWrapper.innerHTML = "";
    config.journey.forEach((cardData, idx) => {
      const card = document.createElement("div");
      card.className = `story-card ${idx === 0 ? "active" : ""}`;
      
      // Apply alternate animation styles to cards
      const animations = ["fade", "slide", "zoom", "parallax"];
      const animType = animations[idx % animations.length];
      card.setAttribute("data-anim", animType);
      
      card.innerHTML = `
        <img class="story-card-img" src="${cardData.image}" alt="${cardData.title}" onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop'">
        <div class="story-card-content">
          <span class="story-card-date">${cardData.date}</span>
          <h3 class="story-card-title">${cardData.title}</h3>
          <p class="story-card-desc">${cardData.description}</p>
        </div>
      `;
      storyCardsWrapper.appendChild(card);
    });
  }

  // Run initial render of journey cards
  renderJourneyCards();

  function showStoryCard(idx) {
    const cards = storyCardsWrapper.querySelectorAll(".story-card");
    cards.forEach((card, i) => {
      card.classList.remove("active");
      if (i === idx) {
        card.classList.add("active");
        
        // Add animated offsets based on card attributes
        const anim = card.getAttribute("data-anim");
        if (anim === "slide") {
          card.style.transform = "translateX(50px) scale(0.9)";
          setTimeout(() => { card.style.transform = "translateX(0) scale(1)"; }, 50);
        } else if (anim === "zoom") {
          card.style.transform = "scale(0.8) translateZ(-50px)";
          setTimeout(() => { card.style.transform = "scale(1) translateZ(0)"; }, 50);
        }
      }
    });
  }

  storyNextBtn.addEventListener("click", () => {
    currentStoryCardIndex++;
    const cards = storyCardsWrapper.querySelectorAll(".story-card");
    
    if (currentStoryCardIndex < cards.length) {
      showStoryCard(currentStoryCardIndex);
      
      // Update label on final card
      if (currentStoryCardIndex === cards.length - 1) {
        storyNextBtn.innerHTML = "View Memories 📸";
      }
    } else {
      // Proceed to Page 5 (Memories Photo Gallery)
      showPage(4);
    }
  });

  /* ==========================================================================
     PAGE 5: 10 MEMORIES PHOTO GALLERY
     ========================================================================== */
  function renderGallery() {
    polaroidGrid.innerHTML = "";
    config.memories.forEach((mem, idx) => {
      const item = document.createElement("div");
      item.className = "polaroid-item";
      
      // Set slight random rotation offsets to simulate physical album cards
      const rotation = (Math.random() * 6 - 3).toFixed(1);
      item.style.transform = `rotate(${rotation}deg)`;
      
      item.innerHTML = `
        <div class="polaroid-img-wrapper">
          <img class="polaroid-img" src="${mem.image}" alt="Memory" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop'">
        </div>
        <div class="polaroid-caption">${mem.caption}</div>
      `;
      
      // Lightbox Click Handler
      item.addEventListener("click", () => {
        openLightbox(mem.image, mem.caption);
      });
      
      polaroidGrid.appendChild(item);
    });
  }

  // Initialize Gallery rendering
  renderGallery();

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.remove("hidden");
    lightbox.style.opacity = "1";
  }

  function closeLightbox() {
    lightbox.style.opacity = "0";
    setTimeout(() => {
      lightbox.classList.add("hidden");
      lightboxImg.src = "";
      lightboxCaption.textContent = "";
    }, 300);
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  galleryNextBtn.addEventListener("click", () => {
    showPage(5); // Go to Page 6 (Birthday Age Question)
  });

  /* ==========================================================================
     PAGE 6: BIRTHDAY AGE QUESTION
     ========================================================================== */
  function setupAgeChoices() {
    ageChoicesGrid.innerHTML = "";
    ageFeedback.classList.add("hidden");
    
    config.ageChoices.forEach(choice => {
      const btn = document.createElement("button");
      btn.className = "age-choice-btn";
      btn.textContent = choice;
      
      btn.addEventListener("click", () => {
        // Clear selected states
        document.querySelectorAll(".age-choice-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        
        verifyAge(choice, btn);
      });
      
      ageChoicesGrid.appendChild(btn);
    });
  }

  function verifyAge(chosenAge, btnElement) {
    if (chosenAge === config.age) {
      btnElement.classList.add("correct-choice");
      ageFeedback.textContent = "YESSS! 🎉 You got it!";
      ageFeedback.className = "feedback-msg success";
      ageFeedback.classList.remove("hidden");
      
      triggerConfettiBurst(btnElement.getBoundingClientRect());
      
      // Redirect to Big Reveal page automatically after brief delay
      setTimeout(() => {
        showPage(6); // Page 7
      }, 1500);
    } else {
      // Playful error toast
      const randomHint = config.wrongAgeFeedback[Math.floor(Math.random() * config.wrongAgeFeedback.length)];
      ageFeedback.textContent = randomHint;
      ageFeedback.className = "feedback-msg error";
      ageFeedback.classList.remove("hidden");
      
      // Trigger brief shake animation on choice grid
      ageChoicesGrid.style.animation = "none";
      ageChoicesGrid.offsetHeight; // trigger reflow
      ageChoicesGrid.style.animation = "shake 0.4s ease";
    }
  }

  /* ==========================================================================
     PAGE 7: BIG HAPPY BIRTHDAY REVEAL
     ========================================================================== */
  revealContinueBtn.addEventListener("click", () => {
    showPage(7); // Go to Page 8 (Cake Scene)
  });

  /* ==========================================================================
     PAGE 8 & 9: CAKE SCENE & INTERACTION
     ========================================================================== */
  cutCakeBtn.addEventListener("click", () => {
    // Disable button to prevent spamming animation
    cutCakeBtn.disabled = true;
    
    // Step 1: Knife enters
    svgKnife.classList.remove("hidden");
    svgKnife.classList.add("anim-cut");
    
    // Step 2: Slice cut timing (middle of knife swing)
    setTimeout(() => {
      // Hide dashed guide line
      cakeSliceLine.style.opacity = "0";
      
      // Splitting cake halves
      cakeLeftSlice.classList.add("slice-left-move");
      cakeRightSlice.classList.add("slice-right-move");
      
      // Blow out flames
      flames.forEach(flame => {
        flame.style.transition = "opacity 0.6s ease";
        flame.style.opacity = "0";
      });
      
      // Trigger confetti explosion
      triggerConfettiBurst(cutCakeBtn.getBoundingClientRect());
      triggerMassiveConfetti();
    }, 1200);

    // Step 3: Show Success UI
    setTimeout(() => {
      cakeStatusMsg.classList.remove("hidden");
      cutCakeBtn.classList.add("hidden");
      cakeContinueBtn.classList.remove("hidden");
      cutCakeBtn.disabled = false;
    }, 2200);
  });

  cakeContinueBtn.addEventListener("click", () => {
    showPage(9); // Go to Page 10 (Final Message)
  });

  /* ==========================================================================
     PAGE 10: FINAL MESSAGE & REPLAY
     ========================================================================== */
  let letterTimer;
  function setupFinalLetter() {
    clearInterval(letterTimer);
    finalParagraphs.innerHTML = "";
    finalSignature.textContent = "";
    finalSignature.style.opacity = "0";
    finalSignature.style.transition = "opacity 1.5s ease";
    
    const paragraphElements = [];
    const paragraphWords = [];
    
    config.finalLetter.forEach(text => {
      const p = document.createElement("p");
      finalParagraphs.appendChild(p);
      paragraphElements.push(p);
      paragraphWords.push(text.split(" "));
    });
    
    let currentParaIdx = 0;
    let currentWordIdx = 0;
    
    letterTimer = setInterval(() => {
      if (currentParaIdx < paragraphElements.length) {
        const words = paragraphWords[currentParaIdx];
        const pElement = paragraphElements[currentParaIdx];
        
        if (currentWordIdx < words.length) {
          pElement.textContent += (currentWordIdx === 0 ? "" : " ") + words[currentWordIdx];
          currentWordIdx++;
        } else {
          currentParaIdx++;
          currentWordIdx = 0;
        }
      } else {
        clearInterval(letterTimer);
        finalSignature.textContent = config.signature;
        finalSignature.style.opacity = "1";
      }
    }, 220); // clean, readable word delay
  }

  replayBtn.addEventListener("click", () => {
    clearInterval(letterTimer);
    
    // Reset all game indexes
    currentPageIndex = 0;
    currentMessageIndex = 0;
    currentQuestionIndex = 0;
    currentStoryCardIndex = 0;
    questionState = "ask";
    
    // Reset progress fill and visual layout page views
    progressBarFill.style.width = "0%";
    
    pages.forEach((page, idx) => {
      page.style.opacity = idx === 0 ? "1" : "0";
      page.style.transform = idx === 0 ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)";
      if (idx === 0) {
        page.classList.add("active");
        page.classList.remove("hidden");
      } else {
        page.classList.remove("active");
        page.classList.add("hidden");
      }
    });
  });

  /* ==========================================================================
     AUDIO CONTROLLER
     ========================================================================== */
  function initAudio() {
    if (audioInitialized) return;
    
    // Set fallback source on load error
    bgMusic.addEventListener("error", () => {
      console.warn("Local audio not found or error loading. Playing online acoustic fallback.");
      // Fallback online acoustic guitar Happy Birthday song
      bgMusic.src = "https://www.singing-bell.com/wp-content/uploads/2015/05/Happy-Birthday-to-you-Singing-Bell.mp3";
      bgMusic.load();
      bgMusic.play().then(() => {
        musicToggle.classList.add("playing");
      }).catch(e => console.log("Audio fallback autoplay block", e));
    }, { once: true });

    bgMusic.src = config.audioPath || "./assets/audio/birthday-song.mp3";
    
    // Try play
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        audioInitialized = true;
        musicToggle.classList.add("playing");
      }).catch(err => {
        console.warn("Autoplay blocked by browser policy. Interaction initialized.");
        audioInitialized = true;
      });
    }
  }

  musicToggle.addEventListener("click", () => {
    if (isMuted) {
      bgMusic.muted = false;
      musicToggle.classList.add("playing");
      isMuted = false;
      if (bgMusic.paused) {
        bgMusic.play().catch(e => console.log("Audio resume error", e));
      }
    } else {
      bgMusic.muted = true;
      musicToggle.classList.remove("playing");
      isMuted = true;
    }
  });

  /* ==========================================================================
     CANVAS FLOATING BACKGROUND PARTICLES
     ========================================================================== */
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");
  let particlesArray = [];
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class BackgroundParticle {
    constructor() {
      this.reset();
      // start at random vertical positions initially
      this.y = Math.random() * canvas.height;
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 20;
      this.size = Math.random() * 8 + 4;
      this.speedY = Math.random() * 0.8 + 0.3; // slowly float up
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.2; // slow drift
      
      // Determine shape: 0 = heart, 1 = star, 2 = sparkle
      this.type = Math.floor(Math.random() * 3);
      
      // Soft alpha/opacity matching themes
      this.colorHue = Math.random() > 0.6 ? 340 : 265; // rose or lavender
      this.alpha = Math.random() * 0.4 + 0.15;
    }
    
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      
      // Fade out as it floats high
      if (this.y < 100) {
        this.alpha -= 0.005;
      }
      
      if (this.y < -20 || this.alpha <= 0) {
        this.reset();
      }
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = `hsla(${this.colorHue}, 70%, 75%, ${this.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsla(${this.colorHue}, 70%, 75%, 0.5)`;
      
      if (this.type === 0) {
        // Draw Heart Shape
        const d = this.size;
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.moveTo(0, d / 4);
        ctx.quadraticCurveTo(0, 0, d / 4, 0);
        ctx.quadraticCurveTo(d / 2, 0, d / 2, d / 4);
        ctx.quadraticCurveTo(d / 2, 0, (3 * d) / 4, 0);
        ctx.quadraticCurveTo(d, 0, d, d / 4);
        ctx.quadraticCurveTo(d, d / 2, (3 * d) / 4, (3 * d) / 4);
        ctx.lineTo(d / 2, d);
        ctx.lineTo(d / 4, (3 * d) / 4);
        ctx.quadraticCurveTo(0, d / 2, 0, d / 4);
        ctx.closePath();
        ctx.fill();
      } else if (this.type === 1) {
        // Draw Star Shape
        ctx.beginPath();
        drawStar(ctx, this.x, this.y, 5, this.size, this.size / 2);
        ctx.fill();
      } else {
        // Draw Sparkle (4-point star)
        ctx.beginPath();
        drawStar(ctx, this.x, this.y, 4, this.size, this.size / 4);
        ctx.fill();
      }
      
      ctx.restore();
    }
  }

  function drawStar(context, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    context.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      context.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      context.lineTo(x, y);
      rot += step;
    }
    context.lineTo(cx, cy - outerRadius);
    context.closePath();
  }

  // Populate floating particle arrays
  function initParticles() {
    particlesArray = [];
    const count = 45;
    for (let i = 0; i < count; i++) {
      particlesArray.push(new BackgroundParticle());
    }
  }
  
  initParticles();

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();

  /* ==========================================================================
     CONFETTI BLAST & FLOATING BALLOON UTILITIES
     ========================================================================== */
  
  // Custom DOM-based confetti blast for button clicks/wins
  function triggerConfettiBurst(rect) {
    const parent = document.body;
    const colors = ["#ff4081", "#e040fb", "#3f51b5", "#00bcd4", "#4caf50", "#ffeb3b", "#ff9800"];
    const burstX = rect.left + rect.width / 2;
    const burstY = rect.top + window.scrollY;

    for (let i = 0; i < 40; i++) {
      const conf = document.createElement("div");
      conf.className = "dom-confetti";
      
      // Calculate random trajectories
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 5; // pull slightly upward initially
      
      const size = Math.random() * 8 + 5;
      const rotation = Math.random() * 360;
      
      conf.style.cssText = `
        position: absolute;
        left: ${burstX}px;
        top: ${burstY}px;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        opacity: 1;
        pointer-events: none;
        z-index: 9999;
        border-radius: ${Math.random() > 0.5 ? "50%" : "3px"};
        transform: rotate(${rotation}deg);
      `;
      
      parent.appendChild(conf);

      let currentX = burstX;
      let currentY = burstY;
      let currentVY = vy;
      let opacity = 1;

      // Simple physics frame loop for each confetti piece
      const confTimer = setInterval(() => {
        currentX += vx;
        currentY += currentVY;
        currentVY += 0.3; // gravity
        opacity -= 0.02;

        conf.style.left = `${currentX}px`;
        conf.style.top = `${currentY}px`;
        conf.style.opacity = opacity;

        if (opacity <= 0) {
          clearInterval(confTimer);
          conf.remove();
        }
      }, 20);
    }
  }

  // Trigger continuous fullscreen bursts for Page 7 reveal
  let isMassiveConfettiActive = false;
  function triggerMassiveConfetti() {
    if (isMassiveConfettiActive) return;
    isMassiveConfettiActive = true;
    
    let intervalCount = 0;
    const massiveInterval = setInterval(() => {
      const randX = Math.random() * window.innerWidth;
      const randY = Math.random() * (window.innerHeight * 0.4);
      triggerConfettiBurst({
        left: randX,
        top: randY,
        width: 0,
        height: 0
      });
      
      intervalCount++;
      if (intervalCount > 10) {
        clearInterval(massiveInterval);
        isMassiveConfettiActive = false;
      }
    }, 400);
  }

  // Floating balloons randomly during Big Reveal Page 7
  function startRandomBalloons() {
    const parent = document.body;
    const colors = ["#ec407a", "#ab47bc", "#7e57c2", "#26a69a", "#ffee58", "#ffa726"];
    
    // Spawn 15 balloons
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        if (currentPageIndex !== 6 && currentPageIndex !== 7) return; // only spawn during Page 7 or Page 8 celebration
        
        const bal = document.createElement("div");
        const randColor = colors[Math.floor(Math.random() * colors.length)];
        const randX = Math.random() * 85 + 5; // viewport left percent
        const speed = Math.random() * 10 + 12; // animation float-up speed
        const size = Math.random() * 20 + 35; // balloon width
        
        bal.style.cssText = `
          position: fixed;
          bottom: -100px;
          left: ${randX}vw;
          width: ${size}px;
          height: ${size * 1.25}px;
          border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
          background: ${randColor};
          box-shadow: inset -5px -5px 15px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.15);
          opacity: 0.8;
          z-index: 1;
          pointer-events: none;
          animation: float-up-balloon ${speed}s forwards linear;
        `;
        
        // Add balloon string
        const string = document.createElement("div");
        string.style.cssText = `
          position: absolute;
          bottom: -20px;
          left: 50%;
          width: 2px;
          height: 20px;
          background: rgba(255, 255, 255, 0.4);
        `;
        bal.appendChild(string);

        parent.appendChild(bal);
        
        // Clean up when animation finishes
        setTimeout(() => {
          bal.remove();
        }, speed * 1000);
      }, i * 1500);
    }
  }

});
