# personal-finance-tracker
Project to add transaction histry and track the history

### Node Version
```
24.7.0
```

### npm Version
```
11.5.1
```
### NestJS Version
```
11.0.10
```
### Add Database(MySQL) URL in .env file
```
DATABASE_URL="mysql://root:root123@localhost:3306/finance_db"
```

### If You have docker 

### To Run Project
```
cd backend && npm run start:dev
```


### Base URL
```
http://localhost:3000
```
### Authentication

```
POST /api/auth/register
POST /api/auth/login
```
### Transactions 
```
POST /api/transactions          // Create transaction
GET /api/transactions           // Get user's transactions (with pagination)
GET /api/transactions/:id       // Get single transaction
PUT /api/transactions/:id       // Update transaction
DELETE /api/transactions/:id    // Delete transaction
```