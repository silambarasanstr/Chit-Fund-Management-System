const PageHeader = ({ title, subtitle, children }) => {
  return (
    <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>

      {children && <div>{children}</div>}
    </div>
  );
};

export default PageHeader;
