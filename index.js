const { OpenRGBClient } = require("openrgb");

async function start() {
    const client = new OpenRGBClient({
        host: "127.0.0.1",
        port: 6742,
        name: "Red Example"
    });

    await client.connect();
    const controllerCount = await client.getControllerCount();

    for (let deviceId = 0; deviceId < controllerCount; deviceId++) {
        const device = await client.getDeviceController(deviceId);
        let colors = Array(device.colors.length).fill({
            red: 0x66,
            green: 0xD0,
            blue: 0xDE
        });

        console.log(`Setting the color of ${device.name}`);
        await client.updateLeds(deviceId, colors);

        colors = Array(device.colors.length).fill({
            red: 0xFF,
            green: 0x00,
            blue: 0x00
        });

        setTimeout(() => {
            client.updateLeds(deviceId, colors);
        },1000)
    }

    await client.disconnect();
}

start();