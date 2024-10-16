import { node, string } from "prop-types";

const ErrorMessage = ({ children, content }) => {
  if (!content) return;
  return (
    <>
      <div style={{ color: "red", marginTop: "5px", marginBottom: "5px" }}>
        {content}
      </div>
      {children}
    </>
  );
};

ErrorMessage.propTypes = {
  children: node,
  content: string,
};

export default ErrorMessage;
