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
# Port where the API will run
PORT=3000

# MongoDB connection URI (replace <USERNAME>, <PASSWORD>, <CLUSTER> and <DB_NAME> accordingly)
MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/<DB_NAME>?retryWrites=true&w=majority

# MQTT broker configuration
MQTT_BROKER=mqtts://<BROKER_IP>:8883
MQTT_TOPIC=facu/lecturas

# Path to the CA certificate for secure MQTT connection
MQTT_CA_PATH=certs/ca.crt

# MongoDB database and collection names
DB_NAME=mqtt
MQTT_COLLECTION=lecturas
```

Start server:
```
npm install
node index
```



This will allow you to send messages to the MQTT topic and verify that everything is working as expected.




