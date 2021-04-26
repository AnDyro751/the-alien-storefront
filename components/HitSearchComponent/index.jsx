import { Highlight } from "react-instantsearch-dom";
import Link from "next/link";
const HitSearchComponent = ({ hit }) => {
  return (
    <div className="w-full">
      <Link href={`/products/${hit.slug}`}>
        <a>
          <Highlight attribute="name" hit={hit} tagName="mark" />
        </a>
      </Link>
    </div>
  );
};
export default HitSearchComponent;
