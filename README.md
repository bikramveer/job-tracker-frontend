# Job Application Tracker - Frontend

A React-based web application for tracking job applications with full CRUD operations, search functionality, and real-time updates. Built with Vite and deployed on Vercel with serverless proxy configuration.

**Live Demo:** https://job-tracker-frontend-bice.vercel.app  
**Backend API:** http://35.86.164.77:8080/api/applications  
**Related Repository:** [Backend API Repository](https://github.com/bikramveer/job-tracker-api)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [What I Learned](#what-i-learned)

## Features

- View all job applications in a responsive card grid layout
- Create new applications with comprehensive form validation
- Edit existing applications with pre-filled data
- Delete applications with confirmation dialogs
- Search and filter by status, company name, or position title
- Real-time updates after create, edit, or delete operations
- Clean, professional UI without heavy CSS frameworks
- Mobile-responsive design

## Tech Stack

**Frontend Framework:** React 18  
**Build Tool:** Vite  
**HTTP Client:** Axios  
**Styling:** Custom CSS  
**Deployment:** Vercel (serverless deployment)  
**CI/CD:** Automatic deployment from GitHub

## Architecture
```
User Browser
     ↓
Vercel (React Frontend - HTTPS)
     ↓ (Serverless Proxy)
AWS EC2 (Spring Boot API - HTTP)
     ↓
AWS RDS (PostgreSQL Database)
```

**Key Design Decisions:**

- Component-based architecture for reusability
- Centralized API service layer for all backend calls
- Vercel serverless proxy to handle HTTPS/HTTP mixed content
- Environment-based configuration for local vs. production
- Controlled components with React hooks for state management

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Backend API running (see [backend repository](https://github.com/YOUR_USERNAME/job-tracker-api))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/job-tracker-frontend.git
cd job-tracker-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```
VITE_API_URL=http://35.86.164.77:8080/api/applications
```

For local development with local backend:
```
VITE_API_URL=http://localhost:8080/api/applications
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

## Project Structure
```
src/
├── components/
│   ├── ApplicationList.jsx      # Displays all applications in card grid
│   ├── ApplicationList.css
│   ├── ApplicationForm.jsx      # Create/edit form with validation
│   ├── ApplicationForm.css
│   ├── SearchBar.jsx            # Search and filter controls
│   └── SearchBar.css
├── services/
│   └── api.js                   # Centralized API integration layer
├── App.jsx                      # Main application component
├── App.css                      # Global styles and layout
└── main.jsx                     # Application entry point
```

## Component Overview

### ApplicationList

Displays job applications in a responsive grid with:
- Card-based layout with hover effects
- Edit and delete buttons for each application
- Color-coded status badges
- Conditional rendering for empty states
- Support for filtered results from search

### ApplicationForm

Comprehensive form component supporting:
- Create new applications with required field validation
- Edit existing applications with pre-filled data
- All application fields (company, position, date, status, notes, contacts)
- Loading states and error handling
- Cancel functionality

### SearchBar

Search and filter interface with:
- Dropdown to select search type (status, company, position)
- Dynamic input fields based on search type
- Clear functionality to reset filters
- Integration with backend search endpoints

### API Service

Centralized service layer providing:
- All CRUD operations
- Search functionality by status, company, and position
- Axios interceptors for error handling
- Environment-based URL configuration

## Environment Variables

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `/backend/applications` (prod) or `http://localhost:8080/api/applications` (dev) |

### Development vs. Production

**.env** (local development):
```
VITE_API_URL=http://35.86.164.77:8080/api/applications
```

**.env.production** (Vercel):
```
VITE_API_URL=/backend/applications
```

**Note:** Production uses relative path because Vercel proxy handles forwarding to backend.

## Deployment

### Vercel Configuration

**vercel.json:**
```json
{
  "rewrites": [
    {
      "source": "/backend/:path*",
      "destination": "http://35.86.164.77:8080/api/:path*"
    }
  ]
}
```

This serverless proxy configuration:
- Forwards requests from `/backend/*` to the backend API
- Resolves HTTPS/HTTP mixed content issues
- Keeps backend URL private from client

### Deployment Steps

1. **Push to GitHub**
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

2. **Vercel Auto-Deploy**

Vercel automatically detects changes and deploys:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite (auto-detected)

3. **Set Environment Variables in Vercel Dashboard**

- Go to Project Settings > Environment Variables
- Add `VITE_API_URL` = `/backend/applications`
- Scope: Production

### Manual Deploy
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## API Integration

All API calls are centralized in `src/services/api.js`:
```javascript
import api from './services/api';

// Get all applications
const response = await api.getAllApplications();

// Create application
await api.createApplication(data);

// Update application
await api.updateApplication(id, data);

// Delete application
await api.deleteApplication(id);

// Search by status
const results = await api.searchByStatus('INTERVIEW');
```

## What I Learned

**Frontend Development:**
- Building responsive React applications with hooks
- Component composition and reusability
- Controlled forms with validation
- Managing application state with useState and useEffect
- Conditional rendering and dynamic styling

**API Integration:**
- RESTful API consumption with Axios
- Error handling and loading states
- CRUD operations in a React application
- Search and filter implementation

**Deployment & DevOps:**
- Serverless deployment with Vercel
- Environment variable management across environments
- Configuring proxy servers to handle CORS and mixed content
- CI/CD with automatic GitHub integration
- Debugging production issues with browser dev tools

**Problem Solving:**
- Resolving HTTPS/HTTP mixed content restrictions
- Handling null/undefined data in components
- Implementing dynamic search with multiple criteria
- Managing form state for create vs. edit modes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Pagination for large datasets
- Sort functionality (by date, company, status)
- Export to CSV functionality
- Dashboard with statistics and charts
- Dark mode toggle
- Mobile app version with React Native
- Offline support with service workers
- Bulk actions (delete multiple, update status)

## Contributing

This is a portfolio project, but feedback and suggestions are welcome! Feel free to open an issue or reach out directly.

## License

This project is open source and available under the MIT License.

## Contact

**GitHub:** [github.com/bikramveer](https://github.com/bikramveer)  
**LinkedIn:** [linkedin.com/bikramveer](https://www.linkedin.com/in/bikramveer-gill/)  
**Portfolio:** [Visit here](https://bikgill.netlify.app/)

---

Built with React and Vite, deployed on Vercel, and actively used for real job application tracking.
