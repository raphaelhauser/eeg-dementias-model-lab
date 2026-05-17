const MODEL = {
  a1: 120,
  b1: 60,
  a2: 660,
  b2: 330,
  C: 135,
  e0: 2.5,
  v0: 6,
  r0: 0.56,
  r1: 0.56,
  r2: 0.56,
  dt: 0.001,
  downsamp: 2,
  burnIn: 5,
};

MODEL.C1 = MODEL.C;
MODEL.C2 = MODEL.C * 0.8;
MODEL.C3 = MODEL.C * 0.25;
MODEL.C4_0 = MODEL.C * 0.25;
MODEL.A1 = (32.5 * MODEL.a1) / 1000;
MODEL.B1 = (440 * MODEL.b1) / 1000;
MODEL.A2 = (32.5 * MODEL.a2) / 1000;
MODEL.B2 = (440 * MODEL.b2) / 1000;

const REAL_SC_14 = [
  [0, 0.536, 0.097, 0.288, 0.003, 0.005, 0.008, 0, 0, 1, 0.013, 0.623, 0, 0],
  [0.536, 0, 0.72, 0.254, 0.047, 0.112, 0.006, 0, 0, 0.046, 0.003, 0.063, 0.002, 0],
  [0.097, 0.72, 0, 0.027, 0.004, 0.079, 0.004, 0, 0, 0.029, 0.007, 0.007, 0.015, 0],
  [0.288, 0.254, 0.027, 0, 0.005, 0.037, 0.044, 0.001, 0, 0.068, 0.004, 0.708, 0, 0.002],
  [0.003, 0.047, 0.004, 0.005, 0, 0.456, 0.02, 0.004, 0.002, 0.004, 0.001, 0.004, 0.032, 0],
  [0.005, 0.112, 0.079, 0.037, 0.456, 0, 0.05, 0.005, 0.002, 0.005, 0.002, 0.007, 0.021, 0.002],
  [0.008, 0.006, 0.004, 0.044, 0.02, 0.05, 0, 0.022, 0.003, 0.009, 0.002, 0.022, 0.007, 0.226],
  [0, 0, 0, 0.001, 0.004, 0.005, 0.022, 0, 0.479, 0.001, 0.001, 0.001, 0.013, 0.092],
  [0, 0, 0, 0, 0.002, 0.002, 0.003, 0.479, 0, 0.001, 0, 0, 0.022, 0.013],
  [1, 0.046, 0.029, 0.068, 0.004, 0.005, 0.009, 0.001, 0.001, 0, 0.282, 0.564, 0.005, 0.001],
  [0.013, 0.003, 0.007, 0.004, 0.001, 0.002, 0.002, 0.001, 0, 0.282, 0, 0.002, 0.003, 0],
  [0.623, 0.063, 0.007, 0.708, 0.004, 0.007, 0.022, 0.001, 0, 0.564, 0.002, 0, 0.001, 0.001],
  [0, 0.002, 0.015, 0, 0.032, 0.021, 0.007, 0.013, 0.022, 0.005, 0.003, 0.001, 0, 0.001],
  [0, 0, 0, 0.002, 0, 0.002, 0.226, 0.092, 0.013, 0.001, 0, 0.001, 0.001, 0],
];

const PRESETS = {
  balanced: {
    coupling: 0.32,
    integrity: 0.92,
    nodes: 10,
    topology: "reduced-sc",
    drive: 220,
    alpha: 0.56,
    noise: 0.72,
    plasticity: true,
    target: 2.5,
    tau: 2,
    duration: 7,
    seed: 9,
    editNetwork: false,
  },
  theta: {
    coupling: 0.68,
    integrity: 0.92,
    nodes: 10,
    topology: "small-world",
    drive: 205,
    alpha: 0.88,
    noise: 0.55,
    plasticity: true,
    target: 2.5,
    tau: 2.4,
    duration: 7,
    seed: 9,
    editNetwork: false,
  },
  alphaHub: {
    coupling: 0.12,
    integrity: 0.92,
    nodes: 12,
    topology: "hub",
    drive: 220,
    alpha: 0.95,
    noise: 0.55,
    plasticity: true,
    target: 2.5,
    tau: 2.4,
    duration: 7,
    seed: 9,
    editNetwork: false,
  },
  gammaLocal: {
    coupling: 0,
    integrity: 0.92,
    nodes: 12,
    topology: "hub",
    drive: 205,
    alpha: 0.55,
    noise: 0.25,
    plasticity: true,
    target: 2.5,
    tau: 2.4,
    duration: 7,
    seed: 9,
    editNetwork: false,
  },
  fragmented: {
    coupling: 0.12,
    integrity: 0.35,
    nodes: 12,
    topology: "split",
    drive: 180,
    alpha: 0.55,
    noise: 1.2,
    plasticity: true,
    target: 2.5,
    tau: 2.4,
    duration: 7,
    seed: 3,
    editNetwork: false,
  },
  overdrive: {
    coupling: 0.85,
    integrity: 1.1,
    nodes: 12,
    topology: "modular",
    drive: 290,
    alpha: 0.22,
    noise: 0.25,
    plasticity: false,
    target: 2.5,
    tau: 2.4,
    duration: 7,
    seed: 9,
    editNetwork: false,
  },
};

const BAND_SPECS = [
  { key: "δ", id: "delta", name: "delta", min: 1, max: 4, color: "#2c6fb7" },
  { key: "θ", id: "theta", name: "theta", min: 4, max: 8, color: "#167f76" },
  { key: "α", id: "alpha", name: "alpha", min: 8, max: 13, color: "#c58a20" },
  { key: "β", id: "beta", name: "beta", min: 13, max: 30, color: "#d95b43" },
  { key: "γ", id: "gamma", name: "gamma", min: 30, max: 45, color: "#6f63c6" },
];

const LESSONS = {
  coupling: {
    note: "Compare the Balanced run with Theta sync to see how stronger small-world coupling increases FC and slows the dominant rhythm.",
    start: PRESETS.balanced,
    contrast: PRESETS.theta,
  },
  plasticity: {
    note: "Compare Overdrive with the same settings but plasticity enabled to see how C4 tries to rescue firing error.",
    start: PRESETS.overdrive,
    contrast: { ...PRESETS.overdrive, plasticity: true, tau: 1.2 },
  },
  network: {
    note: "Compare Alpha hub with Fragmented mixed to see how hubs and split modules change FC without changing the local equations.",
    start: PRESETS.alphaHub,
    contrast: PRESETS.fragmented,
  },
  rhythm: {
    note: "Compare Theta sync with Local gamma to see how alpha/gamma balance and coupling separate global slow synchrony from local fast activity.",
    start: PRESETS.theta,
    contrast: PRESETS.gammaLocal,
  },
};

const LEARNING_MISSIONS = [
  {
    id: "rhythm",
    title: "1) Find a clean alpha rhythm",
    targetLabel: "Load alpha target",
    target: PRESETS.alphaHub,
    goal: "Stable run with alpha as the dominant 8-13 Hz band.",
    coach: "Start with the alpha target, then watch the spectrum: a successful run peaks in alpha without quality warnings.",
    check: (result) => classifyRun(result).kind !== "unstable" && result.dominantBand.id === "alpha",
    readout: (result) => `Current: ${result.dominantBand.name} at ${result.dominantFreq.toFixed(0)} Hz`,
  },
  {
    id: "synchrony",
    title: "2) Make coupling synchronize regions",
    targetLabel: "Load synchrony target",
    target: PRESETS.theta,
    goal: "Mean broadband FC reaches at least 0.45.",
    coach: "Use stronger long-range coupling and compare the FC matrix: the lesson is that network edges can pull regions into shared activity.",
    check: (result) => result.meanFc >= 0.45,
    readout: (result) => `Current: mean FC ${result.meanFc.toFixed(2)}`,
  },
  {
    id: "fragmentation",
    title: "3) Fragment the network",
    targetLabel: "Load damage target",
    target: PRESETS.fragmented,
    goal: "Mean broadband FC falls below 0.25 after structural damage.",
    coach: "Lower integrity or use the split network. The FC matrix should lose broad blocks of correlation as structural paths disappear.",
    check: (result) => result.meanFc < 0.25,
    readout: (result) => `Current: mean FC ${result.meanFc.toFixed(2)}`,
  },
  {
    id: "homeostasis",
    title: "4) Rescue firing with plasticity",
    targetLabel: "Load rescue target",
    target: PRESETS.balanced,
    goal: "Plasticity is on, integrity is restored above 80%, and firing error is within +/-0.4 Hz.",
    coach: "Turn plasticity on and bring firing back near target. The homeostasis plot should show C4 correcting the error, not just hiding it.",
    check: (result, params) => params.plasticity && params.integrity >= 0.8 && Math.abs(result.firingError) <= 0.4,
    readout: (result) => `Current: firing error ${result.firingError >= 0 ? "+" : ""}${result.firingError.toFixed(2)} Hz`,
  },
];

const learningProgress = new Set();

const fields = {
  coupling: document.getElementById("coupling"),
  integrity: document.getElementById("integrity"),
  nodes: document.getElementById("nodes"),
  topology: document.getElementById("topology"),
  editNetwork: document.getElementById("editNetwork"),
  drive: document.getElementById("drive"),
  alpha: document.getElementById("alpha"),
  noise: document.getElementById("noise"),
  plasticity: document.getElementById("plasticity"),
  target: document.getElementById("target"),
  tau: document.getElementById("tau"),
  duration: document.getElementById("duration"),
  seed: document.getElementById("seed"),
};

const controls = {
  fcBand: document.getElementById("fcBand"),
  lessonSelect: document.getElementById("lessonSelect"),
  lessonNote: document.getElementById("lessonNote"),
  importStateFile: document.getElementById("importStateFile"),
  inspector: document.getElementById("inspectorText"),
  baseline: document.getElementById("baselineMetric"),
  spectrum: document.getElementById("spectrumMetric"),
  undoNetwork: document.getElementById("undoNetworkButton"),
  redoNetwork: document.getElementById("redoNetworkButton"),
  learningPath: document.getElementById("learningPath"),
  learningCoach: document.getElementById("learningCoach"),
};

const outputs = {
  coupling: document.getElementById("couplingValue"),
  integrity: document.getElementById("integrityValue"),
  nodes: document.getElementById("nodesValue"),
  drive: document.getElementById("driveValue"),
  alpha: document.getElementById("alphaValue"),
  noise: document.getElementById("noiseValue"),
  target: document.getElementById("targetValue"),
  tau: document.getElementById("tauValue"),
  duration: document.getElementById("durationValue"),
  seed: document.getElementById("seedValue"),
};

const canvases = {
  trace: document.getElementById("traceCanvas"),
  spectrum: document.getElementById("spectrumCanvas"),
  network: document.getElementById("networkCanvas"),
  fc: document.getElementById("fcCanvas"),
  bands: document.getElementById("bandsCanvas"),
  model: document.getElementById("modelCanvas"),
  homeostasis: document.getElementById("homeostasisCanvas"),
};

const insights = {
  rhythm: document.getElementById("rhythmInsight"),
  coupling: document.getElementById("couplingInsight"),
  plasticity: document.getElementById("plasticityInsight"),
};

const warningsEl = document.getElementById("warningList");

const metrics = {
  quality: document.getElementById("qualityMetric"),
  qualityDelta: document.getElementById("qualityDelta"),
  dominant: document.getElementById("dominantMetric"),
  fc: document.getElementById("fcMetric"),
  error: document.getElementById("errorMetric"),
  inhibition: document.getElementById("inhibitionMetric"),
  alphaEnvelope: document.getElementById("alphaEnvelopeMetric"),
  alphaEnvelopeDelta: document.getElementById("alphaEnvelopeDelta"),
  dominantDelta: document.getElementById("dominantDelta"),
  fcDelta: document.getElementById("fcDelta"),
  errorDelta: document.getElementById("errorDelta"),
  inhibitionDelta: document.getElementById("inhibitionDelta"),
  network: document.getElementById("networkMetric"),
  status: document.getElementById("statusText"),
};

let latest = null;
let debounce = 0;
let baselineResult = null;
let baselineName = "Balanced baseline";
let customNetwork = null;
let selectedNode = null;
let undoStack = [];
let redoStack = [];

function seededRandom(seed) {
  let state = (seed >>> 0) + 0x6d2b79f5;
  return function rand() {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rand) {
  const u1 = Math.max(rand(), 1e-9);
  const u2 = rand();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function sigmoid(v, r) {
  const x = Math.max(-60, Math.min(60, r * (MODEL.v0 - v)));
  return (2 * MODEL.e0) / (1 + Math.exp(x));
}

function getParams() {
  return {
    coupling: Number(fields.coupling.value),
    integrity: Number(fields.integrity.value),
    nodes: Number(fields.nodes.value),
    topology: fields.topology.value,
    editNetwork: fields.editNetwork.checked,
    drive: Number(fields.drive.value),
    alpha: Number(fields.alpha.value),
    noise: Number(fields.noise.value),
    plasticity: fields.plasticity.checked,
    target: Number(fields.target.value),
    tau: Number(fields.tau.value),
    duration: Number(fields.duration.value),
    seed: Number(fields.seed.value),
  };
}

function setParams(params) {
  if (params.topology && params.topology !== "custom") customNetwork = null;
  selectedNode = null;
  Object.entries(params).forEach(([key, value]) => {
    if (!fields[key]) return;
    if (key === "plasticity" || key === "editNetwork") fields[key].checked = value;
    else fields[key].value = value;
  });
  updateOutputs();
}

function updateOutputs() {
  const p = getParams();
  outputs.coupling.value = p.coupling.toFixed(2);
  outputs.integrity.value = `${Math.round(p.integrity * 100)}%`;
  outputs.nodes.value = String(p.nodes);
  outputs.drive.value = p.drive.toFixed(0);
  outputs.alpha.value = `${Math.round(p.alpha * 100)}%`;
  outputs.noise.value = p.noise.toFixed(2);
  outputs.target.value = `${p.target.toFixed(1)} Hz`;
  outputs.tau.value = `${p.tau.toFixed(1)} s`;
  outputs.duration.value = `${p.duration.toFixed(0)} s`;
  outputs.seed.value = String(p.seed);
  if (p.topology !== "custom") selectedNode = null;
}

function buildNetwork(n, integrity, topology = "reduced-sc") {
  const positions = [];
  const matrix = Array.from({ length: n }, () => Array(n).fill(0));
  const radius = 0.38;
  for (let i = 0; i < n; i += 1) {
    const angle = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const module = i < n / 2 ? 0 : 1;
    const local = 0.035 * Math.sin(i * 2.7);
    positions.push({
      x: 0.5 + (radius + local) * Math.cos(angle),
      y: 0.53 + (radius + local) * Math.sin(angle),
      module,
    });
  }
  const source = topology === "custom" && customNetwork ? resizeMatrix(customNetwork, n) : presetMatrix(n, topology);
  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      const raw = source[i][j] || 0;
      const weight = raw * integrity;
      matrix[i][j] = weight;
      matrix[j][i] = weight;
    }
  }
  const rowMeans = matrix.map((row) => row.reduce((sum, value) => sum + value, 0));
  const norm = rowMeans.reduce((sum, value) => sum + value, 0) / Math.max(1, n);
  return { positions, matrix, rawMatrix: source, norm: Math.max(0.01, norm), topology };
}

function presetMatrix(n, topology) {
  if (topology === "custom" && customNetwork) return resizeMatrix(customNetwork, n);
  const matrix = Array.from({ length: n }, () => Array(n).fill(0));
  const connect = (i, j, weight) => {
    if (i === j) return;
    matrix[i][j] = Math.max(matrix[i][j], weight);
    matrix[j][i] = Math.max(matrix[j][i], weight);
  };
  if (topology === "small-world") {
    for (let i = 0; i < n; i += 1) {
      connect(i, (i + 1) % n, 0.8);
      connect(i, (i + 2) % n, 0.38);
    }
    connect(0, Math.floor(n / 2), 0.55);
    connect(Math.floor(n / 4), Math.floor((3 * n) / 4), 0.48);
  } else if (topology === "modular") {
    for (let i = 0; i < n; i += 1) {
      for (let j = i + 1; j < n; j += 1) {
        const same = Math.floor((i * 3) / n) === Math.floor((j * 3) / n);
        if (same && Math.abs(i - j) <= 3) connect(i, j, 0.72 - Math.abs(i - j) * 0.08);
      }
    }
    connect(1, Math.floor(n / 2), 0.22);
    connect(Math.floor(n / 3), n - 2, 0.2);
  } else if (topology === "hub") {
    const hubs = [0, Math.floor(n / 2)];
    for (const hub of hubs) {
      for (let j = 0; j < n; j += 1) connect(hub, j, j === (hub + 1) % n ? 0.9 : 0.55);
    }
    for (let i = 0; i < n; i += 1) connect(i, (i + 1) % n, 0.22);
  } else if (topology === "split") {
    for (let i = 0; i < n; i += 1) {
      for (let j = i + 1; j < n; j += 1) {
        const same = i < n / 2 ? j < n / 2 : j >= n / 2;
        if (same && Math.abs(i - j) <= 2) connect(i, j, 0.7);
      }
    }
  } else if (topology === "random") {
    for (let i = 0; i < n; i += 1) {
      for (let j = i + 1; j < n; j += 1) {
        const value = Math.abs(Math.sin((i + 1) * 12.9898 + (j + 1) * 78.233)) % 1;
        if (value > 0.72) connect(i, j, 0.25 + value * 0.55);
      }
    }
  } else {
    return resizeMatrix(REAL_SC_14, n);
  }
  return matrix;
}

function resizeMatrix(source, n) {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      if (i === j) return 0;
      return source[i]?.[j] || 0;
    }),
  );
}

function setCustomNetworkFromCurrent() {
  const params = getParams();
  const base = latest?.network?.rawMatrix || presetMatrix(params.nodes, params.topology);
  customNetwork = resizeMatrix(base, params.nodes);
  fields.topology.value = "custom";
  selectedNode = null;
}

function toggleCustomEdge(a, b) {
  if (a === b) return;
  pushNetworkUndo();
  setCustomNetworkFromCurrent();
  const n = Number(fields.nodes.value);
  customNetwork = resizeMatrix(customNetwork, n);
  const current = customNetwork[a][b] || 0;
  const next = current > 0.05 ? 0 : 0.75;
  customNetwork[a][b] = next;
  customNetwork[b][a] = next;
}

function cloneMatrix(matrix) {
  return matrix ? matrix.map((row) => row.slice()) : null;
}

function pushNetworkUndo() {
  const params = getParams();
  const matrix = customNetwork || latest?.network?.rawMatrix || presetMatrix(params.nodes, params.topology);
  undoStack.push(cloneMatrix(resizeMatrix(matrix, params.nodes)));
  if (undoStack.length > 20) undoStack.shift();
  redoStack = [];
  updateNetworkHistoryButtons();
}

function restoreNetwork(matrix) {
  if (!matrix) return;
  customNetwork = cloneMatrix(matrix);
  fields.topology.value = "custom";
  selectedNode = null;
  rerun(true);
  updateNetworkHistoryButtons();
}

function updateNetworkHistoryButtons() {
  controls.undoNetwork.disabled = undoStack.length === 0;
  controls.redoNetwork.disabled = redoStack.length === 0;
}

function simulate(params) {
  const n = params.nodes;
  const rand = seededRandom(params.seed);
  const network = buildNetwork(n, params.integrity, params.topology);
  const sampleEvery = MODEL.downsamp;
  const steps = Math.max(1, Math.floor(params.duration / MODEL.dt));
  const burnSteps = Math.floor(MODEL.burnIn / MODEL.dt);
  const totalSteps = burnSteps + steps;
  const samples = Math.floor(steps / sampleEvery);
  const runParams = { ...params, sampleEvery, burnIn: MODEL.burnIn };
  const y = Array.from({ length: 13 }, () => Array(n).fill(0));
  const init = [0.131, 0.171, 0.343, 0.21, 3.07, 2.96, 0.131, 0.171, 0.343, 0.21, 3.07, 2.96, MODEL.C4_0];
  for (let k = 0; k < 13; k += 1) {
    for (let node = 0; node < n; node += 1) y[k][node] = init[k] * (1 + 0.02 * gaussian(rand));
  }

  const eeg = Array.from({ length: n }, () => new Float64Array(samples));
  const meanSignal = new Float64Array(samples);
  const firingHistory = new Float64Array(samples);
  const c4History = new Float64Array(samples);
  const fr = new Float64Array(n);
  const x0 = new Float64Array(n);
  const x1 = new Float64Array(n);
  const x2 = new Float64Array(n);
  const coupling = new Float64Array(n);
  const alpha = params.alpha;
  const gamma = 1 - alpha;
  const sqrtDt = Math.sqrt(MODEL.dt);
  const plasticity = params.plasticity ? 1 : 0;
  let sample = 0;

  for (let step = 1; step <= totalSteps; step += 1) {
    const effectiveTau = step <= burnSteps
      ? (step <= burnSteps / 2 ? 0.05 : Math.max(0.1, params.tau / 2))
      : params.tau;
    for (let node = 0; node < n; node += 1) {
      x0[node] = alpha * y[0][node] + gamma * y[6][node];
      x1[node] = alpha * y[1][node] + gamma * y[7][node];
      x2[node] = alpha * y[2][node] + gamma * y[8][node];
      fr[node] = sigmoid(x1[node] - x2[node], MODEL.r0);
    }

    for (let node = 0; node < n; node += 1) {
      let sum = 0;
      const row = network.matrix[node];
      for (let j = 0; j < n; j += 1) sum += row[j] * fr[j];
      coupling[node] = sum / network.norm;
    }

    for (let node = 0; node < n; node += 1) {
      const sC1 = sigmoid(MODEL.C1 * x0[node], MODEL.r1);
      const sC3 = sigmoid(MODEL.C3 * x0[node], MODEL.r2);
      const c4 = Math.max(0, y[12][node]);
      const longRange = params.coupling * MODEL.C * coupling[node];
      const input = params.drive + MODEL.C2 * sC1 + longRange;

      const d = [
        y[3][node],
        y[4][node],
        y[5][node],
        MODEL.A1 * MODEL.a1 * fr[node] - 2 * MODEL.a1 * y[3][node] - MODEL.a1 * MODEL.a1 * y[0][node],
        MODEL.A1 * MODEL.a1 * input - 2 * MODEL.a1 * y[4][node] - MODEL.a1 * MODEL.a1 * y[1][node],
        MODEL.B1 * MODEL.b1 * c4 * sC3 - 2 * MODEL.b1 * y[5][node] - MODEL.b1 * MODEL.b1 * y[2][node],
        y[9][node],
        y[10][node],
        y[11][node],
        MODEL.A2 * MODEL.a2 * fr[node] - 2 * MODEL.a2 * y[9][node] - MODEL.a2 * MODEL.a2 * y[6][node],
        MODEL.A2 * MODEL.a2 * input - 2 * MODEL.a2 * y[10][node] - MODEL.a2 * MODEL.a2 * y[7][node],
        MODEL.B2 * MODEL.b2 * c4 * sC3 - 2 * MODEL.b2 * y[11][node] - MODEL.b2 * MODEL.b2 * y[8][node],
        (sC3 * (fr[node] - params.target) * plasticity * Math.max(c4 / MODEL.C, 0)) / effectiveTau,
      ];

      for (let k = 0; k < 13; k += 1) {
        y[k][node] += MODEL.dt * d[k];
        if (k !== 12) y[k][node] = Math.max(-80, Math.min(80, y[k][node]));
      }
      y[4][node] += sqrtDt * MODEL.A1 * MODEL.a1 * params.noise * gaussian(rand);
      y[10][node] += sqrtDt * MODEL.A2 * MODEL.a2 * params.noise * gaussian(rand);
      y[12][node] = Math.max(0, Math.min(MODEL.C * 0.9, y[12][node]));
    }

    if (step > burnSteps && (step - burnSteps) % sampleEvery === 0 && sample < samples) {
      let mean = 0;
      let meanFr = 0;
      let meanC4 = 0;
      for (let node = 0; node < n; node += 1) {
        const value = alpha * y[1][node] + gamma * y[7][node] - (alpha * y[2][node] + gamma * y[8][node]);
        eeg[node][sample] = value;
        mean += value;
        meanFr += fr[node];
        meanC4 += y[12][node];
      }
      meanSignal[sample] = mean / n;
      firingHistory[sample] = meanFr / n;
      c4History[sample] = meanC4 / n;
      sample += 1;
    }
  }

  const analysis = analyzeSignals(eeg, meanSignal, firingHistory, c4History, runParams);
  return { params: runParams, network, eeg, meanSignal, firingHistory, c4History, ...analysis };
}

function analyzeSignals(eeg, meanSignal, firingHistory, c4History, params) {
  const fs = 1 / (MODEL.dt * params.sampleEvery);
  const start = Math.floor(meanSignal.length * 0.2);
  const centered = Array.from(meanSignal.slice(start));
  const avg = centered.reduce((sum, value) => sum + value, 0) / Math.max(1, centered.length);
  for (let i = 0; i < centered.length; i += 1) centered[i] -= avg;

  const spectrum = welchSpectrum(centered, fs);

  const bands = BAND_SPECS.map((band) => ({ ...band, power: 0 }));
  for (const point of spectrum) {
    const band = bands.find((candidate) => point.f >= candidate.min && point.f < candidate.max);
    if (band) band.power += point.power;
  }
  const totalPower = bands.reduce((sum, band) => sum + band.power, 0) || 1;
  bands.forEach((band) => {
    band.share = band.power / totalPower;
  });
  const dominantBand = bands.reduce((best, band) => (band.power > best.power ? band : best), bands[0]);
  const dominantBandPoints = spectrum.filter((point) => point.f >= dominantBand.min && point.f < dominantBand.max);
  const dominantFreq = dominantBandPoints.reduce((best, point) => (point.power > best.power ? point : best), dominantBandPoints[0] || spectrum[0]).f;

  const fc = computeFc(eeg, start);
  const fcByBand = computeBandFcs(eeg, start, fs);
  const fcStats = { broadband: meanAbsFc(fc) };
  for (const [band, matrix] of Object.entries(fcByBand)) fcStats[band] = meanAbsFc(matrix);
  let fcSum = 0;
  let fcCount = 0;
  for (let i = 0; i < fc.length; i += 1) {
    for (let j = i + 1; j < fc.length; j += 1) {
      fcSum += Math.abs(fc[i][j]);
      fcCount += 1;
    }
  }

  const finalFr = firingHistory[firingHistory.length - 1] || 0;
  const finalC4 = c4History[c4History.length - 1] || 0;
  const rms = Math.sqrt(centered.reduce((sum, value) => sum + value * value, 0) / Math.max(1, centered.length));
  const alphaEnvelopeCv = computeAlphaEnvelopeCv(centered, fs);
  const warnings = buildWarnings({ params, meanFc: fcSum / Math.max(1, fcCount), rms, firingError: finalFr - params.target });
  return {
    spectrum,
    bands,
    fc,
    fcByBand,
    fcStats,
    meanFc: fcSum / Math.max(1, fcCount),
    dominantBand,
    dominantFreq,
    firingError: finalFr - params.target,
    finalFr,
    finalC4,
    rms,
    alphaEnvelopeCv,
    warnings,
    fs,
  };
}

function welchSpectrum(signal, fs) {
  const windowSize = Math.min(signal.length, Math.max(128, Math.floor(fs * 2)));
  const hop = Math.max(1, Math.floor(windowSize / 2));
  const windows = [];
  for (let start = 0; start + windowSize <= signal.length; start += hop) windows.push(start);
  if (!windows.length) windows.push(0);
  const spectrum = [];
  for (let f = 1; f <= 45; f += 1) {
    let power = 0;
    for (const start of windows) {
      let re = 0;
      let im = 0;
      let norm = 0;
      for (let i = 0; i < windowSize && start + i < signal.length; i += 1) {
        const w = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / Math.max(1, windowSize - 1));
        const value = signal[start + i] * w;
        const angle = (2 * Math.PI * f * i) / fs;
        re += value * Math.cos(angle);
        im -= value * Math.sin(angle);
        norm += w * w;
      }
      power += (re * re + im * im) / Math.max(1e-9, norm);
    }
    spectrum.push({ f, power: power / windows.length });
  }
  return spectrum;
}

function buildWarnings({ params, meanFc, rms, firingError }) {
  const warnings = [];
  if (params.noise < 0.05) warnings.push("Very low noise can create artificially synchronized signals.");
  if (meanFc > 0.85) warnings.push("FC is near ceiling; compare conditions cautiously.");
  if (Math.abs(firingError) > 1.5) warnings.push("Firing is far from target, so plasticity has not stabilized.");
  if (rms < 0.02) warnings.push("Signal amplitude is very small after burn-in.");
  if (params.duration < 6) warnings.push("Short runs make spectral estimates coarse.");
  return warnings;
}

function computeFc(eeg, start) {
  const n = eeg.length;
  const fc = Array.from({ length: n }, () => Array(n).fill(0));
  const means = Array(n).fill(0);
  const vars = Array(n).fill(0);
  const count = Math.max(1, eeg[0].length - start);
  for (let node = 0; node < n; node += 1) {
    for (let i = start; i < eeg[node].length; i += 1) means[node] += eeg[node][i];
    means[node] /= count;
    for (let i = start; i < eeg[node].length; i += 1) {
      const centered = eeg[node][i] - means[node];
      vars[node] += centered * centered;
    }
  }
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (i === j) {
        fc[i][j] = 1;
      } else {
        let cov = 0;
        for (let k = start; k < eeg[i].length; k += 1) cov += (eeg[i][k] - means[i]) * (eeg[j][k] - means[j]);
        fc[i][j] = cov / Math.sqrt(Math.max(1e-9, vars[i] * vars[j]));
      }
    }
  }
  return fc;
}

function computeFcFromSignals(signals) {
  const n = signals.length;
  const fc = Array.from({ length: n }, () => Array(n).fill(0));
  const means = signals.map((signal) => signal.reduce((sum, value) => sum + value, 0) / Math.max(1, signal.length));
  const vars = signals.map((signal, node) => signal.reduce((sum, value) => sum + (value - means[node]) ** 2, 0));
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (i === j) {
        fc[i][j] = 1;
      } else {
        let cov = 0;
        for (let k = 0; k < signals[i].length; k += 1) cov += (signals[i][k] - means[i]) * (signals[j][k] - means[j]);
        fc[i][j] = cov / Math.sqrt(Math.max(1e-9, vars[i] * vars[j]));
      }
    }
  }
  return fc;
}

function computeBandFcs(eeg, start, fs) {
  const fcByBand = {};
  for (const band of BAND_SPECS) {
    const signals = eeg.map((nodeSignal) => reconstructBand(Array.from(nodeSignal.slice(start)), fs, band.min, band.max));
    fcByBand[band.id] = computeFcFromSignals(signals);
  }
  return fcByBand;
}

function reconstructBand(signal, fs, fmin, fmax) {
  const centered = signal.slice();
  const avg = centered.reduce((sum, value) => sum + value, 0) / Math.max(1, centered.length);
  for (let i = 0; i < centered.length; i += 1) centered[i] -= avg;
  const out = new Array(centered.length).fill(0);
  const freqs = [];
  for (let f = Math.ceil(fmin); f < fmax; f += 1) freqs.push(f);
  for (const f of freqs) {
    let re = 0;
    let im = 0;
    for (let i = 0; i < centered.length; i += 1) {
      const angle = (2 * Math.PI * f * i) / fs;
      re += centered[i] * Math.cos(angle);
      im -= centered[i] * Math.sin(angle);
    }
    const a = (2 * re) / Math.max(1, centered.length);
    const b = (-2 * im) / Math.max(1, centered.length);
    for (let i = 0; i < centered.length; i += 1) {
      const angle = (2 * Math.PI * f * i) / fs;
      out[i] += a * Math.cos(angle) + b * Math.sin(angle);
    }
  }
  return out;
}

function meanAbsFc(matrix) {
  let sum = 0;
  let count = 0;
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = i + 1; j < matrix.length; j += 1) {
      sum += Math.abs(matrix[i][j]);
      count += 1;
    }
  }
  return sum / Math.max(1, count);
}

function computeAlphaEnvelopeCv(signal, fs) {
  const alpha = reconstructBand(signal, fs, 8, 13).map(Math.abs);
  const window = Math.max(5, Math.floor(fs * 0.35));
  const smoothed = alpha.map((_, i) => {
    const a = Math.max(0, i - window);
    const b = Math.min(alpha.length, i + window + 1);
    let sum = 0;
    for (let j = a; j < b; j += 1) sum += alpha[j];
    return sum / Math.max(1, b - a);
  });
  const mean = smoothed.reduce((sum, value) => sum + value, 0) / Math.max(1, smoothed.length);
  const variance = smoothed.reduce((sum, value) => sum + (value - mean) ** 2, 0) / Math.max(1, smoothed.length);
  return Math.sqrt(variance) / Math.max(1e-9, mean);
}

function rerun(immediate = false) {
  updateOutputs();
  window.clearTimeout(debounce);
  metrics.status.textContent = "Queued";
  const run = () => {
    metrics.status.textContent = "Running";
    window.setTimeout(() => {
      latest = simulate(getParams());
      if (!baselineResult) baselineResult = simulate(PRESETS.balanced);
      updateMetrics(latest);
      renderAll(latest);
      metrics.status.textContent = "Complete";
    }, 20);
  };
  if (immediate) run();
  else debounce = window.setTimeout(run, 180);
}

function updateMetrics(result) {
  const fcBand = controls.fcBand.value;
  const shownFc = getFcStat(result, fcBand);
  const shownBaselineFc = baselineResult ? getFcStat(baselineResult, fcBand) : null;
  const quality = classifyRun(result);
  document.querySelector(".quality-metric")?.setAttribute("data-quality", quality.kind);
  metrics.quality.textContent = quality.label;
  metrics.qualityDelta.textContent = quality.detail;
  metrics.dominant.textContent = `${result.dominantBand.key} ${result.dominantFreq.toFixed(0)} Hz`;
  metrics.fc.textContent = shownFc.toFixed(2);
  metrics.error.textContent = `${result.firingError >= 0 ? "+" : ""}${result.firingError.toFixed(2)} Hz`;
  metrics.inhibition.textContent = result.finalC4.toFixed(1);
  metrics.alphaEnvelope.textContent = result.alphaEnvelopeCv.toFixed(2);
  metrics.alphaEnvelopeDelta.textContent = "slow alpha CV";
  if (baselineResult) {
    metrics.dominantDelta.textContent = `balanced ${baselineResult.dominantBand.key} ${baselineResult.dominantFreq.toFixed(0)} Hz`;
    metrics.fcDelta.textContent = `${fcBandLabel(fcBand)} ${formatDelta(shownFc - shownBaselineFc, 2)}`;
    metrics.errorDelta.textContent = `${Math.abs(result.firingError).toFixed(2)} Hz from target`;
    metrics.inhibitionDelta.textContent = formatDelta(result.finalC4 - baselineResult.finalC4, 1);
    metrics.alphaEnvelopeDelta.textContent = formatDelta(result.alphaEnvelopeCv - baselineResult.alphaEnvelopeCv, 2);
  }
  const density = result.network.matrix.flat().filter((value) => value > 0.08).length / (result.params.nodes * (result.params.nodes - 1));
  const topologyLabel = fields.topology.options[fields.topology.selectedIndex]?.textContent || "Network";
  metrics.network.textContent = `${topologyLabel} · ${Math.round(density * 100)}%`;
  controls.baseline.textContent = baselineName;
  controls.spectrum.textContent = `High-quality · ${result.fs.toFixed(0)} Hz`;
  updateInsights(result, density);
  updateWarnings(result.warnings);
  updateLearningPath(result);
}

function updateLearningPath(result) {
  if (!controls.learningPath || !controls.learningCoach) return;
  const params = getParams();
  const currentIndex = LEARNING_MISSIONS.findIndex((mission) => !learningProgress.has(mission.id));
  if (currentIndex !== -1 && LEARNING_MISSIONS[currentIndex].check(result, params)) {
    learningProgress.add(LEARNING_MISSIONS[currentIndex].id);
  }
  const nextIndex = LEARNING_MISSIONS.findIndex((mission) => !learningProgress.has(mission.id));
  controls.learningPath.innerHTML = "";
  LEARNING_MISSIONS.forEach((mission, index) => {
    const li = document.createElement("li");
    const done = learningProgress.has(mission.id);
    const active = index === nextIndex;
    li.className = `${done ? "is-done" : ""}${active ? " is-active" : ""}`.trim();

    const status = document.createElement("span");
    status.className = "mission-status";
    status.setAttribute("aria-hidden", "true");
    status.textContent = done ? "✓" : active ? "→" : "•";

    const body = document.createElement("span");
    body.className = "mission-body";

    const title = document.createElement("strong");
    title.textContent = mission.title;

    const goal = document.createElement("small");
    goal.textContent = mission.goal;

    const readout = document.createElement("small");
    readout.className = "mission-readout";
    readout.textContent = mission.readout(result);

    body.append(title, goal, readout);
    li.append(status, body);

    if (active) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "secondary-button mission-target-button";
      button.textContent = mission.targetLabel;
      button.addEventListener("click", () => {
        applyScenario(mission.target, null);
        setInspector(`Loaded tour target: ${mission.goal}`);
      });
      li.appendChild(button);
    }

    controls.learningPath.appendChild(li);
  });
  controls.learningCoach.textContent = nextIndex < LEARNING_MISSIONS.length && nextIndex !== -1
    ? `Coach: ${LEARNING_MISSIONS[nextIndex].coach}`
    : "Coach: You reached 100. Explain rhythm, coupling, fragmentation, and plasticity from the plots to lock it in.";
}

function getFcStat(result, band) {
  return result.fcStats?.[band] ?? result.meanFc;
}

function getFcMatrix(result) {
  const band = controls.fcBand.value;
  return band === "broadband" ? result.fc : result.fcByBand?.[band] || result.fc;
}

function fcBandLabel(band) {
  if (band === "broadband") return "Broadband";
  return BAND_SPECS.find((candidate) => candidate.id === band)?.name || band;
}

function classifyRun(result) {
  if (result.warnings.some((warning) => warning.includes("far from target") || warning.includes("ceiling"))) {
    return { kind: "unstable", label: "Unstable", detail: `${result.warnings.length} warning${result.warnings.length === 1 ? "" : "s"}` };
  }
  if (result.warnings.length) return { kind: "watch", label: "Watch", detail: `${result.warnings.length} caveat${result.warnings.length === 1 ? "" : "s"}` };
  return { kind: "stable", label: "Stable", detail: "teaching range" };
}

function formatDelta(value, digits) {
  if (Math.abs(value) < 0.005) return "same as balanced";
  return `${value > 0 ? "+" : ""}${value.toFixed(digits)} vs balanced`;
}

function updateWarnings(warnings) {
  warningsEl.innerHTML = "";
  const items = warnings.length ? warnings : ["Run is within the teaching model's stable range."];
  for (const warning of items) {
    const chip = document.createElement("span");
    chip.className = `warning-chip${warnings.length ? "" : " is-ok"}`;
    chip.textContent = warning;
    warningsEl.appendChild(chip);
  }
}

function updateInsights(result, density) {
  const p = result.params;
  const rhythmDirection = result.dominantBand.name === "gamma" || result.dominantBand.name === "beta"
    ? "fast activity dominates"
    : "slower activity dominates";
  const driveState = p.drive < 205 ? "reduced basal input lowers external drive, while recurrent and network terms can still keep firing above target" : p.drive > 245 ? "high basal input is pushing the mass toward stronger firing" : "basal input sits near the reference regime";
  insights.rhythm.textContent = `Rhythm: ${result.dominantBand.name} band. ${rhythmDirection}; ${driveState}.`;

  const densityState = density < 0.16 ? "sparse structural paths from the reduced real SC limit synchronization" : density > 0.28 ? "many retained SC paths support broader entrainment" : "the reduced SC allows partial synchronization";
  insights.coupling.textContent = `Coupling: ${fields.topology.options[fields.topology.selectedIndex]?.textContent || "network"} with K=${p.coupling.toFixed(2)}, integrity=${Math.round(p.integrity * 100)}%. ${densityState}; mean FC is ${result.meanFc.toFixed(2)}.`;

  if (!p.plasticity) {
    insights.plasticity.textContent = `Plasticity: off. C4 stays near its initial inhibitory gain, so firing error is not actively corrected.`;
  } else if (Math.abs(result.firingError) < 0.35) {
    insights.plasticity.textContent = `Plasticity: near target. C4 settled at ${result.finalC4.toFixed(1)} while firing stayed close to ${p.target.toFixed(1)} Hz.`;
  } else if (result.firingError > 0) {
    insights.plasticity.textContent = `Plasticity: above target. C4 is rising toward ${result.finalC4.toFixed(1)} to add inhibition and pull firing down.`;
  } else {
    insights.plasticity.textContent = `Plasticity: below target. Inhibition is relaxing toward ${result.finalC4.toFixed(1)} so pyramidal firing can recover.`;
  }
}

function setupCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width * dpr));
  const height = Math.max(1, Math.floor(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width: rect.width, height: rect.height };
}

function clear(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
}

function drawAxes(ctx, width, height, left, top, right, bottom) {
  ctx.strokeStyle = "#d9e0e2";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(left, height - bottom);
  ctx.lineTo(width - right, height - bottom);
  ctx.stroke();
  ctx.fillStyle = "#667376";
  ctx.font = "12px Inter, system-ui, sans-serif";
}

function renderTrace(result) {
  const { ctx, width, height } = setupCanvas(canvases.trace);
  clear(ctx, width, height);
  const left = 52;
  const right = 20;
  const top = 20;
  const bottom = 34;
  drawAxes(ctx, width, height, left, top, right, bottom);
  const values = Array.from(result.meanSignal);
  const start = Math.max(0, Math.floor(values.length * 0.18));
  const plot = values.slice(start);
  const min = Math.min(...plot);
  const max = Math.max(...plot);
  const span = Math.max(1e-6, max - min);
  const xScale = (width - left - right) / Math.max(1, plot.length - 1);
  const yScale = (height - top - bottom) / span;

  ctx.strokeStyle = "#167f76";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < plot.length; i += 1) {
    const x = left + i * xScale;
    const y = height - bottom - (plot[i] - min) * yScale;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  const nodeCount = Math.min(3, result.eeg.length);
  const colors = ["#2c6fb7", "#d95b43", "#6f63c6"];
  for (let node = 0; node < nodeCount; node += 1) {
    ctx.globalAlpha = 0.38;
    ctx.strokeStyle = colors[node];
    ctx.lineWidth = 1;
    ctx.beginPath();
    const nodeValues = Array.from(result.eeg[node]).slice(start);
    for (let i = 0; i < plot.length; i += 1) {
      const x = left + i * xScale;
      const y = height - bottom - (nodeValues[i] - min) * yScale;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#667376";
  ctx.font = "12px Inter, system-ui, sans-serif";
  ctx.fillText("mV", 16, top + 8);
  ctx.fillText(`${result.params.duration.toFixed(0)} s`, width - right - 28, height - 10);
}

function renderSpectrum(result) {
  const { ctx, width, height } = setupCanvas(canvases.spectrum);
  clear(ctx, width, height);
  const left = 46;
  const right = 18;
  const top = 18;
  const bottom = 34;
  drawAxes(ctx, width, height, left, top, right, bottom);
  const maxPower = Math.max(...result.spectrum.map((point) => point.power)) || 1;
  const plotW = width - left - right;
  const plotH = height - top - bottom;
  ctx.strokeStyle = "#2c6fb7";
  ctx.lineWidth = 2;
  ctx.beginPath();
  result.spectrum.forEach((point, i) => {
    const x = left + (point.f / 45) * plotW;
    const y = height - bottom - Math.sqrt(point.power / maxPower) * plotH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  if (baselineResult && baselineResult !== result) {
    const baselineMax = Math.max(...baselineResult.spectrum.map((point) => point.power)) || 1;
    ctx.strokeStyle = "rgba(21, 32, 34, 0.34)";
    ctx.lineWidth = 1.4;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    baselineResult.spectrum.forEach((point, i) => {
      const x = left + (point.f / 45) * plotW;
      const y = height - bottom - Math.sqrt(point.power / baselineMax) * plotH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);
  }

  for (const band of result.bands) {
    const x1 = left + (band.min / 45) * plotW;
    const x2 = left + (band.max / 45) * plotW;
    ctx.fillStyle = band.color;
    ctx.globalAlpha = 0.08 + band.share * 0.22;
    ctx.fillRect(x1, top, x2 - x1, plotH);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#667376";
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillText(band.key, x1 + 4, height - 12);
  }
}

function renderNetwork(result) {
  const { ctx, width, height } = setupCanvas(canvases.network);
  clear(ctx, width, height);
  const positions = result.network.positions.map((p) => ({ x: p.x * width, y: p.y * height }));
  if (result.params.editNetwork) {
    ctx.fillStyle = "#edf4f2";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.lineCap = "round";
  for (let i = 0; i < result.params.nodes; i += 1) {
    for (let j = i + 1; j < result.params.nodes; j += 1) {
      const w = result.network.matrix[i][j];
      if (w < 0.08) continue;
      ctx.strokeStyle = `rgba(22, 127, 118, ${Math.min(0.62, 0.12 + w * 0.25)})`;
      ctx.lineWidth = 0.8 + w * 1.2;
      ctx.beginPath();
      ctx.moveTo(positions[i].x, positions[i].y);
      ctx.lineTo(positions[j].x, positions[j].y);
      ctx.stroke();
    }
  }
  for (let i = 0; i < result.params.nodes; i += 1) {
    const fr = result.firingHistory[result.firingHistory.length - 1] || result.params.target;
    const color = fr > result.params.target ? "#d95b43" : "#2c6fb7";
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = selectedNode === i ? "#152022" : color;
    ctx.lineWidth = selectedNode === i ? 4 : 2;
    ctx.beginPath();
    ctx.arc(positions[i].x, positions[i].y, selectedNode === i ? 11 : 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  if (result.params.editNetwork) {
    ctx.fillStyle = "#667376";
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillText(selectedNode === null ? "select node" : `node ${selectedNode + 1} selected`, 14, height - 14);
  }
}

function fcColor(value) {
  const clipped = Math.max(-1, Math.min(1, value));
  if (clipped >= 0) {
    const t = clipped;
    return `rgb(${Math.round(242 - 75 * t)}, ${Math.round(246 - 119 * t)}, ${Math.round(247 - 129 * t)})`;
  }
  const t = -clipped;
  return `rgb(${Math.round(242 - 131 * t)}, ${Math.round(246 - 87 * t)}, ${Math.round(247 - 62 * t)})`;
}

function renderFc(result) {
  const { ctx, width, height } = setupCanvas(canvases.fc);
  clear(ctx, width, height);
  const matrix = getFcMatrix(result);
  const n = matrix.length;
  const pad = 26;
  const size = Math.min(width - pad * 2, height - pad * 2);
  const x0 = (width - size) / 2;
  const y0 = (height - size) / 2;
  const cell = size / n;
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      ctx.fillStyle = fcColor(matrix[i][j]);
      ctx.fillRect(x0 + j * cell, y0 + i * cell, Math.ceil(cell), Math.ceil(cell));
    }
  }
  ctx.strokeStyle = "#152022";
  ctx.globalAlpha = 0.18;
  ctx.strokeRect(x0, y0, size, size);
  ctx.globalAlpha = 1;
}

function renderBands(result) {
  const { ctx, width, height } = setupCanvas(canvases.bands);
  clear(ctx, width, height);
  const left = 40;
  const right = 20;
  const top = 18;
  const bottom = 32;
  const gap = 12;
  const barW = (width - left - right - gap * (result.bands.length - 1)) / result.bands.length;
  const plotH = height - top - bottom;
  result.bands.forEach((band, i) => {
    const x = left + i * (barW + gap);
    const h = plotH * band.share;
    ctx.fillStyle = "#edf4f2";
    ctx.fillRect(x, top, barW, plotH);
    ctx.fillStyle = band.color;
    ctx.fillRect(x, top + plotH - h, barW, h);
    ctx.fillStyle = "#152022";
    ctx.font = "bold 13px Inter, system-ui, sans-serif";
    ctx.fillText(band.key, x + barW / 2 - 4, height - 12);
    ctx.fillStyle = "#667376";
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillText(`${Math.round(band.share * 100)}%`, x + 4, top + plotH - h - 8);
    if (baselineResult && baselineResult !== result) {
      const baselineBand = baselineResult.bands.find((candidate) => candidate.id === band.id);
      if (baselineBand) {
        const y = top + plotH - plotH * baselineBand.share;
        ctx.strokeStyle = "rgba(21, 32, 34, 0.42)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + barW, y);
        ctx.stroke();
      }
    }
  });
}

function renderHomeostasis(result) {
  const { ctx, width, height } = setupCanvas(canvases.homeostasis);
  clear(ctx, width, height);
  const left = 48;
  const right = 22;
  const top = 18;
  const bottom = 34;
  drawAxes(ctx, width, height, left, top, right, bottom);
  const plotW = width - left - right;
  const plotH = height - top - bottom;
  const fr = Array.from(result.firingHistory);
  const c4 = Array.from(result.c4History);
  const c4Min = Math.min(...c4);
  const c4Max = Math.max(...c4);
  const c4Span = Math.max(1e-6, c4Max - c4Min);

  ctx.strokeStyle = "#c58a20";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 5]);
  const targetY = height - bottom - (result.params.target / 5) * plotH;
  ctx.beginPath();
  ctx.moveTo(left, targetY);
  ctx.lineTo(width - right, targetY);
  ctx.stroke();
  ctx.setLineDash([]);

  drawSeries(ctx, fr, left, top, plotW, plotH, 0, 5, "#167f76", 2);
  drawSeries(ctx, c4, left, top, plotW, plotH, c4Min, c4Span, "#d95b43", 2);

  ctx.fillStyle = "#667376";
  ctx.font = "12px Inter, system-ui, sans-serif";
  ctx.fillText("Hz", 15, top + 8);
  ctx.fillText("C4", width - 42, top + 8);
  ctx.fillStyle = "#167f76";
  ctx.fillText("firing", left + 8, top + 18);
  ctx.fillStyle = "#d95b43";
  ctx.fillText("inhibition", left + 68, top + 18);
}

function drawSeries(ctx, values, left, top, plotW, plotH, min, span, color, lineWidth) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  for (let i = 0; i < values.length; i += 1) {
    const x = left + (i / Math.max(1, values.length - 1)) * plotW;
    const y = top + plotH - ((values[i] - min) / Math.max(1e-6, span)) * plotH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function renderModel(result) {
  const { ctx, width, height } = setupCanvas(canvases.model);
  clear(ctx, width, height);
  const alpha = result.params.alpha;
  const gamma = 1 - alpha;
  const boxes = [
    { x: width * 0.08, y: height * 0.30, w: width * 0.25, h: 54, label: "Alpha mass", color: "#c58a20", value: alpha },
    { x: width * 0.08, y: height * 0.62, w: width * 0.25, h: 54, label: "Gamma mass", color: "#6f63c6", value: gamma },
    { x: width * 0.42, y: height * 0.46, w: width * 0.22, h: 60, label: "Pyramidal", color: "#167f76", value: result.finalFr / 5 },
    { x: width * 0.72, y: height * 0.46, w: width * 0.20, h: 60, label: "Inhibition", color: "#d95b43", value: result.finalC4 / (MODEL.C * 0.45) },
  ];
  ctx.lineWidth = 2;
  drawArrow(ctx, boxes[0].x + boxes[0].w, boxes[0].y + 27, boxes[2].x, boxes[2].y + 20, "#c58a20");
  drawArrow(ctx, boxes[1].x + boxes[1].w, boxes[1].y + 27, boxes[2].x, boxes[2].y + 42, "#6f63c6");
  drawArrow(ctx, boxes[2].x + boxes[2].w, boxes[2].y + 30, boxes[3].x, boxes[3].y + 30, "#167f76");
  drawArrow(ctx, boxes[3].x, boxes[3].y + 48, boxes[2].x + boxes[2].w, boxes[2].y + 48, "#d95b43", true);
  for (const box of boxes) {
    const fill = Math.max(0.08, Math.min(1, box.value));
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = box.color;
    ctx.lineWidth = 2;
    roundRect(ctx, box.x, box.y, box.w, box.h, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = box.color;
    ctx.globalAlpha = 0.13;
    ctx.fillRect(box.x, box.y + box.h * (1 - fill), box.w, box.h * fill);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#152022";
    ctx.font = "bold 13px Inter, system-ui, sans-serif";
    ctx.fillText(box.label, box.x + 12, box.y + 24);
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawArrow(ctx, x1, y1, x2, y2, color, inhibitory = false) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  const angle = Math.atan2(y2 - y1, x2 - x1);
  if (inhibitory) {
    ctx.save();
    ctx.translate(x2, y2);
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillRect(-8, -1, 16, 2);
    ctx.restore();
  } else {
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 10 * Math.cos(angle - 0.45), y2 - 10 * Math.sin(angle - 0.45));
    ctx.lineTo(x2 - 10 * Math.cos(angle + 0.45), y2 - 10 * Math.sin(angle + 0.45));
    ctx.closePath();
    ctx.fill();
  }
}

function renderAll(result) {
  renderTrace(result);
  renderSpectrum(result);
  renderNetwork(result);
  renderFc(result);
  renderHomeostasis(result);
  renderBands(result);
  renderModel(result);
}

document.querySelectorAll("[data-preset]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-preset]").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    setParams(PRESETS[button.dataset.preset]);
    rerun(true);
  });
});

document.querySelectorAll(".info-tip").forEach((tip) => {
  const openTip = (event) => {
    event.preventDefault();
    event.stopPropagation();
    tip.focus();
  };
  tip.addEventListener("pointerdown", openTip);
  tip.addEventListener("mousedown", openTip);
  tip.addEventListener("click", openTip);
  tip.addEventListener("keydown", (event) => {
    if (event.key === "Escape") tip.blur();
  });
});

Object.values(fields).forEach((field) => {
  field.addEventListener("input", () => {
    clearActivePreset();
    rerun(false);
  });
  field.addEventListener("change", () => {
    clearActivePreset();
    rerun(false);
  });
});

controls.fcBand.addEventListener("change", () => {
  if (!latest) return;
  updateMetrics(latest);
  renderFc(latest);
  setInspector(`FC view: ${fcBandLabel(controls.fcBand.value)} correlation matrix. Mean FC now reflects the selected band.`);
});

document.getElementById("rerunButton").addEventListener("click", () => rerun(true));
document.getElementById("pinBaselineButton").addEventListener("click", () => {
  if (!latest) return;
  baselineResult = latest;
  baselineName = "Pinned baseline";
  updateMetrics(latest);
  renderAll(latest);
  setInspector("Pinned the current run as the comparison baseline.");
});

document.getElementById("copyStateButton").addEventListener("click", () => {
  const url = shareUrl();
  copyToClipboard(url).then((copied) => {
    setInspector(copied ? "Copied a shareable URL for the current state." : `Share URL: ${url}`);
  });
});

document.getElementById("exportStateButton").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(serializeState(), null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "eeg-dementias-model-lab-state.json";
  link.click();
  URL.revokeObjectURL(link.href);
  setInspector("Exported current parameters and custom network state as JSON.");
});

document.getElementById("importStateButton").addEventListener("click", () => controls.importStateFile.click());
controls.importStateFile.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      applyState(JSON.parse(String(reader.result)));
      setInspector("Imported saved model state.");
    } catch {
      setInspector("Import failed: the selected file was not a valid saved state.");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
});

document.getElementById("resetAllButton").addEventListener("click", () => {
  customNetwork = null;
  selectedNode = null;
  undoStack = [];
  redoStack = [];
  learningProgress.clear();
  updateNetworkHistoryButtons();
  baselineResult = null;
  baselineName = "Balanced baseline";
  controls.fcBand.value = "broadband";
  setActivePreset("balanced");
  setParams(PRESETS.balanced);
  rerun(true);
  setInspector("Reset all parameters, comparison state, network edits, and tour progress.");
});

document.getElementById("resetLearningButton").addEventListener("click", () => {
  learningProgress.clear();
  if (latest) updateLearningPath(latest);
  setInspector("Learning tour reset. Start again by finding a clean alpha rhythm.");
});

document.getElementById("resetNetworkButton").addEventListener("click", () => {
  pushNetworkUndo();
  customNetwork = null;
  selectedNode = null;
  if (fields.topology.value === "custom") fields.topology.value = "reduced-sc";
  rerun(true);
});

document.getElementById("undoNetworkButton").addEventListener("click", () => {
  if (!undoStack.length) return;
  const params = getParams();
  const current = customNetwork || latest?.network?.rawMatrix || presetMatrix(params.nodes, params.topology);
  redoStack.push(cloneMatrix(resizeMatrix(current, params.nodes)));
  restoreNetwork(undoStack.pop());
  setInspector("Undid the last network edit.");
  updateNetworkHistoryButtons();
});

document.getElementById("redoNetworkButton").addEventListener("click", () => {
  if (!redoStack.length) return;
  const params = getParams();
  const current = customNetwork || latest?.network?.rawMatrix || presetMatrix(params.nodes, params.topology);
  undoStack.push(cloneMatrix(resizeMatrix(current, params.nodes)));
  restoreNetwork(redoStack.pop());
  setInspector("Redid the network edit.");
  updateNetworkHistoryButtons();
});

controls.lessonSelect.addEventListener("change", updateLessonNote);
document.getElementById("lessonStartButton").addEventListener("click", () => applyLessonSide("start"));
document.getElementById("lessonContrastButton").addEventListener("click", () => applyLessonSide("contrast"));

canvases.network.addEventListener("click", (event) => {
  if (!latest) return;
  if (!fields.editNetwork.checked) {
    inspectNetwork(event);
    return;
  }
  const rect = canvases.network.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const hit = nearestNode(latest.network.positions, x / rect.width, y / rect.height);
  if (hit === null) return;
  if (selectedNode === null || selectedNode === hit) {
    selectedNode = selectedNode === hit ? null : hit;
    renderNetwork(latest);
    return;
  }
  toggleCustomEdge(selectedNode, hit);
  selectedNode = null;
  rerun(true);
});

canvases.spectrum.addEventListener("click", (event) => inspectSpectrum(event));
canvases.bands.addEventListener("click", (event) => inspectBands(event));
canvases.fc.addEventListener("click", (event) => inspectFc(event));
canvases.homeostasis.addEventListener("click", (event) => inspectHomeostasis(event));
canvases.trace.addEventListener("click", (event) => inspectTrace(event));
canvases.model.addEventListener("click", () => setInspector("Local circuit: alpha and gamma subpopulations are mixed into pyramidal, excitatory, and inhibitory state variables; C4 is the adaptive inhibitory gain."));

function nearestNode(positions, x, y) {
  let best = null;
  let bestDistance = Infinity;
  for (let i = 0; i < positions.length; i += 1) {
    const dx = positions[i].x - x;
    const dy = positions[i].y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < bestDistance) {
      best = i;
      bestDistance = distance;
    }
  }
  return bestDistance < 0.06 ? best : null;
}

function setActivePreset(key) {
  document.querySelectorAll("[data-preset]").forEach((item) => item.classList.toggle("is-active", item.dataset.preset === key));
}

function clearActivePreset() {
  document.querySelectorAll("[data-preset]").forEach((item) => item.classList.remove("is-active"));
}

function applyScenario(params, presetKey = null) {
  if (presetKey) setActivePreset(presetKey);
  else clearActivePreset();
  setParams(params);
  rerun(true);
}

function updateLessonNote() {
  controls.lessonNote.textContent = LESSONS[controls.lessonSelect.value]?.note || "";
}

function applyLessonSide(side) {
  const lesson = LESSONS[controls.lessonSelect.value];
  if (!lesson) return;
  applyScenario(lesson[side], null);
  setInspector(`${side === "start" ? "Loaded lesson start" : "Loaded lesson contrast"}: ${lesson.note}`);
}

function serializeState() {
  return {
    version: 2,
    params: getParams(),
    fcBand: controls.fcBand.value,
    customNetwork: customNetwork ? cloneMatrix(customNetwork) : null,
  };
}

function applyState(state) {
  if (!state?.params) throw new Error("Missing params");
  customNetwork = state.customNetwork ? cloneMatrix(state.customNetwork) : null;
  selectedNode = null;
  controls.fcBand.value = state.fcBand || "broadband";
  clearActivePreset();
  setParams(state.params);
  rerun(true);
}

function shareUrl() {
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(serializeState()))));
  const url = new URL(window.location.href);
  url.searchParams.set("state", encoded);
  return url.toString();
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall back below when browsers deny clipboard permission on local files/dev servers.
    }
  }
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.left = "-9999px";
  document.body.appendChild(field);
  field.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  field.remove();
  return copied;
}

function loadStateFromUrl() {
  const encoded = new URLSearchParams(window.location.search).get("state");
  if (!encoded) return false;
  try {
    applyState(JSON.parse(decodeURIComponent(escape(atob(encoded)))));
    return true;
  } catch {
    setInspector("Could not load state from URL; using Balanced preset.");
    return false;
  }
}

function setInspector(text) {
  controls.inspector.textContent = text;
}

function canvasPoint(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top, w: rect.width, h: rect.height };
}

function inspectSpectrum(event) {
  if (!latest) return;
  const p = canvasPoint(event, canvases.spectrum);
  const left = 46;
  const right = 18;
  const f = Math.max(1, Math.min(45, ((p.x - left) / Math.max(1, p.w - left - right)) * 45));
  const point = latest.spectrum.reduce((best, item) => (Math.abs(item.f - f) < Math.abs(best.f - f) ? item : best), latest.spectrum[0]);
  const band = BAND_SPECS.find((candidate) => point.f >= candidate.min && point.f < candidate.max);
  setInspector(`Spectrum: ${point.f.toFixed(0)} Hz sits in ${band?.name || "unbanded"} power. The dashed line, when visible, is the pinned comparison baseline.`);
}

function inspectBands(event) {
  if (!latest) return;
  const p = canvasPoint(event, canvases.bands);
  const left = 40;
  const right = 20;
  const gap = 12;
  const barW = (p.w - left - right - gap * (latest.bands.length - 1)) / latest.bands.length;
  const index = Math.floor((p.x - left) / (barW + gap));
  const band = latest.bands[Math.max(0, Math.min(latest.bands.length - 1, index))];
  setInspector(`${band.name} band: ${Math.round(band.share * 100)}% of modeled 1-45 Hz power in this run.`);
}

function inspectFc(event) {
  if (!latest) return;
  const matrix = getFcMatrix(latest);
  const p = canvasPoint(event, canvases.fc);
  const pad = 26;
  const size = Math.min(p.w - pad * 2, p.h - pad * 2);
  const x0 = (p.w - size) / 2;
  const y0 = (p.h - size) / 2;
  const i = Math.floor((p.y - y0) / (size / matrix.length));
  const j = Math.floor((p.x - x0) / (size / matrix.length));
  if (i < 0 || j < 0 || i >= matrix.length || j >= matrix.length) return;
  setInspector(`${fcBandLabel(controls.fcBand.value)} FC: region ${i + 1} to ${j + 1} correlation is ${matrix[i][j].toFixed(2)}.`);
}

function inspectHomeostasis(event) {
  if (!latest) return;
  const p = canvasPoint(event, canvases.homeostasis);
  const left = 48;
  const right = 22;
  const index = Math.max(0, Math.min(latest.firingHistory.length - 1, Math.round(((p.x - left) / Math.max(1, p.w - left - right)) * (latest.firingHistory.length - 1))));
  const time = (index / Math.max(1, latest.firingHistory.length - 1)) * latest.params.duration;
  setInspector(`Homeostasis at ${time.toFixed(1)} s: firing ${latest.firingHistory[index].toFixed(2)} Hz, C4 inhibition ${latest.c4History[index].toFixed(1)}.`);
}

function inspectTrace(event) {
  if (!latest) return;
  const p = canvasPoint(event, canvases.trace);
  const left = 52;
  const right = 20;
  const index = Math.max(0, Math.min(latest.meanSignal.length - 1, Math.round(((p.x - left) / Math.max(1, p.w - left - right)) * (latest.meanSignal.length - 1))));
  const time = (index / Math.max(1, latest.meanSignal.length - 1)) * latest.params.duration;
  setInspector(`EEG-like trace at ${time.toFixed(1)} s: network-average signal ${latest.meanSignal[index].toFixed(3)} mV-equivalent.`);
}

function inspectNetwork(event) {
  if (!latest) return;
  const p = canvasPoint(event, canvases.network);
  const hit = nearestNode(latest.network.positions, p.x / p.w, p.y / p.h);
  if (hit === null) {
    setInspector("Structural network: edge thickness shows SC weight after integrity scaling; node color reflects whether firing is above target.");
    return;
  }
  const degree = latest.network.matrix[hit].filter((value) => value > 0.08).length;
  const strength = latest.network.matrix[hit].reduce((sum, value) => sum + value, 0);
  setInspector(`Region ${hit + 1}: ${degree} visible edges, structural strength ${strength.toFixed(2)}.`);
}

window.addEventListener("resize", () => {
  if (latest) renderAll(latest);
});

window.ModelLab = {
  get latest() {
    return latest;
  },
  presets: PRESETS,
  simulate,
  presetMatrix,
  serializeState,
};

updateNetworkHistoryButtons();
updateLessonNote();
if (!loadStateFromUrl()) {
  setParams(PRESETS.balanced);
  rerun(true);
}
