# Hotel Management API

A Node.js backend API for managing hotel guests, bookings, rooms, and authentication.

---

## 📜 Description

This project is a RESTful API built with Node.js and Express. It provides endpoints for managing hotel-related operations such as guest registration, room assignment, booking tracking, and user authentication. It is designed for small- to mid-size hotel systems requiring a simple backend with database integration and token-based authentication.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Tokens)
- bcrypt
- Swagger (OpenAPI)
- Jest & Supertest
- dotenv

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourname/hotel-management-api.git
cd hotel-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment setup

```bash
cp .env.example .env
```

Then edit the `.env` file with your actual values.

### 4. Run the app locally

```bash
npm run dev
```

### 5. Generate Swagger & Postman docs

```bash
npm run docs:generate
```

---

## ⚙️ Environment Variables

Example `.env` content:

```env
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/hotel
JWT_SECRET=your_secret_key
```

---

## 📁 Project Structure

```
root/
├── src/                            # Application source code
│   ├── config/                     # Configuration files (DB, JWT, Swagger)
│   │   ├── db.js
│   │   ├── jwt.js
│   │   └── swagger.js
│   ├── controllers/                # Route handlers (controllers)
│   │   ├── authController.js
│   │   ├── bookingsController.js
│   │   ├── guestsController.js
│   │   └── roomsController.js
│   ├── middleware/                 # Express middleware functions
│   │   └── auth.js
│   ├── models/                     # Database access layer (queries)
│   │   ├── bookingsModel.js
│   │   ├── guestsModel.js
│   │   └── roomsModel.js
│   ├── routes/                     # Express route definitions
│   │   ├── authRoutes.js
│   │   ├── bookingsRoutes.js
│   │   ├── guestsRoutes.js
│   │   └── roomsRoutes.js
│   ├── sql/                        # SQL scripts (schema & seed)
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── utils/                      # Utility scripts
│   │   └── generate-docs.js
│   ├── app.js
│   └── server.js
│
├── tests/                          # All test files
│   ├── e2e/                        # End-to-end tests (real HTTP flow)
│   │   ├── guest-booking-count.test.js
│   │   └── login-workflow.test.js
│   ├── integration/                # Integration tests (API + DB)
│   │   └── user-create-new.test.js
│   ├── services/                   # Test-only logic (e.g. mocks, helpers)
│   │   └── userService.js
│   └── unit/                       # Unit tests (pure functions, mocks)
│       └── users-getbyid.test.js
│
├── docs/
│   ├── postman-collection.json     # Exported Postman requests
│   └── swagger.json                # Generated OpenAPI schema
│
├── .env                          # Main environment variables
├── .env.test                     # Environment variables for tests
├── .gitignore
│
├── jest.config.js               # Root Jest configuration (uses projects)
├── jest.unit.config.js          # Jest config for unit tests
├── jest.integration.config.js   # Jest config for integration tests
├── jest.e2e.config.js           # Jest config for end-to-end tests
├── package.json
└── README.md
```

---

## 📖 API Documentation

### 🧭 Runtime access

Swagger UI is available at:

**http://localhost:3001/api-docs**

### 📂 Static Docs

The following generated files are located in the `docs/` folder:

- `swagger.json` — full OpenAPI schema
- `postman-collection.json` — ready-to-import Postman collection

### 🔄 Regenerating Docs

To regenerate documentation after updating routes or schemas, run:

```bash
npm run docs:generate
```

This executes the script: `src/utils/generate-docs.js`

---

## ✅ Running Tests

### All tests

```bash
npm run test
```

### Unit tests

```bash
npm run test:unit
```

### Integration tests

```bash
npm run test:integration
```

### End-to-end tests

```bash
npm run test:e2e
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request

---

## 🙋‍♂️ Author

- Yaroslav Panchishyn — [yarpansoft@gmail.com](mailto:yarpansoft@gmail.com)
