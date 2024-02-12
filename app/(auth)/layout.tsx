const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full justify-center items-center bg-slate-400">
      {children}
    </div>
  );
};

export default AuthLayout;
