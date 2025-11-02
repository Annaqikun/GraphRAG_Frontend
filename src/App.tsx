import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardStats } from './components/dashboard/DashboardStats';
import { KnowledgeGraphPreview } from './components/dashboard/KnowledgeGraphPreview';
import { RecentActivity } from './components/dashboard/RecentActivity';
import { AIAssistant } from './components/AIAssistant';
import { DocumentsList } from './components/dashboard/DocumentsList';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      {/* AI Assistant - appears on all pages */}
      <AIAssistant />
      
      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-auto">
        {currentPage === 'dashboard' && (
          <div>
            <DashboardStats />
            
            {/* Main Dashboard Content */}
            <div className="grid grid-cols-5 gap-6 mb-6">
              <div className="col-span-3 h-[500px]">
                <KnowledgeGraphPreview />
              </div>
              <div className="col-span-2 h-[500px]">
                <RecentActivity />
              </div>
            </div>

            {/* Documents List */}
            <DocumentsList />
          </div>
        )}
        
        {currentPage === 'upload' && (
          <div>
            <h1>Upload Paper</h1>
            <p className="text-gray-500 mt-2">Upload paper content will go here</p>
          </div>
        )}
        
        {currentPage === 'knowledge-graph' && (
          <div>
            <h1>Knowledge Graph</h1>
            <p className="text-gray-500 mt-2">Knowledge graph content will go here</p>
          </div>
        )}
      </div>
    </div>
  );
}
