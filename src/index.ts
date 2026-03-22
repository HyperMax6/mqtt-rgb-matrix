import apps from './apps/apps.js';
import controller from './lib/matrix.js';
import client from './lib/mqtt.js';

client.on('message', async (topic, message) => {
  try {
    if (topic === 'matrix/control') {
      const off = message.toString() === 'OFF';
      const on = message.toString() === 'ON';

      if (off) {
        await controller.stop();
        client.publish('matrix/state', 'OFF');
      }
      if (on) {
        if (controller.isRunning()) return client.publish('matrix/state', 'ON');
        controller.runLastApp();
        client.publish('matrix/state', 'ON');
      }
    }

    if (topic === 'matrix/control/app') {
      const app = apps[message.toString()];

      if (!app) return console.error('App not found:', message.toString());

      controller.run(app);
      client.publish('matrix/state/app', message.toString());
      client.publish('matrix/state', 'ON');
    }

    if (topic === 'matrix/control/brightness') {
      controller.setBrightness(Number(message));
      client.publish('matrix/state/brightness', message.toString());
    }
  } catch (err) {
    console.error('MQTT error:', err);
  }
});

setTimeout(() => {
  client.publish('matrix/state', 'ON');
  client.publish('matrix/state/app', 'Connected');
  client.publish('matrix/state/brightness', '60');

  const app = apps['Connected'];

  if (!app) return;
  controller.run(app);
  controller.setBrightness(60);
}, 100);
