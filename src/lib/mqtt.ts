import mqtt from 'mqtt';

const serverIp = process.env.MQTT_SERVER_IP;
let serverPort = process.env.MQTT_SERVER_PORT || 1883;

if (!serverIp) throw new Error('Server IP not defined');

const client = mqtt.connect(`mqtt://${serverIp}:${serverPort}`);

client.on('connect', () => {
  console.log('Connected to MQTT server');

  client.subscribe('matrix/control');
  client.subscribe('matrix/control/brightness');
  client.subscribe('matrix/control/app');
  client.subscribe('matrix/state');
  client.subscribe('matrix/state/brightness');
  client.subscribe('matrix/state/app');
});

export default client;
