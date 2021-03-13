const chai = require('chai'),
      nimbella = require('@nimbella/sdk'),
      expect = chai.expect,
      assert = chai.assert

describe('generate signed urls', function() {
    it('generate bad request if no parameters given', function() {
        let { main } = require('../src/create')

        return main()
            .then(res => {
                expect(res.statusCode).to.equal(400)
                expect(res.body).to.deep.equal({ error: 'Filename required.' })
            })
    })

    it('generate bad request if required parameters', function() {
        let { main } = require('../src/create')

        return main({})
            .then(res => {
                expect(res.statusCode).to.equal(400)
                expect(res.body).to.deep.equal({ error: 'Filename required.' })
            })
    })

    it('generate signed put url', function() {
        let { getSignedUrl } = require('../src/create')

        return getSignedUrl('some.file')
            .then(res => {
                expect(res).to.equal(`signed-some.file-write`)
            })
    })

    it('store print request in kv', function() {
        let { main } = require('../src/create')
        let redis = nimbella.redis()

        return main({ filename: 'some.file' })
            .then(res => {
                expect(redis.list().length).to.equal(2)
                let [ k1, k2 ] = redis.list()
                let id = k1 === 'created' ? k2 : k1
                let created = k1 === 'created' ? k1 : k2

                expect(res.statusCode).to.equal(200)
                expect(res.body.filename).to.equal('some.file')
                expect(res.body.id).to.equal(id)
                expect(res.body.status).to.equal('created')
                expect(res.body.signedPutUrl).to.equal(`signed-${id}-write`)

                let form = JSON.parse(redis.get(id))
                expect(form.status).to.equal(`created`)
                expect(redis.smembers(created)).to.deep.equal([id])
            })
    })
})
