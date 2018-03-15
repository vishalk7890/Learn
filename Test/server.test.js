var expect=require("expect")
var reqq=require("supertest")

var {ObjectID}=require("mongodb")

var {app1} =require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/New-Mongoose-server")
var {NEW}=require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/New-Todo-Model")

const eg=[{
    _id: new ObjectID(),
    text:"first test todo"
},{
    _id:new ObjectID(),
    text:"second"
}]

beforeEach((done)=>{
    NEW.remove({}).then(()=>{
        return NEW.insertMany(eg)
        //done()
    }).then(()=>{
        done()
    })
})

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
                expect(res.body.vishal.length).toBe(2)
            })
            .end(done)
    })
})

describe("GET /vishal:id",()=>{
    it("should return todo doc",(done)=>{
        reqq(app1)
            .get(`/vishal/${eg[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.vishal.text).toBe(eg[0].text)
            })
            .end(done)
    })
})
