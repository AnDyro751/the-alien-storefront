import {Highlight} from "react-instantsearch-dom";
import Link from "next/link";
import ProductsShow from "../products/Show";

const HitSearchComponent = ({hit}) => {
    const getFullHighlight = (items) => {
        let elements = [];
        Object.values(items).map((el, i) => {
            if (el.matchLevel === "full") {
                elements.push({...el, cName: Object.keys(items)[i],});
            }
        });
        if (elements.length > 0) {
            return (
                <ProductsShow
                    result={() => (
                        <Highlight
                            attribute={`names.${elements[0].cName}`}
                            tagName="mark"
                            hit={hit}
                        />
                    )}
                    included={[]}
                    resultImages={hit.all_images}
                    product={{id: toString(hit.id), attributes: {slug: hit.slug, name: hit.names[elements[0].cName]}}}
                />
            );
        } else {
            return;
        }
    };
    return (
        <div className="w-full">
            {getFullHighlight(hit._highlightResult?.names)}
        </div>
    );
};
export default HitSearchComponent;
