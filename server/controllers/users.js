const { prisma } = require('../prisma/prisma-client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @route POST /api/user/login
 * @desc Логин
 * @access Public
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' });
        }
        
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Введен несуществующий логин' });
        }
        
        const isCorrectPassword = user && (await bcrypt.compare(password, user.password));
        if (!isCorrectPassword) {
            return res.status(400).json({ message: 'Введен неверный пароль' });
        }
        
        const secret = process.env.JWT_SECRET;
        return res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
            token: jwt.sign({ id: user.id}, secret, { expiresIn: '30d'})
        });
    } catch (error) {
        return res.status(500).json({message: 'Что-то пошло не так', error});
    }
};

/**
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Public
 */
const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' });
        }
        
        const isAlreadyRegistered = !!await prisma.user.findFirst({ where: { email } });
        
        if (isAlreadyRegistered) {
            return res.status(400).json({ message: 'Пользователь, с таким email уже существует' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });
        
        const secret = process.env.JWT_SECRET;
        
        if (user && secret) {
            return res.status(201).json({
                id: user.id,
                email: user.email,
                name: user.name,
                token: jwt.sign({ id: user.id}, secret, { expiresIn: '30d'})
            });
        }
        
        return res.status(400).json({message: 'Не удалось создать пользователя'});
    } catch (error) {
        return res.status(500).json({message: 'Что-то пошло не так', error});
    }
    
};

/**
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Private
 */
const current = async (req, res) => {
    return res.status(200).json(req.user);
};

module.exports = {
    login,
    register,
    current,
};