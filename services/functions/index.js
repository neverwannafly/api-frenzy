const express = require('express');

const { init: initializeApp } = require('./src/init');
const { router: appRouter } = require('./src/router');

const app = express();
app.use(express.json());
const port = process.env.PORT || 6969;

app.use('/exec/fn/', appRouter());

initializeApp().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
