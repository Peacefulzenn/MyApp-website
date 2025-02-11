import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard App</h1>
      <p className="mt-4">This is your landing page. Click below to go to your dashboard.</p>
      <Link href="/dashboard">
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Go to Dashboard</button>
      </Link>
    </div>
  );
};

export default HomePage;
