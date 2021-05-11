import client from '@mailchimp/mailchimp_marketing'
import isEmpty from 'lodash/isEmpty';

client.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
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
