# EEG Dementias Model Lab

Interactive browser app inspired by [carlosmig/EEG-Dementias](https://github.com/carlosmig/EEG-Dementias), a research codebase for EEG simulations using modified Jansen-Rit neural mass models in aging and dementia.

This app is a teaching-oriented, browser-native approximation. It keeps the main mechanisms from the original repository's modified Jansen-Rit model:

- alpha and gamma neural-mass subpopulations
- structural long-range coupling
- stochastic pyramidal input
- inhibitory synaptic plasticity through C4
- EEG-like readouts, spectral power, broadband and band-limited functional connectivity
- editable teaching network presets, including reduced real SC, small-world, modular, hub, split-module, random sparse, and custom edge edits with undo/redo

For browser responsiveness it runs a reduced network size in JavaScript rather than the full 90-region NumPy/Numba simulation.

## Learning Features

- Guided lessons compare paired model states for coupling, plasticity, network damage, and rhythm shifts.
- A **0 → 100 Learning Path** turns exploration into four progressive missions (rhythm, coupling, damage, homeostasis) with live auto-checks, coaching prompts, and one-click target states that make every step achievable.
- A pinned baseline overlays the spectrum and band-power plots so parameter changes can be read as contrasts.
- Run-quality checks flag parameter regimes that leave the intended teaching range.
- Plot inspectors explain clicked spectrum points, power bands, FC cells, structural nodes, traces, and homeostasis trajectories.
- The simulator always uses the higher-quality browser path, with longer burn-in and denser sampling for smoother spectra and FC estimates.
- Share links and JSON export/import preserve parameters and custom network edits.

## Teaching Presets

The built-in presets were selected from a parameter sweep of the interactive model to expose qualitatively different regimes:

- **Balanced**: source-like reduced-SC baseline with moderate alpha activity and modest FC.
- **Theta sync**: high functional connectivity with theta-dominant synchronization.
- **Alpha hub**: hub topology with alpha-dominant activity and intermediate FC.
- **Local gamma**: uncoupled local fast activity with low FC.
- **Fragmented mixed**: split-module topology with low FC and a mixed low-frequency spectrum.
- **Overdrive**: intentionally unstable/homeostatically unbalanced example that triggers a warning.

These presets are meant for learning and hypothesis-building. They should not be treated as calibrated clinical or subject-level simulations.

## 0 → 100 Teaching Flow (recommended)

Use the Learning Path panel as a structured sequence:

1. **Find a clean alpha rhythm**: load the alpha target or tune into stable alpha-dominant activity.
2. **Make coupling synchronize regions**: load the synchrony target or increase coupling until FC rises above 0.45.
3. **Fragment the network**: load the damage target or reduce integrity until FC falls below 0.25.
4. **Rescue firing with plasticity**: load the rescue target or restore integrity, enable plasticity, and bring firing error within +/-0.4 Hz.

This progression is designed to move a learner from intuition ("what changes?") to mechanism ("why did it change?") using immediate feedback from metrics and plots.

## Scientific Scope

The app is designed to teach parameter effects, not diagnose dementia or reproduce a subject-specific EEG. It preserves the qualitative structure of the source model while simplifying the integration, connectivity size, and signal analysis enough to keep interaction immediate in the browser.

## Run

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/`.
