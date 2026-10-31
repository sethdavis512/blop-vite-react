import type { ComponentPropsWithoutRef } from 'react';
import './FeatureCard.css';

type FeatureCardProps = ComponentPropsWithoutRef<'div'>;

export function FeatureCard({ className, ...props }: FeatureCardProps) {
    return <div className={['feature-card', className].filter(Boolean).join(' ')} {...props} />;
}
