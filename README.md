# A quick prototype for importing CSV data (built with NestJS and ReactJS)

## Description

- Allow to import data from a CSV file by uploading it
- Data of the records can be viewed via the data table
- NOTE: Currently, the app only supports CSV files having same format with the sample CSV file (`sample/data.csv`)

## Structure

```bash
.
└──
    ├── ste-backend   # NestJS
    ├── ste-web    # ReactJS (NextJS)
```

## Setup and run

- Install at root: `npm install`

- Setup project: `npm run setup`

- Initialize and start dependencies (now only the DB): `npm run dependencies-init`

- Prepare environment variables for ste-web: `cd ste-web; cp .sample-env .env.local`

- Start (at root): `npm start:dev` => The web app will be served at http://localhost:3000/home
