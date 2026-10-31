import type { ComponentPropsWithoutRef } from 'react';

type BadgeProps = ComponentPropsWithoutRef<'div'>;

export function Badge({ className, ...props }: BadgeProps) {
    return <div className={['badge', className].filter(Boolean).join(' ')} {...props} />;
}
