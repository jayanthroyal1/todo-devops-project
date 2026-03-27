import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import Button from "../components/common/Button";

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">TodoFlow</h1>
            <p className="text-sm text-slate-500">
              Welcome back, {user?.name || user?.email}
            </p>
          </div>

          <Button variant="danger" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
