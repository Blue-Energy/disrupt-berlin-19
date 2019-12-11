'use strict'

const { validate } = use('Validator')
const axios = require('axios')

const token = 'RLDAKPOMBZVQKKYHCHCZSXRQLHTFWOSDLZCWGOWWFIYZUZTXWLCZZGZMYCUCNIPD'
class PriceController {

    async search({request, response}){
        const rules = {
            query: 'required', // string 
            type: 'required' // in [pricerunner, google_shopping]
          }
        
        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.status(422).send({
                errror: "Failed validation"
            })
        }

        // make request
        
        let url = 'https://api.priceapi.com/v2/jobs'
        let data = await axios.post(url, {
            token: token,
            source: request.input('type'),
            country: 'dk',
            topic: 'search_results',
            values: request.input('query'),
            key: 'term'
        })
        
        response.send(data.data)

    }

    async status({request, response}){
        const rules = {
            id: 'required', // string 
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.status(422).send({
                errror: "Failed validation"
            })
        }

        let url = 'https://api.priceapi.com/v2/jobs/' + request.input('id') + '?token=' + token; 
        let data = await axios.get(url)

        response.send(data.data)

    }

    async result({request, response}){

    }
}

module.exports = PriceController
