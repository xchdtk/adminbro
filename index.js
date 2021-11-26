const express = require("express");
const app = express();

const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const User = require('./models/User');
const route = require("./routes");
const mongoose = require('mongoose');
const connect = require('./models/index');
connect();

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: "/admin",
});
const ADMIN = {
  email: "1004kjs_@naver.com",
  password: "xwlstn990708"
}
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN;
    }
    return null;
  },
  cookieName: "adminBro",
  cookiePassword: "testtest",
});

app.use(adminBro.options.rootPath, router);
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use("/", route);

app.listen(5000, () => console.log("AdminBro is under localhost:8080/admin"));
