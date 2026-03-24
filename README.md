# AI Flow App (MERN + React Flow)

A simple MERN stack application that lets users type a prompt, get AI-generated responses, and save them to MongoDB. The app uses **React Flow** to visualize the input and output nodes connected by a line.

## Features

- Interactive **React Flow** diagram with:
  - Input Node for typing prompts
  - Result Node for displaying AI responses
- Sends prompts to a **Node/Express backend**
- Uses **OpenRouter API** to generate AI text
- Save prompts and AI responses to **MongoDB**
- Live visualization of data flow

## Tech Stack

- **Frontend**: React, React Flow, Axios  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **AI**: OpenRouter API (Free models)  

## Installation

1. Clone the repository:
```bash
git clone <your-repo-link>
cd ai-flow-app
```
2. Backend Setup and Run
```bash
cd Backend
```
Create a .env file in the backend folder:
```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
MONGO_URI=your_mongodb_connection_string
```
```bash
npm install
npm run dev
```
3. Run Frontend
```bash
cd Frontend
npm install
npm run dev
```
