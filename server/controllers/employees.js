const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET /api/employees
 * @desc Получение всех сотрудников
 * @access Private
 */
const getAll = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany();
        
        return res.status(200).json(employees);
    } catch (e) {
        return res.status(500).json({ message: 'Не удалось получить сотрудников' });
    }
};

/**
 * @route GET /api/employees/:id
 * @desc Получение одного сотрудника
 * @access Private
 */
const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await prisma.employee.findUnique({ where: { id } });
        
        return res.status(200).json(employee);
    } catch (e) {
        return res.status(500).json({ message: 'Не удалось найти сотрудника' });
    }
};


/**
 * @route POST /api/employees/add
 * @desc Добавение сотрудника
 * @access Private
 */
const add = async (req, res) => {
    try {
        const { firstName, lastName, age, address } = req.body;
        
        if (!firstName || !lastName || !age || !address) {
            return res.status(400).json({ message: 'Все поля обязательны' });
        }
        
        const isAlreadyAdded = !!await prisma.employee.findFirst({ where: { firstName, lastName } });
        if (isAlreadyAdded) {
            return res.status(400).json({ message: 'Работник с таким именем и фамилией уже существует' });
        }
        
        const employee = await prisma.employee.create({
            data: {
                firstName,
                lastName,
                age,
                address,
                userId: req.user.id,
            },
        });
        
        return res.status(201).json(employee);
    } catch (e) {
        return res.status(500).json({ message: 'Не удалось добавить сотрудника' });
    }
    
};


/**
 * @route POST /api/employees/remove/:id
 * @desc Удаление сотрудника
 * @access Private
 */
const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.employee.delete({ where: { id } });
        
        return res.status(204).json({ message: 'OK' });
    } catch (e) {
        return res.status(500).json({ message: 'Не удалось удалить сотрудника' });
    }
};


/**
 * @route PUT /api/employees/edit/:id
 * @desc Редактирование сотрудника
 * @access Private
 */
const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        
        await prisma.employee.update({
            where: { id },
            data,
        });
        
        return res.status(204).json({ message: 'OK' });
    } catch (e) {
        return res.status(500).json({ message: 'Не удалось отредактировать информацию' });
    }
    
};

module.exports = {
    getAll,
    getOne,
    add,
    remove,
    edit,
};