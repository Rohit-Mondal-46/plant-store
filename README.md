# Mini Plant Store 🌱

A full-stack plant store application built with React, Node.js, Express, and MongoDB.

## Features

### Frontend
- **Plant Catalog**: Beautiful grid layout with plant cards showing name, price, categories, and stock status
- **Search & Filter**: Real-time search by name/category and filter by category/availability
- **Admin Panel**: Add new plants with comprehensive form validation
- **Responsive Design**: Mobile-first design that works perfectly on all devices
- **Loading States**: Skeleton loaders and loading indicators for better UX
- **Error Handling**: Graceful error states with retry functionality

### Backend
- **RESTful API**: Clean API endpoints for plant management
- **MongoDB Integration**: Scalable database with Mongoose ODM
- **Search Functionality**: Text search across plant names, categories, and descriptions
- **Data Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling and logging

## Tech Stack

- **Frontend**: React, JavaScript, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Development**: Vite, Concurrently, Nodemon

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-plant-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your MongoDB connection string.

4. **Start the application**
   ```bash
   npm run dev
   ```

This will start both the React frontend (http://localhost:5173) and Express backend (http://localhost:5000).

## API Endpoints

### Plants
- `GET /api/plants` - Get all plants with optional search/filter parameters
- `GET /api/plants/:id` - Get a specific plant
- `POST /api/plants` - Add a new plant (admin)
- `GET /api/plants/meta/categories` - Get all available categories

### Search Parameters
- `search` - Search by plant name, category, or description
- `category` - Filter by specific category
- `inStock` - Filter by stock availability (true/false)

## Plant Data Structure

```javascript
{
  name: String,           // Required, max 100 characters
  price: Number,          // Required, positive number
  categories: [String],   // Required, array of lowercase categories
  inStock: Boolean,       // Default true
  description: String,    // Optional, max 500 characters
  image: String,          // Image URL
  difficulty: String,     // Easy, Medium, Hard
  light: String          // Low, Medium, High
}
```

## Development Notes

- The app includes fallback in-memory data when MongoDB is not available
- Uses MongoDB text indexes for efficient search functionality
- Implements proper error handling and loading states
- Responsive design with mobile-first approach
- Form validation on both client and server side

## Deployment

For production deployment:

1. Set up MongoDB Atlas cluster
2. Update environment variables
3. Build the React app: `npm run build`
4. Deploy to your preferred platform (Vercel, Netlify, Heroku, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.