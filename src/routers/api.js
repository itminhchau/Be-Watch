import express from 'express'

let router = express.Router()

const initAPIRouter = (app) => {
    // api login user


    //get doctor infor
    // router.get('/api/v1/get/doctor-infor',doctorApiController.handleGetDoctorInfor)

    app.use('/', router)
}

export default initAPIRouter