📘 Blog Management System (Node.js + Express + MongoDB)

A full-stack Blog Application built using Node.js, Express, MongoDB, EJS, and Passport.js.
Users can register, login, and manage their own blog posts with image upload support.

🚀 Features
🔐 User Authentication (Login / Register)
✍️ Create Blog Posts
🖼️ Image Upload (Multer)
📋 View My Blogs
🌍 View All Blogs
✏️ Edit Blog
🗑️ Delete Blog
👤 Session-based Authentication (Passport.js)
🛠️ Tech Stack
Backend: Node.js, Express.js
Frontend: EJS, Bootstrap 5
Database: MongoDB (Mongoose)
Authentication: Passport.js
File Upload: Multer

## 📸 Screenshots

| Page | Preview |
![alt text](<Screenshot 2026-03-25 000108-1.png>) 
![alt text](<Screenshot 2026-03-25 000216-1.png>) !
[alt text](<Screenshot 2026-03-25 000347-1.png>)


📁 Project Structure
project-root/
│
├── controllers/
│   ├── adminPanelController.js
│   ├── userController.js
│   └── blogController.js
│
├── models/
│   ├── userModel.js
│   └── blogModel.js
│
├── routes/
│   ├── index.js
│   ├── authRouter.js
│   └── adminPanelRouter.js
│
├── middleware/
│   ├── auth.js
│   └── imageUpload.js
│
├── views/
│   ├── pages/
│   ├── partials/
│   └── index.ejs
│
├── public/
│   └── assets/
│
├── uploads/
│
├── index.js
└── .env


⚙️ Installation
1. Clone Repository
git clone https://github.com/dev-dhamandadiya/blogDB
cd your-repo-name
2. Install Dependencies
npm install
3. Setup Environment Variables

Create a .env file:

PORT=8081
MONGODB_URL=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
4. Run the Server
npm start

OR

node index.js
5. Open in Browser
http://localhost:8081
🔑 Routes Overview
Auth Routes
Method	Route	Description
GET	/login	Login Page
POST	/login	Login User
GET	/register	Register Page
POST	/register	Register User
GET	/logout	Logout User
Blog Routes
Method	Route	Description
GET	/admin/add-blog	Add Blog Page
POST	/admin/add-blog	Create Blog
GET	/admin/my-blogs	User Blogs
GET	/admin/all-blogs	All Blogs
GET	/admin/edit-blog/:id	Edit Blog Page
POST	/admin/edit-blog/:id	Update Blog
GET	/admin/delete-blog/:id	Delete Blog
📸 Image Upload
Images are stored in /uploads folder
Static serving enabled:
app.use('/uploads', express.static('uploads'));
🧠 Important Notes
Make sure MongoDB is connected properly
Ensure uploads folder exists
User must be logged in to create blogs
Use correct route paths (e.g., /admin/add-blog)
🐞 Common Errors
❌ Cannot POST /login

➡️ Check form action matches route

❌ blogs is not defined

➡️ Pass blogs from controller:

res.render("index", { blogs });
❌ Image not showing

➡️ Add static middleware:

app.use('/uploads', express.static('uploads'));
🌟 Future Improvements
🔍 Search & Filter Blogs
💬 Comments System
❤️ Like Feature
📱 Mobile Responsive UI
🌐 Public Blog Page (/blog/:id)
👨‍💻 Author

Your Name
GitHub: https://github.com/your-dev-dhamandadiya

📜 License

This project is open-source and free to use.