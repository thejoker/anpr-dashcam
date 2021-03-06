const RaspiCam = require('raspicam');

const dataDir = `${__dirname}/../data`;
let camera;

const initTimelapse = () => {
  if (!camera) {
    camera = new RaspiCam({
      mode: 'timelapse',
      output: `${dataDir}/timelapse.jpg`,
      width: 2048,
      height: 1536,
      quality: 100,
      rotation: 270,
      nopreview: true,
      timelapse: 10000,
      timeout: 999999999999,
    });

    camera.start();
  }
};

module.exports = {
  startTimelapse: (cb) => {
    initTimelapse();

    camera.on('read', (err, timestamp, filename) => {
      if (!err) {
        cb(`${dataDir}/${filename}`);
      }
    });
  },

  startTimelapseMock: (cb) => {
    setInterval(() => {
      const num = Math.floor(Math.random() * 12) + 1;
      const filePath = `${__dirname}/../specs/data/anpr/${num}.png`;

      cb(filePath);
    }, 10000);
  },

  finish: () => {
    camera.stop();

    camera = null;
  },
};
