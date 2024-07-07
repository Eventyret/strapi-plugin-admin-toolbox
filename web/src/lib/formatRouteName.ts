import { RouteObject } from "react-router-dom";
import { routes } from "../routes";

export const formatRouteName = (pathname: string) => {
  const matchingRoute = routes.find(
    (route: RouteObject) =>
      route.path === pathname || `/${route.path}` === pathname
  );
  return matchingRoute ? matchingRoute.title : "Home";
};
