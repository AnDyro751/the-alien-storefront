import { Highlight } from "react-instantsearch-dom";
import Link from "next/link";

const HitSearchComponent = ({ hit }) => {
  const getFullHighlight = (items) => {
    // let a = {}
    let elements = [];
    Object.values(items).map((el, i) => {
      if (el.matchLevel === "full") {
        elements.push({ ...el, cName: Object.keys(items)[i] });
      }
    });
    if (elements.length > 0) {
      // return elements[0];
      return (
        <Highlight
          attribute={`names.${elements[0].cName}`}
          tagName="mark"
          hit={hit}
        />
      );
    } else {
      return;
    }
  };
  return (
    <div className="w-full">
      <Link href={`/products/${hit.slug}`}>
        <a>
          {getFullHighlight(hit._highlightResult?.names)}
        </a>
      </Link>
    </div>
  );
};
export default HitSearchComponent;
