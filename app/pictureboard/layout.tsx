import AuthProtect from "@/components/auth/AuthProtect";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProtect>
      {children}
    </AuthProtect>
  );
}

export default layout;
