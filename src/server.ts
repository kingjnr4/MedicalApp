import App from './app';
import {Cron} from './cron';
import AdminRoute from './routes/admin.route';
import CategoryRoute from './routes/category.route';
import DiagnosisRoute from './routes/diagnosis.route';
import FaqRoute from './routes/faq.route';
import IndexRoute from './routes/index.route';
import PlanRoute from './routes/plan.route';
import SettingsRoute from './routes/settings.route';
import StatRoute from './routes/stat.route';
import SubRoute from './routes/subscription.route';
import SupportRoute from './routes/support.route';
import UserRoute from './routes/user.route';

const app = new App([
  new IndexRoute(),
  new UserRoute(),
  new SubRoute(),
  new AdminRoute(),
  new SettingsRoute(),
  new PlanRoute(),
  new StatRoute(),
  new FaqRoute(),
  new SupportRoute(),
  new CategoryRoute(),
  new DiagnosisRoute(),
]);
// Cron.start('0 * * * * *', function jobYouNeedToExecute() {
//   console.log(new Date().toLocaleString());
// });

app.listen();
