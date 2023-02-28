import Login from "../../components/Login";

type AuthLayoutProps = {
  login: boolean;
};

export function AuthLayout({ login }: AuthLayoutProps) {
  return (
    <>
      {login ? <Login /> : null}
    </>
  );
}
