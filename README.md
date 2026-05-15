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

## Run

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/`.
