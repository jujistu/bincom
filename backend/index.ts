const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(cors());

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bincomphptest',
});

db.connect(function (err: unknown) {
  if (err) throw err;
  console.log('Connected!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//display the result for individual polling unit
app.get('/polling_unit_result/:id', (req: any, res: any) => {
  const pollingUnitId = req.params.id;

  // Fetch polling unit results from 'announced_pu_results'
  const query = `
    SELECT * FROM announced_pu_results
    WHERE polling_unit_uniqueid = ?;
  `;

  db.query(query, [pollingUnitId], (err: unknown, results: any) => {
    if (err) {
      console.error('Database query error: ');
      res.status(500).send('Internal Server Error');
      return;
    }

    // Display polling unit results
    res.json(results);
  });
});

// Summed Total Result for Polling Units under a Local Government:
app.get('/local-government/:lgaId', (req: any, res: any) => {
  const lgaId = req.params.lgaId;

  const query = `SELECT
  polling_unit.lga_id,
  announced_pu_results.party_abbreviation,
  SUM(announced_pu_results.party_score) AS total_score
FROM
  announced_pu_results
JOIN
  polling_unit ON announced_pu_results.polling_unit_uniqueid = polling_unit.uniqueid
WHERE
  polling_unit.lga_id = ?
GROUP BY
  polling_unit.lga_id,
  announced_pu_results.party_abbreviation
ORDER BY
  total_score DESC;
`;

  db.query(query, [lgaId], (err: unknown, results: any) => {
    if (err) {
      console.error('Database query error: ');
      res.status(500).send('Internal Server Error');
      return;
    }

    // Display summed total result for the specified local government
    res.json(results);
  });
});

// Store Results for All Parties for a New Polling Unit:
app.post('/store_results', async (req: any, res: any) => {
  try {
    const { polling_unit_uniqueid, results, entered_by_user } = req.body;

    // Validate that results is an array
    if (!Array.isArray(results)) {
      console.error('Error: "results" should be an array');
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Extract only the keys using map
    const keysArray = results.map(([key]) => key);

    // Extract only the scores and convert them to integers
    const scoresArray = results.map(([_, score]) => parseInt(score, 10));

    // Assuming keysArray is the party abbreviation column and scoresArray is the party scores column
    const partyAbbreviations = keysArray.map((key) => `'${key}'`).join(',');
    const partyScores = scoresArray.join(',');

    const sql = `
    INSERT INTO announced_pu_results (polling_unit_uniqueid, party_abbreviation, party_score, entered_by_user, date_entered, user_ip_address)
    VALUES 
    ${keysArray.map(() => '(?, ?, ?, ?, ?, ?)').join(',')}
  `;

    const insertValues = results.flatMap(
      ({ party_abbreviation, party_score }) => [
        polling_unit_uniqueid,
        party_abbreviation,
        parseInt(party_score, 10), // Assuming party_score should be a number in the database
        entered_by_user,
        new Date().toISOString(),
        '192.168.1.102',
      ]
    );

    // Use async/await with the database query
    const result = await new Promise((resolve, reject) => {
      db.query(sql, insertValues, (err: unknown, result: any) => {
        if (err) {
          console.error('Error inserting results into the database: ', err);
          reject(err);
        } else {
          console.log('Results inserted successfully');
          resolve(result);
        }
      });
    });
  } catch (error) {
    console.error('Error inserting results into the database: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get all the lga
app.get('/getlga', (req: any, res: any) => {
  db.query('SELECT * FROM lga', (error: unknown, results: any) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

//get all the states
app.get('/getstates', (req: any, res: any) => {
  db.query('SELECT * FROM states', (error: unknown, results: any) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

//get Party
app.get('/getparty', (req: any, res: any) => {
  db.query('SELECT * FROM party', (error: unknown, results: any) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

//get polling Unit
app.get('/getpollingunit', (req: any, res: any) => {
  db.query('SELECT * FROM polling_unit', (error: unknown, results: any) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});
