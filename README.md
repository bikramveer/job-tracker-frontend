# Job Application Tracker - Frontend

A React-based web application for tracking job applications with full CRUD operations, search functionality, and real-time updates. Built with Vite and deployed on Vercel with serverless proxy configuration.

- **Live Demo:** https://jobtracker.vercel.app  
- **Backend API:** http://35.86.164.77:8080/api/applications  
- **Related Repository:** [Backend API Repository](https://github.com/YOUR_USERNAME/job-tracker-api)

## Overview

This application provides an intuitive interface for managing job applications throughout the search process. Users can create, view, edit, and delete applications while tracking key details like company name, position, application status, interview dates, and contact information. The search and filter functionality allows quick access to specific applications by status, company, or position title.

## Features

- **Complete CRUD Operations:** Create, read, update, and delete job applications
- **Advanced Search:** Filter by application status, company name, or position title
- **Real-Time Updates:** Immediate UI refresh after any data modification
- **Responsive Design:** Card-based layout that adapts to different screen sizes
- **Form Validation:** Required field validation with user-friendly error messages
- **Status Tracking:** Visual status badges with color coding (Applied, Interview, Offer, Rejected)
- **Contact Management:** Store recruiter and hiring manager contact information
- **Clean UI:** Professional interface built with custom CSS without heavy frameworks

## Tech Stack

**Frontend Framework:** React 18  
**Build Tool:** Vite  
**HTTP Client:** Axios  
**Styling:** Custom CSS  
**Deployment:** Vercel  
**Version Control:** Git & GitHub

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

The frontend is deployed on Vercel and communicates with a Spring Boot REST API hosted on AWS EC2. A serverless proxy configuration handles the HTTPS/HTTP mixed content restriction, allowing the secure frontend to communicate with the backend API.

## Key Technical Decisions

**Component Architecture:**  
The application uses a component-based structure with clear separation of concerns. The `ApplicationList` component handles display, `ApplicationForm` manages creation and editing, and `SearchBar` provides filtering functionality. This modular approach makes the codebase maintainable and allows components to be reused or modified independently.

**Centralized API Layer:**  
All backend communication is abstracted into a dedicated API service (`src/services/api.js`). This pattern keeps API logic separate from UI components, makes it easier to modify endpoints, and provides a single source of truth for all HTTP requests.

**State Management:**  
The application uses React's built-in hooks (`useState`, `useEffect`) for state management rather than external libraries. This keeps the bundle size small and reduces complexity for an application of this scope.

**Serverless Proxy:**  
Vercel's rewrite functionality acts as a serverless proxy, forwarding requests from `/backend/*` to the EC2 backend. This solves the HTTPS/HTTP mixed content problem without requiring SSL configuration on the backend or CORS preflight complexity.

**Environment-Based Configuration:**  
Different environment variables for development and production allow local testing against either a local or remote backend while production always uses the proxy path.

## Project Structure
```
src/
├── components/
│   ├── ApplicationList.jsx      # Grid display of all applications
│   ├── ApplicationList.css      # Card layout and styling
│   ├── ApplicationForm.jsx      # Create/edit form with validation
│   ├── ApplicationForm.css      # Form styling and layout
│   ├── SearchBar.jsx            # Search and filter interface
│   └── SearchBar.css            # Search controls styling
├── services/
│   └── api.js                   # Centralized API integration
├── App.jsx                      # Main application component
├── App.css                      # Global styles and layout
└── main.jsx                     # Application entry point
```

## Component Details

**ApplicationList:**  
Displays job applications in a responsive grid with edit and delete actions. Handles both full dataset display and filtered results from search operations. Implements optimistic UI updates and error handling for delete operations.

**ApplicationForm:**  
Multi-purpose form component that handles both creation and editing modes. Pre-fills data when editing, validates required fields, and provides feedback on save operations. Supports all application fields including optional contact information and notes.

**SearchBar:**  
Dynamic search interface that changes input fields based on selected search type. Communicates with three different backend endpoints (status, company, position) and provides clear functionality to return to full dataset view.

**API Service:**  
Axios-based service layer providing methods for all CRUD operations and search functionality. Uses environment variables to determine the correct API endpoint for different deployment environments.

## Data Model

Each job application tracks:

- Company name and position title (required)
- Application date and current status
- Job posting URL
- Follow-up reminder date
- Recruiter/hiring manager contact details (name, email, LinkedIn)
- Personal notes and observations

Status values include: Applied, Phone Screen, Interview, Technical Assessment, Offer, Rejected, Withdrawn, and Accepted.

## Development Approach

**Local Development:**  
The application runs on Vite's development server with hot module replacement for rapid iteration. Environment variables allow pointing to either a local backend instance or the production API for testing.

**Production Build:**  
Vite optimizes the production build with code splitting, minification, and tree shaking to minimize bundle size. The build output is served as static files from Vercel's global CDN.

**Continuous Deployment:**  
Every push to the main branch triggers an automatic deployment on Vercel. The platform handles building, optimization, and serving the application with zero downtime deployments.

## Challenges Solved

**HTTPS/HTTP Mixed Content:**  
Modern browsers block HTTPS pages from making HTTP requests for security. Solved by implementing a Vercel serverless proxy that forwards requests server-side, allowing the frontend to make same-origin requests that get proxied to the backend.

**Form State Management:**  
Supporting both create and edit modes in a single form component required careful prop handling and conditional logic. The solution pre-fills data when an edit object is provided while maintaining clean state for new applications.

**Null Data Handling:**  
Backend data can contain null values for optional fields. Implemented defensive checks throughout components to prevent runtime errors when accessing potentially null properties like status or notes.

**Real-Time UI Updates:**  
After create, edit, or delete operations, the UI needed to reflect changes immediately without full page reloads. Solved with state management that triggers re-fetches after mutations and optimistic updates where appropriate.

## What I Learned

**React Development:**  
Building a production application reinforced best practices for component composition, state management, and the React lifecycle. Working with hooks like `useState` and `useEffect` became intuitive through practical application.

**API Integration:**  
Implementing full CRUD operations taught me how to structure API calls, handle loading and error states gracefully, and manage asynchronous operations in a React application.

**Deployment & Infrastructure:**  
Deploying to Vercel introduced me to modern serverless deployment workflows, environment variable management across different contexts, and the benefits of automatic CI/CD pipelines.

**Problem Solving:**  
Debugging HTTPS/HTTP mixed content issues, handling null data, and managing form state for multiple modes all required research, experimentation, and iterative solutions. These challenges strengthened my ability to troubleshoot production issues.

## Performance Considerations

- Vite's build optimization reduces bundle size through tree shaking and code splitting
- Images and assets are optimized during the build process
- Vercel's global CDN ensures fast load times worldwide
- Axios interceptors enable centralized error handling without performance overhead

## Browser Compatibility

Tested and verified on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Pagination for handling large datasets efficiently
- Sort functionality by date, company, or status
- Dashboard with statistics and visualization
- Export to CSV for data portability
- Dark mode theme option
- Bulk operations for managing multiple applications
- Email reminders for follow-up dates
- Interview preparation notes and resources

## Related Projects

This frontend connects to a Spring Boot REST API that handles all backend logic, database operations, and business rules. See the [backend repository](https://github.com/YOUR_USERNAME/job-tracker-api) for implementation details on the API layer, database design, and AWS deployment.

## License

This project is open source and available under the MIT License.

## Contact

**GitHub:** [github.com/bikramveer](https://github.com/bikramveer)
**LinkedIn:** [linkedin.com/bikramveer](https://www.linkedin.com/in/bikramveer-gill/)
**Portfolio:** [Visit It Here](https://bikgill.netlify.app/)

---

Built with React and Vite, deployed on Vercel, and actively used for real job application tracking.
