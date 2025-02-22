import { createConnection } from 'mysql2';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from '../config';

const db = createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit the process on DB connection failure
  } else {
    console.log('Database connected successfully');
  }
});


export default db;
