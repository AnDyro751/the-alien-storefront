import Image from 'next/image'
import Input from "../Input";
import ComponentButton from "../Button";
import {CURRENT_ENDPOINT, WEB_ENDPOINT} from "../../src/lib/apiConstants";
import {useState} from "react";
import showToast from "../../src/lib/showToast";


const NewSubscription = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value || "");
    }

    const handleSubmit = async (e) => {
        console.log("SUBMIT")
        e.preventDefault();
        setLoading(true);
        try {
            const response = await (await fetch(`${CURRENT_ENDPOINT}/api/mailchimp/new_member`, {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                }),
                method: "POST"
            })).json()
            setLoading(false);
            if (!response.success) {
                showToast(`Newsletter Error: ${response.error}`, "#f44336")
            } else {
                setEmail("");
                showToast("Thanks for joining our newsletter")
            }
            console.log(response)
        } catch (e) {
            setLoading(false);
            console.log("ERROR", e)
        }
    }

    return (
        <div className="relative w-full h-full bg-gray-200 shadow-lg">
            <div className="w-full h-full rounded z-10 bg-black opacity-60 absolute top-0 left-0 right-0 bottom-0"/>
            <div
                className="w-11/12 flex-wrap content-center space-y-8 mx-auto h-full z-20 absolute top-0 left-0 right-0 bottom-0 flex items-center">
                <div className="w-6/12">
                    <p className="text-2xl font-medium text-white">
                        Subscribe to our newsletter and receive exclusive offers
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex items-center space-x-4">
                    <div className="w-8/12">
                        <Input
                            value={email}
                            handleChange={handleChange}
                            withoutError={false}
                            type={"email"} name={"newsletter_email"} required={true}
                            placehoder={"name@email.com"}/>
                    </div>
                    <div className="w-4/12">
                        <ComponentButton
                            withBorder={false}
                            type={"submit"}
                            text={"SUBSCRIBE"}
                            loading={loading}
                            color={"secondary"}/>
                    </div>
                </form>
            </div>
            <Image
                src={"v1620743317/c42f43880e764c1ea69a2c739a1b6e70_2_r8j30r.jpg"}
                layout={"fill"}
                className="rounded"
                quality={70}
                objectFit={"cover"}
                objectPosition={"bottom"}
            />
        </div>
    )
}


export default NewSubscription