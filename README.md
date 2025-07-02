
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
├── Members/              # Member management
├── sports/               # Sport management
├── Subscriptions/        # Subscription logic
├── app.module.ts         # Root module
└── main.ts               # Application entry
```

## ✅ Assumptions
1. Family members feature was not fully implemented due to time constraints
2. Gender validation for sports subscriptions is enforced
3. Database schema auto-sync is enabled in development

## 📜 License
MIT
```

### Key Features of This README:
1. **Clear Setup Instructions** - From cloning to running the app
2. **Detailed API Documentation** - All endpoints with example requests
3. **Environment Configuration** - How to set up the `.env` file
4. **Project Structure** - Helps reviewers navigate your code
5. **Testing Info** - Shows you've considered testing
6. **Assumptions** - Transparent about what's not implemented

### To Use This:
1. Create a new GitHub repository
2. Add this as `README.md`
3. Push your code
4. Submit the repository link

Would you like me to modify any section or add more details about specific parts?
