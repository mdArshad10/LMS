import PageHeader from "@/components/PageHeader";
import Courses from "@/components/student/Courses";
import HeroSection from "@/components/student/HeroSection";

const Home = () => {
  return (
    <>
      <PageHeader
        title="Home"
        description="This is home page of the e-learning where you can buy and sell the courses"
      />
      <HeroSection />
      <Courses />
    </>
  );
};

export default Home;
