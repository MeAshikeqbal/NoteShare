import { UserButton } from "@/components/auth/user-button";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-slate-200">
      {children}
    </div>
  );
};

export default ProtectedLayout;
