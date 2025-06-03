# api-mqtt-mongo

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)


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

## 📝 Testing the MQTT Topic
In the test/mqttTest.js file, you’ll find a script to help you publish and test messages on the MQTT topic. You can use this script to test if your application can successfully publish messages to the broker and subscribe to the topic.

To run the test script:
1. Make sure your .env file is configured correctly.
2. Run the test script with the following command:

```
node test/mqttTest.js
```

This will allow you to send messages to the MQTT topic and verify that everything is working as expected.




