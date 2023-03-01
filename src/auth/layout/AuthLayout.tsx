import Login from "../../components/Login";
import Register from "../../components/Register";

type AuthLayoutProps = {
  login: boolean;
};

export function AuthLayout({ login }: AuthLayoutProps) {
  return (
    <>
      {login ? <Login /> : <Register />}
    </>
  );
}
