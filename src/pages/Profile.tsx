
import Header from "@/components/Header";
import UserProfile from "@/components/UserProfile";

const Profile = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pt-16">
      <Header />
      <main>
        <UserProfile />
      </main>
    </div>
  );
};

export default Profile;
