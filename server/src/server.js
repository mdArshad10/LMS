import app from './app.js';
import { PORT } from './constants.js';
import { dbConnection } from './config/db.js';

const startAndSetupServer = () => {
	app.listen(PORT, async () => {
		try {
			await dbConnection();
			console.log(`the server is running at port => ${PORT}`);
		} catch (error) {
			console.log(`ERROR:: `, error.message);
			process.exit(1);
		}
	});
};

startAndSetupServer();
