var expect=require("expect")
var reqq=require("supertest")

var {ObjectID}=require("mongodb")

var {app1} =require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/New-Mongoose-server")
var {NEW}=require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/New-Todo-Model")
var {eg,populate,pop,user}=require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/Test/seed")
beforeEach(pop)
beforeEach(populate)

describe("POST /vishal",()=>{
    it('should create a  new test', (done)=> {
        var text = "test done ";

        reqq(app1).post('/vishal').send({text}).expect((res)=>{
            expect(res.body.text).toBe(text)
        }).
        end((err,res)=>{
            if(err){
                return done(err)
            }

          NEW.find({text}).then((tada)=>{
              expect(tada.length).toBe(1)
              expect(tada[0].text).toBe(text)
              done()
          }).catch((e)=>done(e))

        })

    })
    it("should not create todo with  invalid body",(done)=>{
        reqq(app1).post("/vishal").send({}).expect(400).end((err,res)=>{
            if(err){
                return done(err)
            }
        })

        NEW.find().then((doc)=>{
            expect(doc.length).toBe(2)
            done()
        }).catch((e)=>{
            done(e)
        })
    })
})

describe("GET /vishal",()=>{
    it("should get all the data",(done)=>{
        reqq(app1)
            .get("/vishal")
            .expect(200)
            .expect((res)=>{
                expect(res.body.doc)
            })
            .end(done)
    })
})

describe("GET /vishal:id",()=> {
    it("should return todo doc", (done) => {
        reqq(app1)
            .get(`/vishal/${eg[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.doc.text).toBe(eg[0].text)
            })
            .end(done)
    })
    it("should return 404",(done)=>{
        var hex=new ObjectID().toHexString()
        reqq(app1).get(`/vishal/${hex}`).expect(404).end(done)
    })
    it("should return 404 for non valid object id",(done)=>{
        reqq(app1).get("/vishal/123vsd").expect(404).end(done)
    })
})

describe("Delete /vishal/:id",()=>{
    it("should delete the doc ",(done)=>{
        reqq(app1).delete(`/vishal/${eg[1]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.doc.text)
            })
            .end((err,res)=>{
                if(err){
                    return done(err)
                }

                NEW.findById(`${eg[1]._id.toHexString()}`).then((doc)=>{
                    expect(doc).toBeFalsy()
                    done()
                }).catch((e)=>{
                    done(e)
                })
            })
    })
})

describe("Patch /vishal/:id",()=>{
    it("should update the doc",(done)=>{
        var text={
            text:"this is dummy text"}
        reqq(app1).patch(`/vishal/${eg[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.doc.text)
            })
            .end((err,res)=>{
                if(err){
                    return done(err)
                }
                NEW.findOneAndUpdate(`${eg[0]._id.toHexString()}`,{$set:text},{new: false}).then((doc)=>{
                    expect(200)
                    done()
                }).catch((e)=>{
                    done(e)
                })
            })
    })

})


describe("GET /Users/me",()=>{
    it("should return user when authenticated  ",(done)=>{
        reqq(app1).
        get("/User/me")
            .set("x-auth",user[0].tokens[0].token)
            .expect(200)
            .expect((res)=>{
                expect(res.body._id).toBe(user[0]._id.toHexString())
                expect(res.body.email).toBe(user[0].email)
            }).end(done)


    })

})
describe("get /usres me ",()=>{
    it("shuld return 401 when not authenticated",(done)=>{
        reqq(app1).get("/User/me").expect(401).expect((res)=>{
            expect(res.body).toEqual({})
        })
            .end(done)
    })

})
describe("Post http resquest",()=>{
    it("should create the user",(done)=>{
        let email="abc@email.com"
        let password="123fg2"
        reqq(app1).post("/User").send({email,password}).expect(200).expect((res)=>{
            //expect(res.headers['x-auth']).toEqual(res)
            expect(res.body._id).toExist()
            expect(res.body.email).toBe(email)
        }).end(done)
    })

    it("should return validation erorr",(done)=>{

    })
    it("it should not create the user if email in use",(done)=>{

    })
})

// the below code also test the same thing as above but also checks the complted at thing

/*

describe("Patch /vishal/:id",()=>{
    it("shouuld update the doc",(done)=>{
        var text="new text formed "
        reqq(app1).patch(`/vishal/${eg[1]._id.toHexString()}`).send({
            completed:false,
            text
        }).expect(200).expect((res)=>{
            expect(res.body.doc.text).toBe(text)
            expect(res.body.doc.completed).toBe(true)
            expect(res.body.doc.completedAt).toBe("number")
        }).end(done)
    })
})
*/
