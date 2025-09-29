import { LayoutProps } from '@/models';

export function EmptyLayout({ children }: LayoutProps) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
