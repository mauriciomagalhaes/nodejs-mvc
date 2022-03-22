const Tought = require('../models/Tought');
const User = require('../models/User');

// Operators Querys
const { Op } = require('sequelize');

module.exports = class ToughtController{
    static async showToughts(req, res){
        
        let search = ''

        if(req.query.search){
            search = req.query.search
        }
        //console.log(search)

        let order = 'DESC'

        if(req.query.order === 'old'){
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: {[Op.like]: `%${search}%`}
            },
            order: [['createdAt', order]]
        })

        //console.log(toughtsData)

        const toughts =  toughtsData.map(result => result.get({ plain: true }))

        let toughtsQty =  toughts.length

        if (toughtsQty == 0){
            toughtsQty  = false;
        }

        //console.log(toughts)

        res.render('toughts/home', { toughts, search, toughtsQty })
    }

    static async dashboard(req, res){
        // Get id user on session
        const userid = req.session.userid
        
        // Find user by id
        const user = await User.findOne({plain:true, where: { id: userid } , include: Tought})

        // Check if user exists
        if(!user){
            res.redirect('/login')
        }

        const toughts =  user.Toughts.map(result => result.dataValues)

        //console.log(toughts)

        let emptyToughts = false

        if(toughts.length == 0){
            emptyToughts = true
        }

        res.render('toughts/dashboard', {toughts, emptyToughts})
    }

    static createTought(req, res){
        res.render('toughts/create')
    }

    static async createToughtSave(req, res){
        const tought = { 
            title: req.body.title,
            UserId: req.session.userid,
        }
        try{
            await Tought.create(tought)

            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
            
        } catch(err){
            console.log('Aconteceu um erro ao criar o pensamento', err)
        }
    }
    static async removeTought(req, res){
        const id = req.body.id
        const UserId = req.session.userid

        try{
            await Tought.destroy({where: { id:id, UserId: UserId}})

            req.flash('message', 'Pensamento removido com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })

        }catch (error){
            console.log('Aconteceu um erro ao remover o pensamento', error)
        }
    }

    static async updateTought(req, res){
        const id = req.params.id

        const tought = await Tought.findOne({raw: true, where: { id: id}})

        //console.log(tought)

        res.render('toughts/edit', { tought })
    }

    static async updateToughtSave(req, res){
        const { id, title } = req.body
        
        try{
            await Tought.update({title}, {where: { id }})

            req.flash('message', 'Pensamento atualizado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        }catch (error){
            console.log('Aconteceu um erro ao atualizar o pensamento', error)
        }
    }

}