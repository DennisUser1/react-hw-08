# PhoneBook

![image](./assets/PhoneBook.png)

## 📖 Description

**PhoneBook** is the final project of the **React** module. It allows users to save and manage their contacts after registration. The project features a fully responsive design, ensuring usability on both mobile devices and desktops.

## 🚀 Features

- User registration and authentication.
- Add, delete, edit contacts and undo deletion contacts.
- Sort contacts by name or date.
- Search contacts by name or number.
- **Statistics page**: tracking added, deleted, and edited.
- Card **flip effect**: each contact card has a flip effect that allows you to view additional information.
- [Not Found Page  404](https://react-hw-08-five.vercel.app/404).
- Fully responsive interface.

## 🛠 Technologies

- **React** - A framework for building user interfaces.
- **Redux** - State management.
- **Axios** - HTTP client for API requests.
- **Formik** and **Yup** - Form management and validation.
- **Framer Motion** - Animation library.
- **Vite** - Fast build tool.
- **MUI (Material UI)** - Component library.
- **react-router-dom** - Routing and navigation.
- **redux-persist** - Persistence of state in local storage.
- And many other libraries, such as `izitoast`, `react-spinners`, `@tippyjs/react`, etc.

## Contact Management System

This project implements a **statistics** system to track the number of **added**, **deleted**, and **updated** contacts. The statistics data is stored in the Redux state and persisted between sessions using the `redux-persist` library.

## How It Works

- **Redux State**: The statistics are stored locally in the Redux state.
- **redux-persist**: This library ensures that the statistics data is saved between sessions, meaning even after a page reload, the statistics will remain intact.

However, when a user logs out or switches accounts, the statistics will be saved, which may cause the previous user's data to be displayed.

## Important Note

Please, note that **server-side statistics** are not implemented, as the provided backend does not support it. Therefore, all operations related to statistics tracking (addition, deletion, and updating) are handled **client-side**.

## 📦 Installation

Clone the repository, install dependencies, and run the project:

```bash
npm install
npm run dev
```

Open http://localhost:3000/ in your browser. For production build:

```
npm run build
```
