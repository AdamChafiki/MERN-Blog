import Aside from "../../components/admin/Aside";
import UsersTable from "../../components/admin/Users";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { useEffect } from "react";
import { getAllProfiles } from "../../redux/slices/profileSlice";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { loading, profiles } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);

  return (
    <>
      <section className="flex">
        {loading === "loading" ? <Loader /> : <></>}

        <Aside />
        <UsersTable usersData={profiles} />
      </section>
    </>
  );
};

export default AdminUsers;
