
# Sporting Club Backend API

A NestJS backend for managing members, sports, and subscriptions in a sporting club. Uses PostgreSQL via Supabase.

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL database (Supabase recommended)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sporting-club-backend.git
   cd sporting-club-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   DATABASE_URL=postgresql://postgres:yourpassword@db.yoursupabaseurl.supabase.co:5432/postgres?sslmode=require
   PORT=3000
   ```

4. Run the application:
   ```bash
   npm run start:dev
   ```

## 🛠️ Database Setup
1. Create a Supabase project at https://supabase.com
2. Get your connection string from Settings → Database
3. Tables will be auto-created when the app starts (`synchronize: true` in development)

## 🌐 API Endpoints

### Members
- `POST /member` - Create a new member  
  **Body**: 
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "gender": "male",
    "birthdate": "1990-01-01",
    "subscription_date": "2023-01-01"
  }
  ```

- `GET /member` - Get all members
- `GET /member/:id` - Get member details
- `PUT /member/:id` - Update member
- `DELETE /member/:id` - Delete member

### Sports
- `POST /sports` - Create a new sport  
  **Body**:
  ```json
  {
    "name": "Tennis",
    "subscription_price": 50,
    "allowed_gender": "mix"
  }
  ```

- `GET /sports` - Get all sports (cached)
- `PUT /sports/:id` - Update sport
- `DELETE /sports/:id` - Delete sport

### Subscriptions
- `POST /subscriptions` - Subscribe member to sport  
  **Body**:
  ```json
  {
    "member_id": 1,
    "sport_id": 1,
    "subscription_type": "group",
    "subscription_date": "2023-01-01"
  }
  ```

- `DELETE /subscriptions/:memberId/:sportId` - Unsubscribe member from sport

## 🧪 Testing
Run unit tests:
```bash
npm test
```

## 🏗️ Project Structure
```
src/
├───database
│   └───seeds
├───Members
│   ├───DTOs
│   └───Entities
├───migrations
├───sports
│   ├───DTOs
│   └───Entities
└───Subscriptions
    ├───DTOs
    └───Entities
```





