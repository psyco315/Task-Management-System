# 📝 Task Management App

A full-stack task management app with PDF uploads, group-based member control, and role-based task editing. Built for collaboration and efficient task tracking.

---

## 🚀 Features

* ✅ Create, edit, and delete tasks
* 📄 Upload & manage PDF attachments (Cloudinary)
* ⬇️ Download or delete PDFs
* 👥 Group support with member listing
* 📆 Due date tracking
* ↻ Status control with dropdown (non-admin users)
* 🔐 Admin mode toggle for restricted actions

---

## 💠 Tech Stack

### Frontend

* React (with Hooks)
* Tailwind CSS
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* Cloudinary (for file uploads)

---

## 🧹 Project Structure

```
/frontend    # React client
/backend     # Express API server
```

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:

```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
PORT=3000
```

Start the backend server:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

### Tasks

* `GET /task` — Get all tasks
* `POST /task` — Create a task
* `PUT /task/:id` — Update a task
* `PUT /task/:id/upload` — Upload PDF files to a task
* `DELETE /task/:id/deletepdf` — Delete a PDF file from a task

### Groups

* `GET /group` — Fetch all groups (used to filter members by group)

---

## 📁 Upload & Delete Flow

* PDFs are uploaded using a Cloudinary integration.
* On deletion:

  * `fileUrl` is sent in the body
  * `taskId` is sent in the route
  * Backend removes file from Cloudinary and updates MongoDB

---

## 📸 Screenshots (Add Yours)

* ✅ Task table with description truncation and hover
* 📂 Attachment preview and download
* 🤍 Members popup for each group
* ↻ Status dropdown (when not in admin mode)

---

## ⚙️ Admin Mode

Toggle using context `adminMode`:

* If `true`, task status cannot be changed
* If `false`, users can update task status via dropdown

---

## 🔮 Coming Soon

* ⏳ Task progress tracking
* 📊 Charts for tasks by group/status
* 🔐 Auth (Admin vs User)
* 📱 Responsive layout for mobile
* ✉️ Notifications


---

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss.

---

## 👨‍💼 Author

Made with ❤️ by Parth
