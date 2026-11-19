(() => {
  'use strict';

  // ---------- COLOR PRESETS REPOSITORY ----------
  const PRESETS = [
    {
      id: 'natural',
      name: 'Realistic Natural',
      desc: 'Balanced lifelike skin, foliage, and sky tones',
      gradient: 'linear-gradient(90deg, #181d2a, #c88967, #fef4e8)',
      shadows: [24, 28, 42],
      midtones: [200, 142, 103],
      highlights: [255, 244, 230],
      temp: 8,
      tint: 2,
      vibrance: 12,
      contrast: 105
    },
    {
      id: 'portrait',
      name: 'Warm Portrait',
      desc: 'Radiant healthy skin tones with glowing warmth',
      gradient: 'linear-gradient(90deg, #24181f, #dca07e, #fff0e2)',
      shadows: [35, 24, 28],
      midtones: [220, 160, 126],
      highlights: [255, 242, 226],
      temp: 18,
      tint: 6,
      vibrance: 15,
      contrast: 102
    },
    {
      id: 'technicolor',
      name: 'Vintage Technicolor',
      desc: '1940s 3-strip Hollywood film process separation',
      gradient: 'linear-gradient(90deg, #122238, #d48259, #ffe8c2)',
      shadows: [18, 34, 56],
      midtones: [212, 130, 89],
      highlights: [255, 232, 194],
      temp: 14,
      tint: -4,
      vibrance: 25,
      contrast: 112
    },
    {
      id: 'kodachrome',
      name: 'Kodachrome 64',
      desc: 'Legendary punchy contrast and iconic retro primaries',
      gradient: 'linear-gradient(90deg, #1b1e2a, #cf7450, #fcf1d8)',
      shadows: [22, 26, 38],
      midtones: [215, 116, 80],
      highlights: [255, 241, 216],
      temp: 12,
      tint: 0,
      vibrance: 20,
      contrast: 115
    },
    {
      id: 'nature',
      name: 'Alpine & Nature',
      desc: 'Fresh pine greens, cyan mountain air, earthy soil',
      gradient: 'linear-gradient(90deg, #16241a, #6ea860, #b2dcff)',
      shadows: [22, 36, 26],
      midtones: [110, 168, 96],
      highlights: [178, 220, 255],
      temp: -8,
      tint: -12,
      vibrance: 22,
      contrast: 106
    },
    {
      id: 'teal_orange',
      name: 'Teal & Orange',
      desc: 'Cinematic blockbuster cool shadows & amber highlights',
      gradient: 'linear-gradient(90deg, #0e303d, #cf824d, #fed19d)',
      shadows: [14, 48, 62],
      midtones: [207, 130, 77],
      highlights: [254, 209, 157],
      temp: 16,
      tint: -6,
      vibrance: 28,
      contrast: 114
    },
    {
      id: 'sunset',
      name: 'Golden Hour',
      desc: 'Rich amber sunset glow with deep purple twilight',
      gradient: 'linear-gradient(90deg, #2f1738, #ea8a3c, #ffe18c)',
      shadows: [47, 23, 56],
      midtones: [234, 138, 60],
      highlights: [255, 225, 140],
      temp: 26,
      tint: 10,
      vibrance: 24,
      contrast: 108
    },
    {
      id: 'cyberpunk',
      name: 'Neon Dusk',
      desc: 'Electric cybernetic cyan and magenta split tones',
      gradient: 'linear-gradient(90deg, #3d0c4d, #a229a2, #29efff)',
      shadows: [61, 12, 77],
      midtones: [162, 41, 162],
      highlights: [41, 239, 255],
      temp: -10,
      tint: 30,
      vibrance: 35,
      contrast: 118
    },
    {
      id: 'sepia',
      name: 'Classic Sepia',
      desc: 'Warm silver gelatin archival photographic toner',
      gradient: 'linear-gradient(90deg, #2b1d12, #ba8c5f, #fdf0db)',
      shadows: [43, 29, 18],
      midtones: [186, 140, 95],
      highlights: [253, 240, 219],
      temp: 22,
      tint: 4,
      vibrance: -10,
      contrast: 102
    },
    {
      id: 'pastel',
      name: 'Pastel Dream',
      desc: 'Muted delicate aesthetic with ethereal soft tones',
      gradient: 'linear-gradient(90deg, #2b2533, #c5a3b2, #f5f0f8)',
      shadows: [43, 37, 51],
      midtones: [197, 163, 178],
      highlights: [245, 240, 248],
      temp: -4,
      tint: 8,
      vibrance: -5,
      contrast: 96
    }
  ];

  // Realistic Color Swatches for Manual Brush Painting
  const BRUSH_SWATCHES = [
    { label: 'Fair Skin', color: '#f5c6ad' },
    { label: 'Warm Skin', color: '#e29e71' },
    { label: 'Olive Skin', color: '#b87b55' },
    { label: 'Deep Skin', color: '#7a482b' },
    { label: 'Lip Rose', color: '#cc4358' },
    { label: 'Sky Azure', color: '#4a90e2' },
    { label: 'Foliage', color: '#4a853d' },
    { label: 'Forest', color: '#2d5e2e' },
    { label: 'Denim', color: '#33588a' },
    { label: 'Gold', color: '#f2a900' }
  ];

  // ---------- STATE ----------
  const state = {
    originalImage: null,        // HTMLImageElement
    originalImageData: null,    // Base ImageData (never mutated)
    originalWidth: 0,
    originalHeight: 0,
    fileName: '',
    fileSize: 0,

    activePresetId: 'natural',

    settings: {
      R: { intensity: 100, enabled: true },
      G: { intensity: 100, enabled: true },
      B: { intensity: 100, enabled: true },
      master: 100,
      temperature: 8,
      tint: 2,
      vibrance: 12,
      saturation: 100,
      brightness: 100,
      contrast: 105,
      exposure: 0,
      hue: 0,
      sharpness: 0,
      vignette: 0
    },

    // Brush Tool
    brush: {
      mode: 'paint', // 'paint' | 'erase'
      color: '#e29e71',
      size: 28,
      opacity: 0.75,
      softness: 0.7,
      isPainting: false,
      lastX: 0,
      lastY: 0
    },

    // Viewport Zoom & Pan
    viewport: {
      zoom: 1.0,
      panX: 0,
      panY: 0,
      isPanning: false,
      startX: 0,
      startY: 0
    },

    // Compare Mode
    compare: {
      active: false,
      pos: 50,
      dragging: false,
      peeking: false
    },

    // Export Options
    exportFormat: 'png',
    exportQuality: 0.92,
    exportQualityTier: 'hd', // 'sd' | 'hd'
    gifMode: 'static',       // 'static' | 'loop'

    // Undo / Redo Stacks
    history: [],
    historyIndex: -1,
    paintHistory: [],
    paintHistoryIndex: -1
  };

  // ---------- DOM REFERENCES ----------
  const $ = (id) => document.getElementById(id);
  const mainCanvas = $('mainCanvas');
  const mainCtx = mainCanvas.getContext('2d', { willReadFrequently: true });
  const paintCanvas = $('paintCanvas');
  const paintCtx = paintCanvas.getContext('2d');
  const curtainCanvas = $('curtainCanvas');
  const curtainCtx = curtainCanvas.getContext('2d');
  const curtainOverlay = $('curtainOverlay');
  const curtainOriginal = $('curtainOriginal');
  const curtainHandle = $('curtainHandle');

  const canvasViewport = $('canvasViewport');
  const stageTransform = $('stageTransform');
  const canvasContainer = $('canvasContainer');
  const emptyState = $('emptyState');
  const canvasHud = $('canvasHud');
  const infoBar = $('infoBar');
  const loader = $('loader');
  const loaderText = $('loaderText');
  const toast = $('toast');
  const fileInput = $('fileInput');
  const brushCursor = $('brushCursor');

  // Offscreen Paint Canvas Buffer (Holds original full-resolution paint strokes)
  let paintBuffer = document.createElement('canvas');
  let paintBufferCtx = paintBuffer.getContext('2d');

  // ---------- UTILITIES ----------
  function showToast(msg, type = '') {
    toast.textContent = msg;
    toast.className = 'toast show ' + type;
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      toast.className = 'toast ' + type;
    }, 2400);
  }

  function showLoader(show, text = 'Processing…') {
    loaderText.textContent = text;
    loader.classList.toggle('active', show);
  }

  function formatBytes(bytes) {
    if (!bytes) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function setNestedSetting(path, val) {
    const parts = path.split('.');
    let curr = state.settings;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!curr[parts[i]]) curr[parts[i]] = {};
      curr = curr[parts[i]];
    }
    curr[parts[parts.length - 1]] = val;
  }

  function getNestedSetting(path) {
    const parts = path.split('.');
    let curr = state.settings;
    for (let i = 0; i < parts.length; i++) {
      if (curr === undefined || curr === null) return undefined;
      curr = curr[parts[i]];
    }
    return curr;
  }

  // ---------- PRESET ENGINE ----------
  function initPresetsUI() {
    const grid = $('presetsGrid');
    grid.innerHTML = '';
    PRESETS.forEach(p => {
      const card = document.createElement('button');
      card.className = `preset-card ${p.id === state.activePresetId ? 'active' : ''}`;
      card.dataset.presetId = p.id;
      card.innerHTML = `
        <div class="preset-gradient-strip" style="background:${p.gradient};"></div>
        <div class="preset-info">
          <div class="preset-name">${p.name}</div>
          <div class="preset-desc">${p.desc}</div>
        </div>
      `;
      card.addEventListener('click', () => applyPreset(p.id));
      grid.appendChild(card);
    });
  }

  function applyPreset(presetId) {
    const p = PRESETS.find(item => item.id === presetId);
    if (!p) return;
    state.activePresetId = p.id;

    // Apply preset attributes
    state.settings.temperature = p.temp;
    state.settings.tint = p.tint;
    state.settings.vibrance = p.vibrance;
    state.settings.contrast = p.contrast;

    // Update UI controls
    $('sliderTemp').value = p.temp; $('valTemp').textContent = (p.temp > 0 ? '+' : '') + p.temp;
    $('sliderTint').value = p.tint; $('valTint').textContent = (p.tint > 0 ? '+' : '') + p.tint;
    $('sliderVibrance').value = p.vibrance; $('valVibrance').textContent = p.vibrance + '%';
    $('sliderContrast').value = p.contrast; $('valContrast').textContent = p.contrast + '%';

    document.querySelectorAll('.preset-card').forEach(c => {
      c.classList.toggle('active', c.dataset.presetId === p.id);
    });

    saveHistoryState();
    scheduleRender();
    showToast(`Applied preset: ${p.name}`);
  }

  // ---------- BRUSH PALETTE UI ----------
  function initBrushUI() {
    const grid = $('swatchesGrid');
    grid.innerHTML = '';
    BRUSH_SWATCHES.forEach((s, idx) => {
      const btn = document.createElement('button');
      btn.className = `swatch-btn ${s.color.toLowerCase() === state.brush.color.toLowerCase() ? 'active' : ''}`;
      btn.style.backgroundColor = s.color;
      btn.title = s.label;
      btn.addEventListener('click', () => {
        setBrushColor(s.color);
      });
      grid.appendChild(btn);
    });

    $('customColorPicker').addEventListener('input', (e) => {
      setBrushColor(e.target.value);
    });

    $('btnModePaint').addEventListener('click', () => {
      state.brush.mode = 'paint';
      $('btnModePaint').classList.add('active');
      $('btnModeErase').classList.remove('active');
      updateCursorPreview();
    });

    $('btnModeErase').addEventListener('click', () => {
      state.brush.mode = 'erase';
      $('btnModeErase').classList.add('active');
      $('btnModePaint').classList.remove('active');
      updateCursorPreview();
    });

    $('sliderBrushSize').addEventListener('input', (e) => {
      state.brush.size = parseInt(e.target.value);
      $('valBrushSize').textContent = `${state.brush.size} px`;
      updateCursorPreview();
    });

    $('sliderBrushOpacity').addEventListener('input', (e) => {
      state.brush.opacity = parseInt(e.target.value) / 100;
      $('valBrushOpacity').textContent = `${e.target.value}%`;
    });

    $('sliderBrushSoftness').addEventListener('input', (e) => {
      state.brush.softness = parseInt(e.target.value) / 100;
      $('valBrushSoftness').textContent = `${e.target.value}%`;
    });

    $('btnUndoPaint').addEventListener('click', undoPaintStroke);
    $('btnClearPaint').addEventListener('click', clearPaintLayer);
  }

  function setBrushColor(color) {
    state.brush.color = color;
    $('customColorPicker').value = color;
    $('customColorHex').textContent = color.toUpperCase();
    document.querySelectorAll('.swatch-btn').forEach(b => {
      b.classList.toggle('active', b.style.backgroundColor === color || b.title.toLowerCase() === color.toLowerCase());
    });
    updateCursorPreview();
  }

  // ---------- IMAGE IMPORT ENGINE ----------
  function importImage(file) {
    if (!file) return;
    const isImg = (file.type && file.type.startsWith('image/')) || /\.(jpe?g|png|gif|webp|bmp|svg|ico|tiff?)$/i.test(file.name || '');
    if (!isImg) {
      showToast('Please select a valid image file', 'error');
      return;
    }
    showLoader(true, 'Importing photo…');
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          setupLoadedImage(img, file.name, file.size);
          showToast('Image loaded successfully', 'success');
        } catch (err) {
          console.error(err);
          showToast('Failed to initialize image: ' + err.message, 'error');
        } finally {
          showLoader(false);
        }
      };
      img.onerror = () => {
        showLoader(false);
        showToast('Could not decode image', 'error');
      };
      img.src = e.target.result;
    };
    reader.onerror = () => {
      showLoader(false);
      showToast('Failed to read file', 'error');
    };
    reader.readAsDataURL(file);
  }

  function setupLoadedImage(img, fileName, fileSize) {
    state.originalImage = img;
    state.originalWidth = img.naturalWidth || img.width;
    state.originalHeight = img.naturalHeight || img.height;
    state.fileName = fileName || 'photo.png';
    state.fileSize = fileSize || 0;

    // Capture unadulterated source pixels (RGBA)
    const tmp = document.createElement('canvas');
    tmp.width = state.originalWidth;
    tmp.height = state.originalHeight;
    const tctx = tmp.getContext('2d');
    tctx.drawImage(img, 0, 0);
    state.originalImageData = tctx.getImageData(0, 0, tmp.width, tmp.height);

    // Initialize paint buffer canvas at original resolution
    paintBuffer.width = state.originalWidth;
    paintBuffer.height = state.originalHeight;
    paintBufferCtx.clearRect(0, 0, paintBuffer.width, paintBuffer.height);

    // Reset paint history
    state.paintHistory = [paintBufferCtx.getImageData(0, 0, paintBuffer.width, paintBuffer.height)];
    state.paintHistoryIndex = 0;

    // Set preview canvases
    fitToViewport();

    // Show workspace UI
    emptyState.style.display = 'none';
    canvasContainer.style.display = 'block';
    canvasHud.style.display = 'flex';
    infoBar.style.display = 'flex';

    $('infoDimensions').textContent = `${state.originalWidth} × ${state.originalHeight}`;
    $('infoFileSize').textContent = formatBytes(state.fileSize);
    $('exportResVal').textContent = `${state.originalWidth} × ${state.originalHeight} px`;

    // Render pipeline
    scheduleRender();
    updateExportUI();
  }

  // ---------- PROCEDURAL SAMPLE IMAGES ----------
  function loadSample(type) {
    showLoader(true, 'Generating demo photo…');
    setTimeout(() => {
      const w = 900;
      const h = 675;
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');

      if (type === 'portrait') {
        // Classic Studio Portrait
        const bgGrad = ctx.createRadialGradient(w * 0.5, h * 0.45, 40, w * 0.5, h * 0.45, w * 0.6);
        bgGrad.addColorStop(0, '#555');
        bgGrad.addColorStop(0.6, '#282828');
        bgGrad.addColorStop(1, '#0e0e0e');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // Body / Shoulders
        ctx.fillStyle = '#1c1c1c';
        ctx.beginPath();
        ctx.ellipse(w * 0.5, h * 0.95, w * 0.35, h * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();

        // Neck
        ctx.fillStyle = '#6e6e6e';
        ctx.fillRect(w * 0.45, h * 0.55, w * 0.1, h * 0.16);

        // Head
        ctx.fillStyle = '#9e9e9e';
        ctx.beginPath();
        ctx.ellipse(w * 0.5, h * 0.42, w * 0.14, h * 0.19, 0, 0, Math.PI * 2);
        ctx.fill();

        // Hair
        ctx.fillStyle = '#181818';
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.36, w * 0.15, Math.PI, Math.PI * 2);
        ctx.fill();

        // Eyes & Eyebrows
        ctx.fillStyle = '#222';
        ctx.fillRect(w * 0.43, h * 0.4, 18, 5);
        ctx.fillRect(w * 0.53, h * 0.4, 18, 5);

        // Lips
        ctx.fillStyle = '#6b6b6b';
        ctx.beginPath();
        ctx.ellipse(w * 0.5, h * 0.52, 16, 7, 0, 0, Math.PI * 2);
        ctx.fill();

      } else if (type === 'nature') {
        // Alpine Lake & Mountain
        // Sky
        const sky = ctx.createLinearGradient(0, 0, 0, h * 0.5);
        sky.addColorStop(0, '#333');
        sky.addColorStop(1, '#b0b0b0');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, w, h * 0.55);

        // Mountain Peak
        ctx.fillStyle = '#555';
        ctx.beginPath();
        ctx.moveTo(w * 0.1, h * 0.55);
        ctx.lineTo(w * 0.45, h * 0.15);
        ctx.lineTo(w * 0.8, h * 0.55);
        ctx.fill();

        // Mountain Snow Highlight
        ctx.fillStyle = '#e8e8e8';
        ctx.beginPath();
        ctx.moveTo(w * 0.45, h * 0.15);
        ctx.lineTo(w * 0.4, h * 0.28);
        ctx.lineTo(w * 0.45, h * 0.25);
        ctx.lineTo(w * 0.52, h * 0.32);
        ctx.fill();

        // Foreground Pine Trees
        ctx.fillStyle = '#202020';
        for (let x = 0; x < w; x += 30) {
          ctx.beginPath();
          ctx.moveTo(x, h * 0.6);
          ctx.lineTo(x + 15, h * 0.45 + (x % 25));
          ctx.lineTo(x + 30, h * 0.6);
          ctx.fill();
        }

        // Lake
        const lake = ctx.createLinearGradient(0, h * 0.6, 0, h);
        lake.addColorStop(0, '#444');
        lake.addColorStop(1, '#1a1a1a');
        ctx.fillStyle = lake;
        ctx.fillRect(0, h * 0.6, w, h * 0.4);

      } else {
        // Historic Street Scene
        const streetSky = ctx.createLinearGradient(0, 0, 0, h * 0.4);
        streetSky.addColorStop(0, '#444');
        streetSky.addColorStop(1, '#999');
        ctx.fillStyle = streetSky;
        ctx.fillRect(0, 0, w, h * 0.45);

        // Classic Building Facades
        ctx.fillStyle = '#3a3a3a';
        ctx.fillRect(0, h * 0.15, w * 0.35, h * 0.55);
        ctx.fillStyle = '#505050';
        ctx.fillRect(w * 0.65, h * 0.2, w * 0.35, h * 0.5);

        // Windows
        ctx.fillStyle = '#1e1e1e';
        for (let r = 0; r < 3; r++) {
          ctx.fillRect(w * 0.08, h * 0.22 + r * 50, 35, 30);
          ctx.fillRect(w * 0.20, h * 0.22 + r * 50, 35, 30);
          ctx.fillRect(w * 0.72, h * 0.26 + r * 50, 35, 30);
        }

        // Cobblestone Street
        const ground = ctx.createLinearGradient(0, h * 0.7, 0, h);
        ground.addColorStop(0, '#2d2d2d');
        ground.addColorStop(1, '#151515');
        ctx.fillStyle = ground;
        ctx.fillRect(0, h * 0.7, w, h * 0.3);

        // Streetlamp
        ctx.fillStyle = '#111';
        ctx.fillRect(w * 0.45, h * 0.45, 6, h * 0.35);
        ctx.fillStyle = '#e0e0e0';
        ctx.beginPath();
        ctx.arc(w * 0.45 + 3, h * 0.44, 12, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add gentle photographic film grain
      const idata = ctx.getImageData(0, 0, w, h);
      const d = idata.data;
      for (let i = 0; i < d.length; i += 4) {
        const noise = (Math.random() - 0.5) * 16;
        d[i] = clamp(d[i] + noise, 0, 255);
        d[i + 1] = clamp(d[i + 1] + noise, 0, 255);
        d[i + 2] = clamp(d[i + 2] + noise, 0, 255);
      }
      ctx.putImageData(idata, 0, 0);

      const demoImg = new Image();
      demoImg.onload = () => {
        setupLoadedImage(demoImg, `${type}_sample.png`, 480000);
        showLoader(false);
        showToast(`Loaded ${type} demo photo`, 'success');
      };
      demoImg.src = c.toDataURL('image/png');
    }, 100);
  }

  // ---------- VIEWPORT FIT & TRANSFORM ----------
  function fitToViewport() {
    if (!state.originalWidth) return;
    const vpRect = canvasViewport.getBoundingClientRect();
    const pad = 40;
    const maxW = Math.max(100, vpRect.width - pad);
    const maxH = Math.max(100, vpRect.height - pad);
    const ratio = Math.min(maxW / state.originalWidth, maxH / state.originalHeight, 1.0);

    const w = Math.round(state.originalWidth * ratio);
    const h = Math.round(state.originalHeight * ratio);

    mainCanvas.width = w;
    mainCanvas.height = h;
    paintCanvas.width = w;
    paintCanvas.height = h;
    curtainCanvas.width = w;
    curtainCanvas.height = h;

    state.viewport.zoom = 1.0;
    state.viewport.panX = 0;
    state.viewport.panY = 0;

    applyViewportTransform();
    updateZoomHUD();
  }

  function applyViewportTransform() {
    stageTransform.style.transform = `translate(${state.viewport.panX}px, ${state.viewport.panY}px) scale(${state.viewport.zoom})`;
  }

  function updateZoomHUD() {
    $('hudZoomVal').textContent = `${Math.round(state.viewport.zoom * 100)}%`;
  }

  function setZoom(newZoom, centerX, centerY) {
    const minZoom = 0.25;
    const maxZoom = 5.0;
    const clamped = clamp(newZoom, minZoom, maxZoom);

    if (centerX !== undefined && centerY !== undefined) {
      // Zoom centered on cursor
      const ratio = clamped / state.viewport.zoom;
      state.viewport.panX = centerX - (centerX - state.viewport.panX) * ratio;
      state.viewport.panY = centerY - (centerY - state.viewport.panY) * ratio;
    }

    state.viewport.zoom = clamped;
    applyViewportTransform();
    updateZoomHUD();
  }

  // ---------- CORE COLORIZATION RENDERING PIPELINE ----------
  let renderDebounce = false;
  function scheduleRender() {
    if (renderDebounce) return;
    renderDebounce = true;
    requestAnimationFrame(() => {
      renderDebounce = false;
      executeRender();
    });
  }

  function executeRender() {
    if (!state.originalImageData) return;

    const w = mainCanvas.width;
    const h = mainCanvas.height;
    if (w === 0 || h === 0) return;

    // Render colorized base onto mainCanvas
    renderColorizedBuffer(mainCtx, w, h);

    // Overlay paint brush layer with 'color' composite mode
    if (paintBuffer.width > 0) {
      mainCtx.save();
      mainCtx.globalCompositeOperation = 'color';
      mainCtx.drawImage(paintBuffer, 0, 0, w, h);
      mainCtx.restore();
    }

    // If Peek mode is held, draw pure original
    if (state.compare.peeking) {
      mainCtx.drawImage(state.originalImage, 0, 0, w, h);
    }

    // If Compare mode active, update curtain
    if (state.compare.active) {
      updateCurtain();
    }
  }

  // Master Color Rendering Routine: Non-destructive, high-fidelity
  function renderColorizedBuffer(targetCtx, targetW, targetH) {
    const src = state.originalImageData;
    const origW = state.originalWidth;
    const origH = state.originalHeight;

    // Work on full-res work buffer or downscaled preview
    const workCanvas = document.createElement('canvas');
    workCanvas.width = targetW;
    workCanvas.height = targetH;
    const wctx = workCanvas.getContext('2d');

    // Downscale source to target resolution cleanly
    const scaleCanvas = document.createElement('canvas');
    scaleCanvas.width = targetW;
    scaleCanvas.height = targetH;
    const sctx = scaleCanvas.getContext('2d');
    sctx.drawImage(state.originalImage, 0, 0, targetW, targetH);
    const scaledData = sctx.getImageData(0, 0, targetW, targetH);
    const sd = scaledData.data;

    const outData = wctx.createImageData(targetW, targetH);
    const dd = outData.data;

    // Current Preset Anchors
    const activePreset = PRESETS.find(p => p.id === state.activePresetId) || PRESETS[0];
    const shR = activePreset.shadows[0], shG = activePreset.shadows[1], shB = activePreset.shadows[2];
    const midR = activePreset.midtones[0], midG = activePreset.midtones[1], midB = activePreset.midtones[2];
    const hiR = activePreset.highlights[0], hiG = activePreset.highlights[1], hiB = activePreset.highlights[2];

    // Settings Parameters
    const sR = state.settings.R;
    const sG = state.settings.G;
    const sB = state.settings.B;
    const masterMul = state.settings.master / 100;

    const rMul = (sR.enabled ? sR.intensity / 100 : 0) * masterMul;
    const gMul = (sG.enabled ? sG.intensity / 100 : 0) * masterMul;
    const bMul = (sB.enabled ? sB.intensity / 100 : 0) * masterMul;

    const temp = state.settings.temperature;
    const tint = state.settings.tint;
    const vibrance = state.settings.vibrance / 100;
    const saturation = state.settings.saturation / 100;
    const brightness = state.settings.brightness / 100;
    const contrast = state.settings.contrast / 100;
    const exposure = state.settings.exposure;
    const hueAngle = state.settings.hue;
    const vignette = state.settings.vignette / 100;

    // Fixed Standard Contrast Factor: At 100% (1.0), factor is 1.0 (no distortion)
    const cFactor = contrast < 1.0 ? contrast : 1.0 + (contrast - 1.0) * 1.4;

    const centerX = targetW / 2;
    const centerY = targetH / 2;
    const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

    // Pixel Processing Loop
    for (let i = 0; i < sd.length; i += 4) {
      // 1. Precise Grayscale Luminance
      const gray = 0.299 * sd[i] + 0.587 * sd[i + 1] + 0.114 * sd[i + 2];
      const normY = gray / 255;

      // 2. Multi-Zone Tonal Interpolation
      let baseR, baseG, baseB;
      if (normY < 0.5) {
        const u = normY / 0.5;
        baseR = (shR + (midR - shR) * u) * (normY * 2.0);
        baseG = (shG + (midG - shG) * u) * (normY * 2.0);
        baseB = (shB + (midB - shB) * u) * (normY * 2.0);
      } else {
        const u = (normY - 0.5) / 0.5;
        baseR = midR + (hiR - midR) * u;
        baseG = midG + (hiG - midG) * u;
        baseB = midB + (hiB - midB) * u;
      }

      // 3. RGB Channel Multipliers
      let r = baseR * rMul;
      let g = baseG * gMul;
      let b = baseB * bMul;

      // 4. Color Temperature (Cool/Warm) & Tint (Green/Magenta)
      r += temp * 0.45;
      b -= temp * 0.45;
      g -= tint * 0.4;
      r += tint * 0.2;
      b += tint * 0.2;

      // 5. Brightness & Exposure
      r = (r * brightness) + exposure;
      g = (g * brightness) + exposure;
      b = (b * brightness) + exposure;

      // 6. Contrast (Clean Photographic S-Curve / Factor)
      r = (r - 128) * cFactor + 128;
      g = (g - 128) * cFactor + 128;
      b = (b - 128) * cFactor + 128;

      // 7. Saturation & Vibrance
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const maxCh = Math.max(r, Math.max(g, b));
      const minCh = Math.min(r, Math.min(g, b));
      const satVal = (maxCh - minCh) / (maxCh || 1);
      // Vibrance selectively boosts less-saturated colors
      const vibFactor = 1.0 + vibrance * (1.0 - satVal);
      const totalSat = saturation * vibFactor;

      r = lum + (r - lum) * totalSat;
      g = lum + (g - lum) * totalSat;
      b = lum + (b - lum) * totalSat;

      // 8. Hue Shift (if specified)
      if (hueAngle !== 0) {
        const hsl = rgbToHsl(r, g, b);
        hsl[0] = (hsl[0] + hueAngle / 360) % 1;
        if (hsl[0] < 0) hsl[0] += 1;
        const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
        r = rgb[0]; g = rgb[1]; b = rgb[2];
      }

      // 9. Vignette (Darkening Corners)
      if (vignette > 0) {
        const px = (i / 4) % targetW;
        const py = Math.floor((i / 4) / targetW);
        const dx = px - centerX;
        const dy = py - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy) / maxDist;
        const vigFactor = 1.0 - (dist * dist * vignette * 0.85);
        r *= vigFactor;
        g *= vigFactor;
        b *= vigFactor;
      }

      dd[i] = clamp(r, 0, 255);
      dd[i + 1] = clamp(g, 0, 255);
      dd[i + 2] = clamp(b, 0, 255);
      dd[i + 3] = 255;
    }

    wctx.putImageData(outData, 0, 0);

    // 10. Texture Sharpness (if specified)
    if (state.settings.sharpness > 0) {
      applySharpnessKernel(wctx, targetW, targetH, state.settings.sharpness / 100);
    }

    targetCtx.clearRect(0, 0, targetW, targetH);
    targetCtx.drawImage(workCanvas, 0, 0);
  }

  function applySharpnessKernel(ctx, w, h, amount) {
    const src = ctx.getImageData(0, 0, w, h);
    const dst = ctx.createImageData(w, h);
    const s = src.data;
    const d = dst.data;
    const k = amount * 0.75;
    const w0 = 1 + 4 * k;
    const w1 = -k;

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = (y * w + x) * 4;
        for (let c = 0; c < 3; c++) {
          const center = s[idx + c];
          const up = s[((y - 1) * w + x) * 4 + c];
          const down = s[((y + 1) * w + x) * 4 + c];
          const left = s[(y * w + (x - 1)) * 4 + c];
          const right = s[(y * w + (x + 1)) * 4 + c];
          d[idx + c] = clamp(w0 * center + w1 * (up + down + left + right), 0, 255);
        }
        d[idx + 3] = 255;
      }
    }
    // Copy edges
    for (let x = 0; x < w; x++) {
      const t = x * 4;
      const b = ((h - 1) * w + x) * 4;
      for (let c = 0; c < 4; c++) {
        d[t + c] = s[t + c];
        d[b + c] = s[b + c];
      }
    }
    for (let y = 0; y < h; y++) {
      const l = (y * w) * 4;
      const r = (y * w + (w - 1)) * 4;
      for (let c = 0; c < 4; c++) {
        d[l + c] = s[l + c];
        d[r + c] = s[r + c];
      }
    }
    ctx.putImageData(dst, 0, 0);
  }

  // ---------- COLOR CONVERSION HELPERS ----------
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [h, s, l];
  }

  function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return [r * 255, g * 255, b * 255];
  }

  // ---------- COMPARE CURTAIN ENGINE ----------
  function updateCurtain() {
    if (!state.compare.active || !state.originalImage) return;
    const w = mainCanvas.width;
    const h = mainCanvas.height;

    curtainOriginal.style.width = state.compare.pos + '%';
    curtainCtx.clearRect(0, 0, w, h);
    curtainCtx.drawImage(state.originalImage, 0, 0, w, h);
  }

  function toggleCompare() {
    state.compare.active = !state.compare.active;
    curtainOverlay.classList.toggle('active', state.compare.active);
    $('btnCompareToggle').classList.toggle('active', state.compare.active);
    if (state.compare.active) {
      state.compare.pos = 50;
      updateCurtain();
      showToast('Compare mode enabled');
    }
  }

  // Dragging Curtain Handle
  curtainHandle.addEventListener('mousedown', (e) => {
    state.compare.dragging = true;
    e.preventDefault();
  });
  curtainHandle.addEventListener('touchstart', (e) => {
    state.compare.dragging = true;
    e.preventDefault();
  }, { passive: false });

  window.addEventListener('mousemove', (e) => {
    if (!state.compare.dragging) return;
    const rect = canvasContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    state.compare.pos = clamp((x / rect.width) * 100, 2, 98);
    updateCurtain();
  });
  window.addEventListener('touchmove', (e) => {
    if (!state.compare.dragging || !e.touches[0]) return;
    const rect = canvasContainer.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    state.compare.pos = clamp((x / rect.width) * 100, 2, 98);
    updateCurtain();
  }, { passive: false });

  window.addEventListener('mouseup', () => { state.compare.dragging = false; });
  window.addEventListener('touchend', () => { state.compare.dragging = false; });

  // Peek Original B&W Button (Hold to Peek)
  const peekBtn = $('btnPeekOriginal');
  function startPeek() {
    state.compare.peeking = true;
    peekBtn.classList.add('holding');
    scheduleRender();
  }
  function stopPeek() {
    state.compare.peeking = false;
    peekBtn.classList.remove('holding');
    scheduleRender();
  }

  peekBtn.addEventListener('mousedown', startPeek);
  peekBtn.addEventListener('touchstart', (e) => { startPeek(); e.preventDefault(); }, { passive: false });
  window.addEventListener('mouseup', () => { if (state.compare.peeking) stopPeek(); });
  window.addEventListener('touchend', () => { if (state.compare.peeking) stopPeek(); });

  // Spacebar shortcuts for Peek
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.repeat && document.activeElement.tagName !== 'INPUT') {
      startPeek();
      e.preventDefault();
    }
  });
  window.addEventListener('keyup', (e) => {
    if (e.code === 'Space' && state.compare.peeking) {
      stopPeek();
      e.preventDefault();
    }
  });

  // ---------- BRUSH PAINTING ENGINE ----------
  function paintStroke(x, y, isFirst) {
    if (!state.originalWidth) return;
    // Map from preview canvas coordinates to full-resolution paint buffer
    const scaleX = state.originalWidth / mainCanvas.width;
    const scaleY = state.originalHeight / mainCanvas.height;
    const origX = x * scaleX;
    const origY = y * scaleY;
    const radius = state.brush.size * scaleX;

    paintBufferCtx.save();

    if (state.brush.mode === 'erase') {
      paintBufferCtx.globalCompositeOperation = 'destination-out';
      paintBufferCtx.beginPath();
      paintBufferCtx.arc(origX, origY, radius, 0, Math.PI * 2);
      paintBufferCtx.fill();
    } else {
      paintBufferCtx.globalCompositeOperation = 'source-over';
      const radGrad = paintBufferCtx.createRadialGradient(origX, origY, radius * (1 - state.brush.softness), origX, origY, radius);
      radGrad.addColorStop(0, hexToRgba(state.brush.color, state.brush.opacity));
      radGrad.addColorStop(1, hexToRgba(state.brush.color, 0));

      paintBufferCtx.fillStyle = radGrad;
      paintBufferCtx.beginPath();
      paintBufferCtx.arc(origX, origY, radius, 0, Math.PI * 2);
      paintBufferCtx.fill();
    }

    paintBufferCtx.restore();
    scheduleRender();
  }

  function hexToRgba(hex, alpha) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    const num = parseInt(c, 16);
    return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
  }

  function pushPaintHistory() {
    if (!paintBuffer.width) return;
    // Cap paint history to 15 states
    if (state.paintHistoryIndex < state.paintHistory.length - 1) {
      state.paintHistory = state.paintHistory.slice(0, state.paintHistoryIndex + 1);
    }
    state.paintHistory.push(paintBufferCtx.getImageData(0, 0, paintBuffer.width, paintBuffer.height));
    if (state.paintHistory.length > 15) state.paintHistory.shift();
    state.paintHistoryIndex = state.paintHistory.length - 1;
  }

  function undoPaintStroke() {
    if (state.paintHistoryIndex > 0) {
      state.paintHistoryIndex--;
      paintBufferCtx.putImageData(state.paintHistory[state.paintHistoryIndex], 0, 0);
      scheduleRender();
      showToast('Paint stroke undone');
    } else {
      showToast('No paint strokes to undo');
    }
  }

  function clearPaintLayer() {
    paintBufferCtx.clearRect(0, 0, paintBuffer.width, paintBuffer.height);
    pushPaintHistory();
    scheduleRender();
    showToast('Paint layer cleared');
  }

  // Brush Cursor Preview
  function updateCursorPreview() {
    const r = (state.brush.size * state.viewport.zoom) * 2;
    brushCursor.style.width = r + 'px';
    brushCursor.style.height = r + 'px';
    brushCursor.style.borderColor = state.brush.mode === 'erase' ? '#ff3b69' : state.brush.color;
  }

  canvasViewport.addEventListener('mousemove', (e) => {
    brushCursor.style.left = e.clientX + 'px';
    brushCursor.style.top = e.clientY + 'px';
  });

  // Painting & Panning Pointer Handlers
  let isPanningCanvas = false;
  let panStartX = 0;
  let panStartY = 0;

  function isBrushTabActive() {
    const activeTab = document.querySelector('.dock-tab.active');
    return activeTab && activeTab.dataset.tab === 'brush';
  }

  canvasContainer.addEventListener('mousedown', (e) => {
    if (state.compare.active) return;

    if (isBrushTabActive() && !state.compare.peeking && e.button === 0 && !e.altKey) {
      // Painting mode
      const rect = canvasContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / state.viewport.zoom;
      const y = (e.clientY - rect.top) / state.viewport.zoom;
      state.brush.isPainting = true;
      paintStroke(x, y, true);
    } else if (e.button === 0 || e.button === 1) {
      // Pan mode
      isPanningCanvas = true;
      panStartX = e.clientX - state.viewport.panX;
      panStartY = e.clientY - state.viewport.panY;
      canvasViewport.classList.add('panning');
      e.preventDefault();
    }
  });

  canvasViewport.addEventListener('mousedown', (e) => {
    if (e.target.closest('.canvas-hud') || e.target.closest('.info-bar') || e.target.closest('.empty-state') || e.target.closest('.curtain-handle')) return;
    if (e.button === 0 || e.button === 1) {
      isPanningCanvas = true;
      panStartX = e.clientX - state.viewport.panX;
      panStartY = e.clientY - state.viewport.panY;
      canvasViewport.classList.add('panning');
      e.preventDefault();
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (state.brush.isPainting) {
      const rect = canvasContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / state.viewport.zoom;
      const y = (e.clientY - rect.top) / state.viewport.zoom;
      paintStroke(x, y, false);
    } else if (isPanningCanvas) {
      state.viewport.panX = e.clientX - panStartX;
      state.viewport.panY = e.clientY - panStartY;
      applyViewportTransform();
    }
  });

  window.addEventListener('mouseup', () => {
    if (state.brush.isPainting) {
      state.brush.isPainting = false;
      pushPaintHistory();
    }
    if (isPanningCanvas) {
      isPanningCanvas = false;
      canvasViewport.classList.remove('panning');
    }
  });

  // Touch painting & panning
  let touchStartDist = 0;
  canvasContainer.addEventListener('touchstart', (e) => {
    if (state.compare.active) return;
    if (e.touches.length === 1) {
      if (isBrushTabActive()) {
        const rect = canvasContainer.getBoundingClientRect();
        const x = (e.touches[0].clientX - rect.left) / state.viewport.zoom;
        const y = (e.touches[0].clientY - rect.top) / state.viewport.zoom;
        state.brush.isPainting = true;
        paintStroke(x, y, true);
        e.preventDefault();
      } else {
        isPanningCanvas = true;
        panStartX = e.touches[0].clientX - state.viewport.panX;
        panStartY = e.touches[0].clientY - state.viewport.panY;
      }
    } else if (e.touches.length === 2) {
      state.brush.isPainting = false;
      touchStartDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }, { passive: false });

  window.addEventListener('touchmove', (e) => {
    if (state.brush.isPainting && e.touches[0]) {
      const rect = canvasContainer.getBoundingClientRect();
      const x = (e.touches[0].clientX - rect.left) / state.viewport.zoom;
      const y = (e.touches[0].clientY - rect.top) / state.viewport.zoom;
      paintStroke(x, y, false);
      e.preventDefault();
    } else if (isPanningCanvas && e.touches[0]) {
      state.viewport.panX = e.touches[0].clientX - panStartX;
      state.viewport.panY = e.touches[0].clientY - panStartY;
      applyViewportTransform();
    } else if (e.touches.length === 2 && touchStartDist > 0) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchStartDist;
      setZoom(state.viewport.zoom * (factor > 1 ? 1.03 : 0.97));
      touchStartDist = dist;
    }
  }, { passive: false });

  window.addEventListener('touchend', () => {
    if (state.brush.isPainting) {
      state.brush.isPainting = false;
      pushPaintHistory();
    }
    isPanningCanvas = false;
    touchStartDist = 0;
  });

  // Hovering on canvas displays brush cursor when in brush tab
  canvasContainer.addEventListener('mouseenter', () => {
    const activeTab = document.querySelector('.dock-tab.active');
    if (activeTab && activeTab.dataset.tab === 'brush') {
      brushCursor.style.display = 'block';
      updateCursorPreview();
    }
  });
  canvasContainer.addEventListener('mouseleave', () => {
    brushCursor.style.display = 'none';
  });

  // ---------- VIEWPORT ZOOM & PAN LISTENERS ----------
  canvasViewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = canvasViewport.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
    setZoom(state.viewport.zoom * zoomFactor, mouseX, mouseY);
  }, { passive: false });

  $('btnZoomIn').addEventListener('click', () => setZoom(state.viewport.zoom * 1.25));
  $('btnZoomOut').addEventListener('click', () => setZoom(state.viewport.zoom * 0.8));
  $('btnZoomFit').addEventListener('click', fitToViewport);
  $('btnZoom100').addEventListener('click', () => {
    state.viewport.zoom = 1.0;
    state.viewport.panX = 0;
    state.viewport.panY = 0;
    applyViewportTransform();
    updateZoomHUD();
  });

  // ---------- MASTER DIAL KNOB (FIXED & ENHANCED) ----------
  const dialContainer = $('dialContainer');
  const dialInner = $('dialInner');
  const dialNeedle = $('dialNeedle');
  const dialValue = $('dialValue');
  let dialDragging = false;
  let dialStartAngle = 0;
  let dialStartVal = 100;

  function setMasterValue(val) {
    const v = clamp(Math.round(val), 0, 200);
    state.settings.master = v;
    dialValue.textContent = `${v}%`;
    // Map 0..200 to -135deg..+135deg
    const angle = -135 + (v / 200) * 270;
    dialNeedle.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    scheduleRender();
  }

  function getDialAngle(e) {
    const rect = dialContainer.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    let deg = Math.atan2(clientY - cy, clientX - cx) * 180 / Math.PI + 90;
    if (deg < -180) deg += 360;
    if (deg > 180) deg -= 360;
    return deg;
  }

  function onDialStart(e) {
    dialDragging = true;
    dialStartAngle = getDialAngle(e);
    dialStartVal = state.settings.master;
    e.preventDefault();
  }

  function onDialMove(e) {
    if (!dialDragging) return;
    const current = getDialAngle(e);
    let delta = current - dialStartAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const newVal = dialStartVal + (delta / 270) * 200;
    setMasterValue(newVal);
    e.preventDefault();
  }

  function onDialEnd() {
    if (dialDragging) {
      dialDragging = false;
      saveHistoryState();
    }
  }

  dialInner.addEventListener('mousedown', onDialStart);
  dialInner.addEventListener('touchstart', onDialStart, { passive: false });
  window.addEventListener('mousemove', onDialMove);
  window.addEventListener('touchmove', onDialMove, { passive: false });
  window.addEventListener('mouseup', onDialEnd);
  window.addEventListener('touchend', onDialEnd);

  // Quick Step Buttons for Master Dial
  $('btnDialMinus').addEventListener('click', () => { setMasterValue(state.settings.master - 10); saveHistoryState(); });
  $('btnDialPlus').addEventListener('click', () => { setMasterValue(state.settings.master + 10); saveHistoryState(); });
  $('btnDialReset').addEventListener('click', () => { setMasterValue(100); saveHistoryState(); });
  $('btnResetMaster').addEventListener('click', () => { setMasterValue(100); saveHistoryState(); });

  // Initialize Dial indicator
  setMasterValue(100);

  // ---------- SLIDER BINDINGS (FIXED PROPERTY PATHS) ----------
  function bindSlider(sliderId, valId, settingPath, unit = '%', isSigned = false) {
    const slider = $(sliderId);
    const valEl = $(valId);
    if (!slider || !valEl) return;

    const update = () => {
      const v = parseFloat(slider.value);
      setNestedSetting(settingPath, v);
      valEl.textContent = (isSigned && v > 0 ? '+' : '') + v + unit;
      scheduleRender();
    };

    slider.addEventListener('input', update);
    slider.addEventListener('change', saveHistoryState);
    return { slider, update };
  }

  // FIXED: RGB channels now set state.settings.R.intensity instead of 'R.intensity'
  bindSlider('sliderR', 'valR', 'R.intensity', '%');
  bindSlider('sliderG', 'valG', 'G.intensity', '%');
  bindSlider('sliderB', 'valB', 'B.intensity', '%');

  bindSlider('sliderTemp', 'valTemp', 'temperature', '', true);
  bindSlider('sliderTint', 'valTint', 'tint', '', true);
  bindSlider('sliderVibrance', 'valVibrance', 'vibrance', '%', true);
  bindSlider('sliderSaturation', 'valSaturation', 'saturation', '%');

  bindSlider('sliderBrightness', 'valBrightness', 'brightness', '%');
  bindSlider('sliderContrast', 'valContrast', 'contrast', '%');
  bindSlider('sliderExposure', 'valExposure', 'exposure', '', true);
  bindSlider('sliderHue', 'valHue', 'hue', '°');
  bindSlider('sliderSharpness', 'valSharpness', 'sharpness', '%');
  bindSlider('sliderVignette', 'valVignette', 'vignette', '%');

  // Step buttons for RGB
  document.querySelectorAll('[data-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      const ch = btn.dataset.step;
      const dir = parseInt(btn.dataset.dir);
      const slider = $('slider' + ch);
      slider.value = clamp(parseInt(slider.value) + dir * 5, 0, 200);
      slider.dispatchEvent(new Event('input'));
      saveHistoryState();
    });
  });

  // Step buttons for adjustments
  document.querySelectorAll('[data-ctrl]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.ctrl;
      const dir = parseInt(btn.dataset.dir);
      const map = {
        temperature: 'sliderTemp',
        tint: 'sliderTint',
        vibrance: 'sliderVibrance',
        saturation: 'sliderSaturation',
        brightness: 'sliderBrightness',
        contrast: 'sliderContrast',
        exposure: 'sliderExposure',
        hue: 'sliderHue',
        sharpness: 'sliderSharpness',
        vignette: 'sliderVignette'
      };
      const slider = $(map[key]);
      const step = key === 'exposure' ? 2 : 5;
      slider.value = clamp(parseFloat(slider.value) + dir * step, parseFloat(slider.min), parseFloat(slider.max));
      slider.dispatchEvent(new Event('input'));
      saveHistoryState();
    });
  });

  // Toggle ON/OFF for RGB layers
  document.querySelectorAll('[data-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const ch = btn.dataset.toggle;
      state.settings[ch].enabled = !state.settings[ch].enabled;
      btn.textContent = state.settings[ch].enabled ? 'ON' : 'OFF';
      btn.classList.toggle('on', state.settings[ch].enabled);
      scheduleRender();
      saveHistoryState();
    });
  });

  // Reset individual layer
  document.querySelectorAll('[data-reset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const ch = btn.dataset.reset;
      state.settings[ch].intensity = 100;
      state.settings[ch].enabled = true;
      $('slider' + ch).value = 100;
      $('val' + ch).textContent = '100%';
      const toggleBtn = document.querySelector(`[data-toggle="${ch}"]`);
      if (toggleBtn) {
        toggleBtn.textContent = 'ON';
        toggleBtn.classList.add('on');
      }
      scheduleRender();
      saveHistoryState();
      showToast(`${ch} channel reset`);
    });
  });

  // Reset RGB
  $('btnResetRGB').addEventListener('click', () => {
    ['R', 'G', 'B'].forEach(ch => {
      state.settings[ch] = { intensity: 100, enabled: true };
      $('slider' + ch).value = 100;
      $('val' + ch).textContent = '100%';
      const toggleBtn = document.querySelector(`[data-toggle="${ch}"]`);
      if (toggleBtn) {
        toggleBtn.textContent = 'ON';
        toggleBtn.classList.add('on');
      }
    });
    scheduleRender();
    saveHistoryState();
    showToast('RGB channels reset');
  });

  // Reset Balance
  $('btnResetBalance').addEventListener('click', () => {
    state.settings.temperature = 0; $('sliderTemp').value = 0; $('valTemp').textContent = '0';
    state.settings.tint = 0; $('sliderTint').value = 0; $('valTint').textContent = '0';
    state.settings.vibrance = 0; $('sliderVibrance').value = 0; $('valVibrance').textContent = '0%';
    state.settings.saturation = 100; $('sliderSaturation').value = 100; $('valSaturation').textContent = '100%';
    scheduleRender();
    saveHistoryState();
    showToast('Balance settings reset');
  });

  // Reset Adjustments
  $('btnResetAdjust').addEventListener('click', () => {
    state.settings.brightness = 100; $('sliderBrightness').value = 100; $('valBrightness').textContent = '100%';
    state.settings.contrast = 100; $('sliderContrast').value = 100; $('valContrast').textContent = '100%';
    state.settings.exposure = 0; $('sliderExposure').value = 0; $('valExposure').textContent = '0';
    state.settings.hue = 0; $('sliderHue').value = 0; $('valHue').textContent = '0°';
    state.settings.sharpness = 0; $('sliderSharpness').value = 0; $('valSharpness').textContent = '0%';
    state.settings.vignette = 0; $('sliderVignette').value = 0; $('valVignette').textContent = '0%';
    scheduleRender();
    saveHistoryState();
    showToast('Exposure settings reset');
  });

  // Reset Preset
  $('btnResetPreset').addEventListener('click', () => {
    applyPreset('natural');
  });

  // Global Project Reset
  $('btnResetEverything').addEventListener('click', () => {
    if (confirm('Reset all color settings and clear painted brush strokes?')) {
      $('btnResetRGB').click();
      $('btnResetBalance').click();
      $('btnResetAdjust').click();
      clearPaintLayer();
      setMasterValue(100);
      applyPreset('natural');
      showToast('Project reset to defaults');
    }
  });

  // ---------- UNDO / REDO ENGINE ----------
  function saveHistoryState() {
    // Clone settings
    const snapshot = JSON.stringify({
      settings: state.settings,
      presetId: state.activePresetId
    });
    if (state.historyIndex < state.history.length - 1) {
      state.history = state.history.slice(0, state.historyIndex + 1);
    }
    state.history.push(snapshot);
    if (state.history.length > 25) state.history.shift();
    state.historyIndex = state.history.length - 1;
    updateUndoRedoButtons();
  }

  function undo() {
    if (state.historyIndex > 0) {
      state.historyIndex--;
      restoreHistoryState(state.history[state.historyIndex]);
      showToast('Action undone');
    }
  }

  function redo() {
    if (state.historyIndex < state.history.length - 1) {
      state.historyIndex++;
      restoreHistoryState(state.history[state.historyIndex]);
      showToast('Action redone');
    }
  }

  function restoreHistoryState(jsonStr) {
    try {
      const snap = JSON.parse(jsonStr);
      state.settings = snap.settings;
      state.activePresetId = snap.presetId;

      // Sync sliders
      ['R', 'G', 'B'].forEach(ch => {
        $('slider' + ch).value = state.settings[ch].intensity;
        $('val' + ch).textContent = state.settings[ch].intensity + '%';
        const tb = document.querySelector(`[data-toggle="${ch}"]`);
        if (tb) {
          tb.textContent = state.settings[ch].enabled ? 'ON' : 'OFF';
          tb.classList.toggle('on', state.settings[ch].enabled);
        }
      });

      $('sliderTemp').value = state.settings.temperature; $('valTemp').textContent = state.settings.temperature;
      $('sliderTint').value = state.settings.tint; $('valTint').textContent = state.settings.tint;
      $('sliderVibrance').value = state.settings.vibrance; $('valVibrance').textContent = state.settings.vibrance + '%';
      $('sliderSaturation').value = state.settings.saturation; $('valSaturation').textContent = state.settings.saturation + '%';
      $('sliderBrightness').value = state.settings.brightness; $('valBrightness').textContent = state.settings.brightness + '%';
      $('sliderContrast').value = state.settings.contrast; $('valContrast').textContent = state.settings.contrast + '%';
      $('sliderExposure').value = state.settings.exposure; $('valExposure').textContent = state.settings.exposure;
      $('sliderHue').value = state.settings.hue; $('valHue').textContent = state.settings.hue + '°';
      $('sliderSharpness').value = state.settings.sharpness; $('valSharpness').textContent = state.settings.sharpness + '%';
      $('sliderVignette').value = state.settings.vignette; $('valVignette').textContent = state.settings.vignette + '%';

      setMasterValue(state.settings.master);

      document.querySelectorAll('.preset-card').forEach(c => {
        c.classList.toggle('active', c.dataset.presetId === state.activePresetId);
      });

      updateUndoRedoButtons();
      scheduleRender();
    } catch (e) {
      console.error(e);
    }
  }

  function updateUndoRedoButtons() {
    $('btnUndo').disabled = state.historyIndex <= 0;
    $('btnRedo').disabled = state.historyIndex >= state.history.length - 1;
  }

  $('btnUndo').addEventListener('click', undo);
  $('btnRedo').addEventListener('click', redo);

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      if (e.shiftKey) redo();
      else undo();
      e.preventDefault();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
      redo();
      e.preventDefault();
    }
  });

  // ---------- DOCK TABS & NAVIGATION ----------
  const dockTabs = document.querySelectorAll('.dock-tab');
  const panes = document.querySelectorAll('.tab-pane');
  const studioDock = $('studioDock');

  // Track Tab Hidden state (controlled by center button in dockTabs)
  state.isTabHidden = false;
  state.isBottomNavHidden = false;

  function toggleTabVisibility(forceState) {
    if (typeof forceState === 'boolean') {
      state.isTabHidden = forceState;
    } else {
      state.isTabHidden = !state.isTabHidden;
    }

    const icon = $('toggleTabIcon');
    const label = $('toggleTabLabel');
    const toggleBtn = $('btnToggleTab');
    const mobileUnhideTab = $('btnMobileUnhideTab');

    if (state.isTabHidden) {
      studioDock.classList.add('tab-hidden');
      studioDock.classList.remove('sheet-open');
      if (icon) icon.textContent = '▲';
      if (label) label.textContent = 'Unhide Tab';
      if (toggleBtn) {
        toggleBtn.classList.add('tab-is-hidden');
        toggleBtn.title = 'Unhide Tab (Show Panel)';
      }
      if (mobileUnhideTab) mobileUnhideTab.classList.add('visible');
      showToast('Tab hidden — Expanded canvas view', 'info');
    } else {
      studioDock.classList.remove('tab-hidden');
      studioDock.classList.add('sheet-open');
      if (icon) icon.textContent = '▼';
      if (label) label.textContent = 'Hide Tab';
      if (toggleBtn) {
        toggleBtn.classList.remove('tab-is-hidden');
        toggleBtn.title = 'Hide Tab (Hide Panel)';
      }
      if (mobileUnhideTab) mobileUnhideTab.classList.remove('visible');
      showToast('Tab unhidden', 'info');
    }

    // Smoothly re-fit canvas to newly expanded/contracted viewport
    setTimeout(() => {
      if (state.originalImageData) {
        fitToViewport();
        scheduleRender();
      }
    }, 320);
  }

  function openTab(tabName) {
    if (!tabName) return;

    // If tab was previously hidden, unhide it automatically when user selects a tab
    if (state.isTabHidden) {
      toggleTabVisibility(false);
    }

    dockTabs.forEach(t => {
      if (t.dataset.tab) {
        t.classList.toggle('active', t.dataset.tab === tabName);
      }
    });
    panes.forEach(p => p.classList.toggle('active', p.id === `pane-${tabName}`));
    studioDock.classList.add('sheet-open');

    // Update bottom nav active state
    document.querySelectorAll('.nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.sheet === tabName);
    });

    if (tabName === 'brush') {
      brushCursor.style.display = 'block';
      updateCursorPreview();
    } else {
      brushCursor.style.display = 'none';
    }
  }

  // Bind tab click listeners (excluding the center toggle button)
  dockTabs.forEach(t => {
    if (t.dataset.tab) {
      t.addEventListener('click', () => openTab(t.dataset.tab));
    }
  });

  // Center Hide / Unhide button in dockTabs
  if ($('btnToggleTab')) {
    $('btnToggleTab').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleTabVisibility();
    });
  }

  if ($('btnMobileUnhideTab')) {
    $('btnMobileUnhideTab').addEventListener('click', () => {
      toggleTabVisibility(false);
    });
  }

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.sheet;
      openTab(tab);
    });
  });

  // ---------- MOBILE VIEW: DOUBLE CLICK HIDE BOTTOM BUTTONS ----------
  function toggleBottomNavVisibility(forceState) {
    const bottomNav = document.querySelector('.bottom-nav');
    if (!bottomNav) return;

    if (typeof forceState === 'boolean') {
      state.isBottomNavHidden = forceState;
    } else {
      state.isBottomNavHidden = !state.isBottomNavHidden;
    }

    const appEl = document.querySelector('.app');
    const unhidePill = $('btnMobileUnhideNav');

    if (state.isBottomNavHidden) {
      bottomNav.classList.add('nav-hidden');
      if (appEl) appEl.classList.add('bottom-nav-hidden');
      if (unhidePill) unhidePill.classList.add('visible');
      showToast('Bottom buttons hidden (Double-click/tap canvas to show)', 'info');
    } else {
      bottomNav.classList.remove('nav-hidden');
      if (appEl) appEl.classList.remove('bottom-nav-hidden');
      if (unhidePill) unhidePill.classList.remove('visible');
      showToast('Bottom buttons restored', 'info');
    }
  }

  // 1. Standard Desktop & Mobile dblclick listener
  canvasViewport.addEventListener('dblclick', (e) => {
    if (e.target.closest('button, input, .canvas-hud, .curtain-handle, .studio-dock, .modal-overlay, .toast')) return;
    toggleBottomNavVisibility();
  });

  // 2. Mobile touch double-tap listener (immediate & snappy on touchscreens)
  let lastTapTime = 0;
  canvasViewport.addEventListener('touchend', (e) => {
    if (e.target.closest('button, input, .canvas-hud, .curtain-handle, .studio-dock, .modal-overlay, .toast')) return;
    const now = Date.now();
    const diff = now - lastTapTime;
    if (diff < 350 && diff > 40) {
      toggleBottomNavVisibility();
      e.preventDefault();
      lastTapTime = 0;
      return;
    }
    lastTapTime = now;
  }, { passive: false });

  if ($('btnMobileUnhideNav')) {
    $('btnMobileUnhideNav').addEventListener('click', () => {
      toggleBottomNavVisibility(false);
    });
  }

  // ---------- GIF89a ENCODING ENGINE (PURE JS, ZERO DEPENDENCY) ----------
  function encodeGif(frames, width, height, defaultDelayCs = 100) {
    const bytes = [];
    function writeByte(b) { bytes.push(b & 0xFF); }
    function writeShort(s) { bytes.push(s & 0xFF, (s >> 8) & 0xFF); }
    function writeString(str) { for (let i = 0; i < str.length; i++) writeByte(str.charCodeAt(i)); }

    // Sample pixels across frames to compute median cut 256-color palette
    const samplePixels = [];
    const primaryData = frames[0].data;
    const step = Math.max(1, Math.floor((width * height) / 10000));
    for (let i = 0; i < primaryData.length; i += 4 * step) {
      samplePixels.push([primaryData[i], primaryData[i + 1], primaryData[i + 2]]);
    }

    function medianCut(pixels, maxBoxes = 256) {
      let boxes = [pixels];
      while (boxes.length < maxBoxes) {
        let bestBoxIdx = -1;
        let maxRange = -1;
        let splitChannel = 0;

        for (let i = 0; i < boxes.length; i++) {
          const b = boxes[i];
          if (b.length <= 1) continue;
          let minR = 255, maxR = 0, minG = 255, maxG = 0, minB = 255, maxB = 0;
          for (let j = 0; j < b.length; j++) {
            const p = b[j];
            if (p[0] < minR) minR = p[0]; if (p[0] > maxR) maxR = p[0];
            if (p[1] < minG) minG = p[1]; if (p[1] > maxG) maxG = p[1];
            if (p[2] < minB) minB = p[2]; if (p[2] > maxB) maxB = p[2];
          }
          const rangeR = maxR - minR;
          const rangeG = maxG - minG;
          const rangeB = maxB - minB;
          const range = Math.max(rangeR, rangeG, rangeB);
          if (range > maxRange) {
            maxRange = range;
            bestBoxIdx = i;
            splitChannel = (range === rangeR) ? 0 : (range === rangeG ? 1 : 2);
          }
        }
        if (bestBoxIdx === -1 || maxRange <= 0) break;
        const target = boxes[bestBoxIdx];
        target.sort((a, b) => a[splitChannel] - b[splitChannel]);
        const mid = Math.floor(target.length / 2);
        boxes.splice(bestBoxIdx, 1, target.slice(0, mid), target.slice(mid));
      }

      const palette = [];
      for (let box of boxes) {
        if (box.length === 0) continue;
        let sumR = 0, sumG = 0, sumB = 0;
        for (let p of box) { sumR += p[0]; sumG += p[1]; sumB += p[2]; }
        palette.push([
          Math.round(sumR / box.length),
          Math.round(sumG / box.length),
          Math.round(sumB / box.length)
        ]);
      }
      while (palette.length < 256) palette.push([0, 0, 0]);
      return palette.slice(0, 256);
    }

    const palette = medianCut(samplePixels, 256);

    // Fast nearest color lookup with cache
    const colorCache = new Map();
    function getClosestColor(r, g, b) {
      const key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
      if (colorCache.has(key)) return colorCache.get(key);
      let bestIdx = 0;
      let minDist = Infinity;
      for (let i = 0; i < palette.length; i++) {
        const pr = palette[i][0], pg = palette[i][1], pb = palette[i][2];
        const dr = r - pr, dg = g - pg, db = b - pb;
        const dist = dr * dr * 0.299 + dg * dg * 0.587 + db * db * 0.114;
        if (dist < minDist) {
          minDist = dist;
          bestIdx = i;
          if (dist === 0) break;
        }
      }
      colorCache.set(key, bestIdx);
      return bestIdx;
    }

    // Header & Logical Screen Descriptor
    writeString('GIF89a');
    writeShort(width);
    writeShort(height);
    writeByte(0xF7); // Global color table, 8 bits/pixel, 256 entries
    writeByte(0);    // Background color index
    writeByte(0);    // Aspect ratio

    // Global Color Table (256 * 3 bytes)
    for (let i = 0; i < 256; i++) {
      writeByte(palette[i][0]);
      writeByte(palette[i][1]);
      writeByte(palette[i][2]);
    }

    // Netscape looping application extension (for animation)
    if (frames.length > 1) {
      writeByte(0x21);
      writeByte(0xFF);
      writeByte(0x0B);
      writeString('NETSCAPE2.0');
      writeByte(0x03);
      writeByte(0x01);
      writeShort(0); // Loop forever
      writeByte(0x00);
    }

    // Frames
    frames.forEach(frame => {
      // Graphic Control Extension
      writeByte(0x21);
      writeByte(0xF9);
      writeByte(0x04);
      writeByte(0x00); // No disposal, no transparency
      writeShort(frame.delay || defaultDelayCs);
      writeByte(0);
      writeByte(0x00);

      // Image Descriptor
      writeByte(0x2C);
      writeShort(0);
      writeShort(0);
      writeShort(width);
      writeShort(height);
      writeByte(0x00);

      // Indexed Pixel Array
      const indexedPixels = new Uint8Array(width * height);
      const fd = frame.data;
      for (let i = 0, p = 0; i < fd.length; i += 4, p++) {
        indexedPixels[p] = getClosestColor(fd[i], fd[i + 1], fd[i + 2]);
      }

      // LZW Compression
      const minCodeSize = 8;
      writeByte(minCodeSize);

      const clearCode = 1 << minCodeSize; // 256
      const eoiCode = clearCode + 1;      // 257

      let curCodeSize = minCodeSize + 1;  // 9
      let nextCode = eoiCode + 1;         // 258

      let curAccum = 0;
      let curBits = 0;
      const block = [];

      function writeBits(code, bits) {
        curAccum |= (code << curBits);
        curBits += bits;
        while (curBits >= 8) {
          block.push(curAccum & 0xFF);
          curAccum >>= 8;
          curBits -= 8;
          if (block.length === 254) {
            writeByte(block.length);
            for (let k = 0; k < block.length; k++) writeByte(block[k]);
            block.length = 0;
          }
        }
      }

      let codeTable = new Map();
      function resetTable() {
        codeTable.clear();
        curCodeSize = minCodeSize + 1;
        nextCode = eoiCode + 1;
      }

      writeBits(clearCode, curCodeSize);
      resetTable();

      let prefix = indexedPixels[0];
      for (let i = 1; i < indexedPixels.length; i++) {
        const c = indexedPixels[i];
        const key = (prefix << 8) | c;
        if (codeTable.has(key)) {
          prefix = codeTable.get(key);
        } else {
          writeBits(prefix, curCodeSize);
          if (nextCode < 4096) {
            codeTable.set(key, nextCode++);
            if (nextCode > (1 << curCodeSize) && curCodeSize < 12) {
              curCodeSize++;
            }
          } else {
            writeBits(clearCode, curCodeSize);
            resetTable();
          }
          prefix = c;
        }
      }
      writeBits(prefix, curCodeSize);
      writeBits(eoiCode, curCodeSize);

      if (curBits > 0) {
        block.push(curAccum & 0xFF);
      }
      if (block.length > 0) {
        writeByte(block.length);
        for (let k = 0; k < block.length; k++) writeByte(block[k]);
        block.length = 0;
      }
      writeByte(0x00);
    });

    writeByte(0x3B); // GIF Trailer
    return new Uint8Array(bytes);
  }

  // ---------- EXPORT RESOLUTION SPECS (SD vs HD) ----------
  function getExportSpecs(qualityTier) {
    const origW = state.originalWidth || 1920;
    const origH = state.originalHeight || 1080;
    if (qualityTier === 'hd') {
      return {
        width: origW,
        height: origH,
        tier: 'hd',
        label: 'HD Quality (100% Full Original)',
        sublabel: `${origW} × ${origH} px`
      };
    } else {
      // SD Quality: standard 720p / web scale (max 1280px on longest side, or ~50% scale, min 320px)
      const maxSD = 1280;
      const longest = Math.max(origW, origH);
      const scale = Math.min(1.0, Math.min(0.5, maxSD / longest) || 0.5);
      const w = Math.max(320, Math.round(origW * scale));
      const h = Math.max(240, Math.round(origH * scale));
      return {
        width: w,
        height: h,
        tier: 'sd',
        label: 'SD Quality (Web 720p)',
        sublabel: `${w} × ${h} px`
      };
    }
  }

  // Renders the final colorized composition at specified target resolution
  function generateExportCanvas(targetW, targetH) {
    if (!state.originalImageData) return null;

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');

    // Render colorized base onto canvas at target resolution
    renderColorizedBuffer(ctx, targetW, targetH);

    // Composite paint buffer scaled to target resolution
    if (paintBuffer.width > 0) {
      ctx.save();
      ctx.globalCompositeOperation = 'color';
      ctx.drawImage(paintBuffer, 0, 0, targetW, targetH);
      ctx.restore();
    }
    return canvas;
  }

  function generateFullResolutionExportCanvas() {
    return generateExportCanvas(state.originalWidth, state.originalHeight);
  }

  // ---------- SYNCHRONIZED EXPORT UI ----------
  function updateExportUI() {
    const specs = getExportSpecs(state.exportQualityTier);
    const hdSpecs = getExportSpecs('hd');
    const sdSpecs = getExportSpecs('sd');
    const fmt = state.exportFormat;
    const tier = state.exportQualityTier.toUpperCase();
    const fmtLabel = fmt === 'jpeg' ? 'JPG' : fmt.toUpperCase();

    // Sync Format chips (both dock and modal)
    document.querySelectorAll('[data-fmt]').forEach(b => {
      b.classList.toggle('active', b.dataset.fmt === fmt);
    });

    // Sync Quality Tier chips (both dock and modal)
    document.querySelectorAll('[data-tier]').forEach(b => {
      b.classList.toggle('active', b.dataset.tier === state.exportQualityTier);
    });

    // Sync GIF mode chips (both dock and modal)
    document.querySelectorAll('[data-gif-mode]').forEach(b => {
      b.classList.toggle('active', b.dataset.gifMode === state.gifMode);
    });

    // Visibility of Quality compression slider (JPG/WEBP)
    const showQuality = (fmt === 'jpeg' || fmt === 'webp');
    if ($('qualityBox')) $('qualityBox').style.display = showQuality ? 'block' : 'none';
    if ($('modalQualityBox')) $('modalQualityBox').style.display = showQuality ? 'block' : 'none';

    // Visibility of GIF Options box
    const showGif = (fmt === 'gif');
    if ($('gifOptionsBox')) $('gifOptionsBox').style.display = showGif ? 'block' : 'none';
    if ($('modalGifOptions')) $('modalGifOptions').style.display = showGif ? 'block' : 'none';

    // Update text labels
    if ($('exportResVal')) $('exportResVal').textContent = specs.sublabel;
    if ($('modalExportRes')) $('modalExportRes').textContent = specs.sublabel;

    if ($('exportFmtTag')) $('exportFmtTag').textContent = `${fmtLabel} (${tier})`;
    if ($('modalExportFmt')) $('modalExportFmt').textContent = `${fmtLabel} (${tier})`;

    const downloadStr = `Download ${tier} ${fmtLabel} Photo`;
    if ($('btnDownloadLabel')) $('btnDownloadLabel').textContent = downloadStr;
    if ($('modalDownloadLabel')) $('modalDownloadLabel').textContent = downloadStr;

    if ($('hdTierDesc')) $('hdTierDesc').textContent = `100% Original (${hdSpecs.sublabel})`;
    if ($('mHdTierDesc')) $('mHdTierDesc').textContent = `100% Original (${hdSpecs.sublabel})`;

    if ($('sdTierDesc')) $('sdTierDesc').textContent = `Standard 720p (${sdSpecs.sublabel})`;
    if ($('mSdTierDesc')) $('mSdTierDesc').textContent = `Standard 720p (${sdSpecs.sublabel})`;
  }

  // Format selection handlers
  document.querySelectorAll('[data-fmt]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.exportFormat = btn.dataset.fmt;
      updateExportUI();
    });
  });

  // Quality Tier selection handlers (HD vs SD)
  document.querySelectorAll('[data-tier]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.exportQualityTier = btn.dataset.tier;
      updateExportUI();
    });
  });

  // GIF Mode selection handlers
  document.querySelectorAll('[data-gif-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.gifMode = btn.dataset.gifMode;
      updateExportUI();
    });
  });

  // Quality sliders sync
  $('sliderQuality').addEventListener('input', (e) => {
    state.exportQuality = parseInt(e.target.value) / 100;
    $('valQuality').textContent = e.target.value + '%';
    if ($('modalValQuality')) $('modalValQuality').textContent = e.target.value + '%';
    if ($('modalSliderQuality')) $('modalSliderQuality').value = e.target.value;
  });
  if ($('modalSliderQuality')) {
    $('modalSliderQuality').addEventListener('input', (e) => {
      state.exportQuality = parseInt(e.target.value) / 100;
      if ($('valQuality')) $('valQuality').textContent = e.target.value + '%';
      if ($('modalValQuality')) $('modalValQuality').textContent = e.target.value + '%';
      if ($('sliderQuality')) $('sliderQuality').value = e.target.value;
    });
  }

  // Trigger Download helper
  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  // Master Export Action (.gif, .png, .jpg in SD or HD Quality)
  function performExport() {
    if (!state.originalImageData) {
      showToast('No image loaded to export', 'error');
      return;
    }

    const specs = getExportSpecs(state.exportQualityTier);
    let targetW = specs.width;
    let targetH = specs.height;

    // For GIF, cap max dimensions to ensure snappy encoding and lightweight file size
    if (state.exportFormat === 'gif') {
      const maxGifDim = state.exportQualityTier === 'hd' ? 1280 : 720;
      const maxSide = Math.max(targetW, targetH);
      if (maxSide > maxGifDim) {
        const scale = maxGifDim / maxSide;
        targetW = Math.round(targetW * scale);
        targetH = Math.round(targetH * scale);
      }
    }

    const fmtLabel = state.exportFormat === 'jpeg' ? 'JPG' : state.exportFormat.toUpperCase();
    const tierTag = state.exportQualityTier.toUpperCase();
    showLoader(true, `Generating ${tierTag} ${fmtLabel} image (${targetW}×${targetH})…`);

    setTimeout(() => {
      try {
        const expCanvas = generateExportCanvas(targetW, targetH);
        if (!expCanvas) throw new Error('Could not render export buffer');

        const baseName = state.fileName ? state.fileName.replace(/\.[^.]+$/, '') : 'photo';
        const presetTag = state.activePresetId;

        if (state.exportFormat === 'gif') {
          const ectx = expCanvas.getContext('2d');
          let frames = [];

          if (state.gifMode === 'loop') {
            // Frame 1: Original Black & White (1.2s delay)
            const bwCanvas = document.createElement('canvas');
            bwCanvas.width = targetW;
            bwCanvas.height = targetH;
            const bwCtx = bwCanvas.getContext('2d');
            bwCtx.drawImage(state.originalImage, 0, 0, targetW, targetH);
            frames.push({
              data: bwCtx.getImageData(0, 0, targetW, targetH).data,
              width: targetW,
              height: targetH,
              delay: 130
            });

            // Frame 2: Colorized Image (1.7s delay)
            frames.push({
              data: ectx.getImageData(0, 0, targetW, targetH).data,
              width: targetW,
              height: targetH,
              delay: 170
            });
          } else {
            // Static Colorized Frame
            frames.push({
              data: ectx.getImageData(0, 0, targetW, targetH).data,
              width: targetW,
              height: targetH,
              delay: 100
            });
          }

          const gifBytes = encodeGif(frames, targetW, targetH);
          const blob = new Blob([gifBytes], { type: 'image/gif' });
          triggerDownload(blob, `${baseName}_colorized_${presetTag}_${tierTag}.gif`);
          showLoader(false);
          showToast(`Saved ${tierTag} GIF (${formatBytes(blob.size)})!`, 'success');

        } else {
          const mimeMap = { png: 'image/png', jpeg: 'image/jpeg', webp: 'image/webp' };
          const extMap = { png: 'png', jpeg: 'jpg', webp: 'webp' };
          const mime = mimeMap[state.exportFormat] || 'image/png';
          const ext = extMap[state.exportFormat] || 'png';
          const quality = state.exportFormat === 'png' ? undefined : state.exportQuality;

          expCanvas.toBlob((blob) => {
            showLoader(false);
            if (!blob) {
              showToast('Export failed', 'error');
              return;
            }
            triggerDownload(blob, `${baseName}_colorized_${presetTag}_${tierTag}.${ext}`);
            showToast(`Saved ${tierTag} ${ext.toUpperCase()} (${formatBytes(blob.size)})!`, 'success');
          }, mime, quality);
        }
      } catch (err) {
        showLoader(false);
        console.error(err);
        showToast('Export error: ' + err.message, 'error');
      }
    }, 60);
  }

  // Bind Export Buttons
  $('btnDownload').addEventListener('click', performExport);
  if ($('modalBtnDownload')) $('modalBtnDownload').addEventListener('click', performExport);

  // Copy to Clipboard (PNG)
  async function copyToClipboardAction() {
    if (!state.originalImageData) {
      showToast('No image loaded', 'error');
      return;
    }
    showLoader(true, 'Copying image to clipboard…');
    try {
      const specs = getExportSpecs(state.exportQualityTier);
      const expCanvas = generateExportCanvas(specs.width, specs.height);
      expCanvas.toBlob(async (blob) => {
        showLoader(false);
        if (!blob) throw new Error('Blob conversion failed');
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          showToast(`Image copied to clipboard (${specs.tier.toUpperCase()}) ✓`, 'success');
        } catch (clipErr) {
          showToast('Clipboard access denied or unsupported', 'error');
        }
      }, 'image/png');
    } catch (err) {
      showLoader(false);
      showToast('Copy failed: ' + err.message, 'error');
    }
  }

  $('btnCopyClipboard').addEventListener('click', copyToClipboardAction);
  if ($('modalBtnCopy')) $('modalBtnCopy').addEventListener('click', copyToClipboardAction);

  // Export Modal Toggle Handlers
  const exportModal = $('exportModal');
  if ($('btnHeaderExport')) {
    $('btnHeaderExport').addEventListener('click', () => {
      updateExportUI();
      exportModal.classList.add('open');
    });
  }
  if ($('closeExportModal')) {
    $('closeExportModal').addEventListener('click', () => {
      exportModal.classList.remove('open');
    });
  }
  if (exportModal) {
    exportModal.addEventListener('click', (e) => {
      if (e.target === exportModal) exportModal.classList.remove('open');
    });
  }

  // Update escape listener to also close exportModal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && exportModal) {
      exportModal.classList.remove('open');
    }
  });

  // ---------- FULLSCREEN VIEW ----------
  const fullscreenView = $('fullscreenView');
  const fullscreenCanvas = $('fullscreenCanvas');
  $('btnFullscreen').addEventListener('click', () => {
    if (!state.originalImageData) {
      showToast('No image loaded', 'error');
      return;
    }
    const full = generateFullResolutionExportCanvas();
    fullscreenCanvas.width = full.width;
    fullscreenCanvas.height = full.height;
    fullscreenCanvas.getContext('2d').drawImage(full, 0, 0);
    fullscreenView.classList.add('open');
  });
  $('closeFullscreen').addEventListener('click', () => fullscreenView.classList.remove('open'));
  if (fullscreenView) {
    fullscreenView.addEventListener('click', (e) => {
      if (e.target === fullscreenView) fullscreenView.classList.remove('open');
    });
  }

  // ---------- DIAGNOSTICS & AUTO-FIX (IMPROVED) ----------
  const diagModal = $('diagModal');
  $('btnDiag').addEventListener('click', () => {
    diagModal.classList.add('open');
    runDiagnostics();
  });
  $('closeDiag').addEventListener('click', () => diagModal.classList.remove('open'));
  if (diagModal) {
    diagModal.addEventListener('click', (e) => {
      if (e.target === diagModal) diagModal.classList.remove('open');
    });
  }
  $('btnRunDiag').addEventListener('click', runDiagnostics);

  function runDiagnostics() {
    const list = $('diagList');
    list.innerHTML = '';
    const checks = [
      {
        name: 'HTML5 2D Canvas Engine',
        ok: !!document.createElement('canvas').getContext('2d')
      },
      {
        name: 'Blend Mode Support ("color")',
        ok: (() => {
          try {
            const c = document.createElement('canvas');
            const ctx = c.getContext('2d');
            ctx.globalCompositeOperation = 'color';
            return ctx.globalCompositeOperation === 'color';
          } catch { return false; }
        })()
      },
      {
        name: 'FileReader & Blob API',
        ok: typeof FileReader !== 'undefined' && typeof Blob !== 'undefined'
      },
      {
        name: 'Object URL API',
        ok: typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function'
      },
      {
        name: 'Settings Integrity Check',
        ok: (() => {
          return !isNaN(state.settings.contrast) &&
            !isNaN(state.settings.brightness) &&
            !isNaN(state.settings.R.intensity) &&
            state.settings.contrast > 0;
        })()
      },
      {
        name: 'Source Image Loaded',
        ok: !!state.originalImageData
      },
      {
        name: 'Paint Layer Engine',
        ok: !!paintBuffer && paintBuffer.width >= 0
      },
      {
        name: 'Clipboard API (Image Copy)',
        ok: typeof navigator.clipboard !== 'undefined' && typeof ClipboardItem !== 'undefined'
      },
      {
        name: 'No Uncaught Runtime Errors',
        ok: !window.__runtimeError
      }
    ];

    checks.forEach(c => {
      const row = document.createElement('div');
      row.className = 'diag-item';
      row.innerHTML = `<span>${c.name}</span><span class="diag-status ${c.ok ? 'ok' : 'err'}">${c.ok ? 'OPERATIONAL' : 'OFFLINE'}</span>`;
      list.appendChild(row);
    });

    const failed = checks.filter(c => !c.ok && c.name !== 'Source Image Loaded');
    if (failed.length === 0) {
      showToast('All systems fully operational ✓', 'success');
    } else {
      showToast(`${failed.length} warning(s) detected`, 'error');
    }
  }

  // Auto-Fix & Optimize
  $('btnAutoFix').addEventListener('click', () => {
    // Repair settings
    ['R', 'G', 'B'].forEach(ch => {
      if (!state.settings[ch] || isNaN(state.settings[ch].intensity)) {
        state.settings[ch] = { intensity: 100, enabled: true };
      }
    });
    if (isNaN(state.settings.contrast) || state.settings.contrast <= 0) state.settings.contrast = 100;
    if (isNaN(state.settings.brightness)) state.settings.brightness = 100;
    if (isNaN(state.settings.master)) state.settings.master = 100;

    window.__runtimeError = null;
    saveHistoryState();
    scheduleRender();
    runDiagnostics();
    showToast('Auto-repair completed: Settings validated ✓', 'success');
  });

  window.addEventListener('error', (e) => {
    window.__runtimeError = e.message;
    console.error('[Chromafy Studio Error]', e.message);
  });

  // ---------- FILE INPUT & DRAG/DROP LISTENERS ----------
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) importImage(file);
    fileInput.value = '';
  });

  $('btnHeaderImport').addEventListener('click', () => fileInput.click());
  $('btnImportEmpty').addEventListener('click', () => fileInput.click());
  $('btnCompareToggle').addEventListener('click', toggleCompare);

  // Sample Chips
  document.querySelectorAll('.sample-chip').forEach(chip => {
    chip.addEventListener('click', () => loadSample(chip.dataset.sample));
  });
  $('btnSamplesMenu').addEventListener('click', () => {
    const samples = ['portrait', 'nature', 'street'];
    const pick = samples[Math.floor(Math.random() * samples.length)];
    loadSample(pick);
  });

  // Drag and Drop
  canvasViewport.addEventListener('dragover', (e) => {
    e.preventDefault();
    canvasViewport.classList.add('drag-over');
  });
  canvasViewport.addEventListener('dragleave', () => {
    canvasViewport.classList.remove('drag-over');
  });
  canvasViewport.addEventListener('drop', (e) => {
    e.preventDefault();
    canvasViewport.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) importImage(file);
  });

  // Window Resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (state.originalImageData) {
        fitToViewport();
        scheduleRender();
      }
    }, 150);
  });

  // Keyboard Shortcuts: Esc to close modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      diagModal.classList.remove('open');
      fullscreenView.classList.remove('open');
      if ($('exportModal')) $('exportModal').classList.remove('open');
    }
  });

  // ---------- INITIALIZATION ----------
  initPresetsUI();
  initBrushUI();
  updateExportUI();
  saveHistoryState();

  console.info('%c✨ Chromafy AI Pro Studio Ready', 'color:#00e676; font-weight:bold; font-size:14px;');

})();