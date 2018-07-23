const express = require("express");

const app = express();
const BitGoJS = require("bitgo");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 8000;

// cors
app.use(cors());

// body parser
app.use(bodyParser.json());

const API = "/api/v1";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "";
// const bitgo = new BitGoJS.BitGo({ env: "test", accessToken: ACCESS_TOKEN });
const bitgo = new BitGoJS.BitGo();

app.get(`${API}/`, (req, res) => res.send("Server is alive!"));

// authentication
app.get(`${API}/auth`, (req, res) =>
  bitgo
    .session({})
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
);

// create wallet
app.post(`${API}/create`, (req, res, next) => {
  const { label, pass } = req.body;
  if (!label || pass) {
    next("Invalid data");
  }
  bitgo
    .wallets()
    .createWalletWithKeychains({ passphrase: pass, label }, (err, result) => {
      if (err) {
        console.dir(err);
        next("Error creating wallet!");
      }
      return res.json({
        walletId: result.wallet.id(),
        data: result.wallet.wallet
      });
    });
});

// get wallet info
app.post(`${API}/wallet-info`, (req, res, next) => {
  const {
    data: { address }
  } = req.body;
  if (!address) {
    next("unable to fetch data.");
  }

  bitgo.wallets().get({ type: "bitcoin", id: address }, (err, wallet) => {
    if (err) {
      console.log(err);
      process.exit(-1);
    }
    return res.json({
      wallet: wallet.wallet
    });
  });
});

// get wallet-list
app.post(`${API}/wallet-list`, (req, res, next) => {
  bitgo.wallets().list({}, (error, wallets) => {
    if (error) {
      console.log(error);
      next(error);
    }

    console.log(wallets);

    return res.json({
      wallets: wallets.wallets
    });
  });
});

// sending bitcoin
app.post(`${API}/send`, (req, res, next) => {
  const { walletId, walletPass, destination, amount } = req.body;
  if (!walletId || !walletPass || !destination || !amount) {
    next("unable to send bitcoin.");
  }

  bitgo
    .unlock({ otp: "0000000" })
    .then(unlockResponse => {
      bitgo.wallets().get({ id: walletId }, (err, wallet) => {
        if (err) {
          console.log(err);
          next(err);
        }

        const walletBalance = (wallet.balance() / 1e8).toFixed(4);

        wallet.sendCoins(
          {
            address: destination,
            amount,
            walletPassphrase: walletPass, // sender pass phrase
            minConfirms: 0
          },
          (err, result) => {
            if (err) {
              console.log(err);
              next(err);
            }

            return res.json({
              ...result,
              balance: walletBalance
            });
          }
        );
      });
    })
    .catch(error => next(error));
});

// login
app.post(`${API}/login`, (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next("unable to login.");
  }
  bitgo
    .authenticate({
      username: username,
      password: password,
      otp: "0000000"
    })
    .then(response => {
      var token = response.token;
      var user = response.user;
      // etc
      return res.json({
        response
      });
    })
    .catch(err => next(err));
});

app.post(`${API}/logout`, (req, res, next) => {
  bitgo.logout({}).then(function(res) {
    // the user is now logged out
    console.log(res);
  });
});

app.post(`${API}/unlock`, (req, res, next) => {
  bitgo.unlock({ otp: "0000000" }).then(unlockResponse => {
    return res.json({
      response: unlockResponse
    });
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
