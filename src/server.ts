import App from "./app";
import IndexRoute from "./routes/index.route";
import UserRoute from "./routes/user.route";

const app = new App([new IndexRoute(),new UserRoute()]);

app.listen();
