import DashboardLayout from "@/components/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="w-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Dashboard Overview</h2>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-100 dark:bg-gray-700 shadow-lg rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Tasks</h3>
            <p className="text-gray-500 dark:text-gray-300">Manage your to-do lists</p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 shadow-lg rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Expenses</h3>
            <p className="text-gray-500 dark:text-gray-300">Track your spending</p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 shadow-lg rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Weekly Summary</h3>
            <p className="text-gray-500 dark:text-gray-300">Review your week</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
