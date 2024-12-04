import PageHeader from "@/components/PageHeader";
import Course from "@/components/student/course";
import { useGetProfileQuery } from "@/features/api/authApiSlice";

const MyLearningPage = () => {
  const { data: userProfileData, isLoading } = useGetProfileQuery();

  return (
    <>
      <PageHeader
        title="Your learning profile"
        description={"This is learning profile page"}
      />
      <div className="max-w-4xl mx-auto mt-16 mb-10 px-4 md:px-0 pb-4">
        <h1 className="font-bold text-2xl pt-3">My Learning</h1>
        <div className="my-5">
          {isLoading ? (
            <MyLearningSkeleton />
          ) : userProfileData.data?.enrolledCourses.length === 0 ? (
            <p>No Course is purchase</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {userProfileData.data?.enrolledCourses.map((course, index) => (
                <Course course={course} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);

export default MyLearningPage;
