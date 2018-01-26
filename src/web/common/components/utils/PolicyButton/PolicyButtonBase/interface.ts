export interface IPolicyButtonBaseProps {
    primaryTitle: string,
    secondaryTitle?: string,
    statusText?: string,
    icon?: any,
    url?: string,
    disabled?: boolean,
    roundedIcon?: boolean,
    iconBackgroundColor?: string,
    onButtonClick?: (value: any) => void,
}