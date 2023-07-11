type TAuthHeaderScaffoldProps = {
  children: React.ReactNode;
  className?: string;
};

function Root({ ...props }: TAuthHeaderScaffoldProps) {
  return <div className="flex flex-col space-y-2 text-center" {...props} />;
}

function Title({ ...props }: TAuthHeaderScaffoldProps) {
  return <h1 className="text-2xl font-semibold tracking-tight" {...props} />;
}

function Description({ ...props }: TAuthHeaderScaffoldProps) {
  return <p className="text-sm text-muted-foreground" {...props} />;
}

export const AuthHeaderScaffold = { Root, Title, Description };
