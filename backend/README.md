# Backend Programming Quiz (2026)

### Nickson Kiyoshi 535250007
-----

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Endpoints Documentation

### Users Component
Endpoints:
1. GET `localhost:<portNum>/api/users`. Get all of the current users in the database. Example outputs:
``` json
[
	{
		"_id": "69d57766665b38847d31cf91",
		"email": "nice@gmail.com",
		"password": "$2b$16$DjnCmPfkVSarnB7J6trg8u9OafUl0Vxh8VgcDO3gWGOzjnKCoICGO",
		"fullName": "nick",
		"__v": 0
	},
	{
		"_id": "69d7843cc0cefdc39b761c3f",
		"email": "123@gmail.com",
		"password": "$2b$16$1CCZWmaCZ9JTbmEzPnuzzuZHu7gXhHi55gZ76xSFB0k2Cgg9Yx/Oi",
		"fullName": "nick",
		"__v": 0
	},
	{
		"_id": "69d9d7d61a8022592644f009",
		"email": "pho@gmail.com",
		"password": "$2b$16$FOW9lXj2GYv9/zQvyRQ4JeR.odBJRAgxBhnJtHHF2zRdehnUDIO32",
		"fullName": "nickson kiyoshi c 01 1",
		"__v": 0
	},
	{
		"_id": "69db79b64a7eba6b16ac50e1",
		"email": "1@gmail.com",
		"password": "$2b$16$JDTUHA2CuxuslSVrwWIJYu5.QhORslKs8LQ4NoZvou4HC4UJnfh2i",
		"fullName": "nickson Kiyoshi",
		"__v": 0
	}
]
```
2. POST `localhost:<portNum>/api/users`. Create new users in the database. With the format in the body:
``` json
{
  "email": "yourEmail", 
  "password": "yourPassword", 
  "full_name": "yourFullName", 
  "confirm_password":"yourPassword" 
}
```
3. GET `localhost:<portNum>/api/users/:id`. Get this users info with the id. Example: `localhost:5000/api/users/69db79b64a7eba6b16ac50e1`, would have given the result:
``` json
{
  "_id": "69db79b64a7eba6b16ac50e1",
  "email": "1@gmail.com",
  "password": "$2b$16$JDTUHA2CuxuslSVrwWIJYu5.QhORslKs8LQ4NoZvou4HC4UJnfh2i",
  "fullName": "nickson Kiyoshi",
  "__v": 0
}
```
4. PUT `localhost:<portNum>/api/users/:id`. For changing the email, or the fullname of an `users`. This needs a json body format:
``` json
{
  "email": "yournewEmail",
  "full_name": "yournewName"
}
```
5. PUT `localhost:<portNum>/api/users/:id/change-password`. For changing the password. This needs a json body format:
``` json
{
  "old_password": "currPass",
  "new_password": "newPass",
  "confirm_new_password": "newPass"
}
```
6. DELETE `localhost:<portNum>/api/users/:id`. To delete a user.

### Gacha Items Component
Endpoints:
1. GET `localhost:<portNum>/api/gacha-items`. Get all of the valid (quantity > 0) Gacha Items. This endpoints has a `periode` params to get certain periode of items. Example outputs:
``` json
[
	{
		"isWin": true,
		"_id": "69d7b9299e07d381fae7f4dc",
		"periode": 1,
		"item": "Voucher Rp 100.000",
		"quantity": 99,
		"__v": 0
	},
	{
		"_id": "69db7b474a7eba6b16ac5105",
		"periode": 3,
		"item": "Emas 10 gram",
		"quantity": 1,
		"isWin": true,
		"__v": 0
	},
	{
		"_id": "69db7b474a7eba6b16ac5106",
		"periode": 3,
		"item": "Smartphone X",
		"quantity": 5,
		"isWin": true,
		"__v": 0
	},
	{
		"_id": "69db7b474a7eba6b16ac5107",
		"periode": 3,
		"item": "Maaf anda kurang beruntung",
		"quantity": 10,
		"isWin": false,
		"__v": 0
	}
]
```

2. GET `localhost:<portNum>/api/gacha-items/all`. Get all of the valid (quantity > 0) and invalid (quantity = 0) Gacha Items. This endpoints has a `periode` params to get certain periode of items. Example outputs:
``` json
[
	{
		"_id": "69db7b474a7eba6b16ac5109",
		"periode": 3,
		"item": "Pulsa Rp 50.000",
		"quantity": 500,
		"isWin": true,
		"__v": 0
	},
	{
		"_id": "69db7b474a7eba6b16ac510b",
		"periode": 2,
		"item": "Ema 10 gram",
		"quantity": 0,
		"isWin": true,
		"__v": 0
	},
	{
		"_id": "69db7b474a7eba6b16ac510c",
		"periode": 2,
		"item": "Smartphon X",
		"quantity": 0,
		"isWin": true,
		"__v": 0
	},
	{
		"_id": "69db7b474a7eba6b16ac510d",
		"periode": 2,
		"item": "Smartphon Y",
		"quantity": 0,
		"isWin": true,
		"__v": 0
	},
	{
		"_id": "69db7b474a7eba6b16ac5110",
		"periode": 2,
		"item": "Maaf kurang beruntung",
		"quantity": 0,
		"isWin": true,
		"__v": 0
	}
]
```

3. GET `localhost:<portNum>/api/gacha-items/:id`. To get a certain id of an item.
4. POST `localhost:<portNum>/api/gacha-items/`. Create a Gacha items in the database. Notes: `isWin` is default to being `true`. Create Gacha takes in an Array or a json.
Input format in json:
``` json
{
  "periode": 1,
  "name": "Emas 10 gram",
  "quantity": 1,
  "isWin": true
}
```
Example input Array:
``` json
[
    {
      "periode": 1,
      "name": "Emas 10 gram",
      "quantity": 1
    },
    {
      "periode": 1,
      "name": "Smartphone X",
      "quantity": 5
    },
    {
      "periode": 1,
      "name": "Smartphone Y",
      "quantity": 10
    },
    {
      "periode": 1,
      "name": "Voucher Rp 100.000",
      "quantity": 100
    },
    {
      "periode": 1,
      "name": "Pulsa Rp 50.000",
      "quantity": 500
    },
    {
      "periode": 1,
      "name": "Maaf anda kurang beruntung",
      "quantity": 500,
      "isWin": false
    }
]
```
5. DELETE  `localhost:<portNum>/api/gacha-items/:id`. To delete an item in the database, using its id.

### Gacha Users Component
Endpoints:
1. GET `localhost:<portNum>/api/users/gacha`. Get all of the winnings from the database, and cencor it's name. This enpoints has params `periode`for item periode and `item` for item name to query your result.
Example Output:
``` json
[
	{
		"name": "n***",
		"periode": 1,
		"item": "Pulsa Rp 50.000",
		"date": "2026-04-11T05:00:08.911Z"
	},
	{
		"name": "n****** k****** c 0* 1",
		"periode": 1,
		"item": "Pulsa Rp 50.000",
		"date": "2026-04-11T05:12:14.437Z"
	},
	{
		"name": "n****** k****** c 0* 1",
		"periode": 1,
		"item": "Pulsa Rp 50.000",
		"date": "2026-04-11T05:12:30.244Z"
	},
	{
		"name": "n****** k****** c 0* 1",
		"periode": 2,
		"item": "Ema 10 gram",
		"date": "2026-04-12T11:14:50.339Z"
	}
]
```
2. POST `localhost:<portNum>/api/users/gacha`. Do Gacha, and a certain `user` only have 5 try per day.
Input format in json:
``` json
{
  "email": "yourUserEmail",
  "password": "yourPassword",
  "periode": Number
}
```
3. GET `localhost:<portNum>/api/users/:id/gacha`. Using the user id, Get all of the Gacha history (win or lose) of the `user`. This enpoints has params `periode`for item periode and `item` for item name to query your result.
4. GET `localhost:<portNum>/api/users/:id/gacha/wins`. Using the user id, Get all of the Wins Gacha history of the `user`. This enpoints has params `periode` for item periode and `item` for item name to query your result.
