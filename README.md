# node-hotel



hotel-system/
├── config/
│   └── db.js                # Підключення до PostgreSQL
│
├── controllers/
│   ├── guestsController.js
│   ├── roomsController.js
│   └── bookingsController.js
│
├── middleware/
│   └── auth.js              # Middleware для авторизації
│
├── models/
│   ├── guestsModel.js
│   ├── roomsModel.js
│   └── bookingsModel.js
│
├── routes/
│   ├── guestsRoutes.js
│   ├── roomsRoutes.js
│   └── bookingsRoutes.js
│
├── sql/
│   ├── schema.sql           # SQL-структура таблиць
│   └── seed.sql             # Початкові дані (опціонально)
│
├── .env                     # Змінні середовища
├── .gitignore
├── package.json
├── server.js                # Точка входу
└── README.md
