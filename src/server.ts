import App from './app';
import {Cron} from './cron';
import AdminRoute from './routes/admin.route';
import IndexRoute from './routes/index.route';
import PlanRoute from './routes/plan.route';
import SettingsRoute from './routes/settings.route';
import SubRoute from './routes/subscription.route';
import UserRoute from './routes/user.route';

const app = new App([
  new IndexRoute(),
  new UserRoute(),
  new SubRoute(),
  new AdminRoute(),
  new SettingsRoute(),
  new PlanRoute(),
]);
// Cron.start('0 * * * * *', function jobYouNeedToExecute() {
//   console.log(new Date().toLocaleString());
// });

app.listen();
