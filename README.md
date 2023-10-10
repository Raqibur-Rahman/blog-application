# Blog Application

Welcome to the Blog Application project. This project is a simple Next.js application that allows you to create, read, update, and delete blog posts.
I am grateful to Xponent for giving me the opportunity.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (Recommended version: 14 or higher)
- npm or Yarn package manager
- MongoDB installed and running locally

## Getting Started

To get a local copy up and running, follow these simple steps:

Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/blog-application.git

Navigate to the project's root directory:
cd blog-application

Install project dependencies using npm or Yarn:
npm install
# or
yarn install


Create a .env.local file in the root directory and configure your MongoDB connection(Though I have give the .env file in github):
DATABASE_URL="mongodb+srv://raqiburedu:Ykj1hcnB7pexwk1l@cluster0.ftx9qil.mongodb.net/blog?retryWrites=true&w=majority"

Run the development server:
npm run dev
# or
yarn dev

Open your web browser and access the application at http://localhost:3000.

##Usage
Create a new blog post by clicking the "Add Blog" button on the homepage.
View all blog posts by clicking "View All Blogs."
Click on a blog post to view its details.
Edit or delete a blog post from its detail page.
Enjoy blogging!


#@Technologies Used
Next.js
MongoDB
Prisma
