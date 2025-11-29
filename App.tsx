
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer'; 
import Dashboard from './pages/Dashboard';
import CaseStudyForm from './pages/forms/CaseStudyForm';
import AbsenceForm from './pages/forms/AbsenceForm';
import MorningDelayForm from './pages/forms/MorningDelayForm';
import DailyReportForm from './pages/forms/DailyReportForm';
import GroupGuidanceForm from './pages/forms/GroupGuidanceForm';
import ProblemReportForm from './pages/forms/ProblemReportForm';
import ActivityLogForm from './pages/forms/ActivityLogForm';
import InterviewForm from './pages/forms/InterviewForm';
import ClassroomGuidanceForm from './pages/forms/ClassroomGuidanceForm';
import DropoutForm from './pages/forms/DropoutForm';
import Agenda from './pages/Agenda';
import StudentsDatabase from './pages/StudentsDatabase';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import UpdatePassword from './pages/auth/UpdatePassword';
import Profile from './pages/Profile';
import UserGuide from './pages/UserGuide';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';
import { Menu, Bell, AlertOctagon, Loader2, Check, Plus, Edit, Trash2, Info } from 'lucide-react';
import { DataProvider, useData } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider, useNotification } from './context/NotificationContext';

// مكون حماية المسارات
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { error } = useData();
  const { profile } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotification();

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'add': return <Plus className="w-4 h-4 text-white" />;
      case 'update': return <Edit className="w-4 h-4 text-white" />;
      case 'delete': return <Trash2 className="w-4 h-4 text-white" />;
      default: return <Info className="w-4 h-4 text-white" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'add': return 'bg-green-500';
      case 'update': return 'bg-blue-500';
      case 'delete': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-6" dir="rtl">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center border-2 border-red-100">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertOctagon className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">تعذر الاتصال بقاعدة البيانات</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            حدث خطأ أثناء محاولة جلب البيانات. يرجى التأكد من تشغيل كود SQL في Supabase.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg text-left text-sm font-mono text-red-600 mb-6 border border-gray-200 overflow-x-auto whitespace-pre-wrap" dir="ltr">
            Error: {error}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Wrapper */}
      <div className="flex-1 lg:mr-[280px] transition-all duration-300 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="flex justify-between items-center p-4 px-6">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-600 hover:text-gray-900 ml-4 p-1 rounded hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-700 hidden sm:block">نظام إدارة التقارير المدرسية</h1>
                {profile?.school_name && (
                  <p className="text-xs text-blue-600 font-medium hidden sm:block">{profile.school_name}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Notification Bell */}
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                >
                  <Bell className="w-6 h-6 text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                  )}
                </button>

                {/* Dropdown */}
                {notificationOpen && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-scale-in origin-top-left">
                    <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                      <h3 className="font-bold text-gray-800">الإشعارات</h3>
                      {notifications.length > 0 && (
                        <button 
                          onClick={markAllAsRead} 
                          className="text-xs text-blue-600 hover:text-blue-700 flex items-center"
                        >
                          <Check className="w-3 h-3 ml-1" />
                          تحديد الكل كمقروء
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">
                          <Bell className="w-12 h-12 mx-auto mb-2 opacity-20" />
                          <p className="text-sm">لا توجد إشعارات جديدة</p>
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex items-start gap-3 ${notif.isRead ? 'opacity-60' : 'bg-blue-50/30'}`}
                          >
                            <div className={`p-2 rounded-full flex-shrink-0 ${getNotificationColor(notif.type)} shadow-sm`}>
                              {getNotificationIcon(notif.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 leading-tight">{notif.message}</p>
                              <p className="text-xs text-gray-400 mt-1" dir="ltr" style={{textAlign: 'right'}}>
                                {notif.timestamp.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3 space-x-reverse border-r border-gray-200 pr-4 mr-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold uppercase">
                  {profile?.full_name ? profile.full_name[0] : 'م'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-bold text-gray-700">{profile?.full_name || 'المرشد الطلابي'}</p>
                  <p className="text-xs text-green-500">متصل الآن</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full flex-grow">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/update-password" element={<UpdatePassword />} />
      
      {/* Protected Routes */}
      <Route path="/" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
      <Route path="/agenda" element={<PrivateRoute><Layout><Agenda /></Layout></PrivateRoute>} />
      <Route path="/students" element={<PrivateRoute><Layout><StudentsDatabase /></Layout></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Layout><Profile /></Layout></PrivateRoute>} />
      
      {/* Forms */}
      <Route path="/forms/daily-report" element={<PrivateRoute><Layout><DailyReportForm /></Layout></PrivateRoute>} />
      <Route path="/forms/absence" element={<PrivateRoute><Layout><AbsenceForm /></Layout></PrivateRoute>} />
      <Route path="/forms/morning-delay" element={<PrivateRoute><Layout><MorningDelayForm /></Layout></PrivateRoute>} />
      <Route path="/forms/case-study" element={<PrivateRoute><Layout><CaseStudyForm /></Layout></PrivateRoute>} />
      <Route path="/forms/dropout" element={<PrivateRoute><Layout><DropoutForm /></Layout></PrivateRoute>} />
      <Route path="/forms/group-guidance" element={<PrivateRoute><Layout><GroupGuidanceForm /></Layout></PrivateRoute>} />
      <Route path="/forms/classroom-guidance" element={<PrivateRoute><Layout><ClassroomGuidanceForm /></Layout></PrivateRoute>} />

      {/* Reports */}
      <Route path="/reports/problems/:type" element={<PrivateRoute><Layout><ProblemReportForm /></Layout></PrivateRoute>} />
      <Route path="/forms/problems" element={<PrivateRoute><Layout><ProblemReportForm /></Layout></PrivateRoute>} />
      <Route path="/reports/activities/:type" element={<PrivateRoute><Layout><ActivityLogForm /></Layout></PrivateRoute>} />
      <Route path="/forms/activities" element={<PrivateRoute><Layout><ActivityLogForm /></Layout></PrivateRoute>} />
      <Route path="/reports/interviews/:type" element={<PrivateRoute><Layout><InterviewForm /></Layout></PrivateRoute>} />
      <Route path="/forms/interviews" element={<PrivateRoute><Layout><InterviewForm /></Layout></PrivateRoute>} />

      {/* Info Pages */}
      <Route path="/user-guide" element={<PrivateRoute><Layout><UserGuide /></Layout></PrivateRoute>} />
      <Route path="/privacy" element={<PrivateRoute><Layout><PrivacyPolicy /></Layout></PrivateRoute>} />
      <Route path="/terms" element={<PrivateRoute><Layout><TermsOfUse /></Layout></PrivateRoute>} />
      <Route path="/about" element={<PrivateRoute><Layout><AboutUs /></Layout></PrivateRoute>} />
      <Route path="/contact" element={<PrivateRoute><Layout><ContactUs /></Layout></PrivateRoute>} />

      {/* 404 Route */}
      <Route path="*" element={<PrivateRoute><Layout><NotFound /></Layout></PrivateRoute>} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <DataProvider>
          <Router>
            <AppRoutes />
          </Router>
        </DataProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
