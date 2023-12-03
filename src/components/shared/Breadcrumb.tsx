import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumb({
  title,
  isTittleShow = true,
}: {
  title: string;
  isTittleShow?: boolean;
}) {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="flex flex-col gap-2">
      {isTittleShow && <h2 className="text-2xl font-bold">{title}</h2>}
      <Breadcrumbs size="sm">
        {/* Home breadcrumb */}
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <BreadcrumbItem key={name}>
              {isLast ? (
                <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
              ) : (
                <Link to={routeTo}>{name}</Link>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
