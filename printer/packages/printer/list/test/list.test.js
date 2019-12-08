const chai = require('chai'),
      nimbella = require('nim'),
      { main } = require('../src/list'),
      expect = chai.expect,
      assert = chai.assert

describe('list print jobs by status', function() {

    it('generate bad request if no args given', function() {
        return main().then(res => {
            expect(res.statusCode).to.equal(400)
            expect(res.body).to.deep.equal({ error: 'Valid status required.' })
        })
    })

    it('generate bad request if empty args given', function() {
        return main({}).then(res => {
            expect(res.statusCode).to.equal(400)
            expect(res.body).to.deep.equal({ error: 'Valid status required.' })
        })
    })

    it('generate bad request if invalid status given', function() {
        return main({status: 'y'}).then(res => {
            expect(res.statusCode).to.equal(400)
            expect(res.body).to.deep.equal({ error: 'Valid status required.' })
        })
    })

    let statusSet = {
        'created': [1, 2],
        'approved': [3, 4],
        'rejected': [5, 6]
    }

    Object.keys(statusSet).forEach(status => {
        it(`list ids for ${status} status`, function() {
            let redis = nimbella.redis()

            statusSet[status].forEach(v => redis.sadd(status, v))

            return main({ status })
                .then(res => {
                    expect(res.statusCode).to.equal(200)
                    expect(res.body[status]).to.deep.equal(statusSet[status])
            })
        })
    })
})
