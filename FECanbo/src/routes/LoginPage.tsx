import LoginForm from "../components/auth/LoginForm";

interface LoginFormProps {
  redirectUrl: string;
}
const LoginPage = (props: LoginFormProps) => {
  return (
    <div className="flex items-center justify-center p-4">
      <LoginForm redirectUrl={props.redirectUrl} />
    </div>
  );
};

export default LoginPage;
