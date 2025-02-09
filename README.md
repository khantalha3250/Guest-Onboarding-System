# 🏨 Digital Guest Onboarding System

The **Digital Guest Onboarding System** is a web application designed to streamline hotel guest registrations using **QR codes**. It provides role-based access for **Main Admins, Guest Admins, and Guests**, enabling efficient visitor management and onboarding.

---

## 🚀 Features

### 🔹 Main Admin Panel
- Register new hotels with details:
  - **Name, Logo, Address**
- Display all registered hotels in a table.
- Generate unique **QR codes** for each hotel.
- Scan QR codes to open a **hotel-specific landing page**.

### 🔹 Guest Landing Page
- Display hotel details (**Name, Logo, Address**).
- Guest fills out an **onboarding form** with:
  - **Full Name**
  - **Mobile Number**
  - **Address**
  - **Purpose of Visit** (Business, Personal, Tourist)
  - **Stay Dates** (From & To)
  - **Email ID**
  - **ID Proof Number**
- After submission, a **"Thank You" page** is displayed.
- Guest details are **saved in the database**.

### 🔹 Guest Admin Panel
- View and manage guest details for a specific hotel.
- Edit guest information.
- View guest details with a **print option**.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, Tailwind CSS  
- **Backend**: Next.js API Routes (Node.js with Express.js)  
- **Database**: MySQL with Prisma ORM  
- **QR Code Generation**: `qrcode` package  
- **Authentication**: Simple login for Main Admin and Guest Admin  

---

## 📂 Project Structure

```
📁 onboarding-system
├── 📁 prisma                # Prisma schema & migrations
├── 📁 src
│   ├── 📁 components        # Reusable UI components
│   ├── 📁 pages             # Next.js pages
│   ├── 📁 api               # API routes for backend logic
│   ├── 📁 lib               # Utility functions
│   ├── 📁 styles            # Tailwind CSS configurations
├── .env                     # Environment variables
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies & scripts
├── prisma/schema.prisma     # Prisma schema definition
├── README.md                # Project documentation
```

---

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/yourusername/digital-guest-onboarding.git
cd digital-guest-onboarding
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Configure Database

Create a MySQL database and update the `.env` file:

```
DATABASE_URL="mysql://hostname:password@localhost:3306/onboarding-system"
```

Run Prisma migrations to set up the database schema:

```sh
npx prisma migrate dev --name init
```

### 4️⃣ Start the Development Server

```sh
npm run dev
```

The app will be available at **http://localhost:3000** 🚀

---

## 🔑 Authentication

- **Main Admin** and **Guest Admin** can log in using predefined credentials (stored in DB).

---

## 📌 QR Code Generation

- Each hotel is assigned a **unique QR code**.
- Scanning the QR redirects guests to their **hotel's landing page**.

---

## 🖨️ Printing Guest Details

- **Guest Admin** can **view & print guest details** using JavaScript's `window.print()` method.

---

## 🤝 Contributing

Feel free to fork this repository and create pull requests for improvements! 🚀

---

### Developed by [Mohd Talha] 🚀
