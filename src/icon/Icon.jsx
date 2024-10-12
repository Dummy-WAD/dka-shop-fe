import { node, string, func } from "prop-types";

export const ProductIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => {},
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
  </svg>
);

export const CategoryIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => {},
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M448 96l0 128-160 0 0-128 160 0zm0 192l0 128-160 0 0-128 160 0zM224 224L64 224 64 96l160 0 0 128zM64 288l160 0 0 128L64 416l0-128zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z" />
  </svg>
);

export const OrderIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => {},
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
  >
    <path d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
  </svg>
);

export const UserIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => {},
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
  </svg>
);

export const UserRegularIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => {},
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
  </svg>
);

export const CartIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => {},
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
  >
    <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
  </svg>
);

export const ChartIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => {},
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z" />
  </svg>
);

export const SearchIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => {},
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
      clipRule="evenodd"
    />
  </svg>
);

export const NotificationIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => {},
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
  </svg>
);

export const BackIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => {},
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
      fill="#000000"
    />
  </svg>
);

const iconPropTypes = {
  children: node,
  className: string,
  width: string,
  height: string,
  onClick: func,
};

ProductIcon.propTypes = iconPropTypes;
CategoryIcon.propTypes = iconPropTypes;
OrderIcon.propTypes = iconPropTypes;
UserIcon.propTypes = iconPropTypes;
ChartIcon.propTypes = iconPropTypes;
SearchIcon.propTypes = iconPropTypes;
NotificationIcon.propTypes = iconPropTypes;
BackIcon.propTypes = iconPropTypes;
UserRegularIcon.propTypes = iconPropTypes;
CartIcon.propTypes = iconPropTypes;
