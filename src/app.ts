import { server } from './server';
import chalk from 'chalk';
import { PORT } from '../config.json'

server.listen(PORT, () => {
  console.log(chalk.blue('Running! PORT: ') + chalk.red(`${PORT}`));
});
