import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllPurchasesCourseQuery } from "@/features/api/purchaseApiSlice";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const chartData = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const { data, isLoading, isError, error } = useGetAllPurchasesCourseQuery();

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // } else if (isError) {
  //   return <h1 className="text-red-500">Failed to get purchased course</h1>;
  // }

  const { purchasedCourse } = data || [];
  console.log(purchasedCourse);

  const courseData = purchasedCourse?.map((course, index) => ({
    name: course?.courseId?.courseTitle,
    price: course?.courseId?.coursePrice,
  }));

  const totalRevenue = purchasedCourse?.reduce(
    (acc, item) => acc + (item.amount || 0),
    0
  );

  const totalSale = purchasedCourse?.length;

  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        description="This the admin dashboard"
      />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1 className="text-red-500">Failed to get purchased course</h1>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Total Sales</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{totalSale}</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">
                ₹ {totalRevenue}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">
                Course Prices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={courseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    angle={-30} // Rotated labels for better visibility
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis stroke="#6b7280" />
                  <Tooltip formatter={(value, name) => [`₹${value}`, name]} />

                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#4a90e2" // Changed color to a different shade of blue
                    strokeWidth={3}
                    dot={{ stroke: "#4a90e2", strokeWidth: 2 }} // Same color for the dot
                  />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Dashboard;
