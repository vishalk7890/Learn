var expect=require("expect")
var reqq=require("supertest")

var {app1}=require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/mainserver")
var {NEW}=require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/New-Todo-Model")

// beforeEach((done)=>{
//     tada.remove({}).then(()=>{
//         done()
//     })
// })

describe("/vishal",()=>{
    it('should create a  new test', (done)=> {
        var text = "test done ";

        reqq(app1).post('/vishal').send({text}).expect((res)=>{
            expect(res.body.text).toBe(text)
        }).
        end((err,res)=>{
            if(err){
                return done(err)
            }

          NEW.find().then((tada)=>{
              expect(tada.length).toBe(1)
              expect(tada[0].text).toBe(text)
              done()
          }).catch((e)=>done(e))

        })

    });
})


