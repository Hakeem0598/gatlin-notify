import { IconType } from 'react-icons'
import { Directions } from '../fade-in-on-scroll/fade-in-on-scroll.types'

export type FeaturesCardProps = React.ComponentProps<'div'> & {
    icon: IconType; 
    title: string; 
    paragraph: string; 
    direction: Directions;
}