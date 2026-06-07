function toggleAudio() {
    const video = document.getElementById('heroVideo');
    const btn = document.getElementById('muteBtn');
    
    if (video.muted) {
        video.muted = false;
        btn.innerText = "🔊";
        btn.style.boxShadow = "0 0 20px var(--accent)";
    } else {
        video.muted = true;
        btn.innerText = "🔇";
        btn.style.boxShadow = "0 0 15px var(--neon-border)";
    }
}

window.addEventListener('load', () => {
    const video = document.getElementById('heroVideo');
    video.play().catch(err => console.log("Autoplay blocked, waiting for user interaction."));
});

function startEliteExperience() {
    const video = document.getElementById('heroVideo');
    const enterOverlay = document.getElementById('enterSite');
    
    video.muted = false;
    video.play().catch(error => {
        console.log("Audio play caught by browser policy, still attempting...");
    });
    
    if (enterOverlay) {
        enterOverlay.style.opacity = '0';
        setTimeout(() => {
            enterOverlay.style.display = 'none';
        }, 500);
    }
    setTheme(document.body.getAttribute('data-theme'));
}

const data = {
    work: {
        title: "MY WORK",
        body: "i make All Type Hacks, <span class='highlight'>Telegram</span> Bots, <span class='highlight'>Web</span> Designing, Video <span class='highlight'>Editing</span>, All Type <span class='highlight'>logo</span>, <span class='highlight'>Animation</span></span></span> <span class='highlight'>Logos</span></span>, all type <span class='highlight'>Banners</span>, <span class='highlight'><span class='highlight'>thumbnails</span>, <span class='highlight'>QR</span> Design</span>."
    },
    hobbies: {
        title: "HOBBIES",
        body: "Intense <span class='highlight'>FREE FIRE Gaming</span> Addict. <span class='highlight'>Video Editing</span> in <span class='highlight'>AE/CC</span>. Developing <span class='highlight'>Hacks</span>. Making <span class='highlight'>Cool TG Bots</span>. <span class='highlight'>Anime Addict</span> (<span class='highlight'>Blue Lock</span>). Constant evolution of <span class='highlight'>Coding Skills</span> in <span class='highlight'>Termux</span>. <span class='highlight'>Python</span> & <span class='highlight'>JavaScript</span>. <span class='highlight'>FF</span> Tournament Player. <span class='highlight'>Automation</span> Lover. <span class='highlight'>Cyber Security</span> Enthusiast. <span class='highlight'>Windows</span> User. <span class='highlight'>Modding</span> & <span class='highlight'>Tweaking</span>."
    },
    friends: {
        title: "FRIEND CIRCLE",
        body: `<div style="display:flex; flex-direction:column; gap:10px;">
            <a href="https://t.me/Lifee_is_XXX" target="_blank" style="color:var(--accent); text-decoration:none; border:1px solid var(--accent); padding:10px; text-align:center;">𝗔𝗘𝗧𝗘𝗥𝗡𝗬𝗫 ⚕</a>
            <a href="https://t.me/K4Gdev" target="_blank" style="color:var(--accent); text-decoration:none; border:1px solid var(--accent); padding:10px; text-align:center;">𓆰𝐊𝟒𝐆֟፝ ㅤᗪΞV</a>
            <a href="https://t.me/Aishi_k77" target="_blank" style="color:var(--accent); text-decoration:none; border:1px solid var(--accent); padding:10px; text-align:center;">Classic Aesthetics</a>
            <a href="https://t.me/HazMatX_02" target="_blank" style="color:var(--accent); text-decoration:none; border:1px solid var(--accent); padding:10px; text-align:center;">Bishes</a>
            <a href="https://t.me/cricketer_8" target="_blank" style="color:var(--accent); text-decoration:none; border:1px solid var(--accent); padding:10px; text-align:center;">Sijan</a>
        </div>`
    }
};

function toggleSidebar() { 
    document.getElementById('sidebar').classList.toggle('active'); 
    document.getElementById('menuBtn').classList.toggle('open');
}

function setTheme(t) {

    const flash = document.getElementById('flash');
    const glitch = document.getElementById('glitch');
    const logo = document.getElementById('heroVideo');

    const logos = {
        isagi: "isagi.jpg",
        barou: "barou.jpg",
        bachira: "bachira.jpg",
        nagi: "nagi.jpg",
        rin: "rin.jpg",
        shidou: "shidou.jpg"
    };

    flash.style.animation = 'flash-anim 0.4s ease-out';
    glitch.style.display = 'block';

    document.getElementById('gearBtn').style.transform = 'rotate(180deg)';

    setTimeout(() => {

        document.body.setAttribute('data-theme', t);

        // CHANGE LOGO
        logo.src = logos[t];

        document.getElementById('tMenu').classList.remove('active');
        document.getElementById('gearBtn').style.transform = 'rotate(0deg)';

    }, 100);

    setTimeout(() => {
        flash.style.animation = '';
        glitch.style.display = 'none';
    }, 400);
}
let typingTimer;
function openModal(type) {
    const mTitle = document.getElementById('modalTitle'), mBody = document.getElementById('modalBody');
    clearTimeout(typingTimer);
    mTitle.innerText = data[type].title;
    mBody.innerHTML = '';
    document.getElementById('modalOverlay').style.display = 'flex';
    let i = 0, text = data[type].body;
    function typeWriter() {
        if (i < text.length) {
            if (text.charAt(i) === '<') i = text.indexOf('>', i) + 1; else i++;
            mBody.innerHTML = text.substring(0, i) + '<span class="cursor">|</span>';
            typingTimer = setTimeout(typeWriter, 15);
        } else { mBody.innerHTML = text; }
    }
    typeWriter();
}
function closeModal() { document.getElementById('modalOverlay').style.display = 'none'; }

// --- FX CANVAS SYSTEM ENGINE ---
const fC = document.getElementById('fireCanvas'), lC = document.getElementById('lightningCanvas'), mC = document.getElementById('metaCanvas');
const fX = fC.getContext('2d'), lX = lC.getContext('2d'), mX = mC.getContext('2d');
let w, h, particles = [], fragments = [];

function initFX() {
    w = fC.width = lC.width = mC.width = window.innerWidth;
    h = fC.height = lC.height = mC.height = window.innerHeight;
}

function getAccent() { return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(); }

class Particle {
    constructor() { this.reset(); }
    reset() { this.x = Math.random() * w; this.y = h + 20; this.size = Math.random() * 2; this.speedY = Math.random() * 1 + 0.5; this.opacity = Math.random() * 0.5; }
    update() { this.y -= this.speedY; this.opacity -= 0.002; if (this.opacity <= 0 || this.y < -20) this.reset(); }
    draw() { fX.beginPath(); fX.arc(this.x, this.y, this.size, 0, Math.PI * 2); fX.fillStyle = getAccent(); fX.globalAlpha = this.opacity; fX.fill(); }
}

class Fragment {
    constructor() { this.reset(); }
    reset() { this.x = Math.random() * w; this.y = Math.random() * h; this.size = Math.random() * 15 + 5; this.sX = (Math.random() - 0.5) * 0.4; this.sY = (Math.random() - 0.5) * 0.4; this.a = Math.random() * Math.PI * 2; }
    update() { this.x += this.sX; this.y += this.sY; this.a += 0.01; if(this.x<0 || this.x>w) this.reset(); if(this.y<0 || this.y>h) this.reset(); }
    draw() { mX.save(); mX.translate(this.x, this.y); mX.rotate(this.a); mX.strokeStyle = getAccent(); mX.lineWidth = 1; mX.beginPath(); for(let i=0; i<6; i++) { mX.lineTo(this.size * Math.cos(i * Math.PI / 3), this.size * Math.sin(i * Math.PI / 3)); } mX.closePath(); mX.stroke(); mX.restore(); }
}

function create() {
    particles = []; fragments = [];
    for(let i=0; i<45; i++) particles.push(new Particle());
    for(let i=0; i<18; i++) fragments.push(new Fragment());
}

function loop() {
    fX.clearRect(0, 0, w, h); 
    lX.clearRect(0, 0, w, h); 
    mX.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    fragments.forEach(f => { f.update(); f.draw(); });
    if (Math.random() > 0.982) {
        lX.strokeStyle = getAccent(); 
        lX.lineWidth = 2; 
        lX.beginPath();
        let lx = Math.random() * w; 
        lX.moveTo(lx, 0);
        for (let i = 0; i < 10; i++) { 
            lx += (Math.random() - 0.5) * 90; 
            lX.lineTo(lx, (h / 10) * i); 
        }
        lX.stroke();
        lX.fillStyle = getAccent(); 
        lX.globalAlpha = 0.05; 
        lX.fillRect(0,0,w,h); 
        lX.globalAlpha = 1.0;
    }
    requestAnimationFrame(loop);
}

window.onresize = () => { initFX(); create(); };
initFX(); create(); loop();
