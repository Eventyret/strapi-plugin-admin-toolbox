export const formatRouteName = (pathname: string) => {
  return (
    pathname
      .split("/")
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(" ") || "Dashboard"
  );
};
