# Vehicle-Shadow With MongoDB Realm

Leveraging object / document stores for [VSS](https://covesa.github.io/vehicle_signal_specification/introduction/overview/) data is the perfect combination.

MongoDB Atlas in combination with Realm provides an awesome foundation to build your distinct next generation customer experience! Realm DB and MongoDB Atlas make structuring of your VSS data easy and efficient.
With the out of the box Realm Sync capabilities you can bi-directionaly synchronise vehicle state on field level and compressed, between vehicle, the backend and customer apps!

The demo is split into two parts:
- Using out of the box Realm Sync to synchronise vehicle state with customer apps
- Easy straightforward MQTT integration through Realm change notifications to leverage preexisting connectivity or synchronize multiple realms on different ECUs onboard.

## Prerequisits:

**_NOTE:_**  I ran into issues with the latest node package and switched to 15.

* [Install npm / Realm SDK](https://docs.mongodb.com/realm/sdk/node/)
* [Install Realm Studio](https://docs.mongodb.com/realm/studio/)

## Demo Setup

Create brand specific vin: [https://vingenerator.org/brand](https://vingenerator.org/brand)

### Setup Realm Application
[Get Started](https://docs.mongodb.com/realm/sync/get-started/)

### Configure Vehicle and Customer

- Create vehicle and customer profile
- Open demoConfig.js and fill in the appID and usernames/passwords.

### Run The Demo

**_NOTE:_**  I ran into issues with the latest node package and switched to 15.

Start the vehicle instance which will create the shadow instance in MongoDB Atlas.

```node vehicleInstance.js```

Start the customer app which will sync the vehicle shadow and set up a change listener.

```node customerApp.js```

Connect with a MongoDB Shell: 

[Connect to MongoDB Atlas Database](https://docs.atlas.mongodb.com/connect-to-cluster/#use-the-connect-to-your-cluster-dialog-to-connect-to-your-cluster)

Run this command to trigger changes on the shadow instance:

```db.Vehicle.updateOne({},{$set:{"miles": 200, "engine.cc":2}})```
