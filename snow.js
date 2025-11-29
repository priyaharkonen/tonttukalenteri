(function () {
    const canvas = document.createElement("canvas");
    canvas.className = "snow-canvas";
    canvas.style.position = "fixed";
    canvas.style.left = "0";
    canvas.style.top = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);
  
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    function resize() {
      const ratio = window.devicePixelRatio || 1;
      w = canvas.width = Math.floor(window.innerWidth * ratio);
      h = canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    window.addEventListener("resize", resize);
    resize();
  
    class Flake {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * w;
        this.y = initial ? Math.random() * h : -10 - Math.random() * 100;
        this.size = 1 + Math.random() * 5;
        this.speedY = 30 + Math.random() * 80; // px/s
        this.speedX = -15 + Math.random() * 30; // drift px/s
        this.opacity = 0.2 + Math.random() * 0.8;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 1.0;
      }
      update(dt, wind) {
        this.x += (this.speedX + wind) * dt;
        this.y += this.speedY * dt;
        this.rotation += this.rotationSpeed * dt;
        if (this.y > h + 20 || this.x < -80 || this.x > w + 80) {
          this.reset(false);
        }
      }
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "#ffffff";
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  
    const flakes = [];
  
    // Параметры наложения: частота создания снежинок (flakes/sec)
    let spawnRate = 0.6;
    const RARE = 0.2;
    const MODERATE = 0.6;
    const HEAVY = 3.0;
  
    function setPhase(rate) {
      spawnRate = rate;
    }
  
    function spawn(dt) {
      const expected = spawnRate * dt;
      const fixed = Math.floor(expected);
      for (let i = 0; i < fixed; i++) flakes.push(new Flake());
      if (Math.random() < (expected - fixed)) flakes.push(new Flake());
      const max = 600;
      if (flakes.length > max) flakes.splice(0, flakes.length - max);
    }
  
    function createBurst(n) {
      for (let i = 0; i < n; i++) flakes.push(new Flake());
    }
  
    function windAt(time) {
      return Math.sin(time * 0.0006) * 20;
    }
  
    let last = performance.now();
    function loop(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
  
      ctx.clearRect(0, 0, w, h);
  
      spawn(dt);
  
      const wind = windAt(now);
      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.update(dt, wind);
        f.draw(ctx);
      }
  
      requestAnimationFrame(loop);
    }
  
    function start() {
      last = performance.now();
      requestAnimationFrame(loop);
    }
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) start();
    });
  
    // Сцена при загрузке: маленький стартовый "всплеск", затем 3 сек сильного снега, потом умеренно
    createBurst(30); // видимый стартовый всплеск
    setPhase(HEAVY);
    setTimeout(() => {
      setPhase(MODERATE);
    }, 3000);
  
    window.SnowEffect = {
      setRare: () => setPhase(RARE),
      setModerate: () => setPhase(MODERATE),
      setHeavy: () => setPhase(HEAVY),
      burst: (n = 20) => createBurst(n),
    };
  
    start();
  })();