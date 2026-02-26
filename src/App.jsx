import { useState } from "react";
import ApplicationList from "./components/ApplicationList";
import ApplicationForm from './components/ApplicationForm';
import SearchBar from "./components/SearchBar";
import api from "./services/api";
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filteredApplications, setFilteredApplications] = useState(null);

  const handleApplicationSaved = () => {
    setShowForm(false);
    setEditingApp(null);
    setFilteredApplications(null);
    setRefreshKey(prev => prev + 1); // trigger refresh
  };

  const handleEdit = (app) => {
    setEditingApp(app);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingApp(null);
  }

  const handleSearch = async (searchType, searchValue) => {
    try {
      let response;
      
      switch (searchType) {
        case 'status':
          response = await api.searchByStatus(searchValue);
          break;
        case 'company':
          response = await api.searchByCompany(searchValue);
          break;
        case 'position':
          response = await api.searchByPosition(searchValue);
          break;
        default:
          return;
      }

      setFilteredApplications(response.data);
    } catch (err) {
      console.error('Search failed:', err);
      alert('Search failed. Please try again.');
    }
  }

  const handleClearSearch = () => {
    setFilteredApplications(null);
    setRefreshKey(prev => prev + 1);
  }

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <h1>Job Application Tracker</h1>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ New Application'}
          </button>
        </div>
      </header>

      <main>
        {showForm && (
          <ApplicationForm
            onApplicationCreated={handleApplicationSaved}
            onCancel={handleCancel}
            editApplication={editingApp}
          />
        )}

        <SearchBar
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />

        <ApplicationList 
          onEdit={handleEdit}
          refresh={refreshKey}
          filteredApplications={filteredApplications}
        />
      </main>
    </div>
  );
}

export default App;