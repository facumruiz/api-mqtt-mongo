# api-mqtt-mongo

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)


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



## 🦟 Broker Mosquitto

Before you start, make sure you have the following installed:

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)  
  > ✅ Docker must be properly installed and running on your system.  
  > You can verify it by running:  
  > ```bash
  > docker --version
  > docker-compose --version
  > ```

```
docker-compose up -d
```

### 📜 Logs:
You can view the broker logs to ensure it's running correctly:
```
docker logs -f api-mqtt-mongo-mosquitto-1
```


```
1745425260: mosquitto version 2.0.21 starting
1745425260: Config loaded from /mosquitto/config/mosquitto.conf.
1745425260: Opening ipv4 listen socket on port 1883.
1745425260: Opening ipv6 listen socket on port 1883.
1745425260: mosquitto version 2.0.21 running
1745425265: New connection from 172.19.0.1:55264 on port 1883.
```

