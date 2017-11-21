import * as React from 'react';

// tslint:disable-next-line:no-var-requires
const cn = require('classnames');

interface ImageProps {
  src: any
  scale?: number
  width: number
  height: number
  className?: string
  alt?: string;
  style?: any;
  color?: 'white' | 'blue';
}

const Image = (props: ImageProps) => {
  const { src, className, height, width, scale = 1, ...rest } = props

  return (
    <img
      src={src}
      className={cn('image', className)}
      height={height * scale}
      width={width * scale}
      alt=""
      {...rest}
    />
  )
}

export const Logo = (props: { scale?: number; style?: any }) => {
  return (
    <Image
      src={require('./logo.svg')}
      height={23}
      width={47}
      className="logo"
      {...props}
    />
  )
}

export const Cross = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./cross.svg')}
      height={14}
      width={14}
      alt="logo"
      className="logo"
      {...props}
    />
  )
}

export const Camera = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./camera.svg')}
      height={25}
      width={34}
      alt="camera"
      className="camera"
      {...props}
    />
  )
}

export const Car = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./car.svg')}
      height={46}
      width={116}
      alt="car"
      className="car"
      {...props}
    />
  )
}

export const Cursor = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./cursor.svg')}
      height={22}
      width={34}
      alt="cursor"
      className="cursor"
      {...props}
    />
  )
}

export const Ellipsis = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./ellipsis.svg')}
      height={7}
      width={34}
      alt="ellipsis"
      className="ellipsis"
      {...props}
    />
  )
}

export const Letter = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./mail.svg')}
      height={19}
      width={34}
      alt="letter"
      className="letter"
      {...props}
    />
  )
}

export const Plus = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./plus.svg')}
      height={27}
      width={27}
      alt="plus"
      className="plus"
      {...props}
    />
  )
}

export const CarOutline = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./car-outline.svg')}
      height={46.697}
      width={116.8}
      alt="car outline"
      className="car-outline"
      {...props}
    />
  )
}

export const Warning = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./warning.png')}
      height={69}
      width={75}
      alt="warning"
      className="warning-img"
      {...props}
    />
  )
}

export const Chevron = (props: {
  scale?: number
  color?: 'white' | 'blue'
  style?: any
}) => {
  return (
    <Image
      src={
        props.color === 'white'
          ? require('./chevron-white.svg')
          : require('./chevron-blue.svg')
      }
      height={9.838}
      width={5.74}
      alt="chevron"
      className="chevron"
      scale={props.scale}
      {...props}
    />
  )
}

export const Details = (props: { scale?: number, width?: number, height?: number }) => {
  return (
    <Image
      src={require('./details.svg')}
      height={props.height || 56.387}
      width={props.width || 66.425}
      alt="Policy Details"
      className="policy-details-img"
      {...props}
    />
  )
}

export const PolicyBots = (props: { scale?: number, width?: number, height?: number }) => {
  return (
    <Image
      src={require('./policy-bots.svg')}
      height={props.height || 47.607}
      width={props.width || 67.148}
      alt="Policy Bots"
      className="policy-bots-img"
      {...props}
    />
  )
}

export const Upload = (props: { scale?: number, width?: number, height?: number }) => {
  return (
    <Image
      src={require('./upload.svg')}
      height={props.height || 91.643}
      width={props.width || 83.845}
      alt="Upload"
      className="upload-img"
      {...props}
    />
  )
}

export const Arrow = (props: { scale?: number; style?: any, width?: number, height?: number }) => {
  return (
    <Image
      src={require('./arrow.svg')}
      height={props.height || 16.971}
      width={props.width || 20.152}
      alt="left facing arrow"
      className="arrow-img"
      {...props}
    />
  )
}

export const LeftArrow = (props: { scale?: number; style?: any, width?: number, height?: number }) => {
    return (
        <Image
            src={require('./left-arrow.svg')}
            height={props.height || 16.971}
            width={props.width || 20.152}
            alt="left arrow"
            className="arrow-img"
            {...props}
        />
    )
}

export const DownArrow = (props: { scale?: number; style?: any, width?: number, height?: number }) => {
    return (
        <Image
            src={require('./down-arrow.svg')}
            height={props.height || 16.971}
            width={props.width || 20.152}
            alt="left arrow"
            className="arrow-img"
            {...props}
        />
    )
}

export const Tick = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./tick.svg')}
      height={11.279}
      width={15.197}
      alt="tick"
      className="tick-img"
      {...props}
    />
  )
}

export const PinkShape = (props: { scale?: number }) => (
    <Image
      src={require('./pink-shape.svg')}
      height={231}
      width={466}
      alt="pink-shape"
      className="pink-shape-img"
      {...props}
    />
)

export const GreyShape = (props: {scale?: number}) => (
  <Image
    src={require('./grey-shape.svg')}
    height={367}
    width={331}
    alt="grey-shape"
    className="grey-shape-img"
    {...props}
  />
);

export const BannerShape = (props: {scale?: number}) => (
  <Image
    src={require('./banner-shape.png')}
    height={367}
    width={263}
    alt="banner-shape"
    className="banner-shape-img"
    {...props}

  />
)

export const TwitterIcon = (props: {width?: number, height?: number}) => (
  <Image
    src={require('./twitter-icon.svg')}
    height={props.height || 24}
    width={props.width || 24}
    alt="twitter-icon"
    className="twitter-icon"
    {...props}
  />
)

export const FacebookIcon = (props: {width?: number, height?: number}) => (
  <Image
    src={require('./fb-icon.svg')}
    height={props.height || 24}
    width={props.width || 24}
    alt="fb-icon"
    className="fb-icon"
    {...props}
  />
)

export const LinkedinIcon = (props: {width?: number, height?: number}) => (
  <Image
    src={require('./ld-icon.svg')}
    height={props.height || 24}
    width={props.width || 24}
    alt="ld-icon"
    className="ld-icon"
    {...props}
  />
)

export const WhiteSubmitArrow = (props: {width?: number, height?: number}) => (
  <Image
    src={require('./white-submit-arrow.svg')}
    height={props.height || 20}
    width={props.width || 13}
    alt="white-arrow-icon"
    className="white-arrow-icon"
    {...props}
  />
)

export const RedSubmitArrow = (props: {width?: number, height?: number}) => (
    <Image
        src={require('./red-submit-arrow.svg')}
        height={props.height || 20}
        width={props.width || 13}
        alt="ld-icon"
        className="ld-icon"
        {...props}
    />
)

export const DashboardShape = (props: any) => (
  <Image
    src={require('./dashboard-shape.svg')}
    height={70}
    width={323}
    alt="dashboard-shape"
    className="dashboard-shape-img"
    {...props}
  />
)

export const CircleDashboardCar = (props: any) => (
  <Image
    src={require('./circle-dashboard-car.png')}
    height={256}
    width={256}
    alt="circle-dashboard-car"
    className="circle-dashboard-car-img"
    {...props}
  />
)

export const BlackArrow = (props: {width?: number, height?: number}) => (
  <Image
    src={require('./black-arrow.svg')}
    height={props.height || 16}
    width={props.width || 11}
    alt="black-arrow"
    className="black-arrow-img"
    {...props}
  />
);

export const PolicyCar = (props: {width?: number, height?: number}) => (
  <Image
    src={require('./policy-car.svg')}
    height={props.height || 35}
    width={props.width || 76}
    alt="policy-car"
    className="policy-car-icon"
    {...props}
  />
);

export const PolicyTravel = (props: {width?: number, height?: number}) => (
  <Image
    src={require('./policy-travel.svg')}
    height={props.height || 44}
    width={props.width || 55}
    alt="policy-travel"
    className="policy-travel-icon"
    {...props}
  />
);

export const PolicyHome = (props: {width?: number, height?: number}) => (
  <Image
    src={require('./policy-home.svg')}
    height={props.height || 58}
    width={props.width || 63}
    alt="policy-home"
    className="policy-home-icon"
    {...props}
  />
);

export const PolicyWarranties = (props: {width?: number, height?: number}) => (
  <Image
    src={require('./policy-warranties.svg')}
    height={props.height || 54}
    width={props.width || 43}
    alt="policy-warranties"
    className="policy-warranties-icon"
    {...props}
  />
);

export const Add = (props: {width?: number, height?: number}) => (
  <Image
    src={require('./add.svg')}
    height={props.height || 30}
    width={props.width || 29}
    alt="add"
    className="add-icon"
    {...props}
  />
);

export const PolicyMail = (props: {width?: number, height?: number}) => (
  <Image
    src={require('./policy-mail.svg')}
    height={props.height || 33}
    width={props.width || 56}
    alt="policy-mail"
    className="policy-mail"
    {...props}
  />
);

export const PolicyManual = (props: {width?: number, height?: number}) => (
  <Image
    src={require('./policy-manual.svg')}
    height={props.height || 37}
    width={props.width || 56}
    alt="policy-manual"
    className="policy-manual"
    {...props}
  />
);

export const PolicyPhoto = (props: {width?: number, height?: number}) => (
  <Image
    src={require('./policy-photo.svg')}
    height={props.height || 41}
    width={props.width || 56}
    alt="policy-photo"
    className="policy-photo"
    {...props}
  />
);

export const EditIcon = (props: {width?: number, height?: number}) => (
  <Image
    src={require('./edit-icon.svg')}
    height={props.height || 20}
    width={props.width || 20}
    alt="edit"
    className="edit-icon"
    {...props}
  />
);
