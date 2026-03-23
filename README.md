# MQTT RGB Matrix

A TypeScript application for Raspberry Pi that turns an RGB LED matrix panel into a remote-controlled display via MQTT. Built with alexeden's [TypeScript wrapper](https://github.com/alexeden/rpi-led-matrix/) for the [rpi-rgb-led-matrix](https://github.com/hzeller/rpi-rgb-led-matrix) library.

## Features

- **MQTT Control**: Switch between display modes remotely via MQTT messages
- **Multiple Display Modes**:
  - **LGBTQ**: Animated pride flag effect
  - **Digital Clock**: Time display with multiple font options
  - **LGBTQ Clock**: Pride flag background with clock overlay
  - **Text**: Custom text messages
  - **PNG Images**: Display static images from the assets folder
- **Persistent State**: Last active mode saved to SQLite database and restored on restart
- **Asset Caching**: PNG images decoded once and cached for optimal performance
- **Configurable FPS**: Each mode can have its own refresh rate

## Requirements

### Hardware
- Raspberry Pi (any model with GPIO pins)
- RGB LED Matrix Panel (64x64 or configurable size)
- Power supply for the LED panel
- Optional: Proper wiring/hat for connecting the panel to the Pi

### Software
- Node.js 18+ or 20+
- TypeScript
- pnpm (package manager)
- MQTT broker (e.g., Mosquitto)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mqtt-rgb-matrix
```

2. Install dependencies (can take a while):
```bash
npm install
``` 

3. Build the TypeScript:
```bash
npm run build
```

4. Configure environment variables (see Configuration section):
```bash
nano .env
```

5. Run the application:
```bash
# Production
npm run start

# Development (with hot reload)
npm run dev
```

## Configuration

Create a `.env` file in the project root:

```env
# MQTT Broker Configuration
MQTT_SERVER_IP='192.168.1.3'

# Matrix Hardware Configuration
MATRIX_HARDWARE_MAPPING='AdafruitHatPwm'  # Options: Regular, AdafruitHat, AdafruitHatPwm, Classic
MATRIX_SLOWDOWN=2                        # GPIO slowdown (0-4, higher = slower but more stable)
MATRIX_WIDTH=64                          # Panel width in pixels (default: 64)
MATRIX_HEIGHT=64                         # Panel height in pixels (default: 64)
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MQTT_SERVER_IP` | - | **Required.** IP address of your MQTT broker |
| `MATRIX_HARDWARE_MAPPING` | `Regular` | GPIO mapping type for your hat/wiring |
| `MATRIX_SLOWDOWN` | `0` | GPIO slowdown (0-4). Increase if you see flickering |
| `MATRIX_WIDTH` | `64` | Panel width in pixels |
| `MATRIX_HEIGHT` | `64` | Panel height in pixels |

## MQTT Topics

The application listens for control messages on the following MQTT topics:

- **`matrix/control`** - Turn the display on and off
  - Payload: `ON` or `OFF`
  
- **`matrix/control/brightness`** - 
  - Payload: number between `0` and `100`

- **`matrix/control/app`** -
  - Payload: one of the app names

> The MQTT infrastructure is tailor-made for [Home Assistant](https://www.home-assistant.io/), but should be adaptable to any workflow. 

## Default Apps

| App | Description |
|------|-------------|
| `LGBTQ` | Rainbow pride flag |
| `Digital Clock` | Current time in large font |
| `LGBTQ Clock` | Pride flag background with clock |
| `Connected` | Shows "Connected!" message |
| `Demon Days` | Displays demon-days.png image |

## Creating Apps

> There are future plans to switch to a SQLite approach for user-friendly configuration.

Every app is made up of app functions. You can create your own app functions inside the `src/apps/` directory.
Defining apps is done in `src/apps/apps.ts`. See more about developing apps in the [development](#development) section.

## Assets

Place your files in the appropriate directories:

```
assets/
├── animations/     # Animation files (future)
├── fonts/         # BDF font files for text display
└── pictures/      # PNG images for the PNG mode
```

Images should be sized to match your panel dimensions (default 64x64).

## Project Structure

```
├── assets/              # Static assets (fonts, images)
├── src/
│   ├── apps/           # Display mode implementations
│   │   ├── apps.ts     # Mode definitions and registry
│   │   ├── digital-clock.ts
│   │   ├── lgbtq.ts
│   │   ├── png.ts
│   │   └── text.ts
│   ├── lib/            # Core libraries
│   │   ├── matrix.ts   # LED matrix controller
│   │   ├── mqtt.ts     # MQTT client
│   │   └── db.ts       # SQLite persistence
│   ├── utils/          # Utilities
│   │   ├── helpers.ts  # Drawing helpers
│   │   └── assets.ts   # Asset loading with caching
│   └── index.ts        # Application entry point
├── data.db             # SQLite database (auto-created)
├── .env                # Environment configuration
└── package.json
```

# Development

## Scripts

- `npm run build` - Compile TypeScript
- `npm start` - Run compiled code (requires sudo for GPIO access)
- `npm run dev` - Development mode with hot reload

## Adding New Apps

1. Create a new file in `src/apps/` (e.g., `my-app.ts`)
2. Export an async function that takes `(matrix, options)`
3. Register the app in `src/apps/apps.ts`
4. Define options type in `AppFunctionOptions` if needed

Example:
```typescript
import type { LedMatrixInstance } from 'rpi-led-matrix';
import type { AppFunctionOptions } from './apps.js';

async function myApp(matrix: LedMatrixInstance, options?: AppFunctionOptions) {
  // Your drawing code here
  matrix.fgColor({ r: 255, g: 0, b: 0 }).fill();
}

export default myMode;
```

# Troubleshooting

### Permission Denied
The application requires root access to control GPIO pins. Use `sudo` or run as root.

### Flickering Display
Increase `MATRIX_SLOWDOWN` in your `.env` file (try values 1-4).

### MQTT Connection Issues
- Verify `MQTT_SERVER_IP` is correct
- Ensure the MQTT broker is running and accessible
- Check firewall rules if using a remote broker

## License

UNLICENSED

## Credits

- Built with [rpi-led-matrix](https://github.com/alexeden/rpi-led-matrix/) TypeScript wrapper
- Underlying C++ library: [rpi-rgb-led-matrix](https://github.com/hzeller/rpi-rgb-led-matrix)
