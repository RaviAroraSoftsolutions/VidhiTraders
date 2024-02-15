import {Link, useLocation} from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  let breadcrumbPath = "";

  // if (pathnames.length === 0) {
  //   // If the current route is the home route ('/'), do not render the breadcrumbs
  //   return null;
  // }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  return (
    <div className="breadcrumbs text-gray-500 text-sm">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        breadcrumbPath += `/${name}`;
        const isLast = index === pathnames.length - 1;
      

        return isLast ? (
          <span style={{ color: "rgb(96 165 250 / 1)"}} className="breadcrumb_letter text-blue-400  cursor-pointer" key={breadcrumbPath}>{"  >  "}  <span className="">{capitalizeFirstLetter(name)}</span></span>
        ) : (
          <span className="breadcrumb_letter" key={breadcrumbPath}>
            {"  >  "}
             <Link className="breadcrumb_letter breadcrumb_last hover:cursor-pointer" to={breadcrumbPath}>{capitalizeFirstLetter(name)}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;