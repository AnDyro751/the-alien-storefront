import PropTypes from "prop-types";
import Link from "next/link";
import { Fragment } from "react";

const Breadcrumbs = ({ keys }) => {
  return (
    <nav className="py-3 rounded w-full">
      <ol className="list-reset flex text-grey-dark">
        {keys.map((item, i) => (
          <Fragment key={i}>
            {i != 0 && (
              <li>
                <span className="mx-2 text-gray-400">/</span>
              </li>
            )}
            <li>
              {i === keys.length - 1 ? (
                <span className="text-gray-900 text-sm">{item.text}</span>
              ) : (
                <Link href={item.href}>
                  <a className="text-gray-600 text-sm hover:underline">
                    {item.text}
                  </a>
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumbs.proptYpes = {
  keys: PropTypes.array.isRequired,
};

Breadcrumbs.defaultProps = {
  keys: [],
};

export default Breadcrumbs;
