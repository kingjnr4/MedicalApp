import App from './app';
import {Cron} from './cron';
import IndexRoute from './routes/index.route';
import SubRoute from './routes/subscription.route';
import UserRoute from './routes/user.route';

const app = new App([new IndexRoute(), new UserRoute(), new SubRoute()]);
// Cron.start('0 * * * * *', function jobYouNeedToExecute() {
//   console.log(new Date().toLocaleString());
// });

app.listen();
