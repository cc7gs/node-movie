const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed
const SALT_WORK_FACTOR = 10;
//登陆尝试次数
const MAX_LOGIN_ATTEMPTS = 5
//登陆失败锁定时间
const LOCK_TIME = 2 * 60 * 60 * 1000

const userSchema = new Schema({
    name: {
        unique: true,
        type: String,
    },
    email: {
        type: String
    },
    password: {
        unique: true,
        type: String
    },
    loginAttempts:{
        type:Number,
        required:true,
        default:0
    },
    lockUntil: Number, //用户被锁定时间
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

//添加虚拟字段 用于判断用户是否锁定
//lockUntil 用户锁定时间毫秒级
userSchema.virtual('isLocked').get(() => {
    return !!(this.lockUntil && this.lockUntil > Date.now())
})

//判断数据是否是新增,若是新增则更新meta
userSchema.pre('save', next => {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});
userSchema.pre('save', next => {
    if (!this.isModified('password')) return next()
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        })
    })
    next();
});
userSchema.methods = {
    //check password 
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) {
                    resolve(isMatch)
                } else {
                    reject(err);
                }
            })
        })
    },
    //check user logins 
    incLoginAttepts: (user) => {
        return new Promise((resolve, reject) => {
            //锁定时间过期
            if (this.lockUntil && this.lockUntil < Date.now()) {
                this.update({
                    $get: {
                        loginAttempts: 1
                    },
                    $unset: {
                        lockUntil: 1
                    }
                }, (err) => {
                    if (!err) resolve(true)
                    else reject(err)
                })
            }else{
                let updates={
                    $inc:{
                        loginAttempts:1
                    }
                }
                if(this.loginAttempts+1>=MAX_LOGIN_ATTEMPTS && !this.isLocked){
                    updates.$set={
                        lockUntil:Date.now+LOCK_TIME
                    }
                }
                this.update(updates,err=>{
                    if(!err){
                        resolve(true)
                    }else{
                        reject(err);
                    }
                })
            }
        })
    }
}
mongoose.model('User', userSchema);
console.log('user');