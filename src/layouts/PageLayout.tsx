import { PropsWithChildren } from "react";

interface PageLayoutProps {
  header: string;
  isContainer?: boolean;
}
const PageLayout = ({
  header,
  children,
  isContainer = true,
}: PropsWithChildren<PageLayoutProps>) => {
  return (
    <div>
      <header className="sticky text-xl font-bold flex items-center px-8 top-0 h-header shadow-sm bg-white z-50">
        {header}
      </header>
      <main className="container p-8 mx-auto">
        {isContainer ? (
          <div className="container mx-auto px-8 py-5 shadow-sm bg-white border-border border border-solid rounded-md">
            {children}
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
};

export default PageLayout;
