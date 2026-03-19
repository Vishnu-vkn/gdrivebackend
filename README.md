# 📁 Cloud-Based File Storage System

A secure backend application that allows users to upload, store, download, and delete files using cloud storage.

---

## 🚀 Features

* JWT-based authentication
* Secure password hashing using bcrypt
* File upload using Multer
* Cloud storage integration with Cloudinary
* Secure file download using signed URLs
* File deletion from Cloudinary and MongoDB
* User-specific file access (authorization)

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* Cloudinary
* JWT, bcrypt
* EJS, Tailwind CSS

---

## 📡 API Routes

* `POST /upload` → Upload file
* `GET /home` → View user files
* `GET /download/:id` → Download file
* `GET /delete/:id` → Delete file

---

## 📷 Screenshots

<p align="center">
  <img src="./screenshots/homepage.png" width="48%" />
  <img src="./screenshots/user_register.png" width="48%" />
</p> 

## ⚙️ Run Locally

```bash
git clone https://github.com/Vishnu-vkn/cloudfilestorage.git
cd your-repo
npm install
npm start
```

---

## 👨‍💻 Author

**Vishnu Vinodan**

GitHub: https://github.com/Vishnu-vkn

LinkedIn: https://linkedin.com/in/vishnu-vinodan/
