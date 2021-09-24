
/**
 * confs
 * */
import express from 'express';
import bcryptjs from 'bcryptjs';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json({
  type: 'application/json',
}));

/**
 * knex
 */
import knex, {Knex} from "knex";
import configs from './knexfile';

const config = configs.development;
const db = knex(config);

interface Account {
  id: number;
  username: string;
  display_name: string;
  hashed_password: string;
}

/**
 * http
 * */
app.get('/registrations', (req, res) => {
  try {
    db<Account>('account').select('*').then((rows) => {
      res.status(200).send({
        error: 0,
        data: rows
      });
    });
  } catch (err) {
    res.status(502).send('something broke...');
  }
});

app.post('/registrations', async (req, res) => {
  try {
    let hashedPwd: string = await bcryptjs.hash(req.body.password, 8);
    let acc = {
      username: req.body.username,
      display_name: req.body.display_name,
      hashed_password: hashedPwd
    };
    await db<Account>('account').insert(acc);
    res.status(200).send('user registered successfully');
  } catch (err) {
    console.log(err);
    res.status(502).send('something broke... wrong request body schema ?')
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
