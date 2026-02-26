# Job Application Tracker - Frontend

A React-based web application for tracking job applications with full CRUD operations and search functionality.

## 🚀 Features

- **View Applications**: Display all job applications in a responsive card grid
- **Create & Edit**: Full-featured form for adding and updating applications
- **Search & Filter**: Filter by status, search by company or position
- **Delete**: Remove applications with confirmation dialog
- **Real-time Updates**: Automatic refresh after create/edit/delete operations
- **Clean UI**: Professional interface without heavy frameworks

## 🛠️ Tech Stack

- **Frontend**: React 18, JavaScript
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Styling**: Custom CSS (no Tailwind or Bootstrap)

## 📋 Features in Detail

### Application Management
- Create new job applications with all relevant details
- Edit existing applications with pre-filled forms
- Delete applications with confirmation
- Track application status (Applied, Interview, Offer, etc.)

### Search & Filter
- Filter by application status
- Search by company name (case-insensitive, partial match)
- Search by position title
- Clear filters to view all applications

### Data Tracking
- Company name and position title
- Application date
- Current status with color-coded badges
- Job posting URL
- Follow-up dates
- Contact information (name, email, LinkedIn)
- Notes for each application

## 🏃 Running Locally

### Prerequisites
- Node.js 18+
- Backend API running on `http://localhost:8080`

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/job-tracker-frontend.git
cd job-tracker-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🔗 Backend API

This frontend connects to the Spring Boot backend API: [job-tracker-api](https://github.com/yourusername/job-tracker-api)

## 📸 Screenshots

*(Add screenshots here after deployment)*

## 🎨 Component Structure
```
src/
├── components/
│   ├── ApplicationList.jsx    # Displays all applications
│   ├── ApplicationForm.jsx    # Create/edit form
│   └── SearchBar.jsx          # Search and filter controls
├── services/
│   └── api.js                 # API integration layer
├── App.jsx                    # Main application component
└── App.css                    # Global styles
```

## 🧪 API Integration

All API calls are centralized in `src/services/api.js`:
- `getAllApplications()` - Fetch all applications
- `createApplication(data)` - Create new application
- `updateApplication(id, data)` - Update existing application
- `deleteApplication(id)` - Delete application
- `searchByStatus(status)` - Filter by status
- `searchByCompany(name)` - Search by company
- `searchByPosition(title)` - Search by position

## 📝 What I Learned

- React component architecture and state management
- API integration with Axios
- Form handling and validation
- Conditional rendering and dynamic UI
- CRUD operations in a frontend application
- Search and filter implementation

## 🚧 Future Enhancements

- [ ] Pagination for large datasets
- [ ] Sort by date, company, or status
- [ ] Export to CSV
- [ ] Dashboard with statistics
- [ ] Mobile responsive improvements
- [ ] Deploy to Vercel/Netlify

## 📄 License

This project is open source and available under the MIT License.
