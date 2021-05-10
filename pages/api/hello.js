// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {serialize} from "cookie";

export default (req, res) => {
    console.log("SETHEADER")
    res.setHeader("Set-Cookie", serialize("JIJI", "OROOKEN"));
    res.statusCode = 200;
    res.json({name: 'John Doe'})
}
