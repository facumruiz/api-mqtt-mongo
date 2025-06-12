// services/mqttListener.js
import mqtt from 'mqtt';
import { broker, mqttOptions, topicTemp, topicHum, topicR1, topicR2, topicR3 } from '../config/mqttConfig.js';
import { connectToMongo } from './mongoService.js';
import { collectionName } from '../config/mqttConfig.js';

let client = null;
let isActive = false;

export function startMqttListener() {
    if (isActive) {
        console.log('⚠️ MQTT Listener ya está activo');
        return;
    }

    client = mqtt.connect(broker, mqttOptions);

    client.on('connect', () => {
        console.log('🔌 Conectado a MQTT Broker');
        client.subscribe([topicTemp, topicHum, topicR1, topicR2, topicR3], (err) => {
            if (!err) {
                console.log('✅ Subscripción a los tópicos MQTT');
            }
        });
    });

    client.on('message', async (topic, message) => {
        const collection = await connectToMongo(collectionName);
        await collection.insertOne({
            topic,
            message: message.toString(),
            timestamp: new Date()
        });
        console.log(`📥 Mensaje recibido [${topic}]: ${message}`);
    });

    isActive = true;
}

export function stopMqttListener() {
    if (client && isActive) {
        client.end(() => {
            console.log('🛑 MQTT Listener detenido');
        });
        isActive = false;
    } else {
        console.log('⚠️ MQTT Listener ya está detenido');
    }
}

export function getMqttListenerStatus() {
    return isActive;
}
