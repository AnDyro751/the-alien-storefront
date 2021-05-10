import Image from 'next/image'

const ProductsCover = () => {
    return (
        <div className="w-11/12 mx-auto relative h-80 shadow-lg rounded bg-yellow-200">
            <Image src="v1620686806/LILM_mtkl8z.png"
                   layout={"fill"}
                   quality={70}
                   objectFit={"cover"}
            />
        </div>
    )
}

export default ProductsCover