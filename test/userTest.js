const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const configDB = require('../config/database.js');
const User = require('../app/models/users');
const{app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);

function tearDownDB () {
    return new Promise((resolve, reject) => {
        console.warn('--Deleting Database--');
        User.collection.drop()
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
}

function seedDatabase () {
    return seedUsers();
}

/*function seedUsers(){
    console.info('--Seeding Users ---');
    const seedData = [];
    for(let i=0; i < 5; i++) {
        seedData.push({
         "local.email"    : faker.internet.email(),
         "local.password" : faker.internet.password()
        })
    }
return User.insertMany(seedData);

}*/

describe('test', function(){
    before(function(){
        return runServer(configDB.TEST_DATABASE_URL,8081);
    })
})

after(function() {
    return closeServer();
});

beforeEach(function() {
    return seedDatabase();
});

afterEach(function() {
    return tearDownDB();
})

describe('GET endpoints', function() {
    it("should get all users", function(){
        let users;

        return User.find()
        .then(allUsers => {
            users = allUsers;
            console.log(users)[0].local;
            return chai.request(app).get('/users');
        })
       /* .then(res => {
res.should.have.status(201);

res.should.be.json
res.body.should.be.a('string');
res.body.should.have.lengthOf.at.least(5);
res.body.forEach((user, index) => {
    user.should.be.a('array');
    user.should.include.keys('local', '_id', 'skills');
    user.local.email.should.equal(users[index].local.email);
})
})*/
    })
});

/*describe('POST endpoints', function())*/