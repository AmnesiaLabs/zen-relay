# Zen Relay 

💬🧠 A self-hosted and easily hackable websockets relay server built for [Zen Client](https://github.com/AmnesiaLabs/zen-client) and [Zen Bridge](https://github.com/AmnesiaLabs/zen-bridge) –

<img align="right" src="https://i.imgur.com/zU5CCVS.gif" height="200">

- Open source and built upon well-established JS libraries.
- Easy to deploy, modify and customize for any needs.
- Runs on any operating system (as long as [Node v.12.16.3](https://nodejs.org/en/download/) is installed!)
- Entirely transparent.

[![package version](https://img.shields.io/github/package-json/v/AmnesiaLabs/zen-relay?color=g&label=version)](https://github.com/AmnesiaLabs/zen-relay)
[![package issues](https://img.shields.io/github/issues-raw/AmnesiaLabs/zen-relay)](https://github.com/AmnesiaLabs/zen-relay)
[![package issues](https://img.shields.io/github/issues-closed/AmnesiaLabs/zen-relay)](https://github.com/AmnesiaLabs/zen-relay)


## Links

- See [releases](https://github.com/AmnesiaLabs/zen-relay/releases) for a detailed version history.
- Please [open an issue](https://github.com/AmnesiaLabs/zen-relay/issues/new) if anything is missing or unclear in this
  documentation.

<details>
  <summary><strong>Table of Contents</strong> (click to expand)</summary>

<!-- toc -->

- [Visual Demonstration](#visual-demonstration)
- [Installation](#installation)
- [Running](#running)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

<!-- tocstop -->

</details>

# Visual Demonstration

This gif shows a dev installing and running this project from scratch on macOS 10.15.3's Terminal.app, with [Node v.12.16.3](https://nodejs.org/en/download/) pre-installed –

[![asciicast](https://i.imgur.com/zU5CCVS.gif)](https://asciinema.org/a/J7LQKkyHUi1h6Xqav0b09Rjl1)

A public instance is available at [relay.amnesia.software](https://relay.amnesia.software) (`wss://relay.amnesia.software`). Feel free to use and test on this instance.

## Installation

Use the package manager [npm](https://npmjs.com) to install Zen Relay's dependencies.
```bash
git clone https://github.com/AmnesiaLabs/zen-relay
cd zen-relay
npm i
```

## Running

```bash
node index.js <port>
```


## Endpoints

### GET /stats

Returns a health report and basic statistics ([demo](https://relay.amnesia.software/stats)) in a 200 response.

```json
{"connected_clients":6,"health":"ok"}
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GNU General Public License v3.0](https://github.com/AmnesiaLabs/zen-relay/blob/master/LICENSE.md)
