## repoprovas API

Backend of repoprovas, an application where you can share past exams.

### Technologies

- NodeJS
- ExpressJS
- Typescript
- TypeORM
- nodemon
- pg
- dotenv
- cors
- Jest
- prettier
- eslint
- faker
- husky

### Running locally

1. Clone this repo

```sh
git clone https://github.com/Deltinha/repoprovas-back.git
```

2. Install dependencies

```sh
npm install
```

3. Navigate to the repository folder and run the following commands to create a database

```ssh
sudo -u postgres createdb -T template0 repoprovas

sudo -u postgres psql repoprovas < 'dump.sql'
```

3. Create a new file called `.env` in the root folder using `.env-example` as template. Feed the newly created file with the info of your database.
4. To run in development mode

```sh
npm run dev
```

### Documentation

**POST** `/exams`

You can insert a exam by using this endpoint. The body contents should be a JSON object following the example below.

```json
{
  "name": "2020.1",
  "professorId": "10",
  "classId": "1",
  "typeId": "10",
  "link": "https://examlink.pdf"
}
```

**GET** `/exams/types`

You can get all available exam types by using this endpoint.

```json
[
  {
    "id": 1,
    "name": "AV1",
	},
  {
    "id": 2,
    "name": "AV2",
	}, ...
]
```

**GET** `/professors`

You can get all registered professors and its registered exams quantity by using this endpoint.

```json
[
	{
  	"id": 1,
    "name": "Dewey Finn",
    "examsQty": 13,
  },
  {
    "id": 2,
    "name": "Henry Barthes",
    "examsQty": 15,
  }, ...
]
```

**GET** `/professors/:professorId`

You can get all registered exams from a given professor by using this endpoint.

```json
[
	{
    "name": "2020.1",
    "link": "https://examlink.pdf",
    "type": "Final",
    "class": "Music",
    "professor": "Dewey Finn",
    "year": "2º",
	}, ...
]
```

**GET** `/classes`

By using this endpoint, you can get all the classes including the professors in charge and all registered exams for each one.

```json
[
  {
    "id": 1,
    "name": "Music",
    "year": "2º",
    "professors": [
    	{
        "id": 1,
        "name": "Dewey Finn"
    	}, ...
    ],
    "exams": [
    	{
        "id": 56,
        "name": "2020.1",
        "link": "https://examlink.pdf",
        "typeId": 4,
        "professorId": 1,
        "classId": 1
    	}, ...
    ]
	}, ...
]
```

**GET** `/classes/:classId`

You can get all the exams from a specific class by using this endpoint.

```json
[
	{
    "name": "2020.1",
    "link": "https://examlink.pdf",
    "type": "Final",
    "class": "Music",
    "professor": "Dewey Finn",
    "year": "2º"
	}, ...
]
```
