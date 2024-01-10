import EmailConfirmation from "../components/auth/EmailConfirmation";

interface EmailConfirmationPageProps {
  type: "email-verification" | "change-password" | "forgot-password";
}

const EmailConfirmationPage = ({ type }: EmailConfirmationPageProps) => {
  return (
    <div className="flex items-center justify-center p-4">
      <EmailConfirmation type={type} />
    </div>
  );
};

export default EmailConfirmationPage;
