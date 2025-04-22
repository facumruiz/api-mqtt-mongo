# api-mqtt-mongo

## How To Run
Create the file `.env` in the root directory of your project. The file should look like this:
```
# Port where the API will run
PORT=3000

# URI for connecting to the MongoDB database (MongoDB Atlas or similar)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.oj1uh.mongodb.net/mqtt?retryWrites=true&w=majority

# MQTT broker URL (you can change this to any public or private broker)
MQTT_BROKER=mqtt://broker.hivemq.com:1883

# MQTT topic to which the client will subscribe and publish messages
MQTT_TOPIC=topico/lecturas
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


