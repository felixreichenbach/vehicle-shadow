const { app, ipcMain, BrowserWindow } = require('electron')
const path = require('path')

const Realm = require("realm");
const schema = require("./schema.js");

let win;

////////////////////////
// Electron Window Management Part
////////////////////////

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.webContents.openDevTools();
  // to prevent the Sync Connection from ending prematurely, start reading from stdin so we don't exit
  process.stdin.resume();
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

////////////////////////
// Realm Sync Part
////////////////////////

const vehicleSchemas = [schema.vehicleSchema, schema.vehicle_attributesSchema, schema.vehicle_signalsSchema, schema.vehicle_signals_gps_coordsSchema];

// create a new instance of the Realm.App
const realmApp = new Realm.App({ id: "simple-vehicle-iqsqk" });
async function run() {
  // login with credentials
  await realmApp.logIn(Realm.Credentials.emailPassword("customer", "customer"));
  const realm = await Realm.open({
    schema: vehicleSchemas,
    path: "./realm/vehicleShadow.realm",
    sync: {
      user: realmApp.currentUser,
      partitionValue: realmApp.currentUser.profile.email,
    },
  });
}

run().catch(err => {
  console.error("Failed to open realm:", err)
});


////////////////////////
// Inter Process Communication IPCRenderer Part
////////////////////////


ipcMain.on("toMain", (event, args) => {
  // Print received data from renderer
  console.log("Received " + args + "from renderer!");
  // Send data to renderer process
  win.webContents.send("fromMain", "Hello World");
});