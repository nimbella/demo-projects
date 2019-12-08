const chai = require('chai'),
      nimbella = require('nim'),
      { main } = require('../src/update'),
      expect = chai.expect,
      assert = chai.assert

describe('get print job by id', function() {

    it('generate bad request if missing file id or status', function() {
        let res = main({})
        expect(res.statusCode).to.equal(400)
        expect(res.body).to.deep.equal({ error: 'File id and valid status required.' })

        res = main({id: 'x'})
        expect(res.statusCode).to.equal(400)
        expect(res.body).to.deep.equal({ error: 'File id and valid status required.' })

        res = main({status: 'y'})
        expect(res.statusCode).to.equal(400)
        expect(res.body).to.deep.equal({ error: 'File id and valid status required.' })

        res = main({id: 'x', status: 'y'})
        expect(res.statusCode).to.equal(400)
        expect(res.body).to.deep.equal({ error: 'File id and valid status required.' })
    })

    it('generate bad request if file id is invalid', function() {
        return main({id: 'bad id', status: 'approved'})
            .then(res => {
                expect(res.statusCode).to.equal(404)
                expect(res.body).to.deep.equal({ error: 'Invalid file id.' })
            })
    })

    it('update status on form', function() {
        let redis = nimbella.redis()
        let id = 'some id'
        let oldStatus = 'created'
        let newStatus = 'approved'

        redis.set(id, JSON.stringify({
            id,
            filename: 'some.file',
            status: oldStatus
        }))

        return main({ id, status: newStatus })
            .then(res => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.id).to.equal(id)
                expect(res.body.filename).to.equal('some.file')
                expect(res.body.status).to.equal(newStatus)

                expect(JSON.parse(redis.get(id)).status).to.equal(newStatus)
                expect(redis.smembers(oldStatus)).to.deep.equal([])
                expect(redis.smembers(newStatus)).to.deep.equal([ id ])
            })
    })
})
