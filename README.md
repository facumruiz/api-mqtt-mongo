# api-mqtt-mongo

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)

## 🚀 Release v3 – MQTT API Endpoints

This release includes:

- ✅ GET endpoint /api/getMessages to retrieve all messages stored from MQTT.
- ✅ POST endpoint /api/publish to send test messages to the allowed topics.
- 🔒 Strict topic validation to prevent errors or misuse.

Allowed topics:
- dispositivo/temperatura
- dispositivo/humedad
- dispositivo/relay1
- dispositivo/relay2
- dispositivo/relay3

This version is ideal for testing, debugging, and validating MQTT communication via REST API.

## How To Run
Create the file `.env` in the root directory of your project. The file should look like this:
```
# Server Configuration
PORT=3000

# MongoDB Configuration
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
DB_NAME=mqtt
MQTT_COLLECTION=lecturas

# MQTT Configuration
MQTT_BROKER=mqtts://<broker-ip-or-hostname>

MQTT_TOPIC_TEMP=dispositivo/temperatura
MQTT_TOPIC_HUM=dispositivo/humedad
MQTT_TOPIC_R1=dispositivo/relay1
MQTT_TOPIC_R2=dispositivo/relay2
MQTT_TOPIC_R3=dispositivo/relay3

# TLS Certificate Options
# Option 1: Load from local file
MQTT_CA_PATH=certs/ca.crt

# Option 2: Load from base64-encoded string (used in production)
MQTT_CA_CERT_BASE64=<your-base64-encoded-ca-cert>

```

Start server:
```
npm install
node index
```



This will allow you to send messages to the MQTT topic and verify that everything is working as expected.




