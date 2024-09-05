import NavigationBar from "./navbar/NavigationBar";

interface ContainerProps {
  children: React.ReactNode;
}

export default function CommonContainer({ children }: ContainerProps) {
  return (
    <>
      <NavigationBar />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        {children}
      </div>
    </>
  );
}
