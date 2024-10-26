import React from "react";

const Field = ({ label, error, children, htmlFor }) => {
  const id = htmlFor || getChildId(children);

  return (
    <div className="w-full mb-4">
      {!!label && (
        <label className="block mb-2.5 capitalize" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div role="alert" className="mt-1.5 text-primary">
          {error?.message}
        </div>
      )}
    </div>
  );
};

export default Field;
function getChildId(children) {
  const child = React.Children?.only(children);
  if ("id" in child.props) {
    return child.props.id;
  }
  return undefined;
}
