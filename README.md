# Zen Relay

Zen Relay is a self-hosted websockets relay providing connectivity to Zen Client and Zen Bridge pairings.

A public instance is available at [relay.amnesia.software](https://relay.amnesia.software) (`wss://relay.amnesia.software`).

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
