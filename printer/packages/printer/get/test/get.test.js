const chai = require('chai'),
      nimbella = require('nim'),
      { main } = require('../src/get'),
      expect = chai.expect,
      assert = chai.assert

describe('get print job by id', function() {

    it('generate bad request if missing file id', function() {
        let res = main()
        expect(res.statusCode).to.equal(400)
        expect(res.body).to.deep.equal({ error: 'File id required.' })

        res = main({})
        expect(res.statusCode).to.equal(400)
        expect(res.body).to.deep.equal({ error: 'File id required.' })
    })

    it('generate bad request if file id is invalid', function() {
        return main({id: 'bad id'})
            .then(res => {
                expect(res.statusCode).to.equal(404)
                expect(res.body).to.deep.equal({ error: 'Invalid file id.' })
            })
    })

    it('get print job by id', function() {
        let redis = nimbella.redis()
        let id = 'some id'

        redis.set(id, JSON.stringify({
            id,
            filename: 'some.file',
            status: 'created'
        }))

        return main({ id })
            .then(res => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.id).to.equal(id)
                expect(res.body.filename).to.equal('some.file')
                expect(res.body.status).to.equal('created')
                expect(res.body.image).to.equal(`signed-${id}-read`)
            })
    })
})
