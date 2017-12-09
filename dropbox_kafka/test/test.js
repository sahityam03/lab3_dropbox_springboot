describe('http tests', function(){
	it('should return the login if the url is correct', function(done){
	.get('http://localhost:3000/', function(res) {
	assert.equal(200, res.statusCode);
	done();
	})
	});
	});