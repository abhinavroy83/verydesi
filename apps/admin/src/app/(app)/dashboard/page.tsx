import ProtectedRoute from "@/context/ProtectedRoute";


export default function DashboardPage() {
  return (
    <ProtectedRoute requiredPermission="view_dashboard">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>
          Welcome to your dashboard. Here you can view important information and
          statistics.
        </p>
      </div>
    </ProtectedRoute>
  );
}
