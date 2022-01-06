type SubscriptionType = 'monthly' | 'yearly';

export type PricingCardProps = React.ComponentProps<'div'> & {
    isPopular?: boolean;
    subscription: SubscriptionType;
    price: number;
    lookupKey: string;
}