# Complaint Management System

An online Complaint Management System built with Node.js, Express, MongoDB (Mongoose), and EJS. It allows users to submit complaints and track their status, while admins can view all complaints, update statuses, and see basic statistics.

---

## Features

- User and admin login with demo credentials.
- Role-based dashboards:
  - User: view own complaints and submit new ones.
  - Admin: view all complaints, update status, and see all users.
- Complaint workflow with status: `Pending`, `Accepted`, `Processing`, `Completed`.
- Complaint categories: `Infrastructure`, `Service`, `Staff Behavior`, `Facilities`, `Other`.
- Database seeding script for demo users and complaints.

---

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Templating:** EJS
- **Styling:** Custom CSS (served from `public/styles.css`)
- **Config:** `dotenv` for environment variables

---

## Project Structure

project-root/
    models/
        Complaint.js          # Complaint schema & model
        User.js               # User schema & model
    views/
        adminDashboard.ejs    # Admin dashboard
        error.ejs             # Error page
        login.ejs             # Login page
        userDashboard.ejs     # User dashboard
    public/
        styles.css            # Global stylesheet
    seed.js                   # Demo data seeder
    server.js                 # Main Express server & routes
    .env                      # Environment variables
    package.json
    README.md

## Environment Variables

Create a `.env` file in the project root:

MONGO_URI=mongodb://127.0.0.1:27017/complaint_db
PORT=3000

git clone https://github.com/ak-mishra03/online-complaint-management-system
cd online-complaint-management-system


2. **Install dependencies**

npm Install

3. **Create `.env`**

touch .env


Add the variables from the section above.

4. **Seed the database (optional but recommended)**

node seed.js 


This will:
- Clear existing `users` and `complaints`.
- Insert demo users and complaints.
- Link complaints to users.

---

## Running the Project

1. **Start MongoDB**

- Local: ensure `mongod` / MongoDB service is running.
- Remote: ensure your `MONGO_URI` is correct.

2. **Start the server**

node server.js 

or, if using nodemon:

npx nodemon server.js 


3. **Open in browser**

Go to: `http://localhost:3000`

---

## Demo Credentials

After running `seed.js`, you can use:

- **Admin**
- Username: `admin`
- Password: `admin123`

- **Users**
- `user123` / `pass123`
- `user456` / `pass456`
- `user789` / `pass789`
- `user101` / `pass101`

---

## Main Routes

- `GET /`
- Render login page.

- `POST /login`
- Authenticate user by `username` and `password`.
- If admin: render admin dashboard with all complaints and users.
- If user: redirect to `/dashboard/:id`.

- `GET /dashboard/:id`
- Show user dashboard with that user’s complaints.

- `POST /complaint`
- Submit a new complaint (user).

- `POST /complaint/status/:id`
- Update complaint status (intended for admin).

- `GET /logout`
- Redirect back to login page.

- `*`
- Render error page for unknown routes.

---

## Possible Improvements

- Add real authentication (sessions/JWT) and password hashing.
- Protect admin routes with authorization middleware.
- Add filters/search on complaints for admin.
- Add pagination and more detailed complaint history.



