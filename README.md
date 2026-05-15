# EEG Dementias Model Lab

Interactive browser app inspired by [carlosmig/EEG-Dementias](https://github.com/carlosmig/EEG-Dementias), a research codebase for EEG simulations using modified Jansen-Rit neural mass models in aging and dementia.

This app is a teaching-oriented, browser-native approximation. It keeps the main mechanisms from the original repository's modified Jansen-Rit model:

- alpha and gamma neural-mass subpopulations
- structural long-range coupling
- stochastic pyramidal input
- inhibitory synaptic plasticity through C4
- EEG-like readouts, spectral power, and functional connectivity
- editable teaching network presets, including reduced real SC, small-world, modular, hub, split-module, random sparse, and custom edge edits

For browser responsiveness it runs a reduced network size in JavaScript rather than the full 90-region NumPy/Numba simulation.

## Teaching Presets

The built-in presets were selected from a parameter sweep of the interactive model to expose qualitatively different regimes:

- **Balanced**: source-like reduced-SC baseline with moderate beta activity.
- **Theta sync**: high functional connectivity with theta-dominant synchronization.
- **Alpha hub**: hub topology with alpha-dominant activity and intermediate FC.
- **Local gamma**: uncoupled local fast activity with low FC.
- **Fragmented beta**: split-module topology with low FC and beta activity.
- **Overdrive**: intentionally unstable/homeostatically unbalanced example that triggers a warning.

These presets are meant for learning and hypothesis-building. They should not be treated as calibrated clinical or subject-level simulations.

## Run

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/`.
