import Aside from "../../components/admin/Aside";
import Main from "../../components/admin/Main";

const AdminDashboard = () => {
  return (
    <>
      <section className="flex">
        <Aside />
        <Main />
      </section>
    </>
  );
};

export default AdminDashboard;
