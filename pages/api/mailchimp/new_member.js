import client from '@mailchimp/mailchimp_marketing'
import isEmpty from 'lodash/isEmpty';

client.setConfig({
    apiKey: "75af2ebd2f919ea0e436e8f218a90968-us4",
    server: "us4",
});

export default async (req, res) => {
    if (req.method === "POST") {
        if (isEmpty(req.body)) {
            return res.status(401).json({success: false})
        } else {
            try {
                const data = await client.lists.addListMember("94d9b6e312", {
                    email_address: req.body.email,
                    status: "subscribed",
                })
                return res.status(200).json({success: true, data});
            } catch (e) {
                return res.status(401).json({success: false, error: e?.response?.body?.title})
            }
        }
    } else {
        return res.status(404).json({success: false, error: "Invalid route"})
    }
    // console.log(response);

}
